import { getApiUrl } from "./config";
import type { ApiResponse, CreateLeadInput, LeadDto } from "@consultancy/shared";

export async function submitLead(
  payload: CreateLeadInput,
): Promise<ApiResponse<LeadDto>> {
  const res = await fetch(`${getApiUrl()}/api/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await res.json()) as ApiResponse<LeadDto>;
  if (!res.ok && data.success !== false) {
    return {
      success: false,
      error: {
        code: "REQUEST_FAILED",
        message: "Unable to submit your enquiry. Please try again.",
      },
    };
  }
  return data;
}
