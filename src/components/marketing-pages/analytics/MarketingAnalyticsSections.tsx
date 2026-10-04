"use client";

import { useState, type CSSProperties } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { InView } from "@/components/ui/InView";
import { SampleTag, SectionHead } from "@/components/sales-solution/shared";

/* ---------------------------------------------------------------- Channel table */

const channels = [
  { name: "Paid ads", spend: 4.5, leads: 520, conv: 4.4 },
  { name: "Email", spend: 1.8, leads: 420, conv: 6.2 },
  { name: "Social", spend: 2.4, leads: 310, conv: 3.1 },
  { name: "Events", spend: 3.0, leads: 140, conv: 9.8 },
  { name: "Organic search", spend: 0.6, leads: 280, conv: 5.0 },
].map((channel) => ({ ...channel, cpl: Math.round((channel.spend * 100000) / channel.leads) }));

type SortKey = "spend" | "leads" | "cpl" | "conv";
const columns: { key: SortKey; label: string; format: (value: number) => string; lowerIsBetter?: boolean }[] = [
  { key: "spend", label: "Spend", format: (value) => `₹${value.toFixed(1)}L` },
  { key: "leads", label: "Leads", format: (value) => value.toLocaleString("en-IN") },
  { key: "cpl", label: "Cost per lead", format: (value) => `₹${value}`, lowerIsBetter: true },
  { key: "conv", label: "Conversion", format: (value) => `${value}%` },
];

