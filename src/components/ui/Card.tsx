import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-brand-border bg-white p-6 transition-shadow hover:shadow-md hover:shadow-brand-purple/5",
        className
      )}
      {...rest}
    />
  );
}
