import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, Link2, Mail } from "lucide-react";
import { resourcesMenu, type ResourceColumn } from "@/data/menus/resourcesMenu";
import { cn } from "@/lib/utils";
import type { NavPanelContentProps } from "./types";
import { menuCardBg, menuEyebrow, menuFocusRing, toneClasses } from "./menuStyles";
import { MenuArrowLink } from "./MenuCategoryGrid";

/** Matches the edge colour of the guide illustration so the featured card blends into it. */
const featuredBg = "bg-[#f3f1fe]";
const stripBg = "bg-[#f2effd]";

const blockButton =
  "flex w-full items-center justify-center gap-2 rounded-xl bg-brand-purple px-4 py-2.5 text-[15px] font-semibold whitespace-nowrap text-white transition-colors hover:bg-brand-purple-dark";

/** Resources mega menu: intro card, four resource columns, featured guide card and a newsletter strip. */
export function ResourcesMegaMenu({ onNavigate }: NavPanelContentProps) {
  const { intro, columns, featured, newsletter, quickLinks } = resourcesMenu;

  return (
    <div className="p-4 3xl:p-5">
      {/* xl (1280–1535): intro + 4 columns, featured card hidden. 2xl+: featured card too. */}
      <div className="grid xl:grid-cols-[256px_repeat(4,minmax(0,1fr))] 2xl:grid-cols-[250px_repeat(4,minmax(0,1fr))_270px] 3xl:grid-cols-[270px_repeat(4,minmax(0,1fr))_290px]">
        {/* 1. Intro card */}
        <div className={cn("mr-4 flex flex-col rounded-2xl p-5", menuCardBg)}>
          <p className={menuEyebrow}>{intro.eyebrow}</p>
          <h3 className="mt-2 text-2xl leading-tight font-bold text-brand-text">{intro.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-brand-muted 3xl:mt-3">{intro.description}</p>
          <Link href={intro.cta.href} onClick={onNavigate} className={cn(blockButton, "mt-4 3xl:mt-5", menuFocusRing)}>
            {intro.cta.label} <ArrowRight className="size-4" aria-hidden />
          </Link>

          <ul className="mt-4 flex flex-col gap-0.5 border-t border-brand-purple/10 pt-3 3xl:mt-5 3xl:gap-1 3xl:pt-4">
            {intro.links.map(({ label, description, href, icon: Icon }) => (
              <li key={label}>
                <Link
                  href={href}
                  onClick={onNavigate}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-1.5 py-1 transition-colors hover:bg-white 3xl:py-1.5",
                    menuFocusRing
                  )}
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-purple-light text-brand-purple 3xl:size-10">
                    <Icon className="size-[18px] 3xl:size-5" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-brand-text group-hover:text-brand-purple">
                      {label}
                    </span>
                    <span className="block text-xs text-brand-muted">{description}</span>
                  </span>
                  <ChevronRight
                    className="size-4 shrink-0 text-brand-muted transition-transform group-hover:translate-x-0.5 group-hover:text-brand-purple"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 2–5. Resource columns with thin dividers */}
        {columns.map((column, index) => (
          <ResourceLinksColumn key={column.heading} column={column} divider={index > 0} onNavigate={onNavigate} />
        ))}

        {/* 6. Featured guide (2xl+ only) */}
        <div className="hidden pl-4 2xl:block">
          <div className={cn("overflow-hidden rounded-2xl", featuredBg)}>
            <div className="p-5 pb-0">
              <span className="inline-block rounded-md bg-brand-purple-light px-2 py-0.5 text-[11px] font-semibold tracking-wide text-brand-purple uppercase">
                {featured.eyebrow}
              </span>
              <h3 className="mt-2 text-xl leading-tight font-bold text-brand-text">{featured.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-muted">{featured.description}</p>
              <Link href={featured.cta.href} onClick={onNavigate} className={cn("mt-4", blockButton, menuFocusRing)}>
                {featured.cta.label} <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
            <Image
              src={featured.image.src}
              alt={featured.image.alt}
              width={featured.image.width}
              height={featured.image.height}
              className="mt-2 h-auto w-full"
            />
          </div>
        </div>
      </div>

      {/* Bottom strip: newsletter | quick links */}
      <div
        className={cn(
          "mt-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-6 rounded-2xl px-5 py-4 2xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_auto]",
          stripBg
        )}
      >
        <div className="flex items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-purple-light text-brand-purple">
            <Mail className="size-5" aria-hidden />
          </span>
          <span>
            <span className="block text-sm font-semibold text-brand-text">{newsletter.title}</span>
            <span className="block text-xs leading-snug text-brand-muted">{newsletter.description}</span>
          </span>
        </div>

        {/* Not connected to an email service yet — same as the footer newsletter. */}
        <form
          className="col-span-2 row-start-2 flex max-w-lg 2xl:col-span-1 2xl:row-start-auto"
          onSubmit={(event) => event.preventDefault()}
        >
          <label htmlFor="resources-newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="resources-newsletter-email"
            type="email"
            required
            placeholder="Enter your email address"
            className="min-w-0 flex-1 rounded-l-lg border border-r-0 border-brand-border bg-white px-4 py-2.5 text-sm text-brand-text placeholder:text-brand-muted focus:border-brand-purple focus:ring-1 focus:ring-brand-purple focus:outline-none"
          />
          <button
            type="submit"
            className={cn(
              "shrink-0 rounded-r-lg bg-brand-purple px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-purple-dark",
              menuFocusRing
            )}
          >
            Subscribe
          </button>
        </form>

        <div className="flex items-center gap-5 2xl:border-l 2xl:border-brand-purple/15 2xl:pl-6">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-lg bg-white text-brand-purple">
              <Link2 className="size-4" aria-hidden />
            </span>
            <span className="text-sm font-semibold whitespace-nowrap text-brand-text">Quick Links</span>
          </div>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-1 border-l border-brand-purple/15 pl-5">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={onNavigate}
                  className={cn(
                    "group flex items-center gap-3 rounded text-sm whitespace-nowrap text-brand-purple hover:text-brand-purple-dark",
                    menuFocusRing
                  )}
                >
                  {link.label}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ResourceLinksColumn({
  column,
  divider,
  onNavigate,
}: {
  column: ResourceColumn;
  divider: boolean;
  onNavigate?: () => void;
}) {
  const { heading, description, icon: Icon, tone, links } = column;

  return (
    <div className={cn("px-3", divider && "border-l border-brand-border")}>
      <p className={menuEyebrow}>{heading}</p>
      {/* Icon LEFT of the description, matching the Solutions/Industries headers. */}
      <div className="mt-3 flex items-start gap-3">
        <span className={cn("flex size-11 shrink-0 items-center justify-center rounded-xl", toneClasses[tone])}>
          <Icon className="size-5" aria-hidden />
        </span>
        <p className="text-sm leading-snug text-brand-muted">{description}</p>
      </div>
      <ul className="mt-4 flex flex-col">
        {links.map((link) => (
          <li key={link.label}>
            <MenuArrowLink href={link.href} label={link.label} onNavigate={onNavigate} />
          </li>
        ))}
      </ul>
    </div>
  );
}
