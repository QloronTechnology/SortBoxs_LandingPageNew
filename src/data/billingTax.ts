/**
 * Billing countries and how tax is charged in each, for the checkout drawer.
 *
 * The pattern follows Stripe-Tax-style SaaS checkouts (Claude's billing works this way): tax depends on
 * the billing country, and on the state/province where that matters; a valid business tax ID switches
 * B2B customers to reverse charge where the law allows it.
 *
 * ⚠ Which of these countries SortBoxs must actually charge tax in depends on where it is registered —
 * confirm with your accountant and delete `tax` from any country you are not registered in. In
 * production, quote tax from the server (Stripe Tax, Avalara, …); this table is the client-side preview.
 */

export interface TaxComponent {
  label: string;
  rate: number;
}

export interface BillingRegion {
  name: string;
  /** India: the 2-digit GST state code (first two digits of a GSTIN). */
  gstCode?: string;
  /** Replaces the country's `tax` for this region (e.g. Canadian HST/PST provinces). */
  tax?: TaxComponent[];
}

export interface TaxIdConfig {
  /** e.g. "GSTIN", "VAT number", "ABN". */
  label: string;
  placeholder: string;
  pattern: RegExp;
  /** A valid ID means the business self-accounts for tax (reverse charge), so none is charged. */
  reverseCharge: boolean;
}

export interface BillingCountry {
  code: string;
  name: string;
  flag: string;
  tax?: TaxComponent[];
  /** Tax depends on the full address, so it's only known at payment (US sales tax). */
  taxAtPayment?: boolean;
  regionLabel?: string;
  regions?: BillingRegion[];
  taxId?: TaxIdConfig;
}

/** Where SortBoxs is registered — decides CGST+SGST (same state) vs IGST (other states). */
export const seller = { country: "IN", state: "Maharashtra" };

const vat = (rate: number): TaxComponent[] => [{ label: "VAT", rate }];

/** EU VAT: a valid VAT number from another member state means reverse charge. */
const euVat = (code: string, name: string, flag: string, rate: number): BillingCountry => ({
  code,
  name,
  flag,
  tax: vat(rate),
  taxId: {
    label: "VAT number",
    placeholder: `${code}123456789`,
    pattern: new RegExp(`^${code}[0-9A-Z+*]{8,12}$`),
    reverseCharge: true,
  },
});

export const indianStates: BillingRegion[] = [
  { name: "Andaman and Nicobar Islands", gstCode: "35" },
  { name: "Andhra Pradesh", gstCode: "37" },
  { name: "Arunachal Pradesh", gstCode: "12" },
  { name: "Assam", gstCode: "18" },
  { name: "Bihar", gstCode: "10" },
  { name: "Chandigarh", gstCode: "04" },
  { name: "Chhattisgarh", gstCode: "22" },
  { name: "Dadra and Nagar Haveli and Daman and Diu", gstCode: "26" },
  { name: "Delhi", gstCode: "07" },
  { name: "Goa", gstCode: "30" },
  { name: "Gujarat", gstCode: "24" },
  { name: "Haryana", gstCode: "06" },
  { name: "Himachal Pradesh", gstCode: "02" },
  { name: "Jammu and Kashmir", gstCode: "01" },
  { name: "Jharkhand", gstCode: "20" },
  { name: "Karnataka", gstCode: "29" },
  { name: "Kerala", gstCode: "32" },
  { name: "Ladakh", gstCode: "38" },
  { name: "Lakshadweep", gstCode: "31" },
  { name: "Madhya Pradesh", gstCode: "23" },
  { name: "Maharashtra", gstCode: "27" },
  { name: "Manipur", gstCode: "14" },
  { name: "Meghalaya", gstCode: "17" },
  { name: "Mizoram", gstCode: "15" },
  { name: "Nagaland", gstCode: "13" },
  { name: "Odisha", gstCode: "21" },
  { name: "Puducherry", gstCode: "34" },
  { name: "Punjab", gstCode: "03" },
  { name: "Rajasthan", gstCode: "08" },
  { name: "Sikkim", gstCode: "11" },
  { name: "Tamil Nadu", gstCode: "33" },
  { name: "Telangana", gstCode: "36" },
  { name: "Tripura", gstCode: "16" },
  { name: "Uttar Pradesh", gstCode: "09" },
  { name: "Uttarakhand", gstCode: "05" },
  { name: "West Bengal", gstCode: "19" },
];

const usStates: BillingRegion[] = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
  "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas",
  "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island",
  "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming",
].map((name) => ({ name }));

const gst5: TaxComponent = { label: "GST", rate: 0.05 };
const canadianProvinces: BillingRegion[] = [
  { name: "Alberta", tax: [gst5] },
  { name: "British Columbia", tax: [gst5, { label: "PST", rate: 0.07 }] },
  { name: "Manitoba", tax: [gst5, { label: "RST", rate: 0.07 }] },
  { name: "New Brunswick", tax: [{ label: "HST", rate: 0.15 }] },
  { name: "Newfoundland and Labrador", tax: [{ label: "HST", rate: 0.15 }] },
  { name: "Northwest Territories", tax: [gst5] },
  { name: "Nova Scotia", tax: [{ label: "HST", rate: 0.14 }] },
  { name: "Nunavut", tax: [gst5] },
  { name: "Ontario", tax: [{ label: "HST", rate: 0.13 }] },
  { name: "Prince Edward Island", tax: [{ label: "HST", rate: 0.15 }] },
  { name: "Quebec", tax: [gst5, { label: "QST", rate: 0.09975 }] },
  { name: "Saskatchewan", tax: [gst5, { label: "PST", rate: 0.06 }] },
  { name: "Yukon", tax: [gst5] },
];

