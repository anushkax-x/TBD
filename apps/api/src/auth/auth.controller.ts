import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Throttle } from "@nestjs/throttler";
import { loginSchema, type ApiSuccessResponse, type AuthUserDto, type LoginInput } from "@consultancy/shared";
import type { Response } from "express";
import { ZodValidationPipe } from "../common/pipes/zod-validation.pipe";
import { AuthService } from "./auth.service";
import { CurrentUser } from "./current-user.decorator";
import { JwtAuthGuard } from "./jwt-auth.guard";

const COOKIE_NAME = "access_token";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly auth: AuthService,
    private readonly config: ConfigService,
  ) {}

  @Post("login")
  @HttpCode(200)
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  async login(
    @Body(new ZodValidationPipe(loginSchema)) body: LoginInput,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ApiSuccessResponse<{ user: AuthUserDto }>> {
    const { user, accessToken } = await this.auth.login(body);
    const isProd = this.config.get("NODE_ENV") === "production";

    res.cookie(COOKIE_NAME, accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    return { success: true, data: { user } };
  }

  @Post("logout")
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  logout(
    @Res({ passthrough: true }) res: Response,
  ): ApiSuccessResponse<{ loggedOut: true }> {
    res.clearCookie(COOKIE_NAME, { path: "/" });
    return { success: true, data: { loggedOut: true } };
  }

  @Get("me")
  @UseGuards(JwtAuthGuard)
  me(
    @CurrentUser() user: AuthUserDto,
  ): ApiSuccessResponse<{ user: AuthUserDto }> {
    return { success: true, data: { user } };
  }
}
