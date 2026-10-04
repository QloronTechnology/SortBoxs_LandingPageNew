import type { Metadata } from "next";
import { Clock, Eye, Heart, Target, Users, Zap } from "lucide-react";
import { Compare, Outcomes } from "@/components/sales-pages/parts";
import { OmniHero } from "@/components/service-pages/omni/OmniHero";
import { ChannelGrid, ChannelThread, RoutingRules } from "@/components/service-pages/omni/OmniSections";
import { ServiceNextSteps } from "@/components/service-pages/shared";

export const metadata: Metadata = {
  title: "Omnichannel Support",
  description: "Bring email, chat, phone, social and web forms into one inbox, route each conversation to the right team and reply with the customer's full history in SortBoxs.",
};

/** Solutions → Customer Service → Omnichannel Support. Conversation / channel-oriented layout. Header and footer come from the root layout. */
export default function OmnichannelSupportPage() {
  return (
    <>
      <OmniHero />
      <Compare
        eyebrow="The challenge"
        title="Customers use every channel, and your tools split them apart"
        intro="When each channel has its own inbox, the same customer becomes several strangers."
        without={[
          { title: "Customers repeat themselves", body: "They explain the problem by email, again in chat, and again on the phone." },
          { title: "Agents work blind", body: "Nobody sees what happened on the other channels before replying." },
          { title: "Routing is manual", body: "Someone has to read each message and decide who should answer." },
        ]}
        withTitle="With Omnichannel Support"
        withItems={[
          { title: "One thread per customer", body: "Every channel feeds the same conversation, labelled by source." },
          { title: "Full context for every agent", body: "History, plan and open tickets are on screen before the first reply." },
          { title: "Routing by rules", body: "Topic, tone and urgency decide who answers and how fast." },
        ]}
      />
      <ChannelThread />
      <RoutingRules />
      <ChannelGrid />
      <Outcomes
        tone="white"
        title="Support that feels like one team"
        intro="When every channel feeds one view, customers and agents both feel the difference."
        items={[
          { icon: Heart, title: "No more repeating", body: "Customers explain once, however they get in touch." },
          { icon: Eye, title: "See the whole picture", body: "Agents read the full history before they reply." },
          { icon: Target, title: "Right team first time", body: "Routing rules reduce hand-offs and re-assigning." },
          { icon: Zap, title: "Reply faster", body: "No hunting across inboxes for what was said before." },
          { icon: Users, title: "Cover every channel", body: "One team manages email, chat, phone, social and forms together." },
          { icon: Clock, title: "Save time", body: "Less switching between tools and less sorting by hand." },
        ]}
      />
      <ServiceNextSteps current="Omnichannel Support" tone="surface" />
    </>
  );
}
