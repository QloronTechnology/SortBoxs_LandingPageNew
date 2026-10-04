"use client";

import { useState, type CSSProperties } from "react";
import { AlarmClock, ArrowRight, Bell, Download, Eye, MailPlus, RefreshCw, Star, TrendingDown, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { InView } from "@/components/ui/InView";
import { SampleTag, SectionHead } from "@/components/sales-solution/shared";
import { personas, stages } from "./journeyData";

/* ---------------------------------------------------------------- Interactive map */

export function JourneyExplorer() {
  const [personaIndex, setPersonaIndex] = useState(0);
  const [stageIndex, setStageIndex] = useState(1);
  const persona = personas[personaIndex];
  const stage = persona.stages[stageIndex];

  return (
    <section className="bg-brand-surface py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow="Journey map" title="Walk a customer through each stage" intro="Choose a customer and a stage to see what they do, where you meet them and what marketing does next." />

        <div className="mx-auto mt-10 max-w-5xl">
          <div role="group" aria-label="Customer" className="mx-auto flex w-fit gap-1 rounded-full bg-white p-1 ring-1 ring-brand-border">
            {personas.map((item, index) => (
              <button key={item.key} type="button" aria-pressed={index === personaIndex} onClick={() => setPersonaIndex(index)} className={cn("rounded-full px-5 py-2 text-sm font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand-purple", index === personaIndex ? "bg-brand-purple text-white shadow-sm" : "text-brand-muted hover:text-brand-text")}>
                {item.name} <span className="hidden font-normal opacity-80 sm:inline">· {item.label}</span>
              </button>
            ))}
          </div>

          <ol aria-label="Stages" className="mt-8 grid grid-cols-5 gap-1.5 sm:gap-2">
            {stages.map((name, index) => (
              <li key={name}>
                <button type="button" aria-current={index === stageIndex ? "step" : undefined} onClick={() => setStageIndex(index)} className={cn("flex w-full flex-col items-center gap-2 rounded-2xl px-1 py-3 outline-none ring-1 transition-all focus-visible:ring-2 focus-visible:ring-brand-purple sm:px-2", index === stageIndex ? "bg-brand-purple text-white shadow-lg shadow-brand-purple/25 ring-brand-purple" : "bg-white text-brand-text ring-brand-border hover:bg-brand-purple-light")}>
                  <span className="text-[10px] font-bold tracking-wide uppercase opacity-70">{index + 1}</span>
                  <span className="text-[11px] font-bold sm:text-sm">{name}</span>
                  <span className="h-12 w-1.5 overflow-hidden rounded-full bg-black/10">
                    <span className={cn("block w-full rounded-full transition-all duration-500", index === stageIndex ? "bg-white" : "bg-brand-purple")} style={{ height: `${persona.stages[index].mood}%`, marginTop: `${100 - persona.stages[index].mood}%` }} />
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <p className="mt-2 text-center text-[11px] text-brand-muted">The bar under each stage shows how the customer feels there. <SampleTag className="ml-1" /></p>

          <dl key={`${personaIndex}-${stageIndex}`} className="demo-rise mt-6 grid gap-4 md:grid-cols-3">
            {[
              ["What the customer does", <p key="a" className="text-sm leading-relaxed text-brand-text">{stage.does}</p>, "bg-sky-50 ring-sky-200"],
              [
                "Where you meet them",
                <ul key="b" className="flex flex-wrap gap-1.5">
                  {stage.touchpoints.map((touchpoint) => (
                    <li key={touchpoint} className="rounded-full bg-white px-3 py-1 text-xs font-bold text-brand-text ring-1 ring-brand-border">
                      {touchpoint}
                    </li>
                  ))}
                </ul>,
                "bg-violet-50 ring-violet-200",
              ],
              ["What marketing does", <p key="c" className="text-sm leading-relaxed text-brand-text">{stage.marketing}</p>, "bg-emerald-50 ring-emerald-200"],
            ].map(([label, body, tone]) => (
              <div key={label as string} className={cn("rounded-2xl p-5 ring-1", tone as string)}>
                <dt className="text-[11px] font-extrabold tracking-wide text-brand-muted uppercase">{label as string}</dt>
                <dd className="mt-2">{body as React.ReactNode}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Triggers */

const triggers: { icon: LucideIcon; when: string; then: string }[] = [
  { icon: Download, when: "A contact downloads a guide", then: "Add them to a nurture series and send a follow-up email" },
  { icon: Eye, when: "A lead visits the pricing page twice", then: "Tell the assigned sales rep" },
  { icon: Star, when: "A new customer completes setup", then: "Send a thank-you and ask for a review" },
  { icon: AlarmClock, when: "A customer has been inactive for 60 days", then: "Send a win-back email" },
  { icon: RefreshCw, when: "A renewal is 30 days away", then: "Remind the account owner" },
];

export function JourneyTriggers() {
  const [on, setOn] = useState<boolean[]>([true, true, true, false, true]);
  const active = on.filter(Boolean).length;

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-page grid items-start gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.3fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28">
          <SectionHead eyebrow="Journey triggers" title="Act at the moment it matters" intro="Turn a step in the journey into an action. When a customer does something, SortBoxs does the next thing for you." />
          <div className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-brand-purple-light px-5 py-4">
            <span className="text-4xl font-extrabold text-brand-purple tabular-nums">{active}</span>
            <span className="text-sm font-semibold text-brand-text">of {triggers.length} triggers<br />switched on</span>
          </div>
        </div>
        <ul className="divide-y divide-brand-border overflow-hidden rounded-3xl bg-white shadow-[0_30px_60px_-40px_rgba(23,22,92,0.45)] ring-1 ring-brand-border">
          {triggers.map(({ icon: Icon, when, then }, index) => (
            <li key={when} className="flex items-center gap-4 p-4 sm:p-5">
              <span className={cn("flex size-11 shrink-0 items-center justify-center rounded-xl transition-colors", on[index] ? "bg-brand-purple text-white" : "bg-brand-surface text-brand-muted")}>
                <Icon className="size-5" aria-hidden />
              </span>
              <div className="min-w-0 flex-1 text-sm">
                <p className="font-bold text-brand-text"><span className="text-[11px] font-extrabold tracking-wide text-amber-600 uppercase">When </span>{when}</p>
                <p className="mt-0.5 text-brand-muted"><span className="text-[11px] font-extrabold tracking-wide text-emerald-600 uppercase">Then </span>{then}</p>
              </div>
              <button type="button" role="switch" aria-checked={on[index]} aria-label={`${when}: ${then}`} onClick={() => setOn((current) => current.map((value, i) => (i === index ? !value : value)))} className={cn("relative h-7 w-12 shrink-0 rounded-full outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2", on[index] ? "bg-brand-purple" : "bg-brand-border")}>
                <span className={cn("absolute top-1 left-1 size-5 rounded-full bg-white shadow transition-transform", on[index] && "translate-x-5")} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Drop-off */

const counts = [1000, 620, 280, 210, 170];

export function DropOff() {
  const drops = counts.slice(1).map((value, index) => counts[index] - value);
  const worst = drops.indexOf(Math.max(...drops));

  return (
    <section className="bg-[linear-gradient(180deg,#f4f1ff_0%,#ffffff_100%)] py-16 lg:py-24">
      <div className="container-page grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
        <InView className="rounded-3xl bg-white p-5 shadow-[0_30px_60px_-40px_rgba(23,22,92,0.5)] ring-1 ring-brand-border sm:p-7">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h3 className="text-sm font-bold text-brand-text">Customers reaching each stage</h3>
            <SampleTag />
          </div>
          <ul className="space-y-4">
            {stages.map((name, index) => (
              <li key={name}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="font-semibold text-brand-text">{name}</span>
                  <span className="flex items-center gap-3">
                    {index > 0 && (
                      <span className={cn("flex items-center gap-1 font-bold tabular-nums", index - 1 === worst ? "text-rose-600" : "text-brand-muted")}>
                        <TrendingDown className="size-3.5" aria-hidden /> −{drops[index - 1]}
                      </span>
                    )}
                    <b className="text-brand-text tabular-nums">{counts[index]}</b>
                  </span>
                </div>
                <span className="block h-3.5 rounded-full bg-brand-surface">
                  <span className={cn("view-grow block h-full rounded-full", index === worst + 1 ? "bg-gradient-to-r from-rose-400 to-rose-500" : "bg-gradient-to-r from-violet-400 to-brand-purple")} style={{ width: `${(counts[index] / counts[0]) * 100}%`, "--d": `${index * 90}ms` } as CSSProperties} />
                </span>
              </li>
            ))}
          </ul>
        </InView>
        <div>
          <SectionHead eyebrow="Journey insights" title="Find where customers drop away" intro="Compare how many customers reach each stage, and see the biggest drop at a glance, so you know where to put your effort." />
          <div className="mt-7 flex gap-3.5 rounded-2xl bg-rose-50 p-4 ring-1 ring-rose-200">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
              <Bell className="size-5" aria-hidden />
            </span>
            <p className="text-sm leading-relaxed text-brand-text">
              <b>Biggest drop: {stages[worst]} to {stages[worst + 1]}.</b> In this example, {drops[worst]} customers left between those two stages. Try a follow-up email, or ask what is holding them back.
            </p>
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm text-brand-muted">
            <MailPlus className="size-4 text-brand-purple" aria-hidden /> Pair this view with a trigger to act on the drop automatically.
            <ArrowRight className="size-4 text-brand-purple" aria-hidden />
          </p>
        </div>
      </div>
    </section>
  );
}
