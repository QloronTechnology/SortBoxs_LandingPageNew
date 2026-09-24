import { ArrowDown, ArrowUp } from "lucide-react";
import type { IconType } from "@/types/common";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: IconType;
  iconBg: string;
  iconColor: string;
}

export function MetricCard({ label, value, change, trend, icon: Icon, iconBg, iconColor }: MetricCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-2">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-medium text-slate-500">{label}</span>
        <span className={cn("flex size-5 items-center justify-center rounded-md", iconBg)}>
          <Icon className={cn("size-3", iconColor)} aria-hidden />
        </span>
      </div>
      <div className="mt-1 flex items-baseline gap-1.5">
        <span className="text-base font-bold text-brand-text">{value}</span>
      </div>
      <div
        className={cn(
          "mt-0.5 flex items-center gap-0.5 text-[10px] font-semibold",
          trend === "up" ? "text-emerald-500" : "text-rose-500"
        )}
      >
        {trend === "up" ? <ArrowUp className="size-3" aria-hidden /> : <ArrowDown className="size-3" aria-hidden />}
        {change}
      </div>
    </div>
  );
}
