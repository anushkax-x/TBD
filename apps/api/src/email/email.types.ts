export interface LeadNotificationPayload {
  name: string;
  businessName: string;
  email: string;
  website?: string | null;
  country: string;
  industry?: string | null;
  improvement?: string | null;
  message?: string | null;
  preferredAt?: string | null;
}

export type Feasibility = "yes" | "partly" | "no" | "unclear";

export interface ChatSummaryPayload {
  sessionId: string;
  name?: string | null;
  email?: string | null;
  businessName?: string | null;
  need: string;
  feasibility: Feasibility;
  suggestedApproach?: string | null;
  meetingRequested: boolean;
  notes?: string | null;
  transcript: { role: "user" | "model"; text: string }[];
}

export interface EmailService {
  sendLeadNotification(payload: LeadNotificationPayload): Promise<void>;
  sendChatSummary(payload: ChatSummaryPayload): Promise<void>;
}

export const EMAIL_SERVICE = Symbol("EMAIL_SERVICE");
