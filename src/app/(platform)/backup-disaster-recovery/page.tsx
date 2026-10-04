import type { Metadata } from "next";
import { ModuleLandingPage } from "@/components/module-landing/ModuleLandingPage";
import { BackupDashboard } from "@/components/module-landing/previews/dashboards/BackupDashboard";
import { backupRecoveryLanding } from "@/data/landing/backup-recovery";

export const metadata: Metadata = {
  title: "Backup & Disaster Recovery",
  description: backupRecoveryLanding.hero.description,
};

/** Platform → Technology & Infrastructure → Backup & Disaster Recovery. The site header and footer come from the root layout. */
export default function BackupDisasterRecoveryPage() {
  return <ModuleLandingPage data={backupRecoveryLanding} preview={<BackupDashboard />} />;
}
