import { modules } from "@/data/modules";

/**
 * Config for the "Start Free" onboarding flow (/signup).
 *
 * IMPORTANT — gaps against the real backend, found while building this:
 *  - There is no "Free" plan anywhere in the subscription system. `lib/plansApi.ts` /
 *    `lib/api/subscriptionApi.ts` only load the paid plans configured in the SortBoxs admin, and the only
 *    other plan precedent (`data/mockPlans.ts`) is paid too. `freePlan` below is a local definition for
 *    this flow only — it is intentionally NOT added to `data/pricing.ts`, so it can't show up on /pricing
 *    or in the real checkout.
 *  - There is no module-selection-limit field on any plan. `freeModuleLimit` is this flow's own default
 *    (matching the 3-module reference design) — change it here if the business sets a real number.
 *  - There is no account/organization-creation endpoint — see `createFreeAccount` in
 *    `components/start-free/startFreeApi.ts`.
 * The account-creation call should be swapped for a real one once the backend team provides it.
 */

/** Same module list used across the rest of the app (platform pages, pricing) — the one source of truth. */
export const startFreeModules = modules;

export const freeModuleLimit = 3;

export const freePlan = {
  name: "Free Plan",
  priceLabel: "₹0 / month",
  userLimit: 5,
  moduleLimit: freeModuleLimit,
  features: [`Up to ${5} users`, "Core reporting", "Community support", "No credit card required"],
};

export const companySizeOptions = ["1–10 employees", "11–50 employees", "51–200 employees", "201–500 employees", "500+ employees"];

/**
 * The 4-step workflow shown for a module in the Start Free visualization, keyed by the real module slugs
 * in `data/modules.ts`. This step-list doesn't exist anywhere else in the app (modules there carry a
 * tagline/description, not a workflow breakdown) — it's a new, local piece of visual metadata for this
 * flow only, not a claim about how each module's screens are actually built.
 */
export const moduleFlows: Record<string, string[]> = {
  crm: ["Customer", "Lead", "Opportunity", "Deal"],
  sales: ["Lead", "Opportunity", "Deal", "Revenue"],
  service: ["Customer", "Ticket", "Support", "Resolution"],
  hrms: ["Employee", "Attendance", "Leave", "Payroll"],
  finance: ["Invoice", "Expense", "Payment", "Reports"],
  projects: ["Project", "Tasks", "Team", "Progress"],
  procurement: ["Requisition", "Purchase Order", "Vendor", "Delivery"],
  inventory: ["Product", "Stock", "Warehouse", "Movement"],
  marketing: ["Campaign", "Leads", "Engagement", "Conversion"],
  analytics: ["Business Data", "Reports", "Insights"],
  automation: ["Trigger", "Workflow", "Action"],
  "ai-interview": ["Candidate", "Interview", "AI Evaluation", "Result"],
  ai: ["Data", "AI", "Insight", "Action"],
  commerce: ["Product", "Cart", "Order", "Customer"],
};
