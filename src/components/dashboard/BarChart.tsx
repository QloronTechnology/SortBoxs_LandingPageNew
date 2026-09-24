"use client";

interface BarDatum {
  label: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  data: BarDatum[];
  animate: boolean;
  max?: number;
}

const CONTAINER_HEIGHT = 64;
const MIN_BAR_HEIGHT = 4;

function niceMax(value: number) {
  const step = Math.ceil(value / 4 / 10) * 10 || 10;
  return step * 4;
}

export function BarChart({ data, animate, max }: BarChartProps) {
  const rawMax = max ?? Math.max(...data.map((d) => d.value));
  const axisMax = niceMax(rawMax);
  const axisSteps = [axisMax, axisMax * 0.75, axisMax * 0.5, axisMax * 0.25, 0];

  return (
    <div className="flex gap-2">
      <div className="flex shrink-0 flex-col justify-between pb-4 text-right text-[9px] text-slate-400" style={{ height: CONTAINER_HEIGHT }}>
        {axisSteps.map((step) => (
          <span key={step}>{Math.round(step)}</span>
        ))}
      </div>

      <div className="flex flex-1 items-end justify-between gap-2">
        {data.map((bar, index) => {
          const targetPx = Math.max((bar.value / axisMax) * CONTAINER_HEIGHT, MIN_BAR_HEIGHT);

          return (
            <div key={bar.label} className="flex flex-1 flex-col items-center gap-1">
              <div
                className="relative mx-auto w-full max-w-[26px] overflow-hidden rounded-md"
                style={{
                  height: CONTAINER_HEIGHT,
                  backgroundImage:
                    "repeating-linear-gradient(to bottom, #f1f0fb 0, #f1f0fb 1px, transparent 1px, transparent 25%)",
                }}
              >
                <div
                  className="absolute right-0 bottom-0 left-0 rounded-md transition-[height] duration-700 ease-out"
                  style={{
                    height: animate ? targetPx : 0,
                    transitionDelay: `${index * 80}ms`,
                    background: bar.color ?? "linear-gradient(180deg, #8b6bf5 0%, #6c35f5 100%)",
                  }}
                />
              </div>
              <span className="text-[10px] font-medium text-slate-500">{bar.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
