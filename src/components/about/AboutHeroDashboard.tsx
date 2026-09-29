"use client";

import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import Image from "next/image";
import {
  BarChart3,
  Bell,
  Briefcase,
  CheckCircle2,
  Clock3,
  Home,
  Search,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Users2,
  UsersRound,
  Wallet,
  Warehouse,
  type LucideIcon,
} from "lucide-react";
import { assets } from "@/config/assets";
import { cn } from "@/lib/utils";

/**
 * About page hero: a miniature SortBoxs workspace (real logo) that cycles through teams — CRM, HRMS,
 * Finance, Projects — to show "One Platform. Every Team." Each switch slides the sidebar highlight and
 * re-plays the panel's entrances (cards rise, bars grow, the line draws). Sample figures only, in the
 * style of the home page dashboard. Decorative (aria-hidden). Pauses on hover and while the tab is
 * hidden; with prefers-reduced-motion it shows the CRM view, still.
 *
 * Drawn on a fixed virtual canvas and scaled to its container's width (like PricingHeroDashboard).
 */

const W = 560;
const H = 380;
const CYCLE_MS = 3600;

type Chart =
  | { kind: "bars"; title: string; labels: string[]; values: number[] }
  | { kind: "line"; title: string; labels: string[]; values: number[] }
  | { kind: "progress"; title: string; rows: { label: string; value: number }[] };

interface Workspace {
  id: string;
  label: string;
  icon: LucideIcon;
  heading: string;
  kpis: { label: string; value: string; change: string; up: boolean }[];
  chart: Chart;
  list: { title: string; items: { label: string; meta: string; tone: "green" | "amber" | "purple" }[] };
  insight: string;
}

const workspaces: Workspace[] = [
  {
    id: "crm",
    label: "CRM",
    icon: Users2,
    heading: "Sales pipeline",
    kpis: [
      { label: "Revenue", value: "₹18.4L", change: "12%", up: true },
      { label: "New Leads", value: "124", change: "23%", up: true },
    ],
    chart: { kind: "bars", title: "Pipeline by stage", labels: ["Leads", "Qualified", "Proposal", "Negot.", "Closed"], values: [100, 74, 44, 62, 38] },
    list: {
      title: "Top deals",
      items: [
        { label: "Acme Corp", meta: "₹4.2L", tone: "green" },
        { label: "Nova Retail", meta: "₹2.8L", tone: "purple" },
        { label: "Zenith Labs", meta: "₹1.9L", tone: "amber" },
      ],
    },
    insight: "High-value leads need follow-up this week.",
  },
  {
    id: "hrms",
    label: "HRMS",
    icon: UsersRound,
    heading: "People overview",
    kpis: [
      { label: "Employees", value: "248", change: "8 new", up: true },
      { label: "On leave today", value: "12", change: "3%", up: false },
    ],
    chart: { kind: "bars", title: "Attendance this week", labels: ["Mon", "Tue", "Wed", "Thu", "Fri"], values: [92, 96, 88, 94, 80] },
    list: {
      title: "Leave requests",
      items: [
        { label: "Priya S.", meta: "Pending", tone: "amber" },
        { label: "Rahul K.", meta: "Approved", tone: "green" },
        { label: "Anita M.", meta: "Pending", tone: "amber" },
      ],
    },
    insight: "2 leave requests are waiting for your approval.",
  },
  {
    id: "finance",
    label: "Finance",
    icon: Wallet,
    heading: "Cash flow",
    kpis: [
      { label: "Collections", value: "₹12.6L", change: "12%", up: true },
      { label: "Outstanding", value: "₹3.2L", change: "5%", up: false },
    ],
    chart: { kind: "line", title: "Revenue trend", labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"], values: [30, 44, 36, 52, 48, 66, 80] },
    list: {
      title: "Invoices",
      items: [
        { label: "INV-1042", meta: "Paid", tone: "green" },
        { label: "INV-1043", meta: "Due", tone: "amber" },
        { label: "INV-1044", meta: "Paid", tone: "green" },
      ],
    },
    insight: "Collections are up 12% compared with last month.",
  },
  {
    id: "projects",
    label: "Projects",
    icon: Briefcase,
    heading: "Active projects",
    kpis: [
      { label: "Active projects", value: "6", change: "2 new", up: true },
      { label: "Tasks done", value: "68%", change: "9%", up: true },
    ],
    chart: {
      kind: "progress",
      title: "Progress",
      rows: [
        { label: "Website Redesign", value: 72 },
        { label: "Mobile App", value: 45 },
        { label: "CRM Integration", value: 88 },
      ],
    },
    list: {
      title: "Due soon",
      items: [
        { label: "Design review", meta: "Today", tone: "purple" },
        { label: "Sprint demo", meta: "Fri", tone: "amber" },
        { label: "Launch prep", meta: "Oct 12", tone: "green" },
      ],
    },
    insight: "Website Redesign is on track for Oct 12.",
  },
];

/** Sidebar: the workspaces above plus a few static items. */
const sidebar: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "home", label: "Home", icon: Home },
  ...workspaces.map(({ id, label, icon }) => ({ id, label, icon })),
  { id: "inventory", label: "Inventory", icon: Warehouse },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
];

