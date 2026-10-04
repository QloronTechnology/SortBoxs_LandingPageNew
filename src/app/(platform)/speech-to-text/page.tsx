import type { Metadata } from "next";
import { ModuleLandingPage } from "@/components/module-landing/ModuleLandingPage";
import { VoiceDashboard } from "@/components/module-landing/previews/dashboards/VoiceDashboard";
import { speechLanding } from "@/data/landing/speech";

export const metadata: Metadata = {
  title: "Speech-to-Text & Text-to-Speech",
  description: speechLanding.hero.description,
};

/** Platform → AI-Powered Capabilities → Speech-to-Text & Text-to-Speech. The site header and footer come from the root layout. */
export default function SpeechToTextPage() {
  return <ModuleLandingPage data={speechLanding} preview={<VoiceDashboard />} />;
}
