import type { PaymentMethodId } from "@/lib/checkoutPricing";

/** Payment options in Step 2. `countries` limits a method to those billing countries (omit = all). */
export const paymentMethods: { id: PaymentMethodId; label: string; countries?: string[] }[] = [
  { id: "card", label: "Credit / Debit Card" },
  { id: "upi", label: "UPI", countries: ["IN"] },
  { id: "netbanking", label: "Net Banking", countries: ["IN"] },
  { id: "invoice", label: "Invoice / Bank Transfer" },
];

/** NPCI's standard per-payment UPI limit (INR); larger amounts need card, net banking or invoice. */
export const upiLimit = 100000;

export interface PostalFormat {
  label: string;
  placeholder: string;
  /** Full-value check, run on blur / continue. */
  pattern: RegExp;
  /** Characters that may be typed; anything else is dropped as you type or paste. */
  allowed: RegExp;
  /** Hard cap on length while typing. */
  maxLength: number;
  /** Digits only → numeric keypad on phones. */
  numeric?: boolean;
  /** Shown when the full value doesn't match `pattern`. */
  requirement: string;
}

/** Postal code rules per billing country; anything else uses `fallbackPostal`. */
export const postalFormats: Record<string, PostalFormat> = {
  IN: { label: "PIN Code", placeholder: "400001", pattern: /^\d{6}$/, allowed: /\d/, maxLength: 6, numeric: true, requirement: "PIN Code must be 6 digits." },
  US: { label: "ZIP Code", placeholder: "94107", pattern: /^\d{5}(-\d{4})?$/, allowed: /[\d-]/, maxLength: 10, requirement: "Enter a 5-digit ZIP Code (or ZIP+4)." },
  CA: { label: "Postal Code", placeholder: "M5V 2T6", pattern: /^[A-Z]\d[A-Z] ?\d[A-Z]\d$/, allowed: /[A-Z\d ]/, maxLength: 7, requirement: "Enter a postal code like M5V 2T6." },
  GB: { label: "Postcode", placeholder: "SW1A 1AA", pattern: /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/, allowed: /[A-Z\d ]/, maxLength: 8, requirement: "Enter a postcode like SW1A 1AA." },
  AU: { label: "Postcode", placeholder: "2000", pattern: /^\d{4}$/, allowed: /\d/, maxLength: 4, numeric: true, requirement: "Postcode must be 4 digits." },
};
export const fallbackPostal: PostalFormat = {
  label: "Postal Code",
  placeholder: "10115",
  pattern: /^[A-Z0-9][A-Z0-9 -]{1,9}$/,
  allowed: /[A-Z\d -]/,
  maxLength: 10,
  requirement: "Enter a valid postal code.",
};

/** Uppercases, drops characters the format doesn't allow, and caps the length. */
export function sanitizePostal(value: string, format: PostalFormat) {
  return [...value.toUpperCase()].filter((char) => format.allowed.test(char)).join("").slice(0, format.maxLength);
}

/** Days to pay an invoice / bank transfer. */
export const invoiceTermsDays = 15;
