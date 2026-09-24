import { assets } from "@/config/assets";
import type { ModulePageData } from "@/types/module";

export const projectsPage: ModulePageData = {
  slug: "projects",
  name: "Projects",
  badge: "PROJECTS",
  icon: assets.modules.projects,
  heading: "Plan, track and deliver on time.",
  description: "Keep every project, task and deadline visible in one collaborative workspace.",
  features: [
    "Project Planning",
    "Task Management",
    "Timesheets",
    "Resource Allocation",
    "Milestone Tracking",
    "Team Collaboration",
  ],
  cta: "Explore Projects",
  dashboardImage: assets.moduleIllustrations.projects,
};
