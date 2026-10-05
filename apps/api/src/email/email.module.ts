import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EMAIL_SERVICE } from "./email.types";
import { NoopEmailService } from "./noop-email.service";
import { resolveSmtpConfig } from "./smtp-config";
import { SmtpEmailService } from "./smtp-email.service";

@Module({
  providers: [
    {
      provide: EMAIL_SERVICE,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const { host, user, pass } = resolveSmtpConfig(config);
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
