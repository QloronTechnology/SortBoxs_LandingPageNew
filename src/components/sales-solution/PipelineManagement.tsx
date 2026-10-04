"use client";

import { useState } from "react";
import { ArrowRight, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion, useTicker, rupees } from "./hooks";
import { Avatar, SampleTag, SectionHead, avatarTones } from "./shared";

const stages = [
  { label: "New Lead", dot: "bg-sky-500", chip: "bg-sky-100 text-sky-700" },
  { label: "Qualified", dot: "bg-violet-500", chip: "bg-violet-100 text-violet-700" },
  { label: "Proposal", dot: "bg-indigo-500", chip: "bg-indigo-100 text-indigo-700" },
  { label: "Negotiation", dot: "bg-amber-500", chip: "bg-amber-100 text-amber-700" },
  { label: "Won", dot: "bg-emerald-500", chip: "bg-emerald-100 text-emerald-700" },
];

const owners = ["Riya Sharma", "Arjun Mehta", "Neha Iyer", "Karan Shah", "Priya Singh"];

interface Deal {
  id: string;
  company: string;
  value: number;
  owner: number;
  close: string;
  stage: number;
}

const initialDeals: Deal[] = [
  { id: "zenith", company: "Zenith Pharma", value: 180000, owner: 1, close: "12 Dec", stage: 0 },
  { id: "greenfield", company: "Greenfield Realty", value: 80000, owner: 4, close: "20 Dec", stage: 0 },
  { id: "northwind", company: "Northwind Logistics", value: 340000, owner: 0, close: "05 Dec", stage: 1 },
  { id: "skyline", company: "Skyline Infra", value: 110000, owner: 1, close: "18 Dec", stage: 1 },
  { id: "acme", company: "Acme Technologies", value: 480000, owner: 0, close: "28 Nov", stage: 2 },
  { id: "helix", company: "Helix Motors", value: 240000, owner: 3, close: "02 Dec", stage: 2 },
  { id: "meridian", company: "Meridian Steel", value: 210000, owner: 2, close: "22 Nov", stage: 3 },
  { id: "bluepeak", company: "Bluepeak Foods", value: 310000, owner: 3, close: "14 Nov", stage: 4 },
];

/** The auto-moving deal walks Proposal → Negotiation → Won, then starts over. */
const featured = "acme";
const featuredPath = [2, 3, 4];

