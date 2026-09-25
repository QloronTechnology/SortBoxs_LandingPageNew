"use client";

import { useRef } from "react";
import { ArrowRight, Check, Minus, Plus } from "lucide-react";
import { defaultUsers, maxUsersPerModule, yearlyDiscount, type CheckoutModule } from "@/data/checkout";
import { toneClasses } from "@/components/layout/Header/menus/menuStyles";
import { cn, formatINR } from "@/lib/utils";
import { useCheckout } from "./CheckoutProvider";

/**
 * One module in the Configure step: select it, set its users, and see its cost for the billing period.
 * Yearly shows the discounted price per year with the full price struck through.
 */
export function ModuleCard({ module }: { module: CheckoutModule }) {
  const { state, dispatch } = useCheckout();
  const usersInput = useRef<HTMLInputElement>(null);
  const { id, name, description, icon: Icon, tone, pricePerUser, features } = module;

  const users = state.users[id] ?? 0;
  const selected = users > 0;
  const yearly = state.cycle === "yearly";
  const period = yearly ? "year" : "month";
  // Per user for one billing period: list, and after the yearly discount.
  const listPrice = yearly ? pricePerUser * 12 : pricePerUser;
  const price = yearly ? Math.round(listPrice * (1 - yearlyDiscount)) : listPrice;
  const setUsers = (next: number) => dispatch({ type: "setUsers", id, users: next });

  const stepButton =
    "flex items-center justify-center text-brand-purple transition-colors outline-none hover:bg-brand-purple-light focus-visible:bg-brand-purple-light disabled:text-brand-muted/50 disabled:hover:bg-transparent";

  return (
    <article
      aria-labelledby={`module-${id}`}
      className={cn(
        "flex flex-col rounded-lg border bg-white p-4 transition-[border-color,box-shadow] duration-200 sm:p-5",
        selected ? "border-brand-purple/60 shadow-lg ring-1 shadow-brand-purple/5 ring-brand-purple/30" : "border-brand-border hover:border-brand-purple/30"
      )}
    >
      <div className="flex items-start gap-3">
        <span className={cn("flex size-12 shrink-0 items-center justify-center rounded-lg", toneClasses[tone])}>
          <Icon className="size-6" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <h3 id={`module-${id}`} className="text-lg font-bold text-brand-text">
            {name}
          </h3>
          <p className="mt-0.5 text-sm leading-snug text-brand-muted">{description}</p>
        </div>
        <label className="relative -mt-0.5 -mr-0.5 flex size-7 shrink-0 cursor-pointer items-center justify-center">
          <input
            type="checkbox"
            checked={selected}
            onChange={(event) => setUsers(event.target.checked ? defaultUsers : 0)}
            className="peer absolute inset-0 cursor-pointer opacity-0"
            aria-label={`Include ${name}`}
          />
          <span
            aria-hidden
            className={cn(
              "flex size-6 items-center justify-center rounded-md border-2 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-brand-purple/60",
              selected ? "border-brand-purple bg-brand-purple text-white" : "border-brand-border bg-white"
            )}
          >
            {selected && <Check className="size-4" strokeWidth={3} />}
          </span>
        </label>
      </div>

      <p className="mt-4 flex flex-wrap items-baseline gap-x-2">
        <span className="text-3xl font-bold text-brand-text">{formatINR(price)}</span>
        {yearly && (
          <>
            <s className="text-base text-brand-muted">{formatINR(listPrice)}</s>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
              Save {yearlyDiscount * 100}%
            </span>
          </>
        )}
      </p>
      <p className="text-sm text-brand-muted">
        / user / {period}
        {yearly && <> · {formatINR(Math.round(price / 12))} a month</>}
      </p>

      <div className="mt-4 grid h-12 grid-cols-[1fr_1.2fr_1fr] overflow-hidden rounded-lg border border-brand-border bg-[#f7f6fe]">
        <button
          type="button"
          onClick={() => dispatch({ type: "addUsers", id, delta: -1 })}
          disabled={users === 0}
          className={stepButton}
          aria-label={`Remove one ${name} user`}
        >
          <Minus className="size-5" aria-hidden />
        </button>
        <input
          ref={usersInput}
          type="number"
          inputMode="numeric"
          min={0}
          max={maxUsersPerModule}
          value={users}
          onChange={(event) => setUsers(event.target.valueAsNumber)}
          onFocus={(event) => event.target.select()}
          aria-label={`${name} users`}
          className="w-full border-x border-brand-border bg-white text-center text-xl font-semibold text-brand-text outline-none [appearance:textfield] focus:bg-brand-purple-light/40 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <button
          type="button"
          onClick={() => dispatch({ type: "addUsers", id, delta: 1 })}
          disabled={users >= maxUsersPerModule}
          className={stepButton}
          aria-label={`Add one ${name} user`}
        >
          <Plus className="size-5" aria-hidden />
        </button>
      </div>
      <p className="mt-2.5 text-center text-[15px] text-brand-muted" aria-live="polite">
        <span className="font-medium text-brand-text">{formatINR(users * price)}</span> / {period}
        {yearly && users > 0 && <s className="ml-1.5 text-sm">{formatINR(users * listPrice)}</s>}
      </p>

      <ul className="mt-4 mb-5 flex flex-col gap-2">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2.5 text-[15px] text-brand-text">
            <Check className="size-4 shrink-0 text-brand-purple" strokeWidth={2.5} aria-hidden />
            {feature}
          </li>
        ))}
      </ul>

      {/* Selected: jump to the users field to adjust the seat count. Not selected: add with default seats. */}
      {selected ? (
        <button
          type="button"
          onClick={() => usersInput.current?.focus()}
          className="mt-auto flex h-11 items-center justify-center gap-2 rounded-lg bg-brand-purple text-[15px] font-semibold text-white transition-colors outline-none hover:bg-brand-purple-dark focus-visible:ring-2 focus-visible:ring-brand-purple/60 focus-visible:ring-offset-2"
        >
          Configure <ArrowRight className="size-4" aria-hidden />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setUsers(defaultUsers)}
          className="mt-auto flex h-11 items-center justify-center gap-1.5 rounded-lg border border-brand-purple text-[15px] font-semibold text-brand-purple transition-colors outline-none hover:bg-brand-purple-light focus-visible:ring-2 focus-visible:ring-brand-purple/60"
        >
          <Plus className="size-4" aria-hidden /> Add Module
        </button>
      )}
    </article>
  );
}
