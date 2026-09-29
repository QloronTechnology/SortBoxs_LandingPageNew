"use client";

import { useEffect } from "react";
import { routes } from "@/config/routes";

/**
 * The Book a Demo modal's open state lives in the URL hash (`#book-demo` = routes.demo), like the
 * checkout drawer: any "Book a Demo" link opens it on the current page — including server-rendered
 * Buttons and menu data — the browser Back button closes it, and sortboxs.com/#book-demo can be shared.
 */
export const BOOK_DEMO_HASH = routes.demo;

// True when we added the hash entry ourselves, so closing can step back over it.
let pushed = false;

export function openBookDemo() {
  if (window.location.hash === BOOK_DEMO_HASH) return;
  pushed = true;
  window.location.hash = BOOK_DEMO_HASH;
}

export function closeBookDemo() {
  if (pushed) {
    pushed = false;
    history.back();
  } else {
    // Arrived via a #book-demo link: drop the hash without leaving the page.
    history.replaceState(history.state, "", window.location.pathname + window.location.search);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }
}

/**
 * Next's <Link href="#book-demo"> scrolls to an anchor with pushState, which doesn't fire `hashchange`.
 * Catch those clicks first (capture phase) and open the modal instead. `preventDefault` makes <Link>
 * skip its own navigation but other click handlers still run (e.g. the mobile menu closing itself).
 */
export function useBookDemoLinks() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      const url = new URL((link as HTMLAnchorElement).href, window.location.href);
      if (url.hash !== BOOK_DEMO_HASH || url.pathname !== window.location.pathname) return;
      event.preventDefault();
      openBookDemo();
    };
    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, []);
}
