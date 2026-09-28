"use client";

import type { CheckoutState } from "@/lib/checkoutPricing";
import { computeTotals } from "@/lib/checkoutPricing";
import { findPhoneCountry, toE164 } from "@/data/phone";
import { checkoutDemo, postCheckout } from "./checkoutApi";

/**
 * Razorpay Standard Checkout (https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/).
 * Flow: our API creates the order (amount computed server-side) → Razorpay's own window collects the
 * card/UPI/bank details → our API verifies the signature. Card data never touches SortBoxs code.
 */

const SCRIPT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayInstance {
  open: () => void;
}

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => RazorpayInstance;
  }
}

let scriptPromise: Promise<void> | null = null;

function loadScript() {
  if (window.Razorpay) return Promise.resolve();
  scriptPromise ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error("Couldn't load the payment window. Check your connection and try again."));
    };
    document.body.appendChild(script);
  });
  return scriptPromise;
}

export type PaymentResult =
  | { status: "paid"; orderId: string; paymentId: string; amount: number; demo?: boolean }
  | { status: "dismissed" }
  | { status: "failed"; message: string };

interface OrderResponse {
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
  description: string;
  prefill: Record<string, string>;
}

/**
 * TEMPORARY demo (see checkoutDemo): opens Razorpay straight from the browser with a test key and a
 * browser-computed amount — no order, no signature check. Test mode only.
 */
async function payInDemoMode(checkout: CheckoutState, keyId: string): Promise<PaymentResult> {
  try {
    await loadScript();
  } catch (error) {
    return { status: "failed", message: error instanceof Error ? error.message : "Couldn't load the payment window." };
  }
  if (!window.Razorpay) return { status: "failed", message: "The payment window didn't load. Please try again." };

  const totals = computeTotals(checkout);
  const { billing } = checkout;
  const amount = Math.round(totals.total * 100);
  const plan = totals.plan ? totals.plan.name : "Custom plan";

  return new Promise<PaymentResult>((resolve) => {
    const razorpay = new window.Razorpay!({
      key: keyId,
      amount,
      currency: "INR",
      name: "SortBoxs",
      description: `${plan} · ${checkout.cycle === "yearly" ? "Yearly" : "Monthly"} (test)`,
      prefill: {
        name: billing.fullName,
        email: billing.email,
        contact: toE164(billing.phone, findPhoneCountry(billing.phoneCountry)),
        method: billing.paymentMethod,
      },
      notes: { mode: "frontend demo — not verified", plan, cycle: checkout.cycle },
      theme: { color: "#6c35f5" },
      modal: { ondismiss: () => resolve({ status: "dismissed" }) },
      handler: (response: { razorpay_payment_id: string }) =>
        resolve({ status: "paid", orderId: "— (test mode)", paymentId: response.razorpay_payment_id, amount: amount / 100, demo: true }),
    });
    razorpay.open();
  });
}

/**
 * Opens Razorpay for an order our backend created (subscription checkout: createOrder). The window
 * collects the card/UPI/bank details; the amount comes from the order itself.
 *
 * TODO(backend): there is no payment-verification endpoint yet, so the signature Razorpay returns isn't
 * checked by the backend here — it has to confirm the payment itself (e.g. a Razorpay webhook).
 */
export async function openRazorpayOrder(
  order: { orderId: string; keyId: string; amount: number; currency: string },
  details: { description: string; checkout: CheckoutState }
): Promise<PaymentResult> {
  try {
    await loadScript();
  } catch (error) {
    return { status: "failed", message: error instanceof Error ? error.message : "Couldn't load the payment window." };
  }
  if (!window.Razorpay) return { status: "failed", message: "The payment window didn't load. Please try again." };

  const { billing } = details.checkout;
  return new Promise<PaymentResult>((resolve) => {
    const razorpay = new window.Razorpay!({
      key: order.keyId,
      order_id: order.orderId,
      currency: order.currency,
      name: "SortBoxs",
      description: details.description,
      prefill: {
        name: billing.fullName,
        email: billing.email,
        contact: toE164(billing.phone, findPhoneCountry(billing.phoneCountry)),
        method: billing.paymentMethod,
      },
      theme: { color: "#6c35f5" },
      modal: { ondismiss: () => resolve({ status: "dismissed" }) },
      handler: (response: RazorpayResponse) =>
        resolve({
          status: "paid",
          orderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
          amount: order.amount,
          demo: order.keyId.startsWith("rzp_test_"),
        }),
    });
    // A failed attempt keeps Razorpay's window open with the reason, so the customer can retry there.
    razorpay.open();
  });
}

/**
 * Custom (modules) plans — no SortBoxs backend API for these yet, so this keeps the earlier flow: the
 * placeholder checkout API (checkoutApi.ts), or the test-key demo. Resolves when it's paid, closed,
 * or failed.
 */
export async function payWithRazorpay(checkout: CheckoutState): Promise<PaymentResult> {
  if (checkoutDemo) return payInDemoMode(checkout, checkoutDemo.keyId);
  let order: OrderResponse;
  try {
    const [created] = await Promise.all([postCheckout<OrderResponse>("order", { checkout }), loadScript()]);
    if (!created.ok) return { status: "failed", message: created.message };
    order = created.data;
  } catch (error) {
    // loadScript's own message is customer-friendly; anything else stays generic.
    console.error("[checkout] order", error);
    return { status: "failed", message: error instanceof Error ? error.message : "Couldn't start the payment." };
  }
  if (!window.Razorpay) return { status: "failed", message: "The payment window didn't load. Please try again." };

  return new Promise<PaymentResult>((resolve) => {
    const razorpay = new window.Razorpay!({
      key: order.keyId,
      order_id: order.orderId,
      amount: order.amount,
      currency: order.currency,
      name: "SortBoxs",
      description: order.description,
      prefill: order.prefill,
      theme: { color: "#6c35f5" },
      modal: { ondismiss: () => resolve({ status: "dismissed" }) },
      handler: async (response: RazorpayResponse) => {
        const verified = await postCheckout<{ verified: boolean; orderId: string; paymentId: string }>("verify", {
          orderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
          signature: response.razorpay_signature,
        });
        if (verified.ok && verified.data.verified) {
          resolve({ status: "paid", orderId: verified.data.orderId, paymentId: verified.data.paymentId, amount: order.amount / 100 });
        } else {
          // Razorpay may already have taken the money — never invite a second payment.
          resolve({
            status: "failed",
            message: `We received your payment but couldn't confirm it yet. Please don't pay again — our team will confirm by email. Payment ID: ${response.razorpay_payment_id}.`,
          });
        }
      },
    });
    // A failed attempt keeps Razorpay's window open with the reason, so the customer can retry there.
    razorpay.open();
  });
}
