"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { PreviewFrame } from "../../PreviewFrame";
import { Chips, SectionLabel } from "./parts";

const swatches = [
  { key: "#6c35f5", label: "Violet" },
  { key: "#0ea5e9", label: "Sky" },
  { key: "#10b981", label: "Emerald" },
  { key: "#f59e0b", label: "Amber" },
  { key: "#ef4444", label: "Red" },
  { key: "#111827", label: "Ink" },
];
type Shape = "circle" | "rounded" | "square";
const shapes: { key: Shape; label: string }[] = [
  { key: "circle", label: "Circle" },
  { key: "rounded", label: "Rounded" },
  { key: "square", label: "Square" },
];
const shapeClass: Record<Shape, string> = { circle: "rounded-full", rounded: "rounded-lg", square: "rounded-sm" };
const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "") || "yourbrand";

export function BrandStudioDashboard() {
  const [name, setName] = useState("Northwind");
  const [color, setColor] = useState("#6c35f5");
  const [shape, setShape] = useState<Shape>("rounded");
  const [powered, setPowered] = useState(false);
  const brand = name.trim() || "Your brand";

  return (
    <PreviewFrame
      title="Brand Studio"
      period="Live preview"
      insight={`${brand} is live at app.${slugify(name)}.com in your colours and logo.`}
      badge="Your brand, our engine"
    >
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1.35fr]">
        <div className="flex flex-col gap-3">
          <div>
            <label htmlFor="brand-name" className="text-[11px] font-bold text-brand-text">
              Company name
            </label>
            <input
              id="brand-name"
              value={name}
              maxLength={18}
              onChange={(event) => setName(event.target.value)}
              className="mt-1 w-full rounded-lg bg-white px-3 py-2 text-[13px] font-semibold text-brand-text ring-1 ring-brand-border outline-none focus:ring-2 focus:ring-brand-purple/60"
            />
          </div>
          <div>
            <SectionLabel>Brand colour</SectionLabel>
            <div className="mt-1.5 flex flex-wrap gap-2" role="group" aria-label="Brand colour">
              {swatches.map((swatch) => (
                <button
                  key={swatch.key}
                  type="button"
                  aria-pressed={color === swatch.key}
                  aria-label={swatch.label}
                  onClick={() => setColor(swatch.key)}
                  className={cn("size-7 rounded-full outline-none ring-2 ring-offset-2 transition-transform focus-visible:ring-brand-purple", color === swatch.key ? "scale-110 ring-brand-navy" : "ring-transparent hover:scale-105")}
                  style={{ backgroundColor: swatch.key }}
                />
              ))}
            </div>
          </div>
          <div>
            <SectionLabel>Logo shape</SectionLabel>
            <div className="mt-1.5">
              <Chips label="Logo shape" options={shapes} value={shape} onChange={setShape} />
            </div>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={powered}
            onClick={() => setPowered((current) => !current)}
            className="flex items-center gap-2 text-left text-[11px] font-semibold text-brand-text outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/60"
          >
            <span className={cn("relative h-5 w-9 shrink-0 rounded-full transition-colors", powered ? "bg-brand-purple" : "bg-brand-border")}>
              <span className={cn("absolute top-0.5 size-4 rounded-full bg-white shadow transition-all", powered ? "left-[18px]" : "left-0.5")} />
            </span>
            Show &ldquo;Powered by SortBoxs&rdquo;
          </button>
        </div>

        <div className="overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-brand-border">
          <div className="flex items-center gap-1.5 bg-brand-surface px-2.5 py-1.5">
            <span className="size-1.5 rounded-full bg-red-300" aria-hidden />
            <span className="size-1.5 rounded-full bg-amber-300" aria-hidden />
            <span className="size-1.5 rounded-full bg-emerald-300" aria-hidden />
            <span className="ml-1.5 min-w-0 flex-1 truncate rounded bg-white px-2 py-0.5 text-[9px] text-brand-muted">https://app.{slugify(name)}.com</span>
          </div>
          <div className="grid grid-cols-[84px_1fr]">
            <div className="flex flex-col gap-1.5 border-r border-brand-border bg-brand-surface p-2">
              <div className="flex items-center gap-1.5">
                <span className={cn("flex size-6 shrink-0 items-center justify-center text-[11px] font-extrabold text-white transition-all", shapeClass[shape])} style={{ backgroundColor: color }}>
                  {brand[0].toUpperCase()}
                </span>
                <span className="truncate text-[10px] font-extrabold text-brand-text">{brand}</span>
              </div>
              {["Dashboard", "Customers", "Invoices", "Reports"].map((item, index) => (
                <span
                  key={item}
                  className={cn("rounded px-1.5 py-1 text-[9px] font-semibold transition-colors", index === 0 ? "text-white" : "text-brand-muted")}
                  style={index === 0 ? { backgroundColor: color } : undefined}
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-2 p-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold text-brand-text">Dashboard</span>
                <span className="rounded px-2 py-1 text-[9px] font-bold text-white transition-colors" style={{ backgroundColor: color }}>
                  + New deal
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  ["Revenue", "₹18.4L"],
                  ["Deals", "320"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-lg bg-brand-surface px-2 py-1.5">
                    <p className="text-[8px] font-semibold text-brand-muted">{label}</p>
                    <p className="text-[12px] font-extrabold transition-colors" style={{ color }}>
                      {value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex h-9 items-end gap-1">
                {[40, 62, 48, 80, 66, 92].map((height, index) => (
                  <span key={index} className="flex-1 rounded-t transition-colors" style={{ height: `${height}%`, backgroundColor: color, opacity: 0.35 + index * 0.11 }} />
                ))}
              </div>
              {powered && <p className="text-right text-[8px] text-brand-muted">Powered by SortBoxs</p>}
            </div>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
