import { Building2, Crown, Send } from "lucide-react";
import type { PricingPlan } from "@/data/pricing";

/**
 * DEVELOPMENT PREVIEW ONLY — the earlier hardcoded plans, used to see how /pricing looks with more
 * backend plans than fit in a row. Added after the real plans when NEXT_PUBLIC_MOCK_PLANS=true (set in
 * .env.development; never in production). Their ids aren't backend ids, so paying for one fails with
 * "No subscription plan selected" — the checkout needs a real plan.
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
    popular: true,
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
