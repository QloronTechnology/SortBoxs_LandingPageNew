import {
  BriefcaseBusiness,
  CalendarCheck,
  ChartColumnIncreasing,
  ChartLine,
  FileUp,
  FileX2,
  Headphones,
  Layers,
  Megaphone,
  MonitorPlay,
  Package,
  PiggyBank,
  ShoppingCart,
  Sparkles,
  UserPlus,
  Users,
  UsersRound,
  Wallet,
  Workflow,
  Blocks,
  type LucideIcon,
} from "lucide-react";
import { routes } from "@/config/routes";
import type { MenuTone } from "@/data/menus/types";

/** Content for the /pricing page (from "Pricing - Monthly/Yearly" designs). */

export type BillingCycle = "monthly" | "yearly";

export interface PricingPlan {
  /** Used in the checkout (`#checkout=<id>`). */
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  /** Per-user price in INR: per month (monthly) and per year (yearly). Omit for "Let's Talk" plans. */
  price?: Record<BillingCycle, number>;
  features: string[];
  /** No `href`: the button opens the checkout drawer for this plan. */
  cta: { label: string; href?: string };
  popular?: boolean;
}

export const pricingHero = {
  eyebrow: "Simple. Flexible. Powerful",
  title: "Plans that scale with",
  highlight: "your business",
  description: "Powerful business tools designed to grow with your organization.",
  points: [
    { label: "No long-term contract", icon: FileX2 },
    { label: "14-day free trial", icon: CalendarCheck },
    { label: "Upgrade anytime", icon: FileUp },
  ],
};

/** Badge on the Yearly toggle (copy from the design). */
export const yearlySavingsLabel = "Save up to 20%";

/**
 * The subscription plans (Starter, Professional, …) are created in the SortBoxs admin and loaded at runtime
 * (`lib/plansApi.ts`). Enterprise isn't a backend plan: it's this fixed card, always shown last.
 */
export const enterprisePlan: PricingPlan = {
  id: "enterprise",
  name: "Enterprise",
  description: "For large organizations with custom needs.",
  icon: Layers,
  features: [
    "Enterprise CRM",
    "Advanced HRMS",
    "Finance",
    "AI & Automation",
    "Advanced Analytics",
    "SSO",
    "Security",
    "Custom Integrations",
    "Dedicated Support",
  ],
  /** Opens the Book a Demo modal. */
  cta: { label: "Contact Sales", href: routes.demo },
};

export interface PricingModule {
  name: string;
  description: string;
  icon: LucideIcon;
  tone: MenuTone;
  href: string;
}

export const pricingModules: PricingModule[] = [
  { name: "CRM", description: "Customers & relationships", icon: Users, tone: "green", href: routes.platform.crm },
  { name: "Sales", description: "Pipeline & revenue", icon: ChartLine, tone: "purple", href: routes.platform.sales },
  { name: "Marketing", description: "Campaigns & growth", icon: Megaphone, tone: "teal", href: routes.platform.marketing },
  { name: "Customer Service", description: "Support & satisfaction", icon: Headphones, tone: "sky", href: routes.platform.service },
  { name: "HRMS", description: "People & workplace", icon: UsersRound, tone: "red", href: routes.platform.hrms },
  { name: "Recruitment", description: "Hire top talent", icon: UserPlus, tone: "indigo", href: "#" },
  { name: "Payroll", description: "Salary & compliance", icon: PiggyBank, tone: "lavender", href: "#" },
  { name: "Finance", description: "Accounting & reporting", icon: Wallet, tone: "green", href: routes.platform.finance },
  { name: "Projects", description: "Plan, track & deliver", icon: BriefcaseBusiness, tone: "indigo", href: routes.platform.projects },
  { name: "Inventory", description: "Stock & warehouse", icon: Package, tone: "pink", href: routes.platform.inventory },
  { name: "Procurement", description: "Vendors & purchases", icon: ShoppingCart, tone: "blue", href: routes.platform.procurement },
  { name: "Analytics", description: "Insights & reporting", icon: ChartColumnIncreasing, tone: "orange", href: routes.platform.analytics },
  { name: "AI Assistant", description: "Your intelligent helper", icon: Sparkles, tone: "teal", href: routes.platform.ai },
  { name: "AI Interview", description: "Smarter hiring", icon: MonitorPlay, tone: "pink", href: routes.platform.aiInterview },
  { name: "Automation", description: "Workflows & productivity", icon: Workflow, tone: "green", href: routes.platform.automation },
  { name: "Integrations", description: "Connect your tools", icon: Blocks, tone: "amber", href: routes.integrations },
];

export const buildPlanBanner = {
  eyebrow: "Flexible. Scalable. Yours.",
  title: "Build your own Sortboxs plan",
  description: "Choose only the modules you need.",
  /** Opens the checkout drawer for a custom plan (CheckoutTrigger). */
  primary: { label: "Customize Your Plan" },
  /** Opens the Book a Demo modal. */
  secondary: { label: "Talk to Our Experts", href: routes.demo },
};

/**
 * Animated plan builder in the banner: for each business type it picks the recommended modules and
 * builds an estimate. Module names must exist in `pricingModules`; prices are illustrative (INR/month).
 */
export const planBuilder = {
  users: 25,
  modules: ["CRM", "Sales", "HRMS", "Finance", "Projects", "Inventory", "Procurement", "Analytics", "Automation"],
  modulePrice: {
    CRM: 1499,
    Sales: 1299,
    HRMS: 1199,
    Finance: 1399,
    Projects: 999,
    Inventory: 1199,
    Procurement: 999,
    Analytics: 899,
    Automation: 1099,
  } as Record<string, number>,
  industries: [
    { name: "Retail", picks: ["CRM", "Sales", "Inventory", "Finance", "Analytics"] },
    { name: "Services", picks: ["CRM", "Projects", "HRMS", "Finance", "Automation"] },
    { name: "Manufacturing", picks: ["Inventory", "Procurement", "Finance", "HRMS", "Analytics"] },
  ],
};
