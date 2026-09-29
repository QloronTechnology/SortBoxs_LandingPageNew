"use client";

import { useRef, useState } from "react";
import { isApiError } from "@/lib/api/apiClient";
import { bookDemo } from "@/lib/api/demoBookingApi";
import type { DemoBookingRequest, DemoBookingResult } from "@/lib/api/demoBookingMappers";

export type BookDemoState =
  | { phase: "idle" }
  | { phase: "submitting" }
  | { phase: "booked"; request: DemoBookingRequest; result: DemoBookingResult }
  | { phase: "error"; message: string; slotTaken?: boolean };

function errorMessage(error: unknown): { message: string; slotTaken?: boolean } {
  if (!isApiError(error)) return { message: "Something went wrong. Please try again." };
  switch (error.kind) {
    case "config":
      return { message: error.message };
    case "network":
    case "timeout":
      return { message: "We couldn't reach our server. Check your connection and try again." };
    case "validation":
      return { message: error.message };
    default:
      // 409: someone else just booked this slot.
      if (error.status === 409) return { message: "That time was just booked. Please pick another slot.", slotTaken: true };
      return { message: "We couldn't book your demo right now. Please try again." };
  }
}

/** Submits a booking once at a time (double clicks and Enter repeats are ignored while one is in flight). */
export function useBookDemo() {
  const [state, setState] = useState<BookDemoState>({ phase: "idle" });
  const inFlight = useRef(false);

  /** Resolves with the outcome (null if a submit was already in flight). */
  const submit = async (request: DemoBookingRequest): Promise<BookDemoState | null> => {
    if (inFlight.current) return null;
    inFlight.current = true;
    setState({ phase: "submitting" });
    let next: BookDemoState;
    try {
      const result = await bookDemo(request);
      next = { phase: "booked", request, result };
    } catch (error) {
      next = { phase: "error", ...errorMessage(error) };
    } finally {
      inFlight.current = false;
    }
    setState(next);
    return next;
  };

  return { state, submit };
}
