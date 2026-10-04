"use client";

import { useState } from "react";
import { AlarmClock, Bell, BellRing, Check, ListChecks, MailCheck, Play, RotateCcw, UserCheck, UserPlus, Workflow, Zap, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion, useTicker } from "./hooks";
import { SampleTag, SectionHead } from "./shared";

const benefits: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: MailCheck, title: "Automated follow-ups", body: "The next email or call is queued the moment a deal changes." },
  { icon: UserCheck, title: "Lead assignment", body: "New leads go to the right rep by territory or workload." },
  { icon: ListChecks, title: "Task creation", body: "Tasks appear on the rep's list with a due date, no typing." },
  { icon: AlarmClock, title: "Sales reminders", body: "Quiet deals and upcoming meetings nudge the owner in time." },
  { icon: Workflow, title: "Workflow automation", body: "Build the rules once and let every deal follow them." },
  { icon: Bell, title: "Notifications", body: "Managers hear about the deals that matter, and only those." },
];

const steps: { icon: LucideIcon; title: string; detail: string }[] = [
  { icon: UserPlus, title: "New Lead", detail: "Priya Nair from Zenith Pharma submits the website form." },
  { icon: UserCheck, title: "Assign Sales Rep", detail: "Routed to Arjun Mehta, who owns the West territory." },
  { icon: ListChecks, title: "Create Follow-up", detail: "Task created: call within 24 hours." },
  { icon: BellRing, title: "Send Reminder", detail: "Reminder set for tomorrow at 10:00 AM." },
  { icon: Zap, title: "Update Pipeline", detail: "Moved to Qualified, worth ₹1,80,000." },
  { icon: Bell, title: "Notify Manager", detail: "Summary sent to the sales manager." },
];

/** Left: what the automation covers. Right: a six-step rule you can run, replay or click through. */
export function SalesAutomation() {
  const reduced = useReducedMotion();
  const [taken, setTaken] = useState(false);
  const [tick, setTick] = useTicker(steps.length, 1100, reduced || taken, 2);
  // `done` = how many steps have completed.
  const done = reduced && !taken ? steps.length : Math.min(tick, steps.length);
  const complete = done >= steps.length;

  const replay = () => {
    setTaken(false);
    setTick(0);
  };

  return (
    <section id="automation" className="scroll-mt-24 bg-brand-surface py-16 lg:py-24">
      <div className="container-page grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
        <div>
          <SectionHead eyebrow="Sales Automation" title="Automate the Work. Focus on Selling." intro="Reps lose hours to follow-ups, hand-offs and status updates. SortBoxs does that busywork for them, so every lead is handled the same fast, consistent way." />
          <ul className="mt-9 grid gap-x-6 gap-y-6 sm:grid-cols-2">
            {benefits.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex gap-3.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-brand-purple shadow-sm ring-1 ring-brand-border">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-brand-text">{title}</h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-brand-muted">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl bg-brand-navy p-5 shadow-[0_30px_60px_-30px_rgba(23,22,92,0.7)] sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-xl bg-brand-purple text-white">
                <Workflow className="size-4.5" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-bold text-white">New lead automation</p>
                <p className="text-[11px] text-white/60">When a lead arrives, run these steps</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <SampleTag dark />
              <button
                type="button"
                onClick={replay}
                className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white outline-none hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/70"
              >
                {complete ? <RotateCcw className="size-3.5" aria-hidden /> : <Play className="size-3.5" aria-hidden />}
                {complete ? "Replay" : "Restart"}
              </button>
            </div>
          </div>

          <ol className="mt-6">
            {steps.map(({ icon: Icon, title, detail }, index) => {
              const isDone = index < done;
              const isActive = index === done && !complete;
              return (
                <li key={title} className="relative">
                  <button
                    type="button"
                    aria-label={`${title}: ${detail}`}
                    aria-current={isActive ? "step" : undefined}
                    onClick={() => {
                      setTaken(true);
                      setTick(index + 1);
                    }}
                    className={cn("flex w-full items-start gap-4 rounded-xl p-2 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-white/70", isActive ? "bg-white/10" : "hover:bg-white/5")}
                  >
                    <span className="relative flex flex-col items-center self-stretch">
                      <span
                        className={cn(
                          "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full transition-colors duration-500",
                          isDone ? "bg-emerald-400 text-brand-navy" : isActive ? "bg-brand-purple text-white shadow-[0_0_0_6px_rgba(108,53,245,0.3)]" : "bg-white/10 text-white/60"
                        )}
                      >
                        {isDone ? <Check className="size-5" strokeWidth={3} aria-hidden /> : <Icon className="size-5" aria-hidden />}
                      </span>
                      {index < steps.length - 1 && <span aria-hidden className={cn("-mb-2 w-0.5 flex-1 transition-colors duration-500", index < done ? "bg-emerald-400/70" : "bg-white/15")} />}
                    </span>
                    <span className="min-w-0 pt-1 pb-3">
                      <span className={cn("block text-sm font-bold transition-colors", isDone || isActive ? "text-white" : "text-white/55")}>
                        <span className="mr-2 text-white/40">{index + 1}</span>
                        {title}
                      </span>
                      <span className={cn("mt-0.5 block text-[13px] leading-snug transition-colors", isDone || isActive ? "text-white/75" : "text-white/35")}>{detail}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <p className={cn("mt-2 rounded-xl px-4 py-3 text-sm font-semibold transition-colors duration-500", complete ? "bg-emerald-400/15 text-emerald-300" : "bg-white/5 text-white/50")}>
            {complete ? "Done in seconds, with nothing typed by hand." : "Select any step to jump to it."}
          </p>
        </div>
      </div>
    </section>
  );
}
