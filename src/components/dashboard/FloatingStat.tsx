import type { IconType } from "@/types/common";
import { cn } from "@/lib/utils";

interface FloatingStatProps {
  icon: IconType;
  iconBg: string;
  iconColor: string;
  value: string;
  label: string;
  delay?: number;
  animate: boolean;
}

export function FloatingStat({ icon: Icon, iconBg, iconColor, value, label, delay = 0, animate }: FloatingStatProps) {
  return (
    <div
      className={cn(
        "animate-float-y flex items-center gap-2.5 rounded-xl border border-slate-100 bg-white px-3.5 py-2.5 shadow-lg shadow-brand-navy/5 transition-all duration-500",
        animate ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
      )}
      style={{ transitionDelay: `${delay}ms`, animationDelay: `${delay}ms` }}
    >
      <span className={cn("flex size-8 shrink-0 items-center justify-center rounded-lg", iconBg)}>
        <Icon className={cn("size-4", iconColor)} aria-hidden />
      </span>
      <div>
        <p className="text-sm leading-tight font-bold text-brand-text">{value}</p>
        <p className="text-[11px] leading-tight text-slate-500">{label}</p>
      </div>
    </div>
  );
}
