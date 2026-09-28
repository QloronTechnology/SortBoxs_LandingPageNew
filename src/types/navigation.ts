export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavColumn {
  heading: string;
  items: NavLink[];
}

/**
 * "panel" renders a bespoke full-width mega panel registered in
 * components/layout/Header/menus (keyed by `panel`); `columns` still feed the mobile accordion.
 * "link" is a plain tab (e.g. Pricing).
 */
export type NavItemType = "link" | "panel";

export type NavPanelKey = "platform" | "solutions" | "industries" | "ai" | "resources";

export interface NavItem {
  label: string;
  type: NavItemType;
  href?: string;
  columns?: NavColumn[];
  panel?: NavPanelKey;
  /** Path prefixes that mark this tab as the current section (menus share links, so this is explicit). */
  activePaths?: string[];
}
