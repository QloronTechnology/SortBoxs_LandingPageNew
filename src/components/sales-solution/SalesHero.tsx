"use client";

import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowRight, Check, ChevronRight, FileText, Funnel, IndianRupee, PackageCheck, Target, UserPlus, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";
import { useReducedMotion, useTicker } from "./hooks";
import { Avatar, SampleTag } from "./shared";

type StageKey = "lead" | "opportunity" | "pipeline" | "quote" | "order" | "revenue";

const stages: { key: StageKey; label: string; icon: LucideIcon; tone: string; place: string }[] = [
  { key: "lead", label: "Lead", icon: UserPlus, tone: "bg-sky-100 text-sky-700", place: "md:col-start-1 md:row-start-1" },
  { key: "opportunity", label: "Opportunity", icon: Target, tone: "bg-violet-100 text-violet-700", place: "md:col-start-2 md:row-start-1" },
  { key: "pipeline", label: "Pipeline", icon: Funnel, tone: "bg-indigo-100 text-indigo-700", place: "md:col-start-3 md:row-start-1" },
  { key: "quote", label: "Quote", icon: FileText, tone: "bg-amber-100 text-amber-700", place: "md:col-start-3 md:row-start-2" },
  { key: "order", label: "Order", icon: PackageCheck, tone: "bg-emerald-100 text-emerald-700", place: "md:col-start-2 md:row-start-2" },
  { key: "revenue", label: "Revenue", icon: IndianRupee, tone: "bg-brand-purple-light text-brand-purple", place: "md:col-start-1 md:row-start-2" },
];

/** Where the connector arrow sits on the wide (snake) layout: right edge, bottom edge or left edge of the card. */
const wideArrow: Record<number, { icon: LucideIcon; position: string } | undefined> = {
  0: { icon: ArrowRight, position: "-right-[30px] top-1/2 -translate-y-1/2" },
  1: { icon: ArrowRight, position: "-right-[30px] top-1/2 -translate-y-1/2" },
  2: { icon: ArrowDown, position: "-bottom-[26px] left-1/2 -translate-x-1/2" },
  3: { icon: ArrowLeft, position: "-left-[30px] top-1/2 -translate-y-1/2" },
  4: { icon: ArrowLeft, position: "-left-[30px] top-1/2 -translate-y-1/2" },
};

function StageBody({ stage }: { stage: StageKey }) {
  switch (stage) {
    case "lead":
      return (
        <>
          <div className="flex items-center gap-2">
            <Avatar name="John Smith" tone="bg-sky-100 text-sky-700" />
            <div className="min-w-0">
              <p className="text-[13px] leading-tight font-extrabold text-brand-text">John Smith</p>
              <p className="text-[11px] leading-tight text-brand-muted">Acme Technologies</p>
            </div>
          </div>
          <span className="mt-2 inline-block rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-bold text-sky-700">New Lead</span>
        </>
      );
    case "opportunity":
      return (
        <>
          <p className="text-[13px] leading-tight font-extrabold text-brand-text">Acme Technologies</p>
          <p className="mt-0.5 text-base leading-tight font-extrabold text-brand-text">₹2,40,000</p>
          <span className="mt-1.5 inline-block rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-bold text-violet-700">Qualified</span>
        </>
      );
    case "pipeline":
      return (
        <>
          <p className="text-[11px] font-semibold text-brand-muted">Stage</p>
          <p className="text-[13px] leading-tight font-extrabold text-brand-text">Proposal</p>
          <p className="mt-0.5 text-base leading-tight font-extrabold text-brand-text">₹4,80,000</p>
          <div className="mt-1.5 flex gap-1" aria-hidden>
            {[0, 1, 2, 3, 4].map((step) => (
              <span key={step} className={cn("h-1 flex-1 rounded-full", step <= 2 ? "bg-brand-purple" : "bg-brand-border")} />
            ))}
          </div>
        </>
      );
    case "quote":
      return (
        <>
          <p className="text-[11px] font-semibold text-brand-muted">Quote #QT-1024</p>
          <p className="text-base leading-tight font-extrabold text-brand-text">₹4,80,000</p>
          <span className="mt-1.5 inline-block rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">Sent</span>
        </>
      );
    case "order":
      return (
        <>
          <p className="flex items-center gap-1 text-[13px] leading-tight font-extrabold text-emerald-700">
            <Check className="size-3.5" strokeWidth={3} aria-hidden /> Order Confirmed
          </p>
          <p className="mt-0.5 text-base leading-tight font-extrabold text-brand-text">₹4,80,000</p>
          <p className="text-[11px] text-brand-muted">Acme Technologies</p>
        </>
      );
    case "revenue":
      return (
        <>
          <p className="text-[11px] font-semibold text-brand-muted">Revenue</p>
          <p className="text-lg leading-tight font-extrabold text-emerald-600">↑ 24%</p>
          <div className="mt-1 flex h-5 items-end gap-1" aria-hidden>
            {[40, 52, 46, 68, 90].map((height, index) => (
              <span key={index} className="flex-1 rounded-t bg-gradient-to-t from-brand-purple to-violet-300" style={{ height: `${height}%` }} />
            ))}
          </div>
        </>
      );
  }
}

