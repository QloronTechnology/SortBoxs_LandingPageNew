import type { Metadata } from "next";
import { Clock, Eye, Heart, Shield, Target, Users } from "lucide-react";
import { Compare, Outcomes } from "@/components/sales-pages/parts";
import { ServiceNextSteps } from "@/components/service-pages/shared";
import { SlaHero } from "@/components/service-pages/sla/SlaHero";
import { EscalationLadder, PolicyBuilder, SlaReport } from "@/components/service-pages/sla/SlaSections";

export const metadata: Metadata = {
  title: "SLA Management",
  description: "Set response and resolution targets by priority, track the clock on every ticket, escalate before a deadline is missed and report on compliance with SortBoxs.",
};

/** Solutions → Customer Service → SLA Management. Timer / policy-oriented layout. Header and footer come from the root layout. */
export default function SlaManagementPage() {
  return (
    <>
      <SlaHero />
      <Compare
        eyebrow="The challenge"
        title="Promises are easy to make and hard to track"
        intro="Without a clock on each ticket, missed deadlines only show up when a customer complains."
        without={[
          { title: "No one knows the deadline", body: "Each ticket has an unwritten promise that lives in someone's memory." },
          { title: "Breaches are found afterwards", body: "You learn about a missed deadline from an unhappy customer." },
          { title: "Urgent and routine share a clock", body: "Every ticket is treated as if it had the same target." },
        ]}
        withTitle="With SLA Management"
        withItems={[
          { title: "A clock on every ticket", body: "Each ticket shows its targets and how much time is left." },
          { title: "Warnings before a breach", body: "Agents and leads are told while there is still time to act." },
          { title: "Targets that match the priority", body: "Urgent problems get faster commitments than routine questions." },
        ]}
      />
      <PolicyBuilder />
      <EscalationLadder />
      <SlaReport />
      <Outcomes
        tone="white"
        title="Commitments your team can keep"
        intro="Visible deadlines turn a vague promise into something the whole team can manage."
        items={[
          { icon: Eye, title: "Improve visibility", body: "See which tickets are on track, at risk or breached." },
          { icon: Target, title: "Prioritise well", body: "Spend time where a deadline is closest." },
          { icon: Shield, title: "Protect customer trust", body: "Keep the promises you have made, and know when you cannot." },
          { icon: Users, title: "Help the team early", body: "Leads can step in before a ticket slips." },
          { icon: Clock, title: "Count time fairly", body: "Working hours keep the clock realistic." },
          { icon: Heart, title: "Better customer experience", body: "Customers get replies when they were told to expect them." },
        ]}
      />
      <ServiceNextSteps current="SLA Management" tone="surface" />
    </>
  );
}
