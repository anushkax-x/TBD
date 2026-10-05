import { getApiUrl } from "./config";
import type {
  ApiResponse,
  ChatEndDto,
  ChatEndInput,
  ChatStreamEvent,
  ChatTurnInput,
  CreateLeadInput,
  LeadDto,
} from "@consultancy/shared";

async function postJson<T>(
  path: string,
  payload: unknown,
  fallbackMessage: string,
  init?: RequestInit,
): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${getApiUrl()}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      ...init,
    });

    const data = (await res.json()) as ApiResponse<T>;
    if (!res.ok && data.success !== false) {
      return {
        success: false,
        error: { code: "REQUEST_FAILED", message: fallbackMessage },
      };
    }
    return data;
  } catch {
    return {
      success: false,
      error: { code: "NETWORK_ERROR", message: fallbackMessage },
    };
  }
}

export function submitLead(
  payload: CreateLeadInput,
): Promise<ApiResponse<LeadDto>> {
  return postJson(
    "/api/leads",
    payload,
    "Unable to submit your enquiry. Please try again.",
  );
}

const CHAT_STREAM_ERROR = "Our AI assistant couldn't respond. Please try again.";

/** Reads the Server-Sent Events stream from /api/chat/stream, calling onEvent per event. */
export async function streamChatMessage(
  payload: ChatTurnInput,
  onEvent: (event: ChatStreamEvent) => void,
  signal?: AbortSignal,
): Promise<void> {
  let res: Response;
  try {
    res = await fetch(`${getApiUrl()}/api/chat/stream`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "text/event-stream" },
      body: JSON.stringify(payload),
      signal,
    });
  } catch {
    if (!signal?.aborted) onEvent({ type: "error", message: CHAT_STREAM_ERROR });
    return;
  }

  const isStream = res.headers.get("content-type")?.includes("text/event-stream");
  if (!res.ok || !isStream || !res.body) {
    const data = (await res.json().catch(() => null)) as ApiResponse<unknown> | null;
    onEvent({
      type: "error",
      message: data && !data.success ? data.error.message : CHAT_STREAM_ERROR,
    });
    return;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  try {
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      let boundary: number;
      while ((boundary = buffer.indexOf("\n\n")) >= 0) {
        const block = buffer.slice(0, boundary);
        buffer = buffer.slice(boundary + 2);
        const data = block
          .split("\n")
          .filter((line) => line.startsWith("data:"))
          .map((line) => line.slice(5).trimStart())
          .join("\n");
        if (data) onEvent(JSON.parse(data) as ChatStreamEvent);
      }
    }
  } catch {
    if (!signal?.aborted) onEvent({ type: "error", message: CHAT_STREAM_ERROR });
  }
}

export function endChat(
  payload: ChatEndInput,
): Promise<ApiResponse<ChatEndDto>> {
  return postJson(
    "/api/chat/end",
    payload,
    "We couldn't send your conversation. Please try again.",
    { keepalive: true },
  );
}
