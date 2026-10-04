import type { Metadata } from "next";
import { Clock, Eye, Lightbulb, Target, TrendingUp, Wallet } from "lucide-react";
import { Compare, Outcomes } from "@/components/sales-pages/parts";
import { MarketingAnalyticsHero } from "@/components/marketing-pages/analytics/MarketingAnalyticsHero";
import { Attribution, CampaignCompare, ChannelTable } from "@/components/marketing-pages/analytics/MarketingAnalyticsSections";
import { MarketingNextSteps } from "@/components/marketing-pages/shared";

export const metadata: Metadata = {
  title: "Marketing Analytics",
  description: "See leads, cost, conversion and attribution by channel and campaign, and compare campaigns side by side to spend your marketing budget where it works in SortBoxs.",
};

/** Solutions → Marketing → Marketing Analytics. Dashboard / comparison-oriented layout. Header and footer come from the root layout. */
export default function MarketingAnalyticsPage() {
  return (
    <>
      <MarketingAnalyticsHero />
      <Compare
        eyebrow="The challenge"
        title="Everyone reports clicks, but nobody knows what paid back"
        intro="Platform dashboards each tell their own story. Connecting them to leads and revenue is where the real answer is."
        without={[
          { title: "Numbers live in each tool", body: "Ads, email and social each report on their own, in their own way." },
          { title: "Credit is a guess", body: "Customers meet several channels, and nobody agrees which one deserves the credit." },
          { title: "Budget follows habit", body: "Spend carries on where it always went, not where it works." },
        ]}
        withTitle="With Marketing Analytics"
        withItems={[
          { title: "One dashboard across channels", body: "Leads, spend and conversion measured the same way everywhere." },
          { title: "Attribution you can switch", body: "See how credit moves under first touch, last touch or linear." },
          { title: "Clear comparisons", body: "Put campaigns side by side and move budget with confidence." },
        ]}
      />
      <ChannelTable />
      <Attribution />
      <CampaignCompare />
      <Outcomes
        title="Budget that follows the evidence"
        intro="When results are comparable and connected to revenue, marketing decisions get easier."
        items={[
          { icon: Eye, title: "Improve visibility", body: "See every channel and campaign on one dashboard." },
          { icon: Wallet, title: "Spend smarter", body: "Move budget towards what brings leads at a lower cost." },
          { icon: Target, title: "Focus on what converts", body: "Look past clicks to leads, deals and revenue." },
          { icon: Lightbulb, title: "Make better decisions", body: "Compare campaigns and learn from each one." },
          { icon: Clock, title: "Save time", body: "No more stitching reports together by hand." },
          { icon: TrendingUp, title: "Show your impact", body: "Share clear results with leadership and with sales." },
        ]}
      />
      <MarketingNextSteps current="Marketing Analytics" />
    </>
  );
}
