import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { Logger } from "@nestjs/common";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger("Bootstrap");
  const config = app.get(ConfigService);
  const corsOrigin = config.get<string>("CORS_ORIGIN", "http://localhost:3000");
  const port = config.get<number>("PORT", 3001);
  const allowedOrigins = [
    ...new Set(
      [
        ...corsOrigin.split(",").map((origin) => origin.trim()),
        "https://flowmint.works",
        "https://www.flowmint.works",
      ].filter(Boolean),
    ),
  ];

  app.setGlobalPrefix("api");
  app.use(
    helmet({
      // Default same-origin policy makes browsers report a CORS failure
      // when flowmint.works calls api.flowmint.works.
      crossOriginResourcePolicy: { policy: "cross-origin" },
    }),
  );
  app.use(cookieParser());
  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Accept", "Authorization"],
  });

  await app.listen(port, "0.0.0.0");
  logger.log(`API listening on http://localhost:${port}/api`);
  logger.log(`CORS origins: ${allowedOrigins.join(", ")}`);
}

bootstrap();
