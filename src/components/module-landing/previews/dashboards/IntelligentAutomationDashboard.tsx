"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { PreviewFrame } from "../../PreviewFrame";
import { SectionLabel } from "./parts";

const steps = [
  { name: "Receive bill", days: 0.5, autoDays: 0.1, work: 3, autoWork: 0.5, how: "Read it with Vision", auto: true },
  { name: "Data entry", days: 1.5, autoDays: 0.1, work: 12, autoWork: 1, how: "Fill fields automatically", auto: true },
  { name: "Approval wait", days: 4, autoDays: 0.5, work: 6, autoWork: 1, how: "Route by amount, with reminders", auto: true },
  { name: "Match to PO", days: 1, autoDays: 0.1, work: 8, autoWork: 1, how: "Match lines automatically", auto: true },
  { name: "Payment run", days: 2.5, autoDays: 2.5, work: 5, autoWork: 5, how: "A person releases the funds", auto: false },
];
const PER_MONTH = 210;
const colors = ["bg-sky-400", "bg-violet-400", "bg-red-400", "bg-amber-400", "bg-emerald-400"];

export function IntelligentAutomationDashboard() {
  const [on, setOn] = useState<boolean[]>(steps.map(() => false));
  const [message, setMessage] = useState<string | null>(null);

  const days = (index: number) => (on[index] ? steps[index].autoDays : steps[index].days);
  const cycle = Math.round(steps.reduce((sum, _, index) => sum + days(index), 0) * 10) / 10;
  const baseline = steps.reduce((sum, step) => sum + step.days, 0);
  const work = steps.reduce((sum, step, index) => sum + (on[index] ? step.autoWork : step.work), 0);
  const baseWork = steps.reduce((sum, step) => sum + step.work, 0);
  const hours = Math.round(((baseWork - work) * PER_MONTH) / 60);
  const automated = on.filter(Boolean).length;
  const bottleneck = steps.reduce((best, _, index) => (days(index) > days(best) ? index : best), 0);
  const cut = Math.round(((baseline - cycle) / baseline) * 100);

  const toggle = (index: number) => {
    const next = on.map((value, i) => (i === index ? !value : value));
    setOn(next);
    setMessage(
      next[index]
        ? `${steps[index].name} automated (${steps[index].how.toLowerCase()}). It saves ${(steps[index].days - steps[index].autoDays).toFixed(1)} days per invoice.`
        : `${steps[index].name} is manual again. Cycle time goes back up.`
    );
  };

  return (
    <PreviewFrame
      title="Process Explorer"
      period="Invoice to payment"
      insight={message ?? `The biggest delay is “${steps[bottleneck].name}” at ${days(bottleneck)} days. Automating it is the best place to start.`}
      badge={`${automated} of 4 steps automated`}
    >
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="rounded-xl bg-gradient-to-br from-brand-purple to-[#4c1fc7] px-3 py-2 text-white shadow-lg shadow-brand-purple/25">
          <p className="text-[10px] font-semibold text-white/75">Cycle time</p>
          <p key={cycle} className="demo-rise text-lg font-extrabold">{cycle} days</p>
        </div>
        <div className="rounded-xl bg-brand-surface px-3 py-2">
          <p className="text-[10px] font-semibold text-brand-muted">Faster by</p>
          <p key={cut} className="demo-rise text-lg font-extrabold text-emerald-600">{cut}%</p>
        </div>
        <div className="rounded-xl bg-brand-surface px-3 py-2">
          <p className="text-[10px] font-semibold text-brand-muted">Hours saved / mo</p>
          <p key={hours} className="demo-rise text-lg font-extrabold text-brand-text">{hours}</p>
        </div>
      </div>

      <div className="mt-3 rounded-xl bg-brand-surface p-3">
        <SectionLabel>Where the time goes</SectionLabel>
        <div className="mt-2 flex h-7 gap-0.5 overflow-hidden rounded-lg" role="img" aria-label={`Cycle time ${cycle} days`}>
          {steps.map((step, index) => (
            <span
              key={step.name}
              className={cn(
                "flex min-w-[6px] items-center justify-center overflow-hidden text-[9px] font-bold text-white transition-all duration-500",
                colors[index],
                index === bottleneck && "ring-2 ring-inset ring-white/70"
              )}
              style={{ width: `${(days(index) / baseline) * 100}%` }}
              title={`${step.name}: ${days(index)} days`}
            >
              {days(index) >= 1.4 ? `${days(index)}d` : ""}
            </span>
          ))}
        </div>
      </div>

      <ul className="mt-3 flex flex-col gap-1.5">
        {steps.map((step, index) => (
          <li key={step.name} className="flex items-center gap-3 rounded-xl bg-brand-surface px-3 py-2">
            <span className={cn("size-2.5 shrink-0 rounded-full", colors[index])} aria-hidden />
            <span className="min-w-0 flex-1 leading-tight">
              <span className="flex flex-wrap items-center gap-1.5 text-[12px] font-semibold text-brand-text">
                {step.name}
                {index === bottleneck && <span className="rounded-full bg-red-100 px-1.5 py-0.5 text-[10px] font-bold text-red-700">Bottleneck</span>}
              </span>
              <span className="block truncate text-[10px] text-brand-muted">{step.auto ? step.how : "Stays manual by design"}</span>
            </span>
            <span className="w-[74px] text-right text-[11px] font-bold tabular-nums text-brand-text">
              {on[index] ? <span className="text-emerald-600">{step.autoDays}d</span> : `${step.days}d`}
            </span>
            {step.auto ? (
              <button
                type="button"
                role="switch"
                aria-checked={on[index]}
                aria-label={`Automate ${step.name}`}
                onClick={() => toggle(index)}
                className="relative h-5 w-9 shrink-0 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/60"
              >
                <span className={cn("absolute inset-0 rounded-full transition-colors", on[index] ? "bg-emerald-500" : "bg-brand-border")} />
                <span className={cn("absolute top-0.5 size-4 rounded-full bg-white shadow transition-all", on[index] ? "left-[18px]" : "left-0.5")} />
              </button>
            ) : (
              <span className="w-9 shrink-0 text-center text-[10px] font-semibold text-brand-muted">Keep</span>
            )}
          </li>
        ))}
      </ul>
    </PreviewFrame>
  );
}
