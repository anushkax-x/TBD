import type { ConfigService } from "@nestjs/config";

export interface SmtpConfig {
  host?: string;
  port: number;
  user?: string;
  pass?: string;
  from: string;
  to: string;
}

/** Empty strings in .env must fall through to the EMAIL_* aliases, hence `||`. */
export function resolveSmtpConfig(config: ConfigService): SmtpConfig {
  const get = (key: string) => config.get<string>(key) || undefined;
  const user = get("SMTP_USER") || get("EMAIL_ADDRESS");
  return {
    host: get("SMTP_HOST") || get("EMAIL_SMTP_SERVER"),
    port: Number(config.get("SMTP_PORT")) || 587,
    user,
    pass: get("SMTP_PASSWORD") || get("EMAIL_APP_PASSWORD"),
    from: get("EMAIL_FROM") || user || "noreply@example.com",
    to: get("EMAIL_TO") || get("EMAIL_ADDRESS") || "",
  };
}
