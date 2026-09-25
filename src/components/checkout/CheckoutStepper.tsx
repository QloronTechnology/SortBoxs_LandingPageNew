import { Fragment } from "react";
import { Check } from "lucide-react";
import { checkoutSteps, type CheckoutStepId } from "@/data/checkout";
import { cn } from "@/lib/utils";

/**
 * 1 — 2 — 3 progress bar. Finished steps are buttons so people can go back to them. `compact` fits a
 * narrow container (the drawer), where viewport breakpoints don't reflect the available width.
 * Phones: each step is a column (circle, name underneath) with stretching connectors; sm+: one row.
 */
export function CheckoutStepper({
  current,
  onSelect,
  compact = false,
  complete = false,
}: {
  current: CheckoutStepId;
  onSelect: (step: CheckoutStepId) => void;
  compact?: boolean;
  /** Order placed: every step shows as done and none can be reopened. */
  complete?: boolean;
}) {
  const currentIndex = complete ? checkoutSteps.length : checkoutSteps.findIndex((step) => step.id === current);

  return (
    <nav aria-label="Checkout progress" className="border-b border-brand-border bg-white">
      <ol
        className={cn(
          "flex items-start sm:items-center sm:justify-center",
          compact ? "gap-1 px-3 py-3 sm:gap-2 sm:px-4 sm:py-3.5" : "container-page gap-1 py-4 sm:gap-4 sm:py-7"
        )}
      >
        {checkoutSteps.map((step, index) => {
          const done = index < currentIndex;
          const active = index === currentIndex;
          const marker = (
            <>
              <span
                className={cn(
                  "flex shrink-0 items-center justify-center rounded-full border-2 font-semibold transition-colors",
                  compact ? "size-8 text-sm" : "size-9 text-base sm:size-11 sm:text-lg",
                  active || done
                    ? "border-brand-purple bg-brand-purple text-white"
                    : "border-brand-purple/40 text-brand-purple"
                )}
              >
                {done ? <Check className={compact ? "size-4" : "size-5"} strokeWidth={3} aria-hidden /> : index + 1}
              </span>
              <span
                className={cn(
                  // Phones: small enough that every name fits on one line.
                  "text-center text-[11px] leading-tight font-medium whitespace-nowrap sm:text-left sm:text-sm",
                  !compact && "sm:text-lg",
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
                    // Phones: stretch between the columns, level with the circles' centres.
                    "h-0.5 min-w-3 flex-1 rounded-full sm:flex-none",
                    compact ? "mt-[15px] sm:mt-0 sm:w-8" : "mt-[17px] sm:mt-0 sm:w-16 lg:w-24",
                    done || active ? "bg-brand-purple" : "bg-brand-border"
                  )}
                />
              )}
              <li aria-current={active ? "step" : undefined} className="shrink-0">
                {done && !complete ? (
                  <button
                    type="button"
                    onClick={() => onSelect(step.id)}
                    className={cn(stepLayout, "rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/60 [&>span:last-child]:hover:underline")}
                  >
                    {marker}
                  </button>
                ) : (
                  <span className={stepLayout}>{marker}</span>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

/** Circle over name on phones, side by side from sm up. */
const stepLayout = "flex w-full flex-col items-center gap-1.5 sm:flex-row sm:gap-2";
