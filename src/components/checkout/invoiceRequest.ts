"use client";

import type { CheckoutState } from "@/lib/checkoutPricing";
import { computeTotals } from "@/lib/checkoutPricing";
import { checkoutDemo, postCheckout } from "./checkoutApi";

export type InvoiceRequestResult =
  | { status: "requested"; requestId: string; amount: number; period: "month" | "year"; email: string; demo?: boolean }
  | { status: "failed"; message: string };

/** Sends an "Invoice / Bank Transfer" order to the checkout API (no online payment). */
export async function requestInvoice(checkout: CheckoutState): Promise<InvoiceRequestResult> {
  // TEMPORARY demo (no backend yet): nothing is sent — a local reference so the flow can be shown.
  if (checkoutDemo) {
    const totals = computeTotals(checkout);
    const date = new Date().toISOString().slice(2, 10).replace(/-/g, "");
    return {
      status: "requested",
      requestId: `SBX-INV-DEMO-${date}-${Math.floor(1000 + Math.random() * 9000)}`,
      amount: totals.total,
      period: totals.period,
      email: checkout.billing.email,
      demo: true,
    };
  }

  const result = await postCheckout<Omit<Extract<InvoiceRequestResult, { status: "requested" }>, "status">>(
    "invoice-request",
    { checkout }
  );
  return result.ok ? { status: "requested", ...result.data } : { status: "failed", message: result.message };
}
