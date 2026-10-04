import type { Metadata } from "next";
import { Clock, Eye, Heart, Target, Users, Zap } from "lucide-react";
import { Compare, Outcomes } from "@/components/sales-pages/parts";
import { JourneyHero } from "@/components/marketing-pages/journey/JourneyHero";
import { DropOff, JourneyExplorer, JourneyTriggers } from "@/components/marketing-pages/journey/JourneySections";
import { MarketingNextSteps } from "@/components/marketing-pages/shared";

export const metadata: Metadata = {
  title: "Customer Journey",
  description: "Map the customer journey from first contact to loyalty, see touchpoints and drop-off at every stage, and trigger the right action at the right moment in SortBoxs.",
};

/** Solutions → Marketing → Customer Journey. Journey-map-oriented layout. Header and footer come from the root layout. */
export default function CustomerJourneyPage() {
  return (
    <>
      <JourneyHero />
      <Compare
        eyebrow="The challenge"
        title="Customers do not move in a straight line, and teams only see their own part"
        intro="Marketing sees clicks, sales sees calls and support sees tickets. Nobody sees the whole path."
        without={[
          { title: "Each team sees a slice", body: "The story of one customer is split across tools and teams." },
          { title: "Drop-off is a mystery", body: "You know how many signed up, but not where the others went." },
          { title: "Follow-ups are guesswork", body: "Messages go out on a schedule, not when the customer is ready." },
        ]}
        withTitle="With Customer Journey"
        withItems={[
          { title: "One view of the whole path", body: "Stages, touchpoints and activity together, per customer." },
          { title: "See where customers drop away", body: "Compare stages and spot the biggest drop at a glance." },
          { title: "Act at the right moment", body: "Triggers send the next step when a customer does something." },
        ]}
      />
      <JourneyExplorer />
      <JourneyTriggers />
      <DropOff />
      <Outcomes
        title="Moments you no longer miss"
        intro="A shared view of the journey helps every team respond at the right time."
        items={[
          { icon: Eye, title: "Improve visibility", body: "See each customer's path across marketing, sales and support." },
          { icon: Target, title: "Fix the weak spots", body: "Find the stage where customers drop away and focus there." },
          { icon: Zap, title: "Respond in the moment", body: "Triggers act when a customer takes a step, not days later." },
          { icon: Heart, title: "Build loyalty", body: "Keep in touch after the sale, with reviews, renewals and referrals." },
          { icon: Users, title: "Align your teams", body: "Marketing, sales and support work from the same story." },
          { icon: Clock, title: "Save time", body: "Common follow-ups run automatically once they are set up." },
        ]}
      />
      <MarketingNextSteps current="Customer Journey" />
    </>
  );
}
