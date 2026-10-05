import { z } from "zod";
import { LeadSource, LeadStatus } from "./enums";

export const createLeadSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  businessName: z.string().trim().min(1, "Business name is required").max(160),
  email: z.string().trim().email("Valid email is required").max(255),
  website: z
    .string()
    .trim()
    .max(255)
    .optional()
    .or(z.literal(""))
    .transform((v) => (v === "" ? undefined : v)),
  country: z.string().trim().min(1, "Country is required").max(80),
  industry: z
    .string()
    .trim()
    .max(120)
    .optional()
    .or(z.literal(""))
    .transform((v) => (v === "" ? undefined : v)),
  improvement: z
    .string()
    .trim()
    .min(1, "Please tell us what you would like to improve")
    .max(2000),
  message: z
    .string()
    .trim()
    .max(2000)
    .optional()
    .or(z.literal(""))
    .transform((v) => (v === "" ? undefined : v)),
  source: z.nativeEnum(LeadSource).optional().default(LeadSource.WEBSITE),
  /** Honeypot — must be empty. Rejected if filled. */
  companyWebsite: z.string().max(0).optional().default(""),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;

export const updateLeadSchema = z.object({
  status: z.nativeEnum(LeadStatus).optional(),
  industry: z.string().trim().max(120).optional(),
  country: z.string().trim().max(80).optional(),
  message: z.string().trim().max(2000).optional(),
  improvement: z.string().trim().max(2000).optional(),
  source: z.nativeEnum(LeadSource).optional(),
});

export type UpdateLeadInput = z.infer<typeof updateLeadSchema>;

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8).max(128),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const leadQuerySchema = z.object({
  status: z.nativeEnum(LeadStatus).optional(),
  industry: z.string().trim().optional(),
  country: z.string().trim().optional(),
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
});

export type LeadQueryInput = z.infer<typeof leadQuerySchema>;

export const CHAT_MAX_MESSAGES = 40;
export const CHAT_MAX_MESSAGE_LENGTH = 2000;

export const chatMessageSchema = z.object({
  role: z.enum(["user", "model"]),
  text: z.string().trim().min(1).max(CHAT_MAX_MESSAGE_LENGTH),
});

export type ChatMessage = z.infer<typeof chatMessageSchema>;

const chatSessionId = z.string().trim().min(8).max(100);
const chatMessages = z.array(chatMessageSchema).min(1).max(CHAT_MAX_MESSAGES);

export const chatTurnSchema = z.object({
  sessionId: chatSessionId,
  messages: chatMessages.refine(
    (m) => m[m.length - 1]?.role === "user",
    "The last message must be from the user",
  ),
});

export type ChatTurnInput = z.infer<typeof chatTurnSchema>;

export const chatEndSchema = z.object({
  sessionId: chatSessionId,
  messages: chatMessages.refine(
    (m) => m.some((msg) => msg.role === "user"),
    "At least one user message is required",
  ),
  meetingRequested: z.boolean().optional().default(false),
});

export type ChatEndInput = z.infer<typeof chatEndSchema>;
