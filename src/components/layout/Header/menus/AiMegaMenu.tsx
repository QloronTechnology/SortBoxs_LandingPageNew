import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { aiMenu } from "@/data/menus/aiMenu";
import { cn } from "@/lib/utils";
import type { NavPanelContentProps } from "./types";
import { menuCardBg, menuEyebrow, menuFocusRing } from "./menuStyles";
import { MenuFeatureColumn } from "./MenuFeatureColumn";

/** Matches the background baked into the partner-logos image so the strip blends seamlessly. */
const stripBg = "bg-[#f2effd]";

const blockButton =
  "flex w-full items-center justify-center gap-2 rounded-xl bg-brand-purple px-4 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-brand-purple-dark";

/** AI mega menu: intro card, three feature columns, featured "Meet SortBox AI" card and a partner strip. */
export function AiMegaMenu({ onNavigate }: NavPanelContentProps) {
  const { intro, columns, featured, strip } = aiMenu;

  return (
    <div className="p-4 3xl:p-5">
      {/* xl (1280–1535): intro + 3 columns, featured card hidden. 2xl+: featured card too. */}
      <div className="grid xl:grid-cols-[256px_repeat(3,minmax(0,1fr))] 2xl:grid-cols-[250px_repeat(3,minmax(0,1fr))_270px] 3xl:grid-cols-[270px_repeat(3,minmax(0,1fr))_290px]">
        {/* 1. Intro card */}
        <div className={cn("flex flex-col rounded-2xl p-5", menuCardBg)}>
          <p className={menuEyebrow}>{intro.eyebrow}</p>
          <h3 className="mt-2 text-2xl leading-tight font-bold text-brand-text">{intro.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-brand-muted">{intro.description}</p>
          <Link href={intro.cta.href} onClick={onNavigate} className={cn("mt-5", blockButton, menuFocusRing)}>
            {intro.cta.label} <ArrowRight className="size-4" aria-hidden />
          </Link>

          <ul className="mt-5 flex flex-col gap-4 border-t border-brand-purple/10 pt-5">
            {intro.highlights.map(({ title, description, icon: Icon }) => (
              <li key={title} className="flex items-start gap-3">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-purple-light text-brand-purple">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="pt-0.5">
                  <span className="block text-sm font-semibold text-brand-text">{title}</span>
                  <span className="block text-xs leading-snug text-brand-muted">{description}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* 2–4. Feature columns (dividers before Capabilities and Use Cases, as in the design) */}
        {columns.map((column, index) => (
          <MenuFeatureColumn
            key={column.heading}
            column={column}
            size="roomy"
            onNavigate={onNavigate}
            className={index === 0 ? "pr-3 pl-4" : "border-l border-brand-border px-3"}
          />
        ))}

        {/* 5. Featured card + quick links (2xl+ only) */}
        <div className="hidden pl-4 2xl:block">
          <Image
            src={featured.image.src}
            alt={featured.image.alt}
            width={featured.image.width}
            height={featured.image.height}
            className="h-auto w-full rounded-2xl"
          />
          <Link href={featured.cta.href} onClick={onNavigate} className={cn("mt-3", blockButton, menuFocusRing)}>
            {featured.cta.label} <ArrowRight className="size-4" aria-hidden />
          </Link>

          <p className="mt-5 px-1 text-sm font-semibold text-brand-text">Quick Links</p>
          <ul className="mt-2 flex flex-col">
            {featured.quickLinks.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <Link
                  href={href}
                  onClick={onNavigate}
                  className={cn(
                    "group flex items-center gap-2 rounded-md px-1 py-1.5 text-sm text-brand-purple transition-colors hover:text-brand-purple-dark",
                    menuFocusRing
                  )}
                >
                  <Icon className="size-4 shrink-0" aria-hidden />
                  <span className="min-w-0 flex-1">{label}</span>
                  <ArrowRight className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom strip: AI partners + trust points */}
      <div className={cn("mt-4 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 rounded-2xl px-6 py-4", stripBg)}>
        <div className="flex items-center gap-6">
          <div>
            <p className="text-sm font-semibold text-brand-text">{strip.partner.title}</p>
            <p className="mt-0.5 text-xs text-brand-muted">{strip.partner.description}</p>
          </div>
          <span className="hidden h-10 w-px bg-brand-purple/15 2xl:block" aria-hidden />
          <Image
            src={strip.partnerLogos.src}
            alt={strip.partnerLogos.alt}
            width={strip.partnerLogos.width}
            height={strip.partnerLogos.height}
            className="h-8 w-auto"
          />
        </div>

        {strip.points.map(({ title, description, icon: Icon }) => (
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
      </div>
    </div>
  );
}
