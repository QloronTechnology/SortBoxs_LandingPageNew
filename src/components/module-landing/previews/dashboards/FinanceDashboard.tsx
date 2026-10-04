"use client";

import { useState, type MouseEvent } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { PreviewFrame } from "../../PreviewFrame";
import { Chips, SectionLabel } from "./parts";

type SeriesKey = "receivables" | "payables" | "net";
const labels = ["W1", "W2", "W3", "W4", "W5", "W6"];
const receivables = [29, 31, 33, 35, 36, 38.4];
const payables = [18, 19.5, 21, 20.4, 21.2, 21.7];
const data: Record<SeriesKey, number[]> = {
  receivables,
  payables,
  net: receivables.map((value, index) => Math.round((value - payables[index]) * 10) / 10),
};
const options: { key: SeriesKey; label: string }[] = [
  { key: "receivables", label: "Receivables" },
  { key: "payables", label: "Payables" },
  { key: "net", label: "Net cash" },
];

const buckets = [
  { key: "current", label: "Current", amount: 24.1, tone: "bg-emerald-500", insight: "₹24.1L isn't due yet. Nothing to chase." },
  { key: "d30", label: "1–30 days", amount: 6.6, tone: "bg-amber-400", insight: "₹6.6L is 1 to 30 days late. A friendly reminder usually clears most of it." },
  { key: "d60", label: "31–60", amount: 4.9, tone: "bg-orange-500", insight: "₹4.9L is 31 to 60 days late. Ask the account owners to call this week." },
  { key: "d90", label: "60+", amount: 2.8, tone: "bg-red-500", insight: "₹2.8L is over 60 days late. Escalate to a senior contact." },
];
const invoices = [
  { id: "INV-1043", customer: "Skyline Infra", amount: "₹4.4L", bucket: "current", note: "Due in 12 days" },
  { id: "INV-1040", customer: "Orbit Retail", amount: "₹5.1L", bucket: "current", note: "Due in 20 days" },
  { id: "INV-1041", customer: "Northwind Logistics", amount: "₹2.1L", bucket: "d30", note: "8 days late" },
  { id: "INV-1035", customer: "Meridian Steel", amount: "₹1.4L", bucket: "d30", note: "15 days late" },
  { id: "INV-1029", customer: "Coral Hospitality", amount: "₹2.2L", bucket: "d60", note: "44 days late" },
  { id: "INV-1017", customer: "Lotus Clinics", amount: "₹1.6L", bucket: "d90", note: "72 days late" },
];
const totalAging = buckets.reduce((sum, bucket) => sum + bucket.amount, 0);

