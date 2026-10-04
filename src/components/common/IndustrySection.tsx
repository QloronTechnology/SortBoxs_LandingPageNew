import Link from "next/link";
import type { IndustryItem } from "@/types/common";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";

/** One tile colour per card (by position), so the cards read as a varied set. Full class names for Tailwind. */
const cardTones = [
  "bg-violet-100 text-violet-600 group-hover:bg-violet-600",
  "bg-rose-100 text-rose-600 group-hover:bg-rose-600",
  "bg-sky-100 text-sky-600 group-hover:bg-sky-600",
  "bg-amber-100 text-amber-600 group-hover:bg-amber-500",
  "bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600",
  "bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600",
  "bg-pink-100 text-pink-600 group-hover:bg-pink-600",
  "bg-teal-100 text-teal-600 group-hover:bg-teal-600",
  "bg-orange-100 text-orange-600 group-hover:bg-orange-500",
  "bg-blue-100 text-blue-600 group-hover:bg-blue-600",
];

interface IndustrySectionProps {
  industries: IndustryItem[];
  className?: string;
  /** "strip": icon row (home page). "cards": small bordered cards (module pages). */
  variant?: "strip" | "cards";
}

export function IndustrySection({ industries, className, variant = "strip" }: IndustrySectionProps) {
  return (
    <section className={cn("bg-white pt-10 pb-4 lg:pt-12", className)}>
      <div className="container-page">
        <SectionHeader
          variant="compact"
          eyebrow="Built for every industry"
          title="Trusted by businesses across all industries."
          action={
            <Link href={routes.industries.all} className="text-sm font-semibold text-brand-purple hover:underline">
              View all<span className="hidden sm:inline"> Industries</span> →
            </Link>
          }
        />
      </div>

      {variant === "cards" ? (
        <ul className="container-page mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <li key={industry.name}>
                <Link
                  href={industry.href}
                  className="group flex h-full items-center gap-3 rounded-xl bg-white p-3 shadow-[0_10px_26px_-22px_rgba(23,22,92,0.5)] ring-1 ring-brand-border transition-all outline-none hover:-translate-y-0.5 hover:ring-brand-purple/40 focus-visible:ring-2 focus-visible:ring-brand-purple/60"
                >
                  <span
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors group-hover:text-white",
                      cardTones[index % cardTones.length],
                    )}
                  >
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="text-[13px] leading-tight font-semibold text-brand-text">{industry.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="mt-7">
          <ul className="container-page grid grid-cols-3 gap-y-1 py-3 sm:grid-cols-5 lg:grid-cols-10">
            {industries.map((industry) => {
              const Icon = industry.icon;
              return (
                <li key={industry.name}>
                  <Link
                    href={industry.href}
                    className="group flex h-full flex-col items-center gap-2.5 rounded-xl px-1 py-3 text-center transition-colors hover:bg-brand-surface"
                  >
                    <Icon
                      className="size-8 text-[#2f3ad6] transition-transform group-hover:-translate-y-0.5"
                      strokeWidth={2}
                      aria-hidden
                    />
                    <span className="text-sm leading-tight font-medium text-brand-text group-hover:text-brand-purple">
                      {industry.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}
