"use client";

import { useEffect, useState } from "react";
import { Check, Play, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { PreviewFrame } from "../../PreviewFrame";
import { SectionLabel } from "./parts";

const stages = [
  { name: "Commit", time: "3 s" },
  { name: "Build", time: "4 m 02 s" },
  { name: "Test", time: "9 m 14 s" },
  { name: "Scan", time: "5 m 40 s" },
  { name: "Staging", time: "3 m 10 s" },
  { name: "Production", time: "6 m 30 s" },
];

function Switch({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <button type="button" role="switch" aria-checked={checked} onClick={onChange} className="flex items-center gap-2 text-[11px] font-semibold text-brand-text outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/60">
      <span className={cn("relative h-5 w-9 rounded-full transition-colors", checked ? "bg-brand-purple" : "bg-brand-border")}>
        <span className={cn("absolute top-0.5 size-4 rounded-full bg-white shadow transition-all", checked ? "left-[18px]" : "left-0.5")} />
      </span>
      {label}
    </button>
  );
}

export function DevOpsDashboard() {
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(0);
  const [failedAt, setFailedAt] = useState<number | null>(null);
  const [rejected, setRejected] = useState(false);
  const [approved, setApproved] = useState(false);
  const [needApproval, setNeedApproval] = useState(true);
  const [breakTest, setBreakTest] = useState(false);
  const [deploys, setDeploys] = useState(12);
  const awaiting = running && needApproval && !approved && step === 5;

  useEffect(() => {
    if (!running || awaiting) return;
    const timer = setTimeout(() => {
      if (step >= stages.length) {
        setRunning(false);
        setDeploys((count) => count + 1);
      } else if (step === 2 && breakTest) {
        setFailedAt(2);
        setRunning(false);
      } else {
        setStep((current) => current + 1);
      }
    }, 750);
    return () => clearTimeout(timer);
  }, [running, awaiting, step, breakTest]);

  const finished = step >= stages.length && !running;
  const status = (index: number) =>
    failedAt === index ? "failed" : rejected && index === 5 ? "rejected" : index < step ? "done" : awaiting && index === 5 ? "waiting" : running && index === step ? "running" : "idle";

  const start = () => {
    setStep(0);
    setFailedAt(null);
    setRejected(false);
    setApproved(false);
    setRunning(true);
  };

  const insight = failedAt !== null
    ? "A test failed, so the pipeline stopped before anything reached production. Nothing was deployed, and no rollback was needed."
    : rejected
      ? "Release rejected at the approval gate. The change stays in staging and nothing reached customers."
      : awaiting
        ? "Staging passed. Production needs a human sign-off, and every approval is recorded in the audit trail."
        : finished
          ? "Released to production with a gradual rollout. Health checks stayed green, and the whole run took 29 minutes."
          : running
            ? `Running: ${stages[Math.min(step, stages.length - 1)].name}…`
            : "Run the pipeline. Switch on a failing test or the approval gate to see how a change is protected.";

  return (
    <PreviewFrame title="Release Pipeline" period="Build to production" insight={insight} badge={`${deploys} deploys today`}>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
          <Switch label="Approval before production" checked={needApproval} onChange={() => setNeedApproval((value) => !value)} />
          <Switch label="Break a test" checked={breakTest} onChange={() => setBreakTest((value) => !value)} />
        </div>
        <button
          type="button"
          disabled={running}
          onClick={start}
          className="flex items-center gap-1.5 rounded-lg bg-brand-purple px-3 py-1.5 text-[11px] font-semibold text-white outline-none hover:bg-brand-purple-dark focus-visible:ring-2 focus-visible:ring-brand-purple/60 disabled:opacity-40"
        >
          <Play className="size-3 fill-current" aria-hidden /> {running ? "Running…" : finished || failedAt !== null || rejected ? "Run again" : "Run pipeline"}
        </button>
      </div>

      <ol className="mt-3 flex items-center rounded-xl bg-brand-surface px-2 py-4">
        {stages.map((stage, index) => {
          const state = status(index);
          return (
            <li key={stage.name} className="flex min-w-0 flex-1 items-center last:flex-none">
              <span className="flex w-[46px] shrink-0 flex-col items-center gap-1 sm:w-[60px]">
                <span
                  className={cn(
                    "flex size-7 items-center justify-center rounded-full text-[10px] font-bold transition-all",
                    state === "done" && "bg-emerald-500 text-white",
                    state === "running" && "bg-brand-purple text-white ring-4 ring-brand-purple/25",
                    state === "waiting" && "bg-amber-500 text-white ring-4 ring-amber-300/50",
                    (state === "failed" || state === "rejected") && "bg-red-500 text-white",
                    state === "idle" && "bg-white text-brand-muted ring-1 ring-brand-border"
                  )}
                >
                  {state === "done" ? <Check className="size-3.5" aria-hidden /> : state === "failed" || state === "rejected" ? <X className="size-3.5" aria-hidden /> : index + 1}
                </span>
                <span className="w-full truncate text-center text-[9px] font-bold text-brand-text sm:text-[10px]">{stage.name}</span>
                <span className="text-[9px] text-brand-muted">{state === "done" ? stage.time : ""}</span>
              </span>
              {index < stages.length - 1 && (
                <span className="relative mx-0.5 mb-5 h-0.5 min-w-2 flex-1 overflow-hidden rounded-full bg-brand-border">
                  <span className={cn("absolute inset-y-0 left-0 rounded-full bg-emerald-400 transition-all duration-700", step > index && failedAt === null ? "w-full" : step > index && failedAt !== null && failedAt > index ? "w-full" : "w-0")} />
                </span>
              )}
            </li>
          );
        })}
      </ol>

      {awaiting && (
        <div className="demo-rise mt-3 flex flex-wrap items-center gap-3 rounded-xl bg-amber-50 p-3 ring-1 ring-amber-300">
          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-bold text-amber-900">Approve release 4.2.1 to production?</p>
            <p className="text-[11px] text-amber-800">All checks passed on staging. Waiting for the release manager.</p>
          </div>
          <button type="button" onClick={() => setApproved(true)} className="rounded-lg bg-emerald-500 px-3 py-1.5 text-[11px] font-semibold text-white outline-none hover:bg-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-300">
            Approve
          </button>
          <button
            type="button"
            onClick={() => {
              setRejected(true);
              setRunning(false);
            }}
            className="rounded-lg bg-white px-3 py-1.5 text-[11px] font-semibold text-red-600 ring-1 ring-red-200 outline-none hover:bg-red-50 focus-visible:ring-2 focus-visible:ring-red-300"
          >
            Reject
          </button>
        </div>
      )}

      <div className="mt-3 rounded-xl bg-brand-navy p-3 font-mono">
        <SectionLabel className="text-white/50">Pipeline log</SectionLabel>
        <ul className="mt-1.5 h-[64px] space-y-0.5 overflow-hidden text-[11px]">
          {step === 0 && failedAt === null && !running && <li className="text-white/40">Waiting for a run…</li>}
          {stages.slice(0, Math.min(step, stages.length)).map((stage) => (
            <li key={stage.name} className="demo-rise truncate text-emerald-300">
              ✓ {stage.name} · {stage.time}
            </li>
          ))}
          {failedAt !== null && <li className="demo-rise text-red-400">✗ Test · 3 failures in checkout.spec · stopped</li>}
          {rejected && <li className="demo-rise text-red-400">✗ Production · rejected by approver</li>}
          {finished && <li className="demo-rise font-bold text-white">Released · 6 stages · 29 min</li>}
        </ul>
      </div>
    </PreviewFrame>
  );
}
