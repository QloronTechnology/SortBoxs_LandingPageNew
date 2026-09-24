import {
  Book,
  BookOpen,
  Briefcase,
  CalendarDays,
  CodeXml,
  GraduationCap,
  LayoutPanelTop,
  PhoneCall,
  Presentation,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { routes } from "@/config/routes";
import { placeholderLinks, type MenuLink, type MenuTone } from "./types";

/**
 * Content for the "Resources" mega menu (desktop panel + mobile accordion).
 * Only /resources and the company contact/partners pages exist today; every other link is a "#"
 * placeholder until its page is built.
 */

export interface ResourceIntroLink extends MenuLink {
  description: string;
  icon: LucideIcon;
}

export interface ResourceColumn {
  heading: string;
  description: string;
  icon: LucideIcon;
  tone: MenuTone;
  links: MenuLink[];
}

export const resourcesMenu = {
  intro: {
    eyebrow: "Resources",
    title: "Learn. Build. Grow.",
    description: "Explore insights, guides, tools and expert content to get the most out of Sortboxs.",
    // The design's button reads "Explore AI Features" (copied from the AI menu); this is the Resources hub.
    cta: { label: "Explore All Resources", href: routes.resources.all },
    links: [
      { label: "Blog", description: "Latest articles & insights", href: "#", icon: LayoutPanelTop },
      { label: "Guides", description: "Step-by-step tutorials", href: "#", icon: Book },
      { label: "Case Studies", description: "Real customer success", href: "#", icon: Briefcase },
      { label: "Webinars", description: "Live & on-demand", href: "#", icon: Presentation },
      { label: "Help Center", description: "Get support & FAQs", href: "#", icon: PhoneCall },
      { label: "API Documentation", description: "Developer resources", href: "#", icon: CodeXml },
    ] satisfies ResourceIntroLink[],
  },

  columns: [
    {
      heading: "Learn",
      description: "Build your knowledge with expert content.",
      icon: BookOpen,
      tone: "lavender",
      links: placeholderLinks(["Blog", "Product Updates", "Industry Insights", "Best Practices", "Tips & Tricks", "Sortboxs Academy", "Glossary"]),
    },
    {
      heading: "Guides & Tutorials",
      description: "Step-by-step guides to help you get started and scale.",
      icon: GraduationCap,
      tone: "green",
      links: placeholderLinks(["Getting Started", "Module Guides", "Admin Guides", "Integration Guides", "Video Tutorials", "Migration Guides", "Use Case Guides"]),
    },
    {
      heading: "Customer Stories",
      description: "See how businesses like yours achieve more with Sortboxs.",
      icon: UsersRound,
      tone: "orange",
      links: placeholderLinks(["Case Studies", "Customer Testimonials", "Success Stories by Industry", "ROI & Business Impact", "Customer Videos", "Customer Interviews"]),
    },
    {
      heading: "Events",
      description: "Join our live and on-demand sessions.",
      icon: CalendarDays,
      tone: "sky",
      links: placeholderLinks(["Upcoming Webinars", "On-demand Webinars", "Product Demo", "Industry Events", "Workshops", "Sortboxs Live", "Event Recordings"]),
    },
  ] satisfies ResourceColumn[],

  featured: {
    eyebrow: "Featured Resource",
    title: "The Ultimate Guide to Business Automation",
    description: "Learn how to automate your business processes and drive growth with SortBox.",
    cta: { label: "Download Free Guide", href: "#" },
    image: {
      src: "/images/resources-guide.png",
      alt: "The Ultimate Guide to Business Automation ebook: practical insights, real examples, step-by-step guide and expert recommendations",
      width: 644,
      height: 636,
    },
  },

  newsletter: {
    title: "Stay Updated",
    description: "Get the latest product updates, insights and resources straight to your inbox.",
  },

  quickLinks: [
    { label: "Request a Demo", href: "#" },
    { label: "Community Forum", href: "#" },
    { label: "Contact Support", href: routes.company.contact },
    { label: "Partner Resources", href: routes.company.partners },
  ] satisfies MenuLink[],
};

/** Flattened sections for the mobile accordion. */
export const resourcesMobileSections = [
  { heading: "Resources", items: resourcesMenu.intro.links.map(({ label, href }) => ({ label, href })) },
  ...resourcesMenu.columns.map((column) => ({ heading: column.heading, items: column.links })),
  { heading: "Quick Links", items: resourcesMenu.quickLinks },
];
