"use client";

import { useEffect, useImperativeHandle, useRef, useState, type ReactNode, type Ref } from "react";
import {
  Building2,
  Check,
  ChevronDown,
  CircleAlert,
  CreditCard,
  FileText,
  Info,
  Landmark,
  Loader2,
  LockKeyhole,
  Smartphone,
  User,
  X,
} from "lucide-react";
import { billingCountries } from "@/data/billingTax";
import { findPhoneCountry, phoneCountries, phoneError, sanitizePhoneNumber } from "@/data/phone";
import {
  fallbackPostal,
  invoiceTermsDays,
  paymentMethods,
  postalFormats,
  sanitizePostal,
  upiLimit,
} from "@/data/payment";
import { checkDomainAvailability, sanitizeDomainInput } from "@/lib/domainCheck";
import { formatRate } from "@/lib/tax";
import { cn, formatINR } from "@/lib/utils";
import { useCheckout, type CheckoutState, type CheckoutTotals, type PaymentMethodId } from "./CheckoutProvider";
import { Combobox, Flag } from "./Combobox";

/** Lets the drawer's "Continue to Review" validate this step (and reveal its errors). */
export interface BillingStepHandle {
  validate: () => boolean;
}

type Errors = Partial<Record<string, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Letters (any script), spaces, and . ' - — at least 2 characters. */
const namePattern = /^[\p{L}][\p{L}\p{M} .'-]{1,99}$/u;

/** Field ids in page order — the first invalid one gets focus. */
const fieldOrder = [
  "bill-name",
  "bill-email",
  "bill-phone",
  "bill-company",
  "bill-domain",
  "bill-region",
  "bill-line1",
  "bill-city",
  "bill-postal",
  "bill-taxid",
];

/** Methods offered for this country and amount (UPI has a per-payment cap). */
export const availablePaymentMethods = (country: string, amount: number) =>
  paymentMethods.filter((m) => (!m.countries || m.countries.includes(country)) && !(m.id === "upi" && amount > upiLimit));

function billingErrors(state: CheckoutState, totals: CheckoutTotals): Errors {
  const { billing } = state;
  const errors: Errors = {};
  const postal = postalFormats[state.country] ?? fallbackPostal;

  if (!billing.fullName.trim()) errors["bill-name"] = "Enter your full name.";
  else if (!namePattern.test(billing.fullName.trim())) errors["bill-name"] = "Enter your name using letters only.";
  if (!billing.email.trim()) errors["bill-email"] = "Enter your work email.";
  else if (!emailPattern.test(billing.email.trim())) errors["bill-email"] = "Enter a valid email address.";
  if (billing.customerType === "business" && !billing.company.trim()) errors["bill-company"] = "Enter your company name.";
  if (!billing.domain.trim()) errors["bill-domain"] = "Enter your company domain.";
  else if (billing.domainStatus === "unavailable") errors["bill-domain"] = "That domain is already taken.";
  else if (billing.domainStatus === "invalid") errors["bill-domain"] = "Enter at least 3 letters, numbers or hyphens.";
  else if (billing.domainStatus === "error") errors["bill-domain"] = "Couldn't check domain availability. Edit the domain to retry.";
  else if (billing.domainStatus !== "available") errors["bill-domain"] = "Still checking domain availability.";
  if (!totals.locationComplete) errors["bill-region"] = `Select your ${(totals.country.regionLabel ?? "region").toLowerCase()}.`;
  if (!billing.line1.trim()) errors["bill-line1"] = "Enter your street address.";
  if (!billing.city.trim()) errors["bill-city"] = "Enter your city.";
  if (!billing.postalCode.trim()) errors["bill-postal"] = `Enter your ${postal.label}.`;
  else if (!postal.pattern.test(billing.postalCode.trim())) errors["bill-postal"] = postal.requirement;
  if (totals.taxIdError) errors["bill-taxid"] = totals.taxIdError;
  const phone = phoneError(billing.phone, findPhoneCountry(billing.phoneCountry));
  if (phone) errors["bill-phone"] = phone;

  return errors;
}

/** The chosen method, or card when the chosen one isn't offered for this country/amount. */
export const effectiveMethod = (state: CheckoutState, totals: CheckoutTotals): PaymentMethodId =>
  availablePaymentMethods(state.country, totals.total).some((m) => m.id === state.billing.paymentMethod)
    ? state.billing.paymentMethod
    : "card";

/** Step 2 — account, billing address, tax and payment (from the "Billing & Payment" design). */
export function BillingStep({ ref }: { ref?: Ref<BillingStepHandle> }) {
  const { state, totals, dispatch } = useCheckout();
  const [touched, setTouched] = useState<Set<string>>(() => new Set());
  const [showAll, setShowAll] = useState(false);

  const errors = billingErrors(state, totals);
  const errorFor = (id: string) => ((showAll || touched.has(id)) && errors[id]) || undefined;
  const touch = (id: string) => setTouched((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
  const setBilling = (patch: Partial<CheckoutState["billing"]>) => dispatch({ type: "updateBilling", patch });

  const domainCheckToken = useRef(0);
  const domain = state.billing.domain;
  useEffect(() => {
    if (!domain) return;
    const token = ++domainCheckToken.current;
    setBilling({ domainStatus: "checking" });
    const timer = setTimeout(async () => {
      const result = await checkDomainAvailability(domain);
      if (domainCheckToken.current === token) setBilling({ domainStatus: result });
    }, 450);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domain]);

  useImperativeHandle(ref, () => ({
    validate: () => {
      const current = billingErrors(state, totals);
      const first = fieldOrder.find((id) => current[id]);
      setShowAll(true);
      if (first) {
        const el = document.getElementById(first);
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
        el?.focus({ preventScroll: true });
        return false;
      }
      return true;
    },
  }));

  const business = state.billing.customerType === "business";
  const postal = postalFormats[state.country] ?? fallbackPostal;
  const method = effectiveMethod(state, totals);
  const taxId = totals.country.taxId;

  return (
    <div className="flex flex-col gap-4">
      {/* 1 — Account */}
      <Section index={1} title="Account Information" subtitle="We'll use this information to create your SortBoxs account.">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field id="bill-name" label="Full Name" required error={errorFor("bill-name")}>
            <input
              id="bill-name"
              autoComplete="name"
              autoCapitalize="words"
              maxLength={100}
              value={state.billing.fullName}
              onChange={(e) => setBilling({ fullName: e.target.value })}
              onBlur={() => touch("bill-name")}
              placeholder="Your full name"
              className={inputClass(errorFor("bill-name"))}
              {...describedBy("bill-name", errorFor("bill-name"))}
            />
          </Field>
          <Field id="bill-email" label="Work Email" required error={errorFor("bill-email")}>
            <input
              id="bill-email"
              type="email"
              autoComplete="email"
              value={state.billing.email}
              onChange={(e) => setBilling({ email: e.target.value })}
              onBlur={() => touch("bill-email")}
              placeholder="you@company.com"
              className={inputClass(errorFor("bill-email"))}
              {...describedBy("bill-email", errorFor("bill-email"))}
            />
          </Field>
          <Field id="bill-phone" label="Phone Number" required error={errorFor("bill-phone")}>
            <PhoneInput error={errorFor("bill-phone")} onBlur={() => touch("bill-phone")} />
            <p id="bill-phone-hint" className="mt-1.5 text-xs text-brand-muted">
              For order updates and help from our team.
            </p>
          </Field>
          <Field id="bill-company" label="Company Name" required={business} optional={!business} error={errorFor("bill-company")}>
            <input
              id="bill-company"
              autoComplete="organization"
              value={state.billing.company}
              onChange={(e) => setBilling({ company: e.target.value })}
              onBlur={() => touch("bill-company")}
              placeholder="Your company"
              className={inputClass(errorFor("bill-company"))}
              {...describedBy("bill-company", errorFor("bill-company"))}
            />
          </Field>
        </div>
      </Section>

      {/* 2 — Company domain */}
      <Section index={2} title="Company Domain" subtitle="This will be used for your team's login URL.">
        <Field
          id="bill-domain"
          label="Workspace Domain"
          required
          error={state.billing.domain.trim() ? undefined : errorFor("bill-domain")}
        >
          <div
            className={cn(
              "flex h-11 w-full max-w-md items-center rounded-lg border bg-white pl-3 text-[15px] focus-within:border-brand-purple focus-within:ring-2 focus-within:ring-brand-purple/30",
              (showAll || touched.has("bill-domain")) &&
                (state.billing.domainStatus === "unavailable" || state.billing.domainStatus === "invalid")
                ? "border-red-400"
                : "border-brand-border"
            )}
          >
            <span className="shrink-0 text-brand-muted">https://</span>
            <input
              id="bill-domain"
              value={state.billing.domain}
              onChange={(e) => setBilling({ domain: sanitizeDomainInput(e.target.value) })}
              onBlur={() => touch("bill-domain")}
              placeholder="yourcompany"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              className="min-w-0 flex-1 bg-transparent px-1 text-brand-text outline-none placeholder:text-brand-muted/70"
              aria-describedby="bill-domain-status"
            />
            <span className="shrink-0 pr-3 text-brand-muted">.sortboxs.com</span>
          </div>
          {state.billing.domain.trim() && (
            <div id="bill-domain-status" className="mt-1.5 flex min-h-5 items-center gap-1.5 text-sm" aria-live="polite">
              {state.billing.domainStatus === "checking" && (
                <span className="flex items-center gap-1.5 text-brand-muted">
                  <Loader2 className="size-3.5 animate-spin" aria-hidden /> Checking...
                </span>
              )}
              {state.billing.domainStatus === "available" && (
                <span className="flex items-center gap-1.5 font-medium text-emerald-600">
                  <Check className="size-4" aria-hidden /> Available
                </span>
              )}
              {state.billing.domainStatus === "unavailable" && (
                <span className="flex items-center gap-1.5 font-medium text-red-600">
                  <X className="size-4" aria-hidden /> That domain is already taken
                </span>
              )}
              {state.billing.domainStatus === "invalid" && (
                <span className="flex items-center gap-1.5 font-medium text-red-600">
                  <CircleAlert className="size-4" aria-hidden /> Enter at least 3 letters, numbers or hyphens
                </span>
              )}
              {state.billing.domainStatus === "error" && (
                <span className="flex items-center gap-1.5 font-medium text-red-600">
                  <CircleAlert className="size-4" aria-hidden /> Couldn&apos;t check availability. Edit the domain to retry.
                </span>
              )}
            </div>
          )}
        </Field>
      </Section>

      {/* 3 — Billing address */}
      <Section index={3} title="Billing Address" subtitle="This information is used for invoicing and tax calculation.">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field id="bill-country" label="Country / Region" required>
            <Combobox
              id="bill-country"
              value={state.country}
              options={billingCountries.map((c) => ({ value: c.code, label: c.name, flag: c.code }))}
              onChange={(country) => dispatch({ type: "setCountry", country })}
              searchPlaceholder="Search country"
            />
          </Field>
          {totals.country.regions && (
            <Field id="bill-region" label={totals.country.regionLabel ?? "Region"} required error={errorFor("bill-region")}>
              <Combobox
                id="bill-region"
                value={state.region}
                options={totals.country.regions.map((r) => ({ value: r.name, label: r.name }))}
                onChange={(region) => dispatch({ type: "setRegion", region })}
                onClose={() => touch("bill-region")}
                placeholder={`Select ${(totals.country.regionLabel ?? "region").toLowerCase()}`}
                searchPlaceholder={`Search ${(totals.country.regionLabel ?? "region").toLowerCase()}`}
                invalid={!!errorFor("bill-region")}
                describedBy={describedBy("bill-region", errorFor("bill-region"))["aria-describedby"]}
              />
            </Field>
          )}
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,1fr)_150px_130px]">
          <Field id="bill-line1" label="Address" required error={errorFor("bill-line1")}>
            <input
              id="bill-line1"
              autoComplete="address-line1"
              value={state.billing.line1}
              onChange={(e) => setBilling({ line1: e.target.value })}
              onBlur={() => touch("bill-line1")}
              placeholder="Building, street, area"
              className={inputClass(errorFor("bill-line1"))}
              {...describedBy("bill-line1", errorFor("bill-line1"))}
            />
          </Field>
          <Field id="bill-city" label="City" required error={errorFor("bill-city")}>
            <input
              id="bill-city"
              autoComplete="address-level2"
              value={state.billing.city}
              onChange={(e) => setBilling({ city: e.target.value })}
              onBlur={() => touch("bill-city")}
              className={inputClass(errorFor("bill-city"))}
              {...describedBy("bill-city", errorFor("bill-city"))}
            />
          </Field>
          <Field id="bill-postal" label={postal.label} required error={errorFor("bill-postal")}>
            <input
              id="bill-postal"
              autoComplete="postal-code"
              inputMode={postal.numeric ? "numeric" : "text"}
              maxLength={postal.maxLength}
              value={state.billing.postalCode}
              // Only allowed characters, up to the country's length — "4000011" can't be typed for a PIN.
              onChange={(e) => setBilling({ postalCode: sanitizePostal(e.target.value, postal) })}
              onBlur={() => touch("bill-postal")}
              placeholder={postal.placeholder}
              className={inputClass(errorFor("bill-postal"))}
              {...describedBy("bill-postal", errorFor("bill-postal"))}
            />
          </Field>
        </div>
        <label className="mt-4 flex w-fit cursor-pointer items-center gap-2.5 text-sm text-brand-text">
          <input
            type="checkbox"
            checked={state.billing.correspondence}
            onChange={(e) => setBilling({ correspondence: e.target.checked })}
            className="size-4 accent-brand-purple"
          />
          Use this address for business correspondence
        </label>
      </Section>

      {/* 4 — Tax */}
      <Section index={4} title="Tax Information" subtitle="Help us determine the applicable tax for your purchase.">
        <div role="radiogroup" aria-label="Purchasing as" className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:max-w-lg">
          {(
            [
              { id: "business", label: "Business (Registered)", icon: Building2 },
              { id: "individual", label: "Individual", icon: User },
            ] as const
          ).map(({ id, label, icon: Icon }) => {
            const active = state.billing.customerType === id;
            return (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => {
                  setBilling({ customerType: id });
                  dispatch({ type: "setHasTaxId", hasTaxId: id === "business" });
                }}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg border px-3.5 py-2.5 text-left text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/60",
                  active ? "border-brand-purple bg-brand-purple-light/60 text-brand-purple ring-1 ring-brand-purple" : "border-brand-border text-brand-text hover:border-brand-purple/40"
                )}
              >
                <RadioDot active={active} />
                <Icon className="size-4 shrink-0" aria-hidden />
                {label}
              </button>
            );
          })}
        </div>

        {business && taxId && (
          <div className="mt-4">
            <Field id="bill-taxid" label={`${taxId.label}`} optional error={errorFor("bill-taxid")}>
              <div className="flex gap-2">
                <input
                  id="bill-taxid"
                  value={state.taxId}
                  onChange={(e) => {
                    dispatch({ type: "setHasTaxId", hasTaxId: true });
                    dispatch({ type: "setTaxId", taxId: e.target.value });
                  }}
                  onBlur={() => touch("bill-taxid")}
                  placeholder={`e.g. ${taxId.placeholder}`}
                  autoCapitalize="characters"
                  spellCheck={false}
                  className={inputClass(errorFor("bill-taxid"), "flex-1 tracking-wide uppercase placeholder:tracking-normal placeholder:normal-case")}
                  {...describedBy("bill-taxid", errorFor("bill-taxid"), "bill-taxid-hint")}
                />
                {totals.hasValidTaxId && (
                  <span className="flex shrink-0 items-center gap-1.5 rounded-lg bg-emerald-50 px-3 text-sm font-medium text-emerald-700">
                    <Check className="size-4" strokeWidth={3} aria-hidden /> Valid format
                  </span>
                )}
              </div>
            </Field>
            <p id="bill-taxid-hint" className="mt-1.5 text-xs text-brand-muted">
              {taxId.reverseCharge
                ? `A valid ${taxId.label} means reverse charge — no tax is added.`
                : `Your ${taxId.label} appears on the tax invoice so you can claim input tax credit.`}
            </p>
          </div>
        )}

        <TaxPreview />
      </Section>

      {/* 5 — Payment */}
      <Section index={5} title="Payment Method" subtitle="Secure and encrypted payments powered by Razorpay.">
        <div role="radiogroup" aria-label="Payment method" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {availablePaymentMethods(state.country, totals.total).map(({ id, label }) => {
            const active = method === id;
            const Icon = { card: CreditCard, upi: Smartphone, netbanking: Landmark, invoice: FileText }[id];
            return (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setBilling({ paymentMethod: id })}
                className={cn(
                  "flex items-center gap-3 rounded-lg border px-3.5 py-3 text-left text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/60",
                  active ? "border-brand-purple bg-brand-purple-light/60 text-brand-purple ring-1 ring-brand-purple" : "border-brand-border text-brand-text hover:border-brand-purple/40"
                )}
              >
                <RadioDot active={active} />
                <Icon className="size-5 shrink-0" aria-hidden />
                <span className="min-w-0">
                  {label}
                  {id === "card" && <span className="block text-xs font-normal text-brand-muted">Visa, Mastercard, RuPay, Amex</span>}
                  {id === "upi" && <span className="block text-xs font-normal text-brand-muted">GPay, PhonePe, Paytm & more</span>}
                </span>
              </button>
            );
          })}
        </div>

        {method === "invoice" && (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field id="bill-po" label="PO Number" optional>
              <input
                id="bill-po"
                value={state.billing.poNumber}
                onChange={(e) => setBilling({ poNumber: e.target.value })}
                placeholder="Your purchase order reference"
                className={inputClass()}
                aria-describedby="bill-po-hint"
              />
              <p id="bill-po-hint" className="mt-1.5 text-xs text-brand-muted">Printed on the invoice if your finance team needs it.</p>
            </Field>
          </div>
        )}

        <p className="mt-4 flex items-start gap-2.5 rounded-lg bg-brand-surface px-4 py-3 text-sm text-brand-muted">
          <Info className="mt-0.5 size-4 shrink-0 text-brand-purple" aria-hidden />
          <span>
            {method === "invoice"
              ? `No online payment. We'll email a tax invoice for ${formatINR(totals.total)}${state.billing.email ? ` to ${state.billing.email}` : ""}; pay by bank transfer within ${invoiceTermsDays} days and your workspace is activated once we confirm the payment.`
              : `When you pay, Razorpay's secure window opens with ${paymentMethods.find((m) => m.id === method)?.label} selected — you enter the details there.`}
            {state.country === "IN" && totals.total > upiLimit && method !== "invoice" && (
              <> UPI isn&apos;t available for payments over {formatINR(upiLimit)}.</>
            )}
          </span>
        </p>

        <p className="mt-4 flex items-center gap-2 text-xs text-brand-muted">
          <LockKeyhole className="size-4 shrink-0 text-brand-purple" aria-hidden />
          Payments are encrypted and processed by Razorpay. SortBoxs never sees or stores your card, UPI or bank details.
        </p>
      </Section>
    </div>
  );
}