/** Hero visual: the six stages of a sale as connected product cards, lit one after another. */
function WorkflowVisual() {
  const reduced = useReducedMotion();
  const [tick] = useTicker(stages.length, 1500, reduced, 2);
  const active = reduced ? stages.length : tick;

  return (
    <div className="relative mx-auto w-full max-w-[600px] lg:mx-0 lg:justify-self-end">
      <span aria-hidden className="absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(ellipse_at_center,#e2dcfb_0%,rgba(226,220,251,0)_70%)]" />
      <div className="relative rounded-3xl bg-white/70 p-4 ring-1 ring-brand-purple/15 backdrop-blur-sm sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-xs font-bold tracking-wide text-brand-text uppercase">One deal, start to finish</p>
          <SampleTag />
        </div>

        <ol aria-label="Sales workflow: lead, opportunity, pipeline, quote, order, revenue" className="grid grid-cols-1 gap-x-9 gap-y-7 md:grid-cols-3">
          {stages.map((stage, index) => {
            const reached = index < active;
            const current = index === active - 1 && !reduced;
            const arrow = wideArrow[index];
            const connectorOn = index < active - 1 || (reduced && index < stages.length - 1);
            return (
              <li
                key={stage.key}
                className={cn(
                  "relative rounded-2xl bg-white p-3 ring-1 transition-all duration-500",
                  stage.place,
                  reached ? "opacity-100 shadow-[0_14px_30px_-18px_rgba(108,53,245,0.55)]" : "opacity-60",
                  current ? "scale-[1.03] ring-2 ring-brand-purple" : "ring-brand-border"
                )}
              >
                <div className="mb-2 flex items-center gap-1.5">
                  <span className={cn("flex size-6 items-center justify-center rounded-lg", stage.tone)}>
                    <stage.icon className="size-3.5" aria-hidden />
                  </span>
                  <span className="text-[11px] font-bold tracking-wide text-brand-muted uppercase">{stage.label}</span>
                  <span className="ml-auto text-[10px] font-bold text-brand-muted/70">{index + 1}</span>
                </div>
                <StageBody stage={stage.key} />

                {index < stages.length - 1 && (
                  <span aria-hidden className={cn("absolute left-1/2 z-10 flex size-6 -translate-x-1/2 items-center justify-center rounded-full text-white shadow-sm transition-colors duration-500 md:hidden -bottom-[26px]", connectorOn ? "bg-brand-purple" : "bg-brand-purple/30")}>
                    <ArrowDown className="size-3.5" />
                  </span>
                )}
                {arrow && (
                  <span aria-hidden className={cn("absolute z-10 hidden size-6 items-center justify-center rounded-full text-white shadow-sm transition-colors duration-500 md:flex", arrow.position, connectorOn ? "bg-brand-purple" : "bg-brand-purple/30")}>
                    <arrow.icon className="size-3.5" />
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export function SalesHero() {
  return (
    <section className="overflow-hidden bg-[linear-gradient(180deg,#f4f1ff_0%,#faf9ff_100%)]">
      <div className="container-page grid items-center gap-14 pt-8 pb-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-12 lg:pt-10 lg:pb-16">
        <div>
          <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-sm text-brand-muted">
            <Link href={routes.home} className="hover:text-brand-purple">
              Home
            </Link>
            <ChevronRight className="size-3.5" aria-hidden />
            <Link href={routes.solutions.all} className="hover:text-brand-purple">
              Solutions
            </Link>
            <ChevronRight className="size-3.5" aria-hidden />
            <span className="text-brand-text">Sales</span>
          </nav>

          <p className="inline-flex items-center rounded-full bg-brand-purple-light px-3.5 py-1.5 text-sm font-semibold tracking-wide text-brand-purple">SORTBOXS SALES</p>
          <h1 className="mt-4 text-4xl leading-[1.08] font-extrabold text-brand-text sm:text-5xl xl:text-6xl">
            Close More Deals. <span className="text-brand-purple">Grow Revenue.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-muted sm:text-lg">
            Turn your sales process into a predictable revenue engine with automation, pipeline management, quotes, orders, analytics, and territory management.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={routes.demo} size="lg" icon={ArrowRight}>
              Book a Demo
            </Button>
            <Button href={routes.signup} variant="outline" size="lg" icon={ArrowRight}>
              Start Free
            </Button>
          </div>
        </div>

        <WorkflowVisual />
      </div>
    </section>
  );
}
