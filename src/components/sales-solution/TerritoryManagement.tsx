"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Avatar, SampleTag, SectionHead, avatarTones } from "./shared";

interface Territory {
  key: string;
  name: string;
  rep: string;
  reps: string[];
  accounts: number;
  opportunities: number;
  pipeline: string;
  attainment: number;
  top: [string, string][];
  span: string;
}

/** Sample territories. Sized and shaded by performance, not by geography. */
const territories: Territory[] = [
  { key: "north", name: "North", rep: "Arjun Mehta", reps: ["Arjun Mehta", "Dev Malhotra"], accounts: 48, opportunities: 12, pipeline: "₹14.2L", attainment: 108, top: [["Skyline Infra", "₹3.4L"], ["Orbit Retail", "₹2.0L"], ["Lotus Clinics", "₹1.1L"]], span: "col-span-1" },
  { key: "west", name: "West", rep: "Riya Sharma", reps: ["Riya Sharma", "Sana Khan"], accounts: 55, opportunities: 15, pipeline: "₹21.6L", attainment: 112, top: [["Acme Technologies", "₹4.8L"], ["Northwind Logistics", "₹3.4L"], ["Helix Motors", "₹2.4L"]], span: "col-span-2" },
  { key: "south", name: "South", rep: "Neha Iyer", reps: ["Neha Iyer", "Vikram Rao"], accounts: 62, opportunities: 17, pipeline: "₹17.9L", attainment: 94, top: [["Meridian Steel", "₹2.1L"], ["Coral Hospitality", "₹1.3L"], ["Pioneer Edu", "₹1.7L"]], span: "col-span-1" },
  { key: "east", name: "East", rep: "Karan Shah", reps: ["Karan Shah"], accounts: 31, opportunities: 8, pipeline: "₹8.4L", attainment: 71, top: [["Bluepeak Foods", "₹3.1L"], ["Greenfield Realty", "₹0.8L"], ["Harbor Exports", "₹2.8L"]], span: "col-span-1" },
  { key: "central", name: "Central", rep: "Priya Singh", reps: ["Priya Singh", "Aman Verma"], accounts: 27, opportunities: 6, pipeline: "₹6.7L", attainment: 83, top: [["Zenith Pharma", "₹1.8L"], ["Vertex Labs", "₹2.8L"], ["Summit Constructions", "₹1.5L"]], span: "col-span-1" },
  { key: "enterprise", name: "Enterprise accounts", rep: "Dev Malhotra", reps: ["Dev Malhotra", "Isha Kapoor"], accounts: 18, opportunities: 9, pipeline: "₹19.3L", attainment: 98, top: [["Global Steel Group", "₹8.0L"], ["Union Retail", "₹6.5L"], ["Apex Healthcare", "₹4.8L"]], span: "col-span-3" },
];

function tone(attainment: number) {
  if (attainment >= 100) return { tile: "bg-emerald-50 ring-emerald-200 hover:ring-emerald-400", dot: "bg-emerald-500", bar: "bg-emerald-500", text: "text-emerald-700" };
  if (attainment >= 85) return { tile: "bg-violet-50 ring-violet-200 hover:ring-violet-400", dot: "bg-brand-purple", bar: "bg-brand-purple", text: "text-brand-purple" };
  return { tile: "bg-amber-50 ring-amber-200 hover:ring-amber-400", dot: "bg-amber-500", bar: "bg-amber-500", text: "text-amber-700" };
}

