import type { LucideIcon } from "lucide-react";

/** One card in the explorer's selected tab (a deal, ticket, request...). */
export interface ExplorerItem {
  title: string;
  /** Owner / customer, shown under the title. */
  meta: string;
  /** Right-aligned figure: amount, SLA, percentage. */
  value: string;
  note: string;
}

export interface ExplorerTab {
  key: string;
  label: string;
  summary: string;
  /** Shown on the tab and as the panel's headline figure. */
  total: string;
  /** Tailwind bg class for the tab's dot. */
  tone: string;
  items: ExplorerItem[];
}

interface Eyebrowed {
  eyebrow: string;
  title: string;
  intro: string;
}

export interface FeatureCard {
  icon: LucideIcon;
  title: string;
  body: string;
}

/** Everything the shared module landing page (components/module-landing/) renders for one module. */
export interface ModuleLandingData {
  /** Slug in data/modules.ts supplies the icon and its colour; pages that aren't a core module set `icon` instead. */
  slug: string;
  name: string;
  /** For pages with no entry in data/modules.ts (the AI capability pages): a Lucide icon and its tile colours. */
  icon?: LucideIcon;
  iconTone?: string;
  hero: { eyebrow: string; title: string; highlight: string; description: string; points: string[] };
  lifecycle: Eyebrowed & { steps: FeatureCard[] };
  explorer: Eyebrowed & {
    /** Accessible name for the tab list. */
    label: string;
    /** Caption above the panel's headline figure, e.g. "Stage value". */
    metricLabel: string;
    /** Plural noun for the cards, e.g. "deals". */
    itemLabel: string;
    tabs: ExplorerTab[];
  };
  capabilities: Eyebrowed & { items: FeatureCard[] };
  ai: {
    eyebrow: string;
    title: string;
    description: string;
    points: string[];
    cards: (FeatureCard & { tone: string })[];
  };
  connected: Eyebrowed & {
    /** Module slugs (data/modules.ts), in display order. */
    slugs: string[];
    /** One line per slug: what the hand-off to that module looks like. */
    links: Record<string, string>;
  };
}
