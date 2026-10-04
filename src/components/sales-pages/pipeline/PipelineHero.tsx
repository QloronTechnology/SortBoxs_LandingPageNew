"use client";

import { GitBranch } from "lucide-react";
import { cn } from "@/lib/utils";
import { rupees, useReducedMotion, useTicker } from "@/components/sales-solution/hooks";
import { Avatar, SampleTag, avatarTones } from "@/components/sales-solution/shared";
import { Crumbs, HeroCopy } from "../parts";

export const stageDefs = [
  { label: "New Lead", dot: "bg-sky-500", chip: "bg-sky-100 text-sky-700", probability: 10 },
  { label: "Qualified", dot: "bg-violet-500", chip: "bg-violet-100 text-violet-700", probability: 30 },
  { label: "Proposal", dot: "bg-indigo-500", chip: "bg-indigo-100 text-indigo-700", probability: 60 },
  { label: "Negotiation", dot: "bg-amber-500", chip: "bg-amber-100 text-amber-700", probability: 80 },
  { label: "Won", dot: "bg-emerald-500", chip: "bg-emerald-100 text-emerald-700", probability: 100 },
];

export const reps = ["Riya Sharma", "Arjun Mehta", "Neha Iyer", "Karan Shah", "Priya Singh"];

const base = [
  { company: "Zenith Pharma", value: 180000, owner: 1, close: "12 Dec", stage: 0 },
  { company: "Northwind Logistics", value: 340000, owner: 0, close: "05 Dec", stage: 1 },
  { company: "Helix Motors", value: 240000, owner: 3, close: "02 Dec", stage: 2 },
  { company: "Meridian Steel", value: 210000, owner: 2, close: "22 Nov", stage: 3 },
  { company: "Bluepeak Foods", value: 310000, owner: 3, close: "14 Nov", stage: 4 },
  { company: "Greenfield Realty", value: 80000, owner: 4, close: "20 Dec", stage: 0 },
  { company: "Skyline Infra", value: 110000, owner: 1, close: "18 Dec", stage: 1 },
  { company: "Vertex Labs", value: 280000, owner: 0, close: "10 Nov", stage: 4 },
];
const moving = { company: "Acme Technologies", value: 480000, owner: 0, close: "28 Nov" };

/** A compact board for the hero: one deal is carried from New Lead to Won while the rest stay put. */
function HeroBoard() {
  const reduced = useReducedMotion();
  const [tick] = useTicker(stageDefs.length, 1800, reduced, 1);
  const stage = reduced ? 2 : Math.min(tick, stageDefs.length - 1);
  const deals = [...base, { ...moving, stage }];

  return (
    <div className="relative mx-auto w-full max-w-[620px] lg:justify-self-end">
      <span aria-hidden className="absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(ellipse_at_center,#e2dcfb_0%,rgba(226,220,251,0)_70%)]" />
      <div className="relative overflow-hidden rounded-3xl bg-white shadow-[0_30px_70px_-34px_rgba(23,22,92,0.5)] ring-1 ring-brand-border">
        <div className="flex items-center justify-between gap-3 border-b border-brand-border bg-brand-surface px-4 py-3">
          <div className="flex items-center gap-2.5">
            <span className="flex gap-1" aria-hidden>
              <span className="size-2.5 rounded-full bg-rose-300" />
              <span className="size-2.5 rounded-full bg-amber-300" />
              <span className="size-2.5 rounded-full bg-emerald-300" />
            </span>
            <p className="text-sm font-bold text-brand-text">Sales Pipeline</p>
          </div>
          <SampleTag />
        </div>

        <div className="grid grid-cols-2 gap-2 bg-brand-surface/60 p-3 sm:grid-cols-5 sm:p-4">
          {stageDefs.map((def, index) => {
            const column = deals.filter((deal) => deal.stage === index);
            const total = column.reduce((sum, deal) => sum + deal.value, 0);
            return (
              <section key={def.label} aria-label={def.label} className={cn("rounded-xl p-2", index === 4 ? "col-span-2 bg-emerald-50 sm:col-span-1" : "bg-white/80")}>
                <h3 className="flex items-center gap-1.5 text-[11px] font-bold text-brand-text">
                  <span className={cn("size-1.5 shrink-0 rounded-full", def.dot)} aria-hidden /> {def.label}
                </h3>
                <p className="pt-0.5 pb-2 text-[10px] font-semibold text-brand-muted tabular-nums">
                  {column.length} · {rupees(total)}
                </p>
                <ul className="flex min-h-[200px] flex-col gap-1.5">
                  {column.map((deal) => {
                    const isMoving = deal.company === moving.company;
                    return (
                      <li key={`${deal.company}-${deal.stage}`} className={cn("demo-rise rounded-lg bg-white p-2 ring-1", isMoving && !reduced ? "-rotate-1 shadow-lg shadow-brand-purple/25 ring-2 ring-brand-purple" : "shadow-sm ring-brand-border")}>
                        <p className="text-[11px] leading-tight font-extrabold break-words text-brand-text">{deal.company}</p>
                        <p className="mt-0.5 text-[11px] font-extrabold text-brand-purple tabular-nums">{rupees(deal.value)}</p>
                        <p className="mt-1 flex items-center gap-1 text-[10px] text-brand-muted">
                          <Avatar name={reps[deal.owner]} tone={avatarTones[deal.owner % avatarTones.length]} className="size-4 text-[7px]" />
                          <span className="truncate">{deal.close}</span>
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
        <p className="border-t border-brand-border px-4 py-2.5 text-xs text-brand-muted">
          Acme Technologies is moving to <b className="text-brand-purple">{stageDefs[stage].label}</b>
        </p>
      </div>
    </div>
  );
}

export function PipelineHero() {
  return (
    <section className="overflow-hidden bg-[linear-gradient(180deg,#f4f1ff_0%,#faf9ff_100%)]">
      <div className="container-page grid items-center gap-12 pt-10 pb-24 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12 lg:pt-14 lg:pb-24">
        <div>
          <Crumbs current="Pipeline Management" />
          <HeroCopy
            icon={GitBranch}
            iconTone="bg-sky-100 text-sky-700"
            eyebrow="Pipeline Management"
            title="See Every Deal."
            highlight="Know What Happens Next."
            description="Manage leads, opportunities and deals through a clear, visual sales pipeline."
          />
        </div>
        <HeroBoard />
      </div>
    </section>
  );
}
