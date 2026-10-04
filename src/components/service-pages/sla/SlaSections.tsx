"use client";

import { useState } from "react";
import { AlertTriangle, Bell, CheckCircle2, ShieldAlert, UserRound, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { SampleTag, SectionHead } from "@/components/sales-solution/shared";
import { priorityTone, type Priority } from "../shared";
import { dueTime, formatMinutes, policies } from "./slaData";

/* ---------------------------------------------------------------- Policy builder */

export function PolicyBuilder() {
  const [priority, setPriority] = useState<Priority>("High");
  const [hoursOnly, setHoursOnly] = useState(true);
  const policy = policies[priority];

  return (
    <section className="bg-brand-surface py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow="Build a policy" title="Targets for every priority" intro="Choose a priority to see its targets, then switch between counting all hours and counting only working hours. The due time changes with it." />
        <div className="mx-auto mt-12 grid max-w-5xl gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="rounded-3xl bg-white p-5 ring-1 ring-brand-border sm:p-7">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-bold text-brand-text">Priority</p>
              <SampleTag />
            </div>
            <div role="radiogroup" aria-label="Priority" className="grid grid-cols-2 gap-2">
              {(Object.keys(policies) as Priority[]).map((item) => (
                <button key={item} type="button" role="radio" aria-checked={priority === item} onClick={() => setPriority(item)} className={cn("rounded-xl p-3 text-left outline-none ring-1 transition-all focus-visible:ring-2 focus-visible:ring-brand-purple", priority === item ? "bg-brand-purple-light ring-2 ring-brand-purple" : "bg-white ring-brand-border hover:bg-brand-surface")}>
                  <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-bold", priorityTone[item])}>{item}</span>
                  <span className="mt-2 block text-xs text-brand-muted">Reply {formatMinutes(policies[item].response)} · Resolve {formatMinutes(policies[item].resolution)}</span>
                </button>
              ))}
            </div>
            <label className="mt-5 flex cursor-pointer items-center gap-3 rounded-xl bg-brand-surface p-3.5 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-purple">
              <input type="checkbox" role="switch" className="sr-only" checked={hoursOnly} onChange={() => setHoursOnly((value) => !value)} />
              <span aria-hidden className={cn("relative h-6 w-10 shrink-0 rounded-full transition-colors", hoursOnly ? "bg-brand-purple" : "bg-brand-border")}>
                <span className={cn("absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform", hoursOnly && "translate-x-4")} />
              </span>
              <span>
                <span className="block text-sm font-semibold text-brand-text">Count working hours only</span>
                <span className="block text-xs text-brand-muted">9:00 to 18:00, Monday to Friday</span>
              </span>
            </label>
          </div>

          <div className="rounded-3xl bg-brand-navy p-6 text-white sm:p-8" aria-live="polite">
            <p className="text-xs font-bold tracking-wide text-violet-300 uppercase">A ticket created Friday at 16:30</p>
            <dl className="mt-5 space-y-5">
              {[
                ["First response due", policy.response],
                ["Resolution due", policy.resolution],
              ].map(([label, minutes]) => (
                <div key={label as string} className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                  <dt className="text-xs font-semibold text-white/60">{label as string}</dt>
                  <dd className="mt-1 flex items-baseline justify-between gap-3">
                    <span className="text-3xl font-extrabold tabular-nums">{dueTime(minutes as number, hoursOnly)}</span>
                    <span className="text-xs text-white/60">target {formatMinutes(minutes as number)}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-sm leading-relaxed text-white/75">{hoursOnly ? "The clock pauses when the team is off, so a late Friday ticket is not unfairly due over the weekend." : "The clock never stops, so the due time keeps counting through nights and weekends."}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Escalation ladder */

const ladder: { at: number; icon: LucideIcon; title: string; body: string; tone: string }[] = [
  { at: 50, icon: Bell, title: "Half the time has passed", body: "A reminder goes to the agent who owns the ticket.", tone: "bg-sky-500" },
  { at: 75, icon: UserRound, title: "Three quarters used", body: "The team lead is told, so they can help or reassign.", tone: "bg-amber-500" },
  { at: 100, icon: ShieldAlert, title: "Deadline reached", body: "The ticket is marked breached and the manager is notified.", tone: "bg-rose-500" },
  { at: 125, icon: AlertTriangle, title: "Still open past the deadline", body: "It is escalated again, and appears in the daily breach report.", tone: "bg-rose-700" },
];

export function EscalationLadder() {
  const [elapsed, setElapsed] = useState(60);
  const status = elapsed >= 100 ? { label: "Breached", tone: "bg-rose-100 text-rose-700" } : elapsed >= 75 ? { label: "At risk", tone: "bg-amber-100 text-amber-700" } : { label: "On track", tone: "bg-emerald-100 text-emerald-700" };

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow="Escalation" title="Step in before the deadline, not after" intro="Drag the slider to move time forward on a ticket and see who is told at each point." />
        <div className="mx-auto mt-12 max-w-4xl rounded-3xl bg-brand-surface p-5 ring-1 ring-brand-border sm:p-8">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-bold text-brand-text">Time used: <span className="tabular-nums text-brand-purple">{elapsed}%</span> of the target</p>
            <span className={cn("rounded-full px-3 py-1 text-xs font-bold transition-colors", status.tone)}>{status.label}</span>
          </div>
          <input type="range" min={0} max={130} value={elapsed} onChange={(event) => setElapsed(Number(event.target.value))} aria-label="Time used against the target, in percent" className="mt-4 h-2 w-full cursor-pointer accent-[#6c35f5]" />
          <span className="mt-3 block h-2.5 rounded-full bg-white ring-1 ring-brand-border">
            <span className={cn("block h-full rounded-full transition-all duration-300", elapsed >= 100 ? "bg-rose-500" : elapsed >= 75 ? "bg-amber-500" : "bg-emerald-500")} style={{ width: `${Math.min(100, elapsed)}%` }} />
          </span>

          <ol className="mt-8 space-y-3">
            {ladder.map(({ at, icon: Icon, title, body, tone }) => {
              const lit = elapsed >= at;
              return (
                <li key={at} className={cn("flex items-center gap-4 rounded-2xl p-4 ring-1 transition-all duration-300", lit ? "bg-white shadow-md ring-brand-purple/30" : "bg-white/50 opacity-60 ring-brand-border")}>
                  <span className={cn("flex size-11 shrink-0 items-center justify-center rounded-xl text-white transition-colors", lit ? tone : "bg-brand-border")}>
                    {lit ? <Icon className="size-5" aria-hidden /> : <Icon className="size-5 opacity-70" aria-hidden />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold text-brand-text">{title} <span className="font-medium text-brand-muted">({at}%)</span></span>
                    <span className="block text-xs text-brand-muted">{body}</span>
                  </span>
                  {lit && <CheckCircle2 className="size-5 shrink-0 text-emerald-500" aria-hidden />}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Compliance report */

const report = {
  response: [["Urgent", 92], ["High", 88], ["Normal", 95], ["Low", 98]],
  resolution: [["Urgent", 81], ["High", 84], ["Normal", 90], ["Low", 96]],
} as const;

export function SlaReport() {
  const [metric, setMetric] = useState<"response" | "resolution">("response");
  return (
    <section className="bg-brand-surface py-16 lg:py-24">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <SectionHead eyebrow="Reporting" title="See how often you kept your promise" intro="Review compliance by priority and by target, so you can see where the team is strong and where it needs help." />
        <div className="rounded-3xl bg-white p-5 shadow-[0_30px_70px_-44px_rgba(23,22,92,0.5)] ring-1 ring-brand-border sm:p-7">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div role="group" aria-label="Target" className="inline-flex rounded-full bg-brand-surface p-0.5 ring-1 ring-brand-border">
              {(["response", "resolution"] as const).map((key) => (
                <button key={key} type="button" aria-pressed={metric === key} onClick={() => setMetric(key)} className={cn("rounded-full px-3.5 py-1.5 text-xs font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand-purple/60", metric === key ? "bg-brand-purple text-white shadow-sm" : "text-brand-muted hover:text-brand-text")}>
                  {key === "response" ? "First response" : "Resolution"}
                </button>
              ))}
            </div>
            <SampleTag />
          </div>
          <ul key={metric} className="space-y-4">
            {report[metric].map(([label, value], index) => (
              <li key={label}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="font-semibold text-brand-text">{label}</span>
                  <b className="text-brand-text tabular-nums">{value}% met</b>
                </div>
                <span className="block h-3 rounded-full bg-brand-surface">
                  <span className="demo-grow-x block h-full rounded-full bg-gradient-to-r from-violet-400 to-brand-purple" style={{ width: `${value}%`, "--d": `${index * 90}ms` } as React.CSSProperties} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
