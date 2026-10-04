"use client";

import { Bell, Check, GitBranch, ListChecks, Mail, UserCheck, Zap, type LucideIcon, Workflow } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion, useTicker } from "@/components/sales-solution/hooks";
import { SampleTag } from "@/components/sales-solution/shared";
import { Crumbs, HeroCopy } from "../parts";

const nodes: { icon: LucideIcon; kind: string; title: string; detail: string; log: string; tone: string }[] = [
  { icon: Zap, kind: "Trigger", title: "Lead captured", detail: "Website form", log: "Lead captured: Priya Nair, Zenith Pharma", tone: "bg-amber-100 text-amber-700" },
  { icon: GitBranch, kind: "Condition", title: "Lead score is 60 or more?", detail: "Yes: continue. No: nurture", log: "Score 78, so the lead is qualified", tone: "bg-sky-100 text-sky-700" },
  { icon: UserCheck, kind: "Action", title: "Assign sales rep", detail: "By territory", log: "Assigned to Arjun Mehta (West)", tone: "bg-violet-100 text-violet-700" },
  { icon: Mail, kind: "Action", title: "Send intro email", detail: "Template: Welcome", log: "Intro email sent from Arjun's inbox", tone: "bg-emerald-100 text-emerald-700" },
  { icon: ListChecks, kind: "Action", title: "Create follow-up task", detail: "Call within 24 hours", log: "Task created for tomorrow, 10:00 AM", tone: "bg-rose-100 text-rose-700" },
];

/** The workflow canvas: five nodes lit in turn, with a run log filling in beside them. */
function WorkflowCanvas() {
  const reduced = useReducedMotion();
  const [tick] = useTicker(nodes.length, 1300, reduced, 2);
  const done = reduced ? nodes.length : Math.min(tick, nodes.length);

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
            <p className="text-sm font-bold text-brand-text">New lead follow-up</p>
          </div>
          <div className="flex items-center gap-2">
            <SampleTag />
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
              <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden /> Active
            </span>
          </div>
        </div>

        <div className="grid gap-0 sm:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
          <ol className="p-4 sm:p-5" aria-label="Workflow steps">
            {nodes.map(({ icon: Icon, kind, title, detail, tone }, index) => {
              const isDone = index < done;
              const isActive = index === done && !reduced && done < nodes.length;
              return (
                <li key={title}>
                  <div className={cn("flex items-center gap-3 rounded-xl p-2.5 ring-1 transition-all duration-500", isActive ? "scale-[1.02] bg-brand-purple-light ring-2 ring-brand-purple" : isDone ? "bg-white ring-emerald-200" : "bg-white opacity-60 ring-brand-border")}>
                    <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-lg", tone)}>
                      {isDone ? <Check className="size-4" strokeWidth={3} aria-hidden /> : <Icon className="size-4" aria-hidden />}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[10px] font-bold tracking-wide text-brand-muted uppercase">{kind}</span>
                      <span className="block text-[13px] leading-tight font-bold text-brand-text">{title}</span>
                      <span className="block text-[11px] text-brand-muted">{detail}</span>
                    </span>
                  </div>
                  {index < nodes.length - 1 && (
                    <span aria-hidden className={cn("ml-[26px] block h-3 w-0.5 rounded-full transition-colors duration-500", index < done - 1 || reduced ? "bg-emerald-400" : "bg-brand-border")} />
                  )}
                </li>
              );
            })}
          </ol>

          <div className="border-t border-brand-border bg-brand-navy p-4 text-white sm:border-t-0 sm:border-l sm:p-5">
            <p className="flex items-center gap-2 text-[11px] font-bold tracking-wide text-violet-300 uppercase">
              <Bell className="size-3.5" aria-hidden /> Run log
            </p>
            <ol className="mt-3 space-y-2.5">
              {nodes.map((node, index) => (
                <li key={node.log} className={cn("flex gap-2.5 text-[12px] leading-snug transition-opacity duration-500", index < done ? "opacity-100" : "opacity-0")}>
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-emerald-400" aria-hidden />
                  <span className="text-white/85">{node.log}</span>
                </li>
              ))}
            </ol>
            <p className={cn("mt-4 rounded-lg bg-white/10 px-3 py-2 text-[11px] font-semibold transition-opacity duration-500", done >= nodes.length ? "opacity-100" : "opacity-0")}>
              Finished in seconds. Nobody typed a thing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AutomationHero() {
  return (
    <section className="overflow-hidden bg-[linear-gradient(180deg,#f4f1ff_0%,#faf9ff_100%)]">
      <div className="container-page grid items-center gap-12 pt-8 pb-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12 lg:pt-10 lg:pb-16">
        <div>
          <Crumbs current="Sales Automation" />
          <HeroCopy
            icon={Workflow}
            iconTone="bg-violet-100 text-violet-700"
            eyebrow="Sales Automation"
            title="Automate Your Sales Process."
            highlight="Close More Deals."
            description="Automate repetitive sales activities, follow-ups, reminders and workflows so your sales team can focus on conversations and revenue."
          />
        </div>
        <WorkflowCanvas />
      </div>
    </section>
  );
}
