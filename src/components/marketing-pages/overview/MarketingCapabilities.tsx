"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion, useTicker } from "@/components/sales-solution/hooks";
import { SampleTag, SectionHead } from "@/components/sales-solution/shared";
import { capabilityItems as items, capabilityMocks as mocks } from "./MarketingCapabilitiesAccordion";

const STEP_MS = 4500;

/**
 * The five Marketing solutions shown as one product window: a sidebar of solutions and a main screen for the
 * selected one. It moves through them on its own until the visitor picks one.
 */
export function MarketingCapabilities() {
  const reduced = useReducedMotion();
  const [taken, setTaken] = useState(false);
  const [tick, setTick] = useTicker(items.length, STEP_MS, reduced || taken, 0);
  const active = tick;
  const current = items[active];
  const playing = !reduced && !taken;
  const navRef = useRef<HTMLElement>(null);

  // On phones the solutions are a swipeable strip: keep the active one in view, without scrolling the page.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav || nav.scrollWidth <= nav.clientWidth) return;
    const button = nav.children[active] as HTMLElement | undefined;
    if (button) nav.scrollTo({ left: button.offsetLeft - 12, behavior: reduced ? "auto" : "smooth" });
  }, [active, reduced]);

  return (
    <section className="bg-brand-surface py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow="The Marketing solution" title="Everything Your Marketing Team Needs" intro="Five connected solutions in one workspace. Pick one to see it." />

        <div className="mx-auto mt-12 max-w-6xl overflow-hidden rounded-3xl bg-white shadow-[0_40px_80px_-44px_rgba(23,22,92,0.55)] ring-1 ring-brand-border">
          <div className="flex items-center justify-between gap-3 border-b border-brand-border bg-brand-surface/70 px-5 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex shrink-0 gap-1.5" aria-hidden>
                <span className="size-2.5 rounded-full bg-rose-300" />
                <span className="size-2.5 rounded-full bg-amber-300" />
                <span className="size-2.5 rounded-full bg-emerald-300" />
              </span>
              <p className="truncate text-sm font-bold text-brand-text">
                <span className="hidden sm:inline">SortBoxs </span>
                <span className="hidden text-brand-muted sm:inline">/ Marketing / </span>
                {current.title}
              </p>
            </div>
            <SampleTag />
          </div>

          <div className="grid lg:grid-cols-[250px_minmax(0,1fr)]">
            <nav ref={navRef} aria-label="Marketing solutions" className="relative flex snap-x gap-1.5 overflow-x-auto border-b border-brand-border bg-brand-surface/40 p-3 [scrollbar-width:none] lg:grid lg:snap-none lg:grid-cols-1 lg:content-start lg:overflow-visible lg:border-r lg:border-b-0 lg:p-4 [&::-webkit-scrollbar]:hidden">
              {items.map(({ icon: Icon, title, short, tile }, index) => {
                const isActive = index === active;
                return (
                  <button
                    key={title}
                    type="button"
                    aria-current={isActive ? "true" : undefined}
                    onClick={() => {
                      setTaken(true);
                      setTick(index);
                    }}
                    className={cn("relative flex shrink-0 snap-start items-center gap-3 overflow-hidden rounded-2xl p-2.5 text-left outline-none transition-all focus-visible:ring-2 focus-visible:ring-brand-purple lg:shrink", isActive ? "bg-white shadow-[0_12px_28px_-18px_rgba(108,53,245,0.6)] ring-1 ring-brand-purple/30" : "hover:bg-white/70")}
                  >
                    <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors", isActive ? cn(tile, "text-white") : "bg-white text-brand-purple ring-1 ring-brand-border")}>
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className={cn("block text-sm font-bold whitespace-nowrap lg:whitespace-normal", isActive ? "text-brand-text" : "text-brand-muted")}>{title}</span>
                      <span className="block text-[11px] font-semibold tracking-wide text-brand-muted/80 uppercase">{short}</span>
                    </span>
                    {isActive && playing && <span key={active} aria-hidden className="mk-progress absolute bottom-0 left-0 h-0.5 bg-brand-purple" style={{ animationDuration: `${STEP_MS}ms` }} />}
                  </button>
                );
              })}
            </nav>

            <div key={active} className="demo-rise grid gap-8 p-6 sm:p-8 lg:min-h-[400px] xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:items-center">
              <div>
                <span className={cn("flex size-12 items-center justify-center rounded-2xl text-white shadow-lg", current.tile)}>
                  <current.icon className="size-6" aria-hidden />
                </span>
                <h3 className="mt-4 text-2xl font-extrabold text-brand-text">{current.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-muted">{current.body}</p>
                <ul className="mt-5 space-y-2.5">
                  {current.points.map((point) => (
                    <li key={point} className="flex gap-2.5 text-sm text-brand-text">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                        <Check className="size-3" strokeWidth={3} aria-hidden />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
                <Link href={current.href} className="group mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-purple px-5 py-3 text-sm font-semibold text-white outline-none transition-colors hover:bg-brand-purple-dark focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2">
                  Explore {current.title} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </div>

              <div className={cn("rounded-3xl bg-gradient-to-br p-5 sm:p-7", current.tone)}>
                <div className="rounded-2xl bg-white p-4 shadow-[0_20px_44px_-26px_rgba(23,22,92,0.5)] ring-1 ring-brand-border sm:p-5 md:[zoom:1.15]">
                  <p className="mb-3 text-[11px] font-bold tracking-wide text-brand-muted uppercase">{current.short}</p>
                  {mocks[current.mock]}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