/**
 * Country code picker (flag + dial code) and the national number. The picker is a real <select> laid
 * invisibly over the flag/code, so it stays accessible and uses the native picker on phones. The number
 * takes digits only, capped at the chosen country's length.
 */
function PhoneInput({ error, onBlur }: { error?: string; onBlur: () => void }) {
  const { state, dispatch } = useCheckout();
  const country = findPhoneCountry(state.billing.phoneCountry);
  const setBilling = (patch: Partial<CheckoutState["billing"]>) => dispatch({ type: "updateBilling", patch });

  return (
    <div
      className={cn(
        // No overflow-hidden: the country list has to open outside the field.
        "flex h-11 w-full rounded-lg border bg-white focus-within:border-brand-purple focus-within:ring-2 focus-within:ring-brand-purple/30",
        error ? "border-red-400" : "border-brand-border"
      )}
    >
      <Combobox
        ariaLabel="Country code"
        value={country.code}
        options={phoneCountries.map((c) => ({ value: c.code, label: c.name, flag: c.code, meta: `+${c.dial}` }))}
        onChange={(code) => {
          const next = findPhoneCountry(code);
          // Re-fit the typed number to the new country's rules.
          setBilling({ phoneCountry: next.code, phone: sanitizePhoneNumber(state.billing.phone, next) });
        }}
        searchPlaceholder="Search country or code"
        className="h-full shrink-0"
        popoverClassName="w-72"
        triggerClassName="h-full gap-1.5 rounded-l-lg border-r border-brand-border bg-[#f7f6fe] pr-2 pl-3 hover:bg-brand-purple-light/60"
        trigger={(_, open) => (
          <>
            <Flag code={country.code} />
            <span className="text-[15px] font-medium text-brand-text tabular-nums">+{country.dial}</span>
            <ChevronDown className={cn("size-3.5 text-brand-muted transition-transform", open && "rotate-180")} aria-hidden />
          </>
        )}
      />
      <input
        id="bill-phone"
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        maxLength={country.max}
        value={state.billing.phone}
        onChange={(e) => setBilling({ phone: sanitizePhoneNumber(e.target.value, country) })}
        onPaste={(e) => {
          // Pasting "+91 70200 38436" or "07911 123456": strip the code / trunk 0 before the length cap.
          e.preventDefault();
          setBilling({ phone: sanitizePhoneNumber(e.clipboardData.getData("text"), country) });
        }}
        onBlur={onBlur}
        placeholder={country.min === country.max ? `${country.max}-digit number` : "Phone number"}
        className="min-w-0 flex-1 bg-transparent px-3 text-[15px] tracking-wide text-brand-text outline-none placeholder:tracking-normal placeholder:text-brand-muted/70"
        {...describedBy("bill-phone", error, "bill-phone-hint")}
      />
    </div>
  );
}

