import { routes } from "@/config/routes";
import type { NavItem } from "@/types/navigation";
import { platformMobileSections } from "@/data/menus/platformMenu";
import { solutionsMobileSections } from "@/data/menus/solutionsMenu";
import { industriesMobileSections } from "@/data/menus/industriesMenu";
import { aiMobileSections } from "@/data/menus/aiMenu";

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
    type: "dropdown",
    columns: [
      {
        heading: "Learn",
        items: [
          { label: "Blog", href: routes.resources.blog },
          { label: "Guides", href: routes.resources.guides },
          { label: "Webinars", href: routes.resources.webinars },
          { label: "Case Studies", href: routes.resources.caseStudies },
          { label: "Help Center", href: routes.resources.helpCenter },
          { label: "API Documentation", href: routes.resources.apiDocumentation },
        ],
      },
    ],
  },
  {
    label: "Pricing",
    type: "link",
    href: routes.pricing,
  },
];
