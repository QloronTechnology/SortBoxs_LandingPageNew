import type { Metadata } from "next";
import { ModuleLandingPage } from "@/components/module-landing/ModuleLandingPage";
import { DevOpsDashboard } from "@/components/module-landing/previews/dashboards/DevOpsDashboard";
import { devopsLanding } from "@/data/landing/devops-cicd";

export const metadata: Metadata = {
  title: "DevOps & CI/CD",
  description: devopsLanding.hero.description,
};

/** Platform → Technology & Infrastructure → DevOps & CI/CD. The site header and footer come from the root layout. */
export default function DevopsCicdPage() {
  return <ModuleLandingPage data={devopsLanding} preview={<DevOpsDashboard />} />;
}
