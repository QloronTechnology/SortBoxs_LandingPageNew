"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Check, CircleCheck, Clock, Eye, FileText, List, Mail, MessageSquare, Send, UserCog, UserRound, UserSearch, Users, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion, useTicker } from "@/components/sales-solution/hooks";
import { SectionHead } from "@/components/sales-solution/shared";

/** Design canvas for the wide swimlane. It is scaled to fill its container (up to 1.4x on very wide screens), so text and lines always keep their proportions. */
const W = 1400;
const LANE_H = 116;
const LABEL_W = 190;
const NODE_W = 180;
const NODE_H = 76;

type Tone = "purple" | "blue" | "orange" | "green";
const tones: Record<Tone, { tile: string; badge: string; ring: string }> = {
  purple: { tile: "bg-gradient-to-br from-violet-200 to-fuchsia-200 text-violet-700", badge: "text-violet-600", ring: "ring-violet-200" },
  blue: { tile: "bg-gradient-to-br from-sky-200 to-blue-200 text-blue-700", badge: "text-blue-600", ring: "ring-sky-200" },
  orange: { tile: "bg-gradient-to-br from-amber-100 to-orange-200 text-orange-700", badge: "text-orange-500", ring: "ring-orange-200" },
  green: { tile: "bg-gradient-to-br from-emerald-100 to-green-200 text-emerald-700", badge: "text-emerald-600", ring: "ring-emerald-200" },
};

const lanes: { name: string; sub: string; icon: LucideIcon; icon_tile: string; bg: string }[] = [
  { name: "Customer", sub: "Request & Approve", icon: UserRound, icon_tile: "bg-violet-100 text-violet-600", bg: "bg-[#f3efff]" },
  { name: "Sales Rep", sub: "Create & Follow Up", icon: UserCog, icon_tile: "bg-sky-100 text-blue-600", bg: "bg-[#eaf3ff]" },
  { name: "Manager", sub: "Review & Approve", icon: Users, icon_tile: "bg-emerald-100 text-emerald-600", bg: "bg-[#eaf8f0]" },
  { name: "SortBoxs", sub: "Convert to Order", icon: Box, icon_tile: "bg-violet-100 text-violet-600", bg: "bg-[#f3efff]" },
];

interface Step {
  title: string;
  note: string;
  lane: number;
  cx: number;
  icon: LucideIcon;
  badge: LucideIcon;
  tone: Tone;
}

/** In story order: the index is also the order the diagram lights up. */
const steps: Step[] = [
  { title: "Customer Request", note: "Customer asks for a price", lane: 0, cx: 305, icon: UserRound, badge: FileText, tone: "purple" },
  { title: "Quote Created", note: "Built from product list", lane: 1, cx: 450, icon: FileText, badge: List, tone: "blue" },
  { title: "Send to Customer", note: "Share quote via email or link", lane: 1, cx: 675, icon: Send, badge: Mail, tone: "blue" },
  { title: "Customer Reviews", note: "Reviews the quote", lane: 0, cx: 905, icon: Eye, badge: Eye, tone: "purple" },
  { title: "Review", note: "Discount above the limit", lane: 2, cx: 775, icon: UserSearch, badge: Clock, tone: "orange" },
  { title: "Approval", note: "Manager approves", lane: 2, cx: 1000, icon: CircleCheck, badge: Check, tone: "green" },
  { title: "Accepted", note: "Customer says yes", lane: 0, cx: 1140, icon: CircleCheck, badge: MessageSquare, tone: "green" },
  { title: "Order Created", note: "Order from the quote", lane: 3, cx: 1300, icon: Box, badge: List, tone: "purple" },
];

const cy = (lane: number) => lane * LANE_H + LANE_H / 2;

type Color = "purple" | "blue" | "green" | "grad";
const stroke: Record<Color, string> = { purple: "#6c35f5", blue: "#3b82f6", green: "#10b981", grad: "url(#sw-orange-green)" };
const arrowColor: Record<Color, string> = { purple: "#6c35f5", blue: "#3b82f6", green: "#10b981", grad: "#10b981" };

