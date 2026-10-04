"use client";

import { useState } from "react";
import { Check, FileText, Link2, PackageCheck, Send, ShieldCheck, Target, TrendingUp, IndianRupee, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion, useTicker } from "./hooks";
import { SampleTag, SectionHead } from "./shared";

const flow: { icon: LucideIcon; label: string; status: string; note: string }[] = [
  { icon: Target, label: "Opportunity", status: "Draft", note: "Qualified opportunity OP-318 is ready for a quote." },
  { icon: FileText, label: "Quote", status: "Sent", note: "Quote QT-1024 sent to Acme Technologies." },
  { icon: ShieldCheck, label: "Approval", status: "Approved", note: "Discount approved by the sales manager." },
  { icon: PackageCheck, label: "Order", status: "Order confirmed", note: "Order SO-2087 created from the quote." },
  { icon: IndianRupee, label: "Revenue", status: "Won", note: "₹4,80,000 added to this quarter's revenue." },
];

const highlights: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: FileText, title: "Create quotes", body: "Build them from your product list, with taxes and discounts applied." },
  { icon: Send, title: "Track quote status", body: "See when a quote is sent, opened, approved or declined." },
  { icon: ShieldCheck, title: "Manage approvals", body: "Route discounts to the right manager without leaving the quote." },
  { icon: PackageCheck, title: "Convert quotes into orders", body: "One click turns an approved quote into a confirmed order." },
  { icon: Link2, title: "Keep customer and deal information connected", body: "The quote, the order and the deal always share one record." },
];

const lines = [
  ["SortBoxs Sales, 25 users", "₹3,00,000"],
  ["Onboarding and training", "₹80,000"],
  ["Priority support, 1 year", "₹1,00,000"],
];

const statusTone = ["bg-slate-100 text-slate-600", "bg-amber-100 text-amber-700", "bg-sky-100 text-sky-700", "bg-emerald-100 text-emerald-700", "bg-brand-purple-light text-brand-purple"];

export function QuotesAndOrders() {
  const reduced = useReducedMotion();
  const [taken, setTaken] = useState(false);
  const [tick, setTick] = useTicker(flow.length, 1900, reduced || taken, 1);
  const active = reduced && !taken ? flow.length - 1 : Math.min(tick, flow.length - 1);
  const current = flow[active];

  return (
    <section id="quotes-orders" className="scroll-mt-24 bg-[linear-gradient(180deg,#f4f1ff_0%,#ffffff_100%)] py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow="Quotes & Orders" title="Turn Opportunities Into Orders" intro="Move from proposal to order without re-keying a thing. Every step stays attached to the same customer and deal." />

        <ol className="mx-auto mt-12 grid max-w-4xl gap-2 sm:grid-cols-5" aria-label="Quote to revenue workflow">
          {flow.map(({ icon: Icon, label }, index) => {
            const done = index < active;
            const isActive = index === active;
            return (
              <li key={label} className="relative">
                <button
                  type="button"
                  aria-current={isActive ? "step" : undefined}
                  onClick={() => {
                    setTaken(true);
                    setTick(index);
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-2xl p-3 text-left outline-none ring-1 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-brand-purple sm:flex-col sm:gap-2 sm:py-4 sm:text-center",
                    isActive ? "bg-brand-purple text-white shadow-lg shadow-brand-purple/30 ring-brand-purple sm:-translate-y-1" : done ? "bg-white text-brand-text ring-emerald-200" : "bg-white/70 text-brand-muted ring-brand-border hover:bg-white"
                  )}
                >
                  <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-xl", isActive ? "bg-white/20" : done ? "bg-emerald-100 text-emerald-700" : "bg-brand-surface")}>
                    {done ? <Check className="size-4.5" strokeWidth={3} aria-hidden /> : <Icon className="size-4.5" aria-hidden />}
                  </span>
                  <span className="text-sm font-bold">{label}</span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
          <ul className="grid gap-5">
            {highlights.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-brand-purple shadow-sm ring-1 ring-brand-border">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-[15px] font-bold text-brand-text">{title}</h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-brand-muted">{body}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* Product screen: the quote, with the status and activity following the selected step */}
          <div className="rounded-3xl bg-white p-5 shadow-[0_30px_70px_-40px_rgba(23,22,92,0.55)] ring-1 ring-brand-border sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-brand-muted">Quote #QT-1024</p>
                <p className="text-lg font-extrabold text-brand-text">Acme Technologies</p>
              </div>
              <div className="flex items-center gap-2">
                <SampleTag />
                <span key={current.status} className={cn("demo-rise rounded-full px-3 py-1 text-xs font-bold", statusTone[active])}>
                  {current.status}
                </span>
              </div>
            </div>

            <div className="mt-5 overflow-hidden rounded-2xl ring-1 ring-brand-border">
              <table className="w-full text-left text-sm">
                <thead className="bg-brand-surface text-[11px] font-bold tracking-wide text-brand-muted uppercase">
                  <tr>
                    <th scope="col" className="px-4 py-2.5">Item</th>
                    <th scope="col" className="px-4 py-2.5 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border">
                  {lines.map(([item, amount]) => (
                    <tr key={item}>
                      <td className="px-4 py-3 text-brand-text">{item}</td>
                      <td className="px-4 py-3 text-right font-semibold text-brand-text tabular-nums">{amount}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-brand-purple-light/60">
                    <th scope="row" className="px-4 py-3 text-brand-text">Total</th>
                    <td className="px-4 py-3 text-right text-base font-extrabold text-brand-purple tabular-nums">₹4,80,000</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="mt-4 grid gap-2 text-xs text-brand-muted sm:grid-cols-3">
              {[["Customer", "Acme Technologies"], ["Deal", "OP-318"], ["Owner", "Riya Sharma"]].map(([label, value]) => (
                <p key={label} className="flex items-center gap-1.5 rounded-lg bg-brand-surface px-3 py-2">
                  <Link2 className="size-3 text-brand-purple" aria-hidden />
                  <span>{label}:</span> <b className="text-brand-text">{value}</b>
                </p>
              ))}
            </div>

            <ol className="mt-5 space-y-2.5 border-t border-brand-border pt-5">
              {flow.map(({ label, note }, index) => (
                <li key={label} className={cn("flex items-start gap-3 text-sm transition-opacity duration-300", index <= active ? "opacity-100" : "opacity-35")}>
                  <span className={cn("mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-white", index <= active ? "bg-emerald-500" : "bg-brand-border")}>
                    <Check className="size-3" strokeWidth={3} aria-hidden />
                  </span>
                  <span className="text-brand-text">
                    <b>{label}.</b> <span className="text-brand-muted">{note}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
              <TrendingUp className="size-3.5" aria-hidden /> Revenue and forecast update as each step completes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
