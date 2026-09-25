import { computeTotals } from "@/lib/checkoutPricing";
import { parseCheckout } from "@/lib/parseCheckout";
import { findPhoneCountry, phoneError, toE164 } from "@/data/phone";
import { createRazorpayOrder, razorpayKeyId } from "@/lib/razorpay.server";

/**
 * POST /api/checkout/order — creates a Razorpay order for the checkout drawer.
 *
 * The browser sends what the customer chose (plan, users, cycle, location, coupon, billing details),
 * never an amount: the total is recomputed here with the same pricing code, so it can't be tampered
 * with. TODO before going live: persist the order (customer, plan, amount) in your database, and check
 * coupons against it rather than the demo list.
 */

const fail = (message: string, status = 400) => Response.json({ error: message }, { status });

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail("Invalid request.");
  }

  const state = parseCheckout((body as { checkout?: unknown })?.checkout);
  const totals = computeTotals(state);
  const { billing } = state;

  if (!state.termsAccepted) return fail("Please accept the Terms of Service to continue.");
  if (!totals.canContinue) return fail("Your plan or billing location is incomplete.");
  if (billing.fullName.length < 2) return fail("Enter your full name.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(billing.email)) return fail("Enter a valid work email.");
  const phoneCountry = findPhoneCountry(billing.phoneCountry);
  const phoneProblem = phoneError(billing.phone, phoneCountry);
  if (phoneProblem) return fail(phoneProblem);
  const phone = toE164(billing.phone, phoneCountry);
  if (!billing.line1 || !billing.city || !billing.postalCode) return fail("Your billing address is incomplete.");
  if (billing.paymentMethod === "invoice") return fail("Invoice orders are handled by our team — payment isn't taken online.");

  const amount = Math.round(totals.total * 100); // paise
  if (amount < 100) return fail("The order total must be at least ₹1.");

  const planName = totals.plan ? totals.plan.name : `Custom (${totals.lines.map((l) => l.name).join(", ")})`;
  try {
    const order = await createRazorpayOrder({
      amount,
      receipt: `sbx_${Date.now()}`,
      // Razorpay allows up to 15 notes of 256 chars — enough to reconcile the order later.
      notes: {
        plan: planName.slice(0, 256),
        cycle: state.cycle,
        users: String(totals.totalUsers),
        name: billing.fullName,
        email: billing.email,
        phone,
        company: billing.company.slice(0, 256),
        country: state.country,
        region: state.region,
        tax_id: totals.hasValidTaxId ? state.taxId : "",
        coupon: totals.coupon && !totals.coupon.error ? totals.coupon.coupon.code : "",
        tax: totals.tax.pending ? "sales tax pending" : String(totals.tax.total),
      },
    });

    return Response.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: razorpayKeyId(),
      description: `${planName} · ${state.cycle === "yearly" ? "Yearly" : "Monthly"}`.slice(0, 255),
      // Razorpay asks for a mobile number — pass ours so the customer doesn't type it again.
      prefill: {
        name: billing.fullName,
        email: billing.email,
        contact: phone,
        method: billing.paymentMethod,
      },
    });
  } catch (error) {
    console.error("[checkout/order]", error);
    return fail(error instanceof Error ? error.message : "Couldn't start the payment. Please try again.", 502);
  }
}
