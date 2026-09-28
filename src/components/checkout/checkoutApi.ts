"use client";

import { site } from "@/config/site";

/**
 * Calls to the checkout API: /order (create a Razorpay order), /verify (check the payment signature) and
 * /invoice-request. This Next.js app is frontend-only (static export), so the API is a separate backend
 * (Java). PLACEHOLDER: the SortBoxs backend doesn't serve these endpoints — only Invoice / Bank Transfer and
 * custom plans still come here, until the backend adds APIs for them. Base URL: NEXT_PUBLIC_CHECKOUT_API_URL at build
 * time, e.g. https://api.sortboxs.com/checkout. Until it's set, checkout shows "temporarily unavailable".
 */
const baseUrl = (process.env.NEXT_PUBLIC_CHECKOUT_API_URL ?? "").trim().replace(/\/$/, "");

/**
 * TEMPORARY front-end-only demo, until the backend exists: with no API URL and a Razorpay **test** key id,
 * Pay opens Razorpay directly (amount computed in the browser, no server verification) and invoice
 * requests get a local reference. It turns itself off as soon as NEXT_PUBLIC_CHECKOUT_API_URL is set, and
 * never runs with a live key — a browser-computed, unverified amount must never take real money.
 */
const demoKeyId = (process.env.NEXT_PUBLIC_RAZORPAY_TEST_KEY_ID ?? "").trim();
export const checkoutDemo = !baseUrl && demoKeyId.startsWith("rzp_test_") ? { keyId: demoKeyId } : null;

export type ApiResult<T> = { ok: true; data: T } | { ok: false; message: string };

/** Shown when the API can't be reached properly — worded for what the customer was trying to do. */
const unavailableMessage = (path: string) =>
  path === "invoice-request"
    ? `We couldn't send your invoice request right now. Please try again in a few minutes, or email ${site.supportEmail}.`
    : `Online payment is temporarily unavailable. Please try again in a few minutes, choose Invoice / Bank Transfer, or email ${site.supportEmail}.`;

/** POSTs JSON and always resolves — a network error or a non-JSON reply becomes a friendly message. */
export async function postCheckout<T>(path: "order" | "verify" | "invoice-request", body: unknown): Promise<ApiResult<T>> {
  const unavailable = unavailableMessage(path);
  if (!baseUrl) {
    console.error("[checkout] NEXT_PUBLIC_CHECKOUT_API_URL is not set.");
    return { ok: false, message: unavailable };
  }
  let response: Response;
  try {
    response = await fetch(`${baseUrl}/${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error(`[checkout] ${path}: network error`, error);
    return { ok: false, message: "We couldn't reach our servers. Check your connection and try again." };
  }

  // A static host answers unknown URLs with an HTML page — never try to parse that as JSON.
  const isJson = response.headers.get("content-type")?.includes("application/json");
  if (!isJson) {
    console.error(`[checkout] ${path}: expected JSON, got ${response.status} ${response.headers.get("content-type")}`);
    return { ok: false, message: unavailable };
  }

  const data = await response.json().catch(() => null);
  if (!data) return { ok: false, message: unavailable };
  if (!response.ok) return { ok: false, message: data.error ?? unavailable };
  return { ok: true, data: data as T };
}
