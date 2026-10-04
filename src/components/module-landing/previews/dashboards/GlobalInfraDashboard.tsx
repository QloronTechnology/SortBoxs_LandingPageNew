"use client";

import { useState } from "react";
import { Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { PreviewFrame } from "../../PreviewFrame";
import { Chips } from "./parts";

const regions = [
  { key: "use", name: "US East", city: "Virginia", x: 53, y: 37 },
  { key: "usw", name: "US West", city: "Oregon", x: 30, y: 33 },
  { key: "eu", name: "EU Frankfurt", city: "Germany", x: 101, y: 28 },
  { key: "in", name: "India Mumbai", city: "India", x: 137, y: 46 },
  { key: "sg", name: "Singapore", city: "South-East Asia", x: 153, y: 62 },
];
const users = [
  { key: "ny", name: "New York", x: 55, y: 35 },
  { key: "lon", name: "London", x: 97, y: 25 },
  { key: "del", name: "Delhi", x: 138, y: 38 },
  { key: "syd", name: "Sydney", x: 174, y: 78 },
  { key: "sp", name: "São Paulo", x: 58, y: 72 },
];
const land = [
  "M20 18L52 14L62 26L56 40L44 48L34 44L24 34Z",
  "M46 52L58 52L62 68L54 88L47 70Z",
  "M88 20L108 16L112 30L106 40L112 58L104 80L94 72L90 48L84 34Z",
  "M112 16L168 14L178 30L166 46L140 54L122 44L112 30Z",
  "M158 66L180 64L184 78L166 82Z",
];
const distance = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.hypot(a.x - b.x, a.y - b.y);
const latencyTo = (user: { x: number; y: number }, region: { x: number; y: number }) => Math.round(distance(user, region) * 1.1 + 9);

export function GlobalInfraDashboard() {
  const [userKey, setUserKey] = useState("syd");
  const [homeKey, setHomeKey] = useState("in");
  const user = users.find((item) => item.key === userKey)!;
  const home = regions.find((item) => item.key === homeKey)!;
  const nearest = regions.reduce((best, region) => (distance(user, region) < distance(user, best) ? region : best), regions[0]);
  const edgeLatency = latencyTo(user, nearest);
  const homeLatency = latencyTo(user, home);

  const insight =
    nearest.key === home.key
      ? `${user.name} connects to ${nearest.name} in ${edgeLatency} ms. Their data is stored there too, so reads are local.`
      : `${user.name} connects to ${nearest.name} in ${edgeLatency} ms. Data stays pinned in ${home.name}, ${homeLatency} ms away.`;

  return (
    <PreviewFrame title="Global Network" period="5 regions" insight={insight} badge="Data stays in your region">
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-semibold text-brand-muted">Your team is in</span>
        <Chips
          label="Team location"
          options={users.map((item) => ({ key: item.key, label: item.name }))}
          value={userKey}
          onChange={setUserKey}
        />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-[1.25fr_1fr]">
        <div className="self-start overflow-hidden rounded-xl bg-gradient-to-br from-brand-navy to-[#2a1f7a] p-1">
          <svg viewBox="0 0 200 100" className="h-auto w-full" role="img" aria-label="Map of SortBoxs regions">
            <defs>
              <pattern id="map-dots" width="3.2" height="3.2" patternUnits="userSpaceOnUse">
                <circle cx="1.6" cy="1.6" r="0.8" fill="#a5b4fc" fillOpacity="0.55" />
              </pattern>
              <clipPath id="map-land">
                {land.map((path) => (
                  <path key={path} d={path} />
                ))}
              </clipPath>
            </defs>
            <rect width="200" height="100" fill="url(#map-dots)" clipPath="url(#map-land)" />
            <line x1={user.x} y1={user.y} x2={nearest.x} y2={nearest.y} stroke="#34d399" strokeWidth="1.2" strokeDasharray="2.5 2" />
            {nearest.key !== home.key && (
              <line x1={nearest.x} y1={nearest.y} x2={home.x} y2={home.y} stroke="#c4b5fd" strokeWidth="1" strokeDasharray="1.5 2.5" />
            )}
            {regions.map((region) => {
              const isNearest = region.key === nearest.key;
              const isHome = region.key === home.key;
              return (
                <g key={region.key}>
                  {isNearest && (
                    <circle
                      cx={region.x}
                      cy={region.y}
                      r="5"
                      fill="#34d399"
                      fillOpacity="0.35"
                      className="animate-ping"
                      style={{ transformBox: "fill-box", transformOrigin: "center" }}
                    />
                  )}
                  <circle
                    cx={region.x}
                    cy={region.y}
                    r={isHome ? 3.6 : 2.8}
                    fill={isHome ? "#a78bfa" : isNearest ? "#34d399" : "#e0e7ff"}
                    stroke="#fff"
                    strokeWidth="0.9"
                  />
                </g>
              );
            })}
            <g>
              <circle cx={user.x} cy={user.y} r="2.4" fill="#fbbf24" stroke="#fff" strokeWidth="0.9" />
              <text x={user.x} y={user.y - 4.5} textAnchor="middle" fontSize="5" fontWeight="700" fill="#fff">
                {user.name}
              </text>
            </g>
          </svg>
        </div>

        <ul className="flex flex-col gap-1" aria-label="Regions">
          {regions.map((region) => {
            const isNearest = region.key === nearest.key;
            const isHome = region.key === home.key;
            return (
              <li key={region.key}>
                <button
                  type="button"
                  aria-pressed={isHome}
                  aria-label={`Make ${region.name} the home region`}
                  onClick={() => setHomeKey(region.key)}
                  className={cn(
                    "flex w-full items-center gap-1.5 rounded-lg px-2 py-1 text-left outline-none ring-1 transition-all focus-visible:ring-2 focus-visible:ring-brand-purple/60",
                    isHome ? "bg-brand-purple-light ring-brand-purple/40" : "bg-brand-surface ring-transparent hover:ring-brand-purple/30",
                  )}
                >
                  <span
                    className={cn("size-2.5 rounded-full", isNearest ? "bg-emerald-500" : isHome ? "bg-brand-purple" : "bg-brand-border")}
                    aria-hidden
                  />
                  <span className="min-w-0 flex-1 leading-tight">
                    <span className="block truncate text-[11px] font-semibold text-brand-text">{region.name}</span>
                    <span className="flex items-center gap-1 text-[9px] font-bold">
                      {isNearest && <span className="text-emerald-700">Nearest</span>}
                      {isHome && (
                        <span className="flex items-center gap-0.5 text-brand-purple">
                          <Home className="size-2" aria-hidden /> Data home
                        </span>
                      )}
                      {!isNearest && !isHome && <span className="text-brand-muted">{region.city}</span>}
                    </span>
                  </span>
                  <span className="w-11 text-right text-[11px] font-bold text-brand-text tabular-nums">{latencyTo(user, region)} ms</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </PreviewFrame>
  );
}
