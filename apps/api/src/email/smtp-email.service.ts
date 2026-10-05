import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import nodemailer from "nodemailer";
import type {
  ChatSummaryPayload,
  EmailService,
  LeadNotificationPayload,
} from "./email.types";
import { resolveSmtpConfig } from "./smtp-config";

@Injectable()
export class SmtpEmailService implements EmailService {
  private readonly logger = new Logger(SmtpEmailService.name);
  private readonly transporter: nodemailer.Transporter;
  private readonly from: string;
  private readonly to: string;

  constructor(private readonly config: ConfigService) {
    const smtp = resolveSmtpConfig(this.config);
    this.from = smtp.from;
    this.to = smtp.to;
    this.transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.port === 465,
      auth: {
        user: smtp.user,
        pass: smtp.pass,
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

  async sendChatSummary(payload: ChatSummaryPayload): Promise<void> {
    if (!this.to) {
      this.logger.warn("EMAIL_TO not set — skipping chat summary email");
      return;
    }

    const business = payload.businessName || payload.name || "Unknown visitor";
    const subject = [
      `AI chat: ${business} — feasible: ${payload.feasibility}`,
      payload.meetingRequested ? "[MEETING REQUESTED]" : "",
    ]
      .filter(Boolean)
      .join(" ");

    const transcript = payload.transcript
      .map((m) => `${m.role === "user" ? "Visitor" : "AI"}: ${m.text}`)
      .join("\n\n");

    const text = [
      "AI chat summary",
      "",
      `Name: ${payload.name || "—"}`,
      `Email: ${payload.email || "—"}`,
      `Business: ${payload.businessName || "—"}`,
      `Meeting requested: ${payload.meetingRequested ? "YES" : "no"}`,
      `Feasible: ${payload.feasibility}`,
      "",
      `Need: ${payload.need}`,
      "",
      `Suggested approach: ${payload.suggestedApproach || "—"}`,
      "",
      `Notes: ${payload.notes || "—"}`,
      "",
      `Session: ${payload.sessionId}`,
      "",
      "──────── Full transcript ────────",
      "",
      transcript,
    ].join("\n");

    await this.transporter.sendMail({
      from: this.from,
      to: this.to,
      ...(payload.email ? { replyTo: payload.email } : {}),
      subject,
      text,
    });

    this.logger.log(`Chat summary email sent for session ${payload.sessionId}`);
  }
}
