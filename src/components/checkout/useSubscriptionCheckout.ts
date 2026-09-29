"use client";

import { useRef, useState } from "react";
import { isApiError } from "@/lib/api/apiClient";
import { createRazorpayOrder, initiateCheckout, verifyPayment } from "@/lib/api/subscriptionApi";
import { buildCheckoutPayload, type CheckoutQuote, type RazorpayOrder } from "@/lib/api/subscriptionMappers";
import { site } from "@/config/site";
import { clearSavedCheckout, useCheckout } from "./CheckoutProvider";
import { effectiveMethod } from "./BillingStep";
import { requestInvoice } from "./invoiceRequest";
import { openRazorpayOrder, payWithRazorpay, type PaymentResult } from "./razorpayCheckout";

export type PaymentState =
  | { phase: "idle" | "paying" | "verifying" }
  | { phase: "error"; message: string }
  /**
   * Razorpay took the payment but the backend couldn't confirm it. Paying again could charge twice, so
   * the Pay button stays disabled and the customer is pointed to support with the payment id.
   */
  | { phase: "unverified"; message: string; paymentId: string }
  | { phase: "paid"; orderId: string; paymentId: string; amount: number; demo?: boolean }
  | { phase: "invoiced"; requestId: string; amount: number; period: "month" | "year"; email: string; demo?: boolean };

