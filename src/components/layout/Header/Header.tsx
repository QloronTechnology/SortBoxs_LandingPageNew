import { Search } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { navigation } from "@/config/navigation";
import { routes } from "@/config/routes";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="border-b border-brand-border bg-white/95 backdrop-blur">
      <div className="container-page flex h-20 items-center justify-between gap-4">
        {/* shrink-0: on crowded 1024–1280px headers the logo must not be squeezed. */}
        <Logo className="shrink-0" />

        <DesktopNav items={navigation} />

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 xl:flex">
            <button
              type="button"
              aria-label="Search"
              className="flex size-10 items-center justify-center rounded-lg text-brand-text hover:bg-brand-surface"
            >
              <Search className="size-5" aria-hidden />
            </button>
            <Button href={routes.login} variant="ghost">
              Login
            </Button>
            <Button href={routes.demo} variant="outline" size="sm">
              Book a Demo
            </Button>
            <Button href={routes.signup} variant="primary" size="sm">
              Start Free
            </Button>
          </div>

          <MobileNav items={navigation} />
        </div>
      </div>
    </header>
  );
}
