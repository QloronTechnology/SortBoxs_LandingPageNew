import {
  Building2,
  ChartColumnBig,
  GraduationCap,
  HeartHandshake,
  House,
  IndianRupee,
  Laptop,
  ShoppingBasket,
  Stethoscope,
  UsersRound,
} from "lucide-react";
import { routes } from "@/config/routes";
import { placeholderLinks, type MenuCategory, type MenuIconLink, type MenuLink } from "./types";

/**
 * Content for the "Industries" mega menu (desktop panel + mobile accordion).
 * Only "all industries" / use-case links point at existing pages; everything else is a "#"
 * placeholder until the individual industry pages are built.
 */

export interface SpotlightStat {
  value: string;
  label: string;
  change: string;
}

export const industriesMenu = {
  intro: {
    eyebrow: "Industries",
    title: "Built for Your Industry",
    description: "Purpose-built workflows, modules and AI capabilities for the way your industry operates.",
    cta: { label: "Explore All Industries", href: routes.industries.all },
    popularHeading: "Popular Industries",
    links: [
      { label: "Technology & IT", href: "#", icon: Laptop },
      { label: "Healthcare", href: "#", icon: Stethoscope },
      { label: "Education", href: "#", icon: GraduationCap },
      { label: "Manufacturing", href: "#", icon: ChartColumnBig },
      { label: "Retail & eCommerce", href: "#", icon: ShoppingBasket },
      { label: "Real Estate", href: "#", icon: Building2 },
      { label: "Financial Services", href: "#", icon: IndianRupee },
      { label: "Professional Services", href: "#", icon: UsersRound },
      { label: "Non-Profit", href: "#", icon: HeartHandshake },
      { label: "Agencies", href: "#", icon: House },
    ] satisfies MenuIconLink[],
  },

  /** First 8 render as 4 columns × 2 rows; any beyond that form a row of wide cards. */
  categories: [
    {
      title: "Technology & IT",
      description: "For IT services, SaaS and product companies.",
      href: "#",
      icon: Laptop,
      tone: "orange",
      links: placeholderLinks(["Software & SaaS", "IT Services", "Technology Consulting", "Product Companies", "IT Operations", "Resource Management"]),
    },
    {
      title: "Healthcare",
      description: "For hospitals, clinics and healthcare organizations.",
      href: "#",
      icon: Stethoscope,
      tone: "sky",
      links: placeholderLinks(["Hospitals & Clinics", "Healthcare Providers", "Medical Organizations", "Patient Operations", "Staff Management", "Appointments & Scheduling"]),
    },
    {
      title: "Education",
      description: "For schools, colleges, EdTech and training institutes.",
      href: "#",
      icon: GraduationCap,
      tone: "purple",
      links: placeholderLinks(["Schools", "Colleges & Universities", "EdTech", "Training Institutes", "Student Management", "Faculty & HR"]),
    },
    {
      title: "Manufacturing",
      description: "For production, supply chain and industrial businesses.",
      href: "#",
      icon: ChartColumnBig,
      tone: "pink",
      links: placeholderLinks(["Production Management", "Supply Chain", "Inventory", "Procurement", "Vendor Management", "Workforce Management"]),
    },
    {
      title: "Retail & Ecommerce",
      description: "For retail chains, online stores and consumer brands.",
      href: "#",
      icon: ShoppingBasket,
      tone: "teal",
      links: placeholderLinks(["Retail Operations", "Ecommerce", "Product Management", "Orders & Sales", "Inventory", "Customer Management"]),
    },
    {
      title: "Real Estate",
      description: "For property management and real estate businesses.",
      href: "#",
      icon: Building2,
      tone: "lavender",
      links: placeholderLinks(["Property Management", "Real Estate Sales", "Lead Management", "Broker Management", "Projects", "Customer Service"]),
    },
    {
      title: "Financial Services",
      description: "For banks, NBFCs, fintech and financial institutions.",
      href: "#",
      icon: IndianRupee,
      tone: "red",
      links: placeholderLinks(["Financial Operations", "Customer Management", "Sales & CRM", "Compliance", "Analytics", "Employee Management"]),
    },
    {
      title: "Professional Services",
      description: "For consulting firms, agencies and service businesses.",
      href: "#",
      icon: UsersRound,
      tone: "indigo",
      links: placeholderLinks(["Consulting", "Agencies", "Legal Services", "Accounting", "Staffing", "Project Management"]),
    },
    // Third row (rendered as two wide cards).
    {
      title: "Non-Profit",
      description: "For NGOs, charities, foundations and social enterprises.",
      href: "#",
      icon: HeartHandshake,
      tone: "green",
      links: placeholderLinks(["Donor Management", "Fundraising", "Volunteer Management", "Grants & Funding", "Programs & Events", "Impact Reporting"]),
    },
    {
      title: "Agencies",
      description: "For creative, digital and marketing agencies.",
      href: "#",
      icon: House,
      tone: "amber",
      links: placeholderLinks(["Client Management", "Project Delivery", "Resource Planning", "Time & Billing", "Proposals & Contracts", "Agency Analytics"]),
    },
  ] satisfies MenuCategory[],

  spotlight: {
    eyebrow: "Industry Spotlight",
    title: "Technology & SaaS",
    description:
      "Run your technology business from one connected platform — from sales and projects to people, finance and AI.",
    cta: { label: "Explore Technology Solutions", href: "#" },
    image: { src: "/images/industry-tech.png", alt: "Glass office tower of a technology company", width: 312, height: 444 },
    badge: "Scale Smarter with SortBox",
    stats: [
      { value: "₹18.4L", label: "Revenue", change: "+32%" },
      { value: "124", label: "Leads", change: "+18%" },
      { value: "36", label: "Projects", change: "+25%" },
      { value: "50", label: "Employees", change: "+12%" },
    ] satisfies SpotlightStat[],
    quickLinks: [
      { label: "View All Industries", href: routes.industries.all },
      { label: "Compare Industries", href: "#" },
      { label: "Industry Use Cases", href: "/use-cases" },
      { label: "Customer Stories", href: "#" },
      { label: "Request a Demo", href: "#" },
    ] satisfies MenuLink[],
  },
};

/** Flattened sections for the mobile accordion: each industry expands to its links. */
export const industriesMobileSections = [
  {
    heading: industriesMenu.intro.popularHeading,
    items: industriesMenu.intro.links.map(({ label, href }) => ({ label, href })),
  },
  ...industriesMenu.categories.map((category) => ({ heading: category.title, items: category.links })),
  { heading: "Quick Links", items: industriesMenu.spotlight.quickLinks },
];
