import {
  BadgePercent,
  Building2,
  ChartNoAxesCombined,
  FolderOpen,
  Headphones,
  HeartHandshake,
  IndianRupee,
  Landmark,
  Megaphone,
  ShoppingCart,
  Store,
  Users,
} from "lucide-react";
import { routes } from "@/config/routes";
import { placeholderLinks as placeholder, type MenuCategory, type MenuIconLink, type MenuLink } from "./types";

/**
 * Content for the "Solutions" mega menu (desktop panel + mobile accordion).
 * Category headers link to the matching module page where one exists; every other link is a
 * "#" placeholder until its page is built.
 */

export type SolutionCategory = MenuCategory;

export const solutionsMenu = {
  intro: {
    eyebrow: "Solutions",
    title: "Solutions for Every Team",
    description: "Purpose-built solutions to help every team work smarter, faster and grow together.",
    cta: { label: "Explore the Solutions", href: routes.solutions.all },
    links: [
      { label: "Small Business", href: "#", icon: Store },
      { label: "Enterprise", href: "#", icon: Building2 },
      { label: "Government", href: "#", icon: Landmark },
      { label: "Non-Profit", href: "#", icon: HeartHandshake },
    ] satisfies MenuIconLink[],
  },

  /** Rendered as 4 columns × 2 rows: items 0–3 are the top row, 4–7 the bottom row. */
  categories: [
    {
      title: "Sales",
      description: "Close more deals and grow revenue.",
      href: routes.platform.sales,
      icon: BadgePercent,
      tone: "orange",
      links: placeholder(["Sales Automation", "Pipeline Management", "Quotes & Orders", "Sales Analytics", "Territory Management"]),
    },
    {
      title: "Customer Service",
      description: "Deliver exceptional support experiences.",
      href: routes.platform.service,
      icon: Headphones,
      tone: "sky",
      links: placeholder(["Ticket Management", "Knowledge Base", "SLA Management", "Omnichannel Support", "Customer Insights"]),
    },
    {
      title: "HR & People",
      description: "Manage your people from hire to retire.",
      href: routes.platform.hrms,
      icon: Users,
      tone: "teal",
      links: placeholder(["Recruitment", "Onboarding", "Attendance & Leave", "Payroll & Compliance", "Performance Management"]),
    },
    {
      title: "Finance",
      description: "Track expenses, invoices and financial health.",
      href: routes.platform.finance,
      icon: IndianRupee,
      tone: "pink",
      links: placeholder(["Invoicing", "Payments", "Expenses", "Financial Reporting", "Budget & Forecasting"]),
    },
    {
      title: "Marketing",
      description: "Attract, engage and grow your brand.",
      href: routes.platform.marketing,
      icon: Megaphone,
      tone: "green",
      links: placeholder(["Campaign Management", "Lead Generation", "Email Marketing", "Customer Journey", "Marketing Analytics"]),
    },
    {
      title: "Projects",
      description: "Plan, execute and deliver on time.",
      href: routes.platform.projects,
      icon: FolderOpen,
      tone: "purple",
      links: placeholder(["Project Planning", "Task Management", "Resource Management", "Timesheets", "Project Analytics"]),
    },
    {
      title: "Procurement",
      description: "Manage vendors, purchase orders and approvals.",
      href: routes.platform.procurement,
      icon: ShoppingCart,
      tone: "red",
      links: placeholder(["Vendor Management", "Purchase Orders", "Approval Workflows", "Contract Management", "Procurement Analytics"]),
    },
    {
      title: "Inventory",
      description: "Track products, warehouses and stock.",
      href: routes.platform.inventory,
      icon: ChartNoAxesCombined,
      tone: "indigo",
      links: placeholder(["Product Management", "Warehouse Management", "Stock & Transfers", "Purchase & Sales", "Inventory Analytics"]),
    },
  ] satisfies SolutionCategory[],

  featured: {
    eyebrow: "Featured Solution",
    title: "AI-Powered Business Solutions",
    description: "Intelligent solutions to automate, optimize and drive growth across your business.",
    cta: { label: "Explore AI Solutions", href: routes.platform.ai },
    image: { src: "/images/ai-solutions.png", alt: "SortBoxs AI assistant showing revenue insights", width: 636, height: 428 },
    quickLinks: [
      { label: "View All Solutions", href: routes.solutions.all },
      { label: "Request a Demo", href: "#" },
      { label: "Explore Use Cases", href: "/use-cases" },
      { label: "Customer Success Stories", href: "#" },
    ] satisfies MenuLink[],
  },
};

/** Flattened sections for the mobile accordion: each category expands to its links. */
export const solutionsMobileSections = [
  {
    heading: "Solutions by size",
    items: solutionsMenu.intro.links.map(({ label, href }) => ({ label, href })),
  },
  ...solutionsMenu.categories.map((category) => ({
    heading: category.title,
    items: [{ label: `${category.title} overview`, href: category.href }, ...category.links],
  })),
  { heading: "Quick Links", items: solutionsMenu.featured.quickLinks },
];
