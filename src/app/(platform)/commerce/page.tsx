import type { Metadata } from "next";
import { ModulePage } from "@/components/module/ModulePage";
import { commercePage } from "@/data/modules/commerce";

export const metadata: Metadata = {
  title: "Commerce",
  description: commercePage.description,
};

export default function CommercePage() {
  return <ModulePage data={commercePage} />;
}
