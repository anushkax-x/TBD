import { Inject, Injectable, Logger } from "@nestjs/common";
import type {
  ChatEndDto,
  ChatEndInput,
  ChatStreamEvent,
  ChatTurnInput,
} from "@consultancy/shared";
import { EMAIL_SERVICE, type EmailService } from "../email/email.types";
import { GeminiService, type ChatSummary } from "./gemini.service";

const MAX_TRACKED_SESSIONS = 5000;

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);
  private readonly endedSessions = new Set<string>();

  constructor(
    private readonly gemini: GeminiService,
    @Inject(EMAIL_SERVICE) private readonly email: EmailService,
  ) {}

  streamReply(input: ChatTurnInput): AsyncGenerator<ChatStreamEvent> {
    return this.gemini.streamReply(input.messages);
  }

  async end(input: ChatEndInput): Promise<ChatEndDto> {
    if (this.endedSessions.has(input.sessionId)) {
      return { emailed: false, alreadyEnded: true };
    }
    this.markEnded(input.sessionId);

    try {
      const summary = await this.summarise(input);
      await this.email.sendChatSummary({
        sessionId: input.sessionId,
        ...summary,
        transcript: input.messages,
      });
      return { emailed: true, alreadyEnded: false };
    } catch (err) {
      this.endedSessions.delete(input.sessionId);
      this.logger.error(
        `Failed to send chat summary for ${input.sessionId}: ${err instanceof Error ? err.message : String(err)}`,
      );
      throw err;
    }
  }

  private async summarise(input: ChatEndInput): Promise<ChatSummary> {
    try {
      const summary = await this.gemini.summarise(input.messages);
      return {
        ...summary,
        meetingRequested: summary.meetingRequested || input.meetingRequested,
      };
    } catch (err) {
      this.logger.warn(
        `AI summary failed for ${input.sessionId}, sending transcript only: ${err instanceof Error ? err.message : String(err)}`,
      );
      return {
        name: null,
        email: null,
        businessName: null,
        need: "AI summary unavailable — see the full transcript below.",
        feasibility: "unclear",
        suggestedApproach: null,
        meetingRequested: input.meetingRequested,
        notes: null,
      };
    }
  }

  private markEnded(sessionId: string) {
    if (this.endedSessions.size >= MAX_TRACKED_SESSIONS) {
      const oldest = this.endedSessions.values().next().value;
      if (oldest) this.endedSessions.delete(oldest);
    }
    this.endedSessions.add(sessionId);
  }
}
