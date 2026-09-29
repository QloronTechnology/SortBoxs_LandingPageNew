/**
 * Book a Demo endpoint paths (relative to NEXT_PUBLIC_API_BASE_URL). The backend hasn't published a
 * demo-booking API yet, so the paths come from env instead of being guessed here — set them in
 * .env.development / .env.production once the backend team documents them. Empty = not connected.
 */
export const demoBookingEndpoints = {
  /** GET, params: { date: "YYYY-MM-DD", timezone: IANA zone } → the open slots for that day. */
  availability: (process.env.NEXT_PUBLIC_DEMO_AVAILABILITY_PATH ?? "").trim(),
  /** POST, body: DemoBookingRequest → the booking reference. */
  booking: (process.env.NEXT_PUBLIC_DEMO_BOOKING_PATH ?? "").trim(),
} as const;

/**
 * TEMPORARY preview (dev only, like NEXT_PUBLIC_MOCK_PLANS): with no endpoints configured and
 * NEXT_PUBLIC_DEMO_BOOKING_PREVIEW=true, availability and submit are simulated locally so the modal can be
 * reviewed. Nothing is sent, and nothing in the UI says so; keep it out of production. Ignored once both endpoints are set.
 */
export const demoBookingPreview =
  process.env.NEXT_PUBLIC_DEMO_BOOKING_PREVIEW === "true" && !(demoBookingEndpoints.availability && demoBookingEndpoints.booking);
