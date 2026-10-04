import type { Metadata } from "next";
import { ModuleLandingPage } from "@/components/module-landing/ModuleLandingPage";
import { VisionDashboard } from "@/components/module-landing/previews/dashboards/VisionDashboard";
import { computerVisionLanding } from "@/data/landing/computer-vision";

export const metadata: Metadata = {
  title: "Computer Vision",
  description: computerVisionLanding.hero.description,
};

/** Platform → AI-Powered Capabilities → Computer Vision. The site header and footer come from the root layout. */
export default function ComputerVisionPage() {
  return <ModuleLandingPage data={computerVisionLanding} preview={<VisionDashboard />} />;
}
