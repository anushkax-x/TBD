import { Controller, Get } from "@nestjs/common";
import { SkipThrottle } from "@nestjs/throttler";
import type { ApiSuccessResponse, HealthDto } from "@consultancy/shared";

@Controller("health")
export class HealthController {
  @Get()
  @SkipThrottle()
  check(): ApiSuccessResponse<HealthDto> {
    return {
      success: true,
      data: {
        status: "ok",
        timestamp: new Date().toISOString(),
      },
    };
  }
}
