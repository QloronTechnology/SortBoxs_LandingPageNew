import { apiClient, ApiError } from "./apiClient";
import { demoBookingEndpoints, demoBookingPreview } from "./demoBookingEndpoints";
import { mapAvailabilityResponse, mapBookingResponse, type DemoBookingRequest, type DemoBookingResult, type DemoSlot } from "./demoBookingMappers";
import { previewAvailability, previewBooking } from "./demoBookingPreview";

/**
 * Book a Demo API — HTTP only, through the shared apiClient. Errors arrive as `ApiError`; the hooks in
 * components/demo decide what to show.
 */

const notConnected = () =>
  new ApiError("config", "Online demo booking isn't connected yet. Please try again later or contact our sales team.");

export async function getDemoAvailability(date: string, timezone: string, signal?: AbortSignal): Promise<DemoSlot[]> {
  if (demoBookingPreview) return previewAvailability(date, timezone, signal);
  if (!demoBookingEndpoints.availability) throw notConnected();
  const { data } = await apiClient.get(demoBookingEndpoints.availability, { params: { date, timezone }, signal });
  return mapAvailabilityResponse(data);
}

export async function bookDemo(payload: DemoBookingRequest): Promise<DemoBookingResult> {
  if (demoBookingPreview) return previewBooking();
  if (!demoBookingEndpoints.booking) throw notConnected();
  const { data } = await apiClient.post(demoBookingEndpoints.booking, payload);
  return mapBookingResponse(data);
}
