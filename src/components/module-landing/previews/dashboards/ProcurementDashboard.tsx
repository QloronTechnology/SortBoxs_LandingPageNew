"use client";

import { useState } from "react";
import { Check, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { PreviewFrame } from "../../PreviewFrame";
import { SectionLabel } from "./parts";

const steps = ["Requested", "Manager", "Finance", "PO issued"];
const vendors = [
  { name: "Dell India", price: 14.8, days: 9, rating: 4.5 },
  { name: "HP Business", price: 13.6, days: 12, rating: 4.2 },
  { name: "Lenovo", price: 14.1, days: 7, rating: 4.7 },
];
const spend = [
  { label: "IT hardware", value: "₹12.4L", width: "82%", bar: "from-violet-400 to-brand-purple" },
  { label: "Services", value: "₹8.7L", width: "58%", bar: "from-sky-400 to-sky-600" },
  { label: "Office", value: "₹4.1L", width: "34%", bar: "from-emerald-400 to-emerald-600" },
];
const highest = Math.max(...vendors.map((vendor) => vendor.price));
const cheapest = Math.min(...vendors.map((vendor) => vendor.price));
const fastest = Math.min(...vendors.map((vendor) => vendor.days));

export function ProcurementDashboard() {
  const [step, setStep] = useState(1);
  const [rejected, setRejected] = useState(false);
  const [vendorIndex, setVendorIndex] = useState(0);
  const vendor = vendors[vendorIndex];
  const saving = Math.round(((highest - vendor.price) / highest) * 100);

  const insight = rejected
    ? "Request rejected. The requester has been notified and can resubmit with changes."
    : step >= 3
      ? `PO-4413 issued to ${vendor.name} for ₹${vendor.price}L. Delivery expected in ${vendor.days} days.`
      : saving > 0
        ? `${vendor.name} is ${saving}% below the highest quote. ${vendor.price === cheapest ? "Best price of the three." : ""}`.trim()
        : `${vendor.name} is the highest quote. Ask for a revised price before approving.`;

  return (
    <PreviewFrame title="Approval Desk" period="PR-218 · Laptops" insight={insight} badge="7 awaiting approval">
      <div className="mt-4 rounded-xl bg-brand-surface p-3">
        <ol className="flex items-center">
          {steps.map((label, index) => {
            const done = index < step || (index === step && step === steps.length - 1 && !rejected);
            const current = index === step && !done;
            return (
              <li key={label} className="flex flex-1 items-center last:flex-none">
                <span className="flex flex-col items-center gap-1">
                  <span
                    className={cn(
                      "flex size-7 items-center justify-center rounded-full text-[11px] font-bold transition-colors",
                      done ? "bg-emerald-500 text-white" : current ? (rejected ? "bg-red-500 text-white" : "bg-brand-purple text-white ring-4 ring-brand-purple/20") : "bg-white text-brand-muted ring-1 ring-brand-border"
                    )}
                  >
                    {done ? <Check className="size-3.5" aria-hidden /> : index + 1}
                  </span>
                  <span className="text-[10px] font-semibold whitespace-nowrap text-brand-text">{label}</span>
                </span>
                {index < steps.length - 1 && <span className={cn("mx-1 mb-4 h-0.5 flex-1 rounded-full", index < step ? "bg-emerald-400" : "bg-brand-border")} />}
              </li>
            );
          })}
        </ol>
        <div className="mt-3 flex items-center justify-between gap-2">
          <p className="text-[11px] text-brand-muted">
            <span className="text-sm font-extrabold text-brand-text">₹{vendor.price}L</span> · 20 units
          </p>
          <div className="flex gap-1.5">
            <button
              type="button"
              disabled={rejected || step >= steps.length - 1}
              onClick={() => setStep((current) => current + 1)}
              className="rounded-lg bg-brand-purple px-3 py-1 text-[11px] font-semibold text-white outline-none hover:bg-brand-purple-dark focus-visible:ring-2 focus-visible:ring-brand-purple/60 disabled:opacity-40"
            >
              Approve
            </button>
            <button
              type="button"
              disabled={rejected || step >= steps.length - 1}
              onClick={() => setRejected(true)}
              className="rounded-lg bg-white px-3 py-1 text-[11px] font-semibold text-red-600 ring-1 ring-red-200 outline-none hover:bg-red-50 focus-visible:ring-2 focus-visible:ring-red-300 disabled:opacity-40"
            >
              Reject
            </button>
            <button
              type="button"
              onClick={() => {
                setStep(1);
                setRejected(false);
              }}
              className="rounded-lg px-2 py-1 text-[11px] font-semibold text-brand-muted outline-none hover:text-brand-text focus-visible:ring-2 focus-visible:ring-brand-purple/60"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <div className="flex items-center justify-between">
          <SectionLabel>Compare quotes</SectionLabel>
          <span className="hidden text-[10px] text-brand-muted sm:block">Pick a vendor</span>
        </div>
        <ul role="radiogroup" aria-label="Vendor quotes" className="mt-2 flex flex-col gap-1.5">
          {vendors.map((item, index) => {
            const selected = index === vendorIndex;
            return (
              <li key={item.name}>
                <button
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setVendorIndex(index)}
                  className={cn(
                    "grid w-full grid-cols-[1fr_auto_auto] items-center gap-3 rounded-xl px-3 py-2 text-left outline-none ring-1 transition-all focus-visible:ring-2 focus-visible:ring-brand-purple/60",
                    selected ? "bg-brand-purple-light ring-brand-purple/40" : "bg-brand-surface ring-transparent hover:ring-brand-purple/30"
                  )}
                >
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-1.5 text-[13px] font-semibold text-brand-text">
                      {item.name}
                      {item.price === cheapest && <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700">Best price</span>}
                      {item.days === fastest && <span className="rounded-full bg-sky-100 px-1.5 py-0.5 text-[10px] font-bold text-sky-700">Fastest</span>}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-brand-muted">
                      <Star className="size-3 fill-amber-400 text-amber-400" aria-hidden /> {item.rating} · {item.days} days
                    </span>
                  </span>
                  <span className="text-[13px] font-bold text-brand-text">₹{item.price}L</span>
                  <span className={cn("flex size-4 items-center justify-center rounded-full ring-2", selected ? "bg-brand-purple ring-brand-purple" : "bg-white ring-brand-border")}>
                    {selected && <span className="size-1.5 rounded-full bg-white" />}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-3 border-t border-brand-border pt-3">
        <SectionLabel>Spend by category</SectionLabel>
        <ul className="mt-2 flex flex-col gap-1.5">
          {spend.map((item) => (
            <li key={item.label} className="grid grid-cols-[64px_1fr_44px] items-center gap-2 text-[11px]">
              <span className="font-medium text-brand-muted">{item.label}</span>
              <span className="h-2 rounded-full bg-brand-surface">
                <span className={cn("demo-grow-x block h-full rounded-full bg-gradient-to-r", item.bar)} style={{ width: item.width }} />
              </span>
              <span className="text-right font-bold text-brand-text">{item.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </PreviewFrame>
  );
}
