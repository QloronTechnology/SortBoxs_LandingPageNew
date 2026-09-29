import { ApiError } from "./apiClient";

/** Frontend models for Book a Demo, and the mapping to/from the backend's JSON. */

export interface DemoSlot {
  /** ISO 8601 instant the slot starts. */
  start: string;
}

export interface DemoBookingRequest {
  /** Calendar day picked, "YYYY-MM-DD", in `timezone`. */
  date: string;
  timezone: string;
  slotStart: string;
  fullName: string;
  workEmail: string;
  /** E.164, e.g. +917020038436 */
  phoneNumber: string;
  phoneCountry: string;
  companyName: string;
  jobTitle: string;
  companySize: string;
  additionalEmails: string[];
  /** Module slugs from src/data/modules.ts. */
  interestedModules: string[];
  message: string;
}

export interface DemoBookingResult {
  reference?: string;
}

const isObject = (value: unknown): value is Record<string, unknown> => !!value && typeof value === "object";

/**
 * Accepts `[{ start }]` or `{ slots: [...] }`; `start` may also be `startTime` / `slotStart`. Slots the
 * backend marks `available: false` are dropped — only bookable slots reach the UI.
 */
export function mapAvailabilityResponse(data: unknown): DemoSlot[] {
  const list = Array.isArray(data) ? data : isObject(data) && Array.isArray(data.slots) ? data.slots : null;
  if (!list) throw new ApiError("invalid_response", "Unexpected availability response.");
  return list
    .filter((slot) => isObject(slot) && slot.available !== false)
    .map((slot) => (slot as Record<string, unknown>).start ?? (slot as Record<string, unknown>).startTime ?? (slot as Record<string, unknown>).slotStart)
    .filter((start): start is string => typeof start === "string" && !Number.isNaN(Date.parse(start)))
    .sort((a, b) => Date.parse(a) - Date.parse(b))
    .map((start) => ({ start }));
}

export function mapBookingResponse(data: unknown): DemoBookingResult {
  if (!isObject(data)) return {};
  const reference = data.reference ?? data.bookingId ?? data.id;
  return { reference: reference == null ? undefined : String(reference) };
}
