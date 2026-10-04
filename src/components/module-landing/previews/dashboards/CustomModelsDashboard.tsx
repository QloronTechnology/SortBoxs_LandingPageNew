"use client";

import { useEffect, useState } from "react";
import { Check, FlaskConical, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import { PreviewFrame } from "../../PreviewFrame";
import { Chips, SectionLabel } from "./parts";

const goals = {
  churn: { label: "Churn", rows: "18,240", final: 87, prev: 79, endpoint: "/models/churn-v3", features: [["Usage drop", 71], ["Support complaints", 54], ["Contract age", 33]] },
  tickets: { label: "Ticket type", rows: "64,300", final: 94, prev: 88, endpoint: "/models/ticket-type-v3", features: [["Subject keywords", 76], ["Customer plan", 41], ["Channel", 22]] },
  late: { label: "Late payment", rows: "9,860", final: 84, prev: 78, endpoint: "/models/late-pay-v3", features: [["Payment history", 80], ["Invoice size", 46], ["Customer age", 28]] },
} as const;
type GoalKey = keyof typeof goals;
const EPOCHS = 12;
const loss = (epoch: number) => 0.92 * Math.exp(-0.27 * epoch) + 0.1;

export function CustomModelsDashboard() {
  const [goalKey, setGoalKey] = useState<GoalKey>("churn");
  const [epoch, setEpoch] = useState(0);
  const [training, setTraining] = useState(false);
  const [deployed, setDeployed] = useState(false);
  const goal = goals[goalKey];

  useEffect(() => {
    if (!training) return;
    const timer = setTimeout(() => {
      if (epoch >= EPOCHS) setTraining(false);
      else setEpoch((current) => current + 1);
    }, 330);
    return () => clearTimeout(timer);
  }, [training, epoch]);

  const done = epoch >= EPOCHS && !training;
  const accuracy = epoch === 0 ? 0 : epoch >= EPOCHS ? goal.final : Math.round(50 + (goal.final - 50) * (1 - Math.exp(-0.32 * epoch)));
  const points = Array.from({ length: epoch + 1 }, (_, index) => `${index === 0 ? "M" : "L"}${((index / EPOCHS) * 100).toFixed(1)} ${(36 - ((loss(index) - 0.1) / 0.92) * 30).toFixed(1)}`).join(" ");

  const insight = deployed
    ? `Version 3 is live at ${goal.endpoint}. It answers in about 38 ms and is available to workflows, reports and agents.`
    : done
      ? `Training finished at ${goal.final}% accuracy, up from ${goal.prev}% for version 2. Deploy it when you're happy.`
      : training
        ? `Training on ${goal.rows} records. Epoch ${epoch} of ${EPOCHS}.`
        : "Pick what to predict, then train a model on your own data. Nothing leaves your organisation.";

  return (
    <PreviewFrame title="Model Studio" period="Trained on your data" insight={insight} badge="Private to your organisation">
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <Chips
          label="Model goal"
          options={Object.entries(goals).map(([key, value]) => ({ key: key as GoalKey, label: value.label }))}
          value={goalKey}
          onChange={(key) => {
            setGoalKey(key);
            setEpoch(0);
            setTraining(false);
            setDeployed(false);
          }}
        />
        <div className="flex gap-1.5">
          <button
            type="button"
            disabled={training}
            onClick={() => {
              setEpoch(0);
              setDeployed(false);
              setTraining(true);
            }}
            className="flex items-center gap-1.5 rounded-lg bg-brand-purple px-3 py-1.5 text-[11px] font-semibold text-white outline-none hover:bg-brand-purple-dark focus-visible:ring-2 focus-visible:ring-brand-purple/60 disabled:opacity-40"
          >
            <FlaskConical className="size-3.5" aria-hidden /> {training ? "Training…" : done ? "Retrain" : "Train"}
          </button>
          <button
            type="button"
            disabled={!done || deployed}
            onClick={() => setDeployed(true)}
            className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-[11px] font-semibold text-white outline-none hover:bg-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-300 disabled:opacity-40"
          >
            <Rocket className="size-3.5" aria-hidden /> {deployed ? "Live" : "Deploy"}
          </button>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {[
          ["Records", goal.rows],
          ["Accuracy", epoch === 0 ? "-" : `${accuracy}%`],
          ["Loss", epoch === 0 ? "-" : loss(epoch).toFixed(2)],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl bg-brand-surface px-3 py-2">
            <p className="text-[10px] font-semibold text-brand-muted">{label}</p>
            <p className="text-lg font-extrabold text-brand-text tabular-nums">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-xl bg-brand-surface p-3">
        <div className="flex items-center justify-between">
          <SectionLabel>Training loss</SectionLabel>
          <span className="text-[10px] font-semibold text-brand-muted">
            Epoch {epoch}/{EPOCHS}
          </span>
        </div>
        <div className="relative mt-2 h-20">
          <svg aria-hidden viewBox="0 0 100 40" preserveAspectRatio="none" className="size-full text-brand-purple">
            {[10, 20, 30].map((y) => (
              <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="currentColor" strokeOpacity="0.1" vectorEffect="non-scaling-stroke" />
            ))}
            {epoch > 0 && <path d={points} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />}
          </svg>
          {epoch === 0 && <p className="absolute inset-0 flex items-center justify-center text-[11px] text-brand-muted">Press Train to start</p>}
        </div>
      </div>

      <div className="mt-3">
        {done ? (
          <ul className="demo-rise flex flex-col gap-1.5">
            <li className="flex items-center gap-2 text-[11px] font-semibold text-brand-text">
              <SectionLabel>What it learned</SectionLabel>
              <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">+{goal.final - goal.prev} pts vs v2</span>
            </li>
            {goal.features.map(([name, value]) => (
              <li key={name} className="grid grid-cols-[110px_1fr_28px] items-center gap-2 text-[11px]">
                <span className="truncate font-medium text-brand-muted">{name}</span>
                <span className="h-1.5 rounded-full bg-brand-surface">
                  <span className="demo-grow-x block h-full rounded-full bg-brand-purple" style={{ width: `${value}%` }} />
                </span>
                <span className="text-right font-bold text-brand-text">{value}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-xl bg-brand-surface px-3 py-3 text-center text-[11px] text-brand-muted">Feature importance appears when training finishes.</p>
        )}
      </div>

      {deployed && (
        <div className={cn("demo-rise mt-3 flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 ring-1 ring-emerald-200")}>
          <span className="flex size-5 items-center justify-center rounded-full bg-emerald-500 text-white">
            <Check className="size-3" aria-hidden />
          </span>
          <code className="min-w-0 flex-1 truncate font-mono text-[11px] font-semibold text-emerald-900">POST {goal.endpoint}</code>
          <span className="text-[10px] font-bold text-emerald-700">38 ms</span>
        </div>
      )}
    </PreviewFrame>
  );
}
