"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";
import {
  getConsent,
  OPEN_SETTINGS_EVENT,
  saveConsent,
  subscribeConsent,
  type ConsentChoice,
} from "@/lib/cookieConsent";

/** Server snapshot marker: consent is unknown until the browser has hydrated. */
const PENDING = "pending" as const;
const getServerSnapshot = () => PENDING;

const categories = [
  {
    key: "necessary",
    title: "Strictly necessary",
    description: "Required for the site to work, such as security and remembering this choice.",
    locked: true,
  },
  {
    key: "analytics",
    title: "Analytics",
    description: "Help us understand how visitors use the site so we can improve it.",
    locked: false,
  },
  {
    key: "marketing",
    title: "Marketing",
    description: "Used to show relevant ads and measure how our campaigns perform.",
    locked: false,
  },
] as const;

/**
 * First-visit cookie banner plus a preferences dialog. Nothing renders during SSR; after
 * hydration the banner appears only when no (current-version) choice has been stored.
 */
export function CookieConsent() {
  const consent = useSyncExternalStore<ConsentChoice | null | typeof PENDING>(
    subscribeConsent,
    getConsent,
    getServerSnapshot
  );
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [draft, setDraft] = useState({ analytics: false, marketing: false });

  // Allow other parts of the site (footer "Cookie Settings") to reopen the dialog.
  useEffect(() => {
    window.addEventListener(OPEN_SETTINGS_EVENT, openCookieSettingsDialog);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, openCookieSettingsDialog);
  });

  function openCookieSettingsDialog() {
    const current = getConsent();
    setDraft({ analytics: current?.analytics ?? false, marketing: current?.marketing ?? false });
    setSettingsOpen(true);
  }

  useEffect(() => {
    if (!settingsOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSettingsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [settingsOpen]);

  function decide(choice: { analytics: boolean; marketing: boolean }) {
    saveConsent(choice);
    setSettingsOpen(false);
  }

  if (consent === PENDING) return null;
  const showBanner = consent === null && !settingsOpen;

  return (
    <>
      {showBanner && (
        // Full-width bar pinned to the bottom, styled like the dark site footer.
        <div
          role="region"
          aria-label="Cookie consent"
          className="cookie-banner-in fixed inset-x-0 bottom-0 z-[90] border-t border-white/10 bg-[#04053d] text-white shadow-[0_-12px_40px_rgba(4,5,61,0.35)]"
        >
          <div className="container-page flex flex-col gap-4 py-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <div className="flex items-start gap-3 lg:items-center">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                <Cookie className="size-5" aria-hidden />
              </span>
              <div>
                <p className="font-semibold">We value your privacy</p>
                <p className="mt-0.5 text-sm leading-relaxed text-white/70">
                  We use cookies to keep the site working, understand how it&apos;s used and personalise
                  marketing. Read our{" "}
                  <Link href={routes.legal.cookies} className="font-medium text-white underline underline-offset-2 hover:text-white/80">
                    Cookie Policy
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="grid shrink-0 grid-cols-2 gap-2 sm:flex sm:flex-nowrap">
              <Button
                size="sm"
                variant="ghost"
                onClick={openCookieSettingsDialog}
                className="justify-center text-white hover:bg-white/10"
              >
                Customise
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => decide({ analytics: false, marketing: false })}
                className="justify-center border-white/40 text-white hover:bg-white/10"
              >
                Reject non-essential
              </Button>
              {/* Phones: full-width primary action on top; from sm it sits last in the row. */}
              <Button
                size="sm"
                onClick={() => decide({ analytics: true, marketing: true })}
                className="order-first col-span-2 justify-center sm:order-none"
              >
                Accept all
              </Button>
            </div>
          </div>
        </div>
      )}

      {settingsOpen && (
        <div className="fixed inset-0 z-[95] flex items-end justify-center p-4 sm:items-center">
          <div
            className="absolute inset-0 bg-brand-navy/50 backdrop-blur-sm"
            onClick={() => setSettingsOpen(false)}
            aria-hidden
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-settings-title"
            className="cookie-banner-in relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="cookie-settings-title" className="text-lg font-bold text-brand-text">
                  Cookie preferences
                </h2>
                <p className="mt-1 text-sm text-brand-muted">
                  Choose which cookies we can use. You can change this any time from the footer.
                </p>
              </div>
              <button
                type="button"
                aria-label="Close cookie preferences"
                onClick={() => setSettingsOpen(false)}
                className="flex size-9 shrink-0 items-center justify-center rounded-lg text-brand-muted hover:bg-brand-surface"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>

            <ul className="mt-5 flex flex-col divide-y divide-brand-border rounded-xl border border-brand-border">
              {categories.map((category) => {
                const checked = category.locked ? true : draft[category.key];
                return (
                  <li key={category.key} className="flex items-start justify-between gap-4 p-4">
                    <div>
                      <p className="text-sm font-semibold text-brand-text">{category.title}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-brand-muted">{category.description}</p>
                    </div>
                    {category.locked ? (
                      <span className="shrink-0 rounded-full bg-brand-purple-light px-2.5 py-1 text-xs font-semibold text-brand-purple">
                        Always on
                      </span>
                    ) : (
                      <button
                        type="button"
                        role="switch"
                        aria-checked={checked}
                        aria-label={category.title}
                        onClick={() =>
                          setDraft((current) => ({ ...current, [category.key]: !current[category.key] }))
                        }
                        className={cn(
                          "relative mt-0.5 inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors",
                          checked ? "bg-brand-purple" : "bg-slate-300"
                        )}
                      >
                        <span
                          className={cn(
                            "inline-block size-5 rounded-full bg-white shadow transition-transform",
                            checked ? "translate-x-[22px]" : "translate-x-0.5"
                          )}
                        />
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button variant="outline" size="sm" onClick={() => decide(draft)}>
                Save preferences
              </Button>
              {/* Phones: full-width primary action on top; from sm it sits last in the row. */}
              <Button
                size="sm"
                onClick={() => decide({ analytics: true, marketing: true })}
                className="order-first col-span-2 justify-center sm:order-none"
              >
                Accept all
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