export const billingCountries: BillingCountry[] = [
  {
    code: "IN",
    name: "India",
    flag: "🇮🇳",
    tax: [{ label: "IGST", rate: 0.18 }],
    regionLabel: "State",
    regions: indianStates,
    // B2B customers in India still pay GST; the GSTIN goes on the invoice for input tax credit.
    taxId: {
      label: "GSTIN",
      placeholder: "27ABCDE1234F1Z5",
      pattern: /^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/,
      reverseCharge: false,
    },
  },
  { code: "US", name: "United States", flag: "🇺🇸", taxAtPayment: true, regionLabel: "State", regions: usStates },
  {
    code: "CA",
    name: "Canada",
    flag: "🇨🇦",
    regionLabel: "Province",
    regions: canadianProvinces,
    taxId: { label: "GST/HST number", placeholder: "123456789RT0001", pattern: /^\d{9}RT\d{4}$/, reverseCharge: true },
  },
  {
    code: "GB",
    name: "United Kingdom",
    flag: "🇬🇧",
    tax: vat(0.2),
    taxId: { label: "VAT number", placeholder: "GB123456789", pattern: /^GB(\d{9}|\d{12})$/, reverseCharge: true },
  },
  euVat("AT", "Austria", "🇦🇹", 0.2),
  euVat("BE", "Belgium", "🇧🇪", 0.21),
  euVat("DK", "Denmark", "🇩🇰", 0.25),
  euVat("FI", "Finland", "🇫🇮", 0.255),
  euVat("FR", "France", "🇫🇷", 0.2),
  euVat("DE", "Germany", "🇩🇪", 0.19),
  euVat("IE", "Ireland", "🇮🇪", 0.23),
  euVat("IT", "Italy", "🇮🇹", 0.22),
  euVat("NL", "Netherlands", "🇳🇱", 0.21),
  euVat("PL", "Poland", "🇵🇱", 0.23),
  euVat("PT", "Portugal", "🇵🇹", 0.23),
  euVat("ES", "Spain", "🇪🇸", 0.21),
  euVat("SE", "Sweden", "🇸🇪", 0.25),
  {
    code: "CH",
    name: "Switzerland",
    flag: "🇨🇭",
    tax: vat(0.081),
    taxId: { label: "UID / VAT number", placeholder: "CHE123456789", pattern: /^CHE\d{9}$/, reverseCharge: true },
  },
  {
    code: "NO",
    name: "Norway",
    flag: "🇳🇴",
    tax: vat(0.25),
    taxId: { label: "Organisation number", placeholder: "123456789", pattern: /^\d{9}(MVA)?$/, reverseCharge: true },
  },
  {
    code: "AU",
    name: "Australia",
    flag: "🇦🇺",
    tax: [{ label: "GST", rate: 0.1 }],
    taxId: { label: "ABN", placeholder: "12345678901", pattern: /^\d{11}$/, reverseCharge: true },
  },
  {
    code: "NZ",
    name: "New Zealand",
    flag: "🇳🇿",
    tax: [{ label: "GST", rate: 0.15 }],
    taxId: { label: "GST number", placeholder: "123456789", pattern: /^\d{8,9}$/, reverseCharge: true },
  },
  {
    code: "SG",
    name: "Singapore",
    flag: "🇸🇬",
    tax: [{ label: "GST", rate: 0.09 }],
    taxId: { label: "GST reg. number", placeholder: "201912345K", pattern: /^[0-9A-Z]{9,10}$/, reverseCharge: true },
  },
  {
    code: "JP",
    name: "Japan",
    flag: "🇯🇵",
    tax: [{ label: "JCT", rate: 0.1 }],
    taxId: { label: "Registration number", placeholder: "T1234567890123", pattern: /^T\d{13}$/, reverseCharge: true },
  },
  {
    code: "KR",
    name: "South Korea",
    flag: "🇰🇷",
    tax: vat(0.1),
    taxId: { label: "Business reg. number", placeholder: "1234567890", pattern: /^\d{10}$/, reverseCharge: true },
  },
  {
    code: "AE",
    name: "United Arab Emirates",
    flag: "🇦🇪",
    tax: vat(0.05),
    taxId: { label: "TRN", placeholder: "100123456700003", pattern: /^\d{15}$/, reverseCharge: true },
  },
  {
    code: "SA",
    name: "Saudi Arabia",
    flag: "🇸🇦",
    tax: vat(0.15),
    taxId: { label: "VAT number", placeholder: "300123456700003", pattern: /^\d{15}$/, reverseCharge: true },
  },
  { code: "XX", name: "Other country", flag: "🌐" },
];

export const defaultLocation = { country: seller.country, region: seller.state };
