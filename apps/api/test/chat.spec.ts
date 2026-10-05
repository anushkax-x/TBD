import { INestApplication, ServiceUnavailableException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import request from "supertest";
import type { ChatStreamEvent } from "@consultancy/shared";
import { ChatController } from "../src/chat/chat.controller";
import { ChatService } from "../src/chat/chat.service";
import { GeminiService, type ChatSummary } from "../src/chat/gemini.service";
import { EMAIL_SERVICE } from "../src/email/email.types";
import { HttpExceptionFilter } from "../src/common/filters/http-exception.filter";

const summary: ChatSummary = {
  name: "Jane",
  email: "jane@acme.test",
  businessName: "Acme",
  need: "Automate receipt entry into Xero",
  feasibility: "yes",
  suggestedApproach: "AI extraction + Xero API",
  meetingRequested: true,
  notes: null,
};

const messages = [
  { role: "model", text: "Hi! How can we help?" },
  { role: "user", text: "We type receipts into Xero manually." },
];

async function* events(list: ChatStreamEvent[]) {
  for (const e of list) yield e;
}

describe("Chat API", () => {
  let app: INestApplication;
  let gemini: { streamReply: jest.Mock; summarise: jest.Mock };
  let email: { sendLeadNotification: jest.Mock; sendChatSummary: jest.Mock };

  beforeEach(async () => {
    gemini = {
      streamReply: jest.fn(),
      summarise: jest.fn().mockResolvedValue(summary),
    };
    email = {
      sendLeadNotification: jest.fn(),
      sendChatSummary: jest.fn().mockResolvedValue(undefined),
    };

    const module = await Test.createTestingModule({
      imports: [ThrottlerModule.forRoot([{ ttl: 60_000, limit: 1000 }])],
      controllers: [ChatController],
      providers: [
        ChatService,
        { provide: GeminiService, useValue: gemini },
        { provide: EMAIL_SERVICE, useValue: email },
      ],
    }).compile();

    app = module.createNestApplication();
    app.setGlobalPrefix("api");
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it("POST /api/chat/stream streams SSE events", async () => {
    gemini.streamReply.mockReturnValue(
      events([
        { type: "delta", text: "Yes, " },
        { type: "delta", text: "that's feasible." },
        { type: "done", meetingRequested: false, conversationComplete: false },
      ]),
    );

    const res = await request(app.getHttpServer())
      .post("/api/chat/stream")
      .send({ sessionId: "session-123456", messages })
      .expect(200);

    expect(res.headers["content-type"]).toContain("text/event-stream");
    const parsed = res.text
      .split("\n\n")
      .filter(Boolean)
      .map((block) => JSON.parse(block.replace(/^data: /, "")));
    expect(parsed).toEqual([
      { type: "delta", text: "Yes, " },
      { type: "delta", text: "that's feasible." },
      { type: "done", meetingRequested: false, conversationComplete: false },
    ]);
  });

  it("POST /api/chat/stream returns a JSON 503 when the AI is unavailable", async () => {
    gemini.streamReply.mockImplementation(async function* () {
      throw new ServiceUnavailableException({
        code: "AI_UNAVAILABLE",
        message: "unavailable",
      });
    });

    const res = await request(app.getHttpServer())
      .post("/api/chat/stream")
      .send({ sessionId: "session-123456", messages })
      .expect(503);

    expect(res.body.error.code).toBe("AI_UNAVAILABLE");
  });

  it("POST /api/chat/stream rejects a history that doesn't end with the user", async () => {
    const res = await request(app.getHttpServer())
      .post("/api/chat/stream")
      .send({
        sessionId: "session-123456",
        messages: [{ role: "model", text: "Hi" }],
      })
      .expect(400);

    expect(res.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("POST /api/chat/end rejects chats without user messages", async () => {
    const res = await request(app.getHttpServer())
      .post("/api/chat/end")
      .send({
        sessionId: "session-123456",
        messages: [{ role: "model", text: "Hi" }],
      })
      .expect(400);

    expect(res.body.error.code).toBe("VALIDATION_ERROR");
    expect(email.sendChatSummary).not.toHaveBeenCalled();
  });

  it("POST /api/chat/end emails the summary once per session", async () => {
    const first = await request(app.getHttpServer())
      .post("/api/chat/end")
      .send({ sessionId: "session-abcdef", messages })
      .expect(200);

    expect(first.body.data).toEqual({ emailed: true, alreadyEnded: false });
    expect(email.sendChatSummary).toHaveBeenCalledWith(
      expect.objectContaining({
        sessionId: "session-abcdef",
        businessName: "Acme",
        feasibility: "yes",
        meetingRequested: true,
        transcript: messages,
      }),
    );

    const repeat = await request(app.getHttpServer())
      .post("/api/chat/end")
      .send({ sessionId: "session-abcdef", messages })
      .expect(200);

    expect(repeat.body.data).toEqual({ emailed: false, alreadyEnded: true });
    expect(email.sendChatSummary).toHaveBeenCalledTimes(1);
  });

  it("POST /api/chat/end still emails the transcript if summarising fails", async () => {
    gemini.summarise.mockRejectedValue(new Error("Gemini down"));

    await request(app.getHttpServer())
      .post("/api/chat/end")
      .send({ sessionId: "session-fallback", messages, meetingRequested: true })
      .expect(200);

    expect(email.sendChatSummary).toHaveBeenCalledWith(
      expect.objectContaining({
        feasibility: "unclear",
        meetingRequested: true,
        transcript: messages,
      }),
    );
  });
});

describe("GeminiService.streamReply", () => {
  it("hides the metadata marker even when it is split across chunks", async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          ignoreEnvFile: true,
          load: [() => ({ GEMINI_API_KEY: "test-key" })],
        }),
      ],
      providers: [GeminiService],
    }).compile();
    const service = new GeminiService(module.get(ConfigService));

    const chunks = [
      "Yes, that is ",
      "feasible.\n<<ME",
      'TA>>{"meetingRequested": true, "conversationComplete": false}',
    ];
    (service as unknown as { client: unknown }).client = {
      models: {
        generateContentStream: async () =>
          (async function* () {
            for (const text of chunks) yield { text };
          })(),
      },
    };

    const out: ChatStreamEvent[] = [];
    for await (const e of service.streamReply([
      { role: "user", text: "Can you help?" },
    ])) {
      out.push(e);
    }

    const visible = out
      .filter((e): e is Extract<ChatStreamEvent, { type: "delta" }> => e.type === "delta")
      .map((e) => e.text)
      .join("");
    expect(visible).toBe("Yes, that is feasible.\n");
    expect(visible).not.toContain("<<");
    expect(out[out.length - 1]).toEqual({
      type: "done",
      meetingRequested: true,
      conversationComplete: false,
    });
  });
});
