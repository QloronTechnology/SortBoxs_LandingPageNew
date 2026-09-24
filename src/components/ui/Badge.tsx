import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-brand-purple-light px-3.5 py-1.5 text-sm font-semibold text-brand-purple",
        className
      )}
    >
      {children}
    </span>
  );
}