const ROW = 30; // sidebar item height (px, canvas units)

const tone = {
  green: "bg-emerald-50 text-emerald-700",
  amber: "bg-amber-50 text-amber-700",
  purple: "bg-brand-purple-light text-brand-purple",
};

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia(reducedMotionQuery);
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => window.matchMedia(reducedMotionQuery).matches,
    () => false
  );
}

export function AboutHeroDashboard({ className, style }: { className?: string; style?: CSSProperties }) {
  const reduced = usePrefersReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useLayoutEffect(() => {
    const measure = () => {
      if (box.current) setScale(box.current.clientWidth / W);
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (box.current) observer.observe(box.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || paused) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const schedule = () => {
      clearTimeout(timer);
      if (!document.hidden) timer = setTimeout(() => setIndex((i) => (i + 1) % workspaces.length), CYCLE_MS);
    };
    schedule();
    document.addEventListener("visibilitychange", schedule);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, [index, paused, reduced]);

  const ws = workspaces[reduced ? 0 : index];
  const activeRow = sidebar.findIndex((item) => item.id === ws.id);

  return (
    <div
      ref={box}
      aria-hidden
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className={cn("relative select-none", className)}
      style={{ ...style, height: scale ? H * scale : undefined, aspectRatio: scale ? undefined : `${W} / ${H}` }}
    >
      <div
        className={cn(
          "absolute top-0 left-0 flex origin-top-left overflow-hidden rounded-[18px] bg-white text-brand-text shadow-[0_30px_60px_-24px_rgba(76,43,180,0.45)] ring-1 ring-brand-border",
          !scale && "invisible"
        )}
        style={{ width: W, height: H, transform: `scale(${scale || 1})` }}
      >
        {/* Sidebar with the real SortBoxs logo */}
        <div className="flex w-[124px] shrink-0 flex-col border-r border-brand-border bg-[#faf9ff] px-2.5 pt-3.5">
          <Image src={assets.brand.logo} alt="" width={246} height={55} className="mb-4 ml-1 h-[26px] w-auto self-start" />
          <div className="relative">
            <span
              className="absolute inset-x-0 top-0 rounded-lg bg-brand-purple shadow-md shadow-brand-purple/30 transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
              style={{ height: ROW - 4, transform: `translateY(${activeRow * ROW}px)` }}
            />
            {sidebar.map(({ id, label, icon: Icon }) => {
              const active = id === ws.id;
              return (
                <div
                  key={id}
                  className={cn(
                    "relative flex items-center gap-2 rounded-lg px-2 text-[11px] font-medium transition-colors duration-300",
                    active ? "text-white" : "text-brand-text/75"
                  )}
                  style={{ height: ROW - 4, marginBottom: 4 }}
                >
                  <Icon className="size-[13px]" />
                  {label}
                </div>
              );
            })}
          </div>
          <div className="mt-auto mb-3 flex items-center gap-1.5 rounded-lg bg-white px-2 py-1.5 text-[9px] whitespace-nowrap text-brand-muted ring-1 ring-brand-border">
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden" />
              <span className="relative size-2 rounded-full bg-emerald-500" />
            </span>
            All teams in sync
          </div>
        </div>

        {/* Main panel */}
        <div className="flex min-w-0 flex-1 flex-col px-4 pt-3.5 pb-3">
          <div className="flex items-center justify-between">
            <div key={`h-${ws.id}`} className="dash-in" style={d(0)}>
              <p className="text-[14px] leading-tight font-bold">Good morning, Alex</p>
              <p className="text-[10px] text-brand-muted">
                {ws.label} · {ws.heading}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-6 items-center gap-1.5 rounded-full bg-brand-surface px-2.5 text-[9.5px] whitespace-nowrap text-brand-muted ring-1 ring-brand-border">
                <Search className="size-3" /> Search anything…
              </span>
              <span className="relative text-brand-muted">
                <Bell className="size-[15px]" />
                <span className="absolute -top-0.5 -right-0.5 size-1.5 rounded-full bg-rose-500" />
              </span>
              <span className="flex size-6 items-center justify-center rounded-full bg-brand-purple text-[10px] font-bold text-white">A</span>
            </div>
          </div>

          {/* KPIs */}
          <div key={`k-${ws.id}`} className="mt-3 grid grid-cols-2 gap-2.5">
            {ws.kpis.map((kpi, i) => (
              <div key={kpi.label} className="dash-in rounded-xl bg-white p-2.5 ring-1 ring-brand-border" style={d(80 + i * 90)}>
                <p className="text-[10px] text-brand-muted">{kpi.label}</p>
                <div className="mt-0.5 flex items-end justify-between">
                  <p className="text-[20px] leading-none font-bold tabular-nums">{kpi.value}</p>
                  <span
                    className={cn(
                      "flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9.5px] font-semibold",
                      kpi.up ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-500"
                    )}
                  >
                    {kpi.up ? <TrendingUp className="size-2.5" /> : <TrendingDown className="size-2.5" />}
                    {kpi.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Chart + list */}
          <div key={`c-${ws.id}`} className="mt-2.5 grid min-h-0 flex-1 grid-cols-[1fr_140px] gap-2.5">
            <div className="dash-in flex min-h-0 flex-col rounded-xl bg-white p-2.5 ring-1 ring-brand-border" style={d(200)}>
              <p className="text-[10.5px] font-semibold">{ws.chart.title}</p>
              <ChartView chart={ws.chart} />
            </div>
            <div className="dash-in rounded-xl bg-white p-2.5 ring-1 ring-brand-border" style={d(280)}>
              <p className="text-[10.5px] font-semibold">{ws.list.title}</p>
              <ul className="mt-2 space-y-1.5">
                {ws.list.items.map((item, i) => (
                  <li key={item.label} className="dash-in flex items-center justify-between gap-1" style={d(360 + i * 90)}>
                    <span className="truncate text-[10px]">{item.label}</span>
                    <span className={cn("shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-semibold", tone[item.tone])}>{item.meta}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* AI assistant */}
          <div key={`a-${ws.id}`} className="dash-in mt-2.5 flex items-center gap-2 rounded-xl bg-[linear-gradient(90deg,#f3effe,#faf9ff)] px-2.5 py-2 ring-1 ring-brand-purple/15" style={d(420)}>
            <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-brand-purple text-white">
              <Sparkles className="size-3.5" />
            </span>
            <p className="min-w-0 flex-1 truncate text-[10.5px]">
              <span className="font-semibold text-brand-purple">AI Assistant · </span>
              {ws.insight}
            </p>
            {ws.id === "hrms" ? <Clock3 className="size-3.5 text-amber-500" /> : <CheckCircle2 className="size-3.5 text-emerald-500" />}
          </div>
        </div>
      </div>
    </div>
  );
}

function ChartView({ chart }: { chart: Chart }) {
  if (chart.kind === "bars") {
    return (
      <div className="mt-2 flex min-h-0 flex-1 items-end gap-2.5 px-1">
        {chart.values.map((value, i) => (
          <div key={chart.labels[i]} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
            <span
              className="dash-bar w-full rounded-t-md bg-[linear-gradient(180deg,#a78bfa,var(--color-brand-purple))]"
              style={{ height: `${value}%`, ...d(250 + i * 70) }}
            />
            <span className="text-[8.5px] text-brand-muted">{chart.labels[i]}</span>
          </div>
        ))}
      </div>
    );
  }
  if (chart.kind === "line") {
    const max = Math.max(...chart.values);
    const points = chart.values.map((v, i) => `${(i / (chart.values.length - 1)) * 100},${100 - (v / max) * 88}`).join(" ");
    return (
      <div className="mt-2 flex min-h-0 flex-1 flex-col">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="min-h-0 w-full flex-1 overflow-visible">
          <defs>
            <linearGradient id="about-dash-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-brand-purple)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--color-brand-purple)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon className="dash-in" style={d(500)} points={`0,100 ${points} 100,100`} fill="url(#about-dash-area)" />
          <polyline
            className="dash-line"
            style={d(250)}
            points={points}
            pathLength={1}
            fill="none"
            stroke="var(--color-brand-purple)"
            strokeWidth="2.2"
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div className="mt-1 flex justify-between text-[8.5px] text-brand-muted">
          {chart.labels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      </div>
    );
  }
  return (
    <ul className="mt-2.5 space-y-3">
      {chart.rows.map((row, i) => (
        <li key={row.label}>
          <div className="flex justify-between text-[9.5px]">
            <span>{row.label}</span>
            <span className="font-semibold text-brand-purple tabular-nums">{row.value}%</span>
          </div>
          <div className="mt-1 h-1.5 rounded-full bg-brand-purple-light">
            <div className="demo-grow-x h-full rounded-full bg-brand-purple" style={{ width: `${row.value}%`, ...d(250 + i * 120) }} />
          </div>
        </li>
      ))}
    </ul>
  );
}
