import { Briefcase, Users2, Globe2, ShieldCheck } from "lucide-react";
import { StatCard } from "@/components/cards/StatCard";
import { cn } from "@/lib/utils";
import type { IconType } from "@/types/common";

interface Stat {
  value: string;
  label: string;
}

const icons: { icon: IconType; bg: string }[] = [
  { icon: Briefcase, bg: "bg-brand-purple-light" },
  { icon: Users2, bg: "bg-emerald-100" },
  { icon: Globe2, bg: "bg-sky-100" },
  { icon: ShieldCheck, bg: "bg-amber-100" },
];

export function StatsSection({ stats, className }: { stats: readonly Stat[]; className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-8 gap-y-5", className)}>
      {stats.map((stat, index) => (
        <StatCard
          key={stat.label}
          value={stat.value}
          label={stat.label}
          icon={icons[index % icons.length].icon}
          iconBg={icons[index % icons.length].bg}
        />
      ))}
    </div>
  );
}
