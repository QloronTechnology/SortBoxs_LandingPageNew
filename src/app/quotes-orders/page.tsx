import type { Metadata } from "next";
import { Clock, Eye, Link2, ShieldCheck, ThumbsUp, Zap } from "lucide-react";
import { QuotesHero } from "@/components/sales-pages/quotes/QuotesHero";
import { QuoteSwimlane } from "@/components/sales-pages/quotes/QuoteSwimlane";
import { ConnectedProcess, QuoteBuilder, QuoteCapabilities } from "@/components/sales-pages/quotes/QuotesSections";
import { Compare, Outcomes, SolutionCTA } from "@/components/sales-pages/parts";

export const metadata: Metadata = {
  title: "Quotes & Orders",
  description: "Create professional quotes, manage approvals and convert accepted quotes into orders, all connected to the customer and the deal in SortBoxs.",
};

/** Solutions → Sales → Quotes & Orders. Document / process-oriented layout. Header and footer come from the root layout. */
export default function QuotesOrdersPage() {
  return (
    <>
      <QuotesHero />
      <Compare
        eyebrow="The challenge"
        title="A quote should not take longer than the deal"
        intro="When quotes are built by hand and approved by email, the customer waits and the order starts from scratch."
        without={[
          { title: "Quotes built from old copies", body: "Prices and terms get copied from the last document and slip out of date." },
          { title: "Approvals wait in inboxes", body: "Nobody is sure whether a discount was approved, or by whom." },
          { title: "Orders are re-typed", body: "Once the customer says yes, someone enters the same details again." },
        ]}
        withTitle="With Quotes & Orders"
        withItems={[
          { title: "Quotes come from your product list", body: "Pricing, discounts and taxes are applied the same way every time." },
          { title: "Approvals are part of the quote", body: "The right manager is asked, and the answer is recorded on the quote." },
          { title: "Accepted quotes become orders", body: "Customer and deal details carry over without being typed again." },
        ]}
      />
      <QuoteSwimlane />
      <QuoteBuilder />
      <ConnectedProcess />
      <QuoteCapabilities />
      <Outcomes
        title="From proposal to order, without the detours"
        intro="Faster quotes and cleaner hand-offs mean fewer delays between a yes and a delivery."
        items={[
          { icon: Zap, title: "Move faster", body: "Customers get a professional quote while the conversation is still warm." },
          { icon: ShieldCheck, title: "Stay in control", body: "Discount rules and approvals keep pricing consistent." },
          { icon: Clock, title: "Reduce manual work", body: "No re-typing between the quote, the order and the customer record." },
          { icon: Eye, title: "Improve visibility", body: "See which quotes are waiting, approved or accepted at any moment." },
          { icon: Link2, title: "Keep everything connected", body: "Quote, order, deal and customer share one thread of history." },
          { icon: ThumbsUp, title: "A better customer experience", body: "Clear, accurate documents and fewer follow-up questions." },
        ]}
      />
      <SolutionCTA current="Quotes & Orders" />
    </>
  );
}
