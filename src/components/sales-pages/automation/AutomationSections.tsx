"use client";

import { useState } from "react";
import { ArrowRight, Bell, CalendarClock, Check, Clock, Mail, ListChecks, MailCheck, Phone, Reply, Sparkles, TrendingUp, UserCheck, UserPlus, Workflow, Activity, AlarmClock, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion, useTicker } from "@/components/sales-solution/hooks";
import { SampleTag, SectionHead } from "@/components/sales-solution/shared";

/* ---------------------------------------------------------------- Rule builder */

const steps: { icon: LucideIcon; label: string; when: string; then: string; result: string }[] = [
  { icon: UserPlus, label: "Lead Captured", when: "A form, email or import creates a lead.", then: "Record the source and create the lead.", result: "The lead appears in the pipeline with its source attached." },
  { icon: Sparkles, label: "Lead Qualified", when: "A lead's score or fit matches your rules.", then: "Mark it Qualified and choose an owner by territory or workload.", result: "Priya Nair is qualified and assigned to Arjun Mehta." },
  { icon: Mail, label: "Follow-up", when: "A qualified lead is assigned.", then: "Send the intro email from the owner's own inbox.", result: "The email goes out and is logged on the lead record." },
  { icon: ListChecks, label: "Task Created", when: "The intro email is sent.", then: "Create a call task due in 24 hours.", result: "A task lands on Arjun's list for tomorrow at 10:00 AM." },
  { icon: AlarmClock, label: "Reminder", when: "A task is due soon, or a lead goes quiet.", then: "Remind the owner, and tell the manager if it is still open.", result: "A reminder is sent. The manager hears about it after two days." },
  { icon: TrendingUp, label: "Deal Progression", when: "The lead replies or a meeting is booked.", then: "Move the deal to the next stage and refresh the forecast.", result: "The deal moves to Proposal and the forecast updates." },
];

