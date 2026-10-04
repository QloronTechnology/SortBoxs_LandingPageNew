"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";
import { Check, Pause, Play } from "lucide-react";
import { modules } from "@/data/modules";
import { cn } from "@/lib/utils";
import { PreviewFrame } from "../../PreviewFrame";

const chapters = [
  { key: "crm", label: "CRM", slug: "crm", caption: "A new lead lands in CRM with its source, score and owner already set." },
  { key: "sales", label: "Sales", slug: "sales", caption: "The deal moves through the pipeline and closes at ₹3.1L." },
  { key: "hrms", label: "HRMS", slug: "hrms", caption: "Attendance and leave are handled in one place, approved from a phone." },
  { key: "projects", label: "Projects", slug: "projects", caption: "The won deal becomes a project, with tasks and deadlines for the team." },
  { key: "finance", label: "Finance", slug: "finance", caption: "The invoice goes out and the payment lands, with no re-entry." },
  { key: "ai", label: "AI", slug: "ai", caption: "Ask a question and get an answer from your own data." },
];
const STEP = 8;

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const dash = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** Circular gauge used by the CRM score and the HRMS attendance screens. */
function Ring({ value, size = 56, stroke = 6, color = "#6c35f5", children }: { value: number; size?: number; stroke?: number; color?: string; children?: React.ReactNode }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  return (
    <span className="relative inline-flex shrink-0 items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#eeeaff" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference * value} ${circumference}`}
          className="transition-all duration-500"
        />
      </svg>
      <span className="absolute text-[11px] font-extrabold text-brand-text">{children}</span>
    </span>
  );
}

/* ---------------------------------------------------------------- Chapter screens (progress p: 0-100) */

function CrmScreen({ p }: { p: number }) {
  const funnel = [
    { label: "New", count: 42, width: 100, bar: "from-violet-400 to-brand-purple" },
    { label: "Qualified", count: 28, width: 72, bar: "from-violet-500 to-indigo-500" },
    { label: "Proposal", count: 17, width: 48, bar: "from-sky-400 to-sky-600" },
    { label: "Won", count: 14, width: 34, bar: "from-emerald-400 to-emerald-600" },
  ];
  return (
    <div className="grid h-full grid-cols-5 gap-3">
      <div className="col-span-3 flex flex-col justify-center gap-2">
        <p className="text-[10px] font-bold tracking-wide text-brand-muted uppercase">Lead funnel</p>
        {funnel.map((row, index) => (
          <div key={row.label} className="flex items-center gap-2">
            <span className="w-14 text-[10px] font-semibold text-brand-muted">{row.label}</span>
            <span className="h-4 flex-1 rounded bg-brand-surface">
              <span className={cn("demo-grow-x block h-full rounded bg-gradient-to-r", row.bar)} style={{ width: `${row.width}%`, ...dash(index * 90) }} />
            </span>
            <span className="w-5 text-right text-[10px] font-bold text-brand-text">{row.count}</span>
          </div>
        ))}
      </div>
      <div className="col-span-2 flex flex-col items-center justify-center rounded-xl bg-brand-surface p-2 text-center ring-1 ring-brand-border">
        <span className="demo-rise rounded-full bg-emerald-100 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700">New lead</span>
        <div className="mt-1.5 flex items-center gap-2">
          <Ring value={clamp(p / 40) * 0.86} size={44} stroke={5}>
            {Math.round(clamp(p / 40) * 86)}
          </Ring>
          <div className="text-left">
            <p className="text-[11px] leading-tight font-extrabold text-brand-text">Aurora Textiles</p>
            <p className="text-[9px] text-brand-muted">Web form, just now</p>
          </div>
        </div>
        <span className={cn("mt-1.5 rounded-full bg-brand-purple px-2 py-0.5 text-[9px] font-bold text-white transition-opacity duration-500", p > 45 ? "opacity-100" : "opacity-0")}>
          Assigned to R. Mehta
        </span>
      </div>
    </div>
  );
}

function SalesScreen({ p }: { p: number }) {
  const column = p < 34 ? 0 : p < 67 ? 1 : 2;
  const columns = [
    { label: "Proposal", dot: "bg-sky-500", other: "Helix Motors" },
    { label: "Negotiation", dot: "bg-amber-500", other: "Meridian Steel" },
    { label: "Won", dot: "bg-emerald-500", other: "Vertex Labs" },
  ];
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold tracking-wide text-brand-muted uppercase">Pipeline</p>
        <span className="text-[10px] font-bold text-brand-text">
          Forecast <span className="text-emerald-600">₹69.8L</span>
        </span>
      </div>
      <div className="grid flex-1 grid-cols-3 gap-2">
        {columns.map((col, index) => (
          <div key={col.label} className={cn("flex flex-col gap-1.5 rounded-lg p-1.5 transition-colors duration-500", index === column ? "bg-brand-purple-light ring-1 ring-brand-purple/30" : "bg-brand-surface")}>
            <p className="flex items-center gap-1 text-[9px] font-bold text-brand-text">
              <span className={cn("size-1.5 rounded-full", col.dot)} /> {col.label}
            </p>
            <div className="rounded-md bg-white p-1.5 text-[9px] shadow-sm ring-1 ring-brand-border">
              <p className="font-bold text-brand-text">{col.other}</p>
              <p className="text-brand-muted">₹{index === 2 ? "2.8" : index === 1 ? "2.1" : "2.4"}L</p>
            </div>
            {index === column && (
              <div key={column} className="demo-rise rounded-md bg-white p-1.5 text-[9px] shadow-md ring-2 ring-brand-purple">
                <p className="font-bold text-brand-text">Aurora Textiles</p>
                <p className="font-semibold text-brand-purple">₹3.1L</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function HrmsScreen({ p }: { p: number }) {
  const week = [
    ["Mon", 88],
    ["Tue", 94],
    ["Wed", 91],
    ["Thu", 96],
    ["Fri", 86],
  ] as const;
  const approved = p > 55;
  return (
    <div className="grid h-full grid-cols-2 gap-3">
      <div className="flex flex-col justify-center gap-2">
        <p className="text-[10px] font-bold tracking-wide text-brand-muted uppercase">Attendance today</p>
        <div className="flex items-center gap-3">
          <Ring value={clamp(p / 40) * 0.92} size={58} color="#10b981">
            {Math.round(clamp(p / 40) * 92)}%
          </Ring>
          <div className="text-[10px] text-brand-muted">
            <p><b className="text-brand-text">228</b> present</p>
            <p><b className="text-brand-text">20</b> on leave</p>
          </div>
        </div>
        <div className="flex h-9 items-end gap-1.5">
          {week.map(([day, value], index) => (
            <span key={day} className="flex flex-1 flex-col items-center gap-0.5">
              <span className="dash-bar w-full rounded-t bg-gradient-to-t from-emerald-500 to-emerald-300" style={{ height: `${(value - 70) * 3}%`, ...dash(index * 70) }} />
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center gap-2 rounded-xl bg-brand-surface p-2.5 ring-1 ring-brand-border">
        <p className="text-[10px] font-bold tracking-wide text-brand-muted uppercase">Leave request</p>
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-full bg-rose-100 text-[10px] font-extrabold text-rose-700">SK</span>
          <div>
            <p className="text-[11px] leading-tight font-extrabold text-brand-text">Sana Khan</p>
            <p className="text-[9px] text-brand-muted">Casual leave, 2 days</p>
          </div>
        </div>
        <span className={cn("inline-flex items-center justify-center gap-1 rounded-lg px-2 py-1.5 text-[10px] font-bold transition-colors duration-500", approved ? "bg-emerald-500 text-white" : "bg-white text-brand-text ring-1 ring-brand-border")}>
          {approved ? <><Check className="size-3" aria-hidden /> Approved from phone</> : "Waiting for approval"}
        </span>
      </div>
    </div>
  );
}

function ProjectsScreen({ p }: { p: number }) {
  const rows = [
    { label: "Kickoff", start: 0, len: 22, bar: "bg-violet-500" },
    { label: "Design", start: 16, len: 30, bar: "bg-sky-500" },
    { label: "Build", start: 40, len: 38, bar: "bg-brand-purple" },
    { label: "Launch", start: 76, len: 24, bar: "bg-emerald-500" },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-2">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold tracking-wide text-brand-muted uppercase">Aurora rollout</p>
        <span className="text-[10px] font-semibold text-brand-muted">Week 1 to 6</span>
      </div>
      <div className="relative flex flex-col gap-1.5">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center gap-2">
            <span className="w-11 text-[10px] font-semibold text-brand-muted">{row.label}</span>
            <span className="relative h-4 flex-1 rounded bg-brand-surface">
              <span className="absolute inset-y-0 rounded bg-black/5" style={{ left: `${row.start}%`, width: `${row.len}%` }} />
              <span className={cn("absolute inset-y-0 rounded transition-all duration-500", row.bar)} style={{ left: `${row.start}%`, width: `${row.len * clamp((p - row.start) / row.len)}%` }} />
            </span>
          </div>
        ))}
        <span aria-hidden className="absolute top-0 bottom-0 w-px bg-rose-400 transition-all duration-500" style={{ left: `calc(3.25rem + (100% - 3.25rem) * ${p / 100})` }} />
      </div>
      <div className="flex items-center gap-2 text-[10px] text-brand-muted">
        <span className="flex -space-x-1.5">
          {["bg-violet-400", "bg-sky-400", "bg-amber-400", "bg-emerald-400"].map((tone) => (
            <span key={tone} className={cn("size-4 rounded-full ring-2 ring-white", tone)} />
          ))}
        </span>
        <b className="text-brand-text">{Math.round(p * 0.12)}</b> of 12 tasks done
      </div>
    </div>
  );
}

function FinanceScreen({ p }: { p: number }) {
  const status = p < 25 ? { label: "Draft", tone: "bg-slate-100 text-slate-600" } : p < 60 ? { label: "Sent", tone: "bg-sky-100 text-sky-700" } : { label: "Paid", tone: "bg-emerald-100 text-emerald-700" };
  const points = [34, 40, 36, 52, 58, 76];
  const path = points.map((y, index) => `${index === 0 ? "M" : "L"}${index * 28},${64 - y * 0.8}`).join(" ");
  return (
    <div className="grid h-full grid-cols-5 gap-3">
      <div className="col-span-2 flex flex-col justify-center gap-1 rounded-xl bg-brand-surface p-2.5 ring-1 ring-brand-border">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-bold text-brand-muted">INV-1042</span>
          <span key={status.label} className={cn("demo-rise rounded-full px-1.5 py-0.5 text-[9px] font-bold", status.tone)}>{status.label}</span>
        </div>
        <p className="text-[11px] font-extrabold text-brand-text">Aurora Textiles</p>
        <p className="text-base leading-none font-extrabold text-brand-text">₹3,10,000</p>
        <p className="text-[9px] text-brand-muted">GST applied automatically</p>
        <div className="mt-1 flex gap-1" aria-hidden>
          {[0, 25, 60].map((step) => (
            <span key={step} className={cn("h-1 flex-1 rounded-full transition-colors duration-500", p >= step ? "bg-brand-purple" : "bg-brand-border")} />
          ))}
        </div>
      </div>
      <div className="col-span-3 flex flex-col justify-center">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold tracking-wide text-brand-muted uppercase">Cash in</p>
          <span className="text-[10px] font-bold text-emerald-600">+18% this quarter</span>
        </div>
        <svg viewBox="0 0 140 64" className="mt-1 h-16 w-full" preserveAspectRatio="none" aria-hidden>
          <defs>
            <linearGradient id="tour-cash" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6c35f5" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#6c35f5" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${path} L140,64 L0,64 Z`} fill="url(#tour-cash)" style={{ opacity: clamp(p / 70) }} className="transition-opacity duration-500" />
          <path d={path} fill="none" stroke="#6c35f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - clamp(p / 80)} className="transition-all duration-500" />
        </svg>
        <div className="flex justify-between text-[9px] text-brand-muted">
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month) => (
            <span key={month}>{month}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function AiScreen({ p }: { p: number }) {
  const answered = p > 28;
  const deals = [
    ["Northwind", 82],
    ["Helix Motors", 64],
    ["Orbit Retail", 51],
  ] as const;
  return (
    <div className="flex h-full flex-col justify-center gap-1.5">
      <span className="demo-rise ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-brand-purple px-2.5 py-1.5 text-[10px] font-semibold text-white">Which deals will close this month?</span>
      <div className="max-w-[92%] rounded-2xl rounded-bl-sm bg-brand-surface px-2.5 py-1.5 ring-1 ring-brand-border">
        {answered ? (
          <div key="answer" className="demo-rise">
            <p className="text-[10px] font-semibold text-brand-text">3 deals look likely, worth ₹9.4L together.</p>
            <div className="mt-1 flex flex-col gap-1">
              {deals.map(([name, chance], index) => (
                <div key={name} className="flex items-center gap-2 text-[9px]">
                  <span className="w-16 text-brand-muted">{name}</span>
                  <span className="h-1.5 flex-1 rounded-full bg-white">
                    <span className="demo-grow-x block h-full rounded-full bg-gradient-to-r from-violet-400 to-brand-purple" style={{ width: `${chance}%`, ...dash(index * 120) }} />
                  </span>
                  <span className="w-6 text-right font-bold text-brand-text">{chance}%</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <span className="flex items-center gap-1 py-1" aria-label="Thinking">
            {[0, 1, 2].map((dot) => (
              <span key={dot} className="wave-bar size-1.5 rounded-full bg-brand-purple/60" style={{ animationDelay: `${dot * 120}ms`, height: 6 }} />
            ))}
          </span>
        )}
      </div>
    </div>
  );
}

const screens = [CrmScreen, SalesScreen, HrmsScreen, ProjectsScreen, FinanceScreen, AiScreen];

export function TourDashboard() {
  const [chapter, setChapter] = useState(0);
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(true);
  const current = chapters[chapter];
  const Screen = screens[chapter];
  const elapsed = Math.round(chapter * 20 + (progress / 100) * 20);

  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => {
      if (progress + STEP >= 100) {
        if (chapter >= chapters.length - 1) {
          setProgress(100);
          setPlaying(false);
        } else {
          setChapter((value) => value + 1);
          setProgress(0);
        }
      } else {
        setProgress((value) => value + STEP);
      }
    }, 420);
    return () => clearTimeout(timer);
  }, [playing, progress, chapter]);

  const finished = chapter === chapters.length - 1 && progress >= 100;
  const insight = finished ? "That's the tour. Start free to try it with your own data." : current.caption;

  return (
    <PreviewFrame title="Platform Tour" period="2 minutes" insight={insight} badge="Six modules, one story">
      <div className="mt-4 overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-brand-border">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 bg-brand-surface px-3 py-1.5" aria-hidden>
          <span className="flex gap-1">
            <span className="size-2 rounded-full bg-rose-300" />
            <span className="size-2 rounded-full bg-amber-300" />
            <span className="size-2 rounded-full bg-emerald-300" />
          </span>
          <span className="mx-auto rounded-md bg-white px-3 py-0.5 text-[9px] font-semibold text-brand-muted ring-1 ring-brand-border">app.sortboxs.com/{current.slug}</span>
          <span className="w-8" />
        </div>

        <div className="flex">
          {/* App sidebar: follows the active chapter */}
          <div className="flex w-11 shrink-0 flex-col items-center gap-1.5 border-r border-brand-border bg-white py-2" aria-hidden>
            {chapters.map((item, index) => {
              const icon = modules.find((module) => module.slug === item.slug)?.icon;
              return (
                <span key={item.key} className={cn("flex size-7 items-center justify-center rounded-lg transition-colors duration-300", index === chapter ? "bg-brand-purple-light ring-1 ring-brand-purple/40" : "opacity-50")}>
                  {icon ? <Image src={icon} alt="" width={16} height={16} /> : null}
                </span>
              );
            })}
          </div>
          <div key={chapter} className="demo-rise h-[184px] min-w-0 sm:h-[158px] flex-1 p-3">
            <Screen p={progress} />
          </div>
        </div>

        <div className="flex items-center gap-3 bg-brand-navy px-3 py-2">
          <button
            type="button"
            aria-label={playing ? "Pause tour" : finished ? "Replay tour" : "Play tour"}
            onClick={() => {
              if (finished) {
                setChapter(0);
                setProgress(0);
              }
              setPlaying((value) => !value);
            }}
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-brand-navy outline-none hover:bg-brand-purple-light focus-visible:ring-2 focus-visible:ring-white/70"
          >
            {playing ? <Pause className="size-3.5 fill-current" aria-hidden /> : <Play className="ml-0.5 size-3.5 fill-current" aria-hidden />}
          </button>
          <div className="min-w-0 flex-1">
            <div className="flex gap-1" aria-hidden>
              {chapters.map((item, index) => (
                <span key={item.key} className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/20">
                  <span className="block h-full rounded-full bg-white transition-all duration-300" style={{ width: index < chapter ? "100%" : index === chapter ? `${progress}%` : "0%" }} />
                </span>
              ))}
            </div>
          </div>
          <span className="text-[10px] font-semibold text-white/80 tabular-nums">
            {Math.floor(elapsed / 60)}:{String(elapsed % 60).padStart(2, "0")} / 2:00
          </span>
        </div>
      </div>

      <div role="group" aria-label="Chapters" className="mt-3 grid grid-cols-3 gap-1.5 sm:grid-cols-6">
        {chapters.map((item, index) => (
          <button
            key={item.key}
            type="button"
            aria-pressed={index === chapter}
            onClick={() => {
              setChapter(index);
              setProgress(0);
            }}
            className={cn(
              "rounded-lg px-2 py-1.5 text-[11px] font-semibold outline-none ring-1 transition-colors focus-visible:ring-2 focus-visible:ring-brand-purple/60",
              index === chapter ? "bg-brand-purple text-white ring-brand-purple" : index < chapter ? "bg-emerald-50 text-emerald-800 ring-emerald-200" : "bg-brand-surface text-brand-muted ring-transparent hover:text-brand-text"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
    </PreviewFrame>
  );
}
