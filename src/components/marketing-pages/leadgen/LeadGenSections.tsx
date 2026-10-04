"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, FileText, Globe, Handshake, Inbox, Share2, Target, Users, Filter, Mail, type LucideIcon } from "lucide-react";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";
import { InView } from "@/components/ui/InView";
import { SampleTag, SectionHead } from "@/components/sales-solution/shared";

/* ---------------------------------------------------------------- Capture channels */

const sources: { icon: LucideIcon; name: string; leads: number; how: string; captures: string; goes: string }[] = [
  { icon: Globe, name: "Website forms", leads: 46, how: "A visitor fills in a form on your site.", captures: "Name, email, company and the page they came from", goes: "Scored, then assigned or nurtured" },
  { icon: FileText, name: "Landing pages", leads: 38, how: "A campaign sends people to a focused page.", captures: "Contact details and the campaign that brought them", goes: "Tagged to the campaign, then scored" },
  { icon: Calendar, name: "Events", leads: 24, how: "Attendees are imported or scanned after an event.", captures: "Contact details and which sessions they joined", goes: "Followed up by the event owner" },
  { icon: Share2, name: "Social", leads: 18, how: "Lead forms and replies from social channels.", captures: "Contact details and the post they responded to", goes: "Added to nurture, then scored" },
  { icon: Users, name: "Referrals", leads: 12, how: "Customers and partners recommend someone.", captures: "Contact details and who referred them", goes: "Assigned straight to a rep" },
];

