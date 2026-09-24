"use client";

interface LineChartProps {
  points: number[];
  labels: string[];
  animate: boolean;
  unit?: string;
}

function niceMax(value: number) {
  const step = Math.ceil(value / 4 / 5) * 5 || 5;
  return step * 4;
}

export function LineChart({ points, labels, animate, unit = "L" }: LineChartProps) {
  const width = 220;
  const height = 46;
  const axisMax = niceMax(Math.max(...points));
  const axisSteps = [axisMax, axisMax * 0.75, axisMax * 0.5, axisMax * 0.25, 0];
  const step = width / (points.length - 1);

  const coords = points.map((value, index) => {
    const x = index * step;
    const y = height - (value / axisMax) * height;
    return [x, y] as const;
  });

  const path = coords.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ");
  const areaPath = `${path} L${width},${height} L0,${height} Z`;

  return (
    <div className="flex gap-2">
      <div className="flex shrink-0 flex-col justify-between pb-4 text-right text-[9px] text-slate-400" style={{ height }}>
        {axisSteps.map((s) => (
          <span key={s}>
            {Math.round(s)}
            {unit}
          </span>
        ))}
      </div>

      <div className="min-w-0 flex-1">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-12 w-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6c35f5" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#6c35f5" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 0.25, 0.5, 0.75, 1].map((f) => (
            <line
              key={f}
              x1="0"
              x2={width}
              y1={height * f}
              y2={height * f}
              stroke="#f1f0fb"
              strokeWidth="1"
            />
          ))}
          <path d={areaPath} fill="url(#revenueFill)" opacity={animate ? 1 : 0} className="transition-opacity duration-700" />
          <path
            d={path}
            fill="none"
            stroke="#6c35f5"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={animate ? 0 : 1}
            style={{ transition: "stroke-dashoffset 1.1s ease-out" }}
          />
          {coords.map(([x, y], index) => (
            <circle
              key={index}
              cx={x}
              cy={y}
              r={index === coords.length - 1 ? 3.5 : 0}
              fill="#6c35f5"
              opacity={animate ? 1 : 0}
              className="transition-opacity duration-700"
              style={{ transitionDelay: "1s" }}
            />
          ))}
        </svg>
        <div className="mt-1 flex justify-between text-[9px] text-slate-400">
          {labels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
