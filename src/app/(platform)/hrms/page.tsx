import type { Metadata } from "next";
import { ModulePage } from "@/components/module/ModulePage";
import { hrmsPage } from "@/data/modules/hrms";

export const metadata: Metadata = {
  title: "HRMS",
  description: hrmsPage.description,
};

export default function HRMSPage() {
  return <ModulePage data={hrmsPage} />;
}
