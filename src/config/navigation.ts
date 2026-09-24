import { routes } from "@/config/routes";
import type { NavItem } from "@/types/navigation";
import { platformMobileSections } from "@/data/menus/platformMenu";
import { solutionsMobileSections } from "@/data/menus/solutionsMenu";
import { industriesMobileSections } from "@/data/menus/industriesMenu";
import { aiMobileSections } from "@/data/menus/aiMenu";
import { resourcesMobileSections } from "@/data/menus/resourcesMenu";

export const navigation: NavItem[] = [
  {
    label: "Platform",
    type: "panel",
    panel: "platform",
    // Desktop renders the full Platform mega panel; these sections drive the mobile accordion.
    columns: platformMobileSections,
  },
  {
    label: "Solutions",
    type: "panel",
    panel: "solutions",
    columns: solutionsMobileSections,
  },
  {
    label: "Industries",
    type: "panel",
    panel: "industries",
    columns: industriesMobileSections,
  },
  {
    label: "AI",
    type: "panel",
    panel: "ai",
    columns: aiMobileSections,
  },
  {
    label: "Resources",
    type: "panel",
    panel: "resources",
    columns: resourcesMobileSections,
  },
  {
    label: "Pricing",
    type: "link",
    href: routes.pricing,
  },
];
