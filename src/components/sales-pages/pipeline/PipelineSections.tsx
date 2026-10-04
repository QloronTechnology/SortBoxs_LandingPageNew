"use client";

import { useState } from "react";
import { ArrowRight, CalendarDays, Clock, GripVertical, History, Phone, Mail, UserRound, FileText, Handshake, ListChecks, Target, Eye, FolderKanban, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { rupees, useReducedMotion, useTicker } from "@/components/sales-solution/hooks";
import { Avatar, SampleTag, SectionHead, avatarTones } from "@/components/sales-solution/shared";
import { reps, stageDefs } from "./PipelineHero";

/* ---------------------------------------------------------------- From lead to closed deal */

const journey = [
  { count: 42, value: "₹18.5L", focus: "Fresh leads from forms, email and imports wait for a first touch.", exit: ["Owner assigned", "First contact made"], deals: ["Zenith Pharma", "Greenfield Realty"] },
  { count: 28, value: "₹12.4L", focus: "Need and budget are confirmed, and a decision maker is identified.", exit: ["Budget confirmed", "Decision maker known"], deals: ["Northwind Logistics", "Skyline Infra"] },
  { count: 17, value: "₹9.8L", focus: "A proposal or quote is out and the team is waiting on a reply.", exit: ["Quote sent", "Reply received"], deals: ["Acme Technologies", "Helix Motors"] },
  { count: 9, value: "₹6.3L", focus: "Terms, pricing and approvals are being finalised.", exit: ["Terms agreed", "Approval granted"], deals: ["Meridian Steel", "Pioneer Edu"] },
  { count: 14, value: "₹22.8L", focus: "The deal is closed and handed over, with its full history.", exit: ["Order created", "Handed to delivery"], deals: ["Bluepeak Foods", "Vertex Labs"] },
];

export function StageJourney() {
  const reduced = useReducedMotion();
  const [taken, setTaken] = useState(false);
  const [tick, setTick] = useTicker(stageDefs.length, 2800, reduced || taken, 0);
  const active = reduced && !taken ? 2 : tick;
  const stage = stageDefs[active];
  const info = journey[active];

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f1edff_0%,#e6dffd_100%)] py-16 lg:py-24">
      <span aria-hidden className="absolute -top-24 -right-20 size-80 rounded-full bg-brand-purple/10 blur-3xl" />
      <span aria-hidden className="absolute -bottom-28 -left-16 size-72 rounded-full bg-violet-300/25 blur-3xl" />
      <div className="relative container-page">
        <SectionHead center eyebrow="The sales journey" title="From Lead to Closed Deal" intro="Every deal follows the same path. Select a stage to see what happens in it and what has to be true before a deal moves on." />

        <ol aria-label="Pipeline stages" className="mt-12 grid gap-2 lg:grid-cols-5 lg:gap-0">
          {stageDefs.map((def, index) => (
            <li key={def.label}>
              <button
                type="button"
                aria-current={index === active ? "step" : undefined}
                onClick={() => {
                  setTaken(true);
                  setTick(index);
                }}
                className={cn(
                  "relative flex w-full items-center justify-between gap-2 px-5 py-4 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand-purple max-lg:rounded-xl lg:flex-col lg:items-start lg:rounded-none lg:py-5 lg:pr-9",
                  "lg:[clip-path:polygon(0_0,calc(100%-22px)_0,100%_50%,calc(100%-22px)_100%,0_100%,22px_50%)] lg:first:[clip-path:polygon(0_0,calc(100%-22px)_0,100%_50%,calc(100%-22px)_100%,0_100%)] lg:pl-9 lg:first:pl-5",
                  index === active ? "bg-brand-purple text-white" : index < active ? "bg-white text-brand-purple ring-1 ring-brand-purple/20" : "bg-white/80 text-brand-muted hover:bg-white"
                )}
              >
                <span className="text-sm font-bold">{def.label}</span>
                <span className={cn("text-xs font-semibold tabular-nums", index === active ? "text-white/80" : "")}>
                  {journey[index].count} deals · {journey[index].value}
                </span>
              </button>
            </li>
          ))}
        </ol>

        <div key={active} className="demo-rise mx-auto mt-8 grid max-w-5xl gap-4 rounded-3xl bg-white p-5 shadow-[0_30px_60px_-36px_rgba(23,22,92,0.45)] ring-1 ring-brand-purple/15 md:grid-cols-[1.2fr_1fr_1fr] sm:p-7">
          <div>
            <p className="flex items-center gap-2 text-sm font-bold text-brand-text">
              <span className={cn("size-2.5 rounded-full", stage.dot)} aria-hidden /> {stage.label}
              <SampleTag className="ml-2" />
            </p>
            <p className="mt-3 text-sm leading-relaxed text-brand-muted">{info.focus}</p>
          </div>
          <div>
            <p className="text-[11px] font-bold tracking-wide text-brand-muted uppercase">Before a deal moves on</p>
            <ul className="mt-2 space-y-1.5">
              {info.exit.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm font-medium text-brand-text">
                  <ArrowRight className="size-3.5 text-brand-purple" aria-hidden /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-bold tracking-wide text-brand-muted uppercase">In this stage</p>
            <ul className="mt-2 space-y-1.5">
              {info.deals.map((item) => (
                <li key={item} className="rounded-lg bg-brand-surface px-3 py-1.5 text-sm font-semibold text-brand-text ring-1 ring-brand-border">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Drag & drop + forecasting */

interface Deal {
  id: string;
  company: string;
  value: number;
  owner: number;
  close: string;
  stage: number;
}

const initial: Deal[] = [
  { id: "zenith", company: "Zenith Pharma", value: 180000, owner: 1, close: "12 Dec", stage: 0 },
  { id: "greenfield", company: "Greenfield Realty", value: 80000, owner: 4, close: "20 Dec", stage: 0 },
  { id: "northwind", company: "Northwind Logistics", value: 340000, owner: 0, close: "05 Dec", stage: 1 },
  { id: "skyline", company: "Skyline Infra", value: 110000, owner: 1, close: "18 Dec", stage: 1 },
  { id: "acme", company: "Acme Technologies", value: 480000, owner: 0, close: "28 Nov", stage: 2 },
  { id: "helix", company: "Helix Motors", value: 240000, owner: 3, close: "02 Dec", stage: 2 },
  { id: "meridian", company: "Meridian Steel", value: 210000, owner: 2, close: "22 Nov", stage: 3 },
  { id: "bluepeak", company: "Bluepeak Foods", value: 310000, owner: 3, close: "14 Nov", stage: 4 },
];

export function DragBoard() {
  const [deals, setDeals] = useState(initial);
  const [dragId, setDragId] = useState<string | null>(null);
  const [over, setOver] = useState<number | null>(null);

  const move = (id: string, stage: number) => setDeals((current) => current.map((deal) => (deal.id === id ? { ...deal, stage } : deal)));
  const open = deals.filter((deal) => deal.stage < 4);
  const openValue = open.reduce((sum, deal) => sum + deal.value, 0);
  const weighted = open.reduce((sum, deal) => sum + (deal.value * stageDefs[deal.stage].probability) / 100, 0);
  const won = deals.filter((deal) => deal.stage === 4).reduce((sum, deal) => sum + deal.value, 0);

  return (
    <section className="bg-brand-navy py-16 text-white lg:py-24">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead dark eyebrow="Drag-and-drop stages" title="Drag a deal. The forecast moves with it." intro="Move deals between stages with a drag, or pick a stage from the list on each card. Pipeline totals and the weighted forecast recalculate straight away." />
          <dl className="grid grid-cols-3 gap-3 text-center">
            {[
              ["Open pipeline", rupees(openValue)],
              ["Weighted forecast", rupees(weighted)],
              ["Won", rupees(won)],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
                <dt className="text-[11px] font-semibold text-white/60">{label}</dt>
                <dd className="mt-0.5 text-base font-extrabold tabular-nums sm:text-lg">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {stageDefs.map((def, index) => {
            const column = deals.filter((deal) => deal.stage === index);
            return (
              <section
                key={def.label}
                aria-label={def.label}
                onDragOver={(event) => {
                  event.preventDefault();
                  setOver(index);
                }}
                onDragLeave={() => setOver((current) => (current === index ? null : current))}
                onDrop={(event) => {
                  event.preventDefault();
                  const id = event.dataTransfer.getData("text/plain") || dragId;
                  if (id) move(id, index);
                  setDragId(null);
                  setOver(null);
                }}
                className={cn("rounded-2xl p-2.5 ring-1 transition-colors", over === index ? "bg-brand-purple/30 ring-violet-300" : "bg-white/5 ring-white/10")}
              >
                <header className="flex items-center justify-between px-1.5 pt-1 pb-2">
                  <h3 className="flex items-center gap-2 text-[13px] font-bold">
                    <span className={cn("size-2 rounded-full", def.dot)} aria-hidden /> {def.label}
                  </h3>
                  <span className="text-[11px] font-semibold text-white/60">{def.probability}%</span>
                </header>
                <ul className="flex min-h-[90px] flex-col gap-2">
                  {column.map((deal) => (
                    <li
                      key={deal.id}
                      draggable
                      onDragStart={(event) => {
                        event.dataTransfer.effectAllowed = "move";
                        event.dataTransfer.setData("text/plain", deal.id);
                        setDragId(deal.id);
                      }}
                      onDragEnd={() => {
                        setDragId(null);
                        setOver(null);
                      }}
                      className={cn("cursor-grab rounded-xl bg-white p-3 text-brand-text shadow-sm active:cursor-grabbing", dragId === deal.id && "opacity-40")}
                    >
                      <div className="flex items-start justify-between gap-1">
                        <p className="text-[13px] leading-tight font-extrabold">{deal.company}</p>
                        <GripVertical className="size-4 shrink-0 text-brand-muted/60" aria-hidden />
                      </div>
                      <p className="mt-0.5 text-sm font-extrabold text-brand-purple tabular-nums">{rupees(deal.value)}</p>
                      <p className="mt-1.5 flex items-center gap-1 text-[11px] text-brand-muted">
                        <CalendarDays className="size-3" aria-hidden /> {deal.close} · {reps[deal.owner].split(" ")[0]}
                      </p>
                      <label className="mt-2 block">
                        <span className="sr-only">Move {deal.company} to stage</span>
                        <select
                          value={deal.stage}
                          onChange={(event) => move(deal.id, Number(event.target.value))}
                          className="w-full rounded-lg bg-brand-surface px-2 py-1 text-[11px] font-semibold text-brand-muted outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
                        >
                          {stageDefs.map((option, optionIndex) => (
                            <option key={option.label} value={optionIndex}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </label>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
        <p className="mt-4 text-xs text-white/50">Sample data. Probabilities per stage are an example setting.</p>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Deal tracking: detail panel */

type Tab = "activity" | "history" | "owner";

const activity: { icon: LucideIcon; title: string; when: string; tone: string }[] = [
  { icon: Mail, title: "Proposal emailed to Priya Nair", when: "Today, 10:20", tone: "bg-sky-100 text-sky-700" },
  { icon: Phone, title: "Call with the finance team, 25 min", when: "Yesterday, 16:00", tone: "bg-amber-100 text-amber-700" },
  { icon: ListChecks, title: "Task: send revised pricing", when: "Due tomorrow", tone: "bg-violet-100 text-violet-700" },
  { icon: Handshake, title: "Demo for the operations team", when: "Mon, 11:30", tone: "bg-emerald-100 text-emerald-700" },
];

const history = [
  ["Stage", "Qualified → Proposal", "Riya Sharma", "Today"],
  ["Value", "₹4,20,000 → ₹4,80,000", "Riya Sharma", "Yesterday"],
  ["Close date", "05 Dec → 28 Nov", "Riya Sharma", "Mon"],
  ["Stage", "New Lead → Qualified", "Automation", "Last week"],
  ["Owner", "Unassigned → Riya Sharma", "Automation", "Last week"],
];

const trackingPoints: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Eye, title: "Deal tracking", body: "Value, stage, close date and probability, always up to date." },
  { icon: UserRound, title: "Deal ownership", body: "A named owner on every deal, and a clear record when it changes." },
  { icon: Target, title: "Opportunity management", body: "Contacts, products and notes kept with the opportunity." },
  { icon: FolderKanban, title: "Activity tracking", body: "Emails, calls, meetings and tasks logged against the deal." },
  { icon: History, title: "Deal history", body: "Every stage, value and owner change, with who and when." },
];

export function DealDetail() {
  const [tab, setTab] = useState<Tab>("activity");
  const tabs: { key: Tab; label: string }[] = [
    { key: "activity", label: "Activity" },
    { key: "history", label: "History" },
    { key: "owner", label: "Ownership" },
  ];

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div>
          <SectionHead eyebrow="Deal tracking" title="Open any deal and see the whole story" intro="No more asking around. Everything the team knows about a deal sits on one screen." />
          <ul className="mt-8 space-y-5">
            {trackingPoints.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex gap-3.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-purple-light text-brand-purple">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-[15px] font-bold text-brand-text">{title}</h3>
                  <p className="text-sm leading-relaxed text-brand-muted">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow-[0_30px_70px_-40px_rgba(23,22,92,0.55)] ring-1 ring-brand-border">
          <div className="border-b border-brand-border bg-brand-surface p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-brand-muted">Opportunity OP-318</p>
                <p className="text-xl font-extrabold text-brand-text">Acme Technologies</p>
              </div>
              <div className="flex items-center gap-2">
                <SampleTag />
                <p className="text-xl font-extrabold text-brand-purple tabular-nums">₹4,80,000</p>
              </div>
            </div>
            <div className="mt-4 flex gap-1" aria-label="Stage: Proposal">
              {stageDefs.map((def, index) => (
                <span key={def.label} className="flex-1">
                  <span className={cn("block h-1.5 rounded-full", index <= 2 ? "bg-brand-purple" : "bg-brand-border")} />
                  <span className={cn("mt-1 block text-[10px] font-semibold", index === 2 ? "text-brand-purple" : "text-brand-muted")}>{def.label}</span>
                </span>
              ))}
            </div>
            <dl className="mt-4 grid grid-cols-3 gap-3 text-xs">
              {[
                ["Owner", "Riya Sharma"],
                ["Close date", "28 Nov"],
                ["Probability", "60%"],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-brand-muted">{label}</dt>
                  <dd className="font-bold text-brand-text">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div role="tablist" aria-label="Deal details" className="flex gap-1 border-b border-brand-border px-3 pt-2">
            {tabs.map((item) => (
              <button
                key={item.key}
                type="button"
                role="tab"
                aria-selected={tab === item.key}
                onClick={() => setTab(item.key)}
                className={cn("rounded-t-lg px-4 py-2.5 text-sm font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand-purple", tab === item.key ? "border-b-2 border-brand-purple text-brand-purple" : "text-brand-muted hover:text-brand-text")}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div role="tabpanel" key={tab} className="demo-rise min-h-[260px] p-5">
            {tab === "activity" && (
              <ul className="space-y-4">
                {activity.map(({ icon: Icon, title, when, tone }) => (
                  <li key={title} className="flex items-center gap-3">
                    <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-full", tone)}>
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-brand-text">{title}</p>
                      <p className="flex items-center gap-1 text-xs text-brand-muted">
                        <Clock className="size-3" aria-hidden /> {when}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {tab === "history" && (
              <table className="w-full text-left text-sm">
                <thead className="text-[11px] font-bold tracking-wide text-brand-muted uppercase">
                  <tr>
                    <th scope="col" className="pb-2">Field</th>
                    <th scope="col" className="pb-2">Change</th>
                    <th scope="col" className="hidden pb-2 sm:table-cell">By</th>
                    <th scope="col" className="pb-2 text-right">When</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border">
                  {history.map(([field, change, by, when]) => (
                    <tr key={`${field}-${change}`}>
                      <td className="py-2.5 font-semibold text-brand-text">{field}</td>
                      <td className="py-2.5 text-brand-muted">{change}</td>
                      <td className="hidden py-2.5 text-brand-muted sm:table-cell">{by}</td>
                      <td className="py-2.5 text-right text-brand-muted">{when}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {tab === "owner" && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 rounded-2xl bg-brand-surface p-4">
                  <Avatar name="Riya Sharma" tone={avatarTones[0]} className="size-11 text-sm" />
                  <div>
                    <p className="text-xs text-brand-muted">Deal owner</p>
                    <p className="font-bold text-brand-text">Riya Sharma</p>
                    <p className="text-xs text-brand-muted">West territory</p>
                  </div>
                </div>
                <p className="text-xs font-bold tracking-wide text-brand-muted uppercase">Also working on this deal</p>
                <div className="flex gap-2">
                  {["Sana Khan", "Dev Malhotra"].map((name, index) => (
                    <span key={name} className="flex items-center gap-2 rounded-full bg-brand-surface py-1 pr-3 pl-1 text-xs font-semibold text-brand-text">
                      <Avatar name={name} tone={avatarTones[index + 1]} className="size-6 text-[9px]" /> {name}
                    </span>
                  ))}
                </div>
                <p className="flex items-center gap-2 text-xs text-brand-muted">
                  <FileText className="size-3.5" aria-hidden /> Ownership changes are recorded in the deal history.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
