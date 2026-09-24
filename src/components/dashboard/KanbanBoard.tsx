"use client";

import { Boxes, User, ArrowRight, TrendingUp, TrendingDown, Users2, Wallet } from "lucide-react";

interface KanbanColumn {
  label: string;
  count: number;
  /** Compact lakh format: the mockup columns are only 50–70px wide. */
  totalValue: string;
  trend: string;
  trendUp: boolean;
  headerBg: string;
  headerText: string;
  leads: { name: string; value: string }[];
  note: string;
}

const baseColumns: KanbanColumn[] = [
  {
    label: "New Leads",
    count: 12,
    totalValue: "₹18.5L",
    trend: "12%",
    trendUp: true,
    headerBg: "bg-brand-purple-light",
    headerText: "text-brand-purple",
    leads: [
      { name: "R. Mehta", value: "₹1.2L" },
      { name: "T. Bose", value: "₹0.8L" },
      { name: "A. Khan", value: "₹1.6L" },
    ],
    note: "3 new leads added",
  },
  {
    label: "Qualified",
    count: 9,
    totalValue: "₹12.4L",
    trend: "8%",
    trendUp: true,
    headerBg: "bg-violet-100",
    headerText: "text-violet-700",
    leads: [
      { name: "P. Verma", value: "₹3.4L" },
      { name: "N. Joshi", value: "₹1.1L" },
      { name: "D. Kapoor", value: "₹2.0L" },
    ],
    note: "2 deals qualified",
  },
  {
    label: "Proposal",
    count: 7,
    totalValue: "₹9.75L",
    trend: "15%",
    trendUp: true,
    headerBg: "bg-sky-100",
    headerText: "text-sky-700",
    leads: [
      { name: "A. Rao", value: "₹0.9L" },
      { name: "M. Shah", value: "₹2.4L" },
      { name: "R. Pillai", value: "₹1.3L" },
    ],
    note: "1 proposal sent",
  },
  {
    label: "Negotiation",
    count: 4,
    totalValue: "₹6.3L",
    trend: "5%",
    trendUp: false,
    headerBg: "bg-amber-100",
    headerText: "text-amber-700",
    leads: [
      { name: "S. Iyer", value: "₹2.1L" },
      { name: "H. Reddy", value: "₹1.7L" },
      { name: "J. Menon", value: "₹0.6L" },
    ],
    note: "1 deal in negotiation",
  },
  {
    label: "Won",
    count: 10,
    totalValue: "₹22.8L",
    trend: "20%",
    trendUp: true,
    headerBg: "bg-emerald-100",
    headerText: "text-emerald-700",
    leads: [
      { name: "K. Nair", value: "₹1.5L" },
      { name: "S. Gupta", value: "₹3.1L" },
      { name: "V. Rao", value: "₹2.8L" },
    ],
    note: "4 deals closed",
  },
];

const colCenters = [10, 30, 50, 70, 90];

interface KanbanBoardProps {
  cardMoved: boolean;
}

export function KanbanBoard({ cardMoved }: KanbanBoardProps) {
  const columns = baseColumns.map((col, index) => {
    if (!cardMoved) return col;
    if (index === 0) return { ...col, count: col.count - 1 };
    if (index === 1) return { ...col, count: col.count + 1 };
    return col;
  });

  const totalLeads = columns.reduce((sum, col) => sum + col.count, 0);

  return (
    <div className="relative">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Boxes className="size-4 text-brand-purple" aria-hidden />
          <h4 className="text-[13px] font-bold text-brand-text">Goals Pipeline</h4>
        </div>
        <span className="text-[10px] font-medium text-brand-purple">View Board →</span>
      </div>

      <div className="mb-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 rounded-lg bg-slate-50 px-2.5 py-1.5">
        <div className="flex items-center gap-1.5 text-[10px] text-slate-600">
          <Users2 className="size-3 text-brand-purple" aria-hidden />
          <span className="font-semibold text-brand-text">{totalLeads}</span> Total Leads
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-slate-600">
          <Wallet className="size-3 text-emerald-600" aria-hidden />
          <span className="font-semibold text-brand-text">₹69,75,000</span> Pipeline Value
        </div>
      </div>

      <div className="grid grid-cols-5 gap-1 sm:gap-1.5">
        {columns.map((col) => (
          <div key={col.label} className="flex flex-col rounded-lg border border-slate-100 bg-white">
            <div
              className={`flex min-h-8 items-center justify-center rounded-t-lg px-0.5 py-1 text-center text-[9px] leading-tight font-semibold sm:min-h-0 sm:px-1.5 ${col.headerBg} ${col.headerText}`}
            >
              <span>
                {col.label} <span className="whitespace-nowrap">({col.count})</span>
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-1 p-1 sm:p-1.5">
              <p className="text-[8px] text-slate-400">Total Value</p>
              <div className="flex items-center gap-0.5 sm:gap-1">
                <p className="text-[10px] font-bold whitespace-nowrap text-brand-text sm:text-[10.5px]">
                  {col.totalValue}
                </p>
                {col.trendUp ? (
                  <TrendingUp className="size-2.5 shrink-0 text-emerald-500" aria-hidden />
                ) : (
                  <TrendingDown className="size-2.5 shrink-0 text-rose-500" aria-hidden />
                )}
              </div>
              <div className="flex flex-col gap-1">
                {col.leads.map((lead) => (
                  <StaticCard key={lead.name} name={lead.name} value={lead.value} />
                ))}
              </div>
              <p className="mt-auto text-[8px] leading-snug text-slate-400">{col.note}</p>
            </div>
          </div>
        ))}
      </div>

      <div
        className="pointer-events-none absolute top-[88px] flex w-[18%] -translate-x-1/2 items-center gap-1 rounded-md border border-brand-purple/30 bg-white px-1 py-1 shadow-md transition-[left,top] duration-[1100ms] ease-in-out sm:px-1.5"
        style={{ left: `${cardMoved ? colCenters[1] : colCenters[0]}%` }}
      >
        <span className="hidden size-3.5 shrink-0 items-center justify-center rounded-full bg-brand-purple-light sm:flex">
          <User className="size-2 text-brand-purple" aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="truncate text-[8px] font-semibold text-brand-text">V. Nair</p>
          <p className="text-[8px] text-slate-500">₹1.5L</p>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-end gap-1 text-[9px] font-semibold text-brand-purple">
        View Details <ArrowRight className="size-2.5" aria-hidden />
      </div>
    </div>
  );
}

function StaticCard({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex items-center gap-1 rounded-md border border-slate-100 bg-slate-50 px-1 py-1">
      <span className="hidden size-3.5 shrink-0 items-center justify-center rounded-full bg-white sm:flex">
        <User className="size-2 text-slate-500" aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="truncate text-[8px] font-semibold text-brand-text">{name}</p>
        <p className="text-[8px] text-slate-500">{value}</p>
      </div>
    </div>
  );
}
