import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChartNoAxesColumnIncreasing, ChevronRight } from "lucide-react";
import { industriesMenu } from "@/data/menus/industriesMenu";
import { cn } from "@/lib/utils";
import type { NavPanelContentProps } from "./types";
import { menuCardBg, menuEyebrow, menuFocusRing } from "./menuStyles";
import { MenuArrowLink, MenuCategoryGrid } from "./MenuCategoryGrid";

const primaryButton =
  "inline-flex w-fit items-center gap-1.5 rounded-lg bg-brand-purple px-3.5 py-2 text-sm font-semibold whitespace-nowrap text-white transition-colors hover:bg-brand-purple-dark";

/** Industries mega menu: intro card, 4×2 industry grid and a spotlight card (no bottom strip). */
export function IndustriesMegaMenu({ onNavigate }: NavPanelContentProps) {
  const { intro, categories, spotlight } = industriesMenu;

  return (
    <div className="p-4 3xl:p-5">
      {/* Below 1800px: intro + industry grid (spotlight hidden so each header stays at one title
          line + two description lines). 4xl (1800+): spotlight card too. */}
      <div className="grid xl:grid-cols-[256px_minmax(0,1fr)] 4xl:grid-cols-[256px_minmax(0,1fr)_290px]">
        {/* 1. Intro card */}
        <div className={cn("mr-4 rounded-2xl p-5", menuCardBg)}>
          <p className={menuEyebrow}>{intro.eyebrow}</p>
          <h3 className="mt-2 text-2xl leading-tight font-bold text-brand-text">{intro.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-brand-muted">{intro.description}</p>
          <Link href={intro.cta.href} onClick={onNavigate} className={cn("mt-4", primaryButton, menuFocusRing)}>
            {intro.cta.label} <ArrowRight className="size-4" aria-hidden />
          </Link>

          <div className="mt-5 border-t border-brand-purple/10 pt-4">
            <p className="px-2 text-sm font-semibold text-brand-text">{intro.popularHeading}</p>
            <ul className="mt-2 flex flex-col">
              {intro.links.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <Link
                    href={href}
                    onClick={onNavigate}
                    className={cn(
                      "group flex items-center gap-3 rounded-lg px-2 py-1.5 text-sm text-brand-text transition-colors hover:bg-white hover:text-brand-purple",
                      menuFocusRing
                    )}
                  >
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-white text-brand-purple shadow-sm">
                      <Icon className="size-3.5" aria-hidden />
                    </span>
                    {label}
                    <ChevronRight
                      className="ml-auto size-4 text-brand-muted transition-transform group-hover:translate-x-0.5 group-hover:text-brand-purple"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 2. Industry grid: 4 columns × 2 rows (shared with the Solutions menu) */}
        <MenuCategoryGrid categories={categories} onNavigate={onNavigate} />

        {/* 3. Spotlight card + quick links (4xl+ only) */}
        <div className="hidden border-l border-brand-border pl-4 4xl:block">
          <div className={cn("rounded-2xl p-3 3xl:p-4", menuCardBg)}>
            <div className="px-1">
              <p className={menuEyebrow}>{spotlight.eyebrow}</p>
              <h3 className="mt-2 text-xl leading-tight font-bold text-brand-text">{spotlight.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-muted">{spotlight.description}</p>
              <Link
                href={spotlight.cta.href}
                onClick={onNavigate}
                className={cn(primaryButton, "mt-4 px-3 text-[13px] 3xl:px-3.5 3xl:text-sm", menuFocusRing)}
              >
                {spotlight.cta.label} <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>

            {/* Building photo with a floating badge */}
            <div className="relative mt-3 h-36 overflow-hidden rounded-xl 3xl:mt-4">
              <Image
                src={spotlight.image.src}
                alt={spotlight.image.alt}
                width={spotlight.image.width}
                height={spotlight.image.height}
                className="size-full object-cover object-top"
              />
              <div className="absolute top-3 right-3 flex items-center gap-2 rounded-xl bg-white/95 px-2.5 py-2 shadow-lg shadow-brand-navy/15 backdrop-blur">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-brand-purple-light text-brand-purple">
                  <ChartNoAxesColumnIncreasing className="size-4" aria-hidden />
                </span>
                <span className="max-w-[6.5rem] text-[11px] leading-tight font-semibold text-brand-text">
                  {spotlight.badge}
                </span>
              </div>
            </div>

            {/* Stat cards */}
            <dl className="mt-2 grid grid-cols-4 gap-1.5">
              {spotlight.stats.map((stat) => (
                <div key={stat.label} className="rounded-lg border border-brand-border bg-white px-1 py-2 text-center">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="text-sm font-bold text-brand-text">{stat.value}</dd>
                  <dd className="text-[10px] text-brand-muted" aria-hidden>
                    {stat.label}
                  </dd>
                  <dd className="mt-0.5 text-[10px] font-semibold text-emerald-600">
                    <span aria-hidden>▲ </span>
                    {stat.change}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-5 px-1">
            <p className="text-base font-semibold text-brand-text">Quick Links</p>
            <ul className="mt-2 flex flex-col">
              {spotlight.quickLinks.map((link) => (
                <li key={link.label}>
                  <MenuArrowLink href={link.href} label={link.label} onNavigate={onNavigate} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