export function CaptureChannels() {
  const [active, setActive] = useState(0);
  const max = Math.max(...sources.map((source) => source.leads));
  const current = sources[active];

  return (
    <section className="bg-brand-surface py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow="Capture" title="Every channel feeds one lead list" intro="Whichever way a lead arrives, it lands in the same place with its source attached. Select a channel to see how." />
        <div className="mx-auto mt-12 grid max-w-5xl items-stretch gap-5 lg:grid-cols-[1.1fr_1fr]">
          <InView className="rounded-3xl bg-white p-5 ring-1 ring-brand-border sm:p-7">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-bold text-brand-text">Leads by channel</h3>
              <SampleTag />
            </div>
            <ul role="tablist" aria-label="Lead channels" className="space-y-2.5">
              {sources.map((source, index) => (
                <li key={source.name}>
                  <button type="button" role="tab" aria-selected={index === active} onClick={() => setActive(index)} className={cn("flex w-full items-center gap-3 rounded-xl p-2.5 text-left outline-none ring-1 transition-colors focus-visible:ring-2 focus-visible:ring-brand-purple", index === active ? "bg-brand-purple-light ring-brand-purple/40" : "bg-white ring-transparent hover:bg-brand-surface")}>
                    <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-lg", index === active ? "bg-brand-purple text-white" : "bg-brand-surface text-brand-purple")}>
                      <source.icon className="size-4.5" aria-hidden />
                    </span>
                    <span className="w-28 shrink-0 text-sm font-bold text-brand-text">{source.name}</span>
                    <span className="h-2.5 flex-1 rounded-full bg-brand-surface">
                      <span className="view-grow block h-full rounded-full bg-gradient-to-r from-violet-400 to-brand-purple" style={{ width: `${(source.leads / max) * 100}%`, "--d": `${index * 80}ms` } as CSSProperties} />
                    </span>
                    <b className="w-8 text-right text-sm text-brand-text tabular-nums">{source.leads}</b>
                  </button>
                </li>
              ))}
            </ul>
          </InView>
          <div role="tabpanel" key={current.name} className="demo-rise rounded-3xl bg-brand-navy p-6 text-white sm:p-8">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-white/15">
              <current.icon className="size-6" aria-hidden />
            </span>
            <h3 className="mt-4 text-xl font-extrabold">{current.name}</h3>
            <dl className="mt-5 space-y-4 text-sm">
              {[["How leads arrive", current.how], ["What is captured", current.captures], ["Where it goes next", current.goes]].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-[11px] font-bold tracking-wide text-violet-300 uppercase">{label}</dt>
                  <dd className="mt-1 leading-relaxed text-white/85">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Scoring simulator */

const signals: { label: string; points: number; group: string }[] = [
  { label: "Job title matches your buyer", points: 20, group: "Who they are" },
  { label: "Company size is a good fit", points: 15, group: "Who they are" },
  { label: "Opened your last three emails", points: 10, group: "What they did" },
  { label: "Visited the pricing page", points: 20, group: "What they did" },
  { label: "Attended your webinar", points: 15, group: "What they did" },
  { label: "Requested a demo", points: 30, group: "What they did" },
];

const outcome = (score: number) =>
  score >= 70
    ? { label: "Hot", note: "Goes to a sales rep now, with the full activity history.", tone: "bg-rose-100 text-rose-700", bar: "bg-rose-500" }
    : score >= 40
      ? { label: "Warm", note: "Stays in nurture emails until it reaches the sales threshold.", tone: "bg-amber-100 text-amber-700", bar: "bg-amber-500" }
      : { label: "Cold", note: "Added to a slow nurture track. No one needs to call yet.", tone: "bg-sky-100 text-sky-700", bar: "bg-sky-500" };

export function ScoreSimulator() {
  const [on, setOn] = useState<boolean[]>([true, false, true, true, false, false]);
  const score = signals.reduce((sum, signal, index) => sum + (on[index] ? signal.points : 0), 0);
  const result = outcome(score);
  const groups = ["Who they are", "What they did"];

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow="Lead scoring" title="Score leads on what they do, not just who they are" intro="Switch signals on and off to see how a lead's score changes, and where the lead goes next. The points are an example. You set your own." />
        <div className="mx-auto mt-12 grid max-w-5xl items-start gap-5 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-3xl bg-brand-surface p-5 ring-1 ring-brand-border sm:p-7">
            {groups.map((group) => (
              <fieldset key={group} className="mb-5 last:mb-0">
                <legend className="mb-2.5 text-[11px] font-bold tracking-wide text-brand-muted uppercase">{group}</legend>
                <ul className="space-y-2">
                  {signals.map((signal, index) =>
                    signal.group === group ? (
                      <li key={signal.label}>
                        <label className={cn("flex cursor-pointer items-center gap-3 rounded-xl bg-white p-3 ring-1 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-purple", on[index] ? "ring-brand-purple/50" : "ring-brand-border hover:bg-white/80")}>
                          <input type="checkbox" role="switch" className="sr-only" checked={on[index]} onChange={() => setOn((current) => current.map((value, i) => (i === index ? !value : value)))} />
                          <span aria-hidden className={cn("relative h-6 w-10 shrink-0 rounded-full transition-colors", on[index] ? "bg-brand-purple" : "bg-brand-border")}>
                            <span className={cn("absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform", on[index] && "translate-x-4")} />
                          </span>
                          <span className="flex-1 text-sm font-semibold text-brand-text">{signal.label}</span>
                          <span className="text-xs font-bold text-brand-purple tabular-nums">+{signal.points}</span>
                        </label>
                      </li>
                    ) : null
                  )}
                </ul>
              </fieldset>
            ))}
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-[0_30px_60px_-40px_rgba(23,22,92,0.5)] ring-1 ring-brand-border sm:p-8" aria-live="polite">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-bold text-brand-text">Lead score</p>
              <SampleTag />
            </div>
            <p className="mt-3 text-6xl font-extrabold text-brand-text tabular-nums">{score}<span className="text-2xl text-brand-muted"> / 110</span></p>
            <span className="mt-4 block h-3 rounded-full bg-brand-surface">
              <span className={cn("block h-full rounded-full transition-all duration-500", result.bar)} style={{ width: `${(score / 110) * 100}%` }} />
            </span>
            <div className="mt-2 flex justify-between text-[10px] font-semibold text-brand-muted">
              <span>Cold</span><span>Warm from 40</span><span>Hot from 70</span>
            </div>
            <div className="mt-6 rounded-2xl bg-brand-surface p-4">
              <span className={cn("rounded-full px-3 py-1 text-xs font-bold", result.tone)}>{result.label}</span>
              <p className="mt-3 text-sm leading-relaxed text-brand-text">{result.note}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Hand-over to sales */

const handover: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Inbox, title: "Capture", body: "The lead arrives with its source." },
  { icon: Target, title: "Score", body: "Actions and details add up to a score." },
  { icon: Mail, title: "Nurture", body: "Warm leads get emails until they are ready." },
  { icon: Filter, title: "Qualify", body: "A lead that reaches your threshold is marked ready." },
  { icon: Handshake, title: "Hand over", body: "It goes to a rep with the whole history." },
];

export function LeadHandover() {
  return (
    <section className="bg-[linear-gradient(180deg,#f4f1ff_0%,#ffffff_100%)] py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow="Marketing to sales" title="A clean hand-over, so no lead is dropped" intro="The same record follows a lead from the first form to the first sales call." />
        <ol aria-label="Lead hand-over" className="relative mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-5 sm:gap-0">
          <span aria-hidden className="absolute top-[30px] right-[10%] left-[10%] hidden border-t-2 border-dashed border-brand-purple/30 sm:block" />
          {handover.map(({ icon: Icon, title, body }, index) => (
            <li key={title} className="relative flex items-center gap-4 sm:flex-col sm:gap-0 sm:text-center">
              <span className="relative z-10 flex size-[60px] shrink-0 items-center justify-center rounded-2xl bg-brand-purple text-white shadow-lg shadow-brand-purple/30 ring-8 ring-white">
                <Icon className="size-6" aria-hidden />
                <span className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-white text-xs font-bold text-brand-purple ring-1 ring-brand-border">{index + 1}</span>
              </span>
              <span className="sm:mt-4">
                <span className="block text-sm font-bold text-brand-text">{title}</span>
                <span className="mt-1 block max-w-[10rem] text-xs leading-relaxed text-brand-muted sm:mx-auto">{body}</span>
              </span>
            </li>
          ))}
        </ol>
        <div className="mx-auto mt-12 flex max-w-xl flex-wrap justify-center gap-3">
          {[
            ["See how sales follows up", routes.solutions.salesAutomation],
            ["See the sales pipeline", routes.solutions.pipelineManagement],
          ].map(([label, href]) => (
            <Link key={href} href={href} className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand-purple ring-1 ring-brand-border transition-colors hover:bg-brand-purple-light">
              {label} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
