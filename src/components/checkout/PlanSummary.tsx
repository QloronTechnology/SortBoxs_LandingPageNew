"use client";

import type { ReactNode } from "react";
import { Check, ChevronDown, Info, Pencil, Plus, X } from "lucide-react";
import { billingCountries } from "@/data/billingTax";
import { toneClasses } from "@/components/layout/Header/menus/menuStyles";
import { formatRate } from "@/lib/tax";
import { cn, formatINR } from "@/lib/utils";
import { useCheckout } from "./CheckoutProvider";
import { CouponField } from "./CouponField";

const selectClass =
  "h-11 w-full cursor-pointer appearance-none rounded-lg border border-brand-border bg-white pr-10 pl-3 text-[15px] text-brand-text outline-none focus-visible:border-brand-purple focus-visible:ring-2 focus-visible:ring-brand-purple/30 aria-invalid:border-amber-400";

/**
 * "Your Sortboxs Plan" — selected modules, coupon, tax location and totals. With `onEditPlan` (Step 2)
 * the plan is read-mostly: "Edit Plan" goes back to Step 1 and the location shows as details, since the
 * billing form edits it.
 */
export function PlanSummary({
  onAddModules,
  onEditPlan,
  readOnly = false,
  className,
}: {
  onAddModules: () => void;
  onEditPlan?: () => void;
  /** Step 3 "Order Summary": totals only — the review cards above show and edit everything else. */
  readOnly?: boolean;
  className?: string;
}) {
  const { state, totals, dispatch } = useCheckout();
  const { lines } = totals;
  const yearly = state.cycle === "yearly";

  return (
    <aside
      aria-labelledby="plan-summary"
      className={cn(
        "rounded-xl border border-brand-border bg-white p-5 shadow-[0_20px_50px_-24px_rgba(23,22,92,0.25)] sm:p-6",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 id="plan-summary" className="text-xl font-bold text-brand-text sm:text-[22px]">
            {readOnly ? "Order Summary" : "Your Sortboxs Plan"}
          </h2>
          <p className="text-xs text-brand-muted">Amounts per {totals.period}, in INR</p>
        </div>
        {readOnly ? (
          <span className="rounded-full bg-brand-purple-light px-3 py-1 text-xs font-medium text-brand-purple">
            {yearly ? "Yearly" : "Monthly"} Billing
          </span>
        ) : onEditPlan ? (
          <button
            type="button"
            onClick={onEditPlan}
            className="flex items-center gap-1.5 rounded text-sm font-medium text-brand-purple outline-none hover:underline focus-visible:ring-2 focus-visible:ring-brand-purple/60"
          >
            <Pencil className="size-3.5" aria-hidden /> Edit Plan
          </button>
        ) : !totals.plan && lines.length > 0 && (
          <button
            type="button"
            onClick={() => dispatch({ type: "clear" })}
            className="rounded text-sm font-medium text-brand-purple outline-none hover:underline focus-visible:ring-2 focus-visible:ring-brand-purple/60"
          >
            Clear All
          </button>
        )}
      </div>

      {readOnly ? null : lines.length > 0 ? (
        <ul className="mt-4 flex flex-col gap-3">
          {lines.map(({ id, name, icon: Icon, tone, users, amount }) => (
            <li key={id} className="flex items-center gap-3">
              <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-lg", toneClasses[tone])}>
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="min-w-0 flex-1 truncate font-semibold text-brand-text">{name}</span>
              <span className="shrink-0 text-sm text-brand-muted">
                {users} {users === 1 ? "user" : "users"}
              </span>
              <span className="w-20 shrink-0 text-right font-semibold text-brand-text tabular-nums">{formatINR(amount)}</span>
              {/* A fixed plan can't be removed — only changed (in step 1). */}
              {!totals.plan && !onEditPlan && (
                <button
                  type="button"
                  onClick={() => dispatch({ type: "setUsers", id, users: 0 })}
                  aria-label={`Remove ${name}`}
                  className="-mr-1 flex size-7 shrink-0 items-center justify-center rounded-md text-brand-muted outline-none hover:bg-brand-surface hover:text-brand-text focus-visible:ring-2 focus-visible:ring-brand-purple/60"
                >
                  <X className="size-4" aria-hidden />
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 rounded-lg bg-brand-surface px-4 py-5 text-center text-sm text-brand-muted">
          No modules yet. Add a module to start building your plan.
        </p>
      )}

      {!totals.plan && !onEditPlan && (
      <button
        type="button"
        onClick={onAddModules}
        className="mt-4 flex h-11 w-full items-center justify-center gap-1.5 rounded-lg border border-brand-purple text-[15px] font-semibold text-brand-purple transition-colors outline-none hover:bg-brand-purple-light focus-visible:ring-2 focus-visible:ring-brand-purple/60"
      >
        <Plus className="size-4" aria-hidden /> Add More Modules
      </button>
      )}

      <dl className="mt-5 flex flex-col gap-2.5 border-t border-brand-border pt-5 text-[15px]">
        <Row label={`Subtotal (${totals.totalUsers} ${totals.totalUsers === 1 ? "user" : "users"})`}>
          {formatINR(totals.subtotal)}
        </Row>
        {yearly && (
          <Row label={totals.discountLabel} tone="saving">
            - {formatINR(totals.discount)}
          </Row>
        )}
        {totals.coupon && totals.coupon.discount > 0 && (
          <Row label={`Coupon ${totals.coupon.coupon.code}`} tone="saving">
            - {formatINR(totals.coupon.discount)}
          </Row>
        )}
      </dl>
      {!readOnly && !yearly && totals.yearlySaving > 0 && (
        <button
          type="button"
          onClick={() => dispatch({ type: "setCycle", cycle: "yearly" })}
          className="mt-2.5 w-full rounded-md bg-emerald-50 px-3 py-2 text-left text-sm text-emerald-700 outline-none hover:bg-emerald-100 focus-visible:ring-2 focus-visible:ring-emerald-500/50"
        >
          Switch to yearly and save <strong className="font-semibold">{formatINR(totals.yearlySaving)}</strong> a year
        </button>
      )}

      {!readOnly && <CouponField />}
      {!readOnly && (onEditPlan ? <BillingDetailsSummary /> : <BillingLocation />)}
      <TaxAndTotals />
    </aside>
  );
}

function Row({ label, tone, children }: { label: string; tone?: "saving"; children: ReactNode }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-brand-purple">{label}</dt>
      <dd className={cn("font-semibold tabular-nums", tone === "saving" ? "text-emerald-600" : "text-brand-purple")}>
        {children}
      </dd>
    </div>
  );
}

/** Country, state/province (where tax depends on it), and an optional business tax ID. */
function BillingLocation() {
  const { state, totals, dispatch } = useCheckout();
  const { country } = totals;
  const taxId = country.taxId;

  return (
    <fieldset className="mt-5 border-t border-brand-border pt-5">
      <legend className="sr-only">Tax &amp; Billing Location</legend>
      <p aria-hidden className="font-semibold text-brand-text">
        Tax &amp; Billing Location
      </p>
      <div className="mt-3 flex flex-col gap-2.5">
        <div className="relative">
          <select
            aria-label="Country"
            value={state.country}
            onChange={(event) => dispatch({ type: "setCountry", country: event.target.value })}
            className={selectClass}
          >
            {billingCountries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.name}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-brand-muted" aria-hidden />
        </div>

        {country.regions && (
          <div className="relative">
            <select
              aria-label={country.regionLabel ?? "Region"}
              aria-invalid={!totals.locationComplete}
              value={state.region}
              onChange={(event) => dispatch({ type: "setRegion", region: event.target.value })}
              className={cn(selectClass, !state.region && "text-brand-muted")}
            >
              <option value="" disabled>
                Select {(country.regionLabel ?? "region").toLowerCase()}
              </option>
              {country.regions.map((region) => (
                <option key={region.name}>{region.name}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-brand-muted" aria-hidden />
          </div>
        )}
      </div>

      {taxId && (
        <div className="mt-3">
          <label className="flex w-fit cursor-pointer items-center gap-2 text-sm font-medium text-brand-purple">
            <input
              type="checkbox"
              checked={state.hasTaxId}
              onChange={(event) => dispatch({ type: "setHasTaxId", hasTaxId: event.target.checked })}
              className="size-4 accent-brand-purple"
            />
            I have a {taxId.label}
          </label>
          {state.hasTaxId && (
            <div className="mt-2">
              <input
                value={state.taxId}
                onChange={(event) => dispatch({ type: "setTaxId", taxId: event.target.value })}
                placeholder={`e.g. ${taxId.placeholder}`}
                aria-label={taxId.label}
                aria-invalid={!!totals.taxIdError}
                aria-describedby="tax-id-hint"
                autoCapitalize="characters"
                spellCheck={false}
                className="h-11 w-full rounded-lg border border-brand-border px-3 text-[15px] tracking-wide text-brand-text uppercase outline-none placeholder:tracking-normal placeholder:normal-case focus-visible:border-brand-purple focus-visible:ring-2 focus-visible:ring-brand-purple/30 aria-invalid:border-red-400"
              />
              <p
                id="tax-id-hint"
                className={cn("mt-1 text-xs", totals.taxIdError ? "text-red-600" : "text-brand-muted")}
              >
                {totals.taxIdError
                  ? totals.taxIdError
                  : taxId.reverseCharge
                    ? `Registered businesses with a valid ${taxId.label} aren't charged tax (reverse charge).`
                    : `Your ${taxId.label} will appear on the tax invoice so you can claim input tax credit.`}
              </p>
            </div>
          )}
        </div>
      )}
    </fieldset>
  );
}

/** Step 2: the location and tax ID as read-only details (the billing form above edits them). */
function BillingDetailsSummary() {
  const { state, totals } = useCheckout();
  const { country } = totals;
  const rows: [string, ReactNode][] = [
    ["Country", `${country.flag} ${country.name}`],
    ...(country.regions ? [[country.regionLabel ?? "Region", state.region || "—"] as [string, ReactNode]] : []),
    ...(totals.hasValidTaxId && country.taxId
      ? [
          [
            country.taxId.label,
            <span key="id" className="flex items-center gap-1.5">
              {state.taxId}
              <Check className="size-4 text-emerald-600" strokeWidth={3} aria-label="Valid format" />
            </span>,
          ] as [string, ReactNode],
        ]
      : []),
  ];

  return (
    <div className="mt-5 border-t border-brand-border pt-5">
      <p className="font-semibold text-brand-text">Tax &amp; Billing Details</p>
      <dl className="mt-2.5 flex flex-col gap-1.5 text-[15px]">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-3">
            <dt className="text-brand-muted">{label}</dt>
            <dd className="min-w-0 text-right font-medium text-brand-text [overflow-wrap:anywhere]">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** Tax lines for the chosen location, then the monthly and yearly totals. */
function TaxAndTotals() {
  const { state, totals } = useCheckout();
  const { country, tax } = totals;
  const yearly = state.cycle === "yearly";
  const taxName = country.tax?.[0]?.label ?? "Tax";

  let taxNote: string | null = null;
  if (!totals.locationComplete) taxNote = `Select your ${(country.regionLabel ?? "region").toLowerCase()} to see tax.`;
  else if (tax.reverseCharge) taxNote = `Reverse charge: ${taxName} is accounted for by your business, so none is added.`;
  else if (tax.pending) taxNote = "Sales tax depends on your full address and is calculated at payment.";
  else if (tax.lines.length === 0)
    taxNote =
      country.code === "XX"
        ? "Any local taxes are shown on your invoice."
        : `No tax is added for customers in ${country.name}.`;

  return (
    <dl className="mt-5 flex flex-col gap-3">
      {totals.locationComplete && tax.lines.length > 0 && (
        <div className="flex flex-col gap-1.5 rounded-lg bg-brand-surface px-4 py-3">
          {tax.lines.map((line) => (
            <div key={line.label} className="flex items-center justify-between gap-3">
              <dt className="flex items-center gap-1.5 font-medium text-brand-text">
                {line.label} ({formatRate(line.rate)})
                {line === tax.lines[0] && (
                  <span title="Charged on the plan price after discounts." className="text-brand-muted">
                    <Info className="size-4" aria-hidden />
                    <span className="sr-only">Charged on the plan price after discounts.</span>
                  </span>
                )}
              </dt>
              <dd className="font-semibold text-brand-text tabular-nums">{formatINR(line.amount)}</dd>
            </div>
          ))}
        </div>
      )}
      {taxNote && (
        <div className="flex items-start gap-2 rounded-lg bg-brand-surface px-4 py-3 text-sm text-brand-muted">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
          <p>{taxNote}</p>
        </div>
      )}

      <div className="flex items-center justify-between gap-3 rounded-lg bg-brand-purple-light px-4 py-4">
        <dt className="text-lg font-bold text-brand-purple sm:text-xl">Total ({yearly ? "Yearly" : "Monthly"})</dt>
        <dd className="text-right tabular-nums">
          {yearly && totals.listTotal > totals.total && (
            <s className="mr-2 text-sm text-brand-muted">{formatINR(totals.listTotal)}</s>
          )}
          <span className="text-xl font-bold text-brand-purple sm:text-2xl">{formatINR(totals.total)}</span>
          {tax.pending && <span className="block text-xs font-medium text-brand-purple">+ sales tax</span>}
        </dd>
      </div>
      {yearly ? (
        <>
          <div className="flex items-baseline justify-between gap-3 px-1">
            <dt className="text-brand-purple">Works out to</dt>
            <dd className="font-semibold text-brand-text tabular-nums">≈ {formatINR(totals.perMonth)} / month</dd>
          </div>
          {totals.listTotal > totals.total && (
            <div className="flex items-baseline justify-between gap-3 px-1">
              <dt className="text-emerald-700">You save</dt>
              <dd className="font-semibold text-emerald-600 tabular-nums">{formatINR(totals.listTotal - totals.total)} / year</dd>
            </div>
          )}
        </>
      ) : (
        <div className="flex items-baseline justify-between gap-3 px-1">
          <dt className="text-brand-purple">Over a year</dt>
          <dd className="font-semibold text-brand-text tabular-nums">{formatINR(totals.perYear)}</dd>
        </div>
      )}
      <p className="px-1 text-xs text-brand-muted">
        {yearly ? "Billed once a year." : "Billed every month. Cancel anytime."}
      </p>
    </dl>
  );
}
