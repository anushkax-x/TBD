import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EMAIL_SERVICE } from "./email.types";
import { NoopEmailService } from "./noop-email.service";
import { SmtpEmailService } from "./smtp-email.service";

@Module({
  providers: [
    {
      provide: EMAIL_SERVICE,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const host = config.get<string>("SMTP_HOST");
        const user = config.get<string>("SMTP_USER");
        const pass = config.get<string>("SMTP_PASSWORD");
        if (host && user && pass) {
          return new SmtpEmailService(config);
        }
        return new NoopEmailService();
      },
    },
  ],
  exports: [EMAIL_SERVICE],
})
export class EmailModule {}
