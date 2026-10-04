import { ChartColumn, Clock, Gauge, LayoutTemplate, Mail, Megaphone, MousePointerClick, Sparkles, Target, UserPlus, Users, Workflow } from "lucide-react";
import type { ModuleLandingData } from "@/types/moduleLanding";

/** Content for /marketing-module (Platform → Marketing). Layout lives in components/module-landing/. Figures are illustrative. */

export const marketingLanding: ModuleLandingData = {
  slug: "marketing",
  name: "Marketing",
  hero: {
    eyebrow: "SortBoxs Marketing",
    title: "Run campaigns and",
    highlight: "grow your brand.",
    description: "Run targeted campaigns and convert leads with connected marketing tools.",
    points: ["Email, landing pages and campaigns together", "Lead scoring that hands over to Sales", "Campaign results tied to revenue"],
  },
  lifecycle: {
    eyebrow: "How it works",
    title: "From a campaign to a customer",
    intro: "Every lead keeps its campaign history as it moves to Sales, so you can see what really drives revenue.",
    steps: [
      { icon: Megaphone, title: "Campaign", body: "Plan campaigns across email, social and landing pages, with budgets and owners in one calendar." },
      { icon: UserPlus, title: "Leads", body: "Capture leads from forms and pages, deduplicate them and add them to the right audience." },
      { icon: MousePointerClick, title: "Engagement", body: "Track opens, clicks and visits, and score every lead by how much they engage." },
      { icon: Target, title: "Conversion", body: "Hand sales-ready leads to your team and see which campaigns turned into closed deals." },
    ],
  },
  explorer: {
    eyebrow: "Campaign pipeline",
    title: "Every campaign, from draft to results",
    intro: "Pick a stage to see the campaigns in it, with their channel, owner and reach.",
    label: "Campaign stages",
    metricLabel: "Total reach",
    itemLabel: "campaigns",
    tabs: [
      {
        key: "draft",
        label: "Draft",
        summary: "Being planned and written.",
        total: "—",
        tone: "bg-slate-400",
        items: [
          { title: "Year-end offer", meta: "Email · Neha K.", value: "Draft", note: "Copy in review" },
          { title: "Partner webinar", meta: "Landing page · Arjun P.", value: "Draft", note: "Waiting on speaker slides" },
          { title: "Case study push", meta: "Social · Meera N.", value: "Draft", note: "3 of 5 posts written" },
        ],
      },
      {
        key: "scheduled",
        label: "Scheduled",
        summary: "Approved and queued to go out.",
        total: "42K",
        tone: "bg-sky-500",
        items: [
          { title: "Product update", meta: "Email · Neha K.", value: "18K", note: "Sends Tuesday 10:00" },
          { title: "Re-engagement series", meta: "Email · Arjun P.", value: "9K", note: "3-step automation" },
          { title: "Event reminder", meta: "SMS · Meera N.", value: "15K", note: "Sends 1 day before" },
        ],
      },
      {
        key: "live",
        label: "Live",
        summary: "Running right now.",
        total: "68K",
        tone: "bg-emerald-500",
        items: [
          { title: "Festive offer", meta: "Email · Neha K.", value: "38% open", note: "412 clicks so far" },
          { title: "Webinar launch", meta: "Landing page · Arjun P.", value: "24% CTR", note: "286 registrations" },
          { title: "Retargeting ads", meta: "Paid · Meera N.", value: "₹1.8L", note: "Cost per lead down 12%" },
        ],
      },
      {
        key: "done",
        label: "Completed",
        summary: "Finished, with results.",
        total: "1.2L",
        tone: "bg-brand-purple",
        items: [
          { title: "Spring launch", meta: "Email · Neha K.", value: "6.1%", note: "Conversion rate" },
          { title: "Customer stories", meta: "Social · Meera N.", value: "214", note: "Leads generated" },
          { title: "Trade show follow-up", meta: "Email · Arjun P.", value: "₹4.6L", note: "Pipeline created" },
        ],
      },
    ],
  },
  capabilities: {
    eyebrow: "Everything marketing needs",
    title: "Plan, launch and measure in one place",
    intro: "Your campaigns, content and results live next to your customer data, so marketing and sales finally share one view.",
    items: [
      { icon: Megaphone, title: "Campaign Management", body: "Plan campaigns on a shared calendar with budgets, owners, assets and approvals." },
      { icon: Mail, title: "Email Marketing", body: "Build and send emails to segmented audiences, with templates and A/B tests." },
      { icon: Gauge, title: "Lead Scoring", body: "Score leads on behaviour and fit, so sales talks to the right people first." },
      { icon: LayoutTemplate, title: "Landing Pages", body: "Launch landing pages and forms that feed straight into your lead list." },
      { icon: Workflow, title: "Marketing Automation", body: "Nurture leads with triggered journeys based on what they open, click and visit." },
      { icon: ChartColumn, title: "Campaign Analytics", body: "See reach, engagement, cost per lead and revenue influenced, by campaign and channel." },
    ],
  },
  ai: {
    eyebrow: "AI for marketing",
    title: "Send the right message at the right moment",
    description: "SortBoxs AI learns from every campaign so each send performs a little better than the last.",
    points: [
      "Suggests the best time to send for each audience",
      "Drafts subject lines and copy variants to test",
      "Finds look-alike audiences from your best customers",
      "Flags campaigns that are underperforming early",
    ],
    cards: [
      { icon: Clock, tone: "bg-sky-100 text-sky-700", title: "Best send time", body: "This audience opens most between 9 and 10 AM. Festive offer rescheduled." },
      { icon: Sparkles, tone: "bg-brand-purple-light text-brand-purple", title: "Subject line ideas", body: "Three variants drafted for the product update. Start an A/B test?" },
      { icon: Users, tone: "bg-emerald-100 text-emerald-700", title: "Audience suggestion", body: "412 contacts look like your best customers and aren't in any campaign yet." },
    ],
  },
  connected: {
    eyebrow: "Part of one platform",
    title: "Marketing that hands over to revenue",
    intro: "Leads, campaigns and customers share one record, so nobody asks where a lead came from.",
    slugs: ["crm", "sales", "analytics", "automation", "ai"],
    links: {
      crm: "Every lead lands with its campaign history",
      sales: "Sales-ready leads go straight to the right rep",
      analytics: "Campaign ROI next to pipeline and revenue",
      automation: "Nurture journeys triggered by behaviour",
      ai: "Copy, timing and audience suggestions",
    },
  },
};
