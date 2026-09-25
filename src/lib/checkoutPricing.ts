import type { LucideIcon } from "lucide-react";
import { checkoutModules, defaultSelection, defaultUsers, yearlyDiscount } from "@/data/checkout";
import { defaultLocation, type BillingCountry } from "@/data/billingTax";
import { evaluateCoupon, findCoupon, type Coupon } from "@/data/coupons";
import type { MenuTone } from "@/data/menus/types";
import { pricingPlans, type BillingCycle, type PricingPlan } from "@/data/pricing";
import { defaultPhoneCountry } from "@/data/phone";
import { findCountry, quoteTax, validateTaxId, type TaxQuote } from "@/lib/tax";

/**
 * Checkout state and pricing — pure (no React), so the browser (CheckoutProvider) and the server
 * (/api/checkout/order, which recomputes the amount before charging) use exactly the same maths.
 */

export const checkoutPlans = pricingPlans.filter((plan) => plan.price);
export const findPlan = (id: string | null) => checkoutPlans.find((plan) => plan.id === id) ?? null;

export interface CheckoutState {
  /** A fixed plan from /pricing (its id), or null for a custom plan built from modules. */
  plan: string | null;
  /** Users on the fixed plan. */
  planUsers: number;
  /** Custom plan: users per module id; 0 (or missing) means the module is not in the plan. */
  users: Record<string, number>;
  cycle: BillingCycle;
  country: string;
  region: string;
  /** "I have a GSTIN / VAT number / …" is ticked, and what was typed. */
  hasTaxId: boolean;
  taxId: string;
  /** Applied coupon code (re-checked on every change), or null. */
  coupon: string | null;
  billing: BillingDetails;
  /** Step 3 "I agree to the Terms of Service…" */
  termsAccepted: boolean;
}

export type PaymentMethodId = "card" | "upi" | "netbanking" | "invoice";

/** Step 2 details. Card/UPI/bank details are never here — Razorpay Checkout collects them. */
export interface BillingDetails {
  fullName: string;
  email: string;
  company: string;
  customerType: "business" | "individual";
  line1: string;
  city: string;
  postalCode: string;
  /** "Use this address for business correspondence". */
  correspondence: boolean;
  /** Which Razorpay method opens first; the details themselves are entered in Razorpay's window. */
  paymentMethod: PaymentMethodId;
  /** Phone: country (for the dial code) + national number, digits only. */
  phoneCountry: string;
  phone: string;
  /** Invoice / bank transfer only: the buyer's PO reference. */
  poNumber: string;
}

/** What opened the drawer: a plan card (plan + the cycle shown there) or "Customize Your Plan". */
export interface CheckoutRequest {
  plan: string | null;
  cycle: BillingCycle | null;
}

export function initialCheckoutState(): CheckoutState {
  return {
    plan: null,
    planUsers: defaultUsers,
    users: Object.fromEntries(defaultSelection.map((id) => [id, defaultUsers])),
    cycle: "monthly",
    country: defaultLocation.country,
    region: defaultLocation.region,
    hasTaxId: false,
    taxId: "",
    coupon: null,
    billing: {
      fullName: "",
      email: "",
      company: "",
      customerType: "business",
      line1: "",
      city: "",
      postalCode: "",
      correspondence: true,
      paymentMethod: "card",
      phoneCountry: defaultPhoneCountry,
      phone: "",
      poNumber: "",
    },
    termsAccepted: false,
  };
}


export interface PlanLine {
  id: string;
  name: string;
  icon: LucideIcon;
  tone: MenuTone;
  users: number;
  /** List price for this line over one billing period (before the yearly discount). */
  amount: number;
}

export interface AppliedCoupon {
  coupon: Coupon;
  /** INR off per billing period; 0 when `error` says why it no longer applies. */
  discount: number;
  error?: string;
}

