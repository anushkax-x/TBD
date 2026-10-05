import { Module } from "@nestjs/common";
import { EmailModule } from "../email/email.module";
import { ChatController } from "./chat.controller";
import { ChatService } from "./chat.service";
import { GeminiService } from "./gemini.service";

@Module({
  imports: [EmailModule],
  controllers: [ChatController],
  providers: [ChatService, GeminiService],
})
export class ChatModule {}
