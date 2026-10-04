import { apiClient } from "./apiClient";
import { subscriptionEndpoints } from "./subscriptionEndpoints";
import {
  mapCheckoutResponse,
  mapCouponResponse,
  mapCreateOrderResponse,
  mapSubscriptionPlansResponse,
  mapVerifyPaymentResponse,
  mapWorkspaceDomainResponse,
  type AppliedCouponQuote,
  type BillingPlanType,
  type CheckoutQuote,
  type InitiateCheckoutRequest,
  type RazorpayOrder,
  type SubscriptionPlan,
  type PaymentVerification,
  type VerifyPaymentRequest,
  type WorkspaceDomainCheck,
} from "./subscriptionMappers";

/**
 * Subscription checkout API — HTTP only. Each function sends one request and returns a mapped model;
 * errors arrive as `ApiError` (see apiClient). Orchestration (which call when) lives in the hooks.
 */

/** Every published plan, priced for one billing cycle, in the backend's order. */
export async function getSubscriptionPlans(billingPlanType: BillingPlanType, signal?: AbortSignal): Promise<SubscriptionPlan[]> {
  const { data } = await apiClient.get(subscriptionEndpoints.plans, { params: { billingPlanType }, signal });
  return mapSubscriptionPlansResponse(data);
}

/** One plan for one cycle (the API answers with a one-item list); null when it doesn't exist. */
export async function getSubscriptionPlan(
  subscriptionId: number | string,
  billingPlanType: BillingPlanType,
  signal?: AbortSignal
): Promise<SubscriptionPlan | null> {
  const { data } = await apiClient.get(subscriptionEndpoints.plans, { params: { subscriptionId, billingPlanType }, signal });
  return mapSubscriptionPlansResponse(data)[0] ?? null;
}

/**
 * Checks a coupon code. Resolves with its discount when valid; an invalid or inactive code rejects with
 * an ApiError (kind "validation") carrying the backend's message. Creates nothing on the backend.
 */
export async function applyCoupon(couponCode: string): Promise<AppliedCouponQuote> {
  const { data } = await apiClient.post(subscriptionEndpoints.applyCoupon, { couponCode });
  return mapCouponResponse(data);
}

export async function initiateCheckout(payload: InitiateCheckoutRequest): Promise<CheckoutQuote> {
  const { data } = await apiClient.post(subscriptionEndpoints.initiateCheckout, payload);
  return mapCheckoutResponse(data);
}

export async function createRazorpayOrder(organizationSubscriptionId: number): Promise<RazorpayOrder> {
  const { data } = await apiClient.post(subscriptionEndpoints.createOrder, null, {
    params: { orgSubId: organizationSubscriptionId },
  });
  return mapCreateOrderResponse(data);
}

/**
 * Asks the backend to verify a Razorpay payment (signature check) and activate the subscription. A
 * rejected verification comes back as an ApiError (e.g. 400/404 with { status: "FAILED", message }).
 */
export async function verifyPayment(payload: VerifyPaymentRequest): Promise<PaymentVerification> {
  const { data } = await apiClient.post(subscriptionEndpoints.verifyPayment, payload);
  return mapVerifyPaymentResponse(data);
}

/** Whether `workspaceDomain` (the part before ".sortboxs.com") is free to register. */
export async function checkWorkspaceDomain(workspaceDomain: string, signal?: AbortSignal): Promise<WorkspaceDomainCheck> {
  const { data } = await apiClient.get(subscriptionEndpoints.checkWorkspaceDomain, { params: { workspaceDomain }, signal });
  return mapWorkspaceDomainResponse(data);
}
