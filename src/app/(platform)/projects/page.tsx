import type { Metadata } from "next";
import { ModulePage } from "@/components/module/ModulePage";
import { projectsPage } from "@/data/modules/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: projectsPage.description,
};

export default function ProjectsPage() {
  return <ModulePage data={projectsPage} />;
}
