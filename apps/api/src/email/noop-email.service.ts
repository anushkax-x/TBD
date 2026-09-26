import { Injectable, Logger } from "@nestjs/common";
import type { EmailService, LeadNotificationPayload } from "./email.types";

@Injectable()
export class NoopEmailService implements EmailService {
  private readonly logger = new Logger(NoopEmailService.name);

  async sendLeadNotification(payload: LeadNotificationPayload): Promise<void> {
    this.logger.log(
      `Email skipped (no SMTP) — lead from ${payload.email} (${payload.businessName})`,
    );
  }
}
