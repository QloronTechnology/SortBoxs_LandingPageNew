import { ClipboardCheck, LayoutGrid, MailCheck, MessagesSquare, MonitorPlay } from "lucide-react";
import { modules } from "@/data/modules";
import type { IconType } from "@/types/common";

/** Copy and options for the Book a Demo modal (components/demo). */
export const bookDemoCopy = {
  title: "Book a Demo",
  intro:
    "Get a personalized walkthrough and see how SortBoxs can help you connect your teams, automate workflows, and grow your business.",
  formIntro:
    "Select a convenient date and time and tell us a few details. Our team will set up a personalized demo for you.",
  success: {
    title: "Demo Request Submitted",
    body: "Thank you. Our team will contact you to confirm your demo.",
  },
} as const;

/**
 * "What happens next" on the success screen. Kept to what the flow actually does (the team confirms
 * the demo by email); no promised response times.
 */
export const bookDemoNextSteps: { icon: IconType; title: string; body: string }[] = [
  { icon: ClipboardCheck, title: "Request received", body: "We have your preferred slot and details." },
  { icon: MailCheck, title: "Confirmation by email", body: "Our team confirms the time with you." },
  { icon: MonitorPlay, title: "Your personalized demo", body: "A SortBoxs specialist walks you through it." },
];

export const bookDemoBenefits: { icon: IconType; label: string }[] = [
  { icon: MonitorPlay, label: "Personalized product walkthrough" },
  { icon: LayoutGrid, label: "Explore modules relevant to your business" },
  { icon: MessagesSquare, label: "Get answers from a SortBoxs specialist" },
];

export const companySizes = ["1–10", "11–50", "51–200", "201–500", "501–1000", "1000+"] as const;

/** "Interested In" options: the SortBoxs modules the site already lists (src/data/modules.ts), with their icons. */
export const demoModuleOptions = modules.map((module) => ({
  value: module.slug,
  label: module.name,
  icon: module.icon,
  iconBg: module.iconBg,
}));

/** Slot length shown in "Available time slots (30 minutes)". */
export const demoSlotMinutes = 30;

/** How far ahead the date picker lets people book. */
export const demoBookingWindowDays = 60;
