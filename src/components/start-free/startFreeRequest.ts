"use client";

import { useEffect } from "react";
import { routes } from "@/config/routes";

/**
 * The Start Free drawer's open state lives in the URL hash (`#start-free` = routes.signup), exactly like
 * the checkout drawer and the Book a Demo modal: any "Start Free" link opens it on the current page, the
 * browser Back button closes it, and sortboxs.com/#start-free can be shared/bookmarked.
 */
export const START_FREE_HASH = routes.signup;

// True when we added the hash entry ourselves, so closing can step back over it.
let pushed = false;

export function openStartFree() {
  if (window.location.hash === START_FREE_HASH) return;
  pushed = true;
  window.location.hash = START_FREE_HASH;
}

export function closeStartFree() {
  if (pushed) {
    pushed = false;
    history.back();
  } else {
    // Arrived via a #start-free link: drop the hash without leaving the page.
    history.replaceState(history.state, "", window.location.pathname + window.location.search);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }
}

/**
 * Next's <Link href="#start-free"> scrolls to an anchor with pushState, which doesn't fire `hashchange`.
 * Catch those clicks first (capture phase) and open the drawer instead — see bookDemoRequest.ts, which
 * this mirrors.
 */
export function useStartFreeLinks() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      const url = new URL((link as HTMLAnchorElement).href, window.location.href);
      if (url.hash !== START_FREE_HASH || url.pathname !== window.location.pathname) return;
      event.preventDefault();
      openStartFree();
    };
    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, []);
}
