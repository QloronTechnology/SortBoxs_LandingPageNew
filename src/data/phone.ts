import { billingCountries } from "@/data/billingTax";

/**
 * Phone numbers are stored as a country (for the dial code) + the national number as digits only.
 * Digit ranges are for the national significant number (no leading trunk "0"). Shared by the checkout
 * form and the /api/checkout routes, so both apply exactly the same rules.
 */

export interface PhoneCountry {
  code: string;
  name: string;
  flag: string;
  dial: string;
  min: number;
  max: number;
  /** Stricter check where it's well defined (e.g. Indian mobiles start 6–9). */
  pattern?: RegExp;
  /** Numbers keep their leading 0 (Italy), so it isn't stripped as a trunk prefix. */
  keepLeadingZero?: boolean;
}

const rules: Record<string, Omit<PhoneCountry, "code" | "name" | "flag">> = {
  IN: { dial: "91", min: 10, max: 10, pattern: /^[6-9]\d{9}$/ },
  US: { dial: "1", min: 10, max: 10, pattern: /^[2-9]\d{9}$/ },
  CA: { dial: "1", min: 10, max: 10, pattern: /^[2-9]\d{9}$/ },
  GB: { dial: "44", min: 9, max: 10 },
  AT: { dial: "43", min: 7, max: 13 },
  BE: { dial: "32", min: 8, max: 9 },
  DK: { dial: "45", min: 8, max: 8 },
  FI: { dial: "358", min: 6, max: 10 },
  FR: { dial: "33", min: 9, max: 9 },
  DE: { dial: "49", min: 7, max: 11 },
  IE: { dial: "353", min: 7, max: 9 },
  IT: { dial: "39", min: 6, max: 11, keepLeadingZero: true },
  NL: { dial: "31", min: 9, max: 9 },
  PL: { dial: "48", min: 9, max: 9 },
  PT: { dial: "351", min: 9, max: 9 },
  ES: { dial: "34", min: 9, max: 9 },
  SE: { dial: "46", min: 7, max: 9 },
  CH: { dial: "41", min: 9, max: 9 },
  NO: { dial: "47", min: 8, max: 8 },
  AU: { dial: "61", min: 9, max: 9 },
  NZ: { dial: "64", min: 8, max: 10 },
  SG: { dial: "65", min: 8, max: 8 },
  JP: { dial: "81", min: 9, max: 10 },
  KR: { dial: "82", min: 9, max: 10 },
  AE: { dial: "971", min: 8, max: 9 },
  SA: { dial: "966", min: 9, max: 9 },
};

/** Countries in the phone picker — the billing countries, same order and flags. */
export const phoneCountries: PhoneCountry[] = billingCountries
  .filter((country) => rules[country.code])
  .map((country) => ({ code: country.code, name: country.name, flag: country.flag, ...rules[country.code] }));

export const defaultPhoneCountry = "IN";

export const findPhoneCountry = (code: string) =>
  phoneCountries.find((country) => country.code === code) ?? phoneCountries.find((country) => country.code === defaultPhoneCountry)!;

/**
 * Digits only, capped at the country's length. A pasted international number loses its dial code
 * ("+91 70200 38436" → "7020038436") and a trunk "0" is dropped ("07911 123456" → "7911123456").
 */
export function sanitizePhoneNumber(value: string, country: PhoneCountry) {
  let digits = value.replace(/\D/g, "");
  const international = value.trim().startsWith("+") || value.trim().startsWith("00");
  if (value.trim().startsWith("00")) digits = digits.slice(2);
  if ((international || digits.length > country.max) && digits.startsWith(country.dial)) {
    digits = digits.slice(country.dial.length);
  }
  if (!country.keepLeadingZero) digits = digits.replace(/^0+/, "");
  return digits.slice(0, country.max);
}

/** Error message, or null when the number is valid for the country. */
export function phoneError(digits: string, country: PhoneCountry): string | null {
  if (!digits) return "Enter your phone number.";
  const size = country.min === country.max ? `${country.max}` : `${country.min}–${country.max}`;
  if (digits.length < country.min || digits.length > country.max) {
    return `Enter a ${size}-digit number for ${country.name}.`;
  }
  if (country.pattern && !country.pattern.test(digits)) {
    return country.code === "IN" ? "Indian mobile numbers start with 6, 7, 8 or 9." : `Enter a valid number for ${country.name}.`;
  }
  return null;
}

/** +917020038436 — what payment gateways and CRMs expect. */
export const toE164 = (digits: string, country: PhoneCountry) => `+${country.dial}${digits}`;

/** "+91 70200 38436" for display. Groups of 5 for 10-digit Indian numbers, 3-3-4 for +1, else as-is. */
export function formatPhone(digits: string, country: PhoneCountry) {
  if (!digits) return "";
  if (country.dial === "91" && digits.length === 10) return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  if (country.dial === "1" && digits.length === 10) return `+1 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  return `+${country.dial} ${digits}`;
}
