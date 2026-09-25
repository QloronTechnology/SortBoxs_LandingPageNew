import {
  BriefcaseBusiness,
  ChartColumnIncreasing,
  ChartLine,
  HandCoins,
  Headphones,
  Megaphone,
  MonitorPlay,
  Package,
  ShoppingCart,
  Sparkles,
  UserPlus,
  Users,
  UsersRound,
  Wallet,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { MenuTone } from "@/data/menus/types";
import type { BillingCycle } from "@/data/pricing";

/** Content and pricing for the "Customize your plan" checkout drawer on /pricing. */

export type CheckoutStepId = "configure" | "billing" | "review";

export const checkoutSteps: { id: CheckoutStepId; label: string }[] = [
  { id: "configure", label: "Configure Plan" },
  { id: "billing", label: "Billing & Payment" },
  { id: "review", label: "Review & Pay" },
];

export type ModuleCategory = "customers" | "people" | "operations" | "intelligence";

export const moduleCategories: { id: ModuleCategory | "all"; label: string }[] = [
  { id: "all", label: "All modules" },
  { id: "customers", label: "Sales & Customers" },
  { id: "people", label: "People" },
  { id: "operations", label: "Operations & Finance" },
  { id: "intelligence", label: "AI & Insights" },
];

export interface CheckoutModule {
  id: string;
  name: string;
  category: ModuleCategory;
  description: string;
  icon: LucideIcon;
  tone: MenuTone;
  /** INR per user per month, before any yearly discount. */
  pricePerUser: number;
  features: string[];
}

export const checkoutModules: CheckoutModule[] = [
  {
    id: "crm",
    name: "CRM",
    category: "customers",
    description: "Manage customers, leads and opportunities",
    icon: Users,
    tone: "green",
    pricePerUser: 150,
    features: ["Contacts & Accounts", "Leads & Opportunities", "Activities & Tasks", "Reports & Dashboards"],
  },
  {
    id: "sales",
    name: "Sales",
    category: "customers",
    description: "Sales automation & revenue growth",
    icon: ChartLine,
    tone: "purple",
    pricePerUser: 200,
    features: ["Pipeline Management", "Forecasting", "Quotations & Orders", "Sales Analytics"],
  },
  {
    id: "marketing",
    name: "Marketing",
    category: "customers",
    description: "Campaigns, email and lead generation",
    icon: Megaphone,
    tone: "teal",
    pricePerUser: 120,
    features: ["Email Campaigns", "Lead Nurturing", "Marketing Automation", "ROI Analytics"],
  },
  {
    id: "service",
    name: "Customer Service",
    category: "customers",
    description: "Tickets, help desk and customer satisfaction",
    icon: Headphones,
    tone: "sky",
    pricePerUser: 150,
    features: ["Ticketing & SLAs", "Omnichannel Inbox", "Knowledge Base", "CSAT Surveys"],
  },
  {
    id: "finance",
    name: "Finance",
    category: "operations",
    description: "Accounting, invoicing and reporting",
    icon: Wallet,
    tone: "green",
    pricePerUser: 150,
    features: ["Invoicing & Billing", "Expense Tracking", "Accounting & Ledger", "Financial Reports"],
  },
  {
    id: "hrms",
    name: "HRMS",
    category: "people",
    description: "People, attendance and employee data",
    icon: UsersRound,
    tone: "red",
    pricePerUser: 250,
    features: ["Employee Records", "Attendance & Leave", "Performance", "HR Analytics"],
  },
  {
    id: "recruitment",
    name: "Recruitment",
    category: "people",
    description: "Hire, track and manage talent",
    icon: UserPlus,
    tone: "indigo",
    pricePerUser: 200,
    features: ["Job Postings", "Applicant Tracking", "Interviews", "Offer Management"],
  },
  {
    id: "payroll",
    name: "Payroll",
    category: "people",
    description: "Salary, compliance and tax management",
    icon: HandCoins,
    tone: "lavender",
    pricePerUser: 180,
    features: ["Salary Processing", "Tax & Compliance", "Payslips", "Statutory Reports"],
  },
  {
    id: "projects",
    name: "Projects",
    category: "operations",
    description: "Plan, track and deliver projects",
    icon: BriefcaseBusiness,
    tone: "indigo",
    pricePerUser: 180,
    features: ["Project Planning", "Task Management", "Resource Allocation", "Time Tracking"],
  },
  {
    id: "inventory",
    name: "Inventory",
    category: "operations",
    description: "Stock, warehouses and fulfilment",
    icon: Package,
    tone: "pink",
    pricePerUser: 180,
    features: ["Stock Tracking", "Multi-warehouse", "Barcodes & Batches", "Reorder Alerts"],
  },
  {
    id: "procurement",
    name: "Procurement",
    category: "operations",
    description: "Vendors, requisitions and purchases",
    icon: ShoppingCart,
    tone: "blue",
    pricePerUser: 160,
    features: ["Purchase Requests", "Purchase Orders", "Vendor Management", "Approval Workflows"],
  },
  {
    id: "analytics",
    name: "Analytics",
    category: "intelligence",
    description: "Dashboards and insights across modules",
    icon: ChartColumnIncreasing,
    tone: "orange",
    pricePerUser: 120,
    features: ["Custom Dashboards", "Cross-module Reports", "Scheduled Reports", "Data Export"],
  },
  {
    id: "automation",
    name: "Automation",
    category: "intelligence",
    description: "Workflows that run your busywork",
    icon: Workflow,
    tone: "green",
    pricePerUser: 100,
    features: ["Workflow Builder", "Triggers & Actions", "Approvals", "Scheduled Jobs"],
  },
  {
    id: "ai-assistant",
    name: "AI Assistant",
    category: "intelligence",
    description: "Your intelligent helper in every module",
    icon: Sparkles,
    tone: "teal",
    pricePerUser: 250,
    features: ["Ask in Plain Language", "Smart Summaries", "Drafting & Replies", "Predictive Insights"],
  },
  {
    id: "ai-interview",
    name: "AI Interview",
    category: "intelligence",
    description: "Screen and interview candidates with AI",
    icon: MonitorPlay,
    tone: "pink",
    pricePerUser: 300,
    features: ["AI Screening", "Video Interviews", "Auto Scoring", "Interview Reports"],
  },
];

/** Discount applied to yearly billing (matches "Save up to 20%" on /pricing). */
export const yearlyDiscount = 0.2;
export const maxUsersPerModule = 999;

/** Users per module when a module is added, or preselected from a plan. */
export const defaultUsers = 5;

/** Custom plans start with these modules. */
export const defaultSelection = ["crm"];

export const billingCycles: { value: BillingCycle; label: string }[] = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

export const checkoutHero = {
  title: "Build your Sortboxs workspace",
  description: "Choose the modules you need, set the number of users, and get transparent pricing.",
};
