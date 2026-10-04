"use client";

import { useEffect, useState } from "react";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { PreviewFrame } from "../../PreviewFrame";
import { InterviewCharacter, type CharacterLook } from "./InterviewCharacter";
import { SectionLabel } from "./parts";

const candidates = [
  {
    name: "Priya Sharma",
    role: "Frontend Engineer",
    score: 92,
    hue: "from-violet-500 to-indigo-600",
    look: { skin: "#d9a07a", skinShade: "#c38660", hair: "#2a1a14", hairStyle: "long", shirt: "#7c3aed", collar: "#ddd6fe", wallFrom: "#8b5cf6", wallTo: "#4f46e5" } as CharacterLook,
    skills: [
      { name: "Communication", value: 94 },
      { name: "Technical depth", value: 91 },
      { name: "Problem solving", value: 93 },
      { name: "Collaboration", value: 88 },
    ],
    turns: [
      { q: "Walk me through how you'd speed up a slow React page.", a: "I'd profile first, then split the bundle and memoise the heavy list…", note: "Clear, structured answer with a measurable approach." },
      { q: "Tell me about a disagreement with a designer.", a: "We tested both versions with five users and let the data decide…", note: "Strong collaboration signal. Backs decisions with evidence." },
      { q: "Design a component for a data table.", a: "I'd start with the API: columns, sorting and virtualised rows…", note: "Top 10% on the coding round. Recommend the final interview." },
    ],
  },
  {
    name: "Rahul Verma",
    role: "Backend Engineer",
    score: 86,
    hue: "from-sky-500 to-cyan-600",
    look: { skin: "#c68a63", skinShade: "#ad7350", hair: "#1b1b1f", hairStyle: "short", shirt: "#0369a1", collar: "#bae6fd", wallFrom: "#38bdf8", wallTo: "#0e7490", glasses: true, beard: true } as CharacterLook,
    skills: [
      { name: "Communication", value: 84 },
      { name: "Technical depth", value: 90 },
      { name: "Problem solving", value: 87 },
      { name: "Collaboration", value: 80 },
    ],
    turns: [
      { q: "How would you design a rate limiter?", a: "A token bucket in Redis, with a sliding window for burst control…", note: "Good trade-off reasoning on consistency versus latency." },
      { q: "Describe a production incident you handled.", a: "A cache stampede took the API down; I added request coalescing…", note: "Calm under pressure. Owns the post-mortem." },
      { q: "How do you review a teammate's pull request?", a: "I look at the design first, then tests, then style…", note: "Solid. Ask about mentoring junior engineers." },
    ],
  },
  {
    name: "Aisha Khan",
    role: "QA Engineer",
    score: 71,
    hue: "from-emerald-500 to-teal-600",
    look: { skin: "#e8b896", skinShade: "#d29f7c", hair: "#5a3220", hairStyle: "bun", shirt: "#047857", collar: "#a7f3d0", wallFrom: "#34d399", wallTo: "#0f766e" } as CharacterLook,
    skills: [
      { name: "Communication", value: 78 },
      { name: "Technical depth", value: 66 },
      { name: "Problem solving", value: 72 },
      { name: "Collaboration", value: 74 },
    ],
    turns: [
      { q: "How do you decide what to automate?", a: "Stable, high-traffic flows first, and exploratory testing by hand…", note: "Sensible prioritisation, light on tooling detail." },
      { q: "Tell me about a bug you found late.", a: "A race condition in checkout. I wrote a regression test for it…", note: "Good ownership. Probe her automation experience." },
      { q: "Write a test plan for a login page.", a: "Happy path, lockout, password reset, and accessibility checks…", note: "Complete plan. Add a practical automation task." },
    ],
  },
];