export function RuleBuilder() {
  const reduced = useReducedMotion();
  const [taken, setTaken] = useState(false);
  const [tick, setTick] = useTicker(steps.length, 2600, reduced || taken, 0);
  const active = reduced && !taken ? 0 : tick;
  const current = steps[active];

  return (
    <section className="bg-brand-surface py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow="Example workflow" title="From Lead Captured to Deal Progression" intro="One rule set carries a lead through six steps. Select any step to see what triggers it and what it does." />

        <ol aria-label="Sales automation workflow" className="relative mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-6 lg:gap-0">
          <span aria-hidden className="absolute top-[34px] right-[8.33%] left-[8.33%] hidden h-0.5 bg-brand-purple/20 lg:block" />
          {steps.map(({ icon: Icon, label }, index) => {
            const isActive = index === active;
            const isDone = index < active;
            return (
              <li key={label} className="relative flex lg:justify-center">
                <button
                  type="button"
                  aria-current={isActive ? "step" : undefined}
                  onClick={() => {
                    setTaken(true);
                    setTick(index);
                  }}
                  className="group flex w-full items-center gap-3 rounded-2xl p-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-brand-purple lg:w-auto lg:flex-col lg:gap-3 lg:px-3 lg:text-center"
                >
                  <span className={cn("relative flex size-[68px] shrink-0 items-center justify-center rounded-2xl ring-4 ring-brand-surface transition-all duration-300", isActive ? "scale-105 bg-brand-purple text-white shadow-lg shadow-brand-purple/30" : isDone ? "bg-emerald-500 text-white" : "bg-white text-brand-purple shadow-sm group-hover:bg-brand-purple-light")}>
                    {isDone ? <Check className="size-6" strokeWidth={3} aria-hidden /> : <Icon className="size-6" aria-hidden />}
                    <span className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-white text-xs font-bold text-brand-purple ring-1 ring-brand-border">{index + 1}</span>
                  </span>
                  <span className={cn("text-sm font-bold transition-colors", isActive ? "text-brand-purple" : "text-brand-text")}>{label}</span>
                </button>
              </li>
            );
          })}
        </ol>

        <div key={active} className="demo-rise mx-auto mt-10 max-w-4xl rounded-3xl bg-white p-5 shadow-[0_30px_60px_-40px_rgba(23,22,92,0.5)] ring-1 ring-brand-border sm:p-7">
          <div className="mb-5 flex items-center justify-between gap-3">
            <p className="flex items-center gap-2 text-sm font-bold text-brand-text">
              <current.icon className="size-4.5 text-brand-purple" aria-hidden /> Step {active + 1}: {current.label}
            </p>
            <SampleTag />
          </div>
          <div className="grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
            {[
              { head: "When", body: current.when, tone: "bg-amber-50 ring-amber-200 text-amber-800" },
              { head: "Then", body: current.then, tone: "bg-violet-50 ring-violet-200 text-violet-800" },
              { head: "Result", body: current.result, tone: "bg-emerald-50 ring-emerald-200 text-emerald-800" },
            ].map((block, index) => (
              <div key={block.head} className="contents">
                <div className={cn("rounded-2xl p-4 ring-1", block.tone)}>
                  <p className="text-[11px] font-extrabold tracking-wide uppercase">{block.head}</p>
                  <p className="mt-1.5 text-sm leading-relaxed font-medium text-brand-text">{block.body}</p>
                </div>
                {index < 2 && <ArrowRight className="mx-auto hidden size-5 self-center text-brand-purple md:block" aria-hidden />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Rules library (capabilities) */

const rules: { icon: LucideIcon; title: string; body: string; on: boolean }[] = [
  { icon: MailCheck, title: "Automated follow-ups", body: "Queue the next touch the moment a deal changes.", on: true },
  { icon: Mail, title: "Email automation", body: "Send templated emails from the owner's own inbox.", on: true },
  { icon: ListChecks, title: "Task automation", body: "Create tasks with due dates, no typing.", on: true },
  { icon: UserCheck, title: "Lead assignment", body: "Route by territory, round robin or workload.", on: true },
  { icon: AlarmClock, title: "Sales reminders", body: "Nudge owners about quiet deals and meetings.", on: true },
  { icon: Workflow, title: "Workflow automation", body: "Chain triggers, conditions and actions together.", on: false },
  { icon: Activity, title: "Activity tracking", body: "Log every email, call and task on the record.", on: true },
  { icon: Bell, title: "Automated notifications", body: "Tell managers about the deals that need them.", on: false },
];

export function RulesLibrary() {
  const [state, setState] = useState(rules.map((rule) => rule.on));
  const active = state.filter(Boolean).length;

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-page grid items-start gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.3fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28">
          <SectionHead eyebrow="Automation capabilities" title="Switch on the rules your team needs" intro="Eight building blocks cover most day-to-day sales admin. Turn each one on or off to see how a rule set feels." />
          <div className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-brand-purple-light px-5 py-4">
            <span className="text-4xl font-extrabold text-brand-purple tabular-nums">{active}</span>
            <span className="text-sm font-semibold text-brand-text">
              of {rules.length} rules
              <br />
              switched on
            </span>
          </div>
        </div>

        <ul className="divide-y divide-brand-border overflow-hidden rounded-3xl bg-white shadow-[0_30px_60px_-40px_rgba(23,22,92,0.45)] ring-1 ring-brand-border">
          {rules.map(({ icon: Icon, title, body }, index) => (
            <li key={title} className="flex items-center gap-4 p-4 sm:p-5">
              <span className={cn("flex size-11 shrink-0 items-center justify-center rounded-xl transition-colors", state[index] ? "bg-brand-purple text-white" : "bg-brand-surface text-brand-muted")}>
                <Icon className="size-5" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-[15px] font-bold text-brand-text">{title}</h3>
                <p className="text-sm text-brand-muted">{body}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={state[index]}
                aria-label={title}
                onClick={() => setState((current) => current.map((value, i) => (i === index ? !value : value)))}
                className={cn("relative h-7 w-12 shrink-0 rounded-full outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2", state[index] ? "bg-brand-purple" : "bg-brand-border")}
              >
                <span className={cn("absolute top-1 left-1 size-5 rounded-full bg-white shadow transition-transform", state[index] && "translate-x-5")} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Follow-up timeline (activity tracking) */

const timeline: { when: string; icon: LucideIcon; title: string; who: "Automated" | "Rep" | "Customer"; tone: string }[] = [
  { when: "Day 0, 09:12", icon: UserPlus, title: "Lead captured from the website form", who: "Automated", tone: "bg-sky-100 text-sky-700" },
  { when: "Day 0, 09:12", icon: UserCheck, title: "Assigned to Arjun Mehta, West territory", who: "Automated", tone: "bg-violet-100 text-violet-700" },
  { when: "Day 0, 09:13", icon: Mail, title: "Intro email sent from Arjun's inbox", who: "Automated", tone: "bg-emerald-100 text-emerald-700" },
  { when: "Day 1, 10:00", icon: Phone, title: "Discovery call completed", who: "Rep", tone: "bg-amber-100 text-amber-700" },
  { when: "Day 3, 10:00", icon: AlarmClock, title: "Reminder: no reply to the proposal yet", who: "Automated", tone: "bg-rose-100 text-rose-700" },
  { when: "Day 4, 15:40", icon: Reply, title: "Priya replied and booked a meeting", who: "Customer", tone: "bg-indigo-100 text-indigo-700" },
  { when: "Day 4, 15:41", icon: TrendingUp, title: "Deal moved to Proposal, forecast updated", who: "Automated", tone: "bg-brand-purple-light text-brand-purple" },
];

export function FollowUpTimeline() {
  const automated = timeline.filter((item) => item.who === "Automated").length;
  return (
    <section className="bg-[linear-gradient(180deg,#f4f1ff_0%,#ffffff_100%)] py-16 lg:py-24">
      <div className="container-page grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
        <div>
          <SectionHead eyebrow="Follow-up timeline" title="Every touch logged, every follow-up on time" intro="Automation does the routine steps and records them. Reps spend their time on the calls and meetings that move a deal." />
          <dl className="mt-8 grid grid-cols-3 gap-3">
            {[
              [automated, "Automated steps"],
              [timeline.filter((item) => item.who === "Rep").length, "Rep conversations"],
              [timeline.filter((item) => item.who === "Customer").length, "Customer reply"],
            ].map(([value, label]) => (
              <div key={label as string} className="rounded-2xl bg-white p-4 text-center ring-1 ring-brand-border">
                <dd className="text-3xl font-extrabold text-brand-purple tabular-nums">{value}</dd>
                <dt className="mt-1 text-xs text-brand-muted">{label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-3xl bg-white p-5 shadow-[0_30px_60px_-40px_rgba(23,22,92,0.5)] ring-1 ring-brand-border sm:p-7">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-brand-muted">Lead activity</p>
              <p className="text-lg font-extrabold text-brand-text">Priya Nair, Zenith Pharma</p>
            </div>
            <SampleTag />
          </div>
          <ol className="relative space-y-4">
            <span aria-hidden className="absolute top-2 bottom-2 left-[19px] w-0.5 bg-brand-border" />
            {timeline.map(({ when, icon: Icon, title, who, tone }, index) => (
              <li key={title} className="demo-rise relative flex gap-4" style={{ "--d": `${index * 90}ms` } as React.CSSProperties}>
                <span className={cn("relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full ring-4 ring-white", tone)}>
                  <Icon className="size-4.5" aria-hidden />
                </span>
                <div className="min-w-0 pt-0.5">
                  <p className="text-sm font-semibold text-brand-text">{title}</p>
                  <p className="mt-0.5 flex items-center gap-2 text-xs text-brand-muted">
                    <Clock className="size-3" aria-hidden /> {when}
                    <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold", who === "Automated" ? "bg-brand-purple-light text-brand-purple" : "bg-brand-surface text-brand-muted")}>{who}</span>
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Sales productivity */

const handled = ["Log the new lead and its source", "Pick the right owner", "Send the intro email", "Create the follow-up task", "Remind everyone about quiet deals", "Update the pipeline and forecast"];
const kept = ["Talk to the customer", "Understand what they need", "Shape the proposal", "Negotiate and close"];

export function SalesProductivity() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow="Sales productivity" title="Hand the admin to SortBoxs. Keep the selling." intro="Here is how a rep's routine splits once the repetitive steps are automated." />
        <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-[1.2fr_1fr]">
          <div className="rounded-3xl bg-brand-navy p-6 text-white sm:p-8">
            <p className="flex items-center gap-2 text-sm font-bold text-violet-300">
              <Workflow className="size-4.5" aria-hidden /> Handled by SortBoxs
            </p>
            <ul className="mt-5 space-y-3.5">
              {handled.map((item, index) => (
                <li key={item} className="about-rise flex items-center gap-3 text-sm" style={{ "--d": `${index * 60}ms` } as React.CSSProperties}>
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-brand-navy">
                    <Check className="size-3.5" strokeWidth={3} aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-brand-purple-light p-6 ring-1 ring-brand-purple/15 sm:p-8">
            <p className="flex items-center gap-2 text-sm font-bold text-brand-purple">
              <CalendarClock className="size-4.5" aria-hidden /> Kept for the rep
            </p>
            <ul className="mt-5 space-y-3.5">
              {kept.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm font-semibold text-brand-text">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-purple text-white">
                    <Sparkles className="size-3.5" aria-hidden />
                  </span>
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
