"use client";

import { useEffect, useRef, useState, type FocusEvent } from "react";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/types/navigation";
import { cn } from "@/lib/utils";
import { isNavItemActive } from "@/config/navigation";
import { NavItemTrigger, NavItemLink } from "./NavItem";
import { MegaPanel } from "./MegaPanel";
import { navPanels } from "./menus";

interface DesktopNavProps {
  items: NavItem[];
  className?: string;
}

/** Delay before a hover-opened menu closes, so moving the pointer to the panel doesn't flicker. */
const CLOSE_DELAY_MS = 150;

function panelId(label: string) {
  return `nav-panel-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

export function DesktopNav({ items, className }: DesktopNavProps) {
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRefs = useRef(new Map<string, HTMLButtonElement>());
  const pathname = usePathname();

  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }

  function open(label: string) {
    cancelClose();
    setOpenLabel(label);
  }

  function scheduleClose() {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenLabel(null), CLOSE_DELAY_MS);
  }

  useEffect(() => cancelClose, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenLabel(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!openLabel) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape" || !openLabel) return;
      setOpenLabel(null);
      triggerRefs.current.get(openLabel)?.focus(); // return focus to the tab that owned the menu
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [openLabel]);

  // Keyboard users tabbing out of the nav (and its open panel) close the menu.
  function handleBlur(event: FocusEvent<HTMLElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpenLabel(null);
  }

  return (
    <nav
      ref={navRef}
      aria-label="Primary"
      className={cn("hidden items-center xl:flex", className)}
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
      onBlur={handleBlur}
    >
      {items.map((item) => {
        const isActive = isNavItemActive(item, pathname);

        if (item.type === "link" && item.href) {
          return <NavItemLink key={item.label} label={item.label} href={item.href} isActive={isActive} />;
        }

        const isOpen = openLabel === item.label;
        const id = panelId(item.label);
        const Panel = item.type === "panel" && item.panel ? navPanels[item.panel] : null;

        return (
          <div key={item.label} className="relative">
            <NavItemTrigger
              ref={(node) => {
                if (node) triggerRefs.current.set(item.label, node);
                else triggerRefs.current.delete(item.label);
              }}
              label={item.label}
              isOpen={isOpen}
              isActive={isActive}
              controls={id}
              onMouseEnter={() => open(item.label)}
              // Mouse click only opens (hover already did, so toggling would slam it shut);
              // keyboard activation (detail === 0) toggles.
              onClick={(event) => {
                if (event.detail === 0) setOpenLabel(isOpen ? null : item.label);
                else open(item.label);
              }}
            />
            {isOpen && Panel && (
              <MegaPanel id={id} label={`${item.label} menu`}>
                <Panel onNavigate={() => setOpenLabel(null)} />
              </MegaPanel>
            )}
          </div>
        );
      })}
    </nav>
  );
}
