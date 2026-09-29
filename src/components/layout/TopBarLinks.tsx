"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

/** True on the link's page or any page below it (e.g. /company/about). */
export const isTopLinkActive = (href: string, pathname: string) => pathname === href || pathname.startsWith(`${href}/`);

/**
 * The top bar's company links (About Us, Careers, …). The current page's link is shown selected: full
 * white, semibold, with an underline bar — like the main nav's active item.
 */
export function TopBarLinks() {
  const pathname = usePathname();
  return (
    <>
      {site.topLinks.map((link, index) => {
        const active = isTopLinkActive(link.href, pathname);
        return (
          <span key={link.href} className="flex items-center gap-4">
            {index > 0 && <span className="h-3 w-px bg-white/20" aria-hidden />}
            <Link
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative py-1 transition-colors outline-none focus-visible:underline",
                "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-fuchsia-400 after:transition-transform after:duration-300",
                active ? "font-semibold text-white after:scale-x-100" : "text-white/80 after:scale-x-0 hover:text-white hover:after:scale-x-100"
              )}
            >
              {link.label}
            </Link>
          </span>
        );
      })}
    </>
  );
}
