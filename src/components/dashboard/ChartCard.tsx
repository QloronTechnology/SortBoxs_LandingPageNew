import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  action?: string;
  children: ReactNode;
  className?: string;
}

export function ChartCard({ title, action, children, className }: ChartCardProps) {
  return (
    <div className={cn("rounded-xl border border-slate-100 bg-white p-2.5", className)}>
      <div className="mb-2 flex items-center justify-between">
        <h4 className="text-[13px] font-bold text-brand-text">{title}</h4>
        {action && (
          <span className="flex items-center gap-1 rounded-md border border-slate-200 px-2 py-0.5 text-[10px] font-medium text-slate-500">
            {action}
            <ChevronDown className="size-3" aria-hidden />
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
