/**
 * Cookie consent store (client only). The choice is kept in localStorage and mirrored to a
 * `cookie_consent` cookie so server code can read it later. Bump CONSENT_VERSION when the
 * cookie categories change to ask everyone again.
 */

export const CONSENT_VERSION = 1;
const STORAGE_KEY = "sortboxs-cookie-consent";
const COOKIE_NAME = "cookie_consent";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 180; // 180 days

export interface ConsentChoice {
  version: number;
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
}

/** Fired on window whenever consent changes; analytics/marketing scripts can listen for it. */
export const CONSENT_EVENT = "cookie-consent-change";
/** Fired to reopen the preferences panel (e.g. from the footer "Cookie Settings" link). */
export const OPEN_SETTINGS_EVENT = "cookie-consent-open";

const listeners = new Set<() => void>();
let cachedRaw: string | null | undefined;
let cachedChoice: ConsentChoice | null = null;

function readRaw(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null; // storage blocked (private mode etc.) → treat as no choice yet
  }
}

/** Snapshot for useSyncExternalStore; returns a stable object until the stored value changes. */
export function getConsent(): ConsentChoice | null {
  const raw = readRaw();
  if (raw === cachedRaw) return cachedChoice;
  cachedRaw = raw;
  try {
    const parsed = raw ? (JSON.parse(raw) as ConsentChoice) : null;
    cachedChoice = parsed && parsed.version === CONSENT_VERSION ? parsed : null;
  } catch {
    cachedChoice = null;
  }
  return cachedChoice;
}

export function saveConsent(choice: { analytics: boolean; marketing: boolean }) {
  const value: ConsentChoice = {
    version: CONSENT_VERSION,
    necessary: true,
    analytics: choice.analytics,
    marketing: choice.marketing,
    updatedAt: new Date().toISOString(),
  };
  const serialized = JSON.stringify(value);
  try {
    window.localStorage.setItem(STORAGE_KEY, serialized);
  } catch {
    // Storage unavailable: the cookie below still records the choice for this browser.
  }
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(serialized)}; Max-Age=${MAX_AGE_SECONDS}; Path=/; SameSite=Lax`;
  listeners.forEach((listener) => listener());
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

export function subscribeConsent(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}
