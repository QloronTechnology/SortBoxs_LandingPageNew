import type { Metadata } from "next";
import { PipelineManagement } from "@/components/sales-solution/PipelineManagement";
import { QuotesAndOrders } from "@/components/sales-solution/QuotesAndOrders";
import { SalesAnalytics } from "@/components/sales-solution/SalesAnalytics";
import { SalesAutomation } from "@/components/sales-solution/SalesAutomation";
import { SalesCapabilities } from "@/components/sales-solution/SalesCapabilities";
import { SalesHero } from "@/components/sales-solution/SalesHero";
import { SalesJourney } from "@/components/sales-solution/SalesJourney";
import { SalesOutcomes } from "@/components/sales-solution/SalesOutcomes";
import { SalesStartingPoints } from "@/components/sales-solution/SalesStartingPoints";
import { SalesWorkflowAnimation } from "@/components/sales-solution/SalesWorkflowAnimation";
import { TerritoryManagement } from "@/components/sales-solution/TerritoryManagement";

export const metadata: Metadata = {
  title: "Sales Solution",
  description: "Close more deals and grow revenue with sales automation, pipeline management, quotes and orders, sales analytics and territory management.",
};

/** Solutions → Sales. The site header and footer come from the root layout. */
export default function SalesSolutionPage() {
  return (
    <>
      <SalesHero />
      <SalesJourney />
      <SalesAutomation />
      <PipelineManagement />
      <QuotesAndOrders />
      <SalesAnalytics />
      <TerritoryManagement />
      <SalesCapabilities />
      <SalesOutcomes />
      <SalesWorkflowAnimation />
      <SalesStartingPoints />
    </>
  );
}
