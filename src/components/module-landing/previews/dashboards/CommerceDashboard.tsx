"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { PreviewFrame } from "../../PreviewFrame";
import { Chips } from "./parts";

type Channel = "all" | "online" | "marketplace" | "store";
const channels: { key: Channel; label: string }[] = [
  { key: "all", label: "All" },
  { key: "online", label: "Online" },
  { key: "marketplace", label: "Marketplace" },
  { key: "store", label: "In store" },
];
const stages = ["New", "Packed", "Shipped", "Delivered"];
const stageTone = ["bg-brand-purple", "bg-sky-500", "bg-amber-500", "bg-emerald-500"];
type Order = { id: string; customer: string; channel: Exclude<Channel, "all">; amount: number; status: number };
const initialOrders: Order[] = [
  { id: "#5524", customer: "Orbit Retail", channel: "online", amount: 42.1, status: 0 },
  { id: "#5523", customer: "Lotus Clinics", channel: "marketplace", amount: 12.6, status: 0 },
  { id: "#5521", customer: "Aurora Textiles", channel: "online", amount: 18.4, status: 1 },
  { id: "#5520", customer: "Helix Motors", channel: "marketplace", amount: 7.9, status: 2 },
  { id: "#5519", customer: "Zenith Pharma", channel: "store", amount: 9.2, status: 1 },
  { id: "#5517", customer: "Greenfield Realty", channel: "store", amount: 31, status: 0 },
];

export function CommerceDashboard() {
  const [orders, setOrders] = useState(initialOrders);
  const [channel, setChannel] = useState<Channel>("all");
  const [message, setMessage] = useState<string | null>(null);

  const visible = orders.filter((order) => channel === "all" || order.channel === channel);
  const revenue = visible.reduce((sum, order) => sum + order.amount, 0);
  const counts = stages.map((_, index) => visible.filter((order) => order.status === index).length);
  const shown = visible.slice(0, 4);

  const advance = (id: string) => {
    const order = orders.find((item) => item.id === id);
    if (!order || order.status >= stages.length - 1) return;
    const status = order.status + 1;
    setOrders((current) => current.map((item) => (item.id === id ? { ...item, status } : item)));
    setMessage(
      status === 1
        ? `Order ${id} packed. The courier pickup is booked for 4 PM.`
        : status === 2
          ? `Order ${id} shipped. A tracking link was sent to ${order.customer}.`
          : `Order ${id} delivered. We'll ask ${order.customer} for a review in 2 days.`
    );
  };

  return (
    <PreviewFrame
      title="Order Stream"
      period="Today"
      insight={message ?? "Mobile cart abandonment rose today. Send a 5% recovery offer to 46 shoppers?"}
      badge="Orders up 14%"
    >
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <Chips label="Sales channel" options={channels} value={channel} onChange={setChannel} />
        <p className="flex items-baseline gap-1.5">
          <span className="text-xl font-extrabold text-brand-text">₹{revenue.toFixed(1)}K</span>
          <span className="text-[11px] font-semibold text-brand-muted">{visible.length} orders</span>
        </p>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-1.5">
        {stages.map((stage, index) => (
          <div key={stage} className="rounded-lg bg-brand-surface px-2 py-1.5 text-center">
            <p className="flex items-center justify-center gap-1 text-[10px] font-semibold text-brand-muted">
              <span className={cn("size-1.5 rounded-full", stageTone[index])} aria-hidden /> {stage}
            </p>
            <p key={counts[index]} className="demo-rise text-base font-extrabold text-brand-text">{counts[index]}</p>
          </div>
        ))}
      </div>

      <ul className="mt-3 flex flex-col gap-1.5">
        {shown.length === 0 && <li className="rounded-xl bg-brand-surface px-3 py-4 text-center text-[11px] text-brand-muted">No orders on this channel today.</li>}
        {shown.map((order) => {
          const complete = order.status === stages.length - 1;
          return (
            <li key={order.id} className="rounded-xl bg-brand-surface px-3 py-2">
              <div className="flex items-center gap-3">
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-semibold text-brand-text">
                    {order.id} · {order.customer}
                  </span>
                  <span className="block text-[11px] text-brand-muted capitalize">{order.channel === "store" ? "In store" : order.channel}</span>
                </span>
                <span className="text-[13px] font-bold text-brand-text">₹{order.amount}K</span>
                <button
                  type="button"
                  disabled={complete}
                  onClick={() => advance(order.id)}
                  className={cn(
                    "flex w-[78px] items-center justify-center gap-1 rounded-lg px-2 py-1 text-[11px] font-semibold outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/60",
                    complete ? "bg-emerald-100 text-emerald-700" : "bg-brand-purple text-white hover:bg-brand-purple-dark"
                  )}
                >
                  {complete ? (
                    <>
                      <Check className="size-3" aria-hidden /> Done
                    </>
                  ) : (
                    <>
                      {stages[order.status + 1]} <ArrowRight className="size-3" aria-hidden />
                    </>
                  )}
                </button>
              </div>
              <div className="mt-2 flex gap-1" aria-label={`Status: ${stages[order.status]}`}>
                {stages.map((stage, index) => (
                  <span key={stage} className={cn("h-1 flex-1 rounded-full transition-colors duration-500", index <= order.status ? stageTone[order.status] : "bg-white")} />
                ))}
              </div>
            </li>
          );
        })}
      </ul>
    </PreviewFrame>
  );
}
