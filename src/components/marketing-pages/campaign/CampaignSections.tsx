"use client";

import { useState } from "react";
import { BarChart3, Calendar, Check, Flag, PenTool, Rocket, Users, Wallet, ListChecks, ShieldCheck, Layers, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion, useTicker } from "@/components/sales-solution/hooks";
import { Avatar, SampleTag, SectionHead, avatarTones } from "@/components/sales-solution/shared";
import { channelTone, type Channel } from "../shared";
import { WEEKS, campaigns } from "./campaignData";

/* ---------------------------------------------------------------- Plan to launch */

const stages: { icon: LucideIcon; label: string; doing: string; keeps: string }[] = [
  { icon: Flag, label: "Brief", doing: "Set the goal, the audience, the owner and the budget.", keeps: "One brief that everyone on the campaign can find." },
  { icon: Calendar, label: "Plan", doing: "Choose channels and dates, and place the campaign on the calendar.", keeps: "A shared calendar that shows clashes and gaps." },
  { icon: PenTool, label: "Create", doing: "Assign copy, design and approval tasks with due dates.", keeps: "Tasks and approvals tied to the campaign, not buried in chat." },
  { icon: Rocket, label: "Launch", doing: "Go live on each channel when the tasks are done.", keeps: "A clear status for every campaign: planned, live or done." },
  { icon: BarChart3, label: "Measure", doing: "Compare spend and results against the plan.", keeps: "Budget used and results beside the original goal." },
];

