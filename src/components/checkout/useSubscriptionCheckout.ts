"use client";

import { useRef, useState } from "react";
import { isApiError } from "@/lib/api/apiClient";
import { createRazorpayOrder, initiateCheckout } from "@/lib/api/subscriptionApi";
import { buildCheckoutPayload, type CheckoutQuote, type RazorpayOrder } from "@/lib/api/subscriptionMappers";
import { site } from "@/config/site";
import { clearSavedCheckout, useCheckout } from "./CheckoutProvider";
import { effectiveMethod } from "./BillingStep";
import { requestInvoice } from "./invoiceRequest";
import { openRazorpayOrder, payWithRazorpay, type PaymentResult } from "./razorpayCheckout";

export type PaymentState =
  | { phase: "idle" | "paying" }
  | { phase: "error"; message: string }
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

/**
 * The Pay action for the checkout drawer. Plan checkouts run the SortBoxs subscription flow:
 *
 *   checkout/initiate (backend prices it, creates a PENDING subscription)
 *     → organizationSubscriptionId → createOrder(orgSubId) → Razorpay window
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
    const payload = buildCheckoutPayload(state);
    const key = JSON.stringify(payload);
    let current = lastOrder.current?.key === key ? lastOrder.current : null;
    if (!current) {
      const quote = await initiateCheckout(payload);
      const order = await createRazorpayOrder(quote.organizationSubscriptionId);
      current = lastOrder.current = { key, quote, order };
    }
    const { quote, order } = current;
    const period = quote.billingPlanType === "YEARLY" ? "Yearly" : "Monthly";
    const result = await openRazorpayOrder(order, {
      description: `${quote.planName || totals.plan?.name} · ${quote.userLimit} ${quote.userLimit === 1 ? "user" : "users"} · ${period}`,
      checkout: state,
    });
    if (result.status === "paid") lastOrder.current = null;
    finish(result);
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
