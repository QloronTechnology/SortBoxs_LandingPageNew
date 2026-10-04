import type { Metadata } from "next";
import { ModuleLandingPage } from "@/components/module-landing/ModuleLandingPage";
import { AIAgentsDashboard } from "@/components/module-landing/previews/dashboards/AIAgentsDashboard";
import { aiAgentsLanding } from "@/data/landing/ai-agents";

export const metadata: Metadata = {
  title: "AI Agents",
  description: aiAgentsLanding.hero.description,
};

/** Platform → AI-Powered Capabilities → AI Agents. The site header and footer come from the root layout. */
export default function AiAgentsPage() {
  return <ModuleLandingPage data={aiAgentsLanding} preview={<AIAgentsDashboard />} />;
}