/** Customer-facing text for a failed subscription API call. Backend validation messages are kept. */
function paymentErrorMessage(error: unknown) {
  if (isApiError(error)) {
    switch (error.kind) {
      case "network":
      case "timeout":
        return "We couldn't reach our servers. Check your connection and try again.";
      case "validation":
        // e.g. "Invalid or inactive coupon code" — the backend is the only coupon check.
        return /coupon/i.test(error.message)
          ? `${error.message}. Use "Edit Plan" to remove or change the coupon, then try again.`
          : error.message;
      case "config":
        console.error("[checkout]", error.message);
        break;
      default:
        console.error("[checkout]", error.kind, error.status, error.message, error.details);
    }
  } else {
    console.error("[checkout]", error);
  }
  return `We couldn't start the payment. Please try again in a few minutes, or email ${site.supportEmail}.`;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Backend verification of a Razorpay payment. Retries (1s, then 3s) only for failures that are usually
 * temporary: no connection, a timeout, or a gateway/overload status (502/503/504). A 500 is a backend bug
 * that would fail the same way again (and re-running a half-finished verification isn't safe unless the
 * endpoint is idempotent), and a definite "FAILED" answer is final — neither is retried.
 */
async function verifyWithRetry(result: { orderId: string; paymentId: string; signature: string }) {
  const payload = {
    razorpay_order_id: result.orderId,
    razorpay_payment_id: result.paymentId,
    razorpay_signature: result.signature,
    outcome: "SUCCESS" as const,
  };
  for (const wait of [0, 1000, 3000]) {
    if (wait) await sleep(wait);
    try {
      return await verifyPayment(payload);
    } catch (error) {
      const retryable =
        isApiError(error) &&
        (error.kind === "network" || error.kind === "timeout" || [502, 503, 504].includes(error.status ?? 0));
      console.error("[checkout] verify-payment", error);
      if (!retryable) return { verified: false, message: isApiError(error) ? error.message : "", paymentId: null };
    }
  }
  return { verified: false, message: "", paymentId: null };
}

/**
 * Tells the backend about a failed attempt (the backend records every outcome on the order). Fire and
 * forget: the customer is still in Razorpay's window and may retry, so nothing here blocks or retries.
 */
function reportFailedAttempt(attempt: { orderId: string; paymentId: string; reason: string }) {
  verifyPayment({
    razorpay_order_id: attempt.orderId,
    razorpay_payment_id: attempt.paymentId,
    razorpay_signature: "",
    outcome: "FAILED",
  }).catch((error) => console.error("[checkout] verify-payment (FAILED)", attempt, error));
}

const unverifiedMessage = (paymentId: string) =>
  `We received your payment (ID ${paymentId}) but couldn't confirm it automatically. Please don't pay again — ` +
  `email ${site.supportEmail} with this payment ID and our team will activate your subscription.`;

/**
 * The Pay action for the checkout drawer. Plan checkouts run the SortBoxs subscription flow:
 *
 *   checkout/initiate (backend prices it, creates a PENDING subscription)
 *     → organizationSubscriptionId → createOrder(orgSubId) → Razorpay window
 *     → verify-payment (backend checks Razorpay's signature, activates the subscription) → paid
 *
 * Creating the order before payment is how Razorpay works: the order only says what's due; money moves
 * in Razorpay's window, and the subscription counts as paid only once verify-payment confirms it.
 *
 * Invoice / bank transfer and custom (modules) plans have no SortBoxs backend API yet and keep their
 * earlier flows. Ignores a second Pay while one is running.
 */
export function useSubscriptionCheckout() {
  const { state, totals } = useCheckout();
  const [payment, setPayment] = useState<PaymentState>({ phase: "idle" });
  const running = useRef(false);
  // Closing Razorpay and paying again with the same details reuses the order instead of creating
  // another PENDING subscription. Any change to the details starts a new one.
  const lastOrder = useRef<{ key: string; quote: CheckoutQuote; order: RazorpayOrder } | null>(null);

  const finish = (result: PaymentResult) => {
    if (result.status === "paid") {
      clearSavedCheckout();
      setPayment({ phase: "paid", orderId: result.orderId, paymentId: result.paymentId, amount: result.amount, demo: result.demo });
    } else {
      setPayment(result.status === "failed" ? { phase: "error", message: result.message } : { phase: "idle" });
    }
  };

  async function paySubscription() {
    // Showcase plans (data/mockPlans.ts) aren't backend plans, so they can't be bought online.
    if (state.plan?.startsWith("mock-")) {
      setPayment({
        phase: "error",
        message: `Online checkout for ${totals.plan?.name ?? "this plan"} is coming soon. Please contact our sales team at ${site.supportEmail} to get started.`,
      });
      return;
    }
    const payload = buildCheckoutPayload(state);
    const key = JSON.stringify(payload);
    let current = lastOrder.current?.key === key ? lastOrder.current : null;
    if (!current) {
      const quote = await initiateCheckout(payload);
      const order = await createRazorpayOrder(quote.organizationSubscriptionId);
      current = lastOrder.current = { key, quote, order };
    }
    const { quote, order } = current;
    // The backend's price is the one charged. If it differs from what the drawer showed, say so in the
    // console (a sign the two calculations have drifted), but never re-price it here.
    if (Math.abs(quote.finalAmount - totals.total) > 1) {
      console.warn("[checkout] backend finalAmount differs from the drawer total", { backend: quote, drawerTotal: totals.total });
    }
    const period = quote.billingPlanType === "YEARLY" ? "Yearly" : "Monthly";
    // quote.userLimit is *additional* users; the customer picked state.planUsers in total.
    const users = state.planUsers;
    const result = await openRazorpayOrder(order, {
      description: `${quote.planName || totals.plan?.name} · ${users} ${users === 1 ? "user" : "users"} · ${period}`,
      checkout: state,
      onFailedAttempt: reportFailedAttempt,
    });
    if (result.status !== "paid") return finish(result);

    // Paid in Razorpay: the order can't be reused, whatever verification says.
    lastOrder.current = null;
    if (!result.signature) return setPayment({ phase: "unverified", paymentId: result.paymentId, message: unverifiedMessage(result.paymentId) });
    setPayment({ phase: "verifying" });
    const verification = await verifyWithRetry({ orderId: result.orderId, paymentId: result.paymentId, signature: result.signature });
    if (verification.verified) return finish(result);
    console.error("[checkout] payment not verified", { orderId: result.orderId, paymentId: result.paymentId, message: verification.message });
    setPayment({ phase: "unverified", paymentId: result.paymentId, message: unverifiedMessage(result.paymentId) });
  }

  async function pay() {
    if (running.current) return;
    running.current = true;
    setPayment({ phase: "paying" });
    try {
      if (effectiveMethod(state, totals) === "invoice") {
        const request = await requestInvoice(state);
        if (request.status === "requested") {
          clearSavedCheckout();
          setPayment({ phase: "invoiced", ...request });
        } else {
          setPayment({ phase: "error", message: request.message });
        }
      } else if (totals.plan) {
        await paySubscription();
      } else {
        finish(await payWithRazorpay(state));
      }
    } catch (error) {
      setPayment({ phase: "error", message: paymentErrorMessage(error) });
    } finally {
      running.current = false;
    }
  }

  return { payment, pay };
}
