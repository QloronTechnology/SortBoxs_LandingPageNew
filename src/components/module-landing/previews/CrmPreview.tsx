import type { CSSProperties } from "react";
import { CircleCheckBig, GripVertical } from "lucide-react";
import { crmPreview } from "@/data/landing/crm";
import { cn } from "@/lib/utils";
import { PreviewFrame } from "../PreviewFrame";
import { Sparkline } from "./Sparkline";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function CrmPreview() {
  const { title, period, kpis, funnel, board, toast, insight, badge } = crmPreview;
  return (
    <PreviewFrame title={title} period={period} insight={insight} badge={badge}>
      <div
        className="demo-rise absolute -top-8 -right-3 z-10 hidden items-center gap-2 rounded-xl bg-white py-2 pr-3.5 pl-2.5 shadow-[0_14px_30px_-16px_rgba(16,185,129,0.6)] ring-1 ring-emerald-200 sm:flex"
        style={delay(900)}
      >
        <span className="flex size-6 items-center justify-center rounded-full bg-emerald-500 text-white">
          <CircleCheckBig className="size-3.5" aria-hidden />
        </span>
        <span className="leading-tight">
          <span className="block text-[11px] font-bold text-emerald-700">{toast.title}</span>
          <span className="block text-[11px] text-brand-muted">{toast.text}</span>
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2.5">
        {kpis.map((kpi, index) => {
          const hero = index === 0;
          return (
            <div
              key={kpi.label}
              className={cn(
                "demo-rise overflow-hidden rounded-xl px-3 pt-3",
                hero
                  ? "bg-gradient-to-br from-brand-purple to-[#4c1fc7] text-white shadow-lg shadow-brand-purple/25"
                  : "bg-brand-surface text-brand-purple"
              )}
              style={delay(index * 100)}
            >
              <p className={cn("text-[11px] font-semibold", hero ? "text-white/75" : "text-brand-muted")}>{kpi.label}</p>
              <p className="mt-0.5 flex flex-wrap items-baseline gap-x-1.5">
                <span className={cn("text-lg font-extrabold sm:text-xl", hero ? "text-white" : "text-brand-text")}>{kpi.value}</span>
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                    hero ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-700"
                  )}
                >
                  {kpi.delta}
                </span>
              </p>
              <Sparkline points={kpi.spark} className={cn("-mx-3 mt-0.5 w-[calc(100%+1.5rem)]", hero ? "text-white" : "text-brand-purple")} />
            </div>
          );
        })}
      </div>

      <div className="mt-4">
        <p className="text-[11px] font-semibold tracking-wide text-brand-muted uppercase">Pipeline by stage</p>
        <ul className="mt-2 flex flex-col gap-1.5">
          {funnel.map((stage, index) => (
            <li key={stage.label} className="grid grid-cols-[76px_1fr_46px] items-center gap-3 text-xs sm:grid-cols-[92px_1fr_50px]">
              <span className="truncate font-medium text-brand-muted">{stage.label}</span>
              <span className="h-5 rounded-md bg-brand-surface">
                <span
                  className={cn("demo-grow-x flex h-full items-center rounded-md bg-gradient-to-r pl-2.5 text-[11px] font-bold text-white", stage.bar)}
                  style={{ width: stage.width, ...delay(250 + index * 90) }}
                >
                  {stage.count}
                </span>
              </span>
              <span className="text-right font-bold text-brand-text">{stage.value}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 border-t border-brand-border pt-3">
        <p className="text-[11px] font-semibold tracking-wide text-brand-muted uppercase">Deals in motion</p>
        <div className="mt-2 grid grid-cols-3 gap-2.5">
          {board.map((column, columnIndex) => (
            <div key={column.label} className="demo-rise rounded-xl bg-brand-surface p-2" style={delay(500 + columnIndex * 110)}>
              <p className="flex items-center gap-1.5 px-1 pb-2 text-[11px] font-bold text-brand-text">
                <span className={cn("size-2 rounded-full", column.dot)} aria-hidden />
                {column.label}
                <span className="ml-auto font-semibold text-brand-muted">{column.count}</span>
              </p>
              <ul className="flex flex-col gap-2">
                {column.deals.map((deal) => (
                  <li
                    key={deal.name}
                    className={cn(
                      "flex items-center gap-1.5 rounded-lg bg-white p-2 ring-1 ring-brand-border",
                      deal.dragging && "animate-float-y -rotate-2 shadow-xl shadow-brand-purple/20 ring-2 ring-brand-purple/50"
                    )}
                  >
                    {deal.dragging ? (
                      <GripVertical className="size-3.5 shrink-0 text-brand-purple" aria-hidden />
                    ) : (
                      <span className={cn("hidden size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold sm:flex", deal.tone)}>
                        {deal.name[0]}
                      </span>
                    )}
                    <span className="min-w-0 leading-tight">
                      <span className="block truncate text-[11px] font-semibold text-brand-text">{deal.name}</span>
                      <span className="block text-[11px] font-bold text-brand-purple">{deal.value}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </PreviewFrame>
  );
}
