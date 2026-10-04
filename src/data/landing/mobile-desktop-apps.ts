import { BellRing, Fingerprint, LogIn, MonitorSmartphone, RefreshCw, Smartphone, Laptop, WifiOff } from "lucide-react";
import type { ModuleLandingData } from "@/types/moduleLanding";

/** Content for /mobile-desktop-apps. Layout lives in components/module-landing/. Figures are illustrative. */

export const mobileDesktopAppsLanding: ModuleLandingData = {
  slug: "mobile-desktop-apps",
  name: "Mobile & Desktop Apps",
  icon: MonitorSmartphone,
  iconTone: "bg-blue-100 text-blue-700",
  hero: {
    eyebrow: "SortBoxs Apps",
    title: "Your work, on every",
    highlight: "screen you use.",
    description:
      "Native apps for phone, tablet and desktop keep your team productive in the office, on the road and wherever the network isn't.",
    points: ["Apps for iPhone, Android and desktop", "Keep working offline, and sync later", "Push notifications that matter"],
  },
  lifecycle: {
    eyebrow: "How it works",
    title: "From sign-in to getting things done",
    intro: "One account, the same data and the same permissions on every device.",
    steps: [
      { icon: LogIn, title: "Sign in", body: "Use your company sign-in, with single sign-on and biometrics, on any device." },
      { icon: RefreshCw, title: "Sync", body: "Your records, tasks and files are kept in step across every device in real time." },
      { icon: WifiOff, title: "Work offline", body: "Keep viewing and editing without a connection, and changes upload when you're back online." },
      { icon: BellRing, title: "Get notified", body: "Approvals, mentions and deadlines reach you as push notifications, wherever you are." },
    ],
  },
  explorer: {
    eyebrow: "Every device",
    title: "The right app for the way you work",
    intro: "Pick a device to see what the app does best.",
    label: "Devices",
    metricLabel: "Best for",
    itemLabel: "features",
    tabs: [
      {
        key: "phone",
        label: "Phone",
        summary: "iPhone and Android.",
        total: "On the move",
        tone: "bg-brand-purple",
        items: [
          { title: "Approvals", meta: "One tap", value: "Push", note: "Approve leave, expenses and orders" },
          { title: "Check-in", meta: "Attendance", value: "Location", note: "Clock in from the field" },
          { title: "Scan", meta: "Camera", value: "Built in", note: "Capture receipts and business cards" },
        ],
      },
      {
        key: "tablet",
        label: "Tablet",
        summary: "iPad and Android tablets.",
        total: "Meetings",
        tone: "bg-sky-500",
        items: [
          { title: "Dashboards", meta: "Roomy layout", value: "Full", note: "Sales and ops dashboards at a glance" },
          { title: "Presenting", meta: "Customer visits", value: "Ready", note: "Show a proposal and capture a signature" },
          { title: "Field work", meta: "Rugged use", value: "Offline", note: "Inspections and stock counts" },
        ],
      },
      {
        key: "desktop",
        label: "Desktop",
        summary: "Windows and macOS.",
        total: "Deep work",
        tone: "bg-emerald-500",
        items: [
          { title: "Quick launch", meta: "Keyboard shortcuts", value: "Instant", note: "Search and jump anywhere" },
          { title: "Notifications", meta: "System tray", value: "Native", note: "Never miss a ticket or mention" },
          { title: "Multi-window", meta: "Side by side", value: "Yes", note: "Open a deal and an email together" },
        ],
      },
      {
        key: "browser",
        label: "Browser",
        summary: "Any modern browser.",
        total: "Anywhere",
        tone: "bg-amber-500",
        items: [
          { title: "No install", meta: "Just sign in", value: "Instant", note: "Use any computer, anywhere" },
          { title: "Always current", meta: "Updates itself", value: "Latest", note: "No update to download" },
          { title: "Responsive", meta: "Adapts to any size", value: "Fluid", note: "Works on a phone browser too" },
        ],
      },
    ],
  },
  capabilities: {
    eyebrow: "Apps people want to use",
    title: "Powerful on a desk, practical in a pocket",
    intro: "Designed for each device, not squeezed onto it, and kept in step by the same platform.",
    items: [
      { icon: Smartphone, title: "Native Mobile Apps", body: "Fast, familiar apps for iPhone and Android, built for one-handed use." },
      { icon: Laptop, title: "Desktop Apps", body: "Windows and macOS apps with keyboard shortcuts, native notifications and multi-window support." },
      { icon: WifiOff, title: "Offline Mode", body: "Open, edit and create records with no signal. Everything syncs when you reconnect." },
      { icon: BellRing, title: "Push Notifications", body: "Choose which approvals, mentions and alerts reach your phone and desktop." },
      { icon: Fingerprint, title: "Biometric Sign-In", body: "Unlock with a fingerprint or face, backed by your company's single sign-on." },
      { icon: RefreshCw, title: "Real-Time Sync", body: "A change on one device appears on the others within moments." },
    ],
  },
  ai: {
    eyebrow: "Secure on every device",
    title: "Business data, safe in your pocket",
    description: "Phones get lost. The apps are built so a missing device doesn't mean missing data.",
    points: [
      "Data on the device is encrypted",
      "Remote sign-out and wipe for lost devices",
      "Admins can require a passcode or biometrics",
      "Offline changes are queued safely and never lost",
    ],
    cards: [
      { icon: Fingerprint, tone: "bg-blue-100 text-blue-700", title: "Biometric lock", body: "The app locks after 2 minutes away. Face or fingerprint unlocks it." },
      { icon: WifiOff, tone: "bg-amber-100 text-amber-700", title: "Offline queue", body: "You're offline. 3 changes are saved on this device and will sync when you reconnect." },
      { icon: RefreshCw, tone: "bg-emerald-100 text-emerald-700", title: "Remote wipe", body: "An admin signed this lost phone out of SortBoxs and removed its local data." },
    ],
  },
  connected: {
    eyebrow: "Part of one platform",
    title: "Every module, in your pocket",
    intro: "The same modules, data and permissions follow you to every device.",
    slugs: ["crm", "sales", "hrms", "service", "inventory"],
    links: {
      crm: "Look up a customer before a meeting",
      sales: "Update a deal from the road",
      hrms: "Check in, apply for leave and approve",
      service: "Answer and resolve tickets on the go",
      inventory: "Scan and count stock with a phone",
    },
  },
};
