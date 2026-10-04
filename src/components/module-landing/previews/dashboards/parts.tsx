import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Segmented control used by the hero dashboards (a group of toggle buttons). */
export function Chips<T extends string>({
  options,
  value,
  onChange,
  label,
  className,
}: {
  options: { key: T; label: string }[];
  value: T;
  onChange: (key: T) => void;
  label: string;
  className?: string;
}) {
  return (
    <div role="group" aria-label={label} className={cn("inline-flex rounded-full bg-brand-surface p-0.5 ring-1 ring-brand-border", className)}>
      {options.map((option) => {
        const selected = option.key === value;
        return (
          <button
            key={option.key}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.key)}
            className={cn(
              "rounded-full px-2.5 py-1 text-[11px] font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand-purple/60",
              selected ? "bg-brand-purple text-white shadow-sm" : "text-brand-muted hover:text-brand-text"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export function SectionLabel({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-[11px] font-semibold tracking-wide text-brand-muted uppercase", className)}>{children}</p>;
}
