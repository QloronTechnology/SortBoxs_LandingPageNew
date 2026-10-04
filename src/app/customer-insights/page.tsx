import type { Metadata } from "next";
import { Eye, Heart, Lightbulb, Target, Users, Zap } from "lucide-react";
import { Compare, Outcomes } from "@/components/sales-pages/parts";
import { InsightsHero } from "@/components/service-pages/insights/InsightsHero";
import { CustomerHealth, MetricExplorer, TopicTrends } from "@/components/service-pages/insights/InsightsSections";
import { ServiceNextSteps } from "@/components/service-pages/shared";

export const metadata: Metadata = {
  title: "Customer Insights",
  description: "See ticket volume, response times, satisfaction, top topics and customer health in one place, and fix the causes behind the questions customers keep asking with SortBoxs.",
};

/** Solutions → Customer Service → Customer Insights. Dashboard / analysis-oriented layout. Header and footer come from the root layout. */
export default function CustomerInsightsPage() {
  return (
    <>
      <InsightsHero />
      <Compare
        eyebrow="The challenge"
        title="Support teams are busy, so patterns go unnoticed"
        intro="Answering tickets one at a time makes it hard to see why they keep coming."
        without={[
          { title: "Each ticket looks like a one-off", body: "The same problem returns again and again without anyone connecting the dots." },
          { title: "Unhappy customers stay quiet", body: "You learn someone was frustrated when they cancel." },
          { title: "Reports are assembled by hand", body: "By the time the numbers are ready, the week has already gone." },
        ]}
        withTitle="With Customer Insights"
        withItems={[
          { title: "Tickets grouped by topic", body: "See which issues are rising, steady or fading." },
          { title: "Health scores for every account", body: "Spot customers at risk while you can still help." },
          { title: "A live view of the team", body: "Volume, speed and satisfaction, without building a report." },
        ]}
      />
      <MetricExplorer />
      <TopicTrends />
      <CustomerHealth />
      <Outcomes
        tone="white"
        title="Support that gets better every week"
        intro="When the patterns are visible, the team can fix causes instead of answering the same question forever."
        items={[
          { icon: Eye, title: "Improve visibility", body: "See volume, speed and satisfaction at a glance." },
          { icon: Lightbulb, title: "Fix the cause", body: "Find the issues behind repeat tickets and remove them." },
          { icon: Heart, title: "Keep customers", body: "Reach out to unhappy accounts before they leave." },
          { icon: Target, title: "Focus the team", body: "Put effort where it makes the biggest difference." },
          { icon: Users, title: "Coach with facts", body: "Review results with the team using the same numbers." },
          { icon: Zap, title: "Save time", body: "No more building reports by hand." },
        ]}
      />
      <ServiceNextSteps current="Customer Insights" tone="surface" />
    </>
  );
}
