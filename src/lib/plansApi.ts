import { Building2, Crown, Gem, Rocket, Send, type LucideIcon } from "lucide-react";
import type { PricingPlan } from "@/data/pricing";
import { getSubscriptionCard } from "@/lib/api/subscriptionApi";
import type { SubscriptionPlan } from "@/lib/api/subscriptionMappers";
import { mockPlans } from "@/data/mockPlans";

/** Development preview: append the mock plans (see data/mockPlans.ts). Never set in production. */
const withMockPlans = process.env.NEXT_PUBLIC_MOCK_PLANS === "true";

/**
 * Subscription plans are created in the SortBoxs admin, so /pricing and the checkout load them at runtime
 * (this site is a static export: a new plan shows up without a redeploy). Enterprise is not a backend
 * plan — it stays the fixed "Contact Sales" card in `data/pricing.ts`.
 *
 * HTTP goes through `lib/api/subscriptionApi.ts`; this file turns backend plans into pricing-card models
 * and shares them between /pricing and the checkout.
 *
 * TODO(backend): there is no "list all plans" endpoint yet, so the IDs to show come from
 * NEXT_PUBLIC_PLAN_IDS (comma-separated, in display order, set per environment). Once the list endpoint
 * exists, replace `fetchPlanIds` with it.
 */

const planIds = (process.env.NEXT_PUBLIC_PLAN_IDS ?? "")
  .split(",")
  .map((id) => id.trim())
  .filter(Boolean);

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

async function fetchPlanIds() {
  return planIds;
}

function toPricingPlan(monthly: SubscriptionPlan, yearly: SubscriptionPlan, index: number): PricingPlan {
  return {
    id: String(monthly.id),
    name: monthly.name,
    description: monthly.description,
    icon: icons[index % icons.length],
    // `totalAmount` = one user for the period, as the backend sends it. The yearly discount is applied by
    // the backend at checkout (checkout/initiate) — it is deliberately not recalculated here.
    price: { monthly: monthly.totalAmount, yearly: yearly.totalAmount },
    features: moduleFeatures(monthly.modules),
    cta: { label: "Get Started" },
    popular: monthly.popular,
  };
}

/** All published plans, in display order. Plans that fail to load are skipped; if none load, it throws. */
export async function fetchPlans(): Promise<PricingPlan[]> {
  const ids = await fetchPlanIds();
  const results = await Promise.allSettled(
    ids.map((id) => Promise.all([getSubscriptionCard(id, "MONTHLY"), getSubscriptionCard(id, "YEARLY")]))
  );
  const plans: PricingPlan[] = [];
  results.forEach((result) => {
    if (result.status === "fulfilled") plans.push(toPricingPlan(...result.value, plans.length));
    else console.error("[plans]", result.reason);
  });
  if (ids.length > 0 && plans.length === 0) throw new Error("No subscription plans could be loaded.");
  return withMockPlans ? [...plans, ...mockPlans] : plans;
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
