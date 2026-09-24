import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { solutionsMenu } from "@/data/menus/solutionsMenu";
import { cn } from "@/lib/utils";
import type { NavPanelContentProps } from "./types";
import { menuCardBg, menuEyebrow, menuFocusRing } from "./menuStyles";
import { MenuArrowLink, MenuCategoryGrid } from "./MenuCategoryGrid";

/** Solutions mega menu: intro card, 4×2 category grid and a featured AI card (no bottom strip). */
export function SolutionsMegaMenu({ onNavigate }: NavPanelContentProps) {
  const { intro, categories, featured } = solutionsMenu;

  return (
    <div className="p-4 3xl:p-5">
      {/* xl (1280–1535): intro + 4 category columns, featured card hidden. 2xl+: featured card too. */}
      <div className="grid xl:grid-cols-[256px_minmax(0,1fr)] 2xl:grid-cols-[244px_minmax(0,1fr)_290px] 3xl:grid-cols-[270px_minmax(0,1fr)_300px]">
        {/* 1. Intro card */}
        <div className={cn("mr-4 rounded-2xl p-5", menuCardBg)}>
          <p className={menuEyebrow}>{intro.eyebrow}</p>
          <h3 className="mt-2 text-2xl leading-tight font-bold text-brand-text">{intro.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-brand-muted">{intro.description}</p>
          <Link
            href={intro.cta.href}
            onClick={onNavigate}
            className={cn(
              "mt-4 inline-flex w-fit items-center gap-1.5 rounded-lg bg-brand-purple px-3.5 py-2 text-sm font-semibold whitespace-nowrap text-white transition-colors hover:bg-brand-purple-dark",
              menuFocusRing
            )}
          >
            {intro.cta.label} <ArrowRight className="size-4" aria-hidden />
          </Link>

          <ul className="mt-5 flex flex-col gap-0.5 border-t border-brand-purple/10 pt-3">
            {intro.links.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <Link
                  href={href}
                  onClick={onNavigate}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-2 py-1.5 text-sm text-brand-text transition-colors hover:bg-white hover:text-brand-purple",
                    menuFocusRing
                  )}
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-white text-brand-purple shadow-sm">
                    <Icon className="size-3.5" aria-hidden />
                  </span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 2. Category grid: 4 columns × 2 rows with full-height dividers */}
        <MenuCategoryGrid categories={categories} onNavigate={onNavigate} />

        {/* 3. Featured card + quick links (2xl+ only) */}
        <div className="hidden border-l border-brand-border pl-4 2xl:block">
          <div className={cn("rounded-2xl p-5", menuCardBg)}>
            <p className={menuEyebrow}>{featured.eyebrow}</p>
            <h3 className="mt-2 text-xl leading-tight font-bold text-brand-text">{featured.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-brand-muted">{featured.description}</p>
            <Link
              href={featured.cta.href}
              onClick={onNavigate}
              className={cn(
                "mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-purple px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-purple-dark",
                menuFocusRing
              )}
            >
              {featured.cta.label} <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Image
              src={featured.image.src}
              alt={featured.image.alt}
              width={featured.image.width}
              height={featured.image.height}
              className="mt-4 h-auto w-full rounded-xl"
            />
          </div>

          <div className="mt-5 px-1">
            <p className="text-base font-semibold text-brand-text">Quick Links</p>
            <ul className="mt-2 flex flex-col">
              {featured.quickLinks.map((link) => (
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
