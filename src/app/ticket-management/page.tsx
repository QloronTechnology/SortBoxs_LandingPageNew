import type { Metadata } from "next";
import { Clock, Eye, Heart, Target, Users, Zap } from "lucide-react";
import { Compare, Outcomes } from "@/components/sales-pages/parts";
import { ServiceNextSteps } from "@/components/service-pages/shared";
import { TicketsHero } from "@/components/service-pages/tickets/TicketsHero";
import { TicketAnatomy, TicketLifecycle, TicketQueue } from "@/components/service-pages/tickets/TicketsSections";

export const metadata: Metadata = {
  title: "Ticket Management",
  description: "Bring every customer request into one queue, with owners, priorities, notes and ready-made replies, and keep working until each ticket is resolved with SortBoxs.",
};

/** Solutions → Customer Service → Ticket Management. Inbox / queue-oriented layout. Header and footer come from the root layout. */
export default function TicketManagementPage() {
  return (
    <>
      <TicketsHero />
      <Compare
        eyebrow="The challenge"
        title="Requests arrive everywhere, and some are never answered"
        intro="When support lives in shared inboxes and chat threads, nobody owns a request until someone complains."
        without={[
          { title: "Nobody owns the request", body: "Several people see the same email and each assumes someone else has it." },
          { title: "Urgent and routine look alike", body: "A locked-out team waits behind a how-to question." },
          { title: "Context is scattered", body: "Past replies and notes live in different inboxes and different heads." },
        ]}
        withTitle="With Ticket Management"
        withItems={[
          { title: "One queue, one owner per ticket", body: "Every request becomes a ticket with a named person responsible." },
          { title: "Priorities decide the order", body: "The urgent tickets rise to the top, so they are answered first." },
          { title: "The whole story in one place", body: "Messages, notes and history sit on the ticket for anyone who picks it up." },
        ]}
      />
      <TicketLifecycle />
      <TicketQueue />
      <TicketAnatomy />
      <Outcomes
        tone="white"
        title="A queue that stays under control"
        intro="Clear ownership and priorities change how a support team feels at the end of the day."
        items={[
          { icon: Eye, title: "Improve visibility", body: "See every open ticket, who has it and how long it has waited." },
          { icon: Target, title: "Answer the urgent first", body: "Priorities put the tickets that matter at the top." },
          { icon: Zap, title: "Reply faster", body: "Notes and ready-made replies save retyping common answers." },
          { icon: Users, title: "Share the load", body: "Assign by skill or workload so no one is overwhelmed." },
          { icon: Clock, title: "Save time", body: "Less searching for context, less chasing teammates." },
          { icon: Heart, title: "Better customer experience", body: "Customers get one clear answer instead of several partial ones." },
        ]}
      />
      <ServiceNextSteps current="Ticket Management" tone="surface" />
    </>
  );
}
