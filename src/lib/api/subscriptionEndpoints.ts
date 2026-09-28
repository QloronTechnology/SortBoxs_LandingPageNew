/**
 * Subscription checkout endpoint paths (relative to NEXT_PUBLIC_API_BASE_URL), from
 * SortBoxs_Subscription_Checkout_API_Documentation.pdf. Query parameters are passed by the service as
 * axios `params`, never concatenated here.
 */
export const subscriptionEndpoints = {
  /** GET, params: { billingPlanType: "MONTHLY" | "YEARLY" } */
  getSubscriptionCard: (subscriptionId: number | string) =>
    `/api/admin/subscriptions/cards/${encodeURIComponent(String(subscriptionId))}`,
  /** POST — calculates discount + tax and creates a PENDING OrganizationSubscription. */
  initiateCheckout: "/api/v1/auth/subscription/checkout/initiate",
  /** POST, params: { orgSubId } — creates the Razorpay order for that subscription. */
  createOrder: "/api/payment/createOrder",
} as const;
