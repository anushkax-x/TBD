import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

const UNCONFIGURED_DATABASE_URL =
  "postgresql://unused:unused@127.0.0.1:5432/unused";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);
  /** False when DATABASE_URL is missing or Postgres cannot be reached. */
  available = false;
  private connected = false;

  constructor() {
    const url = process.env.DATABASE_URL?.trim();
    if (!url) {
      process.env.DATABASE_URL = UNCONFIGURED_DATABASE_URL;
    }
    super();
    this.available = Boolean(url);
  }

  async onModuleInit() {
    if (!this.available) {
      this.logger.warn(
        "DATABASE_URL is not set. Chat and health stay up. Saved leads and admin login stay off.",
      );
      return;
    }

    try {
      await this.$connect();
      this.connected = true;
    } catch (error) {
      this.available = false;
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(
        `Database connection failed. Chat and health stay up. ${message}`,
      );
    }
  }

  async onModuleDestroy() {
    if (this.connected) await this.$disconnect();
  }
}
