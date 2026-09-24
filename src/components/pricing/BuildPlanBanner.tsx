import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { InView } from "@/components/ui/InView";
import { PlanBuilderDemo } from "./PlanBuilderDemo";
import { buildPlanBanner } from "@/data/pricing";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

/**
 * "Build your own Sortboxs plan" banner. The gradient is sampled from the design. On the right, an
 * animated builder tailors a plan per business type (xl+). The copy rises in on scroll; a soft light
 * sweep and drifting glows keep it alive (all disabled for reduced motion).
 */
export function BuildPlanBanner() {
  const { eyebrow, title, description, primary, secondary } = buildPlanBanner;

  return (
    <section className="py-16">
      <div className="container-page">
        <InView className="relative grid items-center overflow-hidden rounded-xl xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] bg-[linear-gradient(90deg,#3b26b3_0%,#6046df_52%,#9779fb_100%)]">
          {/* Drifting glows */}
          <span
            aria-hidden
            className="bp-orb pointer-events-none absolute -top-16 left-[8%] size-48 rounded-full bg-[#9d86ff]/35 blur-3xl"
          />
          <span
            aria-hidden
            className="bp-orb pointer-events-none absolute -bottom-20 left-[38%] size-56 rounded-full bg-[#2a1a8f]/40 blur-3xl [animation-delay:-5s]"
          />

          {/* Light sweep */}
          <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <span className="bp-shine absolute inset-y-0 left-0 w-1/4 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.14),transparent)]" />
          </span>

          <div className="relative max-w-xl px-6 py-6 sm:px-10 sm:py-7">
            <p className="bp-rise text-xs font-medium tracking-[0.25em] text-white/85 uppercase sm:text-sm">{eyebrow}</p>
            <h2 className="bp-rise mt-2 text-2xl font-bold text-white sm:text-3xl" style={delay(100)}>
              {title}
            </h2>
            <p className="bp-rise mt-1.5 text-sm text-white/90 sm:text-base" style={delay(200)}>
              {description}
            </p>
            <div className="bp-rise mt-5 flex flex-wrap gap-3 sm:gap-4" style={delay(320)}>
              <Link
                href={primary.href}
                className="group inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-brand-purple shadow-lg shadow-black/10 transition-all outline-none hover:-translate-y-0.5 hover:bg-white/95 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-white sm:text-base"
              >
                {primary.label}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
              <Link
                href={secondary.href}
                className="group inline-flex items-center gap-2 rounded-lg border border-white/80 px-5 py-2.5 text-sm font-semibold text-white transition-all outline-none hover:-translate-y-0.5 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white sm:text-base"
              >
                {secondary.label}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </div>
          </div>

          <PlanBuilderDemo className="bp-rise relative hidden py-4 pr-8 xl:flex" />
        </InView>
      </div>
    </section>
  );
}