/** "Tax Calculation Preview" — the same numbers as the plan summary, next to the tax inputs. */
function TaxPreview() {
  const { totals } = useCheckout();
  const { tax } = totals;

  return (
    <div className="mt-5 rounded-lg border border-brand-border bg-[#f7f6fe] p-4">
      <p className="font-semibold text-brand-text">Tax Calculation Preview</p>
      <dl className="mt-2.5 flex flex-col gap-1.5 text-sm">
        <div className="flex justify-between gap-3">
          <dt className="text-brand-muted">Taxable amount</dt>
          <dd className="text-brand-text tabular-nums">{formatINR(totals.taxable)}</dd>
        </div>
        {tax.lines.map((line) => (
          <div key={line.label} className="flex justify-between gap-3">
            <dt className="text-brand-muted">
              {line.label} ({formatRate(line.rate)})
            </dt>
            <dd className="text-brand-text tabular-nums">{formatINR(line.amount)}</dd>
          </div>
        ))}
        <div className="mt-1 flex justify-between gap-3 rounded-md bg-brand-purple-light px-3 py-2 font-semibold">
          <dt className="text-brand-text">
            Total Tax{tax.lines.length > 0 && ` (${formatRate(tax.lines.reduce((sum, l) => sum + l.rate, 0))})`}
          </dt>
          <dd className="text-brand-text tabular-nums">
            {tax.pending ? "At payment" : formatINR(tax.total)}
          </dd>
        </div>
      </dl>
      <p className="mt-2.5 text-xs text-brand-muted">
        {!totals.locationComplete
          ? "Select your state to see tax."
          : tax.reverseCharge
            ? "Reverse charge applies — your business accounts for the tax."
            : tax.pending
              ? "Sales tax depends on your full address and is calculated when you pay."
              : "Tax is based on your billing location and is finalised on the next step."}
      </p>
    </div>
  );
}

