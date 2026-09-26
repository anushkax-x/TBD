import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import nodemailer from "nodemailer";
import type { EmailService, LeadNotificationPayload } from "./email.types";

@Injectable()
export class SmtpEmailService implements EmailService {
  private readonly logger = new Logger(SmtpEmailService.name);
  private readonly transporter: nodemailer.Transporter;
  private readonly from: string;
  private readonly to: string;

  constructor(private readonly config: ConfigService) {
    this.from = this.config.get<string>("EMAIL_FROM", "noreply@example.com");
    this.to = this.config.get<string>("EMAIL_TO", "");
    this.transporter = nodemailer.createTransport({
      host: this.config.get<string>("SMTP_HOST"),
      port: this.config.get<number>("SMTP_PORT", 587),
      secure: false,
      auth: {
        user: this.config.get<string>("SMTP_USER"),
        pass: this.config.get<string>("SMTP_PASSWORD"),
      },
    });
  }

  async sendLeadNotification(payload: LeadNotificationPayload): Promise<void> {
    if (!this.to) {
      this.logger.warn("EMAIL_TO not set — skipping lead notification email");
      return;
    }

    const text = [
      "New website enquiry received.",
      "",
      `Name: ${payload.name}`,
      `Business: ${payload.businessName}`,
      `Email: ${payload.email}`,
      `Website: ${payload.website ?? "—"}`,
      `Country: ${payload.country}`,
      `Industry: ${payload.industry ?? "—"}`,
      `Improvement: ${payload.improvement ?? "—"}`,
      `Message: ${payload.message ?? "—"}`,
    ].join("\n");

    await this.transporter.sendMail({
      from: this.from,
      to: this.to,
      subject: `New enquiry: ${payload.businessName}`,
      text,
    });

    this.logger.log(`Lead notification email sent for ${payload.email}`);
  }
}
