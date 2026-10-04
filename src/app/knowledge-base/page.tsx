import type { Metadata } from "next";
import { Clock, Eye, Heart, Target, Users, Zap } from "lucide-react";
import { Compare, Outcomes } from "@/components/sales-pages/parts";
import { KbHero } from "@/components/service-pages/kb/KbHero";
import { AgentSuggestions, ArticleWorkflow, Deflection, KbSearch } from "@/components/service-pages/kb/KbSections";
import { ServiceNextSteps } from "@/components/service-pages/shared";

export const metadata: Metadata = {
  title: "Knowledge Base",
  description: "Write help articles once, organise them by category, and let customers and agents search them any time with the SortBoxs Knowledge Base.",
};

/** Solutions → Customer Service → Knowledge Base. Search / content-oriented layout. Header and footer come from the root layout. */
export default function KnowledgeBasePage() {
  return (
    <>
      <KbHero />
      <Compare
        eyebrow="The challenge"
        title="The same question gets answered again and again"
        intro="When answers live in agents' heads and old replies, every customer waits for a person to write them out."
        without={[
          { title: "Answers are rewritten each time", body: "Agents retype or hunt for an old reply, and each version is a little different." },
          { title: "Customers cannot help themselves", body: "With no help centre, even simple questions become tickets." },
          { title: "New agents learn slowly", body: "The knowledge is spread across inboxes and colleagues." },
        ]}
        withTitle="With a Knowledge Base"
        withItems={[
          { title: "One article per answer", body: "Write it once and use it everywhere, so the answer is consistent." },
          { title: "Customers search first", body: "Simple questions are answered without waiting for an agent." },
          { title: "Agents share the same source", body: "Everyone, including new joiners, finds answers in the same place." },
        ]}
      />
      <KbSearch />
      <Deflection />
      <ArticleWorkflow />
      <AgentSuggestions />
      <Outcomes
        title="Answers that scale without more headcount"
        intro="A good help centre lets the team answer more people, with the same level of care."
        items={[
          { icon: Zap, title: "Answer faster", body: "Customers find answers in seconds, any time of day." },
          { icon: Clock, title: "Save agent time", body: "Fewer repeat questions means more time for the hard ones." },
          { icon: Target, title: "Stay consistent", body: "Everyone gives the same, reviewed answer." },
          { icon: Users, title: "Onboard agents faster", body: "New team members learn from the same articles customers read." },
          { icon: Eye, title: "See what is missing", body: "Searches with no results show which articles to write next." },
          { icon: Heart, title: "Better customer experience", body: "Customers solve problems on their own terms." },
        ]}
      />
      <ServiceNextSteps current="Knowledge Base" />
    </>
  );
}
