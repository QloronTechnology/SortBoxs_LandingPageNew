"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MegaPanelProps {
  id: string;
  label: string;
  children: ReactNode;
}

/**
 * Reusable full-width mega-menu shell that drops in right below the header.
 * `fixed` + `top-full` works because the header's backdrop-blur makes <header> the containing
 * block for fixed descendants, so top-full = the header's bottom edge at any header height.
 *
 * Every panel has the same fixed height — the Solutions menu's natural height at each breakpoint
 * (capped to the viewport) — so all dropdowns line up. Taller menus scroll inside the panel, with a
 * bottom fade while more content remains. Content is supplied by a per-menu component (see ./menus).
 */
export function MegaPanel({ id, label, children }: MegaPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasMoreBelow, setHasMoreBelow] = useState(false);

  function updateFade() {
    const el = scrollRef.current;
    if (el) setHasMoreBelow(el.scrollTop + el.clientHeight < el.scrollHeight - 4);
  }

  // ResizeObserver fires once on observe, so this also sets the initial state.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const observer = new ResizeObserver(updateFade);
    observer.observe(el);
    if (el.firstElementChild) observer.observe(el.firstElementChild);
    return () => observer.disconnect();
  }, []);

  return (
    // pt-3 keeps a hover "bridge" between the header and the card so the pointer
    // never crosses dead space on its way down.
    <div id={id} role="region" aria-label={label} className="fixed inset-x-0 top-full z-40 pt-3">
      <div className="container-page">
        <div className="mega-panel-in relative overflow-hidden rounded-2xl border border-brand-border bg-white shadow-[0_24px_60px_-12px_rgba(23,22,92,0.25)]">
          <div
            ref={scrollRef}
            onScroll={updateFade}
            className="h-[min(565px,calc(100vh-150px))] overflow-y-auto overscroll-contain [scrollbar-width:thin] 2xl:h-[min(635px,calc(100vh-150px))] 3xl:h-[min(655px,calc(100vh-150px))]"
          >
            {children}
          </div>
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-white via-white/70 to-transparent transition-opacity duration-200",
              hasMoreBelow ? "opacity-100" : "opacity-0"
            )}
          />
        </div>
      </div>
    </div>
  );
}
