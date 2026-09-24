import type { LucideIcon } from "lucide-react";

/** Shared shapes for header mega-menu data files (platformMenu, solutionsMenu, …). */

export type MenuTone =
  | "green"
  | "orange"
  | "teal"
  | "pink"
  | "purple"
  | "blue"
  | "sky"
  | "red"
  | "amber"
  | "indigo"
  | "lavender";

export interface MenuLink {
  label: string;
  href: string;
}

export interface MenuIconLink extends MenuLink {
  icon: LucideIcon;
}

/** A row in a mega menu feature column: tinted icon, title, description, arrow. */
export interface MenuFeature extends MenuIconLink {
  description: string;
  tone: MenuTone;
}

export interface MenuFeatureColumn {
  heading: string;
  action?: MenuLink;
  items: MenuFeature[];
}

/** A category card in a mega menu grid (Solutions, Industries): header + list of links. */
export interface MenuCategory {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  tone: MenuTone;
  links: MenuLink[];
}

/** Builds "#" placeholder links from labels. */
export const placeholderLinks = (labels: string[]): MenuLink[] =>
  labels.map((label) => ({ label, href: "#" }));
