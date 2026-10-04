"use client";

import { useEffect, useState } from "react";
import { Check, ScanLine } from "lucide-react";
import { cn } from "@/lib/utils";
import { PreviewFrame } from "../../PreviewFrame";
import { Chips } from "./parts";

type Field = { label: string; value: string; conf: number; box: { x: number; y: number; w: number; h: number } };
const docs: Record<string, { label: string; title: string; fields: Field[] }> = {
  invoice: {
    label: "Invoice",
    title: "TAX INVOICE",
    fields: [
      { label: "Vendor", value: "Dell India Pvt Ltd", conf: 94, box: { x: 6, y: 8, w: 52, h: 9 } },
      { label: "Date", value: "12 May 2026", conf: 99, box: { x: 62, y: 8, w: 32, h: 9 } },
      { label: "GSTIN", value: "27AABCD1234F1Z5", conf: 81, box: { x: 6, y: 24, w: 52, h: 9 } },
      { label: "Total", value: "₹14,80,000", conf: 98, box: { x: 54, y: 80, w: 40, h: 10 } },
    ],
  },
  receipt: {
    label: "Receipt",
    title: "RECEIPT",
    fields: [
      { label: "Merchant", value: "Blue Taxi Co.", conf: 96, box: { x: 6, y: 8, w: 50, h: 9 } },
      { label: "Date", value: "03 Oct 2026", conf: 99, box: { x: 60, y: 8, w: 34, h: 9 } },
      { label: "Category", value: "Travel", conf: 78, box: { x: 6, y: 50, w: 40, h: 9 } },
      { label: "Amount", value: "₹480", conf: 97, box: { x: 56, y: 78, w: 38, h: 10 } },
    ],
  },
  id: {
    label: "ID card",
    title: "EMPLOYEE ID",
    fields: [
      { label: "Name", value: "Priya Sharma", conf: 99, box: { x: 36, y: 16, w: 58, h: 9 } },
      { label: "ID number", value: "SB-20418", conf: 97, box: { x: 36, y: 32, w: 46, h: 9 } },
      { label: "Department", value: "Engineering", conf: 85, box: { x: 36, y: 48, w: 50, h: 9 } },
      { label: "Valid till", value: "31 Mar 2028", conf: 95, box: { x: 36, y: 74, w: 46, h: 9 } },
    ],
  },
};
const confTone = (conf: number) => (conf >= 90 ? "border-emerald-500 bg-emerald-500/10 text-emerald-700" : conf >= 80 ? "border-amber-500 bg-amber-500/10 text-amber-700" : "border-red-500 bg-red-500/10 text-red-700");

