import { FileText, LayoutTemplate, Mail, MessageSquareText, PenLine, RefreshCw, ScanText, ShieldCheck, SlidersHorizontal, UserCheck, WandSparkles } from "lucide-react";
import type { ModuleLandingData } from "@/types/moduleLanding";

/** Content for /generative-ai. Layout lives in components/module-landing/. Figures are illustrative. */

export const generativeAiLanding: ModuleLandingData = {
  slug: "generative-ai",
  name: "Generative AI",
  icon: WandSparkles,
  iconTone: "bg-pink-100 text-pink-700",
  hero: {
    eyebrow: "SortBoxs Generative AI",
    title: "Write, summarise and report in",
    highlight: "seconds.",
    description:
      "Draft emails, summaries, job posts and reports from the facts already in SortBoxs, in your tone, ready for you to review and send.",
    points: ["Drafts that use your real data", "Your tone and your templates", "You review before anything goes out"],
  },
  lifecycle: {
    eyebrow: "How it works",
    title: "From a prompt to a polished draft",
    intro: "Generative AI starts from your records, so what it writes is specific and accurate.",
    steps: [
      { icon: PenLine, title: "Prompt", body: "Describe what you need, or pick a template like a follow-up email or a weekly summary." },
      { icon: ScanText, title: "Gather", body: "It pulls in the facts it needs, such as the customer's history or the week's numbers." },
      { icon: WandSparkles, title: "Generate", body: "A draft is written in your chosen tone and length, with the facts filled in." },
      { icon: UserCheck, title: "Review", body: "Edit it, regenerate it or approve it. Nothing is sent until you say so." },
    ],
  },
  explorer: {
    eyebrow: "Templates",
    title: "Start from a draft instead of a blank page",
    intro: "Pick a type of content to see examples of what teams generate every day.",
    label: "Content types",
    metricLabel: "Time saved",
    itemLabel: "templates",
    tabs: [
      {
        key: "email",
        label: "Emails",
        summary: "Messages that sound like you.",
        total: "~6 min each",
        tone: "bg-brand-purple",
        items: [
          { title: "Follow-up after a demo", meta: "Sales", value: "Draft", note: "Mentions what they asked about" },
          { title: "Payment reminder", meta: "Finance", value: "Draft", note: "Polite, with the invoice details" },
          { title: "Apology and fix", meta: "Customer Service", value: "Draft", note: "Acknowledges the issue and next steps" },
        ],
      },
      {
        key: "summary",
        label: "Summaries",
        summary: "Long things made short.",
        total: "~12 min each",
        tone: "bg-sky-500",
        items: [
          { title: "Customer history", meta: "CRM", value: "5 lines", note: "Deals, tickets and last contact" },
          { title: "Ticket thread", meta: "Customer Service", value: "4 lines", note: "From a 40-message conversation" },
          { title: "Meeting notes", meta: "Projects", value: "6 bullets", note: "Decisions and action items" },
        ],
      },
      {
        key: "reports",
        label: "Reports",
        summary: "Numbers turned into narrative.",
        total: "~45 min each",
        tone: "bg-emerald-500",
        items: [
          { title: "Weekly sales report", meta: "Analytics", value: "1 page", note: "Pipeline, wins and risks" },
          { title: "Monthly finance review", meta: "Finance", value: "2 pages", note: "Cash, costs and variances" },
          { title: "People update", meta: "HRMS", value: "1 page", note: "Headcount, hiring and attrition" },
        ],
      },
      {
        key: "hiring",
        label: "Job posts",
        summary: "Roles described clearly.",
        total: "~30 min each",
        tone: "bg-rose-500",
        items: [
          { title: "Frontend Engineer", meta: "Hiring", value: "Draft", note: "From a short brief and your style guide" },
          { title: "Sales Executive", meta: "Hiring", value: "Draft", note: "Responsibilities and requirements" },
          { title: "Offer letter", meta: "HRMS", value: "Draft", note: "Pulls role, salary and start date" },
        ],
      },
    ],
  },
  capabilities: {
    eyebrow: "Generative AI for work",
    title: "Faster first drafts, with you in control",
    intro: "The tedious part of writing is done for you. The judgement stays with you.",
    items: [
      { icon: Mail, title: "Emails & Messages", body: "Drafts that use the customer's history, written in your voice." },
      { icon: FileText, title: "Summaries", body: "Customers, tickets, calls and documents boiled down to what matters." },
      { icon: LayoutTemplate, title: "Reports & Narratives", body: "Turn a week of numbers into a clear written update with the key points." },
      { icon: SlidersHorizontal, title: "Tone & Length", body: "Make it formal or friendly, short or detailed, and set a house style." },
      { icon: RefreshCw, title: "Regenerate & Refine", body: "Ask for another version, or tell it what to change, until it's right." },
      { icon: MessageSquareText, title: "Templates for Your Team", body: "Save your best prompts and share them, so everyone writes consistently." },
    ],
  },
  ai: {
    eyebrow: "Responsible by design",
    title: "Helpful drafts, careful handling",
    description:
      "Generated text is a starting point. SortBoxs keeps you in control of what's said and protects the data used to say it.",
    points: [
      "Nothing is sent or published without your approval",
      "Drafts use only the data you're allowed to see",
      "Facts and figures are linked to their source records",
      "Your content isn't used to train models for others",
    ],
    cards: [
      { icon: UserCheck, tone: "bg-brand-purple-light text-brand-purple", title: "Review before sending", body: "This follow-up is ready as a draft. Edit it, regenerate it or send it." },
      { icon: ScanText, tone: "bg-sky-100 text-sky-700", title: "Sources shown", body: "The ₹3.4L figure comes from deal DL-2041. Click it to check." },
      { icon: ShieldCheck, tone: "bg-emerald-100 text-emerald-700", title: "Your data stays yours", body: "Drafts are generated privately and aren't used to train anyone else's model." },
    ],
  },
  connected: {
    eyebrow: "Part of one platform",
    title: "Drafts that know your business",
    intro: "Because it reads from every module, what it writes is specific, not generic.",
    slugs: ["crm", "sales", "marketing", "service", "hrms"],
    links: {
      crm: "Summaries and follow-ups for every customer",
      sales: "Proposals and follow-up emails",
      marketing: "Campaign copy and subject lines",
      service: "Reply drafts and ticket summaries",
      hrms: "Job posts and offer letters",
    },
  },
};
