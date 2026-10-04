"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { Calendar, Check, ChevronDown, ChevronLeft, ChevronRight, CircleAlert, Crown, RotateCw } from "lucide-react";
import { enterprisePlan, yearlySavingsLabel, type BillingCycle, type PricingPlan } from "@/data/pricing";
import { routes } from "@/config/routes";
import { loadPlans } from "@/lib/plansApi";
import { cn, formatINR } from "@/lib/utils";
import { CheckoutTrigger } from "@/components/checkout/CheckoutTrigger";
import { usePricingPlans } from "./usePricingPlans";

const cycles: { value: BillingCycle; label: string; description: string }[] = [
  { value: "monthly", label: "Monthly", description: "Pay every month" },
  { value: "yearly", label: "Yearly", description: "Pay once a year" },
];

/** The design's row: 4 cards (backend plans + the fixed Enterprise card), centred when there are fewer. */
const cardWidth = "w-full md:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-3.75rem)/4)]";

/** Backend plans that fit next to the fixed Enterprise card on desktop; more than this and they slide. */
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
  // Yearly badge from the backend's yearlyDiscountPercentage ("Save 20%", or "Save up to 25%" when plans
  // differ); the design's copy until the plans have loaded.
  const savings = apiPlans.map((plan) => plan.yearlyDiscountPercent ?? 0).filter((percent) => percent > 0);
  const yearlyBadge = savings.length
    ? `Save ${new Set(savings).size > 1 ? "up to " : ""}${Math.max(...savings)}%`
    : yearlySavingsLabel;
  // The hovered/focused card is highlighted; with none, the "Most Popular" plan is (else the first tagged one).
  const [hovered, setHovered] = useState<string | null>(null);
  const highlighted = hovered ?? (allPlans.find((plan) => plan.tag === "Most Popular") ?? allPlans.find((plan) => plan.tag))?.id;

  const cardProps = (plan: PricingPlan, index: number) => ({
    plan,
    cycle,
    primary: index === 0 && plan !== enterprisePlan,
    highlighted: highlighted === plan.id,
    onActivate: () => setHovered(plan.id),
    onDeactivate: () => setHovered(null),
  });

  return (
    <section className="bg-white pt-14 pb-12">
      <div className="container-page">
        {/* Billing selector: exactly two bordered layers (outer frame, inner pill). The selected option is
            only a filled background + subtle shadow inside the inner layer — never a third border — and the
            whole control stays horizontal at every width, with the savings badge overlapping its right edge. */}
        <div className="relative z-10 flex items-center justify-center gap-0 px-4">
          {/* Outer border layer. */}
          <div className="inline-flex max-w-full rounded-full border-2 border-[#ece8fc] bg-white p-2 shadow-[0_4px_10px_-6px_rgba(108,53,245,0.18)]">
            {/* Inner border layer — a small, consistent gap from the outer border (the outer's padding);
                the selected option sits with the same normal inset from the inner border, not a floating island. */}
            <div role="group" aria-label="Billing cycle" className="flex items-stretch rounded-full border border-[#ddd6f9] bg-white p-1">
              {cycles.map(({ value, label, description }, index) => {
                const active = cycle === value;
                return (
                  <div key={value} className="flex h-8 items-stretch sm:h-12">
                    {index > 0 && <span className="mx-0.5 w-px shrink-0 self-stretch bg-[#e4e0fb] sm:mx-1" aria-hidden />}
                    <button
                      type="button"
                      aria-pressed={active}
                      onClick={() => setCycle(value)}
                      className={cn(
                        "flex h-full items-center gap-1.5 rounded-full px-2.5 text-left transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/60 sm:gap-2.5 sm:px-5",
                        active ? "bg-gradient-to-br from-brand-purple to-[#4c1fc7] shadow-sm shadow-brand-purple/25" : "hover:bg-brand-purple-light/30"
                      )}
                    >
                      <Calendar className={cn("size-3.5 shrink-0 sm:size-5", active ? "text-white" : "text-[#6b6f8a]")} aria-hidden />
                      <span className="min-w-0">
                        <span className={cn("block text-xs font-bold whitespace-nowrap sm:text-base", active ? "text-white" : "text-brand-navy")}>
                          {label}
                        </span>
                        <span
                          className={cn(
                            "hidden text-xs whitespace-nowrap sm:block",
                            active ? "text-white/75" : "text-brand-muted"
                          )}
                        >
                          {description}
                        </span>
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Badge: a CSS triangle gives it the speech-bubble tail pointing into the toggle, then it
              overlaps the outer frame's right edge (-ml, lower z-index) without hiding either border. */}
          <div className="relative z-0 -ml-3 flex shrink-0 items-center sm:-ml-4">
            <span aria-hidden className="h-0 w-0 border-y-[9px] border-r-[9px] border-y-transparent border-r-emerald-100 sm:border-y-[12px] sm:border-r-[12px]" />
            <span className="flex items-center gap-1 rounded-r-xl bg-emerald-100 py-1.5 pr-2.5 pl-1 text-xs font-bold whitespace-nowrap text-emerald-700 shadow-sm sm:gap-1.5 sm:py-2 sm:pr-4 sm:text-sm">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-200/70 sm:size-6">
                <Crown className="size-3 sm:size-3.5" aria-hidden />
              </span>
              {yearlyBadge}
            </span>
            {/* Small decorative accent strokes, same flourish as the reference. */}
            <span aria-hidden className="absolute top-0.5 right-2 hidden h-2.5 w-0.5 -translate-y-2 -rotate-12 rounded-full bg-emerald-400 sm:block" />
            <span aria-hidden className="absolute top-0.5 right-0.5 hidden h-3 w-0.5 -translate-y-2.5 rounded-full bg-emerald-400 sm:block" />
            <span aria-hidden className="absolute top-0.5 -right-1 hidden h-2.5 w-0.5 -translate-y-2 rotate-12 rounded-full bg-emerald-400 sm:block" />
          </div>
        </div>

        <div className="mt-8" onMouseLeave={() => setHovered(null)} aria-busy={plans.status === "loading"}>
          {apiPlans.length > visiblePlans ? (
            // More backend plans than fit next to it: they slide, Enterprise stays put on the right.
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
  const { id, name, description, icon: Icon, price, features, cta, tag, includes, yearlyDiscountPercent } = plan;
  // Yearly on a discounted backend plan: show 12 × the monthly price struck through, and the saving.
  const yearlyList = cycle === "yearly" && price && yearlyDiscountPercent ? price.monthly * 12 : null;
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
      {tag && (
        <span className="absolute top-4 right-4 rounded-md bg-brand-purple px-2.5 py-1 text-xs font-semibold tracking-wide text-white uppercase">
          {tag}
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
            {yearlyList !== null && yearlyList > price[cycle] && (
              <span className="flex w-full items-center gap-2 text-sm">
                <span className="text-brand-muted line-through tabular-nums">
                  <span className="sr-only">Was </span>
                  {formatINR(yearlyList)}
                </span>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                  Save {yearlyDiscountPercent}%
                </span>
              </span>
            )}
          </>
        ) : (
          <span className="text-4xl font-bold text-brand-text lg:text-3xl 2xl:text-4xl">Let&apos;s Talk</span>
        )}
      </p>

      {includes && <p className="mt-3 text-xs font-semibold text-brand-purple">{includes}</p>}

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
