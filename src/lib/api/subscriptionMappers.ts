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

const htmlEntities: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&nbsp;": " ",
};

/**
 * Plan `description`/`includes` come out of a rich-text editor in the admin, so the API sends HTML
 * ("<p><span style=\"...\">For small teams…</span></p>") instead of plain text. This site only ever shows
 * them as plain strings, so strip the markup here rather than rendering raw HTML from the backend.
 */
function stripHtml(value: string): string {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, (entity) => htmlEntities[entity.toLowerCase()] ?? entity)
    .replace(/\s+/g, " ")
    .trim();
}

function invalid(what: string, raw: unknown): never {
  console.error(`[subscriptionApi] unexpected ${what} response`, raw);
  throw new ApiError("invalid_response", `Unexpected ${what} response from the server.`, { details: raw });
}

/* ---- GET /cards ---- */

export interface SubscriptionPlan {
  id: number;
  name: string;
  description: string;
  billingPlanType: BillingPlanType;
  /** Per-user monthly base price. */
  pricePerUser: number;
  /** One user for `billingPlanType`'s period. For YEARLY the backend has already taken off the yearly discount. */
  totalAmount: number;
  /** The yearly discount the backend applies (0 on MONTHLY). */
  yearlyDiscountPercentage: number;
  /** App routes included in the plan, e.g. "/payroll". */
  modules: string[];
  /** Badge the backend assigns, e.g. "MOST_POPULAR", "RECOMMENDED". Null when the plan has none. */
  tagName: string | null;
  /** e.g. "Everything in Starter" — shown above the feature list. Null when the plan has none. */
  includes: string | null;
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
    description: typeof data.description === "string" ? stripHtml(data.description) : "",
    billingPlanType: data.billingPlanType === "YEARLY" ? "YEARLY" : "MONTHLY",
    pricePerUser,
    totalAmount,
    yearlyDiscountPercentage: isNumber(toNumber(data.yearlyDiscountPercentage)) ? toNumber(data.yearlyDiscountPercentage) : 0,
    modules: Array.isArray(data.modules) ? data.modules.filter((m): m is string => typeof m === "string") : [],
    tagName: typeof data.tagName === "string" && data.tagName ? data.tagName : null,
    includes: typeof data.includes === "string" && data.includes ? stripHtml(data.includes) : null,
  };
}

/** The list endpoint. One malformed plan is skipped (and logged) rather than failing the whole page. */
export function mapSubscriptionPlansResponse(raw: unknown): SubscriptionPlan[] {
  if (!Array.isArray(raw)) invalid("subscription plans", raw);
  return raw.flatMap((item) => {
    try {
      return [mapSubscriptionPlanResponse(item)];
    } catch {
      return [];
    }
  });
}

/* ---- POST coupon/apply ---- */

export interface AppliedCouponQuote {
  code: string;
  /** e.g. 20 for 20%. */
  discountPercentage: number;
  message: string;
}

export function mapCouponResponse(raw: unknown): AppliedCouponQuote {
  const data = (raw ?? {}) as Record<string, unknown>;
  const percent = toNumber(data.discountPercentage);
  const message = typeof data.message === "string" ? data.message : "";
  if (data.valid !== true) {
    // A 200 that still says "not valid": treat it like the 400 the backend normally sends.
    throw new ApiError("validation", message || "This coupon code isn't valid.", { details: raw });
  }
  if (typeof data.couponCode !== "string" || !isNumber(percent)) invalid("coupon", raw);
  return { code: data.couponCode, discountPercentage: percent, message };
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
    // The backend's userLimit is *additional* users on top of the one the plan price already covers
    // (charged as price × (1 + userLimit)), so "5 users" in the drawer is userLimit 4.
    userLimit: Math.max(0, checkout.planUsers - 1),
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

/* ---- POST verify-payment ---- */

/**
 * Sent to the backend after every payment attempt on a Razorpay order; the backend records it by outcome.
 * SUCCESS: exactly what Razorpay Checkout's success handler returns. FAILED: from Razorpay's
 * `payment.failed` event, which has no signature (sent as "").
 */
export interface VerifyPaymentRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  outcome: "SUCCESS" | "FAILED";
}

export interface PaymentVerification {
  /** The backend confirmed the signature (and so the payment). */
  verified: boolean;
  message: string;
  /** The backend's payment record id. */
  paymentId: number | null;
}

/** 2xx replies. Anything but an explicit "FAILED" status counts as verified. */
export function mapVerifyPaymentResponse(raw: unknown): PaymentVerification {
  const data = (raw ?? {}) as Record<string, unknown>;
  const status = typeof data.status === "string" ? data.status.toUpperCase() : "";
  return {
    verified: status !== "FAILED",
    message: typeof data.message === "string" ? data.message : "",
    paymentId: isNumber(toNumber(data.paymentId)) ? toNumber(data.paymentId) : null,
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

/* ---- GET checkWorkSpaceDomain ---- */

export interface WorkspaceDomainCheck {
  available: boolean;
  message: string;
}

export function mapWorkspaceDomainResponse(raw: unknown): WorkspaceDomainCheck {
  const data = (raw ?? {}) as Record<string, unknown>;
  if (typeof data.available !== "boolean") invalid("workspace domain", raw);
  return { available: data.available, message: typeof data.message === "string" ? data.message : "" };
}
