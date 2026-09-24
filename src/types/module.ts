export interface ModuleSummary {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  iconBg: string;
  href: string;
}

export interface ModulePageData {
  slug: string;
  name: string;
  badge: string;
  icon: string;
  heading: string;
  description: string;
  features: string[];
  cta: string;
  dashboardImage?: string;
}
