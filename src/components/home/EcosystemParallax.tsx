"use client";

import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BarChart3,
  Briefcase,
  Check,
  ClipboardList,
  Headphones,
  Megaphone,
  Package,
  Settings,
  ShoppingCart,
  Sparkles,
  Users,
  UsersRound,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { assets } from "@/config/assets";
import { cn } from "@/lib/utils";

export interface EcosystemModule {
  slug: string;
  label: string;
  href: string;
  features: string[];
}

// Icon + colour per module slug (icons can't cross the server→client boundary as props).
const moduleStyle: Record<string, { icon: LucideIcon; bg: string; fg: string }> = {
  crm: { icon: Users, bg: "bg-emerald-50", fg: "text-emerald-600" },
  sales: { icon: BarChart3, bg: "bg-violet-50", fg: "text-violet-500" },
  service: { icon: Headphones, bg: "bg-sky-50", fg: "text-sky-600" },
  hrms: { icon: UsersRound, bg: "bg-rose-50", fg: "text-rose-500" },
  finance: { icon: Wallet, bg: "bg-emerald-50", fg: "text-emerald-600" },
  projects: { icon: Briefcase, bg: "bg-indigo-50", fg: "text-indigo-500" },
  marketing: { icon: Megaphone, bg: "bg-sky-50", fg: "text-sky-600" },
  commerce: { icon: ShoppingCart, bg: "bg-orange-50", fg: "text-orange-500" },
  procurement: { icon: ClipboardList, bg: "bg-pink-50", fg: "text-pink-600" },
  inventory: { icon: Package, bg: "bg-green-50", fg: "text-green-600" },
  automation: { icon: Settings, bg: "bg-fuchsia-50", fg: "text-fuchsia-600" },
  ai: { icon: Sparkles, bg: "bg-purple-50", fg: "text-purple-600" },
};

// Geometry in % of the square stage (0–100 on both axes).
const OUTER_R = 39; // module nodes
const INNER_R = 21; // dotted ring around the hub

function polar(index: number, count: number, radius: number) {
  const angle = (index / count) * Math.PI * 2 - Math.PI / 2; // start at 12 o'clock
  // Rounded so server and client render identical attribute strings (avoids hydration mismatch).
  const round = (value: number) => Math.round(value * 1000) / 1000;
  return { x: round(50 + radius * Math.cos(angle)), y: round(50 + radius * Math.sin(angle)) };
}

/** Moves a layer with the pointer; deeper layers (higher depth) move further. */
function depth(px: number): CSSProperties {
  return {
    transform: `translate3d(calc(var(--px, 0) * ${px}px), calc(var(--py, 0) * ${px}px), 0)`,
  };
}

/**
 * "Parallax Depth" ecosystem: SortBoxs hub with the modules on a ring. The stage tilts and its
 * layers drift at different depths with the pointer; hovering a module brings it forward, lights
 * its spoke and shows its key features while the rest recede.
 */
