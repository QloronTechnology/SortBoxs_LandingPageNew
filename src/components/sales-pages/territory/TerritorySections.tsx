"use client";

import { useState } from "react";
import { ArrowRight, Building2, Eye, FolderTree, Gauge, IndianRupee, Layers, MapPinned, PieChart, Target, UserCheck, UserRound, Users, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { SampleTag, SectionHead } from "@/components/sales-solution/shared";
import { GRID_COLS, GRID_SIZE, cleanOwner, messyOwner, territoryReps } from "./territoryData";

/* ---------------------------------------------------------------- Overlap and gaps vs clear ownership */

function AccountGrid({ owners }: { owners: number[] }) {
  return (
    <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))` }} role="img" aria-label="Accounts coloured by owner">
      {owners.map((owner, index) => (
        <span
          key={index}
          className={cn(
            "aspect-square rounded-md transition-colors duration-500",
            owner >= 0 ? territoryReps[owner].cell : owner === -1 ? "bg-slate-200" : "bg-rose-400 [background-image:repeating-linear-gradient(45deg,rgba(255,255,255,0.55)_0_3px,transparent_3px_6px)]"
          )}
        />
      ))}
    </div>
  );
}

export function OwnershipBeforeAfter() {
  const [after, setAfter] = useState(true);
  const owners = Array.from({ length: GRID_SIZE }, (_, index) => (after ? cleanOwner(index) : messyOwner(index)));
  const unowned = owners.filter((owner) => owner === -1).length;
  const overlap = owners.filter((owner) => owner === -2).length;

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <SectionHead eyebrow="The challenge and the fix" title="Overlap and gaps, or clear ownership?" intro="Without territories, two reps chase the same account while others get no attention. With them, every account has one owner and every rep knows their patch." />
          <ul className="mt-8 space-y-4">
            {[
              ["Accounts nobody owns", "They slip through, and nobody notices until a customer leaves."],
              ["Accounts two reps chase", "Customers get duplicate outreach, and reps argue about credit."],
              ["Territories drawn on a slide", "The real assignment lives in someone's spreadsheet."],
            ].map(([title, body]) => (
              <li key={title} className="flex gap-3.5">
                <span className="mt-1 size-2.5 shrink-0 rounded-full bg-brand-purple" aria-hidden />
                <div>
                  <h3 className="text-[15px] font-bold text-brand-text">{title}</h3>
                  <p className="text-sm text-brand-muted">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl bg-brand-surface p-5 ring-1 ring-brand-border sm:p-7">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div role="group" aria-label="View" className="inline-flex rounded-full bg-white p-0.5 ring-1 ring-brand-border">
              {[false, true].map((value) => (
                <button key={String(value)} type="button" aria-pressed={after === value} onClick={() => setAfter(value)} className={cn("rounded-full px-4 py-1.5 text-xs font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand-purple/60", after === value ? "bg-brand-purple text-white shadow-sm" : "text-brand-muted hover:text-brand-text")}>
                  {value ? "With territories" : "Without territories"}
                </button>
              ))}
            </div>
            <SampleTag />
          </div>
          <AccountGrid owners={owners} />
          <dl className="mt-5 grid grid-cols-2 gap-3 text-center">
            <div className="rounded-2xl bg-white p-3 ring-1 ring-brand-border"><dt className="text-xs text-brand-muted">Unowned accounts</dt><dd className="text-2xl font-extrabold text-brand-text tabular-nums">{unowned}</dd></div>
            <div className="rounded-2xl bg-white p-3 ring-1 ring-brand-border"><dt className="text-xs text-brand-muted">Claimed by two reps</dt><dd className="text-2xl font-extrabold text-brand-text tabular-nums">{overlap}</dd></div>
          </dl>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-brand-muted">
            {territoryReps.map((rep) => (
              <li key={rep.name} className="flex items-center gap-1.5"><span className={cn("size-2.5 rounded-sm", rep.cell)} aria-hidden /> {rep.territory}</li>
            ))}
            <li className="flex items-center gap-1.5"><span className="size-2.5 rounded-sm bg-slate-200" aria-hidden /> No owner</li>
            <li className="flex items-center gap-1.5"><span className="size-2.5 rounded-sm bg-rose-400" aria-hidden /> Overlap</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Territory → Performance */

const performance = [
  { name: "West", rep: "Riya Sharma", accounts: 55, opportunities: 15, pipeline: "₹21.6L", revenue: "₹14.2L", attainment: 112 },
  { name: "North", rep: "Arjun Mehta", accounts: 48, opportunities: 12, pipeline: "₹14.2L", revenue: "₹9.8L", attainment: 108 },
  { name: "South", rep: "Neha Iyer", accounts: 62, opportunities: 17, pipeline: "₹17.9L", revenue: "₹10.4L", attainment: 94 },
  { name: "East", rep: "Karan Shah", accounts: 31, opportunities: 8, pipeline: "₹8.4L", revenue: "₹4.6L", attainment: 71 },
];

export function TerritoryToPerformance() {
  const [selected, setSelected] = useState(0);
  const t = performance[selected];
  const chain: { icon: LucideIcon; label: string; value: string; sub: string }[] = [
    { icon: MapPinned, label: "Territory", value: t.name, sub: `${t.attainment}% of target` },
    { icon: UserRound, label: "Representative", value: t.rep, sub: "Territory owner" },
    { icon: Building2, label: "Accounts", value: `${t.accounts}`, sub: "Assigned to this territory" },
    { icon: Target, label: "Opportunities", value: `${t.opportunities}`, sub: `${t.pipeline} in pipeline` },
    { icon: IndianRupee, label: "Revenue", value: t.revenue, sub: "Closed this quarter" },
  ];

  return (
    <section className="bg-brand-surface py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow="Territory to results" title="From Territory to Sales Performance" intro="Choose a territory and follow the line from its owner down to the revenue it brings in." />

        <div role="group" aria-label="Territory" className="mt-10 flex flex-wrap justify-center gap-2">
          {performance.map((item, index) => (
            <button key={item.name} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)} className={cn("rounded-full px-5 py-2 text-sm font-semibold outline-none ring-1 transition-colors focus-visible:ring-2 focus-visible:ring-brand-purple", selected === index ? "bg-brand-purple text-white ring-brand-purple" : "bg-white text-brand-muted ring-brand-border hover:text-brand-text")}>
              {item.name}
            </button>
          ))}
        </div>

        <ol key={selected} aria-label="Territory to revenue" className="mx-auto mt-10 grid max-w-6xl gap-3 lg:grid-cols-5 lg:gap-0">
          {chain.map(({ icon: Icon, label, value, sub }, index) => (
            <li key={label} className="demo-rise relative" style={{ "--d": `${index * 90}ms` } as React.CSSProperties}>
              <div className="h-full rounded-2xl bg-white p-5 text-center ring-1 ring-brand-border lg:mx-2">
                <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-brand-purple text-white shadow-lg shadow-brand-purple/25">
                  <Icon className="size-6" aria-hidden />
                </span>
                <p className="mt-3 text-[11px] font-bold tracking-wide text-brand-muted uppercase">{label}</p>
                <p className="text-xl font-extrabold text-brand-text">{value}</p>
                <p className="text-xs text-brand-muted">{sub}</p>
              </div>
              {index < chain.length - 1 && <ArrowRight aria-hidden className="absolute -right-2 top-1/2 z-10 hidden size-4 -translate-y-1/2 rounded-full bg-brand-purple p-0.5 text-white lg:block" />}
            </li>
          ))}
        </ol>
        <p className="mt-5 text-center"><SampleTag /></p>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Interactive account assignment + capabilities */

const capabilities: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: MapPinned, title: "Territory assignment", body: "Define each territory and who covers it." },
  { icon: FolderTree, title: "Region management", body: "Group territories into regions." },
  { icon: UserCheck, title: "Sales ownership", body: "Every account and deal has one owner." },
  { icon: Building2, title: "Account assignment", body: "Assign accounts one by one or in bulk." },
  { icon: Gauge, title: "Territory performance", body: "Compare results against each territory's target." },
  { icon: Users, title: "Team allocation", body: "Place reps where the opportunity is." },
  { icon: Eye, title: "Territory visibility", body: "Everyone can see who owns what." },
  { icon: PieChart, title: "Sales coverage", body: "Spot accounts that nobody is covering." },
];

const gaps = new Set([3, 9, 14, 22, 27, 33, 38]);

export function CoverageAssigner() {
  const [owners, setOwners] = useState<number[]>(() => Array.from({ length: GRID_SIZE }, (_, index) => (gaps.has(index) ? -1 : cleanOwner(index))));
  const [rep, setRep] = useState(0);
  const assigned = owners.filter((owner) => owner >= 0).length;
  const coverage = Math.round((assigned / GRID_SIZE) * 100);

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow="Core capabilities" title="Assign accounts and see coverage instantly" intro="Pick a rep, then select the accounts they should own. Coverage and the counts for each territory update as you go." />

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div className="rounded-3xl bg-brand-surface p-5 ring-1 ring-brand-border sm:p-7">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-sm font-bold text-brand-text">Assign to</p>
              <SampleTag />
            </div>
            <div role="radiogroup" aria-label="Sales representative" className="flex flex-wrap gap-2">
              {territoryReps.map((item, index) => (
                <button key={item.name} type="button" role="radio" aria-checked={rep === index} onClick={() => setRep(index)} className={cn("flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold outline-none ring-1 transition-colors focus-visible:ring-2 focus-visible:ring-brand-purple", rep === index ? "bg-white text-brand-text shadow-md ring-brand-purple" : "bg-white/70 text-brand-muted ring-brand-border hover:bg-white")}>
                  <span className={cn("size-2.5 rounded-sm", item.cell)} aria-hidden /> {item.name}
                </button>
              ))}
            </div>

            <div className="mt-5 grid gap-1.5" style={{ gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))` }}>
              {owners.map((owner, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Account ${index + 1}: ${owner >= 0 ? `owned by ${territoryReps[owner].name}` : "no owner"}. Assign to ${territoryReps[rep].name}`}
                  onClick={() => setOwners((current) => current.map((value, i) => (i === index ? rep : value)))}
                  className={cn("aspect-square rounded-md outline-none transition-all hover:scale-110 focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-1", owner >= 0 ? territoryReps[owner].cell : "border-2 border-dashed border-slate-300 bg-white")}
                />
              ))}
            </div>
            <p className="mt-4 text-xs text-brand-muted">Dashed squares have no owner yet. Select one to give it to {territoryReps[rep].name}.</p>
          </div>

          <div className="space-y-5">
            <div className="rounded-3xl bg-brand-navy p-5 text-white sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold tracking-wide text-violet-300 uppercase">Sales coverage</p>
                  <p className="text-4xl font-extrabold tabular-nums">{coverage}%</p>
                  <p className="text-xs text-white/60">{assigned} of {GRID_SIZE} accounts have an owner</p>
                </div>
                <Layers className="size-10 text-violet-300/60" aria-hidden />
              </div>
              <span className="mt-4 block h-2.5 rounded-full bg-white/10"><span className="block h-full rounded-full bg-emerald-400 transition-all duration-500" style={{ width: `${coverage}%` }} /></span>
              <ul className="mt-5 grid grid-cols-2 gap-2.5">
                {territoryReps.map((item, index) => (
                  <li key={item.name} className="flex items-center justify-between gap-2 rounded-xl bg-white/5 px-3 py-2 text-xs ring-1 ring-white/10">
                    <span className="flex items-center gap-2"><span className={cn("size-2.5 rounded-sm", item.cell)} aria-hidden /> {item.territory}</span>
                    <b className="tabular-nums">{owners.filter((owner) => owner === index).length}</b>
                  </li>
                ))}
              </ul>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2">
              {capabilities.map(({ icon: Icon, title, body }) => (
                <li key={title} className="flex gap-3 rounded-2xl bg-white p-3.5 ring-1 ring-brand-border">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-purple-light text-brand-purple"><Icon className="size-4.5" aria-hidden /></span>
                  <div>
                    <h3 className="text-[13px] font-bold text-brand-text">{title}</h3>
                    <p className="text-xs leading-snug text-brand-muted">{body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
