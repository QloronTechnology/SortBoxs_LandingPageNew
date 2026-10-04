"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, BarChart3, Calendar, Check, ChevronDown, Magnet, Mail, Route, type LucideIcon } from "lucide-react";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";
import { SampleTag, SectionHead } from "@/components/sales-solution/shared";

/** Small product mockups, one per solution. They are illustrations with sample data. */
export const capabilityMocks: Record<string, ReactNode> = {
  campaign: (
    <div className="space-y-2">
      {[
        ["Email", "Diwali offer", "ml-[28%] w-[52%]", "bg-violet-500"],
        ["Social", "Festive reels", "ml-[40%] w-[46%]", "bg-sky-500"],
        ["Ads", "Search: demo", "ml-[10%] w-[70%]", "bg-amber-500"],
        ["Events", "City roadshow", "ml-[55%] w-[38%]", "bg-emerald-500"],
      ].map(([channel, name, place, tone]) => (
        <div key={channel} className="flex items-center gap-2">
          <span className="w-11 shrink-0 text-[10px] font-bold text-brand-muted">{channel}</span>
          <span className="relative h-6 flex-1 rounded-md bg-brand-surface">
            <span className={cn("absolute inset-y-0.5 flex items-center overflow-hidden rounded px-1.5 text-[9px] font-bold whitespace-nowrap text-white", place, tone)}>{name}</span>
          </span>
        </div>
      ))}
    </div>
  ),
  lead: (
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-xl bg-brand-surface p-2.5">
        <p className="text-[10px] font-bold text-brand-text">Request a demo</p>
        <span className="mt-1.5 block h-5 rounded bg-white ring-1 ring-brand-border" />
        <span className="mt-1.5 block h-5 rounded bg-white ring-1 ring-brand-border" />
        <span className="mt-1.5 block h-6 rounded bg-brand-purple" />
      </div>
      <div className="flex flex-col items-center justify-center rounded-xl bg-brand-surface p-2.5 text-center">
        <span className="flex size-12 items-center justify-center rounded-full border-4 border-brand-purple text-sm font-extrabold text-brand-text">78</span>
        <span className="mt-1.5 rounded-full bg-rose-100 px-2 py-0.5 text-[9px] font-bold text-rose-700">Hot lead</span>
        <span className="mt-1 text-[9px] text-brand-muted">Sent to sales</span>
      </div>
    </div>
  ),
  email: (
    <div className="mx-auto max-w-[220px] overflow-hidden rounded-xl bg-brand-surface p-2">
      <div className="overflow-hidden rounded-lg bg-white shadow-sm">
        <span className="flex h-12 items-center justify-center bg-gradient-to-br from-brand-purple to-violet-400 text-[11px] font-extrabold text-white">Festive Offer</span>
        <div className="space-y-1.5 p-3">
          <span className="block text-[11px] font-extrabold text-brand-text">Hi Priya, a little something</span>
          <span className="block h-1.5 rounded bg-brand-border" />
          <span className="block h-1.5 w-2/3 rounded bg-brand-border" />
          <span className="mt-1 inline-block rounded-md bg-brand-purple px-3 py-1 text-[10px] font-bold text-white">See the offer</span>
        </div>
      </div>
    </div>
  ),
  journey: (
    <div>
      <svg viewBox="0 0 220 80" className="w-full" aria-hidden>
        <path d="M10 62 C50 62 50 24 90 32 S140 60 170 34 S206 14 212 14 L212 80 L10 80 Z" fill="#6c35f5" opacity="0.1" />
        <path d="M10 62 C50 62 50 24 90 32 S140 60 170 34 S206 14 212 14" fill="none" stroke="#6c35f5" strokeWidth="3.5" strokeLinecap="round" />
        {[10, 90, 170, 212].map((x, i) => (
          <circle key={x} cx={x} cy={[62, 32, 34, 14][i]} r="5.5" fill="#fff" stroke="#6c35f5" strokeWidth="3" />
        ))}
      </svg>
      <div className="mt-1 grid grid-cols-4 text-center text-[9px] font-bold text-brand-muted">
        {["Aware", "Consider", "Decide", "Loyal"].map((stage) => (
          <span key={stage}>{stage}</span>
        ))}
      </div>
    </div>
  ),
  analytics: (
    <div className="grid grid-cols-[1.2fr_1fr] gap-3">
      <div className="flex h-24 items-end gap-1.5 rounded-xl bg-brand-surface p-2.5">
        {[34, 48, 40, 62, 54, 76].map((height, index) => (
          <span key={index} className="flex-1 rounded-t bg-gradient-to-t from-brand-purple to-violet-300" style={{ height: `${height}%` }} />
        ))}
      </div>
      <div className="space-y-2 rounded-xl bg-brand-surface p-2.5">
        {[["Ads", "72%"], ["Email", "58%"], ["Social", "40%"]].map(([label, width]) => (
          <div key={label}>
            <span className="text-[9px] font-bold text-brand-muted">{label}</span>
            <span className="mt-0.5 block h-1.5 rounded-full bg-white"><span className="block h-full rounded-full bg-brand-purple" style={{ width }} /></span>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const capabilityItems: { icon: LucideIcon; title: string; short: string; body: string; points: string[]; href: string; mock: string; tone: string; tile: string }[] = [
  { icon: Calendar, title: "Campaign Management", short: "Plan", body: "Plan, launch and track every campaign on one calendar.", points: ["Every channel on one calendar", "Budgets and owners beside each campaign", "Tasks and approvals before launch"], href: routes.solutions.campaignManagement, mock: "campaign", tone: "from-violet-100 via-white to-white", tile: "bg-violet-500" },
  { icon: Magnet, title: "Lead Generation", short: "Capture", body: "Capture leads from every channel and score the ones worth a call.", points: ["Forms, pages, events and social", "Scores based on fit and behaviour", "A clean hand-over to sales"], href: routes.solutions.leadGeneration, mock: "lead", tone: "from-rose-100 via-white to-white", tile: "bg-rose-500" },
  { icon: Mail, title: "Email Marketing", short: "Engage", body: "Send the right email to the right segment, and follow up automatically.", points: ["Emails built from simple blocks", "Segments and personal greetings", "Sequences that react to opens and clicks"], href: routes.solutions.emailMarketing, mock: "email", tone: "from-sky-100 via-white to-white", tile: "bg-sky-500" },
  { icon: Route, title: "Customer Journey", short: "Guide", body: "See every stage and touchpoint, and act at the moments that matter.", points: ["Stages and touchpoints on one map", "Triggers for the next step", "Drop-off you can spot and fix"], href: routes.solutions.customerJourney, mock: "journey", tone: "from-amber-100 via-white to-white", tile: "bg-amber-500" },
  { icon: BarChart3, title: "Marketing Analytics", short: "Measure", body: "Compare channels and campaigns, and spend where it pays back.", points: ["Leads, cost and conversion by channel", "Switchable attribution", "Campaigns compared side by side"], href: routes.solutions.marketingAnalytics, mock: "analytics", tone: "from-emerald-100 via-white to-white", tile: "bg-emerald-500" },
];

/** Alternative design (not currently used): the five Marketing solutions as an expanding showcase. Swap it into app/marketing/page.tsx to use it. */
export function MarketingCapabilitiesAccordion() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-brand-surface py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow="The Marketing solution" title="Everything Your Marketing Team Needs" intro="Five connected solutions. Open one to see it, and use as many as you like together." />

        <ul className="mt-12 flex flex-col gap-3 lg:h-[580px] lg:flex-row xl:h-[460px]">
          {capabilityItems.map(({ icon: Icon, title, short, body, points, href, mock, tone, tile }, index) => {
            const open = index === active;
            return (
              <li key={title} className={cn("relative overflow-hidden rounded-3xl bg-gradient-to-br ring-1 transition-[flex-grow,box-shadow] duration-500", tone, open ? "shadow-[0_30px_60px_-34px_rgba(108,53,245,0.55)] ring-brand-purple/40 lg:flex-[6]" : "ring-brand-border lg:flex-1")}>
                {/* Small screens: a header row that opens the panel below it */}
                <button type="button" aria-expanded={open} aria-controls={`mk-panel-${index}`} onClick={() => setActive(index)} className="flex w-full items-center gap-4 p-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-inset lg:hidden">
                  <span className={cn("flex size-11 shrink-0 items-center justify-center rounded-2xl text-white", tile)}>
                    <Icon className="size-5.5" aria-hidden />
                  </span>
                  <span className="flex-1 text-base font-extrabold text-brand-text">{title}</span>
                  <ChevronDown className={cn("size-5 text-brand-muted transition-transform", open && "rotate-180")} aria-hidden />
                </button>

                {/* Wide screens, closed: a slim vertical tab */}
                {!open && (
                  <button type="button" aria-expanded={false} aria-controls={`mk-panel-${index}`} onClick={() => setActive(index)} className="absolute inset-0 hidden flex-col items-center gap-5 py-6 outline-none transition-colors hover:bg-white/60 focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-inset lg:flex">
                    <span className={cn("flex size-11 shrink-0 items-center justify-center rounded-2xl text-white", tile)}>
                      <Icon className="size-5.5" aria-hidden />
                    </span>
                    <span className="[writing-mode:vertical-rl] rotate-180 text-sm font-extrabold tracking-wide text-brand-text">{title}</span>
                    <span className="mt-auto text-[10px] font-bold tracking-wide text-brand-muted uppercase">{short}</span>
                  </button>
                )}

                <div id={`mk-panel-${index}`} role="region" aria-label={title} className={cn("px-5 pb-6 lg:absolute lg:inset-0 lg:p-8", open ? "block lg:animate-[mk-open_0.5s_ease_both]" : "hidden")}>
                  <div className="grid h-full gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
                    <div className="flex flex-col">
                      <span className={cn("hidden size-12 items-center justify-center rounded-2xl text-white shadow-lg lg:flex", tile)}>
                        <Icon className="size-6" aria-hidden />
                      </span>
                      <h3 className="text-xl font-extrabold text-brand-text lg:mt-4">{title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-brand-muted">{body}</p>
                      <ul className="mt-4 space-y-2">
                        {points.map((point) => (
                          <li key={point} className="flex gap-2.5 text-sm text-brand-text">
                            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                              <Check className="size-3" strokeWidth={3} aria-hidden />
                            </span>
                            {point}
                          </li>
                        ))}
                      </ul>
                      <Link href={href} className="group mt-5 inline-flex w-fit items-center gap-2 rounded-xl bg-brand-purple px-5 py-2.5 text-sm font-semibold text-white outline-none transition-colors hover:bg-brand-purple-dark focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2 xl:mt-auto">
                        Explore {title} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                      </Link>
                    </div>
                    <div className="self-center rounded-2xl bg-white p-4 shadow-[0_18px_40px_-26px_rgba(23,22,92,0.45)] ring-1 ring-brand-border">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-[11px] font-bold tracking-wide text-brand-muted uppercase">{short}</span>
                        <SampleTag />
                      </div>
                      {capabilityMocks[mock]}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
