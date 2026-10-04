import type { Metadata } from "next";
import { ModuleLandingPage } from "@/components/module-landing/ModuleLandingPage";
import { ProjectsDashboard } from "@/components/module-landing/previews/dashboards/ProjectsDashboard";
import { projectsPage } from "@/data/modules/projects";
import { projectsLanding } from "@/data/landing/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: projectsPage.description,
};

/** Platform → Projects. The site header and footer (with its CTA) come from the root layout. */
export default function ProjectsPage() {
  return <ModuleLandingPage data={projectsLanding} preview={<ProjectsDashboard />} />;
}
