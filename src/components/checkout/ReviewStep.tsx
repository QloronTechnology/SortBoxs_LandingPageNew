"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Check, CreditCard, FileText, Info, Landmark, Pencil, Smartphone } from "lucide-react";
import { checkoutModules } from "@/data/checkout";
import { invoiceTermsDays, paymentMethods } from "@/data/payment";
import { routes } from "@/config/routes";
import { toneClasses } from "@/components/layout/Header/menus/menuStyles";
import { cn, formatINR } from "@/lib/utils";
import { useCheckout } from "./CheckoutProvider";
import { findPhoneCountry, formatPhone } from "@/data/phone";
import { effectiveMethod } from "./BillingStep";

/**
 * Step 3 — "Review your order": plan lines, billing details and payment method, each with Edit, plus the
 * terms consent that the Pay button requires (from the "Review & Pay" design).
 */
export function ReviewStep({
  onEditPlan,
  onEditBilling,
  payError,
}: {
  onEditPlan: () => void;
  onEditBilling: () => void;
  /** Why the last payment attempt didn't go through. */
  payError: string | null;
}) {
  const { state, totals, dispatch } = useCheckout();
  const { billing } = state;
  const period = totals.period;
  const yearly = period === "year";

  const invoice = effectiveMethod(state, totals) === "invoice";
  const regionLine = [billing.city, [state.region, billing.postalCode].filter(Boolean).join(" ")].filter(Boolean).join(", ");

  return (
    <div className="flex flex-col gap-4">
      {/* Plan lines */}
      <Card title={totals.plan ? "Selected Plan" : "Selected Modules"} onEdit={onEditPlan} editLabel="Edit Plan">
        {/* Phones: one stacked row per line. */}
        <ul className="flex flex-col divide-y divide-brand-border sm:hidden">
          {totals.lines.map(({ id, name, icon: Icon, tone, users, amount }) => (
            <li key={id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
              <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-lg", toneClasses[tone])}>
                <Icon className="size-4.5" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-brand-text">{name}</span>
                <span className="block text-xs text-brand-muted tabular-nums">
                  {users} × {formatINR(amount / users)} / user
                </span>
              </span>
              <span className="font-semibold text-brand-text tabular-nums">{formatINR(amount)}</span>
            </li>
          ))}
        </ul>

        <div className="-mx-4 hidden overflow-x-auto sm:-mx-5 sm:block">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="bg-[#f4f3fd] text-brand-muted">
                <th scope="col" className="py-2.5 pr-3 pl-4 font-medium sm:pl-5">
                  {totals.plan ? "Plan" : "Module"}
                </th>
                <th scope="col" className="px-3 py-2.5 text-center font-medium">
                  Users
                </th>
                <th scope="col" className="px-3 py-2.5 text-right font-medium">
                  Price / User / {yearly ? "Year" : "Month"}
                </th>
                <th scope="col" className="py-2.5 pr-4 pl-3 text-right font-medium sm:pr-5">
                  Amount ({yearly ? "Yearly" : "Monthly"})
                </th>
              </tr>
            </thead>
            <tbody>
              {totals.lines.map(({ id, name, icon: Icon, tone, users, amount }) => {
                const description = totals.plan?.description ?? checkoutModules.find((m) => m.id === id)?.description;
                return (
                  <tr key={id} className="border-b border-brand-border last:border-0">
                    <th scope="row" className="py-3 pr-3 pl-4 font-normal sm:pl-5">
                      <span className="flex items-center gap-3">
                        <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-lg", toneClasses[tone])}>
                          <Icon className="size-4.5" aria-hidden />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-semibold text-brand-text">{name}</span>
                          {description && <span className="block text-xs text-brand-muted">{description}</span>}
                        </span>
                      </span>
                    </th>
                    <td className="px-3 py-3 text-center text-brand-text tabular-nums">{users}</td>
                    <td className="px-3 py-3 text-right text-brand-text tabular-nums">{formatINR(amount / users)}</td>
                    <td className="py-3 pr-4 pl-3 text-right font-semibold text-brand-text tabular-nums sm:pr-5">
                      {formatINR(amount)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {yearly && totals.discount > 0 && (
          <p className="mt-3 text-xs text-brand-muted">
            Amounts are list prices; the {totals.discountLabel.toLowerCase()} is applied in the order summary.
          </p>
        )}
      </Card>

      {/* Billing details */}
      <Card title="Billing Information" onEdit={onEditBilling}>
        <dl className="grid grid-cols-1 gap-x-6 gap-y-4 text-[15px] sm:grid-cols-2">
          <Detail label="Full Name">{billing.fullName}</Detail>
          <Detail label="Work Email">{billing.email}</Detail>
          <Detail label="Phone">{formatPhone(billing.phone, findPhoneCountry(billing.phoneCountry))}</Detail>
          {billing.company && <Detail label="Company Name">{billing.company}</Detail>}
          <Detail label="Billing Address" wide>
            {billing.line1}
            {regionLine && <span className="block">{regionLine}</span>}
            <span className="block">
              {totals.country.flag} {totals.country.name}
            </span>
          </Detail>
          <Detail label="Purchase Type">{billing.customerType === "business" ? "Business (Registered)" : "Individual"}</Detail>
          {totals.hasValidTaxId && totals.country.taxId && (
            <Detail label={totals.country.taxId.label}>
              <span className="flex flex-wrap items-center gap-2">
                {state.taxId}
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                  <Check className="size-3.5" strokeWidth={3} aria-hidden /> Valid format
                </span>
              </span>
            </Detail>
          )}
          {invoice && billing.poNumber && <Detail label="PO Number">{billing.poNumber}</Detail>}
        </dl>
      </Card>

      {/* Payment */}
      <Card title="Payment Method" onEdit={onEditBilling}>
        <PaymentMethodSummary />

        <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-lg bg-[#f4f3fd] p-4">
          <input
            type="checkbox"
            checked={state.termsAccepted}
            onChange={(e) => dispatch({ type: "setTermsAccepted", accepted: e.target.checked })}
            className="mt-0.5 size-5 shrink-0 accent-brand-purple"
            aria-describedby="terms-detail"
          />
          <span className="text-sm">
            <span className="font-medium text-brand-text">
              I agree to the{" "}
              <Link href={routes.legal.terms} target="_blank" className="text-brand-purple underline-offset-2 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href={routes.legal.privacy} target="_blank" className="text-brand-purple underline-offset-2 hover:underline">
                Privacy Policy
              </Link>
              .
            </span>
            <span id="terms-detail" className="mt-0.5 block text-brand-muted">
              {invoice
                ? `By requesting an invoice, you agree to pay ${formatINR(totals.total)}${totals.tax.pending ? " plus sales tax" : ""} by bank transfer within ${invoiceTermsDays} days of the invoice date. Your subscription renews every ${period} until you cancel.`
                : `By confirming your subscription, you authorize SortBoxs to charge ${formatINR(totals.total)}${totals.tax.pending ? " plus sales tax" : ""} every ${period} until you cancel.`}
            </span>
          </span>
        </label>

        {payError && (
          <p role="alert" className="mt-4 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
            {payError}
          </p>
        )}
      </Card>

      <WhatsIncluded />
    </div>
  );
}

function PaymentMethodSummary() {
  const { state, totals } = useCheckout();
  const method = effectiveMethod(state, totals);
  const Icon = { card: CreditCard, upi: Smartphone, netbanking: Landmark, invoice: FileText }[method];
  const label = paymentMethods.find((m) => m.id === method)?.label;
  const detail =
    method === "invoice"
      ? `Tax invoice for ${formatINR(totals.total)} emailed to ${state.billing.email}; pay within ${invoiceTermsDays} days.`
      : "You'll enter the details securely in Razorpay's window when you pay.";

  return (
    <div className="flex items-center gap-4 rounded-lg border border-brand-border px-4 py-3">
      <span className="flex h-11 w-14 shrink-0 items-center justify-center rounded-md border border-brand-border text-brand-purple">
        <Icon className="size-6" aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-medium text-brand-text">{label}</span>
        <span className="block text-sm text-brand-muted">{detail}</span>
      </span>
    </div>
  );
}

const included = [
  "Full access to your selected modules",
  "Number of users as per your plan",
  "Regular feature updates",
  "Email & chat support",
  "14-day free trial (if applicable)",
  "Cancel anytime",
];

function WhatsIncluded() {
  return (
    <section aria-labelledby="whats-included" className="rounded-xl border border-brand-border bg-white p-4 sm:p-5">
      <h3 id="whats-included" className="text-lg font-bold text-brand-text">
        What&apos;s Included?
      </h3>
      <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {included.map((item) => (
          <li key={item} className="flex items-center gap-2.5 text-[15px] text-brand-muted">
            <Check className="size-4 shrink-0 text-brand-purple" strokeWidth={2.5} aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Card({
  title,
  onEdit,
  editLabel = "Edit",
  children,
}: {
  title: string;
  onEdit: () => void;
  editLabel?: string;
  children: ReactNode;
}) {
  return (
    <section aria-label={title} className="rounded-xl border border-brand-border bg-white p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-lg font-bold text-brand-text">{title}</h3>
        <button
          type="button"
          onClick={onEdit}
          className="flex items-center gap-1.5 rounded text-sm font-medium text-brand-purple outline-none hover:underline focus-visible:ring-2 focus-visible:ring-brand-purple/60"
        >
          <Pencil className="size-3.5" aria-hidden /> {editLabel}
          <span className="sr-only">{title}</span>
        </button>
      </div>
      {children}
    </section>
  );
}

/** Label above value; long unbroken text (emails, addresses) wraps instead of overflowing. */
function Detail({ label, wide, children }: { label: string; wide?: boolean; children: ReactNode }) {
  return (
    <div className={cn("min-w-0", wide && "sm:col-span-2")}>
      <dt className="text-xs font-medium tracking-wide text-brand-muted uppercase">{label}</dt>
      <dd className="mt-0.5 text-brand-text [overflow-wrap:anywhere]">{children}</dd>
    </div>
  );
}
