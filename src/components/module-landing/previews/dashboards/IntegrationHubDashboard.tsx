"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Check, Loader2 } from "lucide-react";
import { integrations } from "@/data/integrations";
import { cn } from "@/lib/utils";
import { PreviewFrame } from "../../PreviewFrame";
import { Chips } from "./parts";

type Category = "all" | "Productivity" | "Communication" | "Commerce" | "Cloud";
const categories: { key: Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "Productivity", label: "Productivity" },
  { key: "Communication", label: "Communication" },
  { key: "Commerce", label: "Commerce" },
  { key: "Cloud", label: "Cloud" },
];
const info: Record<string, { category: Exclude<Category, "all">; syncs: string; records: number }> = {
  "Google Workspace": { category: "Productivity", syncs: "Email, files, contacts", records: 1840 },
  "Microsoft 365": { category: "Productivity", syncs: "Outlook, OneDrive, Excel", records: 1260 },
  "Google Calendar": { category: "Productivity", syncs: "Meetings and availability", records: 214 },
  Slack: { category: "Communication", syncs: "Alerts and approvals", records: 96 },
  Teams: { category: "Communication", syncs: "Chat and meetings", records: 88 },
  Zoom: { category: "Communication", syncs: "Meetings and recordings", records: 52 },
  WhatsApp: { category: "Communication", syncs: "Customer conversations", records: 430 },
  Shopify: { category: "Commerce", syncs: "Products, orders, customers", records: 2410 },
  WooCommerce: { category: "Commerce", syncs: "Products, orders, customers", records: 1190 },
  AWS: { category: "Cloud", syncs: "Storage and backups", records: 3200 },
};
type Status = "idle" | "connecting" | "connected";

export function IntegrationHubDashboard() {
  const [category, setCategory] = useState<Category>("all");
  const [status, setStatus] = useState<Record<string, Status>>({ "Google Workspace": "connected", Slack: "connected" });
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const pending = Object.keys(status).find((name) => status[name] === "connecting");
    if (!pending) return;
    const timer = setTimeout(() => {
      setStatus((current) => ({ ...current, [pending]: "connected" }));
      setMessage(`${pending} is connected. ${info[pending].records.toLocaleString("en-IN")} records are syncing both ways, and you can see every change in the sync log.`);
    }, 900);
    return () => clearTimeout(timer);
  }, [status]);

  const matching = integrations.filter((item) => category === "all" || info[item.name].category === category);
  const visible = matching.slice(0, 6);
  const connected = integrations.filter((item) => status[item.name] === "connected");
  const records = connected.reduce((sum, item) => sum + info[item.name].records, 0);

  const toggle = (name: string) => {
    const current = status[name] ?? "idle";
    if (current === "connecting") return;
    if (current === "connected") {
      setStatus((existing) => ({ ...existing, [name]: "idle" }));
      setMessage(`${name} was disconnected. Syncing stopped at once, and you can choose whether to keep the data.`);
    } else {
      setStatus((existing) => ({ ...existing, [name]: "connecting" }));
      setMessage(`Connecting to ${name}. You choose what data to share, and you can revoke access any time.`);
    }
  };

  return (
    <PreviewFrame
      title="Integration Hub"
      period="10 integrations"
      insight={message ?? "Connect an app in one click, and watch records start to sync both ways."}
      badge={`${connected.length} connected`}
    >
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-brand-surface px-3 py-2">
          <p className="text-[10px] font-semibold text-brand-muted">Connected apps</p>
          <p key={connected.length} className="demo-rise text-lg font-extrabold text-brand-text">
            {connected.length} <span className="text-[11px] font-semibold text-brand-muted">of {integrations.length}</span>
          </p>
        </div>
        <div className="rounded-xl bg-brand-surface px-3 py-2">
          <p className="text-[10px] font-semibold text-brand-muted">Records syncing</p>
          <p key={records} className="demo-rise text-lg font-extrabold text-brand-text">{records.toLocaleString("en-IN")}</p>
        </div>
      </div>

      <div className="mt-3">
        <Chips label="Category" options={categories} value={category} onChange={setCategory} />
      </div>

      <ul className="mt-3 grid min-h-[190px] grid-cols-1 content-start gap-1.5 sm:grid-cols-2">
        {visible.map((item) => {
          const state = status[item.name] ?? "idle";
          return (
            <li key={item.name} className="demo-rise flex items-center gap-2.5 rounded-xl bg-brand-surface px-2.5 py-2">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white ring-1 ring-brand-border">
                <Image
                  src={item.logo}
                  alt=""
                  width={item.width}
                  height={item.height}
                  aria-hidden
                  style={{ height: item.wordmark ? 10 : 20, width: "auto" }}
                  className="max-w-[28px] object-contain"
                />
              </span>
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block truncate text-[12px] font-semibold text-brand-text">{item.name}</span>
                <span className="block truncate text-[10px] text-brand-muted">{info[item.name].syncs}</span>
              </span>
              <button
                type="button"
                aria-pressed={state === "connected"}
                aria-label={`${state === "connected" ? "Disconnect" : "Connect"} ${item.name}`}
                onClick={() => toggle(item.name)}
                className={cn(
                  "flex w-[76px] shrink-0 items-center justify-center gap-1 rounded-lg px-2 py-1 text-[10px] font-bold outline-none ring-1 transition-colors focus-visible:ring-2 focus-visible:ring-brand-purple/60",
                  state === "connected" && "bg-emerald-100 text-emerald-800 ring-emerald-200",
                  state === "connecting" && "bg-brand-purple-light text-brand-purple ring-brand-purple/30",
                  state === "idle" && "bg-brand-purple text-white ring-brand-purple hover:bg-brand-purple-dark"
                )}
              >
                {state === "connected" ? (
                  <>
                    <Check className="size-3" aria-hidden /> Connected
                  </>
                ) : state === "connecting" ? (
                  <>
                    <Loader2 className="size-3 animate-spin" aria-hidden /> Linking
                  </>
                ) : (
                  "Connect"
                )}
              </button>
            </li>
          );
        })}
        {matching.length > visible.length && (
          <li className="px-1 text-[11px] font-semibold text-brand-purple sm:col-span-2">
            Showing {visible.length} of {matching.length}. Pick a category to see the rest.
          </li>
        )}
      </ul>
    </PreviewFrame>
  );
}
