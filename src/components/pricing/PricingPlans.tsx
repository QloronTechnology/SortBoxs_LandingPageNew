"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { Check, ChevronDown, ChevronLeft, ChevronRight, CircleAlert, RotateCw } from "lucide-react";
import { enterprisePlan, yearlySavingsLabel, type BillingCycle, type PricingPlan } from "@/data/pricing";
import { routes } from "@/config/routes";
import { loadPlans } from "@/lib/plansApi";
import { cn, formatINR } from "@/lib/utils";
import { CheckoutTrigger } from "@/components/checkout/CheckoutTrigger";
import { usePricingPlans } from "./usePricingPlans";

const cycles: { value: BillingCycle; label: string }[] = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

/** The design's row: 4 cards (3 plans + Enterprise), centred when there are fewer. */
const cardWidth = "w-full md:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-3.75rem)/4)]";

/** Backend plans that fit next to Enterprise on desktop; more than this and they become a slider. */
const visiblePlans = 3;

/**
 * Horizontal slider for the backend plans: scroll-snap (swipe on touch, trackpad on desktop) with
 * previous/next buttons that appear only when there's more to see. Shows 3 cards on desktop, 2 on
 * tablets and 1 (with the next one peeking) on phones.
 */
function PlanSlider({ label, children }: { label: string; children: ReactNode[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const measure = () => {
    const el = track.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft <= 1, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1 });
  };

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const slide = (direction: 1 | -1) => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: "smooth" });
  };

  const arrow =
    "absolute top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-brand-border bg-white text-brand-purple shadow-md transition-opacity outline-none hover:bg-brand-purple-light focus-visible:ring-2 focus-visible:ring-brand-purple/60 disabled:pointer-events-none disabled:opacity-0";

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label} className="relative min-w-0 flex-1">
      <div
        ref={track}
        onScroll={measure}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pt-1 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children.map((child, index) => (
          <div key={index} className="w-[85%] shrink-0 snap-start md:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]">
            {child}
          </div>
        ))}
      </div>
      <button type="button" aria-label="Previous plans" onClick={() => slide(-1)} disabled={edges.start} className={cn(arrow, "-left-3 sm:-left-5")}>
        <ChevronLeft className="size-5" aria-hidden />
      </button>
      <button type="button" aria-label="More plans" onClick={() => slide(1)} disabled={edges.end} className={cn(arrow, "-right-3 sm:-right-5")}>
        <ChevronRight className="size-5" aria-hidden />
      </button>
    </div>
  );
}

/**
 * The card's feature list at a fixed height (about 9 rows) so every card is the same size whatever the
 * plan includes. Longer lists scroll inside the card; a fade and a "scroll for all" hint show there's more.
 */
function FeatureList({ features }: { features: string[] }) {
  const list = useRef<HTMLUListElement>(null);
  const [more, setMore] = useState(false);

  const measure = () => {
    const el = list.current;
    if (el) setMore(el.scrollTop + el.clientHeight < el.scrollHeight - 1);
  };

  useEffect(measure, [features]);

  const overflows = features.length > 9;
  return (
    <div className="mt-4 mb-6">
      <ul
        ref={list}
        onScroll={measure}
        tabIndex={overflows ? 0 : undefined}
        aria-label={overflows ? `${features.length} included features` : undefined}
        className={cn(
          "flex h-[15.5rem] flex-col gap-2 overflow-y-auto overscroll-contain pr-1 outline-none [scrollbar-color:#d9d4f7_transparent] [scrollbar-width:thin] focus-visible:ring-2 focus-visible:ring-brand-purple/40",
          more && "[mask-image:linear-gradient(to_bottom,black_78%,transparent)]"
        )}
      >
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-3 text-sm text-brand-text">
            <Check className="size-4 shrink-0 text-brand-purple" strokeWidth={2.5} aria-hidden />
            {feature}
          </li>
        ))}
      </ul>
      <p aria-hidden className={cn("mt-1.5 flex h-4 items-center gap-1 text-xs text-brand-muted transition-opacity", more ? "opacity-100" : "opacity-0")}>
        <ChevronDown className="size-3.5 animate-bounce" />
        Scroll to see all {features.length}
      </p>
    </div>
  );
}

