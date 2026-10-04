"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { PreviewFrame } from "../../PreviewFrame";
import { Chips, SectionLabel } from "./parts";

const warehouses = [
  { key: "mumbai", label: "Mumbai" },
  { key: "pune", label: "Pune" },
  { key: "delhi", label: "Delhi" },
] as const;
type WarehouseKey = (typeof warehouses)[number]["key"];
const skus = ["Steel bracket", "Packing tape", "Safety gloves", "Cable ties", "Pallet wrap", "Box cutter", "Label rolls", "Bubble wrap"];
const rowNames = ["A", "B", "C"];
const COLS = 8;

const pseudo = (n: number) => ((n * 9301 + 49297) % 233280) / 233280;
const bins = (warehouse: number) =>
  Array.from({ length: COLS * rowNames.length }, (_, index) => {
    const fill = Math.round(pseudo(warehouse * 31 + index * 7 + 3) * 100);
    return {
      id: `${rowNames[Math.floor(index / COLS)]}${(index % COLS) + 1}`,
      sku: `SKU-${200 + ((index * 13 + warehouse * 5) % 90)} · ${skus[(index + warehouse * 3) % skus.length]}`,
      fill,
    };
  });
const data: Record<WarehouseKey, ReturnType<typeof bins>> = { mumbai: bins(1), pune: bins(2), delhi: bins(3) };

const status = (fill: number) => (fill < 15 ? "Out" : fill < 35 ? "Low" : fill < 75 ? "OK" : "Full");
const tones: Record<string, string> = {
  Out: "bg-red-400",
  Low: "bg-amber-300",
  OK: "bg-brand-purple/55",
  Full: "bg-emerald-400",
};

export function InventoryDashboard() {
  const [warehouse, setWarehouse] = useState<WarehouseKey>("mumbai");
  const [selected, setSelected] = useState(0);
  const [ordered, setOrdered] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const cells = data[warehouse];
  const needs = (id: string, fill: number) => status(fill) !== "OK" && status(fill) !== "Full" && !ordered.includes(`${warehouse}-${id}`);
  const lowCount = cells.filter((cell) => needs(cell.id, cell.fill)).length;
  const orderedCount = cells.filter((cell) => ordered.includes(`${warehouse}-${cell.id}`)).length;
  const average = Math.round(cells.reduce((sum, cell) => sum + cell.fill, 0) / cells.length);
  const cell = cells[selected];
  const key = `${warehouse}-${cell.id}`;
  const isOrdered = ordered.includes(key);
  const cellStatus = status(cell.fill);
  const canOrder = (cellStatus === "Low" || cellStatus === "Out") && !isOrdered;

  const insight =
    message ??
    `Bin ${cell.id}: ${cell.sku.split(" · ")[1]} is ${cellStatus.toLowerCase()} at ${cell.fill}% full. ${canOrder ? "Raise a purchase order?" : isOrdered ? "A purchase order is already on its way." : "No action needed."}`;

  return (
    <PreviewFrame title="Warehouse View" period="Live stock" insight={insight} badge={`${lowCount} bins to restock`}>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <Chips
          label="Warehouse"
          options={warehouses.map((item) => ({ key: item.key, label: item.label }))}
          value={warehouse}
          onChange={(next) => {
            setWarehouse(next);
            setSelected(0);
            setMessage(null);
          }}
        />
        <dl className="flex gap-2 text-center">
          {[
            ["Avg. fill", `${average}%`],
            ["To restock", String(lowCount)],
            ["On order", String(orderedCount)],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg bg-brand-surface px-2.5 py-1">
              <dt className="text-[10px] font-semibold text-brand-muted">{label}</dt>
              <dd className="text-sm font-extrabold text-brand-text">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-3 rounded-xl bg-brand-surface p-2.5">
        <div className="grid grid-cols-8 gap-1.5" role="group" aria-label="Storage bins">
          {cells.map((item, index) => {
            const id = `${warehouse}-${item.id}`;
            const orderedBin = ordered.includes(id);
            const label = orderedBin ? "Ordered" : status(item.fill);
            return (
              <button
                key={id}
                type="button"
                aria-pressed={index === selected}
                aria-label={`Bin ${item.id}, ${item.fill}% full, ${label}`}
                onClick={() => {
                  setSelected(index);
                  setMessage(null);
                }}
                className={cn(
                  "relative h-8 rounded-md text-[9px] font-bold text-white/90 outline-none transition-all focus-visible:ring-2 focus-visible:ring-brand-purple/60",
                  orderedBin ? "bg-sky-400" : tones[status(item.fill)],
                  index === selected ? "scale-110 shadow-lg ring-2 ring-brand-navy" : "hover:scale-105"
                )}
              >
                {item.id}
                {orderedBin && <span aria-hidden className="absolute inset-0 rounded-md border-2 border-dashed border-white/80" />}
              </button>
            );
          })}
        </div>
        <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-brand-muted">
          {[
            ["Out", "bg-red-400"],
            ["Low", "bg-amber-300"],
            ["OK", "bg-brand-purple/55"],
            ["Full", "bg-emerald-400"],
            ["On order", "bg-sky-400"],
          ].map(([label, tone]) => (
            <li key={label} className="flex items-center gap-1">
              <span className={cn("size-2 rounded-sm", tone)} aria-hidden /> {label}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-3 flex items-center gap-3 rounded-xl bg-brand-purple-light px-3 py-2.5 ring-1 ring-brand-purple/20">
        <div className="min-w-0 flex-1">
          <SectionLabel>Bin {cell.id}</SectionLabel>
          <p className="truncate text-[13px] font-semibold text-brand-text">{cell.sku}</p>
          <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-white">
            <span className={cn("block h-full rounded-full transition-all duration-500", isOrdered ? "bg-sky-400" : tones[cellStatus])} style={{ width: `${cell.fill}%` }} />
          </span>
        </div>
        <span className="text-sm font-extrabold text-brand-text">{cell.fill}%</span>
        <button
          type="button"
          disabled={!canOrder}
          onClick={() => {
            setOrdered((current) => [...current, key]);
            setMessage(`Purchase order PO-4414 raised for ${cell.sku.split(" · ")[1]}. It arrives in about 7 days.`);
          }}
          className={cn(
            "rounded-lg px-3 py-1.5 text-[11px] font-semibold outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/60",
            canOrder ? "bg-brand-purple text-white hover:bg-brand-purple-dark" : "bg-white text-brand-muted ring-1 ring-brand-border"
          )}
        >
          {isOrdered ? "PO raised" : canOrder ? "Reorder" : "In stock"}
        </button>
      </div>
    </PreviewFrame>
  );
}
