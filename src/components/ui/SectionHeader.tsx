import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  action?: ReactNode;
  /** "compact": small letter-spaced eyebrow + muted subtitle, action aligned to the top. */
  variant?: "default" | "compact";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  action,
  variant = "default",
  className,
}: SectionHeaderProps) {
  const compact = variant === "compact";

  return (
    <div
      className={cn(
        "flex flex-col gap-4 lg:flex-row lg:justify-between",
        // Compact: on phones the action is pinned top-right on the eyebrow's line (see below),
        // so it never adds a row; from sm up it sits beside the text as a normal flex item.
        compact ? "relative sm:flex-row sm:items-start sm:justify-between" : "lg:items-end",
        align === "center" && "lg:flex-col lg:items-center lg:text-center",
        className
      )}
    >
      <div className={cn("max-w-2xl min-w-0", align === "center" && "mx-auto")}>
        {eyebrow && (
          <p
            className={cn(
              "text-sm text-brand-purple uppercase",
              compact
                ? // pr-20 keeps clear of the top-right action pinned on phones.
                  "mb-2 pr-20 font-medium tracking-[0.14em] sm:pr-0 sm:tracking-[0.2em]"
                : "mb-3 font-bold tracking-wider"
            )}
          >
            {eyebrow}
          </p>
        )}
        <h2
          className={cn(
            compact
              ? "text-lg font-normal text-brand-muted sm:text-xl"
              : "text-3xl font-bold text-brand-text sm:text-4xl"
          )}
        >
          {title}
        </h2>
        {description && <p className="mt-4 text-base text-brand-muted sm:text-lg">{description}</p>}
      </div>
      {action && (
        <div className={cn("shrink-0", compact && "absolute top-0 right-0 sm:static")}>{action}</div>
      )}
    </div>
  );
}
