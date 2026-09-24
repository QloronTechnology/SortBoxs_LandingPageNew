import { routes } from "@/config/routes";
import type { ResourceItem } from "@/types/common";

export const resources: ResourceItem[] = [
  {
    category: "BLOG",
    title: "How AI is transforming Business Operations in 2026",
    href: routes.resources.blog,
  },
  {
    // PLACEHOLDER: the customer and the 40% figure are sample copy. Replace with a real,
    // approved customer story (and its actual results) before this site goes live.
    category: "CASE STUDY",
    title: "How Wave Solutions cut lead response time by 40% with Sortboxs CRM",
    href: routes.resources.caseStudies,
  },
];
