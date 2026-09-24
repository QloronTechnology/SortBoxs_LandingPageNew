import { assets } from "@/config/assets";
import type { ModulePageData } from "@/types/module";

export const hrmsPage: ModulePageData = {
  slug: "hrms",
  name: "HRMS",
  badge: "HRMS",
  icon: assets.modules.hrms,
  heading: "Modern HRMS for the entire employee lifecycle.",
  description:
    "From recruitment to payroll, Sortboxs HRMS helps you manage, engage and grow your workforce.",
  features: [
    "Recruitment & Onboarding",
    "Employee Management",
    "Attendance & Leave",
    "Payroll & Compliance",
    "Performance Management",
    "Learning & Development",
  ],
  cta: "Explore HRMS",
  dashboardImage: assets.dashboards.hrms,
};
