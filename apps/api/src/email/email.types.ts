export interface LeadNotificationPayload {
  name: string;
  businessName: string;
  email: string;
  website?: string | null;
  country: string;
  industry?: string | null;
  improvement?: string | null;
  message?: string | null;
}

export interface EmailService {
  sendLeadNotification(payload: LeadNotificationPayload): Promise<void>;
}

export const EMAIL_SERVICE = Symbol("EMAIL_SERVICE");
