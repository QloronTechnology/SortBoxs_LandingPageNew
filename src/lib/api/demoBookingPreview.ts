import { weekday, zonedTime } from "@/lib/timezone";
import type { DemoBookingResult, DemoSlot } from "./demoBookingMappers";

/**
 * TEMPORARY local stand-in for the demo-booking API, used only when `demoBookingPreview` is on (see
 * demoBookingEndpoints.ts). Not real availability: weekdays get the reference design's slots, a couple
 * are taken out per day so the "only open slots" behaviour is visible, and weekends are empty. Delete
 * this file once the backend endpoints exist.
 */

const previewTimes = ["09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "14:00", "14:30", "15:00", "15:30", "16:00"];

const wait = (ms: number, signal?: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const timer = setTimeout(resolve, ms);
    signal?.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });

export async function previewAvailability(date: string, timezone: string, signal?: AbortSignal): Promise<DemoSlot[]> {
  await wait(450, signal);
  const day = weekday(date);
  if (day === 0 || day === 6) return [];
  const seed = Number(date.replace(/-/g, "")) % previewTimes.length;
  const taken = new Set([previewTimes[seed], previewTimes[(seed + 5) % previewTimes.length]]);
  const now = Date.now();
  return previewTimes
    .filter((time) => !taken.has(time))
    .map((time) => zonedTime(date, time, timezone))
    .filter((start) => start.getTime() > now + 60 * 60_000)
    .map((start) => ({ start: start.toISOString() }));
}

export async function previewBooking(): Promise<DemoBookingResult> {
  await wait(900);
  return { reference: undefined };
}
