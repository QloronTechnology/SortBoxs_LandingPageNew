import type { Metadata } from "next";
import { ModuleLandingPage } from "@/components/module-landing/ModuleLandingPage";
import { MobileAppsDashboard } from "@/components/module-landing/previews/dashboards/MobileAppsDashboard";
import { mobileDesktopAppsLanding } from "@/data/landing/mobile-desktop-apps";

export const metadata: Metadata = {
  title: "Mobile & Desktop Apps",
  description: mobileDesktopAppsLanding.hero.description,
};

/** Platform → Technology & Infrastructure → Mobile & Desktop Apps. The site header and footer come from the root layout. */
export default function MobileDesktopAppsPage() {
  return <ModuleLandingPage data={mobileDesktopAppsLanding} preview={<MobileAppsDashboard />} />;
}
