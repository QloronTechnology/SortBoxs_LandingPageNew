"use client";

import { useEffect, useRef, useState } from "react";
import {
  Boxes,
  User,
  Search,
  SlidersHorizontal,
  Plus,
  TrendingUp,
  TrendingDown,
  Sparkles,
  X,
  Mail,
  Wallet,
  PartyPopper,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MouseCursor } from "@/components/dashboard/MouseCursor";

interface Column {
  label: string;
  count: number;
  totalValue: string;
  /** Compact form shown on phones, where columns are ~55px wide. */
  shortValue: string;
  trend: string;
  trendUp: boolean;
  headerBg: string;
  headerText: string;
  leads: { name: string; value: string }[];
}

const baseColumns: Column[] = [
  {
    label: "New Leads",
    count: 12,
    totalValue: "₹18,50,000",
    shortValue: "₹18.5L",
    trend: "12%",
    trendUp: true,
    headerBg: "bg-brand-purple-light",
    headerText: "text-brand-purple",
    leads: [
      { name: "Rahul Mehta", value: "₹1.2L" },
      { name: "Tanya Bose", value: "₹0.8L" },
    ],
  },
  {
    label: "Qualified",
    count: 9,
    totalValue: "₹12,40,000",
    shortValue: "₹12.4L",
    trend: "8%",
    trendUp: true,
    headerBg: "bg-violet-100",
    headerText: "text-violet-700",
    leads: [
      { name: "Priya Verma", value: "₹3.4L" },
      { name: "Nikhil Joshi", value: "₹1.1L" },
    ],
  },
  {
    label: "Proposal",
    count: 7,
    totalValue: "₹9,75,000",
    shortValue: "₹9.75L",
    trend: "15%",
    trendUp: true,
    headerBg: "bg-sky-100",
    headerText: "text-sky-700",
    leads: [{ name: "Anjali Rao", value: "₹0.9L" }],
  },
  {
    label: "Negotiation",
    count: 4,
    totalValue: "₹6,30,000",
    shortValue: "₹6.3L",
    trend: "5%",
    trendUp: false,
    headerBg: "bg-amber-100",
    headerText: "text-amber-700",
    leads: [{ name: "Sanjay Iyer", value: "₹2.1L" }],
  },
  {
    label: "Won",
    count: 10,
    totalValue: "₹22,80,000",
    shortValue: "₹22.8L",
    trend: "20%",
    trendUp: true,
    headerBg: "bg-emerald-100",
    headerText: "text-emerald-700",
    leads: [{ name: "Kavya Nair", value: "₹1.5L" }],
  },
];

const colCenters = [10, 30, 50, 70, 90];
const PLUS_BUTTON_POS = { x: 96, y: 7 };
const SUBMIT_BUTTON_POS = { x: 50, y: 64 };
const REST_POS = { x: 60, y: 30 };
const STAGE_LABELS = ["New Leads", "Qualified", "Proposal", "Negotiation", "Won"];

type Phase = "idle" | "cursor-plus" | "form" | "cursor-submit" | "submitting" | "pipeline" | "celebrating";

