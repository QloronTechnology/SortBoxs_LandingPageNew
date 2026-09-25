"use client";

import type { CheckoutState } from "@/lib/checkoutPricing";

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
  | { status: "paid"; orderId: string; paymentId: string; amount: number }
  | { status: "dismissed" }
  | { status: "failed"; message: string };

/** Runs the whole payment. Resolves when it's paid (and verified), closed, or failed. */
export async function payWithRazorpay(checkout: CheckoutState): Promise<PaymentResult> {
  try {
    const [orderResponse] = await Promise.all([
      fetch("/api/checkout/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checkout }),
      }),
      loadScript(),
    ]);
    const order = await orderResponse.json();
    if (!orderResponse.ok) return { status: "failed", message: order.error ?? "Couldn't start the payment." };
    if (!window.Razorpay) return { status: "failed", message: "The payment window didn't load." };

    return await new Promise<PaymentResult>((resolve) => {
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
          const verify = await fetch("/api/checkout/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            }),
          });
          const result = await verify.json().catch(() => ({}));
          resolve(
            verify.ok && result.verified
              ? { status: "paid", orderId: result.orderId, paymentId: result.paymentId, amount: order.amount / 100 }
              : { status: "failed", message: result.error ?? "We couldn't confirm the payment. Contact support before retrying." }
          );
        },
      });
      // A failed attempt keeps Razorpay's window open with the reason, so the customer can retry there.
      razorpay.open();
    });
  } catch (error) {
    return { status: "failed", message: error instanceof Error ? error.message : "Something went wrong." };
  }
}
