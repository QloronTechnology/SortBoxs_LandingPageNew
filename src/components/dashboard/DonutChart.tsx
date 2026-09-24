"use client";

interface DonutSegment {
  label: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  segments: DonutSegment[];
  centerLabel: string;
  centerValue: string;
  animate: boolean;
}

export function DonutChart({ segments, centerLabel, centerValue, animate }: DonutChartProps) {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;

  const withOffsets = segments.reduce<Array<DonutSegment & { offset: number }>>((acc, segment) => {
    const previous = acc[acc.length - 1];
    const offset = previous ? previous.offset + previous.value : 0;
    return [...acc, { ...segment, offset }];
  }, []);

  return (
    <div className="flex items-center gap-3">
      <svg viewBox="0 0 72 72" className="size-16 -rotate-90">
        <circle cx="36" cy="36" r={radius} fill="none" stroke="#f1f0fb" strokeWidth="9" />
        {withOffsets.map((segment) => {
          const length = (segment.value / 100) * circumference;
          const offset = (segment.offset / 100) * circumference;
          return (
            <circle
              key={segment.label}
              cx="36"
              cy="36"
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={`${length} ${circumference}`}
              strokeDashoffset={animate ? -offset : circumference}
              className="transition-[stroke-dashoffset] duration-1000 ease-out"
            />
          );
        })}
      </svg>
      <div>
        <p className="text-base font-bold text-brand-text">{centerValue}</p>
        <p className="text-[10px] text-slate-500">{centerLabel}</p>
        <ul className="mt-1 flex flex-col gap-0.5">
          {segments.map((segment) => (
            <li key={segment.label} className="flex items-center gap-1.5 text-[10px] text-slate-500">
              <span className="size-1.5 rounded-full" style={{ background: segment.color }} aria-hidden />
              {segment.label} {segment.value}%
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
