import { Building2, Crown, Send } from "lucide-react";
import type { PricingPlan } from "@/data/pricing";

/**
 * TEMPORARY SHOWCASE PLANS — the earlier hardcoded plans, shown after the real backend plans when
 * NEXT_PUBLIC_MOCK_PLANS=true (now off in .env.development and .env.production: real plans exist in the
 * SortBoxs admin). They aren't backend plans:
 * Pay shows "coming soon — contact sales" instead of charging. Remove by setting the flag to false.
 */
export const mockPlans: PricingPlan[] = [
  {
    id: "mock-starter",
    name: "Starter",
    description: "For small teams getting started.",
    icon: Send,
    price: { monthly: 4999, yearly: 54999 },
    features: ["CRM", "Contacts", "Leads", "Tasks", "Basic Reports"],
    cta: { label: "Get Started" },
  },
  {
    id: "mock-professional",
    name: "Professional",
    description: "For growing businesses.",
    icon: Crown,
    price: { monthly: 7999, yearly: 89999 },
    features: ["CRM", "Sales", "Marketing", "Customer Support", "Automation", "Reports", "Dashboards"],
    cta: { label: "Get Started" },
    tag: "Most Popular",
  },
  {
    id: "mock-business",
    name: "Business",
    description: "For established organizations.",
    icon: Building2,
    price: { monthly: 14999, yearly: 175999 },
    features: ["CRM", "Sales", "Marketing", "HRMS", "Recruitment", "Payroll", "Finance", "Projects", "Inventory", "AI Features"],
    cta: { label: "Get Started" },
  },
];