export function TerritoryManagement() {
  const [selected, setSelected] = useState("west");
  const current = territories.find((item) => item.key === selected) ?? territories[1];
  const currentTone = tone(current.attainment);

  return (
    <section id="territories" className="scroll-mt-24 bg-white py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow="Territory Management" title="Organize Your Sales Territories" intro="Give every account an owner and every rep a clear patch. See at a glance which territories are ahead and which need help." />

        <div className="mt-12 grid items-start gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div className="rounded-3xl bg-brand-surface p-4 ring-1 ring-brand-border sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-sm font-bold text-brand-text">Territory overview</p>
              <SampleTag />
            </div>
            <div role="group" aria-label="Territories" className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {territories.map((territory) => {
                const style = tone(territory.attainment);
                const isSelected = territory.key === selected;
                const dots = Math.min(Math.ceil(territory.accounts / 2), 30);
                return (
                  <button
                    key={territory.key}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelected(territory.key)}
                    className={cn(
                      "rounded-2xl p-3.5 text-left outline-none ring-1 transition-all focus-visible:ring-2 focus-visible:ring-brand-purple",
                      style.tile,
                      territory.span === "col-span-2" ? "col-span-2 sm:col-span-2" : territory.span === "col-span-3" ? "col-span-2 sm:col-span-3" : "col-span-1",
                      isSelected && "scale-[1.02] shadow-lg ring-2 ring-brand-purple hover:ring-brand-purple"
                    )}
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span className="text-sm font-extrabold text-brand-text">{territory.name}</span>
                      <span className={cn("text-sm font-extrabold tabular-nums", style.text)}>{territory.attainment}%</span>
                    </span>
                    <span className="mt-2 flex items-center gap-2">
                      <Avatar name={territory.rep} tone={avatarTones[territories.indexOf(territory) % avatarTones.length]} className="size-6 text-[9px]" />
                      <span className="truncate text-xs text-brand-muted">{territory.rep}</span>
                    </span>
                    <span className="mt-3 flex flex-wrap gap-[3px]" aria-hidden>
                      {Array.from({ length: dots }, (_, index) => (
                        <span key={index} className={cn("size-2 rounded-[3px]", index < Math.round(dots * 0.4) ? style.dot : "bg-black/10")} />
                      ))}
                    </span>
                    <span className="mt-3 flex gap-4 text-[11px] text-brand-muted">
                      <span>
                        <b className="text-brand-text">{territory.accounts}</b> accounts
                      </span>
                      <span>
                        <b className="text-brand-text">{territory.opportunities}</b> deals
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[11px] text-brand-muted">
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-sm bg-emerald-500" aria-hidden /> On or above target</span>
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-sm bg-brand-purple" aria-hidden /> Close to target</span>
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-sm bg-amber-500" aria-hidden /> Needs attention</span>
            </p>
          </div>

          <div key={current.key} className="demo-rise rounded-3xl bg-brand-navy p-6 text-white shadow-[0_30px_60px_-30px_rgba(23,22,92,0.7)]">
            <p className="text-xs font-bold tracking-wide text-violet-300 uppercase">Territory</p>
            <h3 className="mt-1 text-2xl font-extrabold">{current.name}</h3>

            <div className="mt-5">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-semibold text-white/60">Territory performance</span>
                <span className="text-lg font-extrabold tabular-nums">{current.attainment}% of target</span>
              </div>
              <span className="mt-2 block h-2.5 rounded-full bg-white/10">
                <span className={cn("demo-grow-x block h-full rounded-full", currentTone.bar)} style={{ width: `${Math.min(current.attainment, 120) / 1.2}%` }} />
              </span>
            </div>

            <dl className="mt-5 grid grid-cols-3 gap-3 text-center">
              {[["Accounts", current.accounts], ["Opportunities", current.opportunities], ["Pipeline", current.pipeline]].map(([label, value]) => (
                <div key={label} className="rounded-xl bg-white/5 px-2 py-3 ring-1 ring-white/10">
                  <dt className="text-[11px] text-white/60">{label}</dt>
                  <dd className="mt-0.5 text-lg font-extrabold tabular-nums">{value}</dd>
                </div>
              ))}
            </dl>

            <h4 className="mt-6 text-xs font-bold tracking-wide text-white/60 uppercase">Sales representatives</h4>
            <ul className="mt-2 flex flex-wrap gap-2">
              {current.reps.map((rep, index) => (
                <li key={rep} className="flex items-center gap-2 rounded-full bg-white/10 py-1 pr-3 pl-1 text-xs">
                  <Avatar name={rep} tone={avatarTones[(index + 2) % avatarTones.length]} className="size-6 text-[9px]" /> {rep}
                </li>
              ))}
            </ul>

            <h4 className="mt-6 text-xs font-bold tracking-wide text-white/60 uppercase">Top open opportunities</h4>
            <ul className="mt-2 divide-y divide-white/10">
              {current.top.map(([account, value]) => (
                <li key={account} className="flex items-center justify-between py-2.5 text-sm">
                  <span>{account}</span>
                  <span className="font-bold tabular-nums">{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
