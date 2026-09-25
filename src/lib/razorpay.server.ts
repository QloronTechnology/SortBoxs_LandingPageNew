import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Razorpay server helpers — import ONLY from route handlers (app/api/**). They read the key secret,
 * which must never reach the browser. Keys come from .env.local (see .env.example).
 */

function keys() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) throw new Error("RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET are not set (see .env.example).");
  return { keyId, keySecret };
}

export const razorpayKeyId = () => keys().keyId;
export const isTestMode = () => keys().keyId.startsWith("rzp_test_");

export interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  status: string;
}

/** Creates an order (amount in paise). https://razorpay.com/docs/api/orders/create/ */
export async function createRazorpayOrder(input: {
  amount: number;
  receipt: string;
  notes: Record<string, string>;
}): Promise<RazorpayOrder> {
  const { keyId, keySecret } = keys();
  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,
    },
    body: JSON.stringify({ amount: input.amount, currency: "INR", receipt: input.receipt, notes: input.notes }),
    cache: "no-store",
  });
  const body = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(body?.error?.description ?? `Razorpay returned ${response.status}.`);
  }
  return body as RazorpayOrder;
}

/**
 * Checks the signature Razorpay Checkout returns after a successful payment:
 * HMAC-SHA256(order_id + "|" + payment_id, key_secret). Constant-time compare.
 */
export function isValidPaymentSignature(orderId: string, paymentId: string, signature: string) {
  const expected = createHmac("sha256", keys().keySecret).update(`${orderId}|${paymentId}`).digest("hex");
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(signature, "utf8");
  return a.length === b.length && timingSafeEqual(a, b);
}
