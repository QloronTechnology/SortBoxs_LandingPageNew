import type { CheckoutState } from "@/lib/checkoutPricing";
import { findCountry } from "@/lib/tax";
import { ApiError } from "./apiClient";

/**
 * The one place where backend JSON meets frontend models, in both directions. Components and hooks use
 * the models below; if the backend renames a field, only this file changes.
 */

export type BillingPlanType = "MONTHLY" | "YEARLY";

const isNumber = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value);
const toNumber = (value: unknown) => (isNumber(value) ? value : typeof value === "string" && value.trim() ? Number(value) : NaN);

function invalid(what: string, raw: unknown): never {
  console.error(`[subscriptionApi] unexpected ${what} response`, raw);
  throw new ApiError("invalid_response", `Unexpected ${what} response from the server.`, { details: raw });
}

/* ---- GET /cards/{id} ---- */

export interface SubscriptionPlan {
  id: number;
  name: string;
  description: string;
  billingPlanType: BillingPlanType;
  /** Per-user monthly base price. */
  pricePerUser: number;
  /** One user for `billingPlanType`'s period, before the backend's yearly discount. */
  totalAmount: number;
  /** App routes included in the plan, e.g. "/payroll". */
  modules: string[];
  /** Not sent by the backend yet. */
  popular?: boolean;
}

export function mapSubscriptionPlanResponse(raw: unknown): SubscriptionPlan {
  const data = (raw ?? {}) as Record<string, unknown>;
  // The live API sends `pricePerUser`; the PDF's example called it `price`. Accept both, here only.
  const pricePerUser = toNumber(data.pricePerUser ?? data.price);
  const totalAmount = toNumber(data.totalAmount);
  const id = toNumber(data.subscriptionId);
  if (!isNumber(id) || typeof data.name !== "string" || !isNumber(pricePerUser) || !isNumber(totalAmount)) {
    invalid("subscription plan", raw);
  }
  return {
    id,
    name: data.name,
    description: typeof data.description === "string" ? data.description : "",
    billingPlanType: data.billingPlanType === "YEARLY" ? "YEARLY" : "MONTHLY",
    pricePerUser,
    totalAmount,
    modules: Array.isArray(data.modules) ? data.modules.filter((m): m is string => typeof m === "string") : [],
    popular: typeof data.popular === "boolean" ? data.popular : undefined,
  };
}

/* ---- POST checkout/initiate ---- */

/** Exactly the fields the backend documents — no UI-only fields. */
export interface InitiateCheckoutRequest {
  subscriptionId: number;
  userLimit: number;
  billingPlanType: BillingPlanType;
  couponCode: string;
  fullName: string;
  workEmail: string;
  /** National number, digits only (the backend has no country-code field). */
  phoneNumber: string;
  companyName: string;
  taxCountry: string;
  taxState: string;
  hasGstin: boolean;
  gstin: string;
  country: string;
  state: string;
  address: string;
  city: string;
  pinCode: string;
  customerType: "BUSINESS" | "INDIVIDUAL";
}

/** Checkout form (drawer state) → backend request. The plan must be a backend plan (numeric id). */
export function buildCheckoutPayload(checkout: CheckoutState): InitiateCheckoutRequest {
  const subscriptionId = Number(checkout.plan);
  if (!Number.isInteger(subscriptionId)) throw new ApiError("validation", "No subscription plan selected.");
  const { billing } = checkout;
  const countryName = findCountry(checkout.country).name; // "IN" → "India"
  const gstin = checkout.hasTaxId ? checkout.taxId.trim() : "";
  return {
    subscriptionId,
    userLimit: checkout.planUsers,
    billingPlanType: checkout.cycle === "yearly" ? "YEARLY" : "MONTHLY",
    couponCode: checkout.coupon ?? "",
    fullName: billing.fullName.trim(),
    workEmail: billing.email.trim(),
    phoneNumber: billing.phone,
    companyName: billing.company.trim(),
    taxCountry: countryName,
    taxState: checkout.region,
    hasGstin: gstin.length > 0,
    gstin,
    country: countryName,
    state: checkout.region,
    address: billing.line1.trim(),
    city: billing.city.trim(),
    pinCode: billing.postalCode.trim(),
    customerType: billing.customerType === "business" ? "BUSINESS" : "INDIVIDUAL",
  };
}

/** What the backend charged: discount and tax are its calculation, never ours. */
export interface CheckoutQuote {
  organizationSubscriptionId: number;
  subscriptionId: number;
  planName: string;
  userLimit: number;
  billingPlanType: BillingPlanType;
  billingMonths: number;
  price: number;
  discount: number;
  finalPricePerUser: number;
  taxableAmount: number;
  cgst: number;
  sgst: number;
  igst: number;
  taxAmount: number;
  finalAmount: number;
  currency: string;
}

export function mapCheckoutResponse(raw: unknown): CheckoutQuote {
  const data = (raw ?? {}) as Record<string, unknown>;
  const organizationSubscriptionId = toNumber(data.organizationSubscriptionId);
  const finalAmount = toNumber(data.finalAmount);
  if (!isNumber(organizationSubscriptionId) || !isNumber(finalAmount)) invalid("checkout", raw);
  const num = (key: string) => (isNumber(toNumber(data[key])) ? toNumber(data[key]) : 0);
  return {
    organizationSubscriptionId,
    subscriptionId: num("subscriptionId"),
    planName: typeof data.planName === "string" ? data.planName : "",
    userLimit: num("userLimit"),
    billingPlanType: data.billingPlanType === "YEARLY" ? "YEARLY" : "MONTHLY",
    billingMonths: num("billingMonths"),
    price: num("price"),
    discount: num("discount"),
    finalPricePerUser: num("finalPricePerUser"),
    taxableAmount: num("taxableAmount"),
    cgst: num("cgst"),
    sgst: num("sgst"),
    igst: num("igst"),
    taxAmount: num("taxAmount"),
    finalAmount,
    currency: typeof data.currency === "string" ? data.currency : "",
  };
}

/* ---- POST createOrder ---- */

/**
 * Not in the PDF — this is the live dev API's response (checked 2026-09-29):
 * { orderId: "order_…", amount: 354.00, currency: "INR", keyId: "rzp_test_…", paymentId: 29, status: "CREATED" }
 */
export interface RazorpayOrder {
  /** Razorpay order id ("order_…"). */
  orderId: string;
  /** Rupees (not paise). */
  amount: number;
  currency: string;
  /** Razorpay public key id for this order. */
  keyId: string;
  /** The backend's payment record id. */
  paymentId: number | null;
  status: string;
}

export function mapCreateOrderResponse(raw: unknown): RazorpayOrder {
  const data = (raw ?? {}) as Record<string, unknown>;
  const amount = toNumber(data.amount);
  if (typeof data.orderId !== "string" || typeof data.keyId !== "string" || !isNumber(amount)) invalid("create order", raw);
  return {
    orderId: data.orderId,
    amount,
    currency: typeof data.currency === "string" && data.currency ? data.currency : "INR",
    keyId: data.keyId,
    paymentId: isNumber(toNumber(data.paymentId)) ? toNumber(data.paymentId) : null,
    status: typeof data.status === "string" ? data.status : "",
  };
}
