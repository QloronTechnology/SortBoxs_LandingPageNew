import type { Metadata } from "next";
import { ModuleLandingPage } from "@/components/module-landing/ModuleLandingPage";
import { PerformanceDashboard } from "@/components/module-landing/previews/dashboards/PerformanceDashboard";
import { performanceMonitoringLanding } from "@/data/landing/performance-monitoring";

export const metadata: Metadata = {
  title: "Performance Monitoring",
  description: performanceMonitoringLanding.hero.description,
};

/** Platform → Technology & Infrastructure → Performance Monitoring. The site header and footer come from the root layout. */
export default function PerformanceMonitoringPage() {
  return <ModuleLandingPage data={performanceMonitoringLanding} preview={<PerformanceDashboard />} />;
}
