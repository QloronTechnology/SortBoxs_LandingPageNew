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
 */
export type NavItemType = "mega-menu" | "dropdown" | "link" | "panel";

export type NavPanelKey = "platform" | "solutions" | "industries" | "ai" | "resources";

export interface NavItem {
  label: string;
  type: NavItemType;
  href?: string;
  columns?: NavColumn[];
  panel?: NavPanelKey;
}
