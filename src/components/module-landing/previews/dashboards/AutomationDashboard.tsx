"use client";

import { useEffect, useState } from "react";
import { BellRing, Check, GitBranch, Mail, Play, UserCheck, Zap, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { PreviewFrame } from "../../PreviewFrame";
import { SectionLabel } from "./parts";

const nodes: { icon: LucideIcon; kind: string; label: string; log: string }[] = [
  { icon: Zap, kind: "Trigger", label: "New lead", log: "Lead “Aurora Textiles” created" },
  { icon: GitBranch, kind: "Condition", label: "Region = West", log: "Region is West: yes" },
  { icon: UserCheck, kind: "Action", label: "Assign owner", log: "Assigned to Anita Rao" },
  { icon: Mail, kind: "Action", label: "Welcome email", log: "Welcome email sent" },
  { icon: BellRing, kind: "Action", label: "Notify team", log: "Posted to #sales-west" },
];

export function AutomationDashboard() {
  const [enabled, setEnabled] = useState(true);
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(-1);
  const [runs, setRuns] = useState(1860);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!running) return;
    if (step >= nodes.length) {
      const done = setTimeout(() => {
        setRunning(false);
        setFinished(true);
        setRuns((current) => current + 1);
      }, 500);
      return () => clearTimeout(done);
    }
    const next = setTimeout(() => setStep((current) => current + 1), 800);
    return () => clearTimeout(next);
  }, [running, step]);

  const start = () => {
    setFinished(false);
    setStep(0);
    setRunning(true);
  };

  const insight = running
    ? `Running: ${nodes[Math.min(step, nodes.length - 1)].kind.toLowerCase()} "${nodes[Math.min(step, nodes.length - 1)].label}"…`
    : finished
      ? "Test run passed in 4.0s. Publish it so every new West lead is handled automatically?"
      : enabled
        ? "This workflow routed 212 leads this week. Press Run test to watch it go."
        : "This workflow is paused. Turn it on to handle new leads automatically.";

  return (
    <PreviewFrame title="Workflow Canvas" period="New lead routing" insight={insight} badge="98% of runs succeeded">
      <div className="mt-4 flex items-center justify-between gap-2">
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          onClick={() => setEnabled((current) => !current)}
          className="flex items-center gap-2 rounded-full text-[11px] font-semibold text-brand-text outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/60"
        >
          <span className={cn("relative h-5 w-9 rounded-full transition-colors", enabled ? "bg-emerald-500" : "bg-brand-border")}>
            <span className={cn("absolute top-0.5 size-4 rounded-full bg-white shadow transition-all", enabled ? "left-[18px]" : "left-0.5")} />
          </span>
          {enabled ? "Active" : "Paused"}
        </button>
        <button
          type="button"
          disabled={!enabled || running}
          onClick={start}
          className="flex items-center gap-1.5 rounded-lg bg-brand-purple px-3 py-1.5 text-[11px] font-semibold text-white outline-none hover:bg-brand-purple-dark focus-visible:ring-2 focus-visible:ring-brand-purple/60 disabled:opacity-40"
        >
          <Play className="size-3 fill-current" aria-hidden /> {running ? "Running…" : "Run test"}
        </button>
      </div>

      <div className={cn("mt-3 rounded-xl bg-brand-surface bg-[radial-gradient(circle,rgba(108,53,245,0.12)_1px,transparent_1px)] [background-size:14px_14px] px-2 py-4 transition-opacity", !enabled && "opacity-50 grayscale")}>
        <ol className="flex items-center">
          {nodes.map(({ icon: Icon, kind, label }, index) => {
            const done = step > index;
            const active = running && step === index;
            return (
              <li key={label} className="flex min-w-0 flex-1 items-center last:flex-none">
                <span
                  className={cn(
                    "flex w-[58px] shrink-0 flex-col items-center gap-1 rounded-xl bg-white px-1 py-2 text-center ring-1 transition-all sm:w-[78px]",
                    active ? "scale-110 shadow-lg shadow-brand-purple/30 ring-2 ring-brand-purple" : done ? "ring-emerald-300" : "ring-brand-border"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-7 items-center justify-center rounded-lg transition-colors",
                      done ? "bg-emerald-500 text-white" : active ? "bg-brand-purple text-white" : "bg-brand-purple-light text-brand-purple"
                    )}
                  >
                    {done ? <Check className="size-3.5" aria-hidden /> : <Icon className="size-3.5" aria-hidden />}
                  </span>
                  <span className="text-[9px] font-bold tracking-wide text-brand-muted uppercase">{kind}</span>
                  <span className="w-full truncate text-[10px] leading-tight font-semibold text-brand-text">{label}</span>
                </span>
                {index < nodes.length - 1 && (
                  <span className="relative mx-0.5 h-0.5 min-w-2 flex-1 overflow-hidden rounded-full bg-brand-border">
                    <span className={cn("absolute inset-y-0 left-0 rounded-full bg-emerald-400 transition-all duration-700", step > index ? "w-full" : "w-0")} />
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-3 grid grid-cols-[1fr_auto] gap-3">
        <div className="rounded-xl bg-brand-navy p-3 font-mono">
          <SectionLabel className="text-white/50">Run log</SectionLabel>
          <ul className="mt-1.5 h-[60px] space-y-0.5 overflow-hidden text-[11px] text-emerald-300">
            {step <= 0 && !finished && <li className="text-white/40">Waiting for a run…</li>}
            {nodes.slice(0, Math.max(0, Math.min(step, nodes.length))).map((node, index) => (
              <li key={node.log} className="demo-rise truncate">
                <span className="text-white/40">0{index + 1}</span> ✓ {node.log}
              </li>
            ))}
            {finished && <li className="demo-rise font-bold text-white">Done · 5 steps · 4.0s</li>}
          </ul>
        </div>
        <dl className="flex flex-col justify-between gap-2 text-center">
          {[
            ["Runs", runs.toLocaleString("en-IN")],
            ["Success", "98%"],
            ["Avg. time", "3.8s"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg bg-brand-surface px-3 py-1.5">
              <dt className="text-[10px] font-semibold text-brand-muted">{label}</dt>
              <dd className="text-sm font-extrabold text-brand-text">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </PreviewFrame>
  );
}
