import { Archive, CalendarClock, Camera, Copy, DatabaseBackup, FlaskConical, Globe, History, Lock, RotateCcw } from "lucide-react";
import type { ModuleLandingData } from "@/types/moduleLanding";

/** Content for /backup-disaster-recovery. Layout lives in components/module-landing/. Figures are illustrative. */

export const backupRecoveryLanding: ModuleLandingData = {
  slug: "backup-disaster-recovery",
  name: "Backup & Disaster Recovery",
  icon: DatabaseBackup,
  iconTone: "bg-red-100 text-red-700",
  hero: {
    eyebrow: "SortBoxs Backup & Recovery",
    title: "Back up continuously, and",
    highlight: "recover in minutes.",
    description:
      "Automatic backups, point-in-time recovery and tested disaster plans mean a mistake or an outage never becomes lost data.",
    points: ["Automatic backups, no setup", "Restore to any moment in time", "Disaster recovery drills, on a schedule"],
  },
  lifecycle: {
    eyebrow: "How it works",
    title: "From a backup to a working system again",
    intro: "Protection happens quietly in the background. When you need it, recovery is a few clicks.",
    steps: [
      { icon: Camera, title: "Snapshot", body: "Your data is backed up automatically, with changes captured continuously between snapshots." },
      { icon: Copy, title: "Replicate", body: "Backups are copied to separate storage, and optionally to a second region." },
      { icon: FlaskConical, title: "Test", body: "Restores are rehearsed regularly, because a backup you haven't tested is only a hope." },
      { icon: History, title: "Restore", body: "Choose a point in time and bring back a record, a module or the whole workspace." },
    ],
  },
  explorer: {
    eyebrow: "Recovery in practice",
    title: "From a small slip to a major outage",
    intro: "Pick a situation to see how recovery works and how long it typically takes.",
    label: "Recovery scenarios",
    metricLabel: "Typical time",
    itemLabel: "scenarios",
    tabs: [
      {
        key: "mistake",
        label: "Deleted by mistake",
        summary: "Someone removed something they shouldn't have.",
        total: "Minutes",
        tone: "bg-sky-500",
        items: [
          { title: "A deleted record", meta: "Single item", value: "Seconds", note: "Restore from the recycle bin" },
          { title: "A deleted pipeline", meta: "Bulk change", value: "Minutes", note: "Restore from a snapshot to a sandbox, then copy back" },
          { title: "A bad import", meta: "Many records changed", value: "Minutes", note: "Roll back to just before the import" },
        ],
      },
      {
        key: "corruption",
        label: "Data problem",
        summary: "Something went wrong with the data itself.",
        total: "< 1 hour",
        tone: "bg-amber-500",
        items: [
          { title: "Faulty integration", meta: "Overwrote values", value: "< 1 hour", note: "Restore affected fields from a point in time" },
          { title: "Software bug", meta: "Bad data written", value: "< 1 hour", note: "Roll back and replay the good changes" },
          { title: "Ransomware", meta: "Files encrypted", value: "Hours", note: "Restore from immutable, offline copies" },
        ],
      },
      {
        key: "outage",
        label: "Site outage",
        summary: "A data centre or region is unavailable.",
        total: "< 4 hours",
        tone: "bg-red-500",
        items: [
          { title: "Zone failure", meta: "Within a region", value: "Seconds", note: "Handled by high availability" },
          { title: "Region failure", meta: "Whole region down", value: "< 4 hours", note: "Fail over to the recovery region" },
          { title: "Provider issue", meta: "Cloud outage", value: "< 4 hours", note: "Fail over to another cloud, if multi-cloud" },
        ],
      },
      {
        key: "drills",
        label: "Drills",
        summary: "Proving the plan works.",
        total: "Quarterly",
        tone: "bg-emerald-500",
        items: [
          { title: "Restore test", meta: "Automated", value: "Weekly", note: "A random backup is restored and checked" },
          { title: "Failover drill", meta: "Scheduled", value: "Quarterly", note: "Traffic moved to the recovery site" },
          { title: "Full DR exercise", meta: "With your team", value: "Yearly", note: "A written report is shared with you" },
        ],
      },
    ],
  },
  capabilities: {
    eyebrow: "Protection you don't have to think about",
    title: "Everything needed to get your data back",
    intro: "Backups are automatic, encrypted and tested, and recovery is something you can do yourself.",
    items: [
      { icon: CalendarClock, title: "Automated Backups", body: "Daily full backups plus continuous change capture, with no jobs to schedule." },
      { icon: History, title: "Point-in-Time Recovery", body: "Rewind to any moment within your retention window, down to the minute." },
      { icon: Globe, title: "Cross-Region Copies", body: "Keep a second copy in another region so even a regional disaster can't touch it." },
      { icon: Lock, title: "Encrypted & Immutable", body: "Backups are encrypted, and recent copies can't be altered or deleted, even by an admin." },
      { icon: FlaskConical, title: "Recovery Drills", body: "Regular restore tests and failover exercises, with results shared with you." },
      { icon: Archive, title: "Retention Policies", body: "Choose how long to keep backups, to meet your own and your regulators' needs." },
    ],
  },
  ai: {
    eyebrow: "Recovery targets",
    title: "Clear promises about how much and how fast",
    description: "Two numbers define disaster recovery: how much data you could lose, and how long you could be down. Both are written down.",
    points: [
      "Recovery point objective: minutes of data at most",
      "Recovery time objective: hours for a full-region failure",
      "Targets reviewed and tested every quarter",
      "Reports you can share with auditors and customers",
    ],
    cards: [
      { icon: History, tone: "bg-sky-100 text-sky-700", title: "Restore point", body: "You can restore this workspace to any minute in the last 35 days." },
      { icon: RotateCcw, tone: "bg-emerald-100 text-emerald-700", title: "Last drill", body: "The latest region-failover drill finished in 1h 52m, inside the 4-hour target." },
      { icon: Lock, tone: "bg-brand-purple-light text-brand-purple", title: "Immutable copy", body: "Yesterday's backup is locked for 30 days and can't be changed by anyone." },
    ],
  },
  connected: {
    eyebrow: "Part of one platform",
    title: "Every module covered by the same protection",
    intro: "One backup and recovery plan protects the whole workspace, so nothing is left out.",
    slugs: ["crm", "finance", "hrms", "inventory", "commerce"],
    links: {
      crm: "Restore customers and deals to any moment",
      finance: "Financial records protected and auditable",
      hrms: "Employee data safe, with strict retention",
      inventory: "Stock history that can always be rebuilt",
      commerce: "Orders protected through any incident",
    },
  },
};
