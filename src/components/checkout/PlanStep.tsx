"use client";

import { ArrowRight, Check, Minus, Plus } from "lucide-react";
import { maxUsersPerModule } from "@/data/checkout";
import { cn, formatINR } from "@/lib/utils";
import { checkoutPlans, useCheckout } from "./CheckoutProvider";

/**
 * Step 1 when the checkout was opened from a /pricing plan card: the chosen plan with its price, what's
 * included and a user count. People can switch plan here, or drop to a custom (modules) plan.
 */
export function PlanStep() {
  const { state, totals, dispatch } = useCheckout();
  const plan = totals.plan;
  if (!plan?.price) return null;

  const yearly = state.cycle === "yearly";
  const period = yearly ? "year" : "month";
  const users = state.planUsers;
  const price = yearly ? plan.price.yearly : plan.price.monthly;
  const listPrice = plan.price.monthly * (yearly ? 12 : 1);
  const savePercent = Math.round((1 - plan.price.yearly / (plan.price.monthly * 12)) * 100);
  const Icon = plan.icon;

  const stepButton =
    "flex items-center justify-center text-brand-purple transition-colors outline-none hover:bg-brand-purple-light focus-visible:bg-brand-purple-light disabled:text-brand-muted/50 disabled:hover:bg-transparent";

  return (
    <div className="flex flex-col gap-5">
      {/* Plan switcher */}
      <div role="radiogroup" aria-label="Plan" className="grid grid-cols-3 gap-2">
        {checkoutPlans.map((option) => {
          const active = option.id === plan.id;
          const optionPrice = option.price![yearly ? "yearly" : "monthly"];
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => dispatch({ type: "setPlan", plan: option.id })}
              className={cn(
                "relative min-w-0 rounded-lg border px-2.5 py-2 text-left transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/60 sm:px-3.5 sm:py-2.5",
                active
                  ? "border-brand-purple bg-brand-purple-light/60 ring-1 ring-brand-purple"
                  : "border-brand-border bg-white hover:border-brand-purple/40"
              )}
            >
              {option.popular && (
                <span className="absolute -top-2 right-2 rounded bg-brand-purple px-1.5 py-0.5 text-[9px] font-semibold tracking-wide text-white uppercase sm:static sm:float-right sm:text-[10px]">
                  Popular
                </span>
              )}
              <span className="block truncate text-sm font-semibold text-brand-text sm:text-base">{option.name}</span>
              <span className="mt-0.5 block text-xs text-brand-muted tabular-nums sm:text-sm">
                {formatINR(optionPrice)}
                <span className="block sm:inline"> / user / {period}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected plan */}
      <article aria-labelledby="selected-plan" className="rounded-lg border border-brand-purple/60 bg-white p-5 shadow-lg ring-1 shadow-brand-purple/5 ring-brand-purple/30">
        <div className="flex items-start gap-3">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand-purple text-white">
            <Icon className="size-6" aria-hidden />
          </span>
          <div className="min-w-0">
            <h3 id="selected-plan" className="text-xl font-bold text-brand-text">
              {plan.name}
            </h3>
            <p className="text-sm text-brand-muted">{plan.description}</p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="flex flex-wrap items-baseline gap-x-2">
              <span className="text-3xl font-bold text-brand-purple tabular-nums">{formatINR(price)}</span>
              {yearly && savePercent > 0 && (
                <>
                  <s className="text-base text-brand-muted tabular-nums">{formatINR(listPrice)}</s>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                    Save {savePercent}%
                  </span>
                </>
              )}
            </p>
            <p className="text-sm text-brand-muted">
              / user / {period}
              {yearly && <> · ≈ {formatINR(Math.round(price / 12))} a month</>}
            </p>
          </div>

          <div>
            <p id="plan-users-label" className="mb-1.5 text-sm font-medium text-brand-text">
              Users
            </p>
            <div className="grid h-12 w-44 grid-cols-[1fr_1.2fr_1fr] overflow-hidden rounded-lg border border-brand-border bg-[#f7f6fe]">
              <button
                type="button"
                onClick={() => dispatch({ type: "addPlanUsers", delta: -1 })}
                disabled={users <= 1}
                className={stepButton}
                aria-label="Remove one user"
              >
                <Minus className="size-5" aria-hidden />
              </button>
              <input
                type="number"
                inputMode="numeric"
                min={1}
                max={maxUsersPerModule}
                value={users}
                onChange={(event) => dispatch({ type: "setPlanUsers", users: event.target.valueAsNumber })}
                onFocus={(event) => event.target.select()}
                aria-labelledby="plan-users-label"
                className="w-full border-x border-brand-border bg-white text-center text-xl font-semibold text-brand-text outline-none [appearance:textfield] focus:bg-brand-purple-light/40 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <button
                type="button"
                onClick={() => dispatch({ type: "addPlanUsers", delta: 1 })}
                disabled={users >= maxUsersPerModule}
                className={stepButton}
                aria-label="Add one user"
              >
                <Plus className="size-5" aria-hidden />
              </button>
            </div>
          </div>
        </div>

        <p className="mt-4 rounded-lg bg-brand-surface px-4 py-2.5 text-[15px] text-brand-muted" aria-live="polite">
          {users} {users === 1 ? "user" : "users"} × {formatINR(price)} ={" "}
          <span className="font-semibold text-brand-text">{formatINR(users * price)}</span> / {period}
        </p>

        <h4 className="mt-5 text-sm font-semibold text-brand-text">What&apos;s included</h4>
        <ul className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2.5 text-[15px] text-brand-text">
              <Check className="size-4 shrink-0 text-brand-purple" strokeWidth={2.5} aria-hidden />
              {feature}
            </li>
          ))}
        </ul>
      </article>

      <button
        type="button"
        onClick={() => dispatch({ type: "setPlan", plan: null })}
        className="group flex items-center justify-between gap-3 rounded-lg border border-dashed border-brand-purple/40 bg-[#f7f5ff] px-4 py-3 text-left outline-none hover:border-brand-purple focus-visible:ring-2 focus-visible:ring-brand-purple/60"
      >
        <span>
          <span className="block font-semibold text-brand-text">Need something different?</span>
          <span className="block text-sm text-brand-muted">Build a custom plan from individual modules instead.</span>
        </span>
        <ArrowRight className="size-5 shrink-0 text-brand-purple transition-transform group-hover:translate-x-1" aria-hidden />
      </button>
    </div>
  );
}
