"use client";

import { useEffect, useRef, useState } from "react";
import { Check, LoaderCircle, Sparkles, UsersRound } from "lucide-react";
import { planBuilder, pricingModules } from "@/data/pricing";
import { toneClasses } from "@/components/layout/Header/menus/menuStyles";
import { cn } from "@/lib/utils";

/**
 * Animated "tailored plan" builder for the Build-your-plan banner. For each business type it
 * highlights the recommended modules, selects them one by one and builds the estimate, then moves to
 * the next business type. Starts when scrolled into view; static final state for reduced motion.
 */

const { industries, modules, modulePrice, users } = planBuilder;
const moduleInfo = Object.fromEntries(pricingModules.map((m) => [m.name, m]));
const inr = new Intl.NumberFormat("en-IN");

type Phase = "suggest" | "select" | "ready";

/** Smoothly animates a number towards `target`. */
function useTween(target: number, duration = 450) {
  const [value, setValue] = useState(target);
  const from = useRef(target);

  useEffect(() => {
    const start = performance.now();
    const initial = from.current;
    let raf = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      const v = Math.round(initial + (target - initial) * eased);
      from.current = v;
      setValue(v);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return value;
}

export function PlanBuilderDemo({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [industry, setIndustry] = useState(0);
  const [selected, setSelected] = useState<string[]>(industries[0].picks);
  const [phase, setPhase] = useState<Phase>("ready");

  useEffect(() => {
    const node = rootRef.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));
    let started = false;

    function run(i: number) {
      const { picks } = industries[i];
      setIndustry(i);
      setSelected([]);
      setPhase("suggest");

      const selectStart = 1100;
      const perPick = 520;
      at(selectStart - 50, () => setPhase("select"));
      picks.forEach((name, k) => at(selectStart + k * perPick, () => setSelected((s) => [...s, name])));
      const done = selectStart + picks.length * perPick;
      at(done + 150, () => setPhase("ready"));
      at(done + 2900, () => run((i + 1) % industries.length));
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          observer.disconnect();
          run(0);
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  const picks = industries[industry].picks;
  const total = selected.reduce((sum, name) => sum + (modulePrice[name] ?? 0), 0);
  const price = useTween(total);
  const fit = Math.round((selected.length / picks.length) * 100);

  return (
    <div
      ref={rootRef}
      role="img"
      aria-label={`Animated example: a Sortboxs plan tailored for ${industries[industry].name}, built from ${picks.join(", ")}`}
      className={cn("flex items-stretch gap-3.5 select-none", className)}
    >
      {/* Module picker */}
      <div aria-hidden className="flex min-w-0 flex-1 flex-col rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur-sm">
        <div className="flex items-center gap-1.5">
          <span className="mr-1 text-[11px] font-medium text-white/75">Tailored for</span>
          <div className="relative flex rounded-full bg-black/15 p-0.5">
            {industries.map((ind, i) => (
              <span
                key={ind.name}
                className={cn(
                  "relative z-10 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors duration-300",
                  i === industry ? "text-brand-purple" : "text-white/80"
                )}
              >
                {i === industry && (
                  <span className="absolute inset-0 -z-10 animate-[bp-pop_350ms_ease-out] rounded-full bg-white shadow" />
                )}
                {ind.name}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-2.5 grid grid-cols-3 gap-1.5">
          {modules.map((name) => {
            const info = moduleInfo[name];
            const Icon = info?.icon;
            const isPicked = selected.includes(name);
            const isSuggested = !isPicked && picks.includes(name) && phase !== "ready";
            return (
              <div
                key={name}
                className={cn(
                  "relative flex h-[30px] items-center gap-1.5 rounded-lg border px-2 text-[11px] font-semibold transition-all duration-300",
                  isPicked
                    ? "scale-100 border-white bg-white text-brand-text shadow-md shadow-black/10"
                    : isSuggested
                      ? "border-dashed border-white/70 bg-white/15 text-white"
                      : "border-white/15 bg-white/5 text-white/55"
                )}
              >
                {Icon && (
                  <span
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-md transition-colors duration-300",
                      isPicked ? toneClasses[info.tone] : "bg-white/10"
                    )}
                  >
                    <Icon className="size-3" />
                  </span>
                )}
                <span className="truncate">{name}</span>
                {isSuggested && phase === "suggest" && (
                  <span className="absolute inset-0 animate-pulse rounded-lg ring-2 ring-white/40" />
                )}
                <span
                  className={cn(
                    "absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-emerald-500 text-white shadow transition-all duration-300",
                    isPicked ? "scale-100 opacity-100" : "scale-0 opacity-0"
                  )}
                >
                  <Check className="size-2.5" strokeWidth={3} />
                </span>
              </div>
            );
          })}
        </div>

        <p className="mt-2 flex items-center gap-1.5 text-[10.5px] text-white/80">
          <Sparkles className={cn("size-3", phase === "suggest" && "animate-spin [animation-duration:2s]")} />
          {phase === "suggest"
            ? `Finding the right modules for ${industries[industry].name}…`
            : `${picks.length} modules recommended for ${industries[industry].name}`}
        </p>
      </div>

      {/* Plan summary */}
      <div aria-hidden className="flex w-[196px] shrink-0 flex-col rounded-2xl bg-white p-3.5 text-brand-text shadow-xl shadow-black/20">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-bold">Your plan</span>
          <span className="flex items-center gap-1 rounded-full bg-brand-purple-light px-1.5 py-0.5 text-[9.5px] font-semibold text-brand-purple">
            <Sparkles className="size-2.5" /> {industries[industry].name}
          </span>
        </div>

        <div className="mt-2 flex h-6 items-center">
          {selected.map((name, i) => {
            const info = moduleInfo[name];
            const Icon = info?.icon;
            return (
              <span
                key={`${industry}-${name}`}
                className={cn(
                  "flex size-6 animate-[bp-pop_350ms_ease-out_both] items-center justify-center rounded-full ring-2 ring-white",
                  info && toneClasses[info.tone],
                  i > 0 && "-ml-1.5"
                )}
              >
                {Icon && <Icon className="size-3" />}
              </span>
            );
          })}
          <span className="ml-2 text-[10.5px] text-brand-muted">
            {selected.length} module{selected.length === 1 ? "" : "s"}
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between text-[10.5px] text-brand-muted">
          <span className="flex items-center gap-1">
            <UsersRound className="size-3" /> Users
          </span>
          <span className="font-semibold text-brand-text">{users}</span>
        </div>

        <div className="mt-1.5">
          <div className="flex justify-between text-[10px] text-brand-muted">
            <span>Business fit</span>
            <span className="font-semibold text-emerald-600">{fit}%</span>
          </div>
          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,#6c35f5,#10b981)] transition-[width] duration-500 ease-out"
              style={{ width: `${fit}%` }}
            />
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between border-t border-slate-100 pt-2">
          <span>
            <span className="block text-[9.5px] text-brand-muted">Estimated</span>
            <span className="text-[17px] leading-none font-bold tabular-nums">₹{inr.format(price)}</span>
            <span className="text-[10px] text-brand-muted">/mo</span>
          </span>
          <span
            className={cn(
              "flex h-6 items-center gap-1 rounded-md px-2 text-[10px] font-semibold transition-colors duration-300",
              phase === "ready" ? "bg-emerald-500 text-white" : "bg-brand-purple-light text-brand-purple"
            )}
          >
            {phase === "ready" ? (
              <>
                <Check className="size-3" strokeWidth={3} /> Ready
              </>
            ) : (
              <>
                <LoaderCircle className="size-3 animate-spin" /> Building
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
