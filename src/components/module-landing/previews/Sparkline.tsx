import { cn } from "@/lib/utils";

/** Tiny trend line with a soft area fill, drawn in `currentColor`. */
export function Sparkline({ points, className }: { points: number[]; className?: string }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const coords = points.map((point, index) => {
    const x = (index / (points.length - 1)) * 100;
    const y = 30 - ((point - min) / (max - min || 1)) * 26;
    return [x, y] as const;
  });
  const line = coords.map(([x, y], index) => `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  return (
    <svg aria-hidden viewBox="0 0 100 34" preserveAspectRatio="none" className={cn("h-6 w-full", className)}>
      <path d={`${line} L100 34 L0 34 Z`} fill="currentColor" fillOpacity="0.14" />
      <path
        d={line}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
