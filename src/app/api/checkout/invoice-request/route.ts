import { randomInt } from "node:crypto";
import { computeTotals } from "@/lib/checkoutPricing";
import { parseCheckout } from "@/lib/parseCheckout";
import { findPhoneCountry, phoneError, toE164 } from "@/data/phone";

/**
 * POST /api/checkout/invoice-request — "Invoice / Bank Transfer" orders. No money is taken online: the
 * request is validated, its amount recomputed server-side, and a reference number returned for the
 * customer to quote on their bank transfer.
 *
 * TODO (backend): forward the request to the billing service, which emails the tax invoice to the work
 * email, notifies sales so a representative calls the customer, and activates the workspace once the
 * transfer is reconciled. Until then requests are only logged below.
 */

const fail = (message: string, status = 400) => Response.json({ error: message }, { status });

/** SBX-INV-250925-4821 — date + random digits; the backend should issue the real number. */
function referenceNumber(now = new Date()) {
  const date = now.toISOString().slice(2, 10).replace(/-/g, "");
  return `SBX-INV-${date}-${randomInt(1000, 10000)}`;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const state = parseCheckout((body as { checkout?: unknown } | null)?.checkout);
  const totals = computeTotals(state);
  const { billing } = state;

  if (!state.termsAccepted) return fail("Please accept the Terms of Service to continue.");
  if (!totals.canContinue) return fail("Your plan or billing location is incomplete.");
  if (billing.paymentMethod !== "invoice") return fail("This request is only for invoice / bank transfer orders.");
  if (billing.fullName.length < 2) return fail("Enter your full name.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(billing.email)) return fail("Enter a valid work email.");
  const phoneCountry = findPhoneCountry(billing.phoneCountry);
  const phoneProblem = phoneError(billing.phone, phoneCountry);
  if (phoneProblem) return fail(phoneProblem);
  const phone = toE164(billing.phone, phoneCountry);
  if (!billing.line1 || !billing.city || !billing.postalCode) return fail("Your billing address is incomplete.");

  const requestId = referenceNumber();
  const summary = {
    requestId,
    amount: totals.total,
    period: totals.period,
    plan: totals.plan ? totals.plan.name : totals.lines.map((l) => `${l.name} × ${l.users}`).join(", "),
    name: billing.fullName,
    email: billing.email,
    phone,
    company: billing.company,
    poNumber: billing.poNumber,
    taxId: totals.hasValidTaxId ? state.taxId : null,
  };
  console.info("[checkout/invoice-request]", summary); // TODO: send to the billing backend instead.

  return Response.json({ requestId, amount: totals.total, period: totals.period, email: billing.email });
}
