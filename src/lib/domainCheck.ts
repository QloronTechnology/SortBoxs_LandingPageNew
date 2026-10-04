import { checkWorkspaceDomain } from "@/lib/api/subscriptionApi";

export type DomainStatus = "idle" | "checking" | "available" | "unavailable" | "invalid" | "error";

/** Lowercase letters, digits and hyphens; can't start/end with a hyphen; 3–63 characters. */
const domainPattern = /^[a-z0-9](?:[a-z0-9-]{1,61}[a-z0-9])?$/;

/** Can't be used as a workspace domain (reserved for the app itself / common squatting targets). */
export const reservedDomains = [
  "www",
  "app",
  "api",
  "admin",
  "mail",
  "sortboxs",
  "help",
  "support",
  "status",
  "docs",
  "blog",
  "login",
  "signup",
  "test",
];

export const sanitizeDomainInput = (value: string) => value.toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 63);

export const isValidDomainFormat = (domain: string) => domainPattern.test(domain);

/**
 * Format and reserved-word checks run locally; otherwise the backend decides (GET checkWorkSpaceDomain).
 * "error" means the check itself failed (offline, server error), not that the domain is taken.
 */
export async function checkDomainAvailability(domain: string): Promise<"available" | "unavailable" | "invalid" | "error"> {
  if (domain.length < 3 || !isValidDomainFormat(domain)) return "invalid";
  if (reservedDomains.includes(domain)) return "unavailable";
  try {
    const { available } = await checkWorkspaceDomain(domain);
    return available ? "available" : "unavailable";
  } catch (error) {
    console.error("[domainCheck]", error);
    return "error";
  }
}
