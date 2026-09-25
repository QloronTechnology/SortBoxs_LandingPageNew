import { isValidPaymentSignature } from "@/lib/razorpay.server";

/**
 * POST /api/checkout/verify — confirms a Razorpay Checkout payment really came from Razorpay by checking
 * its signature. TODO before going live: mark the order paid in your database and provision the
 * workspace here — and also handle Razorpay's `payment.captured` webhook, which still arrives if the
 * customer closes the tab before this call.
 */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const orderId = typeof body?.orderId === "string" ? body.orderId : "";
  const paymentId = typeof body?.paymentId === "string" ? body.paymentId : "";
  const signature = typeof body?.signature === "string" ? body.signature : "";

  if (!orderId || !paymentId || !signature) {
    return Response.json({ verified: false, error: "Missing payment details." }, { status: 400 });
  }
  if (!isValidPaymentSignature(orderId, paymentId, signature)) {
    return Response.json({ verified: false, error: "Payment signature is invalid." }, { status: 400 });
  }
  return Response.json({ verified: true, orderId, paymentId });
}
