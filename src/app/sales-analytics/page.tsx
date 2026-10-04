import type { Metadata } from "next";
import { Clock, Eye, Lightbulb, Target, TrendingUp, Users } from "lucide-react";
import { AnalyticsHero } from "@/components/sales-pages/analytics/AnalyticsHero";
import { PerformanceGlance, QuestionsExplorer } from "@/components/sales-pages/analytics/AnalyticsSections";
import { Compare, Outcomes, SolutionCTA } from "@/components/sales-pages/parts";

export const metadata: Metadata = {
  title: "Sales Analytics",
  description: "Real-time dashboards for sales performance, pipeline health, conversion rates, revenue trends, team performance and forecasting in SortBoxs.",
};

/** Solutions → Sales → Sales Analytics. Dashboard / data-oriented layout. Header and footer come from the root layout. */
export default function SalesAnalyticsPage() {
  return (
    <>
      <AnalyticsHero />
      <Compare
        eyebrow="The challenge"
        title="Reports that arrive after the decision"
        intro="When numbers are pulled together by hand, managers are steering with last week's picture."
        without={[
          { title: "Reports are built by hand", body: "Someone exports, pastes and formats every week, and the numbers are old on arrival." },
          { title: "Everyone has a different number", body: "Each team keeps its own sheet, so meetings start with arguments about the data." },
          { title: "Problems show up late", body: "A weak pipeline or an under-target territory is noticed after the quarter ends." },
        ]}
        withTitle="With Sales Analytics"
        withItems={[
          { title: "Dashboards update as deals move", body: "The same live data feeds every chart, from pipeline to revenue." },
          { title: "One set of numbers", body: "Managers, reps and finance look at the same definitions." },
          { title: "Trends are visible early", body: "Targets, forecast and conversion are tracked while there is time to act." },
        ]}
      />
      <PerformanceGlance />
      <QuestionsExplorer />
      <Outcomes
        title="Decisions backed by what is actually happening"
        intro="Good analytics shortens the distance between seeing a problem and doing something about it."
        items={[
          { icon: Eye, title: "Improve visibility", body: "See pipeline, revenue and team results in one place." },
          { icon: Lightbulb, title: "Make better decisions", body: "Back planning and coaching with live data instead of instinct." },
          { icon: Clock, title: "Save time", body: "No more building the weekly report by hand." },
          { icon: Target, title: "Stay on target", body: "Track progress against goals while there is still time to adjust." },
          { icon: Users, title: "Coach with facts", body: "Compare reps fairly and focus support where it helps most." },
          { icon: TrendingUp, title: "Forecast with confidence", body: "Base the forecast on real deals and their stages." },
        ]}
      />
      <SolutionCTA current="Sales Analytics" />
    </>
  );
}
