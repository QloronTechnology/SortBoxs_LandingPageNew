"use client";

import { createContext, useContext, useEffect, useMemo, useReducer, type ReactNode } from "react";
import { maxUsersPerModule } from "@/data/checkout";
import { fallbackPostal, postalFormats, sanitizePostal } from "@/data/payment";
import { phoneCountries } from "@/data/phone";
import type { BillingCycle } from "@/data/pricing";
import {
  computeTotals,
  findPlan,
  initialCheckoutState,
  type BillingDetails,
  type CheckoutRequest,
  type CheckoutState,
  type CheckoutTotals,
} from "@/lib/checkoutPricing";

export * from "@/lib/checkoutPricing";

type Action =
  | { type: "setPlan"; plan: string | null }
  | { type: "setPlanUsers"; users: number }
  | { type: "addPlanUsers"; delta: number }
  | { type: "setUsers"; id: string; users: number }
  | { type: "addUsers"; id: string; delta: number }
  | { type: "clear" }
  | { type: "setCycle"; cycle: BillingCycle }
  | { type: "setCountry"; country: string }
  | { type: "setRegion"; region: string }
  | { type: "setHasTaxId"; hasTaxId: boolean }
  | { type: "setTaxId"; taxId: string }
  | { type: "setCoupon"; coupon: string | null }
  | { type: "updateBilling"; patch: Partial<BillingDetails> }
  | { type: "setTermsAccepted"; accepted: boolean }
  | { type: "restore"; state: CheckoutState };

const STORAGE_KEY = "sortboxs.checkout.v6";

const clampUsers = (users: number, min = 0) =>
  Number.isFinite(users) ? Math.min(maxUsersPerModule, Math.max(min, Math.round(users))) : min;

/** The request decides the mode (plan or custom) and, when given, the billing cycle. */
const applyRequest = (state: CheckoutState, request: CheckoutRequest): CheckoutState => ({
  ...state,
  plan: findPlan(request.plan)?.id ?? null,
  cycle: request.cycle ?? state.cycle,
});

function update(state: CheckoutState, action: Exclude<Action, { type: "restore" }>): CheckoutState {
  switch (action.type) {
    case "setPlan":
      return { ...state, plan: action.plan };
    case "setPlanUsers":
      return { ...state, planUsers: clampUsers(action.users, 1) };
    case "addPlanUsers":
      return { ...state, planUsers: clampUsers(state.planUsers + action.delta, 1) };
    case "setUsers":
      return { ...state, users: { ...state.users, [action.id]: clampUsers(action.users) } };
    case "addUsers":
      return { ...state, users: { ...state.users, [action.id]: clampUsers((state.users[action.id] ?? 0) + action.delta) } };
    case "clear":
      return { ...state, users: {} };
    case "setCycle":
      return { ...state, cycle: action.cycle };
    case "setCountry": {
      // Tax IDs are country-specific, so start over; the region must be picked for the new country.
      const postal = postalFormats[action.country] ?? fallbackPostal;
      return {
        ...state,
        country: action.country,
        region: "",
        hasTaxId: false,
        taxId: "",
        // Keep the postal code only if it already fits the new country's characters; otherwise clear it
        // rather than leave a fragment (a UK "SW1A 1AA" must not become an Indian "11").
        billing: {
          ...state.billing,
          // The phone's country follows the billing country until a number has been typed.
          phoneCountry:
            !state.billing.phone && phoneCountries.some((c) => c.code === action.country)
              ? action.country
              : state.billing.phoneCountry,
          postalCode:
            sanitizePostal(state.billing.postalCode, postal) === state.billing.postalCode ? state.billing.postalCode : "",
        },
      };
    }
    case "setRegion":
      return { ...state, region: action.region };
    case "setHasTaxId":
      return { ...state, hasTaxId: action.hasTaxId };
    case "setTaxId":
      // Keep letters/digits only: people paste "CHE-123.456.789" or "GB 123 4567 89".
      return { ...state, taxId: action.taxId.toUpperCase().replace(/[^0-9A-Z]/g, "").slice(0, 20) };
    case "setCoupon":
      return { ...state, coupon: action.coupon };
    case "updateBilling":
      return { ...state, billing: { ...state.billing, ...action.patch } };
    case "setTermsAccepted":
      return { ...state, termsAccepted: action.accepted };
  }
}

/** `ready` flips once the saved plan (if any) has been restored after mount. */
function reducer(store: { state: CheckoutState; ready: boolean }, action: Action) {
  if (action.type === "restore") return { state: action.state, ready: true };
  return { ...store, state: update(store.state, action) };
}

/** After a successful payment: the next checkout starts fresh. */
export function clearSavedCheckout() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nothing saved, or storage blocked.
  }
}

function readStored(): CheckoutState | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw) as Partial<CheckoutState>;
    // Layer the save over a full default state, so fields added since it was written (e.g. billing.phone)
    // get their defaults instead of being undefined. Consent is per purchase, so it's never restored.
    const defaults = initialCheckoutState();
    return {
      ...defaults,
      ...saved,
      users: saved.users ?? defaults.users,
      billing: { ...defaults.billing, ...saved.billing },
      termsAccepted: false,
    };
  } catch {
    return null;
  }
}


interface CheckoutContextValue {
  state: CheckoutState;
  totals: CheckoutTotals;
  dispatch: (action: Exclude<Action, { type: "restore" }>) => void;
  /** False until the saved plan (if any) has been restored from sessionStorage. */
  ready: boolean;
}

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

/**
 * Holds the plan being built across all checkout steps. It is saved to sessionStorage, so a refresh
 * or a round-trip to a payment gateway keeps it. The `request` (which button opened the checkout)
 * picks the plan and cycle; everything else — users, location, coupon — carries over.
 */
export function CheckoutProvider({ request, children }: { request: CheckoutRequest; children: ReactNode }) {
  const [{ state, ready }, dispatch] = useReducer(reducer, request, (initial) => ({
    state: applyRequest(initialCheckoutState(), initial),
    ready: false,
  }));

  // Restore after mount (sessionStorage doesn't exist on the server), then apply the request on top.
  useEffect(() => {
    dispatch({ type: "restore", state: applyRequest(readStored() ?? initialCheckoutState(), request) });
    // Only on mount: the drawer remounts the provider each time it opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage full or blocked: the plan still works for this page view.
    }
  }, [state, ready]);

  const value = useMemo(() => ({ state, totals: computeTotals(state), dispatch, ready }), [state, ready]);
  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>;
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) throw new Error("useCheckout must be used inside <CheckoutProvider>");
  return context;
}
