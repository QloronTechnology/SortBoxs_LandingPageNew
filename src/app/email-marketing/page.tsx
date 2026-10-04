import type { Metadata } from "next";
import { Clock, Eye, Heart, Target, Users, Zap } from "lucide-react";
import { Compare, Outcomes } from "@/components/sales-pages/parts";
import { EmailHero } from "@/components/marketing-pages/email/EmailHero";
import { AudienceSegments, DripSequence, EmailBuilder, EmailReport } from "@/components/marketing-pages/email/EmailSections";
import { MarketingNextSteps } from "@/components/marketing-pages/shared";

export const metadata: Metadata = {
  title: "Email Marketing",
  description: "Build emails from blocks, send them to the right segments, run follow-up sequences and see opens, clicks and conversions in SortBoxs.",
};

/** Solutions → Marketing → Email Marketing. Message / audience-oriented layout. Header and footer come from the root layout. */
export default function EmailMarketingPage() {
  return (
    <>
      <EmailHero />
      <Compare
        eyebrow="The challenge"
        title="One email to everyone rarely lands"
        intro="Generic blasts and manual follow-ups are easy to send and easy to ignore."
        without={[
          { title: "The same message goes to everyone", body: "A new lead and a long-time customer get identical emails." },
          { title: "Follow-ups depend on memory", body: "Someone has to remember who opened what, and who still needs a nudge." },
          { title: "Results sit in a separate tool", body: "Email numbers never connect to leads, deals or revenue." },
        ]}
        withTitle="With Email Marketing"
        withItems={[
          { title: "Segments decide who gets what", body: "Send the right message to the right group, personalised by name." },
          { title: "Sequences follow up for you", body: "Each person gets the next email that matches how they responded." },
          { title: "Results tie back to the contact", body: "Opens and clicks are stored on the same record sales sees." },
        ]}
      />
      <EmailBuilder />
      <AudienceSegments />
      <DripSequence />
      <EmailReport />
      <Outcomes
        title="Emails that feel like they were written for the reader"
        intro="Relevance and timing do more than volume. These are the changes teams look for."
        items={[
          { icon: Target, title: "Reach the right people", body: "Segments keep each message relevant to its audience." },
          { icon: Heart, title: "Feel personal", body: "Names and details from the contact record make emails feel one to one." },
          { icon: Clock, title: "Save time", body: "Build once and let sequences do the follow-up." },
          { icon: Zap, title: "Follow up on time", body: "The next email goes out when it should, without a reminder." },
          { icon: Eye, title: "See what works", body: "Compare opens, clicks and conversions across emails." },
          { icon: Users, title: "Stay connected to sales", body: "Email activity is visible on each lead and customer." },
        ]}
      />
      <MarketingNextSteps current="Email Marketing" />
    </>
  );
}