/** Monthly/Yearly toggle (overlapping the hero's bottom edge), the backend plans, then Enterprise. */
export function PricingPlans() {
  const [cycle, setCycle] = useState<BillingCycle>("monthly");
  const plans = usePricingPlans();
  const apiPlans = plans.status === "ready" ? plans.plans : [];
  const allPlans = [...apiPlans, enterprisePlan];
  // The hovered/focused card is highlighted; with none, the "Most Popular" plan is.
  const [hovered, setHovered] = useState<string | null>(null);
  const highlighted = hovered ?? allPlans.find((plan) => plan.popular)?.id;

  const cardProps = (plan: PricingPlan, index: number) => ({
    plan,
    cycle,
    primary: index === 0 && plan !== enterprisePlan,
    highlighted: highlighted === plan.id,
    onActivate: () => setHovered(plan.id),
    onDeactivate: () => setHovered(null),
  });

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

        <div className="mt-8" onMouseLeave={() => setHovered(null)} aria-busy={plans.status === "loading"}>
          {apiPlans.length > visiblePlans ? (
            // More plans than fit: the backend plans slide, Enterprise stays put on the right.
            <div className="flex flex-col gap-5 lg:flex-row">
              <PlanSlider label="Subscription plans">
                {apiPlans.map((plan, index) => (
                  <PlanCard key={plan.id} {...cardProps(plan, index)} className="h-full w-full" />
                ))}
              </PlanSlider>
              {/* Same vertical padding as the slider track, so Enterprise lines up with the slides. */}
              <div className={cn(cardWidth, "shrink-0 self-center pt-1 pb-3 lg:self-auto")}>
                <PlanCard {...cardProps(enterprisePlan, -1)} className="h-full" />
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-5">
              {plans.status === "loading" && [0, 1, 2].map((i) => <PlanCardSkeleton key={i} />)}
              {plans.status === "error" && <PlansError />}
              {allPlans.map((plan, index) => (
                <PlanCard key={plan.id} {...cardProps(plan, index)} className={cardWidth} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/** Placeholder with the card's shape while the plans load. */
function PlanCardSkeleton() {
  return (
    <div aria-hidden className={cn(cardWidth, "flex animate-pulse flex-col rounded-lg border border-brand-border bg-white p-5")}>
      <span className="size-11 rounded-full bg-brand-purple-light" />
      <span className="mt-4 h-5 w-32 rounded bg-brand-surface" />
      <span className="mt-2 h-4 w-44 rounded bg-brand-surface" />
      <span className="mt-4 h-8 w-28 rounded bg-brand-purple-light" />
      <span className="mt-5 flex flex-col gap-2.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className="h-3.5 w-3/4 rounded bg-brand-surface" />
        ))}
      </span>
      <span className="mt-8 h-10 rounded-lg bg-brand-surface" />
    </div>
  );
}

/** The plans couldn't be fetched: say so, offer a retry and a human. Enterprise still shows next to it. */
function PlansError() {
  return (
    <div role="alert" className={cn(cardWidth, "flex flex-col items-center justify-center rounded-lg border border-dashed border-brand-border bg-white p-6 text-center lg:w-[calc((100%-3.75rem)*3/4+2.5rem)]")}>
      <CircleAlert className="size-8 text-brand-purple" aria-hidden />
      <p className="mt-3 text-lg font-semibold text-brand-text">We couldn&apos;t load our plans</p>
      <p className="mt-1 max-w-sm text-sm text-brand-muted">Please check your connection and try again, or talk to our team for pricing.</p>
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => loadPlans({ retry: true })}
          className="flex items-center gap-2 rounded-lg bg-brand-purple px-4 py-2.5 text-sm font-semibold text-white outline-none hover:bg-brand-purple-dark focus-visible:ring-2 focus-visible:ring-brand-purple/60"
        >
          <RotateCw className="size-4" aria-hidden /> Try again
        </button>
        <Link
          href={routes.demo}
          className="rounded-lg border border-brand-purple px-4 py-2.5 text-sm font-semibold text-brand-purple outline-none hover:bg-brand-purple-light focus-visible:ring-2 focus-visible:ring-brand-purple/60"
        >
          Contact Sales
        </Link>
      </div>
    </div>
  );
}

function PlanCard({
  plan,
  cycle,
  primary,
  highlighted,
  onActivate,
  onDeactivate,
  className,
}: {
  plan: PricingPlan;
  cycle: BillingCycle;
  /** Filled purple button (the first plan), instead of outlined. */
  primary: boolean;
  highlighted: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  /** Width, set by the layout (centred row or slider). */
  className?: string;
}) {
  const { id, name, description, icon: Icon, price, features, cta, popular } = plan;
  const ctaClass = cn(
    "mt-auto flex items-center justify-center rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/60",
    primary
      ? "border-brand-purple bg-brand-purple text-white hover:bg-brand-purple-dark"
      : "border-brand-purple text-brand-purple hover:bg-brand-purple-light"
  );

  return (
    <div
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onBlur={onDeactivate}
      className={cn(
        className,
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

      {/* Fixed height, so all cards match; the CTA's mt-auto pins it to the card bottom. */}
      <FeatureList features={features} />

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
