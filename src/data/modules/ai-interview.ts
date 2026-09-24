import { assets } from "@/config/assets";
import type { ModulePageData } from "@/types/module";

export const aiInterviewPage: ModulePageData = {
  slug: "ai-interview",
  name: "AI Interview",
  badge: "AI INTERVIEW",
  icon: assets.modules.aiInterview,
  heading: "Transform recruitment with AI-powered interviews.",
  description:
    "Reduce hiring time, improve candidate quality and make data-driven hiring decisions with AI interviews.",
  features: [
    "Resume Screening",
    "AI-Powered Interviews",
    "Technical Assessment",
    "Coding Evaluation",
    "Instant AI Feedback",
    "Recruiter Collaboration",
  ],
  cta: "Explore AI Interview",
  dashboardImage: assets.dashboards.aiInterview,
};
