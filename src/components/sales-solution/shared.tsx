import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, dark = false, className }: { children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <p className={cn("flex items-center gap-3 text-[11px] font-bold tracking-[0.12em] uppercase sm:text-xs sm:tracking-[0.18em]", dark ? "text-violet-300" : "text-brand-purple", className)}>
      <span aria-hidden className={cn("h-0.5 w-7 shrink-0 rounded-full", dark ? "bg-violet-300" : "bg-brand-purple")} />
      {children}
    </p>
  );
}

export function SectionHead({
  eyebrow,
  title,
  intro,
  dark = false,
  center = false,
  className,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  dark?: boolean;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center", className)}>
      <Eyebrow dark={dark} className={cn(center && "justify-center")}>
        {eyebrow}
      </Eyebrow>
      <h2 className={cn("mt-4 text-3xl leading-tight font-extrabold sm:text-4xl", dark ? "text-white" : "text-brand-text")}>{title}</h2>
      <p className={cn("mt-4 leading-relaxed", dark ? "text-white/70" : "text-brand-muted")}>{intro}</p>
    </div>
  );
}

/** Every number on this page is made up for the visuals. Say so wherever a product screen shows them. */
export function SampleTag({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide whitespace-nowrap uppercase", dark ? "bg-white/10 text-white/70" : "bg-brand-surface text-brand-muted", className)}>
      Sample data
    </span>
  );
}

export const avatarTones = ["bg-violet-100 text-violet-700", "bg-sky-100 text-sky-700", "bg-emerald-100 text-emerald-700", "bg-amber-100 text-amber-700", "bg-rose-100 text-rose-700", "bg-indigo-100 text-indigo-700"];

export function Avatar({ name, tone, className }: { name: string; tone?: string; className?: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
  return (
    <span aria-hidden className={cn("flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-extrabold", tone ?? avatarTones[0], className)}>
      {initials}
    </span>
  );
}
