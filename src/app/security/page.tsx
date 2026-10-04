import type { Metadata } from "next";
import { HomeSecurity } from "@/components/home/HomeSecurity";
import { ModuleLandingPage } from "@/components/module-landing/ModuleLandingPage";
import { SecurityDashboard } from "@/components/module-landing/previews/dashboards/SecurityDashboard";
import { securityLanding } from "@/data/landing/security";

export const metadata: Metadata = {
  title: "Enterprise Security",
  description: securityLanding.hero.description,
};

/** Platform → Technology & Infrastructure → Enterprise Security. Ends with the certification band from the home page. */
export default function SecurityPage() {
  return (
    <>
      <ModuleLandingPage data={securityLanding} preview={<SecurityDashboard />} />
      <HomeSecurity />
    </>
  );
}