export function AIInterviewDashboard() {
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [turnIndex, setTurnIndex] = useState(0);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setSeconds((current) => current + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const candidate = candidates[candidateIndex];
  const turn = candidate.turns[turnIndex];
  const progress = (turnIndex + 1) / candidate.turns.length;
  const overall = Math.round(candidate.score * progress);
  const last = turnIndex === candidate.turns.length - 1;

  return (
    <PreviewFrame title="Interview Room" period="Live evaluation" insight={turn.note} badge="312 candidates screened">
      <div role="tablist" aria-label="Candidates" className="mt-4 flex gap-1.5">
        {candidates.map((item, index) => {
          const selected = index === candidateIndex;
          return (
            <button
              key={item.name}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => {
                setCandidateIndex(index);
                setTurnIndex(0);
              }}
              className={cn(
                "flex min-w-0 flex-1 items-center gap-2 rounded-xl px-2 py-1.5 text-left outline-none ring-1 transition-all focus-visible:ring-2 focus-visible:ring-brand-purple/60",
                selected ? "bg-brand-purple-light ring-brand-purple/40" : "bg-brand-surface ring-transparent hover:ring-brand-purple/30"
              )}
            >
              <span className={cn("flex size-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-[11px] font-bold text-white", item.hue)}>{item.name[0]}</span>
              <span className="min-w-0 leading-tight">
                <span className="block truncate text-[11px] font-bold text-brand-text">{item.name.split(" ")[0]}</span>
                <span className="block text-[10px] font-semibold text-brand-muted">{item.score}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-3 grid grid-cols-[1fr_1fr] gap-3">
        <div
          key={candidateIndex}
          className="demo-rise relative flex h-[156px] flex-col justify-between overflow-hidden rounded-xl bg-black text-white shadow-lg ring-1 ring-black/10"
          role="img"
          aria-label={`${candidate.name}, ${candidate.role}, answering on a recorded video call`}
        >
          <InterviewCharacter look={candidate.look} className="absolute inset-0 size-full" />

          <span className="relative z-10 flex items-center gap-1.5 p-2 text-[10px] font-bold">
            <span className="flex items-center gap-1 rounded-full bg-black/45 px-2 py-0.5 backdrop-blur-sm">
              <Circle className="size-2 animate-pulse fill-red-500 text-red-500" aria-hidden /> REC
              <span className="tabular-nums text-white/85">
                {String(Math.floor(seconds / 60)).padStart(2, "0")}:{String(seconds % 60).padStart(2, "0")}
              </span>
            </span>
            <span className="ml-auto rounded-full bg-black/45 px-2 py-0.5 backdrop-blur-sm">
              Q{turnIndex + 1}/{candidate.turns.length}
            </span>
          </span>

          <div className="relative z-10 flex items-center gap-2 bg-gradient-to-t from-black/70 to-transparent px-2.5 pt-5 pb-2">
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block truncate text-[11px] font-bold">{candidate.name}</span>
              <span className="block truncate text-[10px] text-white/75">{candidate.role}</span>
            </span>
            <div className="flex h-4 items-center gap-[2px]" aria-hidden>
              {Array.from({ length: 9 }, (_, index) => (
                <span key={index} className="wave-bar h-full w-[2.5px] rounded-full bg-white/85" style={{ "--d": `${index * 90}ms` } as React.CSSProperties} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-xl bg-brand-surface p-3">
          <div className="flex items-center gap-3">
            <div className="relative size-14 shrink-0 rounded-full" style={{ background: `conic-gradient(var(--color-brand-purple) 0 ${overall}%, #ddd6f9 0)` }}>
              <div className="absolute inset-1.5 flex items-center justify-center rounded-full bg-white text-sm font-extrabold text-brand-text">{overall}</div>
            </div>
            <div className="leading-tight">
              <SectionLabel>AI score</SectionLabel>
              <p className="text-[11px] text-brand-muted">{last ? "Final result" : "So far"}</p>
            </div>
          </div>
          <ul className="mt-2 flex flex-col gap-1">
            {candidate.skills.map((skill) => (
              <li key={skill.name} className="grid grid-cols-[1fr_28px] items-center gap-2 text-[10px]">
                <span className="grid gap-0.5">
                  <span className="truncate font-medium text-brand-muted">{skill.name}</span>
                  <span className="h-1 rounded-full bg-white">
                    <span className="block h-full rounded-full bg-brand-purple transition-all duration-500" style={{ width: `${Math.round(skill.value * progress)}%` }} />
                  </span>
                </span>
                <span className="text-right font-bold text-brand-text">{Math.round(skill.value * progress)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div key={`${candidateIndex}-${turnIndex}`} className="demo-rise mt-3 rounded-xl bg-white p-3 ring-1 ring-brand-border">
        <p className="text-[11px] font-bold text-brand-purple">AI asks</p>
        <p className="text-[12px] leading-snug font-semibold text-brand-text">{turn.q}</p>
        <p className="mt-1.5 border-l-2 border-brand-purple/30 pl-2 text-[11px] leading-snug text-brand-muted italic">“{turn.a}”</p>
        <button
          type="button"
          onClick={() => setTurnIndex(last ? 0 : turnIndex + 1)}
          className="mt-2 rounded-lg bg-brand-purple px-3 py-1 text-[11px] font-semibold text-white outline-none hover:bg-brand-purple-dark focus-visible:ring-2 focus-visible:ring-brand-purple/60"
        >
          {last ? "Restart interview" : "Next question"}
        </button>
      </div>
    </PreviewFrame>
  );
}
