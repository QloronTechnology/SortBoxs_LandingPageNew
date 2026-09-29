"use client";

import { useEffect, useState } from "react";
import { isApiError } from "@/lib/api/apiClient";
import { getDemoAvailability } from "@/lib/api/demoBookingApi";
import type { DemoSlot } from "@/lib/api/demoBookingMappers";

export type AvailabilityState =
  | { status: "loading" }
  | { status: "ready"; slots: DemoSlot[] }
  | { status: "error"; message: string };

/** Open demo slots for a day in a time zone; refetches (and cancels the old request) when either changes. */
export function useDemoAvailability(date: string, timezone: string) {
  const [result, setResult] = useState<{ key: string; state: AvailabilityState } | null>(null);
  const [attempt, setAttempt] = useState(0);
  const key = `${date}|${timezone}|${attempt}`;

  useEffect(() => {
    const controller = new AbortController();
    getDemoAvailability(date, timezone, controller.signal)
      .then((slots) => setResult({ key, state: { status: "ready", slots } }))
      .catch((error: unknown) => {
        if (controller.signal.aborted || (error instanceof DOMException && error.name === "AbortError")) return;
        const message = isApiError(error) && error.kind === "config" ? error.message : "We couldn't load available times.";
        setResult({ key, state: { status: "error", message } });
      });
    return () => controller.abort();
  }, [date, timezone, key]);

  // A result for an older date/zone counts as loading, so stale slots never show for the new day.
  const state: AvailabilityState = result?.key === key ? result.state : { status: "loading" };
  return { state, retry: () => setAttempt((n) => n + 1) };
}
