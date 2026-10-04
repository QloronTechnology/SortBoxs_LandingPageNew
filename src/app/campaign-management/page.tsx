import type { Metadata } from "next";
import { Calendar, Eye, Layers, Wallet, Users, Zap } from "lucide-react";
import { Compare, Outcomes } from "@/components/sales-pages/parts";
import { CampaignHero } from "@/components/marketing-pages/campaign/CampaignHero";
import { CampaignDetail, CampaignPlanner, PlanToLaunch } from "@/components/marketing-pages/campaign/CampaignSections";
import { MarketingNextSteps } from "@/components/marketing-pages/shared";

export const metadata: Metadata = {
  title: "Campaign Management",
  description: "Plan, launch and track every marketing campaign on one calendar, with channels, budgets, tasks, approvals and results together in SortBoxs.",
};

/** Solutions → Marketing → Campaign Management. Calendar / planning-oriented layout. Header and footer come from the root layout. */
export default function CampaignManagementPage() {
  return (
    <>
      <CampaignHero />
      <Compare
        eyebrow="The challenge"
        title="Campaigns run in silos, and the plan lives in spreadsheets"
        intro="When every channel keeps its own plan, nobody can say what is live, what clashes or what it all costs."
        without={[
          { title: "Plans live in many documents", body: "Email, social and ads each keep their own sheet, and none of them match." },
          { title: "Dates clash without anyone noticing", body: "Two big pushes land in the same week because nobody saw the whole calendar." },
          { title: "Spend is known after the fact", body: "Budget is added up at the end, when it is too late to change anything." },
        ]}
        withTitle="With Campaign Management"
        withItems={[
          { title: "One calendar for every channel", body: "See all campaigns together, with owners and status." },
          { title: "Clashes and gaps are visible", body: "Plan the weeks properly, before the campaigns start." },
          { title: "Budget tracked as you go", body: "Planned and spent amounts sit beside each campaign." },
        ]}
      />
      <PlanToLaunch />
      <CampaignPlanner />
      <CampaignDetail />
      <Outcomes
        tone="white"
        title="Campaigns that run on plan"
        intro="Clear ownership and a shared calendar remove most of the last-minute scrambling."
        items={[
          { icon: Eye, title: "Improve visibility", body: "Everyone sees what is live, what is next and who owns it." },
          { icon: Calendar, title: "Plan better", body: "Spot clashes and gaps across channels before launch." },
          { icon: Wallet, title: "Control spend", body: "Watch budget used against budget planned as campaigns run." },
          { icon: Zap, title: "Save time", body: "Tasks, approvals and dates live with the campaign, not in chat threads." },
          { icon: Users, title: "Work as one team", body: "Marketing, design and sales work from the same plan." },
          { icon: Layers, title: "Stay consistent", body: "Every campaign goes through the same steps, whoever runs it." },
        ]}
      />
      <MarketingNextSteps current="Campaign Management" tone="surface" />
    </>
  );
}
