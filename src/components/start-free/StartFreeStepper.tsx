import { Fragment } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const startFreeSteps = [
  { id: 1, label: "Workspace Setup" },
  { id: 2, label: "Your Details" },
] as const;

/** 1 — 2 progress bar, sized the same as the checkout drawer's compact stepper. Step 1 can be reopened from step 2. */
export function StartFreeStepper({ current, onSelect }: { current: 1 | 2; onSelect: (step: 1 | 2) => void }) {
  return (
    <nav aria-label="Start Free progress" className="border-b border-brand-border bg-white">
      <ol className="flex items-start justify-center gap-1 px-3 py-3 sm:items-center sm:gap-2 sm:px-4 sm:py-3.5">
        {startFreeSteps.map((step, index) => {
          const done = step.id < current;
          const active = step.id === current;
          const marker = (
            <>
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
                  active || done ? "border-brand-purple bg-brand-purple text-white" : "border-brand-purple/40 text-brand-purple"
                )}
              >
                {done ? <Check className="size-4" strokeWidth={3} aria-hidden /> : step.id}
              </span>
              <span
                className={cn(
                  "text-center text-[11px] leading-tight font-medium whitespace-nowrap sm:text-left sm:text-sm",
                  active ? "text-brand-text" : done ? "text-brand-purple" : "text-brand-muted sm:text-brand-purple"
                )}
              >
                {step.label}
              </span>
            </>
          );

          return (
            <Fragment key={step.id}>
              {index > 0 && (
                <li
                  aria-hidden
                  className={cn(
                    "mt-[15px] h-0.5 w-10 shrink-0 rounded-full sm:mt-0 sm:w-8",
                    done || active ? "bg-brand-purple" : "bg-brand-border"
                  )}
                />
              )}
              <li aria-current={active ? "step" : undefined} className="shrink-0">
                {done ? (
                  <button
                    type="button"
                    onClick={() => onSelect(step.id)}
                    className="flex w-full flex-col items-center gap-1.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/60 sm:flex-row sm:gap-2 [&>span:last-child]:hover:underline"
                  >
                    {marker}
                  </button>
                ) : (
                  <span className="flex w-full flex-col items-center gap-1.5 sm:flex-row sm:gap-2">{marker}</span>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
