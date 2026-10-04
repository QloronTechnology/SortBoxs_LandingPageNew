"use client";

import { Check, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { rupees, useReducedMotion, useTicker } from "@/components/sales-solution/hooks";
import { SampleTag } from "@/components/sales-solution/shared";
import { Crumbs, HeroCopy } from "../parts";
import { computeQuote } from "./quoteMath";

const items = [
  ["SortBoxs Sales, 25 users", 300000],
  ["Onboarding and training", 80000],
  ["Priority support, 1 year", 100000],
] as const;
const statuses = ["Draft", "Sent", "Approved", "Order created"];
const statusTone = ["bg-slate-100 text-slate-600", "bg-amber-100 text-amber-700", "bg-sky-100 text-sky-700", "bg-emerald-100 text-emerald-700"];

/** The quote builder: line items land one by one, totals follow, then the document moves from Draft to Order created. */
function QuoteDocument() {
  const reduced = useReducedMotion();
  const [tick] = useTicker(8, 1000, reduced, 2);
  const step = reduced ? 8 : tick;
  const shown = Math.min(step, items.length);
  const subtotal = items.slice(0, shown).reduce((sum, [, amount]) => sum + amount, 0);
  const figures = computeQuote(subtotal, 5, 18);
  const statusIndex = step < 5 ? 0 : step - 4 > 3 ? 3 : step - 4;

  return (
    <div className="relative mx-auto w-full max-w-[560px] lg:justify-self-end">
      <span aria-hidden className="absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(ellipse_at_center,#e2dcfb_0%,rgba(226,220,251,0)_70%)]" />
      <div className="relative -rotate-1 rounded-3xl bg-white p-5 shadow-[0_30px_70px_-34px_rgba(23,22,92,0.55)] ring-1 ring-brand-border sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-brand-muted">Quote #QT-1024</p>
            <p className="text-xl font-extrabold text-brand-text">Acme Technologies</p>
            <p className="text-xs text-brand-muted">Prepared by Riya Sharma · Valid 30 days</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <SampleTag />
            <span key={statusIndex} className={cn("demo-rise rounded-full px-3 py-1 text-xs font-bold", statusTone[statusIndex])}>
              {statuses[statusIndex]}
            </span>
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl ring-1 ring-brand-border">
          <div className="grid grid-cols-[1fr_auto] bg-brand-surface px-4 py-2 text-[11px] font-bold tracking-wide text-brand-muted uppercase">
            <span>Item</span>
            <span>Amount</span>
          </div>
          <ul className="min-h-[132px] divide-y divide-brand-border">
            {items.slice(0, shown).map(([name, amount]) => (
              <li key={name} className="demo-rise grid grid-cols-[1fr_auto] gap-3 px-4 py-3 text-sm">
                <span className="text-brand-text">{name}</span>
                <span className="font-semibold text-brand-text tabular-nums">{rupees(amount)}</span>
              </li>
            ))}
          </ul>
          <dl className="space-y-1.5 border-t border-brand-border bg-brand-surface/60 px-4 py-3 text-sm">
            <div className="flex justify-between text-brand-muted">
              <dt>Subtotal</dt>
              <dd className="tabular-nums">{rupees(figures.subtotal)}</dd>
            </div>
            <div className="flex justify-between text-brand-muted">
              <dt>Discount (5%)</dt>
              <dd className="tabular-nums">−{rupees(figures.discount)}</dd>
            </div>
            <div className="flex justify-between text-brand-muted">
              <dt>GST (18%)</dt>
              <dd className="tabular-nums">{rupees(figures.tax)}</dd>
            </div>
            <div className="flex justify-between border-t border-brand-border pt-2 text-base font-extrabold text-brand-text">
              <dt>Total</dt>
              <dd className="text-brand-purple tabular-nums">{rupees(figures.total)}</dd>
            </div>
          </dl>
        </div>

        <ol className="mt-4 flex gap-1.5" aria-label="Quote status">
          {statuses.map((label, index) => (
            <li key={label} className="flex-1">
              <span className={cn("block h-1.5 rounded-full transition-colors duration-500", index <= statusIndex ? "bg-brand-purple" : "bg-brand-border")} />
              <span className={cn("mt-1 flex items-center gap-1 text-[10px] font-semibold", index <= statusIndex ? "text-brand-purple" : "text-brand-muted")}>
                {index < statusIndex && <Check className="size-3" strokeWidth={3} aria-hidden />} {label}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export function QuotesHero() {
  return (
    <section className="overflow-hidden bg-[linear-gradient(180deg,#f4f1ff_0%,#faf9ff_100%)]">
      <div className="container-page grid items-center gap-12 pt-8 pb-20 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14 lg:pt-10 lg:pb-16">
        <div>
          <Crumbs current="Quotes & Orders" />
          <HeroCopy
            icon={FileText}
            iconTone="bg-amber-100 text-amber-700"
            eyebrow="Quotes & Orders"
            title="Turn Quotes"
            highlight="Into Orders Faster"
            description="Create professional quotes, manage approvals and move customers from proposal to order without unnecessary manual work."
          />
        </div>
        <QuoteDocument />
      </div>
    </section>
  );
}
