import type { Metadata } from "next";
import { Eye, Gauge, Heart, Target, Users, Zap } from "lucide-react";
import { Outcomes } from "@/components/sales-pages/parts";
import { ServiceBridge } from "@/components/service-pages/overview/ServiceBridge";
import { ServiceCapabilities } from "@/components/service-pages/overview/ServiceCapabilities";
import { ServiceOverviewHero } from "@/components/service-pages/overview/ServiceOverviewHero";
import { ServiceStartingPoints } from "@/components/service-pages/overview/ServiceStartingPoints";
import { ServiceTrack } from "@/components/service-pages/overview/ServiceTrack";

export const metadata: Metadata = {
  title: "Customer Service Solution",
  description: "Deliver exceptional support experiences: one queue for every request, a shared knowledge base, SLAs you can keep, every channel in one inbox, and insights from every conversation with SortBoxs.",
};

/** Solutions → Customer Service. An overview of the five Customer Service solutions. Header and footer come from the root layout. */
export default function CustomerServiceSolutionPage() {
  return (
    <>
      <ServiceOverviewHero />
      <ServiceTrack />
      <ServiceCapabilities />
      <ServiceBridge />
      <Outcomes
        title="Support customers will remember"
        intro="When requests, answers, promises, channels and insights sit together, each one makes the others better."
        items={[
          { icon: Eye, title: "Improve visibility", body: "See every request, deadline and trend in one place." },
          { icon: Zap, title: "Reply faster", body: "Answers, history and replies are one click away." },
          { icon: Gauge, title: "Keep your promises", body: "Targets and warnings keep deadlines in sight." },
          { icon: Target, title: "Fix the causes", body: "Spot repeat issues and remove them at the source." },
          { icon: Users, title: "Work as one team", body: "Support, sales and marketing share the same customer record." },
          { icon: Heart, title: "Delight customers", body: "Customers get quick, consistent answers on the channel they chose." },
        ]}
      />
      <ServiceStartingPoints />
    </>
  );
}
