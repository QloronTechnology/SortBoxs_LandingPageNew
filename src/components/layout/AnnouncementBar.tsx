import { Rocket, Globe } from "lucide-react";
import { site } from "@/config/site";
import { TopBarLinks } from "./TopBarLinks";

export function AnnouncementBar() {
  return (
    <div className="bg-brand-navy text-white">
      <div className="container-page flex h-10 items-center justify-between gap-4 text-xs sm:text-sm">
        <div className="flex items-center gap-2 truncate">
          <Rocket className="size-4 shrink-0 text-fuchsia-400" aria-hidden />
          <span className="truncate">{site.announcement}</span>
        </div>
        <nav aria-label="Company links" className="hidden items-center gap-4 md:flex">
          <TopBarLinks />
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
