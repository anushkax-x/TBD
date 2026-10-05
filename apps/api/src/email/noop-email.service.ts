import { Injectable, Logger } from "@nestjs/common";
import type {
  ChatSummaryPayload,
  EmailService,
  LeadNotificationPayload,
} from "./email.types";

@Injectable()
export class NoopEmailService implements EmailService {
  private readonly logger = new Logger(NoopEmailService.name);

  async sendLeadNotification(payload: LeadNotificationPayload): Promise<void> {
    this.logger.log(
      `Email skipped (no SMTP) — lead from ${payload.email} (${payload.businessName})`,
    );
  }

  async sendChatSummary(payload: ChatSummaryPayload): Promise<void> {
    this.logger.log(
      `Email skipped (no SMTP) — chat summary for session ${payload.sessionId} (${payload.businessName ?? "unknown business"})`,
    );
  }
}
