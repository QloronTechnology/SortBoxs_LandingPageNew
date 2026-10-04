"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Briefcase, Check, LineChart, Settings2, UserRound, type LucideIcon } from "lucide-react";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";
import { SectionHead } from "./shared";

export interface Role {
  key: string;
  icon: LucideIcon;
  title: string;
  summary: string;
  first: string[];
  links: { label: string; href: string }[];
}

const salesRoles: Role[] = [
  {
    key: "rep",
    icon: UserRound,
    title: "Sales rep",
    summary: "Spend the day talking to customers, not updating records.",
    first: ["Get new leads assigned to you, with follow-ups already created", "Work every deal on one visual board", "Send a quote without leaving the deal"],
    links: [
      { label: "Sales Automation", href: routes.solutions.salesAutomation },
      { label: "Pipeline Management", href: routes.solutions.pipelineManagement },
    ],
  },
  {
    key: "manager",
    icon: Briefcase,
    title: "Sales manager",
    summary: "Know where the team stands without chasing updates.",
    first: ["See each rep's pipeline and spot deals that have gone quiet", "Track results against targets as they happen", "Coach with the same numbers the team sees"],
    links: [
      { label: "Sales Analytics", href: routes.solutions.salesAnalytics },
      { label: "Pipeline Management", href: routes.solutions.pipelineManagement },
    ],
  },
  {
    key: "owner",
    icon: LineChart,
    title: "Business owner",
    summary: "See what is coming in, and keep pricing under control.",
    first: ["Check what is likely to close this month", "Read revenue and forecast on one dashboard", "Keep discounts in line with approval rules"],
    links: [
      { label: "Sales Analytics", href: routes.solutions.salesAnalytics },
      { label: "Quotes & Orders", href: routes.solutions.quotesOrders },
    ],
  },
  {
    key: "ops",
    icon: Settings2,
    title: "Sales operations",
    summary: "Set up the structure once, so the team can just sell.",
    first: ["Create territories and give every account an owner", "Build the rules that route leads and send reminders", "Set up quote templates and approval limits"],
    links: [
      { label: "Territory Management", href: routes.solutions.territoryManagement },
      { label: "Sales Automation", href: routes.solutions.salesAutomation },
    ],
  },
];

/** Closes the Sales page: pick a role, see where to start. The site footer's own CTA follows it. */
export function SalesStartingPoints() {
  return <StartingPoints roles={salesRoles} eyebrow="Where to start" title="Where Would Your Team Start?" intro="Pick the role closest to yours and see what to look at first." />;
}

/** Role picker: choose the role closest to yours, see what to use first and where to go. */
export function StartingPoints({ roles, eyebrow, title, intro }: { roles: Role[]; eyebrow: string; title: string; intro: string }) {
  const [active, setActive] = useState(0);
  const role = roles[active];

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow={eyebrow} title={title} intro={intro} />

        <div className="mx-auto mt-12 grid max-w-6xl items-stretch gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div role="tablist" aria-label="Role" aria-orientation="vertical" className="grid gap-2.5">
            {roles.map(({ key, icon: Icon, title }, index) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={index === active}
                onClick={() => setActive(index)}
                className={cn("flex items-center gap-4 rounded-2xl p-4 text-left outline-none ring-1 transition-all focus-visible:ring-2 focus-visible:ring-brand-purple", index === active ? "bg-white shadow-[0_18px_40px_-24px_rgba(108,53,245,0.6)] ring-2 ring-brand-purple" : "bg-brand-surface ring-brand-border hover:bg-brand-purple-light")}
              >
                <span className={cn("flex size-11 shrink-0 items-center justify-center rounded-xl transition-colors", index === active ? "bg-brand-purple text-white" : "bg-brand-purple-light text-brand-purple")}>
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="text-base font-bold text-brand-text">{title}</span>
                <ArrowRight className={cn("ml-auto size-4 text-brand-purple transition-opacity", index === active ? "opacity-100" : "opacity-0")} aria-hidden />
              </button>
            ))}
          </div>

          <div role="tabpanel" key={role.key} className="demo-rise rounded-3xl bg-brand-navy p-6 text-white shadow-[0_30px_60px_-34px_rgba(23,22,92,0.8)] sm:p-9">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-white/15">
              <role.icon className="size-6" aria-hidden />
            </span>
            <h3 className="mt-5 text-2xl font-extrabold">{role.title}</h3>
            <p className="mt-1.5 text-white/70">{role.summary}</p>

            <p className="mt-7 text-xs font-bold tracking-[0.16em] text-violet-300 uppercase">What you would use first</p>
            <ul className="mt-3 space-y-3">
              {role.first.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-snug">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-brand-navy">
                    <Check className="size-3" strokeWidth={3} aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              {role.links.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn("inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-white", index === 0 ? "bg-white text-brand-purple hover:bg-white/90" : "border border-white/40 text-white hover:bg-white/10")}
                >
                  {link.label} <ArrowRight className="size-4" aria-hidden />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
