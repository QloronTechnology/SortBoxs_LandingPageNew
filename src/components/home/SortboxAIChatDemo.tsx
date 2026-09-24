"use client";

import { useEffect, useRef, useState } from "react";
import {
  Sparkles,
  Send,
  User,
  TrendingUp,
  TrendingDown,
  Wallet,
  Headphones,
  Trophy,
} from "lucide-react";
import { cn } from "@/lib/utils";

const TYPE_SPEED = 28; // ms per character

/* ---------------------------- Shared hooks ---------------------------- */

function useTypedText(fullText: string, active: boolean, duration: number) {
  const [chars, setChars] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setChars(Math.round(progress * fullText.length));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, fullText, duration]);
  return active ? fullText.slice(0, chars) : "";
}

function useCountUp(target: number, active: boolean, duration = 800) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(progress * target);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return value;
}

function CountUpText({
  value,
  active,
  decimals = 1,
  prefix = "",
  suffix = "",
}: {
  value: number;
  active: boolean;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  const current = useCountUp(value, active);
  return (
    <>
      {prefix}
      {current.toFixed(decimals)}
      {suffix}
    </>
  );
}

function Reveal({ show, children, className }: { show: boolean; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("transition-all duration-400", show ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0", className)}>
      {children}
    </div>
  );
}

/* ---------------------------- Question definitions ---------------------------- */

interface Question {
  question: string;
  response: string;
  totalRevealSteps: number;
  Render: (props: { revealStep: number; active: boolean }) => React.ReactNode;
}

function TrendPill({ value, up }: { value: string; up: boolean }) {
  return (
    <span className={cn("flex items-center gap-0.5 text-[10px] font-semibold", up ? "text-emerald-600" : "text-rose-500")}>
      {up ? <TrendingUp className="size-2.5" aria-hidden /> : <TrendingDown className="size-2.5" aria-hidden />}
      {value}
    </span>
  );
}

function StatCard({
  label,
  active,
  value,
  decimals = 1,
  prefix = "",
  suffix = "",
  trend,
  trendUp,
}: {
  label: string;
  active: boolean;
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  trend: string;
  trendUp: boolean;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-2.5">
      <p className="text-sm font-bold text-brand-text">
        <CountUpText value={value} active={active} decimals={decimals} prefix={prefix} suffix={suffix} />
      </p>
      <p className="mt-0.5 text-[9.5px] text-slate-400">{label}</p>
      <div className="mt-1">
        <TrendPill value={trend} up={trendUp} />
      </div>
    </div>
  );
}

function MiniBarIconCard({ active }: { active: boolean }) {
  const bars = [40, 65, 45, 90];
  return (
    <div className="flex items-end justify-center gap-1 rounded-xl border border-slate-100 bg-brand-purple-light p-2.5">
      {bars.map((h, i) => (
        <span
          key={i}
          className="w-2 rounded-sm bg-brand-purple transition-all duration-700 ease-out"
          style={{ height: active ? `${h * 0.28}px` : "2px", transitionDelay: `${i * 100}ms` }}
        />
      ))}
    </div>
  );
}

const QUESTIONS: Question[] = [
  {
    question: "Show me this month's sales performance",
    response: "Here's your sales performance for this month:",
    totalRevealSteps: 4,
    Render: ({ revealStep, active }) => (
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Reveal show={revealStep >= 1}>
          <StatCard label="Total Revenue" active={active && revealStep >= 1} value={18.4} prefix="₹" suffix="L" trend="12%" trendUp />
        </Reveal>
        <Reveal show={revealStep >= 2}>
          <StatCard label="New Leads" active={active && revealStep >= 2} value={124} decimals={0} trend="18%" trendUp />
        </Reveal>
        <Reveal show={revealStep >= 3}>
          <StatCard label="Open Tickets" active={active && revealStep >= 3} value={32} decimals={0} trend="5%" trendUp={false} />
        </Reveal>
        <Reveal show={revealStep >= 4}>
          <MiniBarIconCard active={revealStep >= 4} />
        </Reveal>
      </div>
    ),
  },
  {
    question: "Show me total expenditure vs earnings report",
    response: "Here's your expenditure vs earnings for this quarter:",
    totalRevealSteps: 4,
    Render: ({ revealStep, active }) => (
      <div>
        <div className="grid grid-cols-3 gap-2">
          <Reveal show={revealStep >= 1}>
            <StatCard label="Total Earnings" active={active && revealStep >= 1} value={52.6} prefix="₹" suffix="L" trend="14%" trendUp />
          </Reveal>
          <Reveal show={revealStep >= 2}>
            <StatCard label="Total Expenditure" active={active && revealStep >= 2} value={38.2} prefix="₹" suffix="L" trend="6%" trendUp={false} />
          </Reveal>
          <Reveal show={revealStep >= 3}>
            <StatCard label="Net Profit" active={active && revealStep >= 3} value={14.4} prefix="₹" suffix="L" trend="22%" trendUp />
          </Reveal>
        </div>
        <Reveal show={revealStep >= 4} className="mt-2.5 rounded-xl border border-slate-100 p-2.5">
          <div className="flex items-end justify-around gap-3">
            {[
              { m: "Jul", earn: 42, exp: 34 },
              { m: "Aug", earn: 47, exp: 35 },
              { m: "Sep", earn: 53, exp: 38 },
            ].map((d) => (
              <div key={d.m} className="flex flex-col items-center gap-1">
                <div className="flex h-16 items-end gap-1">
                  <span
                    className="w-3 rounded-t-sm bg-brand-purple transition-all duration-700 ease-out"
                    style={{ height: revealStep >= 4 ? `${d.earn}px` : "2px" }}
                  />
                  <span
                    className="w-3 rounded-t-sm bg-brand-purple-light transition-all duration-700 ease-out"
                    style={{ height: revealStep >= 4 ? `${d.exp}px` : "2px", transitionDelay: "100ms" }}
                  />
                </div>
                <span className="text-[9px] text-slate-400">{d.m}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center justify-center gap-4 text-[9px] text-slate-500">
            <span className="flex items-center gap-1">
              <span className="size-2 rounded-sm bg-brand-purple" /> Earnings
            </span>
            <span className="flex items-center gap-1">
              <span className="size-2 rounded-sm bg-brand-purple-light" /> Expenditure
            </span>
          </div>
          <p className="mt-2 flex items-center gap-1.5 text-[10.5px] font-medium text-emerald-600">
            <Sparkles className="size-3" aria-hidden />
            Profit margin improved to 27% this quarter.
          </p>
        </Reveal>
      </div>
    ),
  },
  {
    question: "What can be done to improve company performance?",
    response: "Based on your data, here are my recommendations:",
    totalRevealSteps: 4,
    Render: ({ revealStep }) => (
      <div className="flex flex-col gap-2">
        <Reveal show={revealStep >= 1} className="flex items-start gap-2.5 rounded-xl border border-slate-100 p-2.5">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-brand-purple-light text-brand-purple">
            <TrendingUp className="size-3.5" aria-hidden />
          </span>
          <div>
            <p className="text-[11.5px] font-semibold text-brand-text">Follow up on warm leads</p>
            <p className="text-[10.5px] text-slate-500">38 leads have had no response in 7+ days. Follow up to recover about ₹6L in pipeline.</p>
          </div>
        </Reveal>
        <Reveal show={revealStep >= 2} className="flex items-start gap-2.5 rounded-xl border border-slate-100 p-2.5">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
            <Wallet className="size-3.5" aria-hidden />
          </span>
          <div>
            <p className="text-[11.5px] font-semibold text-brand-text">Cut operational costs</p>
            <p className="text-[10.5px] text-slate-500">Software subscriptions are up 18%. Remove 5 unused tools to save ₹1.2L per month.</p>
          </div>
        </Reveal>
        <Reveal show={revealStep >= 3} className="flex items-start gap-2.5 rounded-xl border border-slate-100 p-2.5">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
            <Headphones className="size-3.5" aria-hidden />
          </span>
          <div>
            <p className="text-[11.5px] font-semibold text-brand-text">Resolve open tickets faster</p>
            <p className="text-[10.5px] text-slate-500">Average resolution time is 3.2 days. Reducing it to 1 day can improve retention by 10%.</p>
          </div>
        </Reveal>
        <Reveal show={revealStep >= 4} className="flex justify-center pt-1">
          <span className="animate-pulse-glow flex items-center gap-1.5 rounded-lg bg-brand-purple px-4 py-2 text-xs font-semibold text-white">
            <Sparkles className="size-3.5" aria-hidden />
            Generate Action Plan
          </span>
        </Reveal>
      </div>
    ),
  },
  {
    question: "Which team member performed best this month?",
    response: "Top performer this month:",
    totalRevealSteps: 1,
    Render: ({ revealStep, active }) => (
      <Reveal show={revealStep >= 1} className="rounded-xl border border-slate-100 p-3">
        <div className="flex items-center gap-3">
          <span className="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-purple-light text-brand-purple">
            <User className="size-5" aria-hidden />
            <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-amber-400 text-white shadow">
              <Trophy className="size-2.5" aria-hidden />
            </span>
          </span>
          <div>
            <p className="text-sm font-bold text-brand-text">Priya Sharma</p>
            <p className="text-[10.5px] text-slate-400">Sales Executive</p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-sm font-bold text-brand-text">
              <CountUpText value={4.8} active={active && revealStep >= 1} prefix="₹" suffix="L" />
            </p>
            <p className="text-[9px] text-slate-400">Revenue Closed</p>
          </div>
          <div>
            <p className="text-sm font-bold text-brand-text">
              <CountUpText value={32} active={active && revealStep >= 1} decimals={0} />
            </p>
            <p className="text-[9px] text-slate-400">Deals Won</p>
          </div>
          <div>
            <p className="text-sm font-bold text-emerald-600">
              <CountUpText value={96} active={active && revealStep >= 1} decimals={0} suffix="%" />
            </p>
            <p className="text-[9px] text-slate-400">Target Achieved</p>
          </div>
        </div>
      </Reveal>
    ),
  },
  {
    question: "Forecast next month's revenue",
    response: "Based on current trends, here's the forecast:",
    totalRevealSteps: 1,
    Render: ({ revealStep }) => {
      const points = [14.2, 16.5, 18.4, 21.2];
      const width = 220;
      const height = 70;
      const max = 24;
      const step = width / (points.length - 1);
      const coords = points.map((v, i) => [i * step, height - (v / max) * height] as const);
      const solidPath = coords.slice(0, 3).map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ");
      const dottedPath = `M${coords[2][0]},${coords[2][1]} L${coords[3][0]},${coords[3][1]}`;

      return (
        <Reveal show={revealStep >= 1} className="rounded-xl border border-slate-100 p-3">
          <svg viewBox={`0 0 ${width} ${height}`} className="h-20 w-full overflow-visible">
            <path
              d={solidPath}
              fill="none"
              stroke="#6c35f5"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={revealStep >= 1 ? 0 : 1}
              style={{ transition: "stroke-dashoffset 1s ease-out" }}
            />
            <path
              d={dottedPath}
              fill="none"
              stroke="#6c35f5"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="4 4"
              opacity={revealStep >= 1 ? 1 : 0}
              style={{ transition: "opacity 0.5s ease-out 0.9s" }}
            />
            {coords.map(([x, y], i) => (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={i === 3 ? 3.5 : 2.5}
                fill={i === 3 ? "#fff" : "#6c35f5"}
                stroke="#6c35f5"
                strokeWidth={i === 3 ? 2 : 0}
                opacity={revealStep >= 1 ? 1 : 0}
                style={{ transition: `opacity 0.4s ease-out ${i * 0.25}s` }}
              />
            ))}
          </svg>
          <div className="mt-1 flex justify-between text-[9px] text-slate-400">
            <span>Jul</span>
            <span>Aug</span>
            <span>Sep</span>
            <span className="font-semibold text-brand-purple">Oct (forecast)</span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="flex items-center gap-1 text-[11px] font-bold text-brand-text">
              <CountUpText value={21.2} active={revealStep >= 1} prefix="₹" suffix="L" />
              <span className="flex items-center gap-0.5 text-[10px] font-semibold text-emerald-600">
                <TrendingUp className="size-2.5" aria-hidden /> 15%
              </span>
            </span>
            <span className="text-[10px] text-slate-400">Forecast confidence: 89%</span>
          </div>
        </Reveal>
      );
    },
  },
];

/* ---------------------------- Chat turn ---------------------------- */

type TurnStage = "bubble" | "thinking" | "typing-a" | "reveal" | "hold" | "done";

interface TurnState {
  id: number;
  qIndex: number;
  stage: TurnStage;
  revealStep: number;
}

const MAX_TURNS = 4;

function ChatTurn({ turn }: { turn: TurnState }) {
  const question = QUESTIONS[turn.qIndex];
  const aDuration = Math.max(question.response.length * TYPE_SPEED, 500);
  const responseActive = turn.stage !== "bubble" && turn.stage !== "thinking";
  const dataActive = turn.stage === "reveal" || turn.stage === "hold" || turn.stage === "done";
  const typedResponse = useTypedText(question.response, responseActive, aDuration);

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-start justify-end gap-2">
        <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-brand-purple-light px-3 py-2 text-[11.5px] font-medium text-brand-purple">
          {question.question}
        </div>
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-500">
          <User className="size-3.5" aria-hidden />
        </span>
      </div>

      {turn.stage === "thinking" && (
        <div className="flex items-center gap-2">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-purple-light text-brand-purple">
            <Sparkles className="size-3" aria-hidden />
          </span>
          <span className="flex items-center gap-1 rounded-2xl bg-slate-50 px-3 py-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="size-1.5 animate-bounce rounded-full bg-slate-400"
                style={{ animationDelay: `${i * 150}ms`, animationDuration: "700ms" }}
              />
            ))}
          </span>
        </div>
      )}

      {responseActive && (
        <div className="flex items-start gap-2">
          <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-purple-light text-brand-purple">
            <Sparkles className="size-3" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[12.5px] leading-snug font-medium text-brand-text">{typedResponse}</p>
            {(turn.stage === "reveal" || turn.stage === "hold" || turn.stage === "done") && (
              <div className="mt-2">
                <question.Render revealStep={turn.revealStep} active={dataActive} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------------------- Main component ---------------------------- */

export function SortboxAIChatDemo() {
  const [turns, setTurns] = useState<TurnState[]>([]);
  const [pendingQIndex, setPendingQIndex] = useState(0);
  const [typingQActive, setTypingQActive] = useState(true);
  const [sendPulse, setSendPulse] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const turnCounter = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const pendingQuestion = QUESTIONS[pendingQIndex];
  const qDuration = Math.max(pendingQuestion.question.length * TYPE_SPEED, 600);
  const typedQuestion = useTypedText(pendingQuestion.question, typingQActive, qDuration);
  const isThinking = turns.length > 0 && turns[turns.length - 1].stage === "thinking";

  useEffect(() => {
    const schedule = (fn: () => void, delay: number) => {
      timers.current.push(setTimeout(fn, delay));
    };

    const updateLastTurn = (patch: Partial<TurnState>) => {
      setTurns((prev) => {
        if (prev.length === 0) return prev;
        const next = [...prev];
        next[next.length - 1] = { ...next[next.length - 1], ...patch };
        return next;
      });
    };

    function runQuestion(index: number) {
      const question = QUESTIONS[index];
      const typeQDur = Math.max(question.question.length * TYPE_SPEED, 600);
      const typeADur = Math.max(question.response.length * TYPE_SPEED, 500);

      setPendingQIndex(index);
      setTypingQActive(true);
      setSendPulse(false);

      let t = typeQDur + 150;

      schedule(() => setSendPulse(true), t);
      t += 350;
      schedule(() => {
        setSendPulse(false);
        setTypingQActive(false);
        const id = turnCounter.current++;
        setTurns((prev) => {
          const next = [...prev, { id, qIndex: index, stage: "bubble" as TurnStage, revealStep: 0 }];
          return next.length > MAX_TURNS ? next.slice(next.length - MAX_TURNS) : next;
        });
      }, t);
      t += 500;
      schedule(() => updateLastTurn({ stage: "thinking" }), t);
      t += 1000;
      schedule(() => updateLastTurn({ stage: "typing-a" }), t);
      t += typeADur + 200;
      schedule(() => updateLastTurn({ stage: "reveal" }), t);

      for (let s = 1; s <= question.totalRevealSteps; s++) {
        schedule(() => updateLastTurn({ revealStep: s }), t + s * 400);
      }
      t += question.totalRevealSteps * 400 + 300;
      schedule(() => updateLastTurn({ stage: "hold" }), t);
      t += 4000;
      schedule(() => updateLastTurn({ stage: "done" }), t);
      t += 300;
      schedule(() => runQuestion((index + 1) % QUESTIONS.length), t);
    }

    runQuestion(0);
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    const content = contentRef.current;
    if (!container || !content) return;
    const scrollToBottom = () => {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    };
    const ro = new ResizeObserver(scrollToBottom);
    ro.observe(content);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="flex h-[420px] flex-col overflow-hidden rounded-2xl border border-brand-border bg-white shadow-sm">
      <div className="flex shrink-0 items-center gap-2 border-b border-slate-100 px-3.5 py-3">
        <span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-xl bg-brand-purple text-white transition-shadow duration-300",
            isThinking && "animate-pulse-glow shadow-[0_0_0_6px_rgba(108,53,245,0.15)]"
          )}
        >
          <Sparkles className="size-4" aria-hidden />
        </span>
        <p className="text-sm font-bold text-brand-text">SortBoxs AI</p>
      </div>

      <div className="relative min-h-0 flex-1">
        <div ref={scrollRef} className="no-scrollbar h-full overflow-y-auto px-3.5 py-3">
          <div ref={contentRef} className="flex flex-col gap-4">
            {turns.map((turn) => (
              <ChatTurn key={turn.id} turn={turn} />
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-white to-transparent" />
      </div>

      <div className="mx-3.5 mb-3.5 flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5">
        <span className="min-w-0 flex-1 truncate text-[11.5px] text-brand-text">
          {typingQActive ? (
            <>
              {typedQuestion}
              <span className="animate-pulse text-brand-purple">|</span>
            </>
          ) : (
            <span className="text-slate-300">Ask anything...</span>
          )}
        </span>
        <span
          className={cn(
            "flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-purple text-white transition-transform duration-200",
            sendPulse && "scale-125 shadow-[0_0_0_5px_rgba(108,53,245,0.25)]"
          )}
        >
          <Send className="size-3" aria-hidden />
        </span>
      </div>
    </div>
  );
}
