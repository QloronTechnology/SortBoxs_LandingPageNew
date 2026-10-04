"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, ChartColumn, Check, Headphones, MessagesSquare, Timer, type LucideIcon } from "lucide-react";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";
import { useReducedMotion, useTicker } from "@/components/sales-solution/hooks";
import { SectionHead } from "@/components/sales-solution/shared";

const stations: { icon: LucideIcon; label: string; page: string; href: string; what: string; points: string[] }[] = [
  { icon: MessagesSquare, label: "Receive", page: "Omnichannel Support", href: routes.solutions.omnichannelSupport, what: "Customers reach you on the channel they prefer, and it all arrives in one place.", points: ["Email, chat, phone, social and forms together", "One thread per customer", "Routing to the right team"] },
  { icon: Headphones, label: "Organise", page: "Ticket Management", href: routes.solutions.ticketManagement, what: "Every request becomes a ticket with an owner, a priority and a history.", points: ["One queue for the whole team", "Notes and ready-made replies", "Priorities that decide the order"] },
  { icon: BookOpen, label: "Answer", page: "Knowledge Base", href: routes.solutions.knowledgeBase, what: "Reviewed articles give customers and agents the same, consistent answers.", points: ["Search for customers and agents", "A simple write, review, publish flow", "Suggest articles inside a reply"] },
  { icon: Timer, label: "Commit", page: "SLA Management", href: routes.solutions.slaManagement, what: "Targets for every priority, with a clock on each ticket and warnings before a miss.", points: ["Response and resolution targets", "Working hours respected", "Escalation before a breach"] },
  { icon: ChartColumn, label: "Learn", page: "Customer Insights", href: routes.solutions.customerInsights, what: "See volume, speed, satisfaction and topics, and spot customers at risk.", points: ["Trends you can read at a glance", "Topics rising and fading", "Health scores for accounts"] },
];

/** The five Customer Service solutions as stations on one line. Select a station to see what it does and where to go. */
export function ServiceTrack() {
  const reduced = useReducedMotion();
  const [taken, setTaken] = useState(false);
  const [tick, setTick] = useTicker(stations.length, 3000, reduced || taken, 0);
  const active = tick;
  const current = stations[active];

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow="How support works in SortBoxs" title="From first message to lasting improvement" intro="Five connected steps. What you learn at the end makes the beginning better." />

        <ol aria-label="Customer Service stages" className="relative mx-auto mt-12 grid max-w-4xl gap-3 sm:grid-cols-5 sm:gap-0">
          <span aria-hidden className="absolute top-[34px] right-[10%] left-[10%] hidden h-1 rounded-full bg-brand-purple/15 sm:block" />
          <span aria-hidden className="absolute top-[34px] left-[10%] hidden h-1 rounded-full bg-brand-purple transition-all duration-700 sm:block" style={{ width: `${(active / (stations.length - 1)) * 80}%` }} />
          {stations.map(({ icon: Icon, label }, index) => (
            <li key={label} className="flex sm:justify-center">
              <button type="button" aria-current={index === active ? "step" : undefined} onClick={() => { setTaken(true); setTick(index); }} className="group flex w-full items-center gap-3 rounded-2xl p-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-brand-purple sm:w-auto sm:flex-col sm:text-center">
                <span className={cn("relative flex size-[68px] shrink-0 items-center justify-center rounded-2xl ring-4 ring-white transition-all duration-300", index === active ? "scale-105 bg-brand-purple text-white shadow-lg shadow-brand-purple/30" : index < active ? "bg-emerald-500 text-white" : "bg-brand-surface text-brand-purple group-hover:bg-brand-purple-light")}>
                  {index < active ? <Check className="size-6" strokeWidth={3} aria-hidden /> : <Icon className="size-6" aria-hidden />}
                </span>
                <span className={cn("text-sm font-bold", index === active ? "text-brand-purple" : "text-brand-muted")}>{label}</span>
              </button>
            </li>
          ))}
        </ol>

        <div key={active} className="demo-rise mx-auto mt-10 grid max-w-4xl gap-6 rounded-3xl bg-brand-surface p-6 ring-1 ring-brand-border sm:grid-cols-[1.1fr_1fr] sm:p-8">
          <div>
            <p className="text-[11px] font-bold tracking-wide text-brand-purple uppercase">{current.label}</p>
            <h3 className="mt-1 text-xl font-extrabold text-brand-text">{current.page}</h3>
            <p className="mt-2 text-sm leading-relaxed text-brand-muted">{current.what}</p>
            <Link href={current.href} className="group mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-purple px-5 py-3 text-sm font-semibold text-white outline-none transition-colors hover:bg-brand-purple-dark focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2">
              Explore {current.page} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
          <ul className="space-y-2.5 self-center">
            {current.points.map((point) => (
              <li key={point} className="flex gap-3 rounded-xl bg-white p-3 text-sm text-brand-text ring-1 ring-brand-border">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"><Check className="size-3" strokeWidth={3} aria-hidden /></span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
