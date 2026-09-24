"use client";

import { useEffect, useRef, useState } from "react";
import {
  FileText,
  ScanLine,
  Video,
  Mic,
  ClipboardCheck,
  Code2,
  Sparkles,
  MessagesSquare,
  ThumbsUp,
  Star,
  Check,
  Timer,
  CheckCircle2,
  Award,
  UserCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { IconBox } from "@/components/ui/IconBox";
import { Button } from "@/components/ui/Button";
import { MouseCursor } from "@/components/dashboard/MouseCursor";
import type { ModulePageData } from "@/types/module";

const STEP_META = [
  { label: "Resume Screening", icon: FileText },
  { label: "AI Interview", icon: Video },
  { label: "Technical Assessment", icon: ClipboardCheck },
  { label: "Coding Evaluation", icon: Code2 },
  { label: "AI Feedback", icon: Sparkles },
  { label: "Collaboration", icon: MessagesSquare },
] as const;

type ScreenNum = 1 | 2 | 3 | 4 | 5 | 6;

function useCountUp(target: number, active: boolean, duration = 900) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.round(progress * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, target]);
  return value;
}

function Reveal({ show, children, className }: { show: boolean; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("transition-all duration-500", show ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0", className)}>
      {children}
    </div>
  );
}

function ScreenFrame({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <div className={cn("transition-opacity duration-400", active ? "opacity-100" : "pointer-events-none absolute inset-0 opacity-0")}>
      {children}
    </div>
  );
}

export function AIInterviewJourneyDemo({ data }: { data: ModulePageData }) {
  const [screen, setScreen] = useState<ScreenNum>(1);
  const [step, setStep] = useState(0);
  const [cursor, setCursor] = useState({ x: 50, y: 50, visible: false, clicking: false });
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const schedule = (fn: () => void, delay: number) => {
      timers.current.push(setTimeout(fn, delay));
    };
    const moveCursor = (x: number, y: number) => setCursor((c) => ({ ...c, x, y, visible: true, clicking: false }));
    const click = () => setCursor((c) => ({ ...c, clicking: true }));
    const release = () => setCursor((c) => ({ ...c, clicking: false }));
    const hideCursor = () => setCursor((c) => ({ ...c, visible: false }));

    function runCycle() {
      let t = 0;
      const at = (fn: () => void, delay: number) => {
        t += delay;
        schedule(fn, t);
      };

      // ---------- SCREEN 1: Resume Screening ----------
      setScreen(1);
      setStep(0);
      at(() => setStep(1), 500); // resume dropped
      at(() => setStep(2), 700); // scanning
      at(() => setStep(3), 900);
      at(() => setStep(4), 350);
      at(() => setStep(5), 350);
      at(() => setStep(6), 350);
      at(() => setStep(7), 350); // 5 tags done
      at(() => setStep(8), 700); // score counts up
      at(() => setStep(9), 1100); // shortlisted badge
      at(() => setStep(10), 700); // ranked list

      // ---------- SCREEN 2: AI-Powered Interview ----------
      at(() => {
        setScreen(2);
        setStep(0);
      }, 1400);
      at(() => setStep(1), 700); // question typed
      at(() => setStep(2), 1300); // answer transcribing
      at(() => setStep(3), 1300); // indicators
      at(() => setStep(4), 900); // progress bar

      // ---------- SCREEN 3: Technical Assessment ----------
      at(() => {
        setScreen(3);
        setStep(0);
      }, 1500);
      at(() => setStep(1), 1200); // option selected
      at(() => setStep(2), 1000); // timer near end / submit
      at(() => setStep(3), 700); // core java
      at(() => setStep(4), 500); // oop
      at(() => setStep(5), 500); // system design

      // ---------- SCREEN 4: Coding Evaluation ----------
      at(() => {
        setScreen(4);
        setStep(0);
      }, 1400);
      at(() => setStep(1), 450);
      at(() => setStep(2), 350);
      at(() => setStep(3), 350);
      at(() => setStep(4), 350);
      at(() => setStep(5), 350); // 5 lines typed
      at(() => moveCursor(87, 39), 700);
      at(() => click(), 700);
      at(() => {
        release();
        setStep(6);
      }, 300); // tests running/passing
      at(() => setStep(7), 1300); // quality metrics
      at(() => hideCursor(), 900);

      // ---------- SCREEN 5: Instant AI Feedback ----------
      at(() => {
        setScreen(5);
        setStep(0);
      }, 900);
      at(() => setStep(1), 700); // score gauge
      at(() => setStep(2), 1100); // strengths
      at(() => setStep(3), 700); // improve
      at(() => setStep(4), 700); // recommendation
      at(() => setStep(5), 700); // radar

      // ---------- SCREEN 6: Recruiter Collaboration ----------
      at(() => {
        setScreen(6);
        setStep(0);
      }, 1600);
      at(() => setStep(1), 900); // comment 1
      at(() => setStep(2), 900); // comment 2
      at(() => setStep(3), 800); // ratings
      at(() => moveCursor(86, 77), 900);
      at(() => click(), 900);
      at(() => {
        release();
        setStep(4);
      }, 300); // slide to final interview
      at(() => hideCursor(), 1300);

      at(() => runCycle(), 2000);
    }

    runCycle();
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, []);

  return (
    <section className="bg-brand-surface py-14 lg:py-16">
      <div className="container-page grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="mb-5 flex items-center gap-3">
            <IconBox image={data.icon} size="md" />
            <Badge>{data.badge}</Badge>
          </div>
          <h2 className="text-3xl font-bold text-brand-text sm:text-4xl">{data.heading}</h2>
          <p className="mt-4 text-base text-brand-muted">{data.description}</p>
          <Button href="/ai-interview" className="mt-7">
            {data.cta}
          </Button>
        </div>

        <div className="lg:col-span-3">
          <ul className="flex flex-col gap-4">
            {data.features.map((feature, index) => {
              const active = screen === index + 1;
              return (
                <li
                  key={feature}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors duration-300",
                    active && "bg-brand-purple-light"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-6 shrink-0 items-center justify-center rounded-full text-white transition-colors duration-300",
                      active ? "bg-brand-purple" : "bg-brand-purple/70"
                    )}
                  >
                    <Check className="size-3.5" aria-hidden />
                  </span>
                  <span className={cn("text-[15px] font-medium transition-colors duration-300", active ? "text-brand-purple" : "text-brand-text")}>
                    {feature}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="lg:col-span-5">
          <div className="relative min-h-[420px] overflow-hidden rounded-2xl border border-brand-border bg-white p-4 shadow-sm">
            <div className="mb-2 flex items-center justify-end gap-1.5">
              {STEP_META.map((s, i) => (
                <span
                  key={s.label}
                  className={cn(
                    "rounded-full transition-all duration-300",
                    screen === i + 1 ? "h-1.5 w-4 bg-brand-purple" : "size-1.5 bg-slate-200"
                  )}
                />
              ))}
            </div>
            <div className="relative min-h-[390px]">
              <ScreenFrame active={screen === 1}>
                <ResumeScreeningScreen step={step} />
              </ScreenFrame>
              <ScreenFrame active={screen === 2}>
                <InterviewScreen step={step} />
              </ScreenFrame>
              <ScreenFrame active={screen === 3}>
                <AssessmentScreen step={step} />
              </ScreenFrame>
              <ScreenFrame active={screen === 4}>
                <CodingScreen step={step} />
              </ScreenFrame>
              <ScreenFrame active={screen === 5}>
                <FeedbackScreen step={step} />
              </ScreenFrame>
              <ScreenFrame active={screen === 6}>
                <CollaborationScreen step={step} />
              </ScreenFrame>
            </div>

            <MouseCursor x={cursor.x} y={cursor.y} visible={cursor.visible} clicking={cursor.clicking} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- Screen 1: Resume Screening ---------------------------- */

const SKILL_TAGS = ["Java", "Spring Boot", "Microservices", "SQL", "AWS"];
const APPLICANTS = [
  { name: "Rohan Mehta", score: 87 },
  { name: "S. Kulkarni", score: 74 },
  { name: "M. Patel", score: 68 },
];

function ResumeScreeningScreen({ step }: { step: number }) {
  const tagsShown = Math.max(0, Math.min(SKILL_TAGS.length, step - 2));
  const score = useCountUp(87, step >= 8);
  const ranked = step >= 10 ? APPLICANTS : [...APPLICANTS].sort((a, b) => a.name === "Rohan Mehta" ? 1 : b.name === "Rohan Mehta" ? -1 : 0);

  return (
    <div>
      <p className="mb-2 text-xs font-semibold text-brand-text">Resume Screening</p>

      <Reveal show={step >= 1} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-3">
        <span className="relative flex size-10 shrink-0 items-center justify-center rounded-lg bg-white text-rose-500 ring-1 ring-slate-200">
          <FileText className="size-5" aria-hidden />
          {step === 2 && (
            <span className="animate-pulse-glow absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-brand-purple/70" aria-hidden />
          )}
        </span>
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-brand-text">Rohan_Mehta.pdf</p>
          <p className="flex items-center gap-1 text-[10px] text-slate-400">
            <ScanLine className={cn("size-3", step === 2 && "text-brand-purple")} aria-hidden />
            {step === 2 ? "AI scanning resume..." : step > 2 ? "Scan complete" : "Uploaded"}
          </p>
        </div>
      </Reveal>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {SKILL_TAGS.map((tag, i) => (
          <span
            key={tag}
            className={cn(
              "rounded-full border px-2.5 py-1 text-[10px] font-semibold transition-all duration-400",
              i < tagsShown ? "translate-y-0 border-brand-purple/30 bg-brand-purple-light text-brand-purple opacity-100" : "translate-y-1 border-transparent opacity-0"
            )}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-4 rounded-xl border border-slate-100 p-3">
        <div className="text-center">
          <p className="text-xl font-bold text-brand-text">{score}%</p>
          <p className="text-[9px] text-slate-400">Job Match</p>
        </div>
        <Reveal show={step >= 9} className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
          <CheckCircle2 className="size-3" aria-hidden />
          Shortlisted
        </Reveal>
      </div>

      <div className="mt-3">
        <p className="mb-1.5 text-[10px] font-semibold text-slate-500">Applicant Ranking</p>
        <div className="flex flex-col gap-1.5">
          {ranked.map((a, i) => (
            <div
              key={a.name}
              className={cn(
                "flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[11px] transition-colors duration-500",
                a.name === "Rohan Mehta" && step >= 10 ? "bg-brand-purple-light font-semibold text-brand-purple" : "bg-slate-50 text-slate-500"
              )}
            >
              <span>#{i + 1} {a.name}</span>
              <span className="font-semibold">{a.score}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------- Screen 2: AI-Powered Interview ---------------------------- */

const ANSWER_TEXT =
  "I'd split the service by domain, use an API gateway, add async messaging for decoupling, and scale horizontally with load balancing...";

function InterviewScreen({ step }: { step: number }) {
  const answerChars = step >= 3 ? ANSWER_TEXT.length : step === 2 ? Math.round(ANSWER_TEXT.length * 0.55) : 0;

  return (
    <div>
      <p className="mb-2 text-xs font-semibold text-brand-text">AI-Powered Interview</p>
      <div className="grid grid-cols-2 gap-2.5">
        <div className="flex flex-col items-center justify-center gap-1.5 rounded-xl bg-brand-navy p-4 text-white">
          <span className="flex size-9 items-center justify-center rounded-full bg-brand-purple">
            <Sparkles className="size-4" aria-hidden />
          </span>
          <p className="text-[11px] font-semibold">AI Interviewer</p>
          <span className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[9px] text-white/70">
            <Mic className="size-2.5" aria-hidden /> Live
          </span>
        </div>
        <div className="flex flex-col items-center justify-center gap-1.5 rounded-xl bg-slate-800 p-4 text-white">
          <span className="flex size-9 items-center justify-center rounded-full bg-slate-600">
            <UserCheck className="size-4" aria-hidden />
          </span>
          <p className="text-[11px] font-semibold">Rohan Mehta</p>
          <span className="flex items-center gap-1 rounded-full bg-rose-500/20 px-2 py-0.5 text-[9px] text-rose-300">● REC</span>
        </div>
      </div>

      <Reveal show={step >= 1} className="mt-3 rounded-xl border border-slate-100 bg-brand-surface p-3">
        <p className="text-[10px] font-semibold text-brand-purple">AI Question</p>
        <p className="mt-1 text-xs text-brand-text">Explain how you would design a scalable microservice.</p>
      </Reveal>

      <Reveal show={step >= 2} className="mt-2 rounded-xl border border-slate-100 p-3">
        <p className="text-[10px] font-semibold text-slate-500">Live Transcript</p>
        <p className="mt-1 text-[11px] leading-snug text-slate-600">{ANSWER_TEXT.slice(0, answerChars)}</p>
      </Reveal>

      <Reveal show={step >= 3} className="mt-2 grid grid-cols-3 gap-2">
        {[
          { label: "Confidence", value: 82 },
          { label: "Communication", value: 88 },
          { label: "Relevance", value: 91 },
        ].map((m) => (
          <div key={m.label} className="rounded-lg bg-slate-50 p-2 text-center">
            <p className="text-xs font-bold text-brand-text">{m.value}%</p>
            <p className="text-[9px] text-slate-400">{m.label}</p>
          </div>
        ))}
      </Reveal>

      <Reveal show={step >= 4} className="mt-2.5">
        <div className="mb-1 flex items-center justify-between text-[10px] text-slate-400">
          <span>Question 3 of 5</span>
          <span>60%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div className="h-full w-3/5 rounded-full bg-brand-purple transition-all duration-700" />
        </div>
      </Reveal>
    </div>
  );
}

/* ---------------------------- Screen 3: Technical Assessment ---------------------------- */

const MCQ_OPTIONS = ["Single Responsibility Principle", "Open/Closed Principle", "Liskov Substitution", "Dependency Inversion"];

function AssessmentScreen({ step }: { step: number }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-brand-text">Technical Assessment — Java &amp; OOP</p>
        <span className="flex items-center gap-1 rounded-lg bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-500">
          <Timer className="size-3" aria-hidden />
          {step >= 2 ? "00:04" : "00:45"}
        </span>
      </div>

      <div className="mt-3 rounded-xl border border-slate-100 p-3">
        <p className="text-[11px] font-medium text-brand-text">Which principle ensures a class has only one reason to change?</p>
        <div className="mt-2.5 flex flex-col gap-1.5">
          {MCQ_OPTIONS.map((opt, i) => (
            <div key={opt} className="flex items-center gap-2 rounded-lg border border-slate-100 px-2.5 py-1.5">
              <span
                className={cn(
                  "flex size-3.5 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-300",
                  i === 0 && step >= 1 ? "border-brand-purple bg-brand-purple" : "border-slate-300"
                )}
              >
                {i === 0 && step >= 1 && <span className="size-1.5 rounded-full bg-white" />}
              </span>
              <span className="text-[10.5px] text-slate-600">{opt}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3">
        <p className="mb-1.5 text-[10px] font-semibold text-slate-500">Section Scores</p>
        <div className="flex flex-col gap-2">
          <ScoreRow label="Core Java" value={90} show={step >= 3} />
          <ScoreRow label="OOP" value={85} show={step >= 4} />
          <ScoreRow label="System Design" value={78} show={step >= 5} />
        </div>
      </div>
    </div>
  );
}

function ScoreRow({ label, value, show }: { label: string; value: number; show: boolean }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[10px] text-slate-500">
        <span>{label}</span>
        <span className="font-semibold text-brand-text">{show ? `${value}%` : "--"}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-brand-purple transition-[width] duration-700 ease-out"
          style={{ width: show ? `${value}%` : "0%" }}
        />
      </div>
    </div>
  );
}

/* ---------------------------- Screen 4: Coding Evaluation ---------------------------- */

const CODE_LINES = [
  "function firstNonRepeating(str) {",
  "  const counts = {};",
  "  for (const c of str) counts[c] = (counts[c] || 0) + 1;",
  "  for (const c of str) if (counts[c] === 1) return c;",
  "  return null;",
];

function CodingScreen({ step }: { step: number }) {
  const linesShown = Math.max(0, Math.min(CODE_LINES.length, step));
  const testsRunning = step === 6;
  const testsDone = step >= 6;

  return (
    <div>
      <p className="mb-2 text-xs font-semibold text-brand-text">Coding Evaluation — Find the first non-repeating character</p>

      <div className="rounded-xl bg-slate-900 p-3 font-mono">
        {CODE_LINES.map((line, i) => (
          <p key={i} className={cn("text-[10.5px] leading-relaxed text-slate-300 transition-opacity duration-300", i < linesShown ? "opacity-100" : "opacity-0")}>
            {line}
          </p>
        ))}
        <div className="mt-2 flex items-center justify-between border-t border-slate-700 pt-2">
          <span className="text-[9px] text-slate-500">JavaScript</span>
          <span
            className={cn(
              "flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[10px] font-semibold transition-colors duration-200",
              testsRunning ? "bg-brand-purple-dark text-white" : "bg-brand-purple text-white"
            )}
          >
            <Code2 className="size-3" aria-hidden />
            Run Tests
          </span>
        </div>
      </div>

      <Reveal show={testsDone} className="mt-3">
        <div className="mb-1.5 flex items-center justify-between text-[10px] text-slate-500">
          <span className="font-semibold text-brand-text">Test Results</span>
          <span className="font-semibold text-emerald-600">8/8 passed</span>
        </div>
        <div className="grid grid-cols-8 gap-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="flex size-6 items-center justify-center rounded-md bg-emerald-50 text-emerald-600 transition-all duration-300"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <CheckCircle2 className="size-3.5" aria-hidden />
            </span>
          ))}
        </div>
      </Reveal>

      <Reveal show={step >= 7} className="mt-3 grid grid-cols-3 gap-2">
        <MetricPill label="Time Complexity" value="O(n)" />
        <MetricPill label="Readability" value="9/10" />
        <MetricPill label="Best Practices" value="✓" />
      </Reveal>
    </div>
  );
}

function MetricPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-100 bg-slate-50/60 p-2 text-center">
      <p className="text-xs font-bold text-brand-text">{value}</p>
      <p className="text-[9px] text-slate-400">{label}</p>
    </div>
  );
}

/* ---------------------------- Screen 5: Instant AI Feedback ---------------------------- */

const RADAR_AXES = [
  { label: "Technical", value: 88 },
  { label: "Coding", value: 90 },
  { label: "Communication", value: 82 },
  { label: "Problem Solving", value: 85 },
];

function FeedbackScreen({ step }: { step: number }) {
  const score = useCountUp(86, step >= 1);

  return (
    <div>
      <p className="mb-2 text-xs font-semibold text-brand-text">Instant AI Feedback</p>

      <div className="flex items-center gap-4 rounded-xl border border-slate-100 p-3">
        <div className="relative flex size-16 shrink-0 items-center justify-center">
          <svg viewBox="0 0 40 40" className="size-16 -rotate-90">
            <circle cx="20" cy="20" r="16" fill="none" stroke="#f1f0fb" strokeWidth="5" />
            <circle
              cx="20"
              cy="20"
              r="16"
              fill="none"
              stroke="#6c35f5"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={`${(score / 100) * 100.5} 100.5`}
              className="transition-all duration-300"
            />
          </svg>
          <span className="absolute text-sm font-bold text-brand-text">{score}</span>
        </div>
        <div>
          <p className="text-xs font-semibold text-brand-text">Overall Score</p>
          <p className="text-[11px] text-slate-400">86/100 — top 8% of applicants</p>
        </div>
      </div>

      <Reveal show={step >= 2} className="mt-2.5 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-emerald-50 p-2.5">
          <p className="text-[10px] font-semibold text-emerald-700">Strengths</p>
          <p className="mt-0.5 text-[10px] leading-snug text-emerald-700/80">Strong Java fundamentals, clean code</p>
        </div>
        <Reveal show={step >= 3} className="rounded-xl bg-amber-50 p-2.5">
          <p className="text-[10px] font-semibold text-amber-700">Areas to Improve</p>
          <p className="mt-0.5 text-[10px] leading-snug text-amber-700/80">System design depth</p>
        </Reveal>
      </Reveal>

      <Reveal show={step >= 4} className="mt-2.5 flex items-center gap-2 rounded-xl bg-brand-purple-light px-3 py-2.5">
        <Award className="size-4 text-brand-purple" aria-hidden />
        <span className="text-xs font-bold text-brand-purple">Strong Hire — Move to Final Round</span>
      </Reveal>

      <Reveal show={step >= 5} className="mt-3 flex items-center justify-center">
        <RadarChart axes={RADAR_AXES} animate={step >= 5} />
      </Reveal>
    </div>
  );
}

function RadarChart({ axes, animate }: { axes: { label: string; value: number }[]; animate: boolean }) {
  const size = 120;
  const center = size / 2;
  const radius = 42;
  const angleStep = (Math.PI * 2) / axes.length;

  const points = axes.map((axis, i) => {
    const angle = -Math.PI / 2 + i * angleStep;
    const r = animate ? (axis.value / 100) * radius : 0;
    return [center + r * Math.cos(angle), center + r * Math.sin(angle)] as const;
  });
  const polygon = points.map((p) => p.join(",")).join(" ");

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="size-32">
      {[0.33, 0.66, 1].map((f) => {
        const ringPoints = axes
          .map((_, i) => {
            const angle = -Math.PI / 2 + i * angleStep;
            return [center + radius * f * Math.cos(angle), center + radius * f * Math.sin(angle)].join(",");
          })
          .join(" ");
        return <polygon key={f} points={ringPoints} fill="none" stroke="#f1f0fb" strokeWidth="1" />;
      })}
      <polygon points={polygon} fill="rgba(108,53,245,0.25)" stroke="#6c35f5" strokeWidth="1.5" className="transition-all duration-700 ease-out" />
      {axes.map((axis, i) => {
        const angle = -Math.PI / 2 + i * angleStep;
        const lx = center + (radius + 14) * Math.cos(angle);
        const ly = center + (radius + 14) * Math.sin(angle);
        return (
          <text key={axis.label} x={lx} y={ly} fontSize="6.5" textAnchor="middle" fill="#6b6f8a">
            {axis.label}
          </text>
        );
      })}
    </svg>
  );
}

/* ---------------------------- Screen 6: Recruiter Collaboration ---------------------------- */

function CollaborationScreen({ step }: { step: number }) {
  const slid = step >= 4;

  return (
    <div>
      <p className="mb-2 text-xs font-semibold text-brand-text">Recruiter Collaboration</p>

      <div className="flex items-center gap-3 rounded-xl border border-slate-100 p-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-purple-light text-brand-purple">
          <UserCheck className="size-4" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-brand-text">Rohan Mehta — Java Developer</p>
          <p className="flex items-center gap-1 text-[9px] text-slate-400">
            <Sparkles className="size-2.5 text-brand-purple" aria-hidden /> AI Report Attached · Score 86/100
          </p>
        </div>
      </div>

      <div className="mt-2.5 flex flex-col gap-2">
        <Reveal show={step >= 1} className="rounded-xl bg-slate-50 p-2.5 text-[10.5px] text-slate-600">
          <span className="font-semibold text-brand-text">Hiring Manager:</span> Looks good, let&apos;s schedule final round
        </Reveal>
        <Reveal show={step >= 2} className="rounded-xl bg-slate-50 p-2.5 text-[10.5px] text-slate-600">
          <span className="font-semibold text-brand-text">Tech Lead:</span> Agreed, strong coding skills.
        </Reveal>
      </div>

      <Reveal show={step >= 3} className="mt-2.5 flex items-center gap-3">
        <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
          <ThumbsUp className="size-3.5" aria-hidden /> 2
        </span>
        <span className="flex items-center gap-0.5 text-amber-400">
          {Array.from({ length: 4 }).map((_, i) => (
            <Star key={i} className="size-3 fill-current" aria-hidden />
          ))}
        </span>
      </Reveal>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-2.5">
          <p className="mb-1.5 text-[9px] font-semibold text-slate-500">In Review</p>
          <div className={cn("rounded-lg border border-slate-200 bg-white p-2 text-[10px] font-semibold text-brand-text transition-opacity duration-500", slid ? "opacity-0" : "opacity-100")}>
            Rohan Mehta
          </div>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-2.5">
          <p className="mb-1.5 text-[9px] font-semibold text-emerald-700">Final Interview</p>
          <div
            className={cn(
              "rounded-lg border border-emerald-200 bg-white p-2 text-[10px] font-semibold text-brand-text transition-all duration-500",
              slid ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"
            )}
          >
            Rohan Mehta
          </div>
        </div>
      </div>

      <div className="mt-2.5 flex justify-end">
        <span className="flex items-center gap-1.5 rounded-lg bg-brand-purple px-3 py-1.5 text-[11px] font-semibold text-white">
          Move to Final Round
        </span>
      </div>
    </div>
  );
}
