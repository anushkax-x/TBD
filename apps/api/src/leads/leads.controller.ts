import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";
import {
  createLeadSchema,
  leadQuerySchema,
  updateLeadSchema,
  type ApiSuccessResponse,
  type CreateLeadInput,
  type LeadDto,
  type LeadListDto,
  type LeadQueryInput,
  type UpdateLeadInput,
} from "@consultancy/shared";
import { ZodValidationPipe } from "../common/pipes/zod-validation.pipe";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { LeadsService } from "./leads.service";

@Controller("leads")
export class LeadsController {
  constructor(private readonly leads: LeadsService) {}

  @Post()
  @HttpCode(201)
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  async create(
    @Body(new ZodValidationPipe(createLeadSchema)) body: CreateLeadInput,
  ): Promise<ApiSuccessResponse<LeadDto>> {
    const data = await this.leads.create(body);
    return { success: true, data };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Query(new ZodValidationPipe(leadQuerySchema)) query: LeadQueryInput,
  ): Promise<ApiSuccessResponse<LeadListDto>> {
    const data = await this.leads.findAll(query);
    return { success: true, data };
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async findOne(
    @Param("id") id: string,
  ): Promise<ApiSuccessResponse<LeadDto>> {
    const data = await this.leads.findOne(id);
    return { success: true, data };
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  async update(
    @Param("id") id: string,
    @Body(new ZodValidationPipe(updateLeadSchema)) body: UpdateLeadInput,
  ): Promise<ApiSuccessResponse<LeadDto>> {
    const data = await this.leads.update(id, body);
    return { success: true, data };
  }

  @Delete(":id")
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async remove(
    @Param("id") id: string,
  ): Promise<ApiSuccessResponse<{ deleted: true }>> {
    await this.leads.remove(id);
    return { success: true, data: { deleted: true } };
  }
}
