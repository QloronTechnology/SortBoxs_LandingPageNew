import type { Metadata } from "next";
import { ModuleLandingPage } from "@/components/module-landing/ModuleLandingPage";
import { MicroservicesDashboard } from "@/components/module-landing/previews/dashboards/MicroservicesDashboard";
import { microservicesLanding } from "@/data/landing/microservices";

export const metadata: Metadata = {
  title: "Microservices Architecture",
  description: microservicesLanding.hero.description,
};

/** Platform → Technology & Infrastructure → Microservices Architecture. The site header and footer come from the root layout. */
export default function MicroservicesArchitecturePage() {
  return <ModuleLandingPage data={microservicesLanding} preview={<MicroservicesDashboard />} />;
}
