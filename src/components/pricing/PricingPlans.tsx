"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { pricingPlans, yearlySavingsLabel, type BillingCycle, type PricingPlan } from "@/data/pricing";
import { cn, formatINR } from "@/lib/utils";
import { CheckoutTrigger } from "@/components/checkout/CheckoutTrigger";

const cycles: { value: BillingCycle; label: string }[] = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

/** Monthly/Yearly toggle (overlapping the hero's bottom edge) plus the four plan cards. */
export function PricingPlans() {
  const [cycle, setCycle] = useState<BillingCycle>("monthly");
  // The hovered/focused card is highlighted; with none, the "Most Popular" plan is.
  const [hovered, setHovered] = useState<string | null>(null);
  const highlighted = hovered ?? pricingPlans.find((plan) => plan.popular)?.name;

  return (
    <section className="bg-white pb-12">
      <div className="container-page">
        {/* Sized to the design: 490×72 white card, 280×50 pill (two 140px buttons), badge on the pill's corner. */}
        <div className="relative z-10 -mt-9 flex justify-center">
          <div className="flex h-[72px] w-full max-w-[490px] items-center rounded-3xl bg-white px-3 shadow-[0_10px_30px_-10px_rgba(23,22,92,0.2)] sm:pl-[65px]">
            <div
              role="group"
              aria-label="Billing cycle"
              className="relative grid h-[50px] w-full grid-cols-2 rounded-full border border-brand-border bg-[#f4f3fd] sm:w-[280px]"
            >
              {cycles.map(({ value, label }) => {
                const active = cycle === value;
                return (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setCycle(value)}
                    className={cn(
                      "rounded-full text-base font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/60 sm:text-lg",
                      active ? "bg-brand-purple text-white shadow-sm" : "text-brand-purple hover:bg-white/60"
                    )}
                  >
                    {label}
                  </button>
                );
              })}
              <span className="absolute -top-2.5 right-0 rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-medium whitespace-nowrap text-emerald-700 sm:top-0 sm:-right-[80px] sm:text-xs">
                {yearlySavingsLabel}
              </span>
            </div>
          </div>
        </div>

        <div
          className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4"
          onMouseLeave={() => setHovered(null)}
        >
          {pricingPlans.map((plan) => (
            <PlanCard
              key={plan.name}
              plan={plan}
              cycle={cycle}
              highlighted={highlighted === plan.name}
              onActivate={() => setHovered(plan.name)}
              onDeactivate={() => setHovered(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PlanCard({
  plan,
  cycle,
  highlighted,
  onActivate,
  onDeactivate,
}: {
  plan: PricingPlan;
  cycle: BillingCycle;
  highlighted: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  const { id, name, description, icon: Icon, price, features, cta, popular } = plan;
  const isStarter = name === "Starter";
  const ctaClass = cn(
    "mt-auto flex items-center justify-center rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/60",
    isStarter
      ? "border-brand-purple bg-brand-purple text-white hover:bg-brand-purple-dark"
      : "border-brand-purple text-brand-purple hover:bg-brand-purple-light"
  );

  return (
    <div
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onBlur={onDeactivate}
      className={cn(
        // 1px border everywhere; the highlight adds a 1px ring (no layout shift) for a 2px purple edge.
        "relative flex flex-col rounded-lg border bg-white p-5 transition-[border-color,background-color,box-shadow] duration-200",
        highlighted
          ? "border-brand-purple bg-[#f7f5ff] shadow-xl ring-1 shadow-brand-purple/10 ring-brand-purple"
          : "border-brand-border"
      )}
    >
      {popular && (
        <span className="absolute top-4 right-4 rounded-md bg-brand-purple px-2.5 py-1 text-xs font-semibold tracking-wide text-white uppercase">
          Most Popular
        </span>
      )}

      <span
        className={cn(
          "flex size-11 items-center justify-center rounded-full",
          "transition-colors duration-200",
          highlighted ? "bg-brand-purple text-white" : "bg-brand-purple-light text-brand-purple"
        )}
      >
        <Icon className="size-5" aria-hidden />
      </span>

      <h2 className="mt-3 text-xl font-bold text-brand-text">{name}</h2>
      <p className="mt-1 text-sm text-brand-muted">{description}</p>

      <p className="mt-3 flex flex-wrap items-baseline gap-x-2">
        {price ? (
          <>
            <span className="text-4xl font-bold text-brand-purple lg:text-3xl 2xl:text-4xl">{formatINR(price[cycle])}</span>
            <span className="text-sm text-brand-muted">/ user / {cycle === "monthly" ? "month" : "year"}</span>
          </>
        ) : (
          <span className="text-4xl font-bold text-brand-text lg:text-3xl 2xl:text-4xl">Let&apos;s Talk</span>
        )}
      </p>

      {/* mb-8 keeps a minimum gap; the CTA's mt-auto pins it to the card bottom so buttons align. */}
      <ul className="mt-4 mb-6 flex flex-col gap-2">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-3 text-sm text-brand-text">
            <Check className="size-4 shrink-0 text-brand-purple" strokeWidth={2.5} aria-hidden />
            {feature}
          </li>
        ))}
      </ul>

      {/* Priced plans open the checkout drawer with this plan and the cycle shown; Enterprise links out. */}
      {cta.href ? (
        <Link href={cta.href} className={ctaClass}>
          {cta.label}
        </Link>
      ) : (
        <CheckoutTrigger plan={id} cycle={cycle} className={ctaClass}>
          {cta.label}
        </CheckoutTrigger>
      )}
    </div>
  );
}
