import type { Metadata } from "next";
import { ModulePage } from "@/components/module/ModulePage";
import { aiInterviewPage } from "@/data/modules/ai-interview";

export const metadata: Metadata = {
  title: "AI Interview",
  description: aiInterviewPage.description,
};

export default function AIInterviewPage() {
  return <ModulePage data={aiInterviewPage} />;
}
