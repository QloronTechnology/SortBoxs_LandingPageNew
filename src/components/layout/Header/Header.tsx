import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { navigation } from "@/config/navigation";
import { routes } from "@/config/routes";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="border-b border-brand-border bg-white/95 backdrop-blur">
      <div className="container-page flex h-20 items-center gap-4">
        {/* shrink-0: on crowded 1024–1280px headers the logo must not be squeezed. */}
        <Logo className="shrink-0" />

        {/* Nav sits next to the logo; the action buttons are pushed to the right edge. */}
        <DesktopNav items={navigation} className="ml-4 3xl:ml-8" />

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden items-center gap-2 xl:flex">
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