export function GoalsPipelineDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [colIndex, setColIndex] = useState(0);
  const [flying, setFlying] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const [cursor, setCursor] = useState({ x: REST_POS.x, y: REST_POS.y, visible: false, clicking: false });
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const schedule = (fn: () => void, delay: number) => {
      timers.current.push(setTimeout(fn, delay));
    };

    function runCycle() {
      setPhase("idle");
      setCardVisible(false);
      setColIndex(0);
      setFlying(false);
      setCursor({ x: REST_POS.x, y: REST_POS.y, visible: false, clicking: false });

      schedule(() => {
        setCursor({ x: PLUS_BUTTON_POS.x, y: PLUS_BUTTON_POS.y, visible: true, clicking: false });
        setPhase("cursor-plus");
      }, 1500);

      schedule(() => setCursor((c) => ({ ...c, clicking: true })), 2400);
      schedule(() => {
        setCursor((c) => ({ ...c, clicking: false }));
        setPhase("form");
      }, 2700);

      schedule(() => setPhase("form"), 3700);

      schedule(() => {
        setCursor({ x: SUBMIT_BUTTON_POS.x, y: SUBMIT_BUTTON_POS.y, visible: true, clicking: false });
        setPhase("cursor-submit");
      }, 4500);
      schedule(() => setCursor((c) => ({ ...c, clicking: true })), 5300);
      schedule(() => {
        setCursor((c) => ({ ...c, clicking: false, visible: false }));
        setPhase("submitting");
      }, 5600);

      // Card is created in New Leads.
      schedule(() => {
        setPhase("pipeline");
        setColIndex(0);
        setCardVisible(true);
      }, 6000);

      // Walk the card through each stage: New -> Qualified -> Proposal -> Negotiation -> Won.
      const stepDuration = 1500;
      const flightDuration = 1000;
      let t = 6000 + 1300;
      for (let step = 1; step < STAGE_LABELS.length; step++) {
        const target = step;
        schedule(() => {
          setFlying(true);
          setColIndex(target);
        }, t);
        schedule(() => setFlying(false), t + flightDuration);
        t += stepDuration;
      }

      schedule(() => setPhase("celebrating"), t + 200);

      schedule(runCycle, t + 3200);
    }

    runCycle();
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, []);

  const wonSettled = phase === "celebrating";
  const formVisible = phase === "form" || phase === "cursor-submit";

  const columns = baseColumns.map((col, index) => {
    if (!cardVisible) return col;
    if (index === colIndex) return { ...col, count: col.count + 1 };
    return col;
  });

  const totalLeads = columns.reduce((sum, col) => sum + col.count, 0);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-brand-border bg-white p-3 shadow-sm sm:p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Boxes className="size-5 text-brand-purple" aria-hidden />
          <h4 className="text-base font-bold text-brand-text">Goals Pipeline</h4>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs text-slate-400 sm:flex">
            <Search className="size-3.5" aria-hidden />
            Search...
          </div>
          <span className="flex size-7 items-center justify-center rounded-lg border border-slate-200 text-slate-400">
            <SlidersHorizontal className="size-3.5" aria-hidden />
          </span>
          <span
            className={cn(
              "flex size-7 items-center justify-center rounded-lg bg-brand-purple text-white transition-transform duration-150",
              phase === "cursor-plus" && cursor.clicking && "scale-90"
            )}
          >
            <Plus className="size-4" aria-hidden />
          </span>
        </div>
      </div>

      <div
        className={cn(
          "mb-4 flex items-center gap-2 rounded-xl px-3 py-2 text-xs transition-colors duration-500",
          wonSettled ? "bg-emerald-50" : "bg-brand-surface text-slate-600"
        )}
      >
        {wonSettled ? (
          <PartyPopper className="size-3.5 text-emerald-600" aria-hidden />
        ) : (
          <Sparkles className="size-3.5 text-brand-purple" aria-hidden />
        )}
        <span className={cn("font-semibold", wonSettled ? "text-emerald-700" : "text-brand-text")}>
          {wonSettled
            ? "🎉 Deal Won! Aarav Singh closed for ₹1.7L"
            : cardVisible
              ? `Aarav Singh is now in ${STAGE_LABELS[colIndex]}`
              : `${totalLeads} active leads worth ₹69,75,000 in the pipeline`}
        </span>
      </div>

      <div className="relative grid grid-cols-5 gap-1 sm:gap-2.5">
        {columns.map((col, index) => (
          <div
            key={col.label}
            className={cn(
              "flex flex-col rounded-xl border bg-white transition-shadow duration-500",
              wonSettled && index === 4 ? "border-emerald-300 shadow-md shadow-emerald-100" : "border-slate-100"
            )}
          >
            <div
              className={`flex min-h-9 items-center justify-center rounded-t-xl px-0.5 py-1 text-center text-[9px] leading-tight font-semibold sm:min-h-0 sm:px-2 sm:py-1.5 sm:text-[11px] ${col.headerBg} ${col.headerText}`}
            >
              <span>
                {col.label} <span className="whitespace-nowrap">({col.count})</span>
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-1.5 p-1 sm:p-2">
              <p className="text-[9px] text-slate-400 sm:text-[10px]">Total Value</p>
              <div className="flex items-center gap-0.5 sm:gap-1">
                <p className="text-[11px] font-bold whitespace-nowrap text-brand-text sm:text-sm">
                  <span className="sm:hidden">{col.shortValue}</span>
                  <span className="hidden sm:inline">{col.totalValue}</span>
                </p>
                {col.trendUp ? (
                  <TrendingUp className="size-2.5 shrink-0 text-emerald-500 sm:size-3" aria-hidden />
                ) : (
                  <TrendingDown className="size-2.5 shrink-0 text-rose-500 sm:size-3" aria-hidden />
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                {col.leads.map((lead) => (
                  <LeadCard key={lead.name} name={lead.name} value={lead.value} />
                ))}
                {index === 4 && wonSettled && <LeadCard name="Aarav Singh" value="₹1.7L" highlight />}
              </div>
            </div>
          </div>
        ))}

        {cardVisible && !wonSettled && (
          <div
            className="pointer-events-none absolute flex w-[18%] -translate-x-1/2 items-center gap-1.5 rounded-lg border border-brand-purple bg-white px-1 py-1 shadow-lg transition-[left,top] ease-in-out top-[66px] sm:top-[56px] sm:w-[17%] sm:px-2 sm:py-1.5"
            style={{
              left: `${colCenters[colIndex]}%`,
              transitionDuration: "1000ms",
            }}
          >
            <span
              className={cn(
                "hidden size-5 shrink-0 items-center justify-center rounded-full bg-brand-purple-light sm:flex",
                flying && "animate-pulse"
              )}
            >
              <User className="size-3 text-brand-purple" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[9px] font-semibold text-brand-text sm:text-[11px]">Aarav Singh</p>
              <p className="text-[9px] text-slate-500 sm:text-[10px]">₹1.7L</p>
            </div>
          </div>
        )}

        {wonSettled && (
          <ConfettiBurst leftPercent={colCenters[4]} />
        )}
      </div>

      <MouseCursor x={cursor.x} y={cursor.y} visible={cursor.visible} clicking={cursor.clicking} />

      <div
        className={cn(
          "absolute inset-0 z-20 flex items-center justify-center bg-brand-navy/20 backdrop-blur-[1px] transition-opacity duration-300",
          formVisible ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <div
          className={cn(
            "w-72 rounded-xl border border-brand-border bg-white p-4 shadow-2xl transition-all duration-300",
            formVisible ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-95 opacity-0"
          )}
        >
          <div className="mb-3 flex items-center justify-between">
            <h5 className="text-sm font-bold text-brand-text">Add New Lead</h5>
            <X className="size-4 text-slate-400" aria-hidden />
          </div>
          <div className="flex flex-col gap-2.5">
            <FormField icon={User} label="Full Name" value="Aarav Singh" filled={formVisible} />
            <FormField icon={Mail} label="Email" value="aarav.singh@email.com" filled={formVisible} />
            <FormField icon={Wallet} label="Deal Value" value="₹1.7L" filled={formVisible} />
          </div>
          <div
            className={cn(
              "mt-3.5 flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold text-white transition-colors duration-200",
              phase === "cursor-submit" && cursor.clicking ? "bg-brand-purple-dark" : "bg-brand-purple"
            )}
          >
            <Plus className="size-3.5" aria-hidden />
            Add Lead
          </div>
        </div>
      </div>
    </div>
  );
}

function ConfettiBurst({ leftPercent }: { leftPercent: number }) {
  const colors = ["#6c35f5", "#10b981", "#f59e0b", "#0ea5e9", "#ec4899"];
  return (
    <div
      className="pointer-events-none absolute top-2 flex -translate-x-1/2 gap-1"
      style={{ left: `${leftPercent}%` }}
    >
      {colors.map((color, i) => (
        <span
          key={i}
          className="size-1.5 animate-bounce rounded-full"
          style={{ background: color, animationDelay: `${i * 100}ms`, animationDuration: "700ms" }}
        />
      ))}
    </div>
  );
}

function FormField({
  icon: Icon,
  label,
  value,
  filled,
}: {
  icon: typeof User;
  label: string;
  value: string;
  filled: boolean;
}) {
  return (
    <div>
      <p className="mb-1 text-[10px] font-medium text-slate-500">{label}</p>
      <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-2.5 py-2">
        <Icon className="size-3.5 shrink-0 text-slate-400" aria-hidden />
        <span
          className={cn(
            "truncate text-xs transition-opacity duration-300",
            filled ? "text-brand-text opacity-100" : "text-slate-300 opacity-60"
          )}
        >
          {filled ? value : "..."}
        </span>
      </div>
    </div>
  );
}

function LeadCard({ name, value, highlight }: { name: string; value: string; highlight?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-lg border px-1 py-1 transition-colors duration-500 sm:px-1.5 sm:py-1.5",
        highlight ? "border-brand-purple/40 bg-brand-purple-light/40" : "border-slate-100 bg-slate-50"
      )}
    >
      <span className="hidden size-5 shrink-0 items-center justify-center rounded-full bg-white sm:flex">
        <User className="size-3 text-slate-500" aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="truncate text-[9px] font-semibold text-brand-text sm:text-[11px]">{name}</p>
        <p className="text-[9px] text-slate-500 sm:text-[10px]">{value}</p>
      </div>
    </div>
  );
}
