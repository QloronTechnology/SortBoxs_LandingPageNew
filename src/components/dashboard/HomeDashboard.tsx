"use client";

import { useEffect, useRef, useState } from "react";
import { Caveat } from "next/font/google";
import {
  Home,
  Users2,
  TrendingUp,
  Headphones,
  UsersRound,
  Briefcase,
  Wallet,
  ShoppingCart,
  Warehouse,
  Megaphone,
  BarChart3,
  Settings2,
  Search,
  History,
  Bell,
  TriangleAlert,
  Sparkles,
  ShieldCheck,
  UserPlus,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { MetricCard } from "./MetricCard";
import { ChartCard } from "./ChartCard";
import { BarChart } from "./BarChart";
import { DonutChart } from "./DonutChart";
import { LineChart } from "./LineChart";
import { FloatingStat } from "./FloatingStat";
import { MouseCursor } from "./MouseCursor";
import { KanbanBoard } from "./KanbanBoard";
import { ProjectsBoard } from "./ProjectsBoard";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "crm", label: "CRM", icon: Users2 },
  { id: "leads", label: "Leads", icon: UserPlus },
  { id: "sales", label: "Sales", icon: TrendingUp },
  { id: "services", label: "Services", icon: Headphones },
  { id: "hrms", label: "HRMS", icon: UsersRound },
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "finance", label: "Finance", icon: Wallet },
  { id: "procurement", label: "Procurement", icon: ShoppingCart },
  { id: "inventory", label: "Inventory", icon: Warehouse },
  { id: "marketing", label: "Marketing", icon: Megaphone },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
];

const metrics = [
  { label: "Revenue", value: "₹18.4L", change: "12%", trend: "up" as const, icon: TrendingUp, iconBg: "bg-brand-purple-light", iconColor: "text-brand-purple" },
  { label: "New Leads", value: "124", change: "23%", trend: "up" as const, icon: UserPlus, iconBg: "bg-emerald-50", iconColor: "text-emerald-600" },
  { label: "Open Tickets", value: "32", change: "5%", trend: "down" as const, icon: TriangleAlert, iconBg: "bg-rose-50", iconColor: "text-rose-500" },
  { label: "Conversions", value: "50", change: "7%", trend: "up" as const, icon: ShieldCheck, iconBg: "bg-sky-50", iconColor: "text-sky-600" },
];

const pipeline = [
  { label: "Leads", value: 120 },
  { label: "Qualified", value: 100 },
  { label: "Proposal", value: 55 },
  { label: "Negotiation", value: 90 },
  { label: "Closed", value: 40, color: "linear-gradient(180deg, #34d399 0%, #10b981 100%)" },
];

const revenueTrend = [6, 8, 7, 11, 10, 14, 18];
const revenueLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

const taskSegments = [
  { label: "Completed", value: 70, color: "#6c35f5" },
  { label: "In Progress", value: 20, color: "#38bdf8" },
  { label: "Overdue", value: 8, color: "#fb7185" },
];

const aiInsights = [
  "Seller likely to increase by 30% this quarter.",
  "High-value leads need follow-up.",
  "Conversion rate improved to 12%.",
  "Goodwill marketing & link building ideas.",
];

const floatingStats = [
  { icon: Users2, iconBg: "bg-brand-purple-light", iconColor: "text-brand-purple", value: "124", label: "New Leads" },
  { icon: BarChart3, iconBg: "bg-brand-purple-light", iconColor: "text-brand-purple", value: "₹18.4L", label: "Pipeline" },
  { icon: ShieldCheck, iconBg: "bg-sky-50", iconColor: "text-sky-600", value: "92%", label: "SLA Compliance" },
  { icon: Briefcase, iconBg: "bg-brand-purple-light", iconColor: "text-brand-purple", value: "18", label: "Open Positions" },
  { icon: Sparkles, iconBg: "bg-brand-purple-light", iconColor: "text-brand-purple", value: "AI Insight", label: "Available" },
];

const caveat = Caveat({ subsets: ["latin"], weight: "600" });

const POS = {
  home: { x: 9, y: 13 },
  leads: { x: 9, y: 21.5 },
  projects: { x: 9, y: 39.5 },
};

