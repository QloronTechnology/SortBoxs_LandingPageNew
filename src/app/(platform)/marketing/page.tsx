import type { Metadata } from "next";
import { ModulePage } from "@/components/module/ModulePage";
import { marketingPage } from "@/data/modules/marketing";

export const metadata: Metadata = {
  title: "Marketing",
  description: marketingPage.description,
};

export default function MarketingPage() {
  return <ModulePage data={marketingPage} />;
}