export function FinanceDashboard() {
  const [seriesKey, setSeriesKey] = useState<SeriesKey>("receivables");
  const [hover, setHover] = useState<number | null>(null);
  const [bucketKey, setBucketKey] = useState<string | null>(null);
  const [reminded, setReminded] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const series = data[seriesKey];
  const max = Math.max(...series);
  const min = Math.min(...series);
  const y = (value: number) => 34 - ((value - min) / (max - min || 1)) * 28;
  const coords = series.map((value, index) => [(index / (series.length - 1)) * 100, y(value)] as const);
  const line = coords.map(([cx, cy], index) => `${index === 0 ? "M" : "L"}${cx.toFixed(1)} ${cy.toFixed(1)}`).join(" ");
  const point = hover ?? series.length - 1;
  const change = Math.round(((series[series.length - 1] - series[0]) / Math.abs(series[0])) * 100);

  const bucket = buckets.find((item) => item.key === bucketKey);
  const shown = (bucketKey ? invoices.filter((invoice) => invoice.bucket === bucketKey) : invoices.filter((invoice) => invoice.bucket !== "current")).slice(0, 3);
  const insight = message ?? bucket?.insight ?? "₹14.3L is overdue. Send reminders starting with the oldest?";

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    setHover(Math.min(series.length - 1, Math.max(0, Math.round(ratio * (series.length - 1)))));
  };

  return (
    <PreviewFrame title="Cash Command" period="This month" insight={insight} badge="Collections up 9%">
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <Chips label="Cash view" options={options} value={seriesKey} onChange={setSeriesKey} />
        <p className="flex items-baseline gap-2">
          <span className="text-xl font-extrabold text-brand-text">₹{series[point]}L</span>
          <span className="text-[11px] font-semibold text-brand-muted">{labels[point]}</span>
          <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700">{change >= 0 ? "+" : ""}{change}%</span>
        </p>
      </div>

      <div
        className="relative mt-2 h-20 cursor-crosshair rounded-xl bg-gradient-to-b from-brand-purple-light to-brand-surface"
        onMouseMove={onMove}
        onMouseLeave={() => setHover(null)}
      >
        <svg aria-hidden viewBox="0 0 100 40" preserveAspectRatio="none" className="size-full text-brand-purple">
          <path d={`${line} L100 40 L0 40 Z`} fill="currentColor" fillOpacity="0.15" />
          <path d={line} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        </svg>
        {hover !== null && (
          <>
            <span aria-hidden className="absolute top-0 bottom-0 w-px bg-brand-purple/40" style={{ left: `${coords[hover][0]}%` }} />
            <span
              aria-hidden
              className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-purple ring-4 ring-white"
              style={{ left: `${coords[hover][0]}%`, top: `${(coords[hover][1] / 40) * 100}%` }}
            />
          </>
        )}
      </div>

      <div className="mt-4 border-t border-brand-border pt-3">
        <div className="flex items-center justify-between">
          <SectionLabel>Receivables ageing</SectionLabel>
          <span className="hidden text-[10px] text-brand-muted sm:block">Select a bucket to filter</span>
        </div>
        <div className="mt-2 flex h-6 gap-1">
          {buckets.map((item) => {
            const selected = bucketKey === item.key;
            return (
              <button
                key={item.key}
                type="button"
                aria-pressed={selected}
                aria-label={`${item.label}: ₹${item.amount}L`}
                onClick={() => {
                  setBucketKey(selected ? null : item.key);
                  setMessage(null);
                }}
                style={{ width: `${(item.amount / totalAging) * 100}%` }}
                className={cn(
                  "flex items-center justify-center overflow-hidden rounded-md text-[10px] font-bold text-white outline-none transition-all focus-visible:ring-2 focus-visible:ring-brand-purple/60",
                  item.tone,
                  bucketKey && !selected && "opacity-35",
                  selected && "ring-2 ring-brand-navy/40"
                )}
              >
                ₹{item.amount}L
              </button>
            );
          })}
        </div>
        <div className="mt-1 flex gap-1 text-[10px] text-brand-muted">
          {buckets.map((item) => (
            <span key={item.key} style={{ width: `${(item.amount / totalAging) * 100}%` }} className="truncate text-center">
              {item.label}
            </span>
          ))}
        </div>

        <ul className="mt-2 flex flex-col gap-1.5">
          {shown.map((invoice) => {
            const done = reminded.includes(invoice.id);
            const overdue = invoice.bucket !== "current";
            return (
              <li key={invoice.id} className="flex items-center gap-3 rounded-xl bg-brand-surface px-3 py-2">
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-semibold text-brand-text">{invoice.customer}</span>
                  <span className={cn("block text-[11px]", overdue ? "text-red-600" : "text-brand-muted")}>
                    {invoice.id} · {invoice.note}
                  </span>
                </span>
                <span className="text-[13px] font-bold text-brand-text">{invoice.amount}</span>
                <button
                  type="button"
                  disabled={done || !overdue}
                  onClick={() => {
                    setReminded((current) => [...current, invoice.id]);
                    setMessage(`Reminder sent to ${invoice.customer} for ${invoice.id}. We'll follow up in 3 days if it's unpaid.`);
                  }}
                  className={cn(
                    "flex w-[72px] items-center justify-center gap-1 rounded-lg px-2 py-1 text-[11px] font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand-purple/60",
                    done ? "bg-emerald-100 text-emerald-700" : overdue ? "bg-brand-purple text-white hover:bg-brand-purple-dark" : "bg-white text-brand-muted ring-1 ring-brand-border"
                  )}
                >
                  {done ? (
                    <>
                      <Check className="size-3" aria-hidden /> Sent
                    </>
                  ) : overdue ? (
                    "Remind"
                  ) : (
                    "On time"
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </PreviewFrame>
  );
}