export interface CheckoutTotals {
  /** The fixed plan being bought, or null for a custom (modules) plan. */
  plan: PricingPlan | null;
  /** What one bill covers: amounts below are per month (monthly) or per year (yearly), in INR. */
  period: "month" | "year";
  lines: PlanLine[];
  totalUsers: number;
  subtotal: number;
  /** Yearly-billing discount, and how to label it. */
  discount: number;
  discountLabel: string;
  coupon: AppliedCoupon | null;
  /** Subtotal after the yearly discount and coupon — what tax is charged on. */
  taxable: number;
  tax: TaxQuote;
  /** Amount due each billing period, and the same plan with no discounts at all. */
  total: number;
  listTotal: number;
  /** Yearly plans: the total spread over 12 months. */
  perMonth: number;
  /** Monthly plans: the yearly total, and what switching to yearly would save per year. */
  perYear: number;
  yearlySaving: number;
  country: BillingCountry;
  /** Null when there's no tax ID to check (or it's valid). */
  taxIdError: string | null;
  hasValidTaxId: boolean;
  /** Country (and state/province, where asked for) are filled in. */
  locationComplete: boolean;
  canContinue: boolean;
}

/** Plan lines, list subtotal, yearly discount and the saving yearly would give — per billing period. */
function pricePlan(state: CheckoutState, months: number) {
  const plan = findPlan(state.plan);

  if (plan?.price) {
    const { monthly, yearly } = plan.price;
    const users = state.planUsers;
    const saving = users * (monthly * 12 - yearly); // per year
    const subtotal = users * monthly * months;
    return {
      plan,
      lines: [{ id: plan.id, name: `${plan.name} plan`, icon: plan.icon, tone: "purple" as MenuTone, users, amount: subtotal }],
      subtotal,
      discount: months === 12 ? saving : 0,
      discountLabel: `Yearly price (save ${Math.round((1 - yearly / (monthly * 12)) * 100)}%)`,
      yearlySaving: saving,
    };
  }

  const lines = checkoutModules
    .map((module) => {
      const users = state.users[module.id] ?? 0;
      const { id, name, icon, tone } = module;
      return { id, name, icon, tone, users, amount: users * module.pricePerUser * months };
    })
    .filter((line) => line.users > 0);
  const subtotal = lines.reduce((sum, line) => sum + line.amount, 0);
  return {
    plan: null,
    lines,
    subtotal,
    discount: months === 12 ? Math.round(subtotal * yearlyDiscount) : 0,
    discountLabel: `Annual Discount (${yearlyDiscount * 100}%)`,
    yearlySaving: Math.round((subtotal / months) * 12 * yearlyDiscount),
  };
}

export function computeTotals(state: CheckoutState): CheckoutTotals {
  const yearly = state.cycle === "yearly";
  const months = yearly ? 12 : 1;
  const { plan, lines, subtotal, discount, discountLabel, yearlySaving } = pricePlan(state, months);
  const country = findCountry(state.country);

  const found = state.coupon ? findCoupon(state.coupon) : undefined;
  const coupon = found
    ? { coupon: found, ...evaluateCoupon(found, { amount: subtotal - discount, cycle: state.cycle, months }) }
    : null;
  const taxable = subtotal - discount - (coupon?.discount ?? 0);

  // The tax ID is optional: only a typed one is checked (and, when valid, can switch to reverse charge).
  const taxIdError = state.hasTaxId && state.taxId ? validateTaxId(state.country, state.region, state.taxId) : null;
  const hasValidTaxId = state.hasTaxId && !!state.taxId && !taxIdError;
  const location = { country: state.country, region: state.region, hasValidTaxId };
  const tax = quoteTax(location, taxable);
  const total = taxable + tax.total;
  const locationComplete = !country.regions || country.regions.some((r) => r.name === state.region);

  return {
    plan,
    period: yearly ? "year" : "month",
    lines,
    totalUsers: lines.reduce((sum, line) => sum + line.users, 0),
    subtotal,
    discount,
    discountLabel,
    coupon,
    taxable,
    tax,
    total,
    listTotal: subtotal + quoteTax(location, subtotal).total,
    perMonth: Math.round(total / 12),
    perYear: total * 12,
    yearlySaving,
    country,
    taxIdError,
    hasValidTaxId,
    locationComplete,
    canContinue: lines.length > 0 && locationComplete && !taxIdError,
  };
}
