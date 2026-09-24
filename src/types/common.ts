import type { ComponentType, SVGProps } from "react";

export type IconType = ComponentType<SVGProps<SVGSVGElement>>;

export interface ChecklistFeature {
  label: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  /** Photo URL; when omitted the card shows the person's initials. */
  avatar?: string;
  rating?: number;
}

export type ResourceCategory = "BLOG" | "CASE STUDY" | "GUIDE" | "WEBINAR";

export interface ResourceItem {
  category: ResourceCategory;
  title: string;
  href: string;
}

export interface CompanyLogo {
  name: string;
  logo?: string;
  recreated?: boolean;
}

export interface IntegrationItem {
  name: string;
  /** Logo artwork; except for wordmarks, the label is baked into the image. */
  logo: string;
  /** Natural pixel size of `logo`, which matches its size in the design. */
  width: number;
  height: number;
  /** A text wordmark with no label under it (e.g. Google Workspace). */
  wordmark?: boolean;
  href?: string;
}

export interface IndustryItem {
  name: string;
  icon: IconType;
  href: string;
}

export interface StatItem {
  value: string;
  label: string;
  icon?: IconType;
}
