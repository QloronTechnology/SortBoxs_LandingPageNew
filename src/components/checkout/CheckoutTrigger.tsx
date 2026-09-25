"use client";

import type { ReactNode } from "react";
import type { BillingCycle } from "@/data/pricing";
import { openCheckout } from "./checkoutRequest";

/** A button that opens the checkout drawer — for a /pricing plan, or (no `plan`) a custom plan. */
export function CheckoutTrigger({
  plan = null,
  cycle,
  className,
  children,
}: {
  plan?: string | null;
  cycle?: BillingCycle;
  className?: string;
  children: ReactNode;
}) {
  return (
    <button type="button" aria-haspopup="dialog" onClick={() => openCheckout({ plan, cycle })} className={className}>
      {children}
    </button>
  );
}
