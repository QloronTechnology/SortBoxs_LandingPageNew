import {
  BriefcaseBusiness,
  Building2,
  CalendarCheck,
  ChartColumnIncreasing,
  ChartLine,
  Crown,
  FileUp,
  FileX2,
  Headphones,
  Layers,
  Megaphone,
  MonitorPlay,
  Package,
  PiggyBank,
  Send,
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
  name: string;
  description: string;
  icon: LucideIcon;
  /** Per-user price by billing cycle, pre-formatted in INR. Omit for "Let's Talk" plans. */
  price?: Record<BillingCycle, string>;
  features: string[];
  cta: { label: string; href: string };
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

export const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    description: "For small teams getting started.",
    icon: Send,
    price: { monthly: "₹4,999", yearly: "₹54,999" },
    features: ["CRM", "Contacts", "Leads", "Tasks", "Basic Reports"],
    cta: { label: "Start Free Trial", href: routes.signup },
  },
  {
    name: "Professional",
    description: "For growing businesses.",
    icon: Crown,
    price: { monthly: "₹7,999", yearly: "₹89,999" },
    features: ["CRM", "Sales", "Marketing", "Customer Support", "Automation", "Reports", "Dashboards"],
    cta: { label: "Get Started", href: routes.signup },
    popular: true,
  },
  {
    name: "Business",
    description: "For established organizations.",
    icon: Building2,
    price: { monthly: "₹14,999", yearly: "₹1,75,999" },
    features: [
      "CRM",
      "Sales",
      "Marketing",
      "HRMS",
      "Recruitment",
      "Payroll",
      "Finance",
      "Projects",
      "Inventory",
      "AI Features",
    ],
    cta: { label: "Get Started", href: routes.signup },
  },
  {
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
    cta: { label: "Contact Sales", href: routes.company.contact },
  },
];

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

/** Compare Plans table — [Starter, Professional, Business, Enterprise], exactly as in the design. */
export const planComparison: { feature: string; included: [boolean, boolean, boolean, boolean] }[] = [
  { feature: "CRM", included: [true, true, true, true] },
  { feature: "Sales", included: [true, true, true, true] },
  { feature: "Marketing", included: [true, true, true, true] },
  { feature: "Customer Support", included: [true, true, true, true] },
  { feature: "HRMS", included: [false, false, true, true] },
  { feature: "Recruitment", included: [false, false, true, true] },
  { feature: "Payroll", included: [false, false, true, true] },
  { feature: "Finance", included: [false, false, true, true] },
  { feature: "Projects", included: [false, false, true, true] },
  { feature: "Inventory", included: [false, false, true, true] },
  { feature: "AI Assistant", included: [false, false, true, true] },
  { feature: "AI Interview", included: [false, false, true, true] },
  { feature: "Automation", included: [false, true, true, true] },
  { feature: "Analytics", included: [false, true, true, true] },
  { feature: "API", included: [false, true, true, true] },
  { feature: "SSO", included: [false, false, false, true] },
  { feature: "Advanced Security", included: [false, false, false, true] },
];

export const buildPlanBanner = {
  eyebrow: "Flexible. Scalable. Yours.",
  title: "Build your own Sortboxs plan",
  description: "Choose only the modules you need.",
  primary: { label: "Customize Your Plan", href: "#" },
  secondary: { label: "Talk to Our Experts", href: routes.company.contact },
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
