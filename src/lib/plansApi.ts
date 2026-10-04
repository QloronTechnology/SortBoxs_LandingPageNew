import { Building2, Crown, Gem, Rocket, Send, type LucideIcon } from "lucide-react";
import type { PricingPlan } from "@/data/pricing";
import { getSubscriptionPlans } from "@/lib/api/subscriptionApi";
import type { SubscriptionPlan } from "@/lib/api/subscriptionMappers";

/** Development preview: append the mock plans (see data/mockPlans.ts). Never set in production. */
const withMockPlans = process.env.NEXT_PUBLIC_MOCK_PLANS === "true";

/**
 * Subscription plans — including Enterprise — are created in the SortBoxs admin, so /pricing and the
 * checkout load them all at runtime (this site is a static export: a new plan shows up without a
 * redeploy).
 *
 * HTTP goes through `lib/api/subscriptionApi.ts`; this file turns backend plans into pricing-card models
 * and shares them between /pricing and the checkout. Every published plan is shown, in the backend's
 * order: the list is loaded once per billing cycle (2 requests) and paired up by subscriptionId.
 */

const icons: LucideIcon[] = [Send, Crown, Building2, Rocket, Gem];

/**
 * Display labels for the app routes the backend lists as a plan's modules. Every module the API sends is
 * shown, in the API's order — this only turns "/leaveandattendance" into "Leave & Attendance". A route
 * not listed here is shown from its own name ("/newthing" → "Newthing"), so new modules appear untouched.
 */
const moduleNames: Record<string, string> = {
  "/home": "Home",
  "/leaveandattendance": "Leave & Attendance",
  "/manageaccess": "Manage Access",
  "/organization": "Organization",
  "/projectmanagement": "Project Management",
  "/payroll": "Payroll",
  "/hrms": "HRMS",
  "/myfinances": "My Finances",
  "/tenant": "Tenant",
  "/approval": "Approval",
  "/leads": "Leads",
  "/vendormanagement": "Vendor Management",
  "/email": "Email",
  "/settings": "Settings",
  "/blog": "Blog",
  "/templates": "Templates",
};

export function moduleFeatures(modules: string[] = []) {
  return modules.map((route) => moduleNames[route] ?? route.replace(/^\//, "").replace(/^./, (c) => c.toUpperCase()));
}

/** "MOST_POPULAR" → "Most Popular". */
function humanizeTag(tagName: string) {
  return tagName.toLowerCase().replace(/_/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function toPricingPlan(monthly: SubscriptionPlan, yearly: SubscriptionPlan, index: number): PricingPlan {
  return {
    id: String(monthly.id),
    name: monthly.name,
    description: monthly.description,
    icon: icons[index % icons.length],
    // `totalAmount` = one user for the period, exactly as the backend prices it; the YEARLY one already
    // has the backend's yearly discount taken off (₹90/month → ₹864/year at 20%). Never recalculated here.
    price: { monthly: monthly.totalAmount, yearly: yearly.totalAmount },
    yearlyDiscountPercent: yearly.yearlyDiscountPercentage,
    features: moduleFeatures(monthly.modules),
    cta: { label: "Get Started" },
    tag: monthly.tagName ? humanizeTag(monthly.tagName) : undefined,
    includes: monthly.includes ?? undefined,
  };
}

/** All published plans, in the backend's order. Throws if the plan list can't be loaded. */
export async function fetchPlans(): Promise<PricingPlan[]> {
  let plans: PricingPlan[] = [];
  try {
    const [monthly, yearly] = await Promise.all([getSubscriptionPlans("MONTHLY"), getSubscriptionPlans("YEARLY")]);
    const yearlyById = new Map(yearly.map((plan) => [plan.id, plan]));
    plans = monthly
      .flatMap((month) => {
        const year = yearlyById.get(month.id);
        // A plan without a yearly price can't be shown on the Monthly/Yearly toggle.
        if (!year) console.warn(`[plans] plan ${month.id} has no YEARLY price; skipped`);
        return year ? [{ month, year }] : [];
      })
      .map(({ month, year }, index) => toPricingPlan(month, year, index));
  } catch (error) {
    if (!withMockPlans) throw error;
    console.error("[plans]", error);
  }
  if (!withMockPlans) return plans;
  // TEMPORARY showcase: the mock plans are shown even when the real ones fail to load, so the page
  // always looks complete. Loaded on demand, so builds without the flag never include the mock data.
  const { mockPlans } = await import("@/data/mockPlans");
  return [...plans, ...mockPlans];
}

/* ---- Shared store: one fetch per page load, read by /pricing and the checkout ---- */

export type PlansState = { status: "loading" } | { status: "ready"; plans: PricingPlan[] } | { status: "error" };

const loading: PlansState = { status: "loading" };
let state: PlansState = loading;
let inflight: Promise<void> | null = null;
const listeners = new Set<() => void>();

function setState(next: PlansState) {
  state = next;
  listeners.forEach((listener) => listener());
}

/** Starts loading (once); `retry` loads again after an error. */
export function loadPlans({ retry = false } = {}) {
  if (inflight || state.status === "ready" || (state.status === "error" && !retry)) return;
  setState(loading);
  inflight = fetchPlans()
    .then((plans) => setState({ status: "ready", plans }))
    .catch((error) => {
      console.error("[plans]", error);
      setState({ status: "error" });
    })
    .finally(() => {
      inflight = null;
    });
}

export const getPlansState = () => state;
export const getServerPlansState = () => loading;

export function subscribePlans(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** A loaded plan by id (the checkout's `#checkout=<id>`), or null. */
export const findLoadedPlan = (id: string | null) =>
  (id && state.status === "ready" && state.plans.find((plan) => plan.id === id)) || null;