export function ChannelTable() {
  const [sort, setSort] = useState<{ key: SortKey; desc: boolean }>({ key: "leads", desc: true });
  const rows = [...channels].sort((a, b) => (sort.desc ? b[sort.key] - a[sort.key] : a[sort.key] - b[sort.key]));
  const best = Math.max(...channels.map((channel) => channel[sort.key]));

  return (
    <section className="bg-brand-surface py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow="Channel performance" title="Compare every channel on the same terms" intro="Sort by any column to see which channels bring in the most leads, at what cost and with what conversion." />
        <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-3xl bg-white shadow-[0_30px_70px_-44px_rgba(23,22,92,0.5)] ring-1 ring-brand-border">
          <div className="flex items-center justify-between border-b border-brand-border bg-brand-surface px-5 py-3.5">
            <p className="text-sm font-bold text-brand-text">Last 6 months</p>
            <SampleTag />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="text-[11px] font-bold tracking-wide text-brand-muted uppercase">
                  <th scope="col" className="px-5 py-3">Channel</th>
                  {columns.map((column) => {
                    const active = sort.key === column.key;
                    return (
                      <th key={column.key} scope="col" aria-sort={active ? (sort.desc ? "descending" : "ascending") : "none"} className="px-3 py-3">
                        <button type="button" onClick={() => setSort((current) => ({ key: column.key, desc: current.key === column.key ? !current.desc : true }))} className={cn("flex items-center gap-1 rounded-md uppercase outline-none focus-visible:ring-2 focus-visible:ring-brand-purple", active && "text-brand-purple")}>
                          {column.label}
                          {active && (sort.desc ? <ArrowDown className="size-3" aria-hidden /> : <ArrowUp className="size-3" aria-hidden />)}
                        </button>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border">
                {rows.map((row) => (
                  <tr key={row.name}>
                    <th scope="row" className="px-5 py-4 text-sm font-bold text-brand-text">{row.name}</th>
                    {columns.map((column) => (
                      <td key={column.key} className="px-3 py-4">
                        <span className={cn("font-semibold tabular-nums", sort.key === column.key ? "text-brand-purple" : "text-brand-text")}>{column.format(row[column.key])}</span>
                        {sort.key === column.key && (
                          <span className="mt-1.5 block h-1.5 w-full max-w-[110px] rounded-full bg-brand-surface">
                            <span className="block h-full rounded-full bg-brand-purple transition-all duration-500" style={{ width: `${(row[column.key] / best) * 100}%` }} />
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Attribution */

const models = {
  first: { label: "First touch", note: "Gives all the credit to the first channel that reached the customer.", credit: [34, 28, 20, 6, 12] },
  last: { label: "Last touch", note: "Gives all the credit to the final channel before the customer converted.", credit: [14, 22, 8, 38, 18] },
  linear: { label: "Linear", note: "Shares the credit evenly across every channel the customer met.", credit: [22, 24, 15, 24, 15] },
} as const;
type Model = keyof typeof models;
const attributionChannels = ["Organic search", "Paid ads", "Social", "Email", "Events"];

export function Attribution() {
  const [model, setModel] = useState<Model>("linear");
  const current = models[model];
  const credit: readonly number[] = current.credit;
  const top = credit.indexOf(Math.max(...credit));

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <div>
          <SectionHead eyebrow="Attribution" title="Give credit where it is earned" intro="A customer usually meets several channels before buying. Switch the attribution model to see how the credit moves." />
          <div role="group" aria-label="Attribution model" className="mt-8 inline-flex rounded-full bg-brand-surface p-1 ring-1 ring-brand-border">
            {(Object.keys(models) as Model[]).map((key) => (
              <button key={key} type="button" aria-pressed={model === key} onClick={() => setModel(key)} className={cn("rounded-full px-4 py-2 text-sm font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand-purple", model === key ? "bg-brand-purple text-white shadow-sm" : "text-brand-muted hover:text-brand-text")}>
                {models[key].label}
              </button>
            ))}
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-brand-muted">{current.note}</p>
        </div>

        <InView className="rounded-3xl bg-brand-surface p-5 ring-1 ring-brand-border sm:p-7">
          <div className="mb-5 flex items-center justify-between gap-3">
            <p className="text-sm font-bold text-brand-text">Share of revenue credit</p>
            <SampleTag />
          </div>
          <ul key={model} className="space-y-4">
            {attributionChannels.map((channel, index) => (
              <li key={channel}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className={cn("font-semibold", index === top ? "text-brand-purple" : "text-brand-text")}>{channel}{index === top && " · top"}</span>
                  <b className="text-brand-text tabular-nums">{credit[index]}%</b>
                </div>
                <span className="block h-3 rounded-full bg-white ring-1 ring-brand-border">
                  <span className={cn("block h-full rounded-full transition-all duration-500", index === top ? "bg-gradient-to-r from-violet-400 to-brand-purple" : "bg-violet-300")} style={{ width: `${credit[index] * 2.4}%` }} />
                </span>
              </li>
            ))}
          </ul>
        </InView>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Campaign comparison */

const campaignData = [
  { name: "Diwali offer (email)", spend: 1.2, leads: 310, conv: 6.8 },
  { name: "Search: book a demo (ads)", spend: 3.5, leads: 440, conv: 4.1 },
  { name: "Festive reels (social)", spend: 1.0, leads: 150, conv: 2.9 },
  { name: "City roadshow (events)", spend: 2.0, leads: 90, conv: 10.2 },
].map((campaign) => ({ ...campaign, cpl: Math.round((campaign.spend * 100000) / campaign.leads) }));

export function CampaignCompare() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(1);
  const metrics: { key: "spend" | "leads" | "cpl" | "conv"; label: string; format: (value: number) => string; lower?: boolean }[] = [
    { key: "spend", label: "Spend", format: (value) => `₹${value.toFixed(1)}L`, lower: true },
    { key: "leads", label: "Leads", format: (value) => String(value) },
    { key: "cpl", label: "Cost per lead", format: (value) => `₹${value}`, lower: true },
    { key: "conv", label: "Conversion", format: (value) => `${value}%` },
  ];
  const selectClass = "w-full rounded-xl bg-white px-3 py-2.5 text-sm font-semibold text-brand-text ring-1 ring-brand-border outline-none focus-visible:ring-2 focus-visible:ring-brand-purple";

  return (
    <section className="bg-[linear-gradient(180deg,#f4f1ff_0%,#ffffff_100%)] py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow="Campaign comparison" title="Put two campaigns side by side" intro="Pick any two campaigns to compare spend, leads, cost per lead and conversion. The better result in each row is highlighted." />
        <div className="mx-auto mt-12 max-w-4xl rounded-3xl bg-white p-5 shadow-[0_30px_70px_-44px_rgba(23,22,92,0.5)] ring-1 ring-brand-border sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-xs font-bold tracking-wide text-violet-700 uppercase">
              Campaign A
              <select value={a} onChange={(event) => setA(Number(event.target.value))} className={cn(selectClass, "mt-1.5")}>
                {campaignData.map((campaign, index) => (
                  <option key={campaign.name} value={index}>{campaign.name}</option>
                ))}
              </select>
            </label>
            <label className="block text-xs font-bold tracking-wide text-sky-700 uppercase">
              Campaign B
              <select value={b} onChange={(event) => setB(Number(event.target.value))} className={cn(selectClass, "mt-1.5")}>
                {campaignData.map((campaign, index) => (
                  <option key={campaign.name} value={index}>{campaign.name}</option>
                ))}
              </select>
            </label>
          </div>

          <ul className="mt-7 space-y-5">
            {metrics.map((metric) => {
              const va = campaignData[a][metric.key];
              const vb = campaignData[b][metric.key];
              const max = Math.max(va, vb) || 1;
              const winner = va === vb ? null : (metric.lower ? va < vb : va > vb) ? "a" : "b";
              return (
                <li key={metric.key}>
                  <p className="mb-1.5 flex items-center justify-between text-[11px] font-bold tracking-wide text-brand-muted uppercase">
                    {metric.label} {metric.lower && <span className="font-medium normal-case">lower is better</span>}
                  </p>
                  {([["a", va, "from-violet-400 to-brand-purple"], ["b", vb, "from-sky-400 to-sky-600"]] as const).map(([side, value, tone]) => (
                    <div key={side} className="mb-1.5 flex items-center gap-3">
                      <span className={cn("w-4 text-xs font-extrabold", side === "a" ? "text-violet-700" : "text-sky-700")}>{side.toUpperCase()}</span>
                      <span className="h-3 flex-1 rounded-full bg-brand-surface">
                        <span className={cn("block h-full rounded-full bg-gradient-to-r transition-all duration-500", tone)} style={{ width: `${(value / max) * 100}%` } as CSSProperties} />
                      </span>
                      <b className={cn("w-16 text-right text-sm tabular-nums", winner === side ? "text-emerald-600" : "text-brand-text")}>{metric.format(value)}</b>
                    </div>
                  ))}
                </li>
              );
            })}
          </ul>
          <p className="mt-6 text-center"><SampleTag /></p>
        </div>
      </div>
    </section>
  );
}
