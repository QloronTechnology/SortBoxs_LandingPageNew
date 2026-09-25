"use client";

import { useSyncExternalStore } from "react";
import type { BillingCycle } from "@/data/pricing";
import type { CheckoutRequest } from "./CheckoutProvider";

/**
 * The checkout drawer's open state lives in the URL hash, so the browser Back button closes it and
 * links can open it (emails, ads, sales):
 *   #customize-plan                        → custom plan (pick modules)
 *   #checkout=professional&cycle=yearly   → a /pricing plan
 * Hash-only history entries carry no state, which the Next.js router ignores.
 */
const CUSTOM_HASH = "#customize-plan";
const PLAN_PREFIX = "#checkout=";

export function parseCheckoutHash(hash: string): CheckoutRequest | null {
  if (hash === CUSTOM_HASH) return { plan: null, cycle: null };
  if (!hash.startsWith(PLAN_PREFIX)) return null;
  const params = new URLSearchParams(hash.slice(1));
  const cycle = params.get("cycle");
  return { plan: params.get("checkout"), cycle: cycle === "monthly" || cycle === "yearly" ? cycle : null };
}

export function checkoutHash({ plan, cycle }: { plan: string | null; cycle?: BillingCycle | null }) {
  if (!plan) return CUSTOM_HASH;
  return `${PLAN_PREFIX}${plan}${cycle ? `&cycle=${cycle}` : ""}`;
}

// True when we added the hash entry ourselves, so closing can step back over it.
let pushed = false;

export function openCheckout(request: { plan: string | null; cycle?: BillingCycle | null }) {
  pushed = true;
  window.location.hash = checkoutHash(request);
}

export function closeCheckout() {
  if (pushed) {
    pushed = false;
    history.back();
  } else {
    // Arrived via a checkout link: drop the hash without leaving the page.
    history.replaceState(history.state, "", window.location.pathname + window.location.search);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }
}

/** Keep the hash in step with in-drawer changes (plan, cycle) without adding history entries. */
export function syncCheckoutHash(request: { plan: string | null; cycle?: BillingCycle | null }) {
  const hash = checkoutHash(request);
  if (window.location.hash !== hash) history.replaceState(history.state, "", hash);
}

const subscribe = (onChange: () => void) => {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
};

/** The current hash (re-rendering on changes); "" on the server. */
export const useLocationHash = () => useSyncExternalStore(subscribe, () => window.location.hash, () => "");
