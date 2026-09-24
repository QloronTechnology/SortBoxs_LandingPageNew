import type { Metadata } from "next";
import { ModulePage } from "@/components/module/ModulePage";
import { analyticsPage } from "@/data/modules/analytics";

export const metadata: Metadata = {
  title: "Analytics",
  description: analyticsPage.description,
};

export default function AnalyticsPage() {
  return <ModulePage data={analyticsPage} />;
}