function Section({ index, title, subtitle, children }: { index: number; title: string; subtitle: string; children: ReactNode }) {
  return (
    <section aria-labelledby={`bill-section-${index}`} className="rounded-xl border border-brand-border bg-white p-4 sm:p-5">
      <div className="mb-4 flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-purple text-base font-semibold text-white">
          {index}
        </span>
        <div>
          <h3 id={`bill-section-${index}`} className="text-lg font-bold text-brand-text">
            {title}
          </h3>
          <p className="text-sm text-brand-muted">{subtitle}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function Field({
  id,
  label,
  required,
  optional,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-brand-text">
        {label}
        {required && <span className="text-red-500"> *</span>}
        {optional && <span className="font-normal text-brand-muted"> (Optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
          <CircleAlert className="size-3.5 shrink-0" aria-hidden /> {error}
        </p>
      )}
    </div>
  );
}

function RadioDot({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex size-4 shrink-0 items-center justify-center rounded-full border-2",
        active ? "border-brand-purple" : "border-brand-border"
      )}
    >
      {active && <span className="size-2 rounded-full bg-brand-purple" />}
    </span>
  );
}

const inputClass = (error?: string, extra?: string) =>
  cn(
    "h-11 w-full rounded-lg border bg-white px-3 text-[15px] text-brand-text outline-none placeholder:text-brand-muted/70 focus-visible:border-brand-purple focus-visible:ring-2 focus-visible:ring-brand-purple/30",
    error ? "border-red-400" : "border-brand-border",
    extra
  );

const describedBy = (id: string, error?: string, hint?: string) => {
  const ids = [error && `${id}-error`, hint].filter(Boolean).join(" ");
  return { "aria-invalid": !!error, "aria-describedby": ids || undefined };
};
