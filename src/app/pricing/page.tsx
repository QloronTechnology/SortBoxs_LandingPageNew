import type { Metadata } from "next";
import { PricingHero } from "@/components/pricing/PricingHero";
import { PricingPlans } from "@/components/pricing/PricingPlans";
import { PricingModules } from "@/components/pricing/PricingModules";
import { PlanComparison } from "@/components/pricing/PlanComparison";
import { BuildPlanBanner } from "@/components/pricing/BuildPlanBanner";
import { CheckoutDrawerHost } from "@/components/checkout/CheckoutDrawer";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Plans that scale with your business — Starter, Professional, Business and Enterprise, billed monthly or yearly.",
};

export default function PricingPage() {
  return (
    <div className="bg-[#fbfaff]">
      <PricingHero />
      <PricingPlans />
      <PricingModules />
      <PlanComparison />
      <BuildPlanBanner />
      {/* Opened by the plan cards' "Get Started" and "Customize Your Plan". */}
      <CheckoutDrawerHost />
    </div>
  );
}