/** Arrows join the cards. `target` is the step a connector leads to: it draws once that step is reached. */
const edges: { d: string; color: Color; dashed?: boolean; target: number; arrow: { x: number; y: number; rot: number } }[] = [
  { d: "M395,58 H462 A18,18 0 0 1 480,76 V126", color: "purple", target: 1, arrow: { x: 480, y: 132, rot: 90 } },
  { d: "M540,174 H575", color: "blue", target: 2, arrow: { x: 581, y: 174, rot: 0 } },
  { d: "M765,174 H780 Q795,174 795,159 V72 Q795,58 809,58 H809", color: "purple", dashed: true, target: 3, arrow: { x: 811, y: 58, rot: 0 } },
  { d: "M620,212 V272 Q620,290 638,290 H675", color: "green", dashed: true, target: 4, arrow: { x: 681, y: 290, rot: 0 } },
  { d: "M865,290 H900", color: "grad", target: 5, arrow: { x: 906, y: 290, rot: 0 } },
  { d: "M1065,252 V106", color: "green", dashed: true, target: 6, arrow: { x: 1065, y: 100, rot: -90 } },
  { d: "M995,58 H1040", color: "purple", target: 6, arrow: { x: 1046, y: 58, rot: 0 } },
  { d: "M1185,96 V396 Q1185,406 1195,406 H1204", color: "purple", target: 7, arrow: { x: 1206, y: 406, rot: 0 } },
];

function Node({ step, state }: { step: Step; state: "idle" | "done" | "current" }) {
  const tone = tones[step.tone];
  return (
    <div
      className={cn(
        "absolute flex items-center gap-2 rounded-2xl bg-white px-2.5 ring-1 transition-all duration-500",
        state === "current" ? "z-10 scale-[1.06] shadow-[0_18px_36px_-14px_rgba(108,53,245,0.55)] ring-2 ring-brand-purple" : state === "done" ? cn("shadow-[0_10px_24px_-14px_rgba(23,22,92,0.4)]", tone.ring) : "opacity-55 ring-brand-border"
      )}
      style={{ left: step.cx - NODE_W / 2, top: cy(step.lane) - NODE_H / 2, width: NODE_W, height: NODE_H }}
    >
      <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-xl", tone.tile)}>
        <step.icon className="size-[18px]" aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="block text-[12px] leading-tight font-extrabold tracking-tight whitespace-nowrap text-brand-text">{step.title}</span>
        <span className="mt-0.5 block text-[10.5px] leading-snug text-brand-muted">{step.note}</span>
      </span>
      <span className={cn("absolute -top-3 -right-2.5 flex size-7 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-brand-border", tone.badge)}>
        <step.badge className="size-3.5" aria-hidden />
      </span>
    </div>
  );
}

