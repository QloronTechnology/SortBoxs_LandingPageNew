import type { BillingCycle } from "@/data/pricing";

/**
 * Demo coupon codes for the checkout drawer.
 *
 * ⚠ Anything in this file ships to the browser, so anyone can read these codes. Real coupons must be
 * validated (and the discount applied) on the server when the order is created — keep this list for
 * the UI only, or replace `findCoupon` with an API call.
 */

export interface Coupon {
  code: string;
  /** Shown once applied, e.g. "10% off". */
  description: string;
  type: "percent" | "flat";
  /** Percent as a fraction (0.1), or a flat INR amount off per month (×12 on yearly plans). */
  value: number;
  /** Minimum plan value per month after the yearly discount, in INR. */
  minAmount?: number;
  /** Cap on the discount per month for percent coupons, in INR (×12 on yearly plans). */
  maxDiscount?: number;
  /** Only valid on this billing cycle. */
  cycle?: BillingCycle;
}

export const coupons: Coupon[] = [
  { code: "WELCOME10", description: "10% off your plan", type: "percent", value: 0.1 },
  {
    code: "STARTUP25",
    description: "25% off, up to ₹2,500 a month (₹30,000 a year)",
    type: "percent",
    value: 0.25,
    maxDiscount: 2500,
  },
  {
    code: "SAVE500",
    description: "₹500 off per month (₹6,000 off a yearly plan)",
    type: "flat",
    value: 500,
    minAmount: 3000,
  },
  { code: "ANNUAL15", description: "Extra 15% off yearly plans", type: "percent", value: 0.15, cycle: "yearly" },
];

/**
 * Until coupons are validated on the server, ANY code is accepted: known codes use their own rules,
 * anything else gets `demoCoupon`. Set to false to only accept the codes listed above.
 */
export const acceptAnyCode = true;
const demoCoupon: Omit<Coupon, "code"> = { description: "10% off your plan (demo code)", type: "percent", value: 0.1 };

export function findCoupon(input: string): Coupon | undefined {
  const code = input.trim().toUpperCase();
  if (!code) return undefined;
  return coupons.find((c) => c.code === code) ?? (acceptAnyCode ? { code, ...demoCoupon } : undefined);
}

/**
 * Discount on `amount` — one billing period of `months` months, in INR after the yearly discount — or
 * why the coupon doesn't apply. Monthly limits and flat amounts scale with `months`.
 */
export function evaluateCoupon(
  coupon: Coupon,
  { amount, cycle, months }: { amount: number; cycle: BillingCycle; months: number }
): { discount: number; error?: undefined } | { discount: 0; error: string } {
  if (coupon.cycle && coupon.cycle !== cycle) {
    return { discount: 0, error: `${coupon.code} is only valid on ${coupon.cycle} billing.` };
  }
  if (coupon.minAmount && amount < coupon.minAmount * months) {
    return {
      discount: 0,
      error: `${coupon.code} needs a plan of at least ₹${coupon.minAmount.toLocaleString("en-IN")} a month.`,
    };
  }
  const raw = coupon.type === "percent" ? Math.round(amount * coupon.value) : coupon.value * months;
  return { discount: Math.min(raw, (coupon.maxDiscount ?? Infinity) * months, amount) };
}
