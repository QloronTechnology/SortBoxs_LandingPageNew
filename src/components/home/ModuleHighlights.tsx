import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import {
  ArrowRight,
  ArrowUp,
  Bell,
  BriefcaseBusiness,
  Mail,
  Plus,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { InView } from "@/components/ui/InView";
import { CountUp } from "@/components/ui/CountUp";
import { moduleHighlights } from "@/data/moduleHighlights";

type Highlight = (typeof moduleHighlights)[number];

const [finance, projects, procurement, inventory, marketing, automation, analytics] =
  moduleHighlights;

const simpleCards = [finance, projects, procurement, inventory];

const cardClass =
  "rounded-xl border border-brand-border bg-white p-5 shadow-[0_2px_10px_rgba(23,26,74,0.04)]";

/** Animation delay (and optional step index) passed to the `hl-*` CSS classes. */
function delay(seconds: number, index?: number): CSSProperties {
  return { "--d": `${seconds}s`, ...(index !== undefined && { "--i": index }) } as CSSProperties;
}

function CardHeader({ item, children }: { item: Highlight; children?: ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <div
        className="flex size-14 shrink-0 items-center justify-center rounded-xl"
        style={{ backgroundColor: item.tint }}
      >
        <Image src={item.image} alt="" width={78} height={78} className="size-10" aria-hidden />
      </div>
      <div className="min-w-0">
        <h3 className="text-lg font-semibold text-brand-text">{item.name}</h3>
        <p className="mt-1 max-w-[17rem] text-sm leading-relaxed text-brand-muted">
          {item.description}
        </p>
        {children}
      </div>
    </div>
  );
}

function SimpleCard({ item }: { item: Highlight }) {
  return (
    <div className={cardClass}>
      <CardHeader item={item}>
        <Link
          href={item.href}
          className="mt-2.5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-purple hover:underline"
        >
          Learn More <ArrowRight className="size-3.5" aria-hidden />
        </Link>
      </CardHeader>
    </div>
  );
}

const flowSteps: { label: string; icon: LucideIcon }[] = [
  { label: "New Leads", icon: Plus },
  { label: "New Score", icon: Plus },
  { label: "Assign Salesperson", icon: BriefcaseBusiness },
  { label: "Create Task", icon: Plus },
  { label: "Send Email", icon: Mail },
  { label: "Notify Manager", icon: Bell },
];

function FlowPill({ index }: { index: number }) {
  const { label, icon: Icon } = flowSteps[index];
  return (
    <span
      style={delay(0.15 + index * 0.12, index)}
      className="hl-step flex items-center gap-2 whitespace-nowrap rounded-full bg-brand-purple-light py-1.5 pl-1.5 pr-3.5 text-[13px] font-medium text-brand-text"
    >
      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-purple text-white">
        <Icon className="size-3" strokeWidth={2.5} aria-hidden />
      </span>
      {label}
    </span>
  );
}

function FlowArrow({ at }: { at: number }) {
  return (
    <ArrowRight
      style={delay(at)}
      className="hl-rise mx-0.5 hidden size-3.5 shrink-0 text-brand-muted sm:block"
      aria-hidden
    />
  );
}

function FlowConnector({ arrow }: { arrow?: boolean }) {
  return (
    <span
      style={delay(0.5)}
      className="hl-rise relative mx-auto hidden h-8 w-px bg-brand-muted/60 sm:block"
      aria-hidden
    >
      <span className="absolute -top-0.5 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-brand-muted" />
      {arrow && (
        <span className="absolute -bottom-0.5 left-1/2 size-1.5 -translate-x-1/2 rotate-45 border-b border-r border-brand-muted" />
      )}
    </span>
  );
}

// Business Growth sparkline, traced from the design (x in 0..1, y = relative value).
const growth = [
  [0, 0], [0.095, 19], [0.168, 0], [0.24, 10], [0.313, 33], [0.386, 10], [0.458, 19],
  [0.544, 48], [0.61, 28], [0.682, 40], [0.746, 27], [0.813, 40], [0.843, 36],
  [0.89, 55], [0.929, 50], [1, 77],
] as const;
const CHART_W = 300;
const CHART_H = 90;
const growthPoints = growth.map(([x, v]) => [
  4 + x * (CHART_W - 8),
  CHART_H - 4 - (v / 77) * (CHART_H - 12),
]);
const growthLine = growthPoints.map(([x, y]) => `${x},${y}`).join(" ");
const growthArea = `${growthPoints[0][0]},${CHART_H} ${growthLine} ${growthPoints.at(-1)![0]},${CHART_H}`;

const campaignBars = [
  { height: 36, className: "bg-brand-purple/65" },
  { height: 54, className: "bg-brand-purple/40" },
  { height: 72, className: "bg-brand-purple" },
];

export function ModuleHighlights() {
  return (
    <Section className="bg-brand-surface">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {simpleCards.map((item) => (
          <SimpleCard key={item.name} item={item} />
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-[543fr_655fr_587fr]">
        {/* Marketing */}
        <InView className={cardClass}>
          <CardHeader item={marketing} />
          <div className="mt-6 flex items-center rounded-lg border border-brand-border px-3 py-3.5">
            <div className="flex h-[72px] shrink-0 items-end gap-2.5 border-r border-brand-border pr-4 sm:gap-3.5 sm:pr-6">
              {campaignBars.map((bar, index) => (
                <span
                  key={index}
                  style={{ height: bar.height, ...delay(0.1 + index * 0.15) }}
                  className={`hl-bar w-5 rounded-sm sm:w-6 ${bar.className}`}
                  aria-hidden
                />
              ))}
            </div>
            <div className="min-w-0 pl-4 sm:pl-6">
              <p className="text-base font-semibold text-brand-text">Campaign Performance</p>
              <p className="mt-1 flex flex-wrap items-center gap-x-2.5">
                <span className="inline-flex items-center gap-1 text-2xl font-medium text-emerald-600">
                  <ArrowUp className="size-5" strokeWidth={2.5} aria-hidden />
                  <CountUp to={32} suffix="%" delay={300} />
                </span>
                <span className="text-sm text-brand-muted">This month</span>
              </p>
            </div>
          </div>
        </InView>

        {/* Automation */}
        <InView
          className={`${cardClass} lg:order-last lg:col-span-2 xl:order-none xl:col-span-1`}
        >
          <CardHeader item={automation} />
          <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-[auto_auto_auto_auto_auto] sm:items-center sm:justify-start sm:gap-0">
            <FlowPill index={0} />
            <FlowArrow at={0.2} />
            <FlowPill index={1} />
            <FlowArrow at={0.32} />
            <FlowPill index={2} />

            <FlowConnector arrow />
            <span className="hidden sm:block" />
            <span className="hidden sm:block" />
            <span className="hidden sm:block" />
            <FlowConnector />

            <FlowPill index={3} />
            <FlowArrow at={0.56} />
            <FlowPill index={4} />
            <FlowArrow at={0.68} />
            <FlowPill index={5} />
          </div>
        </InView>

        {/* Analytics */}
        <InView className={cardClass}>
          <CardHeader item={analytics} />
          <div className="mt-6 rounded-lg border border-brand-border px-5 pb-2 pt-3.5">
            <div className="flex items-center justify-between">
              <p className="text-base font-semibold text-brand-text">Business Growth</p>
              <span className="inline-flex items-center gap-1 text-2xl font-medium text-brand-purple">
                <ArrowUp className="size-5" strokeWidth={2.5} aria-hidden />
                <CountUp to={40} suffix="%" delay={300} />
              </span>
            </div>
            <div className="relative mt-1 h-20">
              <svg
                viewBox={`0 0 ${CHART_W} ${CHART_H}`}
                preserveAspectRatio="none"
                className="hl-reveal absolute inset-0 size-full"
                aria-hidden
              >
                <defs>
                  <linearGradient id="growth-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6c35f5" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#6c35f5" stopOpacity="0.04" />
                  </linearGradient>
                </defs>
                <polygon points={growthArea} fill="url(#growth-fill)" />
                <polyline
                  points={growthLine}
                  fill="none"
                  stroke="#6c35f5"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              {growthPoints.map(([x, y], index) => (
                <span
                  key={index}
                  style={{
                    left: `${(x / CHART_W) * 100}%`,
                    top: `${(y / CHART_H) * 100}%`,
                    ...delay(0.2 + (x / CHART_W) * 1.4),
                  }}
                  className="hl-dot absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-brand-purple bg-white"
                  aria-hidden
                />
              ))}
            </div>
          </div>
        </InView>
      </div>
    </Section>
  );
}
