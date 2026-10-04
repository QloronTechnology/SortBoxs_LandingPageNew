import type { CSSProperties } from "react";
import { FileText, Filter, GitBranch, Inbox, PackageCheck, TrendingUp, type LucideIcon } from "lucide-react";
import { InView } from "@/components/ui/InView";
import { cn } from "@/lib/utils";
import { SectionHead } from "./shared";

const stages: { icon: LucideIcon; title: string; body: string; chips: string[]; tone: string }[] = [
  { icon: Inbox, title: "Lead Capture", body: "Capture leads from multiple channels.", chips: ["Web forms", "Email", "Imports"], tone: "bg-sky-500" },
  { icon: Filter, title: "Qualification", body: "Identify the opportunities worth pursuing.", chips: ["Scoring", "Fit checks"], tone: "bg-violet-500" },
  { icon: GitBranch, title: "Pipeline Management", body: "Track every deal through every stage.", chips: ["Stages", "Owners"], tone: "bg-indigo-500" },
  { icon: FileText, title: "Quotes", body: "Create and manage professional quotes.", chips: ["Templates", "Approvals"], tone: "bg-amber-500" },
  { icon: PackageCheck, title: "Orders", body: "Convert successful opportunities into orders.", chips: ["One-click convert"], tone: "bg-emerald-500" },
  { icon: TrendingUp, title: "Revenue", body: "Understand performance and revenue growth.", chips: ["Reports", "Forecast"], tone: "bg-brand-purple" },
];

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

function Chips({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)}>
      {items.map((item) => (
        <li key={item} className="rounded-full bg-brand-purple-light px-2.5 py-1 text-[11px] font-semibold text-brand-purple">
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Six stages on one connected line: a zig-zag timeline from lg, a vertical one below. */
export function SalesJourney() {
  return (
    <section id="journey" className="scroll-mt-24 bg-white py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow="The sales journey" title="From First Lead to Closed Deal" intro="Connect every stage of your sales process in one intelligent workflow." />

        <InView>
          {/* Wide: alternating above / below a single line */}
          <ol className="relative mt-16 hidden grid-cols-6 lg:grid">
            <span aria-hidden className="absolute top-1/2 right-[8.33%] left-[8.33%] h-1 -translate-y-1/2 rounded-full bg-gradient-to-r from-sky-400 via-brand-purple to-emerald-400 opacity-40" />
            {stages.map(({ icon: Icon, title, body, chips, tone }, index) => {
              const above = index % 2 === 0;
              const copy = (
                <div className={cn("about-rise flex flex-col px-2 text-center", above ? "justify-end pb-5" : "justify-start pt-5")} style={delay(index * 120)}>
                  <h3 className="text-base font-bold text-brand-text">{title}</h3>
                  <p className="mx-auto mt-1.5 max-w-[190px] text-sm leading-relaxed text-brand-muted">{body}</p>
                  <Chips items={chips} className="mt-3 justify-center" />
                </div>
              );
              return (
                <li key={title} className="grid h-[350px] grid-rows-[1fr_auto_1fr]">
                  {above ? copy : <span />}
                  <span className="relative mx-auto flex flex-col items-center">
                    <span aria-hidden className={cn("absolute left-1/2 w-px -translate-x-1/2 bg-brand-purple/30", above ? "bottom-full h-5" : "top-full h-5")} />
                    <span className={cn("relative flex size-14 items-center justify-center rounded-2xl text-white shadow-lg ring-8 ring-white", tone)}>
                      <Icon className="size-6" aria-hidden />
                      <span className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-white text-xs font-bold text-brand-purple ring-1 ring-brand-border">{index + 1}</span>
                    </span>
                  </span>
                  {above ? <span /> : copy}
                </li>
              );
            })}
          </ol>

          {/* Narrow: one vertical line */}
          <ol className="relative mx-auto mt-12 max-w-xl space-y-8 lg:hidden">
            <span aria-hidden className="absolute top-2 bottom-2 left-7 w-1 -translate-x-1/2 rounded-full bg-gradient-to-b from-sky-400 via-brand-purple to-emerald-400 opacity-40" />
            {stages.map(({ icon: Icon, title, body, chips, tone }, index) => (
              <li key={title} className="about-rise relative flex gap-5" style={delay(index * 90)}>
                <span className={cn("relative z-10 flex size-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg ring-4 ring-white", tone)}>
                  <Icon className="size-6" aria-hidden />
                </span>
                <div className="min-w-0 pt-1">
                  <h3 className="text-base font-bold text-brand-text">
                    <span className="mr-2 text-brand-purple">{index + 1}.</span>
                    {title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-brand-muted">{body}</p>
                  <Chips items={chips} className="mt-2.5" />
                </div>
              </li>
            ))}
          </ol>
        </InView>
      </div>
    </section>
  );
}
