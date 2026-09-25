import { billingCountries, seller, type BillingCountry, type TaxComponent } from "@/data/billingTax";

export interface TaxLine extends TaxComponent {
  amount: number;
}

export interface TaxQuote {
  lines: TaxLine[];
  total: number;
  /** Tax can't be known yet (US: needs the full address) — show "calculated at payment". */
  pending: boolean;
  /** A valid business tax ID moved the tax to the customer (reverse charge). */
  reverseCharge: boolean;
}

export interface TaxLocation {
  country: string;
  region: string;
  /** The customer entered a business tax ID and it passed `validateTaxId`. */
  hasValidTaxId: boolean;
}

export const findCountry = (code: string): BillingCountry =>
  billingCountries.find((c) => c.code === code) ?? billingCountries[billingCountries.length - 1];

/** Components that apply before any business exemption, e.g. CGST+SGST inside the seller's state. */
function taxComponents(country: BillingCountry, region: string): TaxComponent[] {
  if (country.code === seller.country && country.tax) {
    // Indian GST: same state as the seller → CGST + SGST (half each); any other state → IGST.
    if (region === seller.state) {
      const half = country.tax[0].rate / 2;
      return [
        { label: "CGST", rate: half },
        { label: "SGST", rate: half },
      ];
    }
    return country.tax;
  }
  return country.regions?.find((r) => r.name === region)?.tax ?? country.tax ?? [];
}

/** Tax on a monthly `taxable` amount (INR, after discounts). */
export function quoteTax(location: TaxLocation, taxable: number): TaxQuote {
  const country = findCountry(location.country);
  if (country.taxAtPayment) return { lines: [], total: 0, pending: true, reverseCharge: false };

  const components = taxComponents(country, location.region);
  if (components.length > 0 && location.hasValidTaxId && country.taxId?.reverseCharge) {
    return { lines: [], total: 0, pending: false, reverseCharge: true };
  }

  // Round the total once and give the remainder to the last line, so CGST+SGST always equals IGST.
  const total = Math.round(taxable * components.reduce((sum, c) => sum + c.rate, 0));
  const lines = components.map((c) => ({ ...c, amount: Math.round(taxable * c.rate) }));
  if (lines.length > 0) lines[lines.length - 1].amount += total - lines.reduce((sum, l) => sum + l.amount, 0);
  return { lines, total, pending: false, reverseCharge: false };
}

/** Error message for a business tax ID, or null when it's valid for this country/region. */
export function validateTaxId(countryCode: string, region: string, value: string): string | null {
  const config = findCountry(countryCode).taxId;
  if (!config) return null;
  if (!config.pattern.test(value)) return `Enter a valid ${config.label} (e.g. ${config.placeholder}).`;

  // A GSTIN starts with its state code, and must match the billing state for GST to be correct.
  const state = findCountry(countryCode).regions?.find((r) => r.name === region);
  if (state?.gstCode && value.slice(0, 2) !== state.gstCode) {
    const registered = findCountry(countryCode).regions?.find((r) => r.gstCode === value.slice(0, 2));
    return registered
      ? `This GSTIN is registered in ${registered.name}. Select that state, or use the GSTIN for ${region}.`
      : "This GSTIN's state code isn't valid.";
  }
  return null;
}

/** "18%", "9.975%", "25.5%". */
export const formatRate = (rate: number) => `${+(rate * 100).toFixed(3)}%`;
