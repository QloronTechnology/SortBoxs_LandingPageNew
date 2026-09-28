import { routes } from "@/config/routes";
import type { NavItem } from "@/types/navigation";
import { platformMobileSections } from "@/data/menus/platformMenu";
import { solutionsMobileSections } from "@/data/menus/solutionsMenu";
import { industriesMobileSections } from "@/data/menus/industriesMenu";
import { aiMobileSections } from "@/data/menus/aiMenu";
import { resourcesMobileSections } from "@/data/menus/resourcesMenu";

const aiPaths: string[] = [routes.platform.ai, routes.platform.aiInterview];

export const navigation: NavItem[] = [
  {
    label: "Platform",
    type: "panel",
    panel: "platform",
    // Desktop renders the full Platform mega panel; these sections drive the mobile accordion.
    columns: platformMobileSections,
    activePaths: [
      ...Object.values(routes.platform).filter((path) => !aiPaths.includes(path)),
      "/features",
      routes.integrations,
      "/security",
    ],
  },
  {
    label: "Solutions",
    type: "panel",
    panel: "solutions",
    columns: solutionsMobileSections,
    activePaths: [routes.solutions.all, "/use-cases"],
  },
  {
    label: "Industries",
    type: "panel",
    panel: "industries",
    columns: industriesMobileSections,
    activePaths: [routes.industries.all],
  },
  {
    label: "AI",
    type: "panel",
    panel: "ai",
    columns: aiMobileSections,
    activePaths: aiPaths,
  },
  {
    label: "Resources",
    type: "panel",
    panel: "resources",
    columns: resourcesMobileSections,
    activePaths: [routes.resources.all],
  },
  {
    label: "Pricing",
    type: "link",
    href: routes.pricing,
  },
];

/** True when `pathname` is one of the item's paths (its href for plain links) or nested below it. */
export function isNavItemActive(item: NavItem, pathname: string): boolean {
  const paths = item.activePaths ?? (item.href ? [item.href] : []);
  return paths.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}
