export const FLOWMINT_API_URL = "https://api.flowmint.works";
export const DEFAULT_LOCAL_API_URL = "http://localhost:3001";

const FLOWMINT_HOSTS = new Set(["flowmint.works", "www.flowmint.works"]);

export function getBookingUrl(): string | undefined {
  const url = process.env.NEXT_PUBLIC_BOOKING_URL?.trim();
  return url || undefined;
}

function isLocalApiUrl(url: string): boolean {
  try {
    const hostname = new URL(url).hostname;
    return hostname === "localhost" || hostname === "127.0.0.1";
  } catch {
    return false;
  }
}

/** Picks the API origin from the public env var, with a production-host override. */
export function resolveApiUrl(configured: string | undefined, hostname?: string): string {
  const value = configured?.trim().replace(/\/$/, "") || undefined;
  if (hostname && FLOWMINT_HOSTS.has(hostname) && (!value || isLocalApiUrl(value))) {
    return FLOWMINT_API_URL;
  }
  return value ?? DEFAULT_LOCAL_API_URL;
}

export function getApiUrl(): string {
  const hostname = typeof window !== "undefined" ? window.location.hostname : undefined;
  return resolveApiUrl(process.env.NEXT_PUBLIC_API_URL, hostname);
}
