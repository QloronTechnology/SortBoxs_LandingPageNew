import { BellRing, Compass, Eye, Gauge, Lightbulb, ListFilter, Rocket, ShieldCheck, Sparkles, Target, ThumbsUp, TrendingUp } from "lucide-react";
import type { ModuleLandingData } from "@/types/moduleLanding";

/** Content for /ai-recommendations. Layout lives in components/module-landing/. Figures are illustrative. */

export const aiRecommendationsLanding: ModuleLandingData = {
  slug: "ai-recommendations",
  name: "AI Recommendations",
  icon: Lightbulb,
  iconTone: "bg-violet-100 text-violet-700",
  hero: {
    eyebrow: "SortBoxs AI Recommendations",
    title: "The next best action, for",
    highlight: "every person, every day.",
    description:
      "SortBoxs watches what's happening across your business and suggests what to do next, with the reason, the expected impact and a one-click way to act on it.",
    points: ["Suggestions ranked by expected impact", "Every suggestion explains why", "Accept, snooze or dismiss in one click"],
  },
  lifecycle: {
    eyebrow: "How it works",
    title: "From activity to a clear next step",
    intro: "Recommendations get better as your team accepts the helpful ones and dismisses the rest.",
    steps: [
      { icon: Eye, title: "Observe", body: "It watches deals, tickets, invoices, stock and people data for signals worth acting on." },
      { icon: Target, title: "Score", body: "Each opportunity or risk is scored by how likely it is and how much it's worth." },
      { icon: Lightbulb, title: "Suggest", body: "The best actions appear in a short feed, each with a reason and an expected result." },
      { icon: ThumbsUp, title: "Learn", body: "Accepting, snoozing or dismissing teaches it what's useful to you." },
    ],
  },
  explorer: {
    eyebrow: "Recommendation feed",
    title: "Suggestions for every team",
    intro: "Pick a team to see the kinds of next-best-actions it receives.",
    label: "Teams",
    metricLabel: "Acted on",
    itemLabel: "suggestions",
    tabs: [
      {
        key: "sales",
        label: "Sales",
        summary: "Who to talk to and what to say.",
        total: "74%",
        tone: "bg-brand-purple",
        items: [
          { title: "Call Zenith Pharma today", meta: "Hot lead", value: "+₹1.6L", note: "Visited pricing twice this week" },
          { title: "Offer a bundle to Helix Motors", meta: "Upsell", value: "+₹2.4L", note: "Bought the starter plan 6 months ago" },
          { title: "Re-engage Meridian Steel", meta: "At risk", value: "₹2.1L", note: "No reply for 9 days" },
        ],
      },
      {
        key: "service",
        label: "Support",
        summary: "Keep customers happy and SLAs met.",
        total: "81%",
        tone: "bg-sky-500",
        items: [
          { title: "Reassign ticket #2041", meta: "SLA risk", value: "42 min", note: "Priya has the most capacity" },
          { title: "Publish a help article", meta: "Self-service", value: "-18 tickets", note: "Password resets are the top topic" },
          { title: "Call Acme Corp", meta: "Churn risk", value: "₹6.2L", note: "Three complaints in a month" },
        ],
      },
      {
        key: "finance",
        label: "Finance",
        summary: "Cash in faster, costs under control.",
        total: "69%",
        tone: "bg-emerald-500",
        items: [
          { title: "Remind Northwind Logistics", meta: "Collections", value: "₹2.1L", note: "Paid late the last 3 times" },
          { title: "Switch vendor for stationery", meta: "Savings", value: "-6%", note: "A cheaper supplier is available" },
          { title: "Review duplicate bill", meta: "Control", value: "₹48K", note: "Two bills from the same vendor" },
        ],
      },
      {
        key: "people",
        label: "People",
        summary: "Support teams and keep talent.",
        total: "66%",
        tone: "bg-rose-500",
        items: [
          { title: "Schedule a check-in with Arjun", meta: "Attrition risk", value: "Medium", note: "Missed check-ins this month" },
          { title: "Start the review for Priya", meta: "Probation", value: "Due Friday", note: "Manager not yet reminded" },
          { title: "Assign a course to the support team", meta: "Learning", value: "12 people", note: "Skill gap found in escalations" },
        ],
      },
    ],
  },
  capabilities: {
    eyebrow: "Guidance, not noise",
    title: "A short list of things worth doing",
    intro: "Recommendations are ranked, explained and easy to act on, so people trust them and use them.",
    items: [
      { icon: Compass, title: "Next Best Action", body: "One clear suggestion for each deal, ticket, invoice and person, based on what's happening now." },
      { icon: Gauge, title: "Impact Ranking", body: "Suggestions are ordered by the expected value, so the most important sits at the top." },
      { icon: ListFilter, title: "Reasons Included", body: "Every suggestion explains the signals behind it, so you can judge it for yourself." },
      { icon: Rocket, title: "One-Click Actions", body: "Draft the email, create the task or start the workflow straight from the suggestion." },
      { icon: BellRing, title: "Right Time, Right Place", body: "Suggestions appear inside the module you're working in, and in a daily digest." },
      { icon: TrendingUp, title: "Learns From Your Choices", body: "Accepted and dismissed suggestions tune what you see next." },
    ],
  },
  ai: {
    eyebrow: "Transparent suggestions",
    title: "Advice you can understand and overrule",
    description: "A recommendation is only useful if you can see why it was made. You're always free to ignore it.",
    points: [
      "Shows the signals behind every suggestion",
      "Gives a confidence level and the expected impact",
      "Never takes action without your say-so",
      "Stops suggesting things you keep dismissing",
    ],
    cards: [
      { icon: Sparkles, tone: "bg-brand-purple-light text-brand-purple", title: "Why this suggestion", body: "Zenith Pharma visited pricing twice and opened your last email. Similar leads converted 3 in 5 times." },
      { icon: Gauge, tone: "bg-sky-100 text-sky-700", title: "Confidence and impact", body: "82% confidence, worth about ₹1.6L if the deal closes this quarter." },
      { icon: ShieldCheck, tone: "bg-emerald-100 text-emerald-700", title: "You decide", body: "Nothing is sent or changed until you accept. Snooze it and it returns tomorrow." },
    ],
  },
  connected: {
    eyebrow: "Part of one platform",
    title: "Suggestions wherever you work",
    intro: "Recommendations appear inside each module, using signals from all of them.",
    slugs: ["crm", "sales", "service", "finance", "hrms"],
    links: {
      crm: "Next steps on every customer",
      sales: "Which deals to push, and how",
      service: "Reassignments and article suggestions",
      finance: "Who to chase and where to save",
      hrms: "Check-ins, reviews and learning",
    },
  },
};
