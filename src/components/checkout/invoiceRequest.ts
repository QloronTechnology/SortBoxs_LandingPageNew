"use client";

import type { CheckoutState } from "@/lib/checkoutPricing";

export type InvoiceRequestResult =
  | { status: "requested"; requestId: string; amount: number; period: "month" | "year"; email: string }
  | { status: "failed"; message: string };

/** Sends an "Invoice / Bank Transfer" order to our API (no online payment). */
export async function requestInvoice(checkout: CheckoutState): Promise<InvoiceRequestResult> {
  try {
    const response = await fetch("/api/checkout/invoice-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ checkout }),
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) return { status: "failed", message: body.error ?? "We couldn't send your request. Please try again." };
    return { status: "requested", ...body };
  } catch {
    return { status: "failed", message: "We couldn't reach our servers. Check your connection and try again." };
  }
}