function WideDiagram({ reached, reduced }: { reached: number; reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => setScale(Math.min(1.4, entry.contentRect.width / W)));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const height = lanes.length * LANE_H;
  return (
    <div ref={ref} className="mt-12 hidden w-full overflow-hidden lg:block">
      <div className="mx-auto overflow-hidden rounded-3xl bg-white shadow-[0_30px_70px_-44px_rgba(23,22,92,0.5)] ring-1 ring-brand-purple/15" style={{ width: W * scale, height: height * scale }}>
        <div className="relative origin-top-left" style={{ width: W, height, transform: `scale(${scale})` }}>
          {lanes.map((lane, index) => (
            <div key={lane.name} className={cn("absolute inset-x-0 flex items-center", lane.bg)} style={{ top: index * LANE_H, height: LANE_H }}>
              <div className="flex items-center gap-3 px-6" style={{ width: LABEL_W }}>
                <span className={cn("flex size-11 shrink-0 items-center justify-center rounded-2xl", lane.icon_tile)}>
                  <lane.icon className="size-5.5" aria-hidden />
                </span>
                <span>
                  <span className="block text-[13px] font-extrabold tracking-wide text-brand-text uppercase">{lane.name}</span>
                  <span className="block text-[11px] text-brand-muted">{lane.sub}</span>
                </span>
              </div>
            </div>
          ))}
          <span aria-hidden className="absolute inset-y-0 w-px bg-brand-purple/10" style={{ left: LABEL_W }} />

          <svg viewBox={`0 0 ${W} ${height}`} width={W} height={height} className="absolute inset-0" aria-hidden>
            <defs>
              <linearGradient id="sw-orange-green" gradientUnits="userSpaceOnUse" x1="865" y1="0" x2="900" y2="0">
                <stop offset="0" stopColor="#f59e0b" />
                <stop offset="1" stopColor="#10b981" />
              </linearGradient>
            </defs>
            {edges.map((edge) => {
              const on = reached >= edge.target;
              const animate = !reduced;
              return (
                <g key={edge.d}>
                  {edge.dashed ? (
                    <path d={edge.d} fill="none" stroke={stroke[edge.color]} strokeWidth="2.2" strokeLinecap="round" strokeDasharray="6 6" className={cn(on && animate && "sw-march")} style={{ opacity: on ? 1 : 0, transition: animate ? "opacity 400ms ease" : "none" }} />
                  ) : (
                    <path d={edge.d} fill="none" stroke={stroke[edge.color]} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1" strokeDashoffset={on ? 0 : 1} style={{ transition: animate ? "stroke-dashoffset 650ms ease-out" : "none" }} />
                  )}
                  <path
                    d="M-6,-4.5 L1,0 L-6,4.5"
                    fill="none"
                    stroke={arrowColor[edge.color]}
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    transform={`translate(${edge.arrow.x} ${edge.arrow.y}) rotate(${edge.arrow.rot})`}
                    style={{ opacity: on ? 1 : 0, transition: animate ? `opacity 200ms ease ${edge.dashed ? 150 : 520}ms` : "none" }}
                  />
                </g>
              );
            })}
          </svg>

          {steps.map((step, index) => (
            <Node key={step.title} step={step} state={index === reached && !reduced ? "current" : index <= reached ? "done" : "idle"} />
          ))}
        </div>
      </div>
    </div>
  );
}

/** Same sequence, stacked: used below lg. */
function StackedFlow() {
  return (
    <ol className="relative mx-auto mt-10 max-w-md space-y-5 lg:hidden">
      <span aria-hidden className="absolute top-6 bottom-6 left-[27px] w-0.5 border-l-2 border-dashed border-brand-purple/30" />
      {steps.map((step, index) => {
        const tone = tones[step.tone];
        const lane = lanes[step.lane];
        return (
          <li key={step.title} className="relative flex items-start gap-4">
            <span className={cn("relative z-10 flex size-14 shrink-0 items-center justify-center rounded-2xl ring-4 ring-white", tone.tile)}>
              <step.icon className="size-6" aria-hidden />
              <span className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-white text-[11px] font-extrabold text-brand-purple shadow ring-1 ring-brand-border">{index + 1}</span>
            </span>
            <div className={cn("min-w-0 flex-1 rounded-2xl bg-white p-3.5 shadow-sm ring-1", tone.ring)}>
              <p className="text-sm font-extrabold text-brand-text">{step.title}</p>
              <p className="mt-0.5 text-xs text-brand-muted">{step.note}</p>
              <span className={cn("mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide text-brand-text uppercase", lane.bg)}>
                <lane.icon className="size-3" aria-hidden /> {lane.name}
              </span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export function QuoteSwimlane() {
  const reduced = useReducedMotion();
  const [tick] = useTicker(steps.length, 1500, reduced, 3);
  const reached = reduced ? steps.length - 1 : Math.min(tick, steps.length - 1);

  return (
    <section className="bg-brand-surface py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow="The quote-to-order flow" title="Who does what, from request to order" intro="A quote passes between the customer, the rep, a manager and the system. SortBoxs keeps every hand-off on one record." />
        <WideDiagram reached={reached} reduced={reduced} />
        <StackedFlow />
      </div>
    </section>
  );
}
