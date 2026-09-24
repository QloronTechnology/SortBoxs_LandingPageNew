"use client";

import { openCookieSettings } from "@/lib/cookieConsent";

/** Reopens the cookie preferences dialog (rendered by <CookieConsent /> in the root layout). */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      Cookie Settings
    </button>
  );
}
