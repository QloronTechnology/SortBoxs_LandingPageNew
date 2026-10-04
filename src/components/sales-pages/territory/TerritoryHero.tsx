"use client";

import { Building2, MapPinned, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion, useTicker } from "@/components/sales-solution/hooks";
import { Avatar, SampleTag, avatarTones } from "@/components/sales-solution/shared";
import { Crumbs, HeroCopy } from "../parts";

const territories = [
  { name: "Mumbai Metro", rep: "Riya Sharma", accounts: ["Acme Technologies", "Helix Motors", "Coral Hospitality"], more: 52 },
  { name: "Gujarat", rep: "Sana Khan", accounts: ["Bluepeak Foods", "Summit Constructions", "Orbit Retail"], more: 33 },
];

/** Region → Territory → Sales representative → Accounts, revealed one level at a time. */
function HierarchyVisual() {
  const reduced = useReducedMotion();
  const [tick] = useTicker(4, 1100, reduced, 3);
  const level = reduced ? 4 : tick; // levels shown: 0 none … 4 all

  const show = (needed: number) => (level >= needed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2");
  const line = (needed: number) => (level >= needed ? "bg-brand-purple/40" : "bg-transparent");

  return (
    <div className="relative mx-auto w-full max-w-[600px] lg:justify-self-end">
      <span aria-hidden className="absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(ellipse_at_center,#e2dcfb_0%,rgba(226,220,251,0)_70%)]" />
      <div className="relative rounded-3xl bg-white p-5 shadow-[0_30px_70px_-34px_rgba(23,22,92,0.5)] ring-1 ring-brand-border sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-xs font-bold tracking-wide text-brand-text uppercase">Territory structure</p>
          <SampleTag />
        </div>

        <div className={cn("mx-auto flex w-fit items-center gap-3 rounded-2xl bg-brand-navy px-5 py-3 text-white transition-all duration-500", show(1))}>
          <span className="flex size-9 items-center justify-center rounded-xl bg-white/15"><MapPinned className="size-5" aria-hidden /></span>
          <span>
            <span className="block text-[10px] font-bold tracking-wide text-violet-300 uppercase">Region</span>
            <span className="block text-sm font-extrabold">West</span>
          </span>
        </div>

        <div aria-hidden className={cn("mx-auto h-5 w-0.5 transition-colors duration-500", line(2))} />
        <div className="relative grid gap-4 sm:grid-cols-2">
          <span aria-hidden className={cn("absolute top-0 right-1/4 left-1/4 hidden h-0.5 transition-colors duration-500 sm:block", line(2))} />
          {territories.map((territory, index) => (
            <div key={territory.name} className="relative flex flex-col items-center">
              <span aria-hidden className={cn("hidden h-4 w-0.5 transition-colors duration-500 sm:block", line(2))} />
              <div className={cn("w-full rounded-2xl bg-brand-purple-light p-3.5 ring-1 ring-brand-purple/20 transition-all duration-500", show(2))}>
                <p className="text-[10px] font-bold tracking-wide text-brand-purple uppercase">Territory</p>
                <p className="flex items-center gap-1.5 text-sm font-extrabold text-brand-text"><Building2 className="size-4 text-brand-purple" aria-hidden /> {territory.name}</p>
              </div>
              <span aria-hidden className={cn("h-3.5 w-0.5 transition-colors duration-500", line(3))} />
              <div className={cn("flex w-full items-center gap-2.5 rounded-2xl bg-white p-3 ring-1 ring-brand-border transition-all duration-500", show(3))}>
                <Avatar name={territory.rep} tone={avatarTones[index]} className="size-8 text-[10px]" />
                <span>
                  <span className="block text-[10px] font-bold tracking-wide text-brand-muted uppercase">Sales representative</span>
                  <span className="flex items-center gap-1 text-[13px] font-bold text-brand-text"><UserRound className="size-3 text-brand-muted" aria-hidden /> {territory.rep}</span>
                </span>
              </div>
              <span aria-hidden className={cn("h-3.5 w-0.5 transition-colors duration-500", line(4))} />
              <ul className={cn("w-full space-y-1.5 transition-all duration-500", show(4))} aria-label={`${territory.name} accounts`}>
                {territory.accounts.map((account) => (
                  <li key={account} className="rounded-lg bg-brand-surface px-3 py-1.5 text-xs font-semibold text-brand-text ring-1 ring-brand-border">{account}</li>
                ))}
                <li className="px-3 text-[11px] font-semibold text-brand-muted">+{territory.more} more accounts</li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TerritoryHero() {
  return (
    <section className="overflow-hidden bg-[linear-gradient(180deg,#f4f1ff_0%,#faf9ff_100%)]">
      <div className="container-page grid items-center gap-12 pt-8 pb-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12 lg:pt-10 lg:pb-16">
        <div>
          <Crumbs current="Territory Management" />
          <HeroCopy
            icon={MapPinned}
            iconTone="bg-rose-100 text-rose-700"
            eyebrow="Territory Management"
            title="Organize Territories."
            highlight="Empower Your Sales Team."
            description="Manage sales territories, assign ownership and give teams clear responsibility across regions, markets and accounts."
          />
        </div>
        <HierarchyVisual />
      </div>
    </section>
  );
}
