import {
  INestApplication,
  CanActivate,
  ExecutionContext,
} from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import { JwtModule } from "@nestjs/jwt";
import cookieParser from "cookie-parser";
import request from "supertest";
import { LeadSource, LeadStatus } from "@prisma/client";
import { HealthController } from "../src/health/health.controller";
import { LeadsController } from "../src/leads/leads.controller";
import { LeadsService } from "../src/leads/leads.service";
import { AuthController } from "../src/auth/auth.controller";
import { AuthService } from "../src/auth/auth.service";
import { JwtAuthGuard } from "../src/auth/jwt-auth.guard";
import { PrismaService } from "../src/prisma/prisma.service";
import { EMAIL_SERVICE } from "../src/email/email.types";
import { HttpExceptionFilter } from "../src/common/filters/http-exception.filter";

const mockLead = {
  id: "lead_1",
  name: "Jane Doe",
  businessName: "Acme Ltd",
  email: "jane@acme.com",
  website: "https://acme.com",
  country: "United Kingdom",
  industry: "Recruitment",
  improvement: "Lead follow-up",
  message: "Need help with CRM",
  preferredAt: new Date("2026-12-01T10:00:00.000Z"),
  source: LeadSource.WEBSITE,
  status: LeadStatus.NEW,
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
  updatedAt: new Date("2026-01-01T00:00:00.000Z"),
};

const mockUser = {
  id: "user_1",
  email: "admin@example.com",
  name: "Admin",
  role: "ADMIN",
  passwordHash: "$2b$12$placeholder",
};

describe("API", () => {
  let app: INestApplication;
  let prisma: {
    lead: {
      create: jest.Mock;
      findMany: jest.Mock;
      findUnique: jest.Mock;
      count: jest.Mock;
      update: jest.Mock;
      delete: jest.Mock;
    };
  };
  let email: { sendLeadNotification: jest.Mock };
  let authService: { login: jest.Mock };

  beforeEach(async () => {
    prisma = {
      lead: {
        create: jest.fn().mockResolvedValue(mockLead),
        findMany: jest.fn().mockResolvedValue([mockLead]),
        findUnique: jest.fn().mockResolvedValue(mockLead),
        count: jest.fn().mockResolvedValue(1),
        update: jest.fn().mockResolvedValue({
          ...mockLead,
          status: LeadStatus.CONTACTED,
        }),
        delete: jest.fn().mockResolvedValue(mockLead),
      },
    };

    email = {
      sendLeadNotification: jest.fn().mockResolvedValue(undefined),
    };

    authService = {
      login: jest.fn().mockResolvedValue({
        user: {
          id: mockUser.id,
          email: mockUser.email,
          name: mockUser.name,
          role: mockUser.role,
        },
        accessToken: "test-token",
      }),
    };

    const allowAuth: CanActivate = {
      canActivate: (ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest();
        req.user = {
          id: mockUser.id,
          email: mockUser.email,
          name: mockUser.name,
          role: mockUser.role,
        };
        return true;
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [
            () => ({
              JWT_SECRET: "test-secret-key-123456",
              NODE_ENV: "test",
              CORS_ORIGIN: "http://localhost:3000",
            }),
          ],
        }),
        ThrottlerModule.forRoot([{ ttl: 60_000, limit: 1000 }]),
        JwtModule.register({ secret: "test-secret-key-123456" }),
      ],
      controllers: [HealthController, LeadsController, AuthController],
      providers: [
        LeadsService,
        { provide: AuthService, useValue: authService },
        { provide: PrismaService, useValue: prisma },
        { provide: EMAIL_SERVICE, useValue: email },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(allowAuth)
      .compile();

    app = module.createNestApplication();
    app.setGlobalPrefix("api");
    app.use(cookieParser());
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it("GET /api/health returns ok", async () => {
    const res = await request(app.getHttpServer()).get("/api/health").expect(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe("ok");
  });

  it("POST /api/leads creates a lead", async () => {
    const preferredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    const res = await request(app.getHttpServer())
      .post("/api/leads")
      .send({
        name: "Jane Doe",
        email: "jane@acme.com",
        preferredAt,
        note: "Lead follow-up",
        companyWebsite: "",
      })
      .expect(201);

    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toBe("jane@acme.com");
    expect(prisma.lead.create).toHaveBeenCalled();
    expect(email.sendLeadNotification).toHaveBeenCalled();
  });

  it("POST /api/leads rejects invalid email", async () => {
    const preferredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    const res = await request(app.getHttpServer())
      .post("/api/leads")
      .send({
        name: "Jane",
        email: "not-an-email",
        preferredAt,
        companyWebsite: "",
      })
      .expect(400);

    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("POST /api/leads rejects missing required fields", async () => {
    const res = await request(app.getHttpServer())
      .post("/api/leads")
      .send({ name: "Only name" })
      .expect(400);

    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("GET /api/leads returns list when authenticated", async () => {
    const res = await request(app.getHttpServer()).get("/api/leads").expect(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.items).toHaveLength(1);
    expect(res.body.data.total).toBe(1);
  });

  it("GET /api/leads/:id returns a lead", async () => {
    const res = await request(app.getHttpServer())
      .get("/api/leads/lead_1")
      .expect(200);
    expect(res.body.data.id).toBe("lead_1");
  });

  it("PATCH /api/leads/:id updates status", async () => {
    const res = await request(app.getHttpServer())
      .patch("/api/leads/lead_1")
      .send({ status: "CONTACTED" })
      .expect(200);
    expect(res.body.data.status).toBe("CONTACTED");
  });

  it("DELETE /api/leads/:id deletes a lead", async () => {
    const res = await request(app.getHttpServer())
      .delete("/api/leads/lead_1")
      .expect(200);
    expect(res.body.data.deleted).toBe(true);
  });

  it("POST /api/auth/login sets cookie on success", async () => {
    const res = await request(app.getHttpServer())
      .post("/api/auth/login")
      .send({ email: "admin@example.com", password: "ChangeMe123!" })
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.headers["set-cookie"]).toBeDefined();
  });
});

describe("API auth guard", () => {
  it("rejects unauthenticated lead list", async () => {
    const deny: CanActivate = { canActivate: () => false };

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [
            () => ({
              JWT_SECRET: "test-secret-key-123456",
              NODE_ENV: "test",
            }),
          ],
        }),
        ThrottlerModule.forRoot([{ ttl: 60_000, limit: 1000 }]),
        JwtModule.register({ secret: "test-secret-key-123456" }),
      ],
      controllers: [LeadsController],
      providers: [
        LeadsService,
        {
          provide: PrismaService,
          useValue: {
            lead: {
              findMany: jest.fn(),
              count: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
        { provide: EMAIL_SERVICE, useValue: { sendLeadNotification: jest.fn() } },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(deny)
      .compile();

    const app = module.createNestApplication();
    app.setGlobalPrefix("api");
    await app.init();

    await request(app.getHttpServer()).get("/api/leads").expect(403);
    await app.close();
  });
});
