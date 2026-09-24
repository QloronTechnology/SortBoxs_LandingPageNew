import Link from "next/link";
import { Rocket, Globe } from "lucide-react";
import { site } from "@/config/site";

export function AnnouncementBar() {
  return (
    <div className="bg-brand-navy text-white">
      <div className="container-page flex h-10 items-center justify-between gap-4 text-xs sm:text-sm">
        <div className="flex items-center gap-2 truncate">
          <Rocket className="size-4 shrink-0 text-fuchsia-400" aria-hidden />
          <span className="truncate">{site.announcement}</span>
        </div>
        <nav aria-label="Company links" className="hidden items-center gap-4 md:flex">
          {site.topLinks.map((link, index) => (
            <span key={link.href} className="flex items-center gap-4">
              {index > 0 && <span className="h-3 w-px bg-white/20" aria-hidden />}
              <Link href={link.href} className="hover:text-white/80">
                {link.label}
              </Link>
            </span>
          ))}
          <span className="h-3 w-px bg-white/20" aria-hidden />
          <span className="flex items-center gap-1 text-white/90">
            <Globe className="size-3.5" aria-hidden />
            English
          </span>
        </nav>
      </div>
    </div>
  );
}
