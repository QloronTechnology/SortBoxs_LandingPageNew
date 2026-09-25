import { initialCheckoutState, type CheckoutState } from "@/lib/checkoutPricing";
import { findPhoneCountry, sanitizePhoneNumber } from "@/data/phone";

/** Shared by the /api/checkout/* routes: turns the browser's JSON into a safe CheckoutState. */

const str = (value: unknown, max = 200) => (typeof value === "string" ? value.slice(0, max) : "");
const bool = (value: unknown) => value === true;
const int = (value: unknown) => (typeof value === "number" && Number.isFinite(value) ? Math.round(value) : 0);

/** Rebuilds a CheckoutState from untrusted JSON: known fields only, right types, defaults otherwise. */
export function parseCheckout(input: unknown): CheckoutState {
  const raw = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const billing = (raw.billing && typeof raw.billing === "object" ? raw.billing : {}) as Record<string, unknown>;
  const base = initialCheckoutState();
  const users: Record<string, number> = {};
  if (raw.users && typeof raw.users === "object") {
    for (const [id, count] of Object.entries(raw.users as Record<string, unknown>)) users[str(id, 40)] = Math.max(0, int(count));
  }
  const method = str(billing.paymentMethod);
  const phoneCountry = findPhoneCountry(str(billing.phoneCountry, 2));

  return {
    ...base,
    plan: raw.plan ? str(raw.plan, 40) : null,
    planUsers: Math.max(1, int(raw.planUsers)),
    users,
    cycle: raw.cycle === "yearly" ? "yearly" : "monthly",
    country: str(raw.country, 2) || base.country,
    region: str(raw.region, 80),
    hasTaxId: bool(raw.hasTaxId),
    taxId: str(raw.taxId, 20).toUpperCase().replace(/[^0-9A-Z]/g, ""),
    coupon: raw.coupon ? str(raw.coupon, 40) : null,
    termsAccepted: bool(raw.termsAccepted),
    billing: {
      fullName: str(billing.fullName, 100).trim(),
      email: str(billing.email).trim(),
      company: str(billing.company).trim(),
      customerType: billing.customerType === "individual" ? "individual" : "business",
      line1: str(billing.line1).trim(),
      city: str(billing.city, 80).trim(),
      postalCode: str(billing.postalCode, 12).trim(),
      correspondence: bool(billing.correspondence),
      paymentMethod: method === "upi" || method === "netbanking" || method === "invoice" ? method : "card",
      phoneCountry: phoneCountry.code,
      phone: sanitizePhoneNumber(str(billing.phone, 20), phoneCountry),
      poNumber: str(billing.poNumber, 40).trim(),
    },
  };
}