export function EcosystemParallax({ modules }: { modules: EcosystemModule[] }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const lastPointerType = useRef<string>("mouse");
  const count = modules.length;

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const stage = stageRef.current;
    if (!stage || event.pointerType === "touch") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = stage.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    stage.style.setProperty("--px", x.toFixed(3));
    stage.style.setProperty("--py", y.toFixed(3));
  }

  function onPointerLeave() {
    stageRef.current?.style.setProperty("--px", "0");
    stageRef.current?.style.setProperty("--py", "0");
    setActive(null);
  }

  const activeIndex = modules.findIndex((module) => module.slug === active);
  const activeModule = activeIndex >= 0 ? modules[activeIndex] : null;

  return (
    <div className="[perspective:1000px]">
      <div
        ref={stageRef}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="relative mx-auto aspect-square w-full max-w-[30rem] transition-transform duration-300 ease-out [transform-style:preserve-3d]"
        style={{
          transform:
            "rotateX(calc(var(--py, 0) * -7deg)) rotateY(calc(var(--px, 0) * 7deg))",
        }}
      >
        {/* Layer 0: ambient glow (moves least). */}
        <div className="absolute inset-0 transition-transform duration-500 ease-out" style={depth(-6)} aria-hidden>
          <div className="animate-pulse-glow absolute inset-[18%] rounded-full bg-brand-purple/25 blur-3xl" />
        </div>

        {/* Layer 1: spokes + rings. */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 size-full overflow-visible transition-transform duration-500 ease-out"
          style={depth(4)}
          aria-hidden
        >
          <circle cx="50" cy="50" r={OUTER_R} fill="none" stroke="#6c35f5" strokeOpacity="0.12" strokeWidth="0.3" strokeDasharray="0.6 1.4" />
          <circle cx="50" cy="50" r={INNER_R} fill="#6c35f5" fillOpacity="0.04" stroke="#6c35f5" strokeOpacity="0.35" strokeWidth="0.35" />
          {modules.map((module, index) => {
            const from = polar(index, count, INNER_R);
            const to = polar(index, count, OUTER_R - 5.5);
            const lit = module.slug === active;
            return (
              <g key={module.slug}>
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="#6c35f5"
                  strokeOpacity={lit ? 0.9 : activeModule ? 0.12 : 0.25}
                  strokeWidth={lit ? 0.7 : 0.35}
                  className="transition-all duration-300"
                />
                <circle
                  cx={from.x}
                  cy={from.y}
                  r={lit ? 1.1 : 0.8}
                  fill="white"
                  stroke="#6c35f5"
                  strokeWidth="0.35"
                  className="transition-all duration-300"
                />
              </g>
            );
          })}
        </svg>

        {/* Orbiting glow dots (carried over from the original ecosystem image), riding the outer ring. */}
        <div
          className="pointer-events-none absolute inset-0 transition-transform duration-500 ease-out"
          style={depth(4)}
          aria-hidden
        >
          <div className="animate-spin-slow absolute inset-0">
            <span
              className="absolute left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-purple shadow-[0_0_10px_3px_rgba(108,53,245,0.55)]"
              style={{ top: `${50 - OUTER_R}%` }}
            />
          </div>
          <div className="animate-spin-slow-reverse absolute inset-0">
            <span
              className="absolute left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400 shadow-[0_0_8px_2px_rgba(16,185,129,0.55)]"
              style={{ top: `${50 - OUTER_R}%` }}
            />
          </div>
          <div className="animate-spin-slower absolute inset-0">
            <span
              className="absolute left-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400 shadow-[0_0_8px_2px_rgba(14,165,233,0.55)]"
              style={{ top: `${50 - INNER_R}%` }}
            />
          </div>
        </div>

        {/* Layer 2: SortBoxs hub. */}
        <div
          className="absolute inset-[34%] transition-transform duration-500 ease-out"
          style={depth(8)}
        >
          <div className="flex size-full flex-col items-center justify-center rounded-full border border-brand-purple/30 bg-gradient-to-b from-white to-brand-purple-light shadow-[0_10px_40px_-8px_rgba(108,53,245,0.45)]">
            <Image
              src={assets.brand.logo}
              alt="SortBoxs"
              width={246}
              height={55}
              className="h-auto w-[76%]"
            />
          </div>
        </div>

        {/* Layer 3: module nodes (move most → closest to the viewer). */}
        <div className="absolute inset-0 transition-transform duration-500 ease-out" style={depth(16)}>
          {modules.map((module, index) => {
            const { x, y } = polar(index, count, OUTER_R);
            const { icon: Icon, bg, fg } = moduleStyle[module.slug] ?? moduleStyle.crm;
            const isActive = module.slug === active;
            const dimmed = activeModule !== null && !isActive;
            return (
              <Link
                key={module.slug}
                href={module.href}
                onPointerDown={(event) => (lastPointerType.current = event.pointerType)}
                onPointerEnter={(event) => {
                  if (event.pointerType !== "touch") setActive(module.slug);
                }}
                onClick={(event) => {
                  // Touch: first tap reveals the module's features, second tap opens its page.
                  if (lastPointerType.current === "touch" && !isActive) {
                    event.preventDefault();
                    setActive(module.slug);
                  }
                }}
                onFocus={() => setActive(module.slug)}
                onBlur={() => setActive(null)}
                aria-label={`${module.label}: ${module.features.join(", ")}`}
                className={cn(
                  "group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 transition-all duration-300 ease-out outline-none",
                  dimmed && "opacity-35 blur-[1.5px]",
                  isActive && "z-20 scale-110"
                )}
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <span
                  className={cn(
                    "flex size-10 items-center justify-center rounded-full border border-white shadow-md ring-brand-purple/40 transition-shadow duration-300 sm:size-12",
                    bg,
                    isActive && "shadow-lg shadow-brand-purple/30 ring-2",
                    "group-focus-visible:ring-2"
                  )}
                >
                  <Icon className={cn("size-4.5 sm:size-5", fg)} aria-hidden />
                </span>
                <span className="text-[10px] font-medium whitespace-nowrap text-brand-text sm:text-xs">
                  {module.label}
                </span>
              </Link>
            );
          })}

          {/* Feature card for the hovered/focused module, placed toward the hub side. */}
          {activeModule && (
            <FeatureCard
              module={activeModule}
              position={polar(activeIndex, count, OUTER_R)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  module,
  position,
}: {
  module: EcosystemModule;
  position: { x: number; y: number };
}) {
  const { icon: Icon, fg } = moduleStyle[module.slug] ?? moduleStyle.crm;
  const onRight = position.x > 50;
  const top = Math.min(Math.max(position.y, 22), 78);

  return (
    <div
      className="animate-[card-in_220ms_ease-out] pointer-events-none absolute z-30 w-44 -translate-y-1/2 rounded-xl border border-brand-border bg-white/95 p-3 shadow-xl shadow-brand-purple/15 backdrop-blur sm:w-52"
      style={{
        top: `${top}%`,
        ...(onRight ? { right: `${100 - position.x + 7}%` } : { left: `${position.x + 7}%` }),
      }}
      role="tooltip"
    >
      <div className="flex items-center gap-2">
        <Icon className={cn("size-4", fg)} aria-hidden />
        <p className="text-sm font-semibold text-brand-text">{module.label}</p>
      </div>
      <p className="mt-0.5 text-[9px] font-semibold tracking-[0.18em] text-brand-purple uppercase">
        Intelligent module
      </p>
      <ul className="mt-2 flex flex-col gap-1 border-t border-brand-border pt-2">
        {module.features.map((feature) => (
          <li key={feature} className="flex items-center gap-1.5 text-[11px] text-brand-muted">
            <Check className="size-3 shrink-0 text-brand-purple" strokeWidth={3} aria-hidden />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