export function VisionDashboard() {
  const [docKey, setDocKey] = useState("invoice");
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState<number[]>([]);
  const doc = docs[docKey];
  const scanned = progress >= 100;

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          setRunning(false);
          return 100;
        }
        return current + 5;
      });
    }, 70);
    return () => clearInterval(timer);
  }, [running]);

  const visible = (field: Field) => progress >= field.box.y + field.box.h;
  const verified = doc.fields.filter((field, index) => scanned && (field.conf >= 90 || confirmed.includes(index))).length;
  const field = selected === null ? null : doc.fields[selected];

  const insight = !scanned
    ? running
      ? "Reading the document…"
      : "Press Scan to read this document. Each field comes back with a confidence score."
    : field
      ? field.conf >= 90
        ? `${field.label} read as “${field.value}” with ${field.conf}% confidence. It was verified automatically.`
        : confirmed.includes(selected!)
          ? `${field.label} confirmed as “${field.value}” and saved to the record.`
          : `${field.label} was read with only ${field.conf}% confidence. Please check “${field.value}” and confirm.`
      : `${verified} of ${doc.fields.length} fields verified. Low-confidence fields wait for a person.`;

  return (
    <PreviewFrame title="Document Scanner" period="Vision AI" insight={insight} badge="98% field accuracy">
      <div className="mt-4 flex items-center justify-between gap-2">
        <Chips
          label="Document type"
          options={Object.entries(docs).map(([key, value]) => ({ key, label: value.label }))}
          value={docKey}
          onChange={(key) => {
            setDocKey(key);
            setProgress(0);
            setRunning(false);
            setSelected(null);
            setConfirmed([]);
          }}
        />
        <button
          type="button"
          disabled={running}
          onClick={() => {
            setProgress(0);
            setSelected(null);
            setConfirmed([]);
            setRunning(true);
          }}
          className="flex items-center gap-1.5 rounded-lg bg-brand-purple px-3 py-1.5 text-[11px] font-semibold text-white outline-none hover:bg-brand-purple-dark focus-visible:ring-2 focus-visible:ring-brand-purple/60 disabled:opacity-40"
        >
          <ScanLine className="size-3.5" aria-hidden /> {scanned ? "Scan again" : running ? "Scanning…" : "Scan"}
        </button>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="relative h-[176px] overflow-hidden rounded-xl bg-white shadow-inner ring-1 ring-brand-border" aria-label={`${doc.label} preview`}>
          <p className="absolute top-[40%] left-0 w-full text-center text-[11px] font-black tracking-[0.3em] text-brand-border">{doc.title}</p>
          {[28, 38, 52, 62, 70].map((top) => (
            <span key={top} aria-hidden className="absolute left-[6%] h-[3px] rounded-full bg-brand-border/80" style={{ top: `${top}%`, width: `${40 + ((top * 7) % 30)}%` }} />
          ))}
          {doc.fields.map((item) => (
            <span
              key={item.label}
              className="absolute flex items-center px-1 text-[9px] font-semibold text-brand-text"
              style={{ left: `${item.box.x}%`, top: `${item.box.y}%`, width: `${item.box.w}%`, height: `${item.box.h}%` }}
            >
              <span className="truncate">{item.value}</span>
            </span>
          ))}
          {(running || (progress > 0 && progress < 100)) && (
            <span aria-hidden className="absolute inset-x-0 h-0.5 bg-brand-purple shadow-[0_0_12px_3px_rgba(108,53,245,0.55)]" style={{ top: `${progress}%` }} />
          )}
          {doc.fields.map((item, index) =>
            visible(item) ? (
              <button
                key={item.label}
                type="button"
                aria-label={`${item.label}, ${item.conf}% confidence`}
                onClick={() => setSelected(index)}
                className={cn(
                  "demo-rise absolute rounded border-2 outline-none transition-all focus-visible:ring-2 focus-visible:ring-brand-purple/60",
                  confTone(item.conf),
                  selected === index && "ring-2 ring-brand-navy",
                  confirmed.includes(index) && "border-emerald-500 bg-emerald-500/10"
                )}
                style={{ left: `${item.box.x}%`, top: `${item.box.y}%`, width: `${item.box.w}%`, height: `${item.box.h}%` }}
              />
            ) : null
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <p className="text-[11px] font-semibold tracking-wide text-brand-muted uppercase">Extracted fields</p>
          {doc.fields.map((item, index) => {
            const show = visible(item);
            const ok = scanned && (item.conf >= 90 || confirmed.includes(index));
            return (
              <button
                key={item.label}
                type="button"
                disabled={!show}
                aria-pressed={selected === index}
                onClick={() => setSelected(index)}
                className={cn(
                  "rounded-lg px-2.5 py-1.5 text-left outline-none ring-1 transition-all focus-visible:ring-2 focus-visible:ring-brand-purple/60",
                  selected === index ? "bg-brand-purple-light ring-brand-purple/40" : "bg-brand-surface ring-transparent",
                  !show && "opacity-40"
                )}
              >
                <span className="flex items-center justify-between text-[10px] font-semibold text-brand-muted">
                  {item.label}
                  {show && (ok ? <Check className="size-3 text-emerald-600" aria-label="Verified" /> : <span className={item.conf >= 90 ? "text-emerald-700" : "text-amber-700"}>{item.conf}%</span>)}
                </span>
                <span className="block truncate text-[12px] font-bold text-brand-text">{show ? item.value : "…"}</span>
              </button>
            );
          })}
          {field && scanned && field.conf < 90 && !confirmed.includes(selected!) && (
            <button
              type="button"
              onClick={() => setConfirmed((current) => [...current, selected!])}
              className="demo-rise rounded-lg bg-amber-500 px-3 py-1.5 text-[11px] font-semibold text-white outline-none hover:bg-amber-600 focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              Confirm “{field.value}”
            </button>
          )}
        </div>
      </div>
      <p className="mt-2 text-right text-[11px] font-semibold text-brand-muted">
        {scanned ? `${verified} of ${doc.fields.length} verified` : "Not scanned yet"}
      </p>
    </PreviewFrame>
  );
}
