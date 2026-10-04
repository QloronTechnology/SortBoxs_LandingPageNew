/**
 * Subscription endpoint paths (relative to NEXT_PUBLIC_API_BASE_URL), from
 * "SortBoxs_Subscription_APIs_Structured new.pdf" (plans, coupon, initiate) and the earlier checkout doc
 * (createOrder). Query parameters are passed by the service as axios `params`, never concatenated here.
 */
export const subscriptionEndpoints = {
  /**
   * GET → a list of plans. params (optional): { billingPlanType: "MONTHLY" | "YEARLY" } filters the list
   * and prices it for that cycle; add { subscriptionId } for one plan (still a one-item list).
   */
  plans: "/api/admin/subscriptions/cards",
  /** POST { couponCode } → { couponCode, valid, discountPercentage, message }; 400 when invalid. */
  applyCoupon: "/api/admin/subscriptions/coupon/apply",
  /** POST — calculates discount + tax and creates a PENDING OrganizationSubscription. */
  initiateCheckout: "/api/v1/auth/subscription/checkout/initiate",
  /** POST, params: { orgSubId } — creates the Razorpay order for that subscription. */
  createOrder: "/api/payment/createOrder",
  /**
   * POST { razorpay_order_id, razorpay_payment_id, razorpay_signature, outcome } after every payment
   * attempt. SUCCESS: the backend checks Razorpay's signature and activates the subscription. FAILED: it
   * records the failed attempt (no signature). → { status, message, paymentId }
   * (404 { status: "FAILED", message: "Order not found: …" } for an unknown order).
   */
  verifyPayment: "/api/payment/verify-payment",
  /** GET, params: { workspaceDomain } → { available, message }. 200 whether or not it's free. */
  checkWorkspaceDomain: "/api/v1/auth/checkWorkSpaceDomain",
} as const;
