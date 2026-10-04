"use client";

import { useState } from "react";
import { AlertTriangle, ArrowRight, Check, FileText, ShieldCheck, Truck, UserRound, PackageCheck, Link2, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { rupees, useReducedMotion, useTicker } from "@/components/sales-solution/hooks";
import { SampleTag, SectionHead } from "@/components/sales-solution/shared";
import { computeQuote } from "./quoteMath";

/* ---------------------------------------------------------------- Interactive quote builder */

const catalog = [
  { id: "licence", name: "SortBoxs Sales, 25 users", price: 300000 },
  { id: "onboarding", name: "Onboarding and training", price: 80000 },
  { id: "support", name: "Priority support, 1 year", price: 100000 },
  { id: "migration", name: "Data migration", price: 60000 },
  { id: "custom", name: "Custom reports", price: 45000 },
];
const discountOptions = [0, 5, 10, 15, 20];
const taxOptions = [
  ["GST 18%", 18],
  ["GST 12%", 12],
  ["GST 5%", 5],
  ["No tax", 0],
] as const;
const APPROVAL_LIMIT = 10;

export function QuoteBuilder() {
  const [selected, setSelected] = useState<string[]>(["licence", "onboarding", "support"]);
  const [discount, setDiscount] = useState(5);
  const [tax, setTax] = useState(18);
  const [sent, setSent] = useState(false);

  const chosen = catalog.filter((item) => selected.includes(item.id));
  const subtotal = chosen.reduce((sum, item) => sum + item.price, 0);
  const figures = computeQuote(subtotal, discount, tax);
  const needsApproval = discount > APPROVAL_LIMIT;
  const status = chosen.length === 0 ? "Empty" : sent ? (needsApproval ? "Waiting for approval" : "Sent to customer") : "Draft";

  const toggle = (id: string) => {
    setSent(false);
    setSelected((current) => (current.includes(id) ? current.filter((value) => value !== id) : [...current, id]));
  };

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow="Quote creation" title="Build a quote in a few clicks" intro="Pick products and services, set the discount and tax, and watch the quote total itself. Discounts above the approval limit go to a manager first." />

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="rounded-3xl bg-brand-surface p-5 ring-1 ring-brand-border sm:p-7">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-brand-text">Products and services</h3>
              <SampleTag />
            </div>
            <fieldset className="mt-4">
              <legend className="sr-only">Choose what goes on the quote</legend>
              <ul className="space-y-2.5">
                {catalog.map((item) => {
                  const on = selected.includes(item.id);
                  return (
                    <li key={item.id}>
                      <label className={cn("flex cursor-pointer items-center gap-3 rounded-xl p-3 ring-1 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-purple", on ? "bg-brand-purple-light ring-brand-purple/40" : "bg-white ring-brand-border hover:bg-brand-surface")}>
                        <input type="checkbox" checked={on} onChange={() => toggle(item.id)} className="sr-only" />
                        <span className={cn("flex size-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors", on ? "border-brand-purple bg-brand-purple text-white" : "border-brand-border bg-white")}>
                          {on && <Check className="size-3.5" strokeWidth={3} aria-hidden />}
                        </span>
                        <span className="flex-1 text-sm font-semibold text-brand-text">{item.name}</span>
                        <span className="text-sm font-bold text-brand-text tabular-nums">{rupees(item.price)}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </fieldset>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-semibold text-brand-text">
                Discount
                <select value={discount} onChange={(event) => { setDiscount(Number(event.target.value)); setSent(false); }} className="mt-1.5 w-full rounded-xl bg-white px-3 py-2.5 text-sm ring-1 ring-brand-border outline-none focus-visible:ring-2 focus-visible:ring-brand-purple">
                  {discountOptions.map((option) => (
                    <option key={option} value={option}>{option}%</option>
                  ))}
                </select>
              </label>
              <label className="block text-sm font-semibold text-brand-text">
                Tax
                <select value={tax} onChange={(event) => { setTax(Number(event.target.value)); setSent(false); }} className="mt-1.5 w-full rounded-xl bg-white px-3 py-2.5 text-sm ring-1 ring-brand-border outline-none focus-visible:ring-2 focus-visible:ring-brand-purple">
                  {taxOptions.map(([label, value]) => (
                    <option key={label} value={value}>{label}</option>
                  ))}
                </select>
              </label>
            </div>
            <p className={cn("mt-4 flex items-start gap-2 rounded-xl px-4 py-3 text-xs leading-relaxed", needsApproval ? "bg-amber-50 text-amber-800" : "bg-brand-surface text-brand-muted")}>
              {needsApproval ? <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden /> : <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand-purple" aria-hidden />}
              {needsApproval ? `A ${discount}% discount is above the ${APPROVAL_LIMIT}% limit set in this example, so a manager has to approve it first.` : `Discounts up to ${APPROVAL_LIMIT}% can be sent without approval in this example. The limit is yours to set.`}
            </p>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-[0_30px_70px_-40px_rgba(23,22,92,0.55)] ring-1 ring-brand-border sm:p-7" aria-live="polite">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-brand-muted">Quote #QT-1025</p>
                <p className="text-lg font-extrabold text-brand-text">Acme Technologies</p>
              </div>
              <span className={cn("rounded-full px-3 py-1 text-xs font-bold", status === "Sent to customer" ? "bg-emerald-100 text-emerald-700" : status === "Waiting for approval" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600")}>{status}</span>
            </div>
            <ul className="mt-5 min-h-[96px] divide-y divide-brand-border rounded-2xl ring-1 ring-brand-border">
              {chosen.length === 0 && <li className="px-4 py-8 text-center text-sm text-brand-muted">Pick at least one item to start the quote.</li>}
              {chosen.map((item) => (
                <li key={item.id} className="flex justify-between gap-3 px-4 py-2.5 text-sm">
                  <span className="text-brand-text">{item.name}</span>
                  <span className="font-semibold tabular-nums">{rupees(item.price)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-4 space-y-1.5 text-sm">
              <div className="flex justify-between text-brand-muted"><dt>Subtotal</dt><dd className="tabular-nums">{rupees(figures.subtotal)}</dd></div>
              <div className="flex justify-between text-brand-muted"><dt>Discount ({discount}%)</dt><dd className="tabular-nums">−{rupees(figures.discount)}</dd></div>
              <div className="flex justify-between text-brand-muted"><dt>Tax ({tax}%)</dt><dd className="tabular-nums">{rupees(figures.tax)}</dd></div>
              <div className="flex justify-between border-t border-brand-border pt-2.5 text-lg font-extrabold text-brand-text"><dt>Total</dt><dd className="text-brand-purple tabular-nums">{rupees(figures.total)}</dd></div>
            </dl>
            <button
              type="button"
              disabled={chosen.length === 0}
              onClick={() => setSent(true)}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-purple px-5 py-3 text-sm font-semibold text-white outline-none transition-colors hover:bg-brand-purple-dark focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {needsApproval ? "Send for approval" : "Send quote"} <ArrowRight className="size-4" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- One connected process */

const chain: { icon: LucideIcon; title: string; lines: string[] }[] = [
  { icon: FileText, title: "Quote", lines: ["#QT-1024", "₹5,38,080"] },
  { icon: ShieldCheck, title: "Approval", lines: ["Manager review", "Approved"] },
  { icon: PackageCheck, title: "Order", lines: ["#SO-2087", "Confirmed"] },
  { icon: UserRound, title: "Customer", lines: ["Acme Technologies", "Record updated"] },
];
const tracking = ["Confirmed", "Processing", "Dispatched", "Delivered"];

export function ConnectedProcess() {
  const reduced = useReducedMotion();
  const [tick] = useTicker(chain.length + tracking.length, 1200, reduced, 2);
  const reached = reduced ? chain.length + tracking.length : tick;
  const chainStep = Math.min(reached, chain.length - 1);
  const trackStep = reached - chain.length;

  return (
    <section className="bg-brand-surface py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow="One connected process" title="One Connected Sales Process" intro="The quote, the approval, the order and the customer are one thread. Nothing is copied from one tool to another." />

        <ol aria-label="Quote, approval, order, customer" className="mt-12 flex flex-col items-stretch gap-3 lg:flex-row lg:items-center lg:gap-0">
          {chain.map(({ icon: Icon, title, lines }, index) => (
            <li key={title} className="contents">
              <div className={cn("flex flex-1 items-center gap-4 rounded-2xl p-5 ring-1 transition-all duration-500", index <= chainStep ? "bg-brand-purple-light/70 ring-brand-purple/30" : "bg-white ring-brand-border", index === chainStep && "shadow-lg shadow-brand-purple/20 ring-2 ring-brand-purple")}>
                <span className={cn("flex size-12 shrink-0 items-center justify-center rounded-xl", index <= chainStep ? "bg-brand-purple text-white" : "bg-brand-surface text-brand-muted")}>
                  <Icon className="size-6" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-bold text-brand-text">{title}</p>
                  {lines.map((line) => (
                    <p key={line} className="text-xs text-brand-muted">{line}</p>
                  ))}
                </div>
              </div>
              {index < chain.length - 1 && (
                <span aria-hidden className="flex items-center justify-center lg:px-2">
                  <ArrowRight className={cn("size-5 rotate-90 transition-colors duration-500 lg:rotate-0", index < chainStep ? "text-brand-purple" : "text-brand-border")} />
                </span>
              )}
            </li>
          ))}
        </ol>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_1fr]">
          <div className="rounded-3xl bg-white p-5 ring-1 ring-brand-border sm:p-7">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-sm font-bold text-brand-text"><UserRound className="size-4.5 text-brand-purple" aria-hidden /> Customer record: Acme Technologies</h3>
              <SampleTag />
            </div>
            <dl className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                ["Contact", "Priya Nair, Operations"],
                ["Owner", "Riya Sharma"],
                ["Open quote", "QT-1024"],
                ["Latest order", "SO-2087"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center gap-2.5 rounded-xl bg-brand-surface px-4 py-3 ring-1 ring-brand-border">
                  <Link2 className="size-4 shrink-0 text-brand-purple" aria-hidden />
                  <div>
                    <dt className="text-[11px] text-brand-muted">{label}</dt>
                    <dd className="text-sm font-bold text-brand-text">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-3xl bg-brand-navy p-5 text-white sm:p-7">
            <h3 className="flex items-center gap-2 text-sm font-bold"><Truck className="size-4.5 text-violet-300" aria-hidden /> Order tracking: SO-2087</h3>
            <ol className="mt-6 space-y-4">
              {tracking.map((label, index) => {
                const done = index < trackStep || reduced;
                const current = index === trackStep && !reduced;
                return (
                  <li key={label} className="flex items-center gap-3 text-sm">
                    <span className={cn("flex size-7 shrink-0 items-center justify-center rounded-full transition-colors duration-500", done ? "bg-emerald-400 text-brand-navy" : current ? "bg-brand-purple text-white shadow-[0_0_0_5px_rgba(108,53,245,0.3)]" : "bg-white/10 text-white/50")}>
                      {done ? <Check className="size-4" strokeWidth={3} aria-hidden /> : <span className="text-xs font-bold">{index + 1}</span>}
                    </span>
                    <span className={cn("font-semibold transition-colors", done || current ? "text-white" : "text-white/50")}>{label}</span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Capabilities, grouped like a document */

const groups: { title: string; icon: LucideIcon; items: [string, string][] }[] = [
  {
    title: "Build the quote",
    icon: FileText,
    items: [
      ["Quote creation", "Start from a deal and a template."],
      ["Product and service selection", "Add items from your own list."],
      ["Pricing", "Prices come from the list, not memory."],
      ["Discounts", "Apply them per line or for the whole quote."],
      ["Taxes", "Tax is calculated for you."],
    ],
  },
  {
    title: "Approve and send",
    icon: ShieldCheck,
    items: [
      ["Quote approval", "Route big discounts to the right manager."],
      ["Quote status", "Draft, sent, approved or accepted at a glance."],
    ],
  },
  {
    title: "Turn it into an order",
    icon: PackageCheck,
    items: [
      ["Order conversion", "One click from accepted quote to order."],
      ["Order tracking", "Follow the order after it is created."],
      ["Customer information", "Contacts and history stay attached."],
    ],
  },
];

export function QuoteCapabilities() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow="Core capabilities" title="Everything on the quote, and what comes after" intro="Ten capabilities, grouped the way a quote actually moves." />
        <div className="mt-12 grid gap-5 lg:grid-cols-[1.3fr_1fr_1fr]">
          {groups.map(({ title, icon: Icon, items }) => (
            <section key={title} aria-label={title} className="overflow-hidden rounded-3xl bg-white ring-1 ring-brand-border">
              <header className="flex items-center gap-3 border-b border-brand-border bg-brand-purple-light/60 px-5 py-4">
                <span className="flex size-9 items-center justify-center rounded-xl bg-brand-purple text-white">
                  <Icon className="size-4.5" aria-hidden />
                </span>
                <h3 className="text-sm font-bold text-brand-text">{title}</h3>
              </header>
              <ul className="divide-y divide-brand-border">
                {items.map(([name, body]) => (
                  <li key={name} className="px-5 py-3.5">
                    <p className="text-sm font-bold text-brand-text">{name}</p>
                    <p className="text-xs text-brand-muted">{body}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
