"use client";

import { Route } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion, useTicker } from "@/components/sales-solution/hooks";
import { HeroShell, MockWindow } from "../shared";
import { personas, stages } from "./journeyData";

const W = 600;
const H = 200;
const xs = stages.map((_, index) => 60 + index * 120);

/** Mood curve for one persona as a smooth line through the five stages. */
function curve(moods: number[]) {
  const ys = moods.map((mood) => 170 - mood * 1.4);
  let d = `M${xs[0]},${ys[0]}`;
  for (let i = 1; i < xs.length; i++) {
    const cx = (xs[i - 1] + xs[i]) / 2;
    d += ` C${cx},${ys[i - 1]} ${cx},${ys[i]} ${xs[i]},${ys[i]}`;
  }
  return { d, ys };
}

function JourneyMap() {
  const reduced = useReducedMotion();
  const [tick] = useTicker(stages.length, 1400, reduced, 2);
  const active = reduced ? stages.length - 1 : Math.min(tick, stages.length - 1);
  const persona = personas[0];
  const { d, ys } = curve(persona.stages.map((stage) => stage.mood));
  const current = persona.stages[active];

  return (
    <MockWindow title="Customer journey map">
      <div className="p-4 sm:p-5">
        <p className="text-xs text-brand-muted">
          <b className="text-brand-text">{persona.name}</b>, {persona.label.toLowerCase()}
        </p>
        <div className="relative mt-2 rounded-2xl bg-brand-surface ring-1 ring-brand-border" style={{ aspectRatio: `${W} / ${H}` }}>
          <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" aria-hidden>
            <defs>
              <linearGradient id="mood-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6c35f5" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#6c35f5" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[60, 110, 160].map((y) => (
              <line key={y} x1="20" x2={W - 20} y1={y} y2={y} stroke="#e8e3fb" strokeWidth="1" strokeDasharray="3 5" />
            ))}
            <path d={`${d} L${xs[xs.length - 1]},${H} L${xs[0]},${H} Z`} fill="url(#mood-fill)" />
            <path d={d} fill="none" stroke="#6c35f5" strokeWidth="3.5" strokeLinecap="round" pathLength={1} className="dash-line" />
            {xs.map((x, index) => (
              <g key={stages[index]}>
                <circle cx={x} cy={ys[index]} r={index === active ? 11 : 6} fill="#fff" stroke="#6c35f5" strokeWidth={index === active ? 4 : 3} style={{ transition: "r 300ms ease" }} />
              </g>
            ))}
          </svg>
        </div>
        <ol className="mt-2 grid grid-cols-5 text-center" aria-label="Journey stages">
          {stages.map((stage, index) => (
            <li key={stage} className={cn("text-[10px] font-bold transition-colors sm:text-[11px]", index === active ? "text-brand-purple" : "text-brand-muted")}>
              {stage}
            </li>
          ))}
        </ol>
        <div key={active} className="demo-rise mt-4 rounded-2xl bg-white p-3.5 ring-1 ring-brand-purple/25">
          <p className="text-[11px] font-bold tracking-wide text-brand-purple uppercase">{stages[active]}</p>
          <p className="mt-0.5 text-sm font-semibold text-brand-text">{current.does}</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {current.touchpoints.map((touchpoint) => (
              <li key={touchpoint} className="rounded-full bg-brand-purple-light px-2.5 py-1 text-[10px] font-bold text-brand-purple">
                {touchpoint}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MockWindow>
  );
}

export function JourneyHero() {
  return (
    <HeroShell
      current="Customer Journey"
      icon={Route}
      iconTone="bg-sky-100 text-sky-700"
      title="See the Whole Journey."
      highlight="Shape Every Step."
      description="Map the path your customers take from first contact to loyalty, see what happens at each stage, and act at the moments that matter."
      visual={<JourneyMap />}
    />
  );
}
