import type { CSSProperties } from "react";
import { Handshake, Trophy } from "lucide-react";
import { salesPreview } from "@/data/landing/sales";
import { cn } from "@/lib/utils";
import { PreviewFrame } from "../PreviewFrame";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** Revenue trend: solid for what's booked, dashed for the projection, with a soft area fill underneath. */
function ForecastChart({ points, actual }: { points: number[]; actual: number }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const coords = points.map((point, index) => {
    const x = (index / (points.length - 1)) * 100;
    const y = 36 - ((point - min) / (max - min || 1)) * 30;
    return [x, y] as const;
  });
  const toPath = (list: (readonly [number, number])[]) =>
    list.map(([x, y], index) => `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const solid = toPath(coords.slice(0, actual));
  const dashed = toPath(coords.slice(actual - 1));
  const stroke = { fill: "none", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round", vectorEffect: "non-scaling-stroke" } as const;
  return (
    <svg aria-hidden viewBox="0 0 100 40" preserveAspectRatio="none" className="h-14 w-full text-white">
      <path d={`${toPath(coords)} L100 40 L0 40 Z`} fill="currentColor" fillOpacity="0.16" />
      <path d={solid} stroke="currentColor" {...stroke} />
      <path d={dashed} stroke="currentColor" strokeOpacity="0.65" strokeDasharray="3 5" {...stroke} />
    </svg>
  );
}

export function SalesPreview() {
  const { title, period, forecast, quota, reps, toast, insight, badge } = salesPreview;
  return (
    <PreviewFrame title={title} period={period} insight={insight} badge={badge}>
      <div
        className="demo-rise absolute -top-8 -right-3 z-10 hidden items-center gap-2 rounded-xl bg-white py-2 pr-3.5 pl-2.5 shadow-[0_14px_30px_-16px_rgba(108,53,245,0.6)] ring-1 ring-brand-purple/20 sm:flex"
        style={delay(900)}
      >
        <span className="flex size-6 items-center justify-center rounded-full bg-brand-purple text-white">
          <Handshake className="size-3.5" aria-hidden />
        </span>
        <span className="leading-tight">
          <span className="block text-[11px] font-bold text-brand-purple">{toast.title}</span>
          <span className="block text-[11px] text-brand-muted">{toast.text}</span>
        </span>
      </div>

      <div className="mt-4 grid grid-cols-[1.5fr_1fr] gap-2.5">
        <div
          className="demo-rise overflow-hidden rounded-xl bg-gradient-to-br from-brand-purple to-[#4c1fc7] pt-3 text-white shadow-lg shadow-brand-purple/25"
          style={delay(0)}
        >
          <div className="px-3.5">
            <p className="text-[11px] font-semibold text-white/75">{forecast.label}</p>
            <p className="mt-0.5 flex flex-wrap items-baseline gap-x-2">
              <span className="text-2xl font-extrabold">{forecast.value}</span>
              <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[10px] font-bold">{forecast.delta}</span>
            </p>
          </div>
          <div className="mt-1.5">
            <ForecastChart points={forecast.points} actual={forecast.actual} />
          </div>
        </div>

        <div className="demo-rise flex flex-col items-center justify-center rounded-xl bg-brand-surface p-3 text-center" style={delay(100)}>
          <div
            className="relative size-[76px] shrink-0 rounded-full"
            style={{ background: `conic-gradient(var(--color-brand-purple) 0 ${quota.percent}%, #ddd6f9 0)` }}
          >
            <div className="absolute inset-2 flex items-center justify-center rounded-full bg-white">
              <span className="text-lg font-extrabold text-brand-text">{quota.percent}%</span>
            </div>
          </div>
          <p className="mt-2 text-[11px] font-bold text-brand-text">{quota.label}</p>
          <p className="text-[10px] text-brand-muted">{quota.detail}</p>
        </div>
      </div>

      <div className="mt-4 border-t border-brand-border pt-3">
        <p className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-brand-muted uppercase">
          <Trophy className="size-3.5 text-amber-500" aria-hidden /> Top performers
        </p>
        <ul className="mt-2 flex flex-col gap-2">
          {reps.map((rep, index) => (
            <li
              key={rep.name}
              className="demo-rise flex items-center gap-3 rounded-xl bg-brand-surface px-3 py-2"
              style={delay(300 + index * 110)}
            >
              <span className={cn("relative flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold", rep.tone)}>
                {rep.name[0]}
                {index === 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-amber-400 text-white ring-2 ring-white">
                    <Trophy className="size-2.5" aria-hidden />
                  </span>
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-semibold text-brand-text">{rep.name}</span>
                <span className="block text-[11px] text-brand-muted">{rep.deals} deals closed</span>
              </span>
              <span className="hidden h-2 w-24 overflow-hidden rounded-full bg-white sm:block">
                <span
                  className={cn("demo-grow-x block h-full rounded-full bg-gradient-to-r", rep.bar)}
                  style={{ width: rep.attainment, ...delay(450 + index * 110) }}
                />
              </span>
              <span className="w-14 text-right text-[13px] font-bold text-brand-text">{rep.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </PreviewFrame>
  );
}
