import type { IconType } from "@/types/common";
import { cn } from "@/lib/utils";

interface StatCardProps {
  value: string;
  label: string;
  icon: IconType;
  iconBg?: string;
}

export function StatCard({ value, label, icon: Icon, iconBg = "bg-brand-purple-light" }: StatCardProps) {
  return (
    <div className="flex items-center gap-3">
      <span className={cn("flex size-11 shrink-0 items-center justify-center rounded-full", iconBg)}>
        <Icon className="size-5 text-brand-purple" aria-hidden />
      </span>
      <div>
        <p className="text-xl font-bold text-brand-text sm:text-2xl">{value}</p>
        <p className="text-xs text-brand-muted sm:text-sm">{label}</p>
      </div>
    </div>
  );
}
