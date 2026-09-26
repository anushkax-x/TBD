export function getBookingUrl(): string | undefined {
  const url = process.env.NEXT_PUBLIC_BOOKING_URL?.trim();
  return url || undefined;
}

export function getApiUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
}
