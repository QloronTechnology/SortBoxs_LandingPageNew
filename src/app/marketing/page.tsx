import type { Metadata } from "next";
import { Eye, Gauge, Handshake, Target, Users, Wallet } from "lucide-react";
import { Outcomes } from "@/components/sales-pages/parts";
import { MarketingCapabilities } from "@/components/marketing-pages/overview/MarketingCapabilities";
import { LoopCampaignStory } from "@/components/marketing-pages/overview/LoopCampaignStory";
import { MarketingOverviewHero } from "@/components/marketing-pages/overview/MarketingOverviewHero";
import { SalesBridge } from "@/components/marketing-pages/overview/SalesBridge";
import { MarketingStartingPoints } from "@/components/marketing-pages/overview/MarketingStartingPoints";

export const metadata: Metadata = {
  title: "Marketing Solution",
  description: "Attract, engage and grow your brand: plan campaigns, capture and score leads, send the right emails, follow the customer journey and measure what works with SortBoxs.",
};

/** Solutions → Marketing. An overview of the five Marketing solutions. Header and footer come from the root layout. */
export default function MarketingSolutionPage() {
  return (
    <>
      <MarketingOverviewHero />
      <LoopCampaignStory />
      <MarketingCapabilities />
      <SalesBridge />
      <Outcomes
        title="Marketing you can explain and improve"
        intro="When planning, capture, messaging, journeys and results sit together, each one makes the others better."
        items={[
          { icon: Eye, title: "Improve visibility", body: "See campaigns, leads and results in one place." },
          { icon: Target, title: "Focus on what works", body: "Put effort and budget where results come from." },
          { icon: Wallet, title: "Control spend", body: "Track budgets as campaigns run, not after." },
          { icon: Gauge, title: "Move faster", body: "Plan, send and follow up without juggling tools." },
          { icon: Handshake, title: "Work with sales", body: "Hand leads over with the whole story attached." },
          { icon: Users, title: "Know your customers", body: "Follow each person across every step of the journey." },
        ]}
      />
      <MarketingStartingPoints />
    </>
  );
}
