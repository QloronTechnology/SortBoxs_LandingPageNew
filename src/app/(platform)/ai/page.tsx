import type { Metadata } from "next";
import { ModulePage } from "@/components/module/ModulePage";
import { aiPage } from "@/data/modules/ai";

export const metadata: Metadata = {
  title: "AI",
  description: aiPage.description,
};

export default function AIPage() {
  return <ModulePage data={aiPage} />;
}
