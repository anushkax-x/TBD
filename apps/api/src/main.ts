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

  app.setGlobalPrefix("api");
  app.use(helmet());
  app.use(cookieParser());
  app.enableCors({
    origin: corsOrigin.split(",").map((o) => o.trim()),
    credentials: true,
  });

  await app.listen(port);
  logger.log(`API listening on http://localhost:${port}/api`);
}

bootstrap();
