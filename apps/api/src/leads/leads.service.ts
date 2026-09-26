import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import {
  type CreateLeadInput,
  type LeadDto,
  type LeadListDto,
  type LeadQueryInput,
  type UpdateLeadInput,
} from "@consultancy/shared";
import { Lead, LeadSource, LeadStatus, Prisma } from "@prisma/client";
import { EMAIL_SERVICE, type EmailService } from "../email/email.types";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class LeadsService {
  private readonly logger = new Logger(LeadsService.name);

  constructor(
    private readonly prisma: PrismaService,
    @Inject(EMAIL_SERVICE) private readonly email: EmailService,
  ) {}

  private toDto(lead: Lead): LeadDto {
    return {
      id: lead.id,
      name: lead.name,
      businessName: lead.businessName,
      email: lead.email,
      website: lead.website,
      country: lead.country,
      industry: lead.industry,
      improvement: lead.improvement,
      message: lead.message,
      source: lead.source,
      status: lead.status,
      createdAt: lead.createdAt.toISOString(),
      updatedAt: lead.updatedAt.toISOString(),
    };
  }

  async create(input: CreateLeadInput): Promise<LeadDto> {
    if (input.companyWebsite && input.companyWebsite.length > 0) {
      throw new BadRequestException({
        code: "SPAM_DETECTED",
        message: "Unable to process submission",
      });
    }

    const lead = await this.prisma.lead.create({
      data: {
        name: input.name,
        businessName: input.businessName,
        email: input.email.toLowerCase(),
        website: input.website,
        country: input.country,
        industry: input.industry,
        improvement: input.improvement,
        message: input.message,
        source: (input.source as LeadSource) ?? LeadSource.WEBSITE,
        status: LeadStatus.NEW,
      },
    });

    this.logger.log(`Lead submitted: ${lead.id} (${lead.email})`);

    void this.email
      .sendLeadNotification({
        name: lead.name,
        businessName: lead.businessName,
        email: lead.email,
        website: lead.website,
        country: lead.country,
        industry: lead.industry,
        improvement: lead.improvement,
        message: lead.message,
      })
      .catch((err: unknown) => {
        this.logger.error(
          `Failed to send lead email for ${lead.id}`,
          err instanceof Error ? err.stack : undefined,
        );
      });

    return this.toDto(lead);
  }

  async findAll(query: LeadQueryInput): Promise<LeadListDto> {
    const where: Prisma.LeadWhereInput = {};
    if (query.status) where.status = query.status as LeadStatus;
    if (query.industry)
      where.industry = { equals: query.industry, mode: "insensitive" };
    if (query.country)
      where.country = { equals: query.country, mode: "insensitive" };
    if (query.from || query.to) {
      where.createdAt = {};
      if (query.from) where.createdAt.gte = new Date(query.from);
      if (query.to) where.createdAt.lte = new Date(query.to);
    }

    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.prisma.lead.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      this.prisma.lead.count({ where }),
    ]);

    return {
      items: items.map((l) => this.toDto(l)),
      total,
      page,
      limit,
    };
  }

  async findOne(id: string): Promise<LeadDto> {
    const lead = await this.prisma.lead.findUnique({ where: { id } });
    if (!lead) {
      throw new NotFoundException({
        code: "LEAD_NOT_FOUND",
        message: "Lead not found",
      });
    }
    return this.toDto(lead);
  }

  async update(id: string, input: UpdateLeadInput): Promise<LeadDto> {
    await this.findOne(id);
    const lead = await this.prisma.lead.update({
      where: { id },
      data: {
        ...(input.status !== undefined && {
          status: input.status as LeadStatus,
        }),
        ...(input.industry !== undefined && { industry: input.industry }),
        ...(input.country !== undefined && { country: input.country }),
        ...(input.message !== undefined && { message: input.message }),
        ...(input.improvement !== undefined && {
          improvement: input.improvement,
        }),
        ...(input.source !== undefined && {
          source: input.source as LeadSource,
        }),
      },
    });
    return this.toDto(lead);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.prisma.lead.delete({ where: { id } });
  }
}
