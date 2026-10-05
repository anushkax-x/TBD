import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GoogleGenAI, Type, type Content, type Schema } from "@google/genai";
import type { ChatMessage, ChatStreamEvent } from "@consultancy/shared";
import type { Feasibility } from "../email/email.types";
import {
  CHAT_META_MARKER,
  CHAT_SYSTEM_PROMPT,
  SUMMARY_SYSTEM_PROMPT,
} from "./knowledge";

export const DEFAULT_GEMINI_MODEL = "gemini-3.1-flash-lite";

export interface ChatSummary {
  name: string | null;
  email: string | null;
  businessName: string | null;
  need: string;
  feasibility: Feasibility;
  suggestedApproach: string | null;
  meetingRequested: boolean;
  notes: string | null;
}

const summarySchema: Schema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING, nullable: true },
    email: { type: Type.STRING, nullable: true },
    businessName: { type: Type.STRING, nullable: true },
    need: { type: Type.STRING },
    feasibility: {
      type: Type.STRING,
      format: "enum",
      enum: ["yes", "partly", "no", "unclear"],
    },
    suggestedApproach: { type: Type.STRING, nullable: true },
    meetingRequested: { type: Type.BOOLEAN },
    notes: { type: Type.STRING, nullable: true },
  },
  required: ["need", "feasibility", "meetingRequested"],
};

const RETRY_DELAYS_MS = [800, 2000];
const FALLBACK_REPLY =
  "Sorry, I didn't catch that. Could you tell me a bit more?";

@Injectable()
export class GeminiService {
  private readonly logger = new Logger(GeminiService.name);
  private readonly client: GoogleGenAI | null;
  private readonly model: string;

  constructor(config: ConfigService) {
    const apiKey = config.get<string>("GEMINI_API_KEY");
    this.model = config.get<string>("GEMINI_MODEL") || DEFAULT_GEMINI_MODEL;
    this.client = apiKey ? new GoogleGenAI({ apiKey }) : null;
    if (!this.client) {
      this.logger.warn("GEMINI_API_KEY not set — AI chat is disabled");
    }
  }

  /**
   * Streams the reply text as `delta` events and finishes with a `done` event.
   * The model appends a hidden metadata line (CHAT_META_MARKER + JSON) that is
   * stripped from the visible text and parsed into the `done` event.
   */
  async *streamReply(history: ChatMessage[]): AsyncGenerator<ChatStreamEvent> {
    const client = this.requireClient();
    const stream = await this.withRetry(() =>
      client.models.generateContentStream({
        model: this.model,
        contents: toContents(history),
        config: { systemInstruction: CHAT_SYSTEM_PROMPT, temperature: 0.6 },
      }),
    );

    let full = "";
    let emitted = 0;
    // Hold back enough characters that a partially streamed marker is never shown.
    const holdBack = CHAT_META_MARKER.length - 1;

    for await (const chunk of stream) {
      full += chunk.text ?? "";
      const markerAt = full.indexOf(CHAT_META_MARKER);
      const safeEnd =
        markerAt >= 0 ? markerAt : Math.max(emitted, full.length - holdBack);
      if (safeEnd > emitted) {
        yield { type: "delta", text: full.slice(emitted, safeEnd) };
        emitted = safeEnd;
      }
    }

    const markerAt = full.indexOf(CHAT_META_MARKER);
    const visible = markerAt >= 0 ? full.slice(0, markerAt) : full;
    if (visible.length > emitted) {
      yield { type: "delta", text: visible.slice(emitted) };
    }
    if (!visible.trim()) {
      yield { type: "delta", text: FALLBACK_REPLY };
    }

    const meta = markerAt >= 0 ? parseMeta(full.slice(markerAt)) : {};
    yield {
      type: "done",
      meetingRequested: Boolean(meta.meetingRequested),
      conversationComplete: Boolean(meta.conversationComplete),
    };
  }

  async summarise(history: ChatMessage[]): Promise<ChatSummary> {
    const client = this.requireClient();
    const transcript = history
      .map((m) => `${m.role === "user" ? "Visitor" : "Assistant"}: ${m.text}`)
      .join("\n\n");

    const response = await this.withRetry(() =>
      client.models.generateContent({
        model: this.model,
        contents: [
          { role: "user", parts: [{ text: `Transcript:\n\n${transcript}` }] },
        ],
        config: {
          systemInstruction: SUMMARY_SYSTEM_PROMPT,
          temperature: 0.2,
          responseMimeType: "application/json",
          responseSchema: summarySchema,
        },
      }),
    );

    let parsed: Partial<ChatSummary> = {};
    try {
      parsed = JSON.parse(response.text ?? "{}") as Partial<ChatSummary>;
    } catch {
      this.logger.warn("Gemini returned non-JSON summary");
    }

    const feasibility: Feasibility[] = ["yes", "partly", "no", "unclear"];
    return {
      name: parsed.name || null,
      email: parsed.email || null,
      businessName: parsed.businessName || null,
      need: parsed.need || "Not specified",
      feasibility: feasibility.includes(parsed.feasibility as Feasibility)
        ? (parsed.feasibility as Feasibility)
        : "unclear",
      suggestedApproach: parsed.suggestedApproach || null,
      meetingRequested: Boolean(parsed.meetingRequested),
      notes: parsed.notes || null,
    };
  }

  private requireClient(): GoogleGenAI {
    if (!this.client) {
      throw new ServiceUnavailableException({
        code: "AI_UNAVAILABLE",
        message: "AI chat is not configured. Please use the contact form.",
      });
    }
    return this.client;
  }

  private async withRetry<T>(fn: () => Promise<T>): Promise<T> {
    for (let attempt = 0; ; attempt++) {
      try {
        return await fn();
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        if (attempt < RETRY_DELAYS_MS.length && isTransient(err)) {
          this.logger.warn(`Gemini transient error, retrying: ${message}`);
          await sleep(RETRY_DELAYS_MS[attempt]);
          continue;
        }
        this.logger.error(`Gemini request failed: ${message}`);
        throw new ServiceUnavailableException({
          code: "AI_UNAVAILABLE",
          message:
            "Our AI assistant is temporarily unavailable. Please try again shortly.",
        });
      }
    }
  }
}

function parseMeta(raw: string): {
  meetingRequested?: boolean;
  conversationComplete?: boolean;
} {
  const json = raw.match(/\{[\s\S]*?\}/)?.[0];
  if (!json) return {};
  try {
    return JSON.parse(json);
  } catch {
    return {};
  }
}

function isTransient(err: unknown): boolean {
  const status = (err as { status?: number })?.status;
  if (status === 429 || status === 500 || status === 503) return true;
  return /"code":\s*(429|500|503)|UNAVAILABLE|RESOURCE_EXHAUSTED/.test(
    err instanceof Error ? err.message : String(err),
  );
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Gemini requires the conversation to start with a user turn. */
function toContents(history: ChatMessage[]): Content[] {
  const firstUser = history.findIndex((m) => m.role === "user");
  return history.slice(Math.max(firstUser, 0)).map((m) => ({
    role: m.role,
    parts: [{ text: m.text }],
  }));
}
