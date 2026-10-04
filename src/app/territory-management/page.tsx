import type { Metadata } from "next";
import { Eye, Gauge, Handshake, Scale, Target, Users } from "lucide-react";
import { TerritoryHero } from "@/components/sales-pages/territory/TerritoryHero";
import { CoverageAssigner, OwnershipBeforeAfter, TerritoryToPerformance } from "@/components/sales-pages/territory/TerritorySections";
import { Outcomes, SolutionCTA } from "@/components/sales-pages/parts";

export const metadata: Metadata = {
  title: "Territory Management",
  description: "Organize sales territories, assign account ownership and give every rep clear responsibility across regions, markets and accounts with SortBoxs.",
};

/** Solutions → Sales → Territory Management. Hierarchy / ownership-oriented layout. Header and footer come from the root layout. */
export default function TerritoryManagementPage() {
  return (
    <>
      <TerritoryHero />
      <OwnershipBeforeAfter />
      <TerritoryToPerformance />
      <CoverageAssigner />
      <Outcomes
        title="Everyone knows what they own"
        intro="Clear territories remove the guesswork about who should call whom, and make results easier to read."
        items={[
          { icon: Eye, title: "Improve visibility", body: "See ownership and coverage across regions in one view." },
          { icon: Scale, title: "Reduce overlap", body: "One owner per account means fewer duplicate conversations." },
          { icon: Target, title: "Close the gaps", body: "Accounts with no owner stand out, so they can be assigned." },
          { icon: Gauge, title: "Compare fairly", body: "Measure each territory against its own target and size." },
          { icon: Users, title: "Allocate the team well", body: "Place reps where the opportunity is, and rebalance as it changes." },
          { icon: Handshake, title: "Stronger customer relationships", body: "Customers deal with one accountable person." },
        ]}
      />
      <SolutionCTA current="Territory Management" />
    </>
  );
}