export function HomeDashboard() {
  const [mounted, setMounted] = useState(false);
  const [activeItem, setActiveItem] = useState<"home" | "leads" | "projects">("home");
  const [view, setView] = useState<"home" | "kanban" | "projects">("home");
  const [cardMoved, setCardMoved] = useState(false);
  const [cursor, setCursor] = useState({ x: POS.home.x, y: POS.home.y, visible: false, clicking: false });

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const schedule = (fn: () => void, delay: number) => {
      const id = setTimeout(fn, delay);
      timers.current.push(id);
    };

    schedule(() => setMounted(true), 150);

    function runCycle() {
      // Show the home dashboard for a while before the guided tour starts.
      schedule(() => {
        setCursor((c) => ({ ...c, x: 55, y: 8, visible: true }));
        schedule(() => setCursor({ x: POS.leads.x, y: POS.leads.y, visible: true, clicking: false }), 60);
      }, 7000);

      schedule(() => setCursor((c) => ({ ...c, clicking: true })), 7900);
      schedule(() => {
        setCursor((c) => ({ ...c, clicking: false }));
        setActiveItem("leads");
        setView("kanban");
      }, 8200);

      schedule(() => setCardMoved(true), 10200);

      schedule(() => setCursor((c) => ({ ...c, x: POS.projects.x, y: POS.projects.y })), 14200);
      schedule(() => setCursor((c) => ({ ...c, clicking: true })), 15100);
      schedule(() => {
        setCursor((c) => ({ ...c, clicking: false }));
        setActiveItem("projects");
        setView("projects");
      }, 15400);

      schedule(() => setCursor((c) => ({ ...c, x: POS.home.x, y: POS.home.y })), 21400);
      schedule(() => setCursor((c) => ({ ...c, clicking: true })), 22300);
      schedule(() => {
        setCursor((c) => ({ ...c, clicking: false, visible: false }));
        setActiveItem("home");
        setView("home");
        setCardMoved(false);
      }, 22600);

      schedule(runCycle, 29600);
    }

    runCycle();

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, []);

  return (
    <div className="flex items-start gap-3">
      <div className="relative min-w-0 flex-1 overflow-hidden rounded-2xl border border-brand-border bg-white shadow-xl shadow-brand-navy/5">
        <div className="flex">
          <aside className="hidden w-36 shrink-0 border-r border-slate-100 py-3 sm:block">
            <div className="px-4 pb-2">
              <Logo width={110} height={34} />
            </div>
            <nav className="flex flex-col gap-0 px-2">
              {sidebarItems.map((item) => (
                <span
                  key={item.id}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-2.5 py-1 text-[10.5px] font-medium transition-colors duration-300",
                    activeItem === item.id ? "bg-brand-purple-light text-brand-purple" : "text-slate-500"
                  )}
                >
                  <item.icon className="size-3.5 shrink-0" aria-hidden />
                  {item.label}
                </span>
              ))}
            </nav>
            <div className="mx-4 my-1.5 border-t border-slate-100" />
            <div className="px-2">
              <span className="flex items-center gap-2 rounded-lg px-2.5 py-1 text-[10.5px] font-medium text-slate-500">
                <Settings2 className="size-3.5 shrink-0" aria-hidden />
                Automation
              </span>
            </div>
          </aside>

          <div className="min-w-0 flex-1 p-3">
            <div className="mb-2.5 flex items-center justify-between gap-3">
              <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg bg-slate-50 px-3 py-1">
                <Search className="size-3.5 shrink-0 text-slate-400" aria-hidden />
                <span className="truncate text-[11px] text-slate-400">Search anything...</span>
              </div>
              <div className="flex shrink-0 items-center gap-1.5 text-slate-400">
                <History className="size-4" aria-hidden />
                <Bell className="size-4" aria-hidden />
                <TriangleAlert className="size-4" aria-hidden />
                <span className="flex size-6 items-center justify-center rounded-full bg-brand-purple text-[10px] font-bold text-white">
                  A
                </span>
              </div>
            </div>

            <div className="relative min-h-[470px]">
              <div
                className={cn(
                  "transition-opacity duration-300",
                  view === "home" ? "opacity-100" : "pointer-events-none absolute inset-0 opacity-0"
                )}
              >
                <div className="mb-2.5 flex items-center justify-between">
                  <div>
                    <h3 className="text-[15px] font-bold text-brand-text">Good morning, Nikhilesh!</h3>
                    <p className="text-[11px] text-slate-500">Here&apos;s what&apos;s happening with your business today.</p>
                  </div>
                  <span className="hidden items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-[11px] font-medium text-slate-500 sm:flex">
                    Last 7 days
                  </span>
                </div>

                <div className="mb-2.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {metrics.map((metric, index) => (
                    <div
                      key={metric.label}
                      className="transition-all duration-500"
                      style={{
                        transitionDelay: `${index * 80}ms`,
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? "translateY(0)" : "translateY(8px)",
                      }}
                    >
                      <MetricCard {...metric} />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  <ChartCard title="Sales Pipeline" action="This Month" className="sm:col-span-2">
                    <BarChart data={pipeline} animate={mounted} />
                  </ChartCard>
                  <ChartCard title="Task Completion">
                    <DonutChart segments={taskSegments} centerValue="70%" centerLabel="Completed" animate={mounted} />
                  </ChartCard>
                  <ChartCard title="Revenue Analytics" action="View Report" className="sm:col-span-2">
                    <LineChart points={revenueTrend} labels={revenueLabels} animate={mounted} />
                  </ChartCard>
                  <ChartCard title="AI Insights">
                    <ul className="flex flex-col gap-1.5">
                      {aiInsights.slice(0, 3).map((insight, index) => (
                        <li
                          key={insight}
                          className="flex items-start gap-2 text-[10.5px] leading-snug text-slate-600 transition-all duration-500"
                          style={{
                            transitionDelay: `${300 + index * 100}ms`,
                            opacity: mounted ? 1 : 0,
                            transform: mounted ? "translateX(0)" : "translateX(-6px)",
                          }}
                        >
                          <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded bg-brand-purple-light text-[9px] font-bold text-brand-purple">
                            A
                          </span>
                          {insight}
                        </li>
                      ))}
                    </ul>
                  </ChartCard>
                </div>
              </div>

              <div
                className={cn(
                  "transition-opacity duration-300",
                  view === "kanban" ? "opacity-100" : "pointer-events-none absolute inset-0 opacity-0"
                )}
              >
                <div className="rounded-xl border border-slate-100 bg-white p-3">
                  <KanbanBoard cardMoved={cardMoved} />
                </div>
                <p className="mt-2.5 text-center text-[11px] text-slate-400">
                  Drag leads across stages as deals progress — SortBoxs keeps everyone in sync.
                </p>
              </div>

              <div
                className={cn(
                  "transition-opacity duration-300",
                  view === "projects" ? "opacity-100" : "pointer-events-none absolute inset-0 opacity-0"
                )}
              >
                <div className="rounded-xl border border-slate-100 bg-white p-3">
                  <ProjectsBoard animate={view === "projects"} />
                </div>
                <p className="mt-2.5 text-center text-[11px] text-slate-400">
                  Track progress, deadlines and team workload — all in one place.
                </p>
              </div>
            </div>
          </div>
        </div>

        <MouseCursor x={cursor.x} y={cursor.y} visible={cursor.visible} clicking={cursor.clicking} />
      </div>

      <div className="hidden w-32 shrink-0 flex-col gap-3 pt-6 xl:flex">
        {floatingStats.map((stat, index) => (
          <FloatingStat key={stat.label} {...stat} delay={index * 120} animate={mounted} />
        ))}
        <div className="animate-float-y mt-2 pl-2">
          <p className={cn(caveat.className, "text-lg leading-tight text-brand-purple/80")}>
            All your teams,
            <br />
            in one place.
          </p>
          <svg width="40" height="28" viewBox="0 0 40 28" fill="none" className="mt-1 text-brand-purple/60">
            <path
              d="M36 4c-8 2-22 4-30 14"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              fill="none"
            />
            <path d="M4 12 3 19l7-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </div>
      </div>
    </div>
  );
}
