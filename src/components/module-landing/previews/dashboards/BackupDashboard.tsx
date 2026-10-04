"use client";

import { useEffect, useState } from "react";
import { Check, History, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { PreviewFrame } from "../../PreviewFrame";
import { Chips, SectionLabel } from "./parts";

const HOURS = 24;
const scopes = {
  record: { label: "One record", size: "1 record", time: "2 seconds" },
  module: { label: "A module", size: "14,820 records", time: "1 min 20 s" },
  workspace: { label: "Workspace", size: "2.4M records", time: "38 minutes" },
} as const;
type Scope = keyof typeof scopes;
const drillSteps = [
  { label: "Detect the outage", time: "30 s" },
  { label: "Promote the replica region", time: "14 min" },
  { label: "Switch traffic over", time: "6 min" },
  { label: "Verify every service", time: "1 h 32 min" },
];

export function BackupDashboard() {
  const [mode, setMode] = useState<"restore" | "drill">("restore");
  const [snap, setSnap] = useState(HOURS - 1);
  const [scope, setScope] = useState<Scope>("module");
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          setRunning(false);
          setDone(true);
          return 100;
        }
        return current + 4;
      });
    }, 80);
    return () => clearInterval(timer);
  }, [running]);

  const hoursAgo = HOURS - 1 - snap;
  const label = hoursAgo === 0 ? "just now" : `${hoursAgo} hour${hoursAgo === 1 ? "" : "s"} ago`;
  const stage = progress < 34 ? "Validating the snapshot…" : progress < 67 ? "Copying data…" : "Verifying integrity…";
  const drillDone = mode === "drill" && done;
  const stepsShown = Math.min(drillSteps.length, Math.floor(progress / 25));

  const start = () => {
    setDone(false);
    setProgress(0);
    setRunning(true);
  };
  const insight =
    mode === "restore"
      ? done
        ? `Restored ${scopes[scope].size} from ${label} in ${scopes[scope].time}. The data was verified before it went live.`
        : running
          ? stage
          : `Restore point set to ${label}. You'd lose at most 5 minutes of changes. Press Restore to try it.`
      : done
        ? "Drill passed: full recovery in 1 h 52 min, well inside the 4-hour target. A report is saved for your auditors."
        : running
          ? "Running a disaster recovery drill in the recovery region…"
          : "A drill rehearses a full regional failure, so recovery is a practised routine and not a first attempt.";

  return (
    <PreviewFrame title="Recovery Console" period="Last 24 hours" insight={insight} badge="Backed up 5 min ago">
      <div className="mt-4 flex items-center justify-between gap-2">
        <Chips
          label="Mode"
          options={[
            { key: "restore", label: "Restore data" },
            { key: "drill", label: "DR drill" },
          ]}
          value={mode}
          onChange={(next) => {
            setMode(next);
            setRunning(false);
            setDone(false);
            setProgress(0);
          }}
        />
        <button
          type="button"
          disabled={running}
          onClick={start}
          className="flex items-center gap-1.5 rounded-lg bg-brand-purple px-3 py-1.5 text-[11px] font-semibold text-white outline-none hover:bg-brand-purple-dark focus-visible:ring-2 focus-visible:ring-brand-purple/60 disabled:opacity-40"
        >
          {mode === "restore" ? <History className="size-3.5" aria-hidden /> : <RotateCcw className="size-3.5" aria-hidden />}
          {running ? "Running…" : mode === "restore" ? "Restore" : "Run drill"}
        </button>
      </div>

      {mode === "restore" ? (
        <>
          <div className="mt-3 rounded-xl bg-brand-surface p-3">
            <div className="flex items-center justify-between">
              <SectionLabel>Pick a restore point</SectionLabel>
              <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-bold text-brand-purple ring-1 ring-brand-border">{label}</span>
            </div>
            <div className="mt-2 flex h-12 items-end gap-[3px]" role="group" aria-label="Hourly backups">
              {Array.from({ length: HOURS }, (_, index) => {
                const selected = index === snap;
                return (
                  <button
                    key={index}
                    type="button"
                    aria-pressed={selected}
                    aria-label={`Backup ${HOURS - 1 - index} hours ago`}
                    onClick={() => {
                      setSnap(index);
                      setDone(false);
                      setProgress(0);
                    }}
                    className={cn(
                      "flex-1 rounded-[3px] outline-none transition-all focus-visible:ring-2 focus-visible:ring-brand-purple/60",
                      selected ? "bg-brand-purple shadow-lg shadow-brand-purple/30" : "bg-brand-purple/30 hover:bg-brand-purple/55"
                    )}
                    style={{ height: `${index % 6 === 5 ? 100 : 62}%` }}
                  />
                );
              })}
            </div>
            <div className="mt-1 flex justify-between text-[10px] font-medium text-brand-muted">
              <span>24 h ago</span>
              <span>12 h</span>
              <span>Now</span>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] font-semibold text-brand-muted">Restore</span>
            <Chips
              label="What to restore"
              options={Object.entries(scopes).map(([key, value]) => ({ key: key as Scope, label: value.label }))}
              value={scope}
              onChange={(key) => {
                setScope(key);
                setDone(false);
                setProgress(0);
              }}
            />
          </div>

          <div className="mt-3 rounded-xl bg-white p-3 ring-1 ring-brand-border">
            {done ? (
              <p className="demo-rise flex items-center gap-2 text-[12px] font-bold text-emerald-700">
                <span className="flex size-5 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <Check className="size-3" aria-hidden />
                </span>
                Restored {scopes[scope].size} · {scopes[scope].time}
              </p>
            ) : running || progress > 0 ? (
              <>
                <p className="text-[11px] font-semibold text-brand-text">{stage}</p>
                <span className="mt-2 block h-2 overflow-hidden rounded-full bg-brand-surface">
                  <span className="block h-full rounded-full bg-brand-purple transition-all duration-100" style={{ width: `${progress}%` }} />
                </span>
              </>
            ) : (
              <p className="text-[11px] text-brand-muted">
                Ready to restore <span className="font-bold text-brand-text">{scopes[scope].size}</span> from <span className="font-bold text-brand-text">{label}</span>. Estimated {scopes[scope].time}.
              </p>
            )}
          </div>
        </>
      ) : (
        <div className="mt-3">
          <ol className="flex flex-col gap-1.5">
            {drillSteps.map((step, index) => {
              const finished = done || index < stepsShown;
              const active = running && index === stepsShown;
              return (
                <li key={step.label} className={cn("flex items-center gap-3 rounded-xl px-3 py-2 ring-1 transition-colors", finished ? "bg-emerald-50 ring-emerald-200" : active ? "bg-brand-purple-light ring-brand-purple/40" : "bg-brand-surface ring-transparent")}>
                  <span className={cn("flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold", finished ? "bg-emerald-500 text-white" : active ? "bg-brand-purple text-white" : "bg-white text-brand-muted ring-1 ring-brand-border")}>
                    {finished ? <Check className="size-3" aria-hidden /> : index + 1}
                  </span>
                  <span className="flex-1 text-[12px] font-semibold text-brand-text">{step.label}</span>
                  <span className="text-[11px] font-bold text-brand-muted tabular-nums">{step.time}</span>
                </li>
              );
            })}
          </ol>
          <div className="mt-3 rounded-xl bg-brand-surface p-3">
            <SectionLabel>Recovery time</SectionLabel>
            <div className="mt-2 grid grid-cols-[72px_1fr_56px] items-center gap-2 text-[11px]">
              <span className="font-medium text-brand-muted">Target</span>
              <span className="h-2 rounded-full bg-white">
                <span className="block h-full w-full rounded-full bg-brand-purple/30" />
              </span>
              <span className="text-right font-bold text-brand-text">4 h</span>
              <span className="font-medium text-brand-muted">This drill</span>
              <span className="h-2 rounded-full bg-white">
                <span className={cn("block h-full rounded-full bg-emerald-500 transition-all duration-500", drillDone ? "w-[47%]" : "w-0")} />
              </span>
              <span className="text-right font-bold text-brand-text">{drillDone ? "1 h 52" : "-"}</span>
            </div>
          </div>
        </div>
      )}
    </PreviewFrame>
  );
}
