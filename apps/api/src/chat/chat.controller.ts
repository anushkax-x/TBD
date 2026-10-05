import { Body, Controller, HttpCode, Post, Res } from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";
import type { Response } from "express";
import {
  chatEndSchema,
  chatTurnSchema,
  type ApiSuccessResponse,
  type ChatEndDto,
  type ChatEndInput,
  type ChatStreamEvent,
  type ChatTurnInput,
} from "@consultancy/shared";
import { ZodValidationPipe } from "../common/pipes/zod-validation.pipe";
import { ChatService } from "./chat.service";

@Controller("chat")
export class ChatController {
  constructor(private readonly chat: ChatService) {}

  /**
   * Streams the assistant reply as Server-Sent Events. Errors raised before the
   * first event (validation, AI unavailable) are returned as normal JSON errors.
   */
  @Post("stream")
  @Throttle({ default: { limit: 20, ttl: 60_000 } })
  async stream(
    @Body(new ZodValidationPipe(chatTurnSchema)) body: ChatTurnInput,
    @Res() res: Response,
  ): Promise<void> {
    const events = this.chat.streamReply(body);
    const first = await events.next();

    let clientGone = false;
    res.on("close", () => {
      clientGone = true;
    });

    res.status(200);
    res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");
    res.flushHeaders();

    const send = (event: ChatStreamEvent) =>
      res.write(`data: ${JSON.stringify(event)}\n\n`);

    try {
      if (!first.done) send(first.value);
      for await (const event of events) {
        if (clientGone) break;
        send(event);
      }
    } catch {
      if (!clientGone) {
        send({
          type: "error",
          message: "The AI assistant stopped responding. Please try again.",
        });
      }
    } finally {
      if (clientGone) await events.return(undefined);
      res.end();
    }
  }

  @Post("end")
  @HttpCode(200)
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  async end(
    @Body(new ZodValidationPipe(chatEndSchema)) body: ChatEndInput,
  ): Promise<ApiSuccessResponse<ChatEndDto>> {
    const data = await this.chat.end(body);
    return { success: true, data };
  }
}
