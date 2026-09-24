import type { Metadata } from "next";
import { ModulePage } from "@/components/module/ModulePage";
import { servicePage } from "@/data/modules/service";

export const metadata: Metadata = {
  title: "Customer Service",
  description: servicePage.description,
};

export default function ServicePage() {
  return <ModulePage data={servicePage} />;
}