export function PipelineManagement() {
  const reduced = useReducedMotion();
  const [manual, setManual] = useState<Record<string, number>>({});
  const [tick] = useTicker(featuredPath.length, 2200, reduced, 1);

  const deals = initialDeals.map((deal) => {
    const moved = manual[deal.id];
    if (moved !== undefined) return { ...deal, stage: moved };
    if (deal.id === featured) return { ...deal, stage: reduced ? 2 : featuredPath[Math.min(tick, featuredPath.length - 1)] };
    return deal;
  });

  const open = deals.filter((deal) => deal.stage < 4).reduce((sum, deal) => sum + deal.value, 0);
  const won = deals.filter((deal) => deal.stage === 4).reduce((sum, deal) => sum + deal.value, 0);

  return (
    <section id="pipeline" className="scroll-mt-24 bg-white py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow="Pipeline Management" title="See Every Opportunity. Know What Happens Next." intro="One live board for every deal: who owns it, what it is worth, when it should close and which stage it is in." />

        <div className="mt-12 overflow-hidden rounded-3xl bg-brand-surface shadow-[0_30px_70px_-40px_rgba(23,22,92,0.5)] ring-1 ring-brand-border">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-border bg-white px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="flex gap-1.5" aria-hidden>
                <span className="size-2.5 rounded-full bg-rose-300" />
                <span className="size-2.5 rounded-full bg-amber-300" />
                <span className="size-2.5 rounded-full bg-emerald-300" />
              </span>
              <p className="text-sm font-bold text-brand-text">Sales Pipeline</p>
              <SampleTag />
            </div>
            <dl className="flex gap-6 text-right">
              <div>
                <dt className="text-[11px] font-semibold text-brand-muted">Open pipeline</dt>
                <dd className="text-base font-extrabold text-brand-text tabular-nums">{rupees(open)}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold text-brand-muted">Won this quarter</dt>
                <dd className="text-base font-extrabold text-emerald-600 tabular-nums">{rupees(won)}</dd>
              </div>
            </dl>
          </div>

          <div className="grid gap-3 p-3 sm:grid-cols-2 sm:p-4 lg:grid-cols-5">
            {stages.map((stage, stageIndex) => {
              const column = deals.filter((deal) => deal.stage === stageIndex);
              const total = column.reduce((sum, deal) => sum + deal.value, 0);
              return (
                <section key={stage.label} aria-label={stage.label} className={cn("rounded-2xl p-2.5 transition-colors", stageIndex === 4 ? "bg-emerald-50/80" : "bg-white/70")}>
                  <header className="flex items-center justify-between px-1.5 pt-1 pb-2.5">
                    <h3 className="flex items-center gap-2 text-[13px] font-bold text-brand-text">
                      <span className={cn("size-2 rounded-full", stage.dot)} aria-hidden />
                      {stage.label}
                    </h3>
                    <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-bold text-brand-muted ring-1 ring-brand-border">{column.length}</span>
                  </header>
                  <p className="px-1.5 pb-2.5 text-xs font-semibold text-brand-muted tabular-nums">{rupees(total)}</p>
                  <ul className="flex min-h-[64px] flex-col gap-2.5">
                    {column.map((deal) => {
                      const ownerName = owners[deal.owner];
                      return (
                        <li key={`${deal.id}-${deal.stage}`} className={cn("demo-rise rounded-xl bg-white p-3 ring-1 transition-shadow", deal.id === featured && !reduced ? "shadow-lg shadow-brand-purple/20 ring-2 ring-brand-purple" : "shadow-sm ring-brand-border")}>
                          <p className="truncate text-[13px] font-extrabold text-brand-text">{deal.company}</p>
                          <p className="mt-0.5 text-sm font-extrabold text-brand-purple tabular-nums">{rupees(deal.value)}</p>
                          <div className="mt-2 flex items-center gap-1.5">
                            <Avatar name={ownerName} tone={avatarTones[deal.owner % avatarTones.length]} className="size-5 text-[8px]" />
                            <span className="truncate text-[11px] text-brand-muted">{ownerName}</span>
                          </div>
                          <div className="mt-2 flex items-center justify-between gap-2">
                            <span className="flex items-center gap-1 text-[11px] text-brand-muted">
                              <CalendarDays className="size-3" aria-hidden /> {stageIndex === 4 ? "Closed" : "Close"} {deal.close}
                            </span>
                            <span className={cn("rounded-full px-1.5 py-0.5 text-[9px] font-bold", stage.chip)}>{stage.label}</span>
                          </div>
                          {stageIndex < 4 && (
                            <button
                              type="button"
                              onClick={() => setManual((current) => ({ ...current, [deal.id]: deal.stage + 1 }))}
                              className="mt-2.5 flex w-full items-center justify-center gap-1 rounded-lg bg-brand-surface py-1 text-[11px] font-semibold text-brand-muted outline-none hover:bg-brand-purple-light hover:text-brand-purple focus-visible:ring-2 focus-visible:ring-brand-purple/60"
                            >
                              Move to {stages[stageIndex + 1].label} <ArrowRight className="size-3" aria-hidden />
                            </button>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}
          </div>
          <p className="border-t border-brand-border bg-white px-5 py-3 text-xs text-brand-muted">Acme Technologies moves on its own. Use the Move buttons to advance any other deal and watch the totals update.</p>
        </div>
      </div>
    </section>
  );
}
