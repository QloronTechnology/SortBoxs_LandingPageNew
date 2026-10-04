"use client";

import { Check, Magnet } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion, useTicker } from "@/components/sales-solution/hooks";
import { Avatar, avatarTones } from "@/components/sales-solution/shared";
import { HeroShell, MockWindow } from "../shared";

const fields = [
  ["Name", "Priya Nair"],
  ["Work email", "priya@zenithpharma.com"],
  ["Company", "Zenith Pharma"],
] as const;

const existing = [
  { name: "Rahul Verma", company: "Skyline Infra", source: "Landing page", score: 64, tag: "Warm" },
  { name: "Ananya Bose", company: "Greenfield Realty", source: "Webinar", score: 52, tag: "Warm" },
];

function Capture() {
  const reduced = useReducedMotion();
  const [tick] = useTicker(5, 1200, reduced, 2);
  const step = reduced ? 5 : tick; // 0-3 fields filled, 4 submitted
  const submitted = step >= 4;

  return (
    <MockWindow title="Lead capture">
      <div className="grid gap-4 p-4 sm:grid-cols-[1fr_1fr] sm:p-5">
        <div className="rounded-2xl bg-brand-surface p-4 ring-1 ring-brand-border">
          <p className="text-sm font-extrabold text-brand-text">Request a demo</p>
          <p className="text-[11px] text-brand-muted">Website form</p>
          <div className="mt-3 space-y-2.5">
            {fields.map(([label, value], index) => (
              <div key={label}>
                <p className="text-[10px] font-semibold text-brand-muted">{label}</p>
                <div className={cn("mt-0.5 h-8 rounded-lg bg-white px-2.5 text-xs leading-8 font-semibold ring-1 transition-all duration-300", index < step ? "text-brand-text ring-brand-purple/40" : "text-transparent ring-brand-border")}>{value}</div>
              </div>
            ))}
          </div>
          <span className={cn("mt-3 flex h-9 items-center justify-center gap-1.5 rounded-lg text-xs font-bold transition-colors duration-300", submitted ? "bg-emerald-500 text-white" : "bg-brand-purple text-white")}>
            {submitted ? <><Check className="size-3.5" strokeWidth={3} aria-hidden /> Submitted</> : "Request a demo"}
          </span>
        </div>

        <div>
          <p className="text-[11px] font-bold tracking-wide text-brand-muted uppercase">New leads</p>
          <ul className="mt-2 space-y-2">
            {submitted && (
              <li key="new" className="demo-rise flex items-center gap-2.5 rounded-xl bg-white p-2.5 shadow-md ring-2 ring-brand-purple">
                <Avatar name="Priya Nair" tone={avatarTones[0]} className="size-8 text-[10px]" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-xs font-extrabold text-brand-text">Priya Nair</span>
                  <span className="block truncate text-[10px] text-brand-muted">Zenith Pharma · Website form</span>
                </span>
                <span className="text-right">
                  <span className="block text-sm font-extrabold text-brand-text tabular-nums">78</span>
                  <span className="rounded-full bg-rose-100 px-1.5 py-0.5 text-[9px] font-bold text-rose-700">Hot</span>
                </span>
              </li>
            )}
            {existing.map((lead, index) => (
              <li key={lead.name} className="flex items-center gap-2.5 rounded-xl bg-white p-2.5 ring-1 ring-brand-border">
                <Avatar name={lead.name} tone={avatarTones[index + 1]} className="size-8 text-[10px]" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-xs font-bold text-brand-text">{lead.name}</span>
                  <span className="block truncate text-[10px] text-brand-muted">{lead.company} · {lead.source}</span>
                </span>
                <span className="text-right">
                  <span className="block text-sm font-extrabold text-brand-text tabular-nums">{lead.score}</span>
                  <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold text-amber-700">{lead.tag}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className={cn("mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-[11px] font-semibold text-emerald-800 transition-opacity duration-500", submitted ? "opacity-100" : "opacity-0")}>Score 78: sent to sales as a hot lead.</p>
        </div>
      </div>
    </MockWindow>
  );
}

export function LeadGenHero() {
  return (
    <HeroShell
      current="Lead Generation"
      icon={Magnet}
      iconTone="bg-rose-100 text-rose-700"
      title="Capture More Leads."
      highlight="Send Sales the Best Ones."
      description="Collect leads from forms, landing pages, events and social, score them on what they do, and hand the ready ones to sales with the full story."
      visual={<Capture />}
    />
  );
}
