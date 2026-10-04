import type { ReactNode } from "react";
import { BarChart3, Calendar, Eye, Flag, Gauge, Handshake, Layers, Mail, Megaphone, MousePointerClick, Route, Send, Sparkles, Target, Users, type LucideIcon } from "lucide-react";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";
import { SampleTag } from "@/components/sales-solution/shared";
import { Crumbs, HeroCopy, NextSteps, type FamilyLink } from "@/components/sales-pages/parts";

/** Shared pieces for the five Marketing solution pages (Campaign Management, Lead Generation, Email Marketing, Customer Journey, Marketing Analytics). */

const parent = { label: "Marketing", href: routes.solutions.marketing };

export const marketingFamily: FamilyLink[] = [
  { label: "Campaign Management", href: routes.solutions.campaignManagement, body: "Plan, launch and track every campaign." },
  { label: "Lead Generation", href: routes.solutions.leadGeneration, body: "Capture, score and hand over leads." },
  { label: "Email Marketing", href: routes.solutions.emailMarketing, body: "Emails and sequences that reach the right people." },
  { label: "Customer Journey", href: routes.solutions.customerJourney, body: "See and shape every step a customer takes." },
  { label: "Marketing Analytics", href: routes.solutions.marketingAnalytics, body: "Know which channels and campaigns work." },
];

const steps: Record<string, { title: string; steps: { icon: LucideIcon; title: string; body: string }[] }> = {
  "Campaign Management": {
    title: "Your first campaign in three steps",
    steps: [
      { icon: Flag, title: "Set the goal and budget", body: "Say what the campaign is for, who owns it and what it can spend." },
      { icon: Calendar, title: "Plan it on the calendar", body: "Add the channels and dates, and assign the tasks that get it ready." },
      { icon: Gauge, title: "Launch and track", body: "Watch spend and progress as it runs, and review the results when it ends." },
    ],
  },
  "Lead Generation": {
    title: "Capturing leads in three steps",
    steps: [
      { icon: MousePointerClick, title: "Add a capture form", body: "Put a form on your site or landing page and choose the fields you need." },
      { icon: Target, title: "Set your scoring", body: "Decide which actions and details make a lead worth a call." },
      { icon: Handshake, title: "Hand over to sales", body: "Leads that reach your threshold go to the right rep with their full history." },
    ],
  },
  "Email Marketing": {
    title: "Your first email in three steps",
    steps: [
      { icon: Users, title: "Choose your audience", body: "Pick a segment, such as new leads or customers, to send to." },
      { icon: Mail, title: "Build the email", body: "Assemble it from blocks and personalise it with the recipient's details." },
      { icon: Send, title: "Send and follow up", body: "Send it now or schedule it, then see who opened and clicked." },
    ],
  },
  "Customer Journey": {
    title: "Mapping a journey in three steps",
    steps: [
      { icon: Layers, title: "Define the stages", body: "Set the stages a customer moves through, from first contact to loyalty." },
      { icon: Route, title: "Add the touchpoints", body: "List the emails, pages and calls that happen at each stage." },
      { icon: Sparkles, title: "Add triggers", body: "Choose what should happen automatically when a customer takes a step." },
    ],
  },
  "Marketing Analytics": {
    title: "Seeing your results in three steps",
    steps: [
      { icon: Megaphone, title: "Run your campaigns", body: "Campaigns, forms and emails already feed the numbers. There is nothing extra to set up." },
      { icon: BarChart3, title: "Open your dashboard", body: "See leads, spend and conversion by channel and by campaign." },
      { icon: Eye, title: "Review and adjust", body: "Move budget towards what works, and stop what does not." },
    ],
  },
};

export function MarketingCrumbs({ current }: { current: string }) {
  return <Crumbs current={current} parent={parent} />;
}

export function MarketingNextSteps({ current, tone }: { current: string; tone?: "white" | "surface" }) {
  return <NextSteps current={current} content={steps[current]} family={marketingFamily} familyLabel="More from SortBoxs Marketing" tone={tone} />;
}

/** Hero: text on the left, a product visual on the right, on the soft lavender used across the solution pages. */
export function HeroShell({
  current,
  icon,
  iconTone,
  title,
  highlight,
  description,
  visual,
  crumbs,
}: {
  crumbs?: ReactNode;
  current: string;
  icon: LucideIcon;
  iconTone: string;
  title: string;
  highlight: string;
  description: string;
  visual: ReactNode;
}) {
  return (
    <section className="overflow-hidden bg-[linear-gradient(180deg,#f4f1ff_0%,#faf9ff_100%)]">
      <div className="container-page grid items-center gap-12 pt-8 pb-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12 lg:pt-10 lg:pb-16">
        <div>
          {crumbs ?? <MarketingCrumbs current={current} />}
          <HeroCopy icon={icon} iconTone={iconTone} eyebrow={current} title={title} highlight={highlight} description={description} />
        </div>
        <div className="relative mx-auto w-full max-w-[620px] lg:justify-self-end">
          <span aria-hidden className="absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(ellipse_at_center,#e2dcfb_0%,rgba(226,220,251,0)_70%)]" />
          {visual}
        </div>
      </div>
    </section>
  );
}

/** Browser-style frame used by the hero visuals. */
export function MockWindow({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-3xl bg-white shadow-[0_30px_70px_-34px_rgba(23,22,92,0.5)] ring-1 ring-brand-border", className)}>
      <div className="flex items-center justify-between gap-3 border-b border-brand-border bg-brand-surface px-4 py-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex shrink-0 gap-1" aria-hidden>
            <span className="size-2.5 rounded-full bg-rose-300" />
            <span className="size-2.5 rounded-full bg-amber-300" />
            <span className="size-2.5 rounded-full bg-emerald-300" />
          </span>
          <p className="truncate text-sm font-bold text-brand-text">{title}</p>
        </div>
        <SampleTag />
      </div>
      {children}
    </div>
  );
}

export const channelTone = {
  Email: { bar: "bg-violet-500", soft: "bg-violet-100 text-violet-700", dot: "bg-violet-500" },
  Social: { bar: "bg-sky-500", soft: "bg-sky-100 text-sky-700", dot: "bg-sky-500" },
  Ads: { bar: "bg-amber-500", soft: "bg-amber-100 text-amber-700", dot: "bg-amber-500" },
  Events: { bar: "bg-emerald-500", soft: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500" },
} as const;
export type Channel = keyof typeof channelTone;


