import { apiClient } from "./apiClient";
import { subscriptionEndpoints } from "./subscriptionEndpoints";
import {
  mapCheckoutResponse,
  mapCreateOrderResponse,
  mapSubscriptionPlanResponse,
  type BillingPlanType,
  type CheckoutQuote,
  type InitiateCheckoutRequest,
  type RazorpayOrder,
  type SubscriptionPlan,
} from "./subscriptionMappers";

/**
 * Subscription checkout API — HTTP only. Each function sends one request and returns a mapped model;
 * errors arrive as `ApiError` (see apiClient). Orchestration (which call when) lives in the hooks.
 */

export async function getSubscriptionCard(
  subscriptionId: number | string,
  billingPlanType: BillingPlanType,
  signal?: AbortSignal
): Promise<SubscriptionPlan> {
  const { data } = await apiClient.get(subscriptionEndpoints.getSubscriptionCard(subscriptionId), {
    params: { billingPlanType },
    signal,
  });
  return mapSubscriptionPlanResponse(data);
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
