import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, CircleCheck, Play } from "lucide-react";
import { platformMenu } from "@/data/menus/platformMenu";
import { MenuFeatureColumn } from "./MenuFeatureColumn";
import type { NavPanelContentProps } from "./types";
import { menuCardBg, menuEyebrow as eyebrow, menuFocusRing as focusRing } from "./menuStyles";
import { cn } from "@/lib/utils";

/** Platform mega menu: intro card, three feature columns, promo card and a bottom highlights strip. */
export function PlatformMegaMenu({ onNavigate }: NavPanelContentProps) {
  const { intro, columns, promo, highlights, support } = platformMenu;

  return (
    <div className="p-4 3xl:p-5">
      {/* xl (1280–1535): 4 columns, promo hidden. 2xl+: all 5 columns. */}
      <div className="grid xl:grid-cols-[1.05fr_1fr_1.15fr_1fr] 2xl:grid-cols-[1.05fr_1fr_1.2fr_1.05fr_1.2fr]">
        {/* 1. Intro card */}
        <div className={cn("mr-4 flex flex-col rounded-2xl p-5", menuCardBg)}>
          <p className={eyebrow}>{intro.eyebrow}</p>
          <h3 className="mt-2 text-2xl leading-tight font-bold text-brand-text">{intro.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-brand-muted">{intro.description}</p>
          <Link
            href={intro.cta.href}
            onClick={onNavigate}
            className={cn(
              "mt-4 inline-flex w-fit items-center gap-2 rounded-lg bg-brand-purple px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-purple-dark",
              focusRing
            )}
          >
            {intro.cta.label} <ArrowRight className="size-4" aria-hidden />
          </Link>

          <ul className="mt-5 flex flex-col border-t border-brand-purple/10 pt-3">
            {intro.links.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <Link
                  href={href}
                  onClick={onNavigate}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-2 py-1.5 text-sm text-brand-text transition-colors hover:bg-white hover:text-brand-purple",
                    focusRing
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

          {/* mt-auto pins the video card to the bottom when the column is taller than its content. */}
          <div className="mt-auto pt-4">
            <Link
              href={intro.video.href}
              onClick={onNavigate}
              className={cn(
                "group flex items-center gap-3 rounded-xl bg-white/70 p-3 transition-colors hover:bg-white",
                focusRing
              )}
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-purple text-white shadow-md shadow-brand-purple/30 transition-transform group-hover:scale-105">
                <Play className="ml-0.5 size-4 fill-current" aria-hidden />
              </span>
              <span>
                <span className="block text-sm font-semibold text-brand-text">{intro.video.title}</span>
                <span className="block text-xs text-brand-muted">{intro.video.subtitle}</span>
              </span>
            </Link>
          </div>
        </div>

        {/* 2–4. Feature columns */}
        {columns.map((column) => (
          <MenuFeatureColumn
            key={column.heading}
            column={column}
            onNavigate={onNavigate}
            className="border-l border-brand-border px-4"
          />
        ))}

        {/* 5. Promo card (desktop 2xl+ only) */}
        <div className="hidden border-l border-brand-border pl-4 2xl:block">
          <div className={cn("rounded-2xl p-5", menuCardBg)}>
            <p className={eyebrow}>{promo.eyebrow}</p>
            <h3 className="mt-2 text-xl leading-tight font-bold text-brand-text">{promo.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-brand-muted">{promo.description}</p>
            <Link
              href={promo.cta.href}
              onClick={onNavigate}
              className={cn(
                "mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-purple px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-purple-dark",
                focusRing
              )}
            >
              {promo.cta.label} <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Image
              src={promo.image.src}
              alt={promo.image.alt}
              width={promo.image.width}
              height={promo.image.height}
              className="mt-4 h-auto w-full"
            />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 px-1">
            <div>
              <p className="text-sm font-semibold text-brand-text">Quick Links</p>
              <ul className="mt-2 flex flex-col gap-1.5">
                {promo.quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={onNavigate}
                      className={cn(
                        "flex items-center gap-1.5 rounded text-xs text-brand-muted transition-colors hover:text-brand-purple",
                        focusRing
                      )}
                    >
                      <ChevronRight className="size-3 text-brand-purple" aria-hidden />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-brand-text">Why Choose SortBox?</p>
              <ul className="mt-2 flex flex-col gap-1.5">
                {promo.whyChoose.map((reason) => (
                  <li key={reason} className="flex items-center gap-1.5 text-xs text-brand-muted">
                    <CircleCheck className="size-3.5 shrink-0 fill-brand-purple text-white" aria-hidden />
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="mt-4 grid grid-cols-2 items-center gap-4 rounded-2xl bg-slate-50 p-4 xl:grid-cols-[repeat(4,minmax(0,1fr))_auto]">
        {highlights.map(({ title, description, icon: Icon }) => (
          <div key={title} className="flex items-center gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-brand-purple/25 bg-white text-brand-purple">
              <Icon className="size-5" aria-hidden />
            </span>
            <span>
              <span className="block text-sm font-semibold text-brand-text">{title}</span>
              <span className="block text-xs text-brand-muted">{description}</span>
            </span>
          </div>
        ))}
        <Link
          href={support.href}
          onClick={onNavigate}
          className={cn(
            "group col-span-2 flex items-center gap-3 rounded-xl bg-brand-purple-light/70 px-4 py-3 transition-colors hover:bg-brand-purple-light xl:col-span-1",
            focusRing
          )}
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-purple text-white transition-transform group-hover:scale-105">
            <Play className="ml-0.5 size-4 fill-current" aria-hidden />
          </span>
          <span>
            <span className="block text-sm font-semibold whitespace-nowrap text-brand-text">{support.title}</span>
            <span className="block text-xs text-brand-muted">{support.subtitle}</span>
          </span>
        </Link>
      </div>
    </div>
  );
}