export function PlanToLaunch() {
  const reduced = useReducedMotion();
  const [taken, setTaken] = useState(false);
  const [tick, setTick] = useTicker(stages.length, 2600, reduced || taken, 0);
  const active = reduced && !taken ? 0 : tick;
  const stage = stages[active];

  return (
    <section className="bg-brand-surface py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow="From idea to results" title="Every campaign follows the same five steps" intro="Select a step to see what the team does there and what SortBoxs keeps in one place." />
        <ol aria-label="Campaign stages" className="relative mt-12 grid gap-3 sm:grid-cols-5 sm:gap-0">
          <span aria-hidden className="absolute top-[34px] right-[10%] left-[10%] hidden h-0.5 bg-brand-purple/20 sm:block" />
          {stages.map(({ icon: Icon, label }, index) => (
            <li key={label} className="flex sm:justify-center">
              <button
                type="button"
                aria-current={index === active ? "step" : undefined}
                onClick={() => {
                  setTaken(true);
                  setTick(index);
                }}
                className="group flex w-full items-center gap-3 rounded-2xl p-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-brand-purple sm:w-auto sm:flex-col sm:text-center"
              >
                <span className={cn("relative flex size-[68px] shrink-0 items-center justify-center rounded-2xl ring-4 ring-brand-surface transition-all duration-300", index === active ? "scale-105 bg-brand-purple text-white shadow-lg shadow-brand-purple/30" : index < active ? "bg-emerald-500 text-white" : "bg-white text-brand-purple shadow-sm group-hover:bg-brand-purple-light")}>
                  {index < active ? <Check className="size-6" strokeWidth={3} aria-hidden /> : <Icon className="size-6" aria-hidden />}
                  <span className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-white text-xs font-bold text-brand-purple ring-1 ring-brand-border">{index + 1}</span>
                </span>
                <span className={cn("text-sm font-bold", index === active ? "text-brand-purple" : "text-brand-text")}>{label}</span>
              </button>
            </li>
          ))}
        </ol>
        <div key={active} className="demo-rise mx-auto mt-10 grid max-w-4xl gap-4 rounded-3xl bg-white p-5 shadow-[0_30px_60px_-40px_rgba(23,22,92,0.5)] ring-1 ring-brand-border sm:grid-cols-2 sm:p-7">
          <div className="rounded-2xl bg-violet-50 p-4 ring-1 ring-violet-200">
            <p className="text-[11px] font-extrabold tracking-wide text-violet-800 uppercase">What the team does</p>
            <p className="mt-1.5 text-sm leading-relaxed font-medium text-brand-text">{stage.doing}</p>
          </div>
          <div className="rounded-2xl bg-emerald-50 p-4 ring-1 ring-emerald-200">
            <p className="text-[11px] font-extrabold tracking-wide text-emerald-800 uppercase">What SortBoxs keeps</p>
            <p className="mt-1.5 text-sm leading-relaxed font-medium text-brand-text">{stage.keeps}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Planner with channel filter */

const filters: ("All" | Channel)[] = ["All", "Email", "Social", "Ads", "Events"];
const statusTone = { Planned: "bg-slate-100 text-slate-600", Live: "bg-emerald-100 text-emerald-700", Done: "bg-violet-100 text-violet-700" } as const;

export function CampaignPlanner() {
  const [filter, setFilter] = useState<"All" | Channel>("All");
  const rows = campaigns.filter((campaign) => filter === "All" || campaign.channel === filter);
  const budget = rows.reduce((sum, row) => sum + row.budget, 0);
  const spent = rows.reduce((sum, row) => sum + row.spent, 0);

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow="Campaign calendar and budget" title="See everything that is running, and what it costs" intro="Filter by channel to see its campaigns, owners, status and budget. Totals follow your filter." />

        <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-3xl bg-white shadow-[0_30px_70px_-44px_rgba(23,22,92,0.5)] ring-1 ring-brand-border">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-border bg-brand-surface px-5 py-4">
            <div role="group" aria-label="Channel" className="flex flex-wrap gap-1.5">
              {filters.map((item) => (
                <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)} className={cn("rounded-full px-3.5 py-1.5 text-xs font-semibold outline-none ring-1 transition-colors focus-visible:ring-2 focus-visible:ring-brand-purple", filter === item ? "bg-brand-purple text-white ring-brand-purple" : "bg-white text-brand-muted ring-brand-border hover:text-brand-text")}>
                  {item}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4 text-xs">
              <SampleTag />
              <span className="text-brand-muted">Budget <b className="text-brand-text tabular-nums">₹{budget.toFixed(1)}L</b></span>
              <span className="text-brand-muted">Spent <b className="text-brand-purple tabular-nums">₹{spent.toFixed(1)}L</b></span>
            </div>
          </div>

          <ul key={filter} className="divide-y divide-brand-border">
            {rows.map((campaign, index) => {
              const pct = Math.round((campaign.spent / campaign.budget) * 100);
              return (
                <li key={campaign.name} className="demo-rise grid items-center gap-x-4 gap-y-2 px-5 py-4 sm:grid-cols-[1.4fr_1fr_1.2fr_auto]" style={{ "--d": `${index * 50}ms` } as React.CSSProperties}>
                  <div>
                    <p className="text-sm font-bold text-brand-text">{campaign.name}</p>
                    <p className="mt-0.5 flex items-center gap-2 text-xs text-brand-muted">
                      <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold", channelTone[campaign.channel].soft)}>{campaign.channel}</span>
                      Wk {campaign.start + 1}–{Math.min(campaign.start + campaign.len, WEEKS)}
                    </p>
                  </div>
                  <p className="flex items-center gap-2 text-xs text-brand-muted">
                    <Avatar name={campaign.owner} tone={avatarTones[index % avatarTones.length]} className="size-6 text-[9px]" /> {campaign.owner}
                  </p>
                  <div>
                    <div className="flex justify-between text-[11px] text-brand-muted">
                      <span>₹{campaign.spent}L of ₹{campaign.budget}L</span>
                      <b className="text-brand-text">{pct}%</b>
                    </div>
                    <span className="mt-1 block h-1.5 rounded-full bg-brand-surface">
                      <span className={cn("block h-full rounded-full", channelTone[campaign.channel].bar)} style={{ width: `${pct}%` }} />
                    </span>
                  </div>
                  <span className={cn("w-fit rounded-full px-2.5 py-1 text-[11px] font-bold", statusTone[campaign.status])}>{campaign.status}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Campaign detail: tasks and capabilities */

const capabilities: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Calendar, title: "Campaign calendar", body: "Every campaign and channel on one shared view." },
  { icon: Wallet, title: "Budget tracking", body: "Planned and spent amounts beside each campaign." },
  { icon: ListChecks, title: "Tasks and owners", body: "Work assigned with due dates, so nothing is assumed." },
  { icon: ShieldCheck, title: "Approvals", body: "Copy and creative signed off before they go out." },
  { icon: Layers, title: "Multi-channel", body: "Email, social, ads and events planned together." },
  { icon: Users, title: "Team view", body: "See who is working on what, and who is free." },
];

const initialTasks = [
  ["Final offer copy approved", true],
  ["Email template designed", true],
  ["Audience segment chosen", true],
  ["Social posts scheduled", false],
  ["Landing page reviewed", false],
  ["Budget signed off", false],
] as const;

export function CampaignDetail() {
  const [done, setDone] = useState<boolean[]>(initialTasks.map(([, value]) => value));
  const count = done.filter(Boolean).length;
  const pct = Math.round((count / done.length) * 100);
  const radius = 36;
  const circumference = 2 * Math.PI * radius;

  return (
    <section className="bg-brand-surface py-16 lg:py-24">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <SectionHead eyebrow="Core capabilities" title="Keep the whole campaign in one place" intro="From the first task to the last invoice, everything about a campaign sits together." />
          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {capabilities.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex gap-3.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-brand-purple shadow-sm ring-1 ring-brand-border">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-brand-text">{title}</h3>
                  <p className="text-sm leading-relaxed text-brand-muted">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl bg-white p-5 shadow-[0_30px_70px_-40px_rgba(23,22,92,0.55)] ring-1 ring-brand-border sm:p-7">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-brand-muted">Campaign</p>
              <p className="text-xl font-extrabold text-brand-text">Diwali offer</p>
            </div>
            <SampleTag />
          </div>
          <div className="mt-5 flex items-center gap-5">
            <div className="relative size-24 shrink-0">
              <svg viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden>
                <circle cx="50" cy="50" r={radius} fill="none" stroke="#eeeaff" strokeWidth="10" />
                <circle cx="50" cy="50" r={radius} fill="none" stroke="#6c35f5" strokeWidth="10" strokeLinecap="round" strokeDasharray={`${(circumference * pct) / 100} ${circumference}`} className="transition-all duration-500" />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xl font-extrabold text-brand-text tabular-nums">{pct}%</span>
            </div>
            <div className="text-sm text-brand-muted">
              <p><b className="text-brand-text">{count} of {done.length}</b> tasks done</p>
              <p className="mt-1">Launch in 6 days</p>
              <span className="mt-2 flex -space-x-1.5">
                {["Meera Das", "Rohan Gupta", "Ishita Rao"].map((name, index) => (
                  <Avatar key={name} name={name} tone={avatarTones[index]} className="size-7 text-[9px] ring-2 ring-white" />
                ))}
              </span>
            </div>
          </div>
          <ul className="mt-6 space-y-2">
            {initialTasks.map(([label], index) => (
              <li key={label}>
                <label className={cn("flex cursor-pointer items-center gap-3 rounded-xl p-3 ring-1 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-purple", done[index] ? "bg-emerald-50 ring-emerald-200" : "bg-white ring-brand-border hover:bg-brand-surface")}>
                  <input type="checkbox" className="sr-only" checked={done[index]} onChange={() => setDone((current) => current.map((value, i) => (i === index ? !value : value)))} />
                  <span className={cn("flex size-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors", done[index] ? "border-emerald-500 bg-emerald-500 text-white" : "border-brand-border bg-white")}>
                    {done[index] && <Check className="size-3.5" strokeWidth={3} aria-hidden />}
                  </span>
                  <span className={cn("text-sm font-semibold", done[index] ? "text-brand-muted line-through" : "text-brand-text")}>{label}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
