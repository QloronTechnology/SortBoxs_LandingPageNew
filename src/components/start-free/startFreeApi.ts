export interface CreateFreeAccountPayload {
  domain: string;
  selectedModules: string[];
  fullName: string;
  workEmail: string;
  phone: string;
  phoneCountry: string;
  jobTitle: string;
  companyName: string;
  companySize: string;
  inviteEmails: string[];
}

/**
 * No backend endpoint exists yet for creating a free workspace/account — `lib/api/subscriptionEndpoints.ts`
 * only covers the paid checkout (plans, coupons, Razorpay). This simulates success after a short delay so
 * the frontend flow is complete and demonstrable. Swap the body for a real POST (e.g. to an
 * `/api/v1/auth/organization/create`-style endpoint, once the backend team provides one) — the payload
 * shape above is already everything this flow collects.
 */
export async function createFreeAccount(payload: CreateFreeAccountPayload): Promise<{ success: true }> {
  if (process.env.NODE_ENV !== "production") console.info("[start-free] would POST", payload);
  await new Promise((resolve) => setTimeout(resolve, 1200));
  return { success: true };
}
