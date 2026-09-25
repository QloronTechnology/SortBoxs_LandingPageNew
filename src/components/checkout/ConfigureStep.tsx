"use client";

import { useState } from "react";
import { billingCycles, checkoutModules, moduleCategories, type ModuleCategory } from "@/data/checkout";
import { yearlySavingsLabel } from "@/data/pricing";
import { cn } from "@/lib/utils";
import { useCheckout } from "./CheckoutProvider";
import { ModuleCard } from "./ModuleCard";

/** Monthly / Yearly pill with the savings badge. */
export function BillingCycleToggle({ size = "lg" }: { size?: "md" | "lg" }) {
  const { state, dispatch } = useCheckout();

  return (
    <div className="flex items-center gap-3">
      <div
        role="group"
        aria-label="Billing cycle"
        className={cn(
          "grid grid-cols-2 rounded-full border border-brand-border bg-white/70",
          size === "lg" ? "h-12 w-[240px] sm:h-[52px] sm:w-[280px]" : "h-10 w-[210px]"
        )}
      >
        {billingCycles.map(({ value, label }) => {
          const active = state.cycle === value;
          return (
            <button
              key={value}
              type="button"
              aria-pressed={active}
              onClick={() => dispatch({ type: "setCycle", cycle: value })}
              className={cn(
                "rounded-full font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/60",
                size === "lg" ? "text-base sm:text-lg" : "text-[15px]",
                active ? "bg-brand-purple text-white shadow-sm" : "text-brand-purple hover:bg-white"
              )}
            >
              {label}
            </button>
          );
        })}
      </div>
      <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium whitespace-nowrap text-emerald-700">
        {yearlySavingsLabel}
      </span>
    </div>
  );
}

/** Step 1 body: category filter + every module as a card. `gridClassName` sets the columns per layout. */
export function ConfigureModules({
  gridClassName = "sm:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4",
}: {
  gridClassName?: string;
}) {
  const { state } = useCheckout();
  const [category, setCategory] = useState<ModuleCategory | "all">("all");
  const visible = category === "all" ? checkoutModules : checkoutModules.filter((m) => m.category === category);

  return (
    <section id="modules" aria-label="Modules" className="scroll-mt-6">
      <div role="group" aria-label="Filter modules" className="-mx-1 mb-4 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none]">
        {moduleCategories.map(({ id, label }) => {
          const active = category === id;
          const pool = id === "all" ? checkoutModules : checkoutModules.filter((m) => m.category === id);
          const picked = pool.filter((m) => (state.users[m.id] ?? 0) > 0).length;
          return (
            <button
              key={id}
              type="button"
              aria-pressed={active}
              onClick={() => setCategory(id)}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/60",
                active
                  ? "border-brand-purple bg-brand-purple text-white"
                  : "border-brand-border bg-white text-brand-text hover:border-brand-purple/40"
              )}
            >
              {label}
              {picked > 0 && (
                <span
                  className={cn(
                    "rounded-full px-1.5 text-xs tabular-nums",
                    active ? "bg-white/20 text-white" : "bg-brand-purple-light text-brand-purple"
                  )}
                >
                  {picked}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className={cn("grid grid-cols-1 gap-4", gridClassName)}>
        {visible.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>
    </section>
  );
}
