"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

/** True when the visitor asked the OS for less motion. The Sales page then shows finished states instead of looping. */
export function useReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/**
 * A counter that goes 0 → length (plus `hold` extra ticks at the end) and loops, one tick every `ms`.
 * Does nothing while `paused` (e.g. reduced motion or the visitor took over).
 */
export function useTicker(length: number, ms: number, paused: boolean, hold = 1) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setTick((value) => (value >= length + hold - 1 ? 0 : value + 1)), ms);
    return () => clearInterval(timer);
  }, [length, ms, paused, hold]);
  return [tick, setTick] as const;
}

/** Eases a number toward `target` over `duration` ms (used for the revenue counter). */
export function useTween(target: number, duration = 900) {
  const [value, setValue] = useState(target);
  useEffect(() => {
    let frame = 0;
    let from = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue((current) => {
        if (progress === 0) from = current;
        return Math.round(from + (target - from) * (1 - Math.pow(1 - progress, 3)));
      });
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);
  return value;
}

/** ₹4,80,000 style (Indian digit grouping), without relying on the runtime's Intl data. */
export function rupees(amount: number) {
  const digits = Math.round(amount).toString();
  if (digits.length <= 3) return `₹${digits}`;
  const last3 = digits.slice(-3);
  const rest = digits.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return `₹${rest},${last3}`;
}
