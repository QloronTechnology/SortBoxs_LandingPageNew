"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import type { NavItem, NavLink } from "@/types/navigation";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { routes } from "@/config/routes";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  items: NavItem[];
}

const subscribeNoop = () => () => {};

/** True only after hydration, so the portal never renders during SSR. */
function useIsClient() {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  );
}

export function MobileNav({ items }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const isClient = useIsClient();

  function close() {
    setIsOpen(false);
    setOpenLabel(null);
    setOpenSection(null);
  }

  // Lock page scroll and allow Escape to close while the drawer is open.
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setOpenLabel(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const drawer = (
    // Portalled to <body>: the sticky header uses backdrop-blur, which would otherwise
    // become the containing block for this fixed overlay and clip it to the header strip.
    <div
      className={cn(
        "fixed inset-0 z-[100] transition-[visibility] duration-300 xl:hidden",
        isOpen ? "visible" : "invisible"
      )}
      aria-hidden={!isOpen}
    >
      <div
        onClick={close}
        className={cn(
          "absolute inset-0 bg-brand-navy/50 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0"
        )}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={cn(
          "absolute inset-y-0 right-0 flex w-[88%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-brand-border px-5">
          <Logo width={130} height={40} className="[&_img]:h-10 [&_img]:w-auto" />
          <button
            type="button"
            aria-label="Close menu"
            onClick={close}
            className="flex size-10 items-center justify-center rounded-lg text-brand-text hover:bg-brand-surface"
          >
            <X className="size-6" aria-hidden />
          </button>
        </div>

        <nav aria-label="Mobile primary" className="flex-1 overflow-y-auto px-5 py-2">
          <ul className="flex flex-col divide-y divide-brand-border">
            {items.map((item) => {
              if (item.type === "link" && item.href) {
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={close}
                      className="block py-4 text-base font-semibold text-brand-text"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }

              const isOpenItem = openLabel === item.label;

              return (
                <li key={item.label}>
                  <button
                    type="button"
                    aria-expanded={isOpenItem}
                    onClick={() => {
                      setOpenLabel(isOpenItem ? null : item.label);
                      setOpenSection(null);
                    }}
                    className={cn(
                      "flex w-full items-center justify-between py-4 text-base font-semibold",
                      isOpenItem ? "text-brand-purple" : "text-brand-text"
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn("size-5 transition-transform duration-200", isOpenItem && "rotate-180")}
                      aria-hidden
                    />
                  </button>

                  {/* Animated expand: grid rows 0fr -> 1fr. */}
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-out",
                      isOpenItem ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="flex flex-col gap-2 pb-4">
                        {item.columns?.map((column) =>
                          (item.columns?.length ?? 0) > 1 ? (
                            <MobileSubSection
                              key={column.heading}
                              heading={column.heading}
                              links={column.items}
                              expanded={openSection === column.heading}
                              focusable={isOpenItem}
                              onToggle={() =>
                                setOpenSection(openSection === column.heading ? null : column.heading)
                              }
                              onNavigate={close}
                            />
                          ) : (
                            <div key={column.heading}>
                              <p className="mb-1.5 px-2 text-xs font-bold tracking-wider text-brand-muted uppercase">
                                {column.heading}
                              </p>
                              <MobileLinks links={column.items} focusable={isOpenItem} onNavigate={close} />
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Top-bar links (About Us, Careers, …) are hidden on small screens, so surface them here. */}
          <div className="border-t border-brand-border pt-4 pb-2">
            <p className="mb-2 px-2 text-xs font-bold tracking-wider text-brand-muted uppercase">Company</p>
            <ul className="grid grid-cols-2 gap-1">
              {site.topLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={close}
                    tabIndex={isOpen ? undefined : -1}
                    className="block rounded-lg px-2 py-2 text-sm text-brand-text hover:bg-brand-surface hover:text-brand-purple"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-2 flex items-center gap-1.5 px-2 text-sm text-brand-muted">
              <Globe className="size-4" aria-hidden />
              English
            </p>
          </div>
        </nav>

        <div className="flex shrink-0 flex-col gap-3 border-t border-brand-border p-5">
          <Button href={routes.login} variant="outline" className="w-full justify-center" onClick={close}>
            Login
          </Button>
          <Button href={routes.demo} variant="secondary" className="w-full justify-center" onClick={close}>
            Book a Demo
          </Button>
          <Button href={routes.signup} variant="primary" className="w-full justify-center" onClick={close}>
            Start Free
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="xl:hidden">
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
        className="flex size-10 items-center justify-center rounded-lg text-brand-text"
      >
        <Menu className="size-6" aria-hidden />
      </button>

      {isClient && createPortal(drawer, document.body)}
    </div>
  );
}

function MobileLinks({
  links,
  focusable,
  onNavigate,
}: {
  links: NavLink[];
  focusable: boolean;
  onNavigate: () => void;
}) {
  return (
    <ul className="flex flex-col">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            href={link.href}
            onClick={onNavigate}
            tabIndex={focusable ? undefined : -1}
            className="block rounded-lg px-2 py-2 text-sm text-brand-text hover:bg-brand-surface hover:text-brand-purple"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Collapsible section inside a multi-section menu (e.g. Platform → Core Modules). */
function MobileSubSection({
  heading,
  links,
  expanded,
  focusable,
  onToggle,
  onNavigate,
}: {
  heading: string;
  links: NavLink[];
  expanded: boolean;
  focusable: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  return (
    <div className="rounded-xl bg-brand-surface/60">
      <button
        type="button"
        aria-expanded={expanded}
        tabIndex={focusable ? undefined : -1}
        onClick={onToggle}
        className="flex w-full items-center justify-between px-3 py-2.5 text-left text-xs font-bold tracking-wider text-brand-purple uppercase"
      >
        {heading}
        <ChevronDown
          className={cn("size-4 transition-transform duration-200", expanded && "rotate-180")}
          aria-hidden
        />
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden px-1 pb-1">
          <MobileLinks links={links} focusable={focusable && expanded} onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
}
