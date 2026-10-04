import type { Metadata } from "next";
import { Clock, Eye, Filter, Handshake, Target, Zap } from "lucide-react";
import { Compare, Outcomes } from "@/components/sales-pages/parts";
import { LeadGenHero } from "@/components/marketing-pages/leadgen/LeadGenHero";
import { CaptureChannels, LeadHandover, ScoreSimulator } from "@/components/marketing-pages/leadgen/LeadGenSections";
import { MarketingNextSteps } from "@/components/marketing-pages/shared";

export const metadata: Metadata = {
  title: "Lead Generation",
  description: "Capture leads from forms, landing pages, events and social, score them on behaviour and fit, and hand the ready ones to sales with the full history in SortBoxs.",
};

/** Solutions → Marketing → Lead Generation. Funnel / scoring-oriented layout. Header and footer come from the root layout. */
export default function LeadGenerationPage() {
  return (
    <>
      <LeadGenHero />
      <Compare
        eyebrow="The challenge"
        title="Leads arrive from everywhere, and the good ones get lost"
        intro="When leads sit in separate inboxes and sheets, sales either chases everything or misses the ones that matter."
        without={[
          { title: "Leads scattered across tools", body: "Forms, event lists and social replies each live somewhere different." },
          { title: "Every lead looks the same", body: "A casual visitor and a buyer ready to talk land in the same list." },
          { title: "The hand-over is informal", body: "Sales hears about a lead by email, with none of the history." },
        ]}
        withTitle="With Lead Generation"
        withItems={[
          { title: "One list with sources attached", body: "Every channel feeds the same lead record." },
          { title: "Scores show who is ready", body: "Actions and fit add up, so the warm and hot leads rise to the top." },
          { title: "A clear hand-over", body: "Ready leads go to a rep with the full story of what they did." },
        ]}
      />
      <CaptureChannels />
      <ScoreSimulator />
      <LeadHandover />
      <Outcomes
        title="Better leads, handled faster"
        intro="Scoring and a clean hand-over mean marketing and sales spend their time on the same people."
        items={[
          { icon: Eye, title: "Improve visibility", body: "See where leads come from and what they do." },
          { icon: Target, title: "Focus on the best leads", body: "Scores point sales at the people most likely to talk." },
          { icon: Clock, title: "Respond faster", body: "Ready leads are routed to a rep as soon as they qualify." },
          { icon: Filter, title: "Reduce wasted effort", body: "Cold leads are nurtured instead of called too early." },
          { icon: Handshake, title: "Align marketing and sales", body: "Both teams agree on what a ready lead looks like." },
          { icon: Zap, title: "Save time", body: "Capture, tagging and routing happen without manual sorting." },
        ]}
      />
      <MarketingNextSteps current="Lead Generation" />
    </>
  );
}
