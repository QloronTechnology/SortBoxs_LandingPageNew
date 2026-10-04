"use client";

import { useState } from "react";
import { BellRing, Check, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { PreviewFrame } from "../../PreviewFrame";
import { Chips } from "./parts";

type Device = "phone" | "tablet" | "desktop";
const devices: { key: Device; label: string }[] = [
  { key: "phone", label: "Phone" },
  { key: "tablet", label: "Tablet" },
  { key: "desktop", label: "Desktop" },
];
const frames: Record<Device, string> = {
  phone: "h-[184px] w-[106px] rounded-[20px] border-[5px]",
  tablet: "h-[140px] w-[180px] rounded-[14px] border-[5px]",
  desktop: "h-[128px] w-[240px] rounded-lg border-[4px]",
};
const taskNames = ["Call Zenith Pharma", "Review Q3 forecast", "Send Northwind quote"];

export function MobileAppsDashboard() {
  const [device, setDevice] = useState<Device>("phone");
  const [offline, setOffline] = useState(false);
  const [done, setDone] = useState<boolean[]>([false, true, false]);
  const [queued, setQueued] = useState(0);
  const [notif, setNotif] = useState<"idle" | "shown" | "approved">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const toggleTask = (index: number) => {
    setDone((current) => current.map((value, i) => (i === index ? !value : value)));
    if (offline) {
      setQueued((current) => current + 1);
      setMessage("You're offline. That change is saved on this device and will sync as soon as you reconnect.");
    } else {
      setMessage("Updated and synced to every device in real time.");
    }
  };
  const setOnline = (goOffline: boolean) => {
    setOffline(goOffline);
    if (goOffline) {
      setMessage("Offline mode on. You can keep viewing and editing, and nothing is lost.");
    } else {
      setMessage(queued > 0 ? `Back online. ${queued} saved change${queued > 1 ? "s were" : " was"} synced in order.` : "Back online and up to date.");
      setQueued(0);
    }
  };

  const insight = message ?? (notif === "shown" ? "Priya requested leave. Approve it from the notification, even without opening the app." : "Switch device, go offline, tick a task or send a push notification to see how the apps behave.");

  return (
    <PreviewFrame title="SortBoxs Apps" period="Phone, tablet, desktop" insight={insight} badge="Works offline">
      <div className="mt-4">
        <Chips label="Device" options={devices} value={device} onChange={setDevice} />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-[256px_1fr]">
        <div className="flex h-[212px] flex-col items-center justify-center rounded-xl bg-gradient-to-br from-brand-purple-light to-brand-surface">
          <div className={cn("relative overflow-hidden border-brand-navy bg-white shadow-xl transition-all duration-500", frames[device])}>
            <div className="flex items-center justify-between bg-brand-purple px-2 py-1 text-[8px] font-bold text-white">
              <span>SortBoxs</span>
              <span className="flex items-center gap-1">
                <span className={cn("size-1.5 rounded-full", offline ? "bg-amber-300" : "bg-emerald-300")} aria-hidden />
                {offline ? "Offline" : "Online"}
              </span>
            </div>
            {offline && (
              <p className="flex items-center gap-1 bg-amber-100 px-2 py-0.5 text-[8px] font-semibold text-amber-800">
                <WifiOff className="size-2.5" aria-hidden /> Offline · {queued} queued
              </p>
            )}
            <ul className="flex flex-col gap-1 p-1.5">
              {taskNames.map((name, index) => (
                <li key={name}>
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={done[index]}
                    onClick={() => toggleTask(index)}
                    className="flex w-full items-center gap-1.5 rounded bg-brand-surface px-1.5 py-1 text-left text-[8px] font-semibold text-brand-text outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/60"
                  >
                    <span className={cn("flex size-2.5 shrink-0 items-center justify-center rounded-sm ring-1", done[index] ? "bg-emerald-500 text-white ring-emerald-500" : "bg-white ring-brand-border")}>
                      {done[index] && <Check className="size-2" aria-hidden />}
                    </span>
                    <span className={cn("truncate", done[index] && "text-brand-muted line-through")}>{name}</span>
                  </button>
                </li>
              ))}
            </ul>
            {notif !== "idle" && (
              <div className="demo-rise absolute inset-x-1.5 top-6 z-10 rounded-lg bg-brand-navy p-1.5 text-white shadow-xl">
                <p className="flex items-center gap-1 text-[8px] font-bold">
                  <BellRing className="size-2.5" aria-hidden /> SortBoxs · now
                </p>
                <p className="text-[8px] text-white/85">{notif === "approved" ? "Leave approved ✓" : "Priya requested 3 days of leave"}</p>
                {notif === "shown" && (
                  <button
                    type="button"
                    onClick={() => {
                      setNotif("approved");
                      setMessage("Leave approved straight from the notification. Priya was told instantly.");
                    }}
                    className="mt-1 rounded bg-emerald-500 px-1.5 py-0.5 text-[8px] font-bold text-white outline-none hover:bg-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-300"
                  >
                    Approve
                  </button>
                )}
              </div>
            )}
          </div>
          {device === "desktop" && <span aria-hidden className="mt-0.5 h-2 w-14 rounded-b-md bg-brand-navy/80" />}
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            role="switch"
            aria-checked={offline}
            onClick={() => setOnline(!offline)}
            className="flex items-center justify-between rounded-xl bg-brand-surface px-3 py-2.5 text-left text-[12px] font-semibold text-brand-text outline-none ring-1 ring-transparent hover:ring-brand-purple/30 focus-visible:ring-2 focus-visible:ring-brand-purple/60"
          >
            <span className="flex items-center gap-2">
              <WifiOff className="size-4 text-brand-purple" aria-hidden /> Work offline
            </span>
            <span className={cn("relative h-5 w-9 rounded-full transition-colors", offline ? "bg-amber-500" : "bg-brand-border")}>
              <span className={cn("absolute top-0.5 size-4 rounded-full bg-white shadow transition-all", offline ? "left-[18px]" : "left-0.5")} />
            </span>
          </button>
          <button
            type="button"
            disabled={notif === "shown"}
            onClick={() => {
              setNotif("shown");
              setMessage(null);
            }}
            className="flex items-center gap-2 rounded-xl bg-brand-purple px-3 py-2.5 text-[12px] font-semibold text-white outline-none hover:bg-brand-purple-dark focus-visible:ring-2 focus-visible:ring-brand-purple/60 disabled:opacity-50"
          >
            <BellRing className="size-4" aria-hidden /> Send a push notification
          </button>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-brand-surface px-3 py-2">
              <p className="text-[10px] font-semibold text-brand-muted">Sync</p>
              <p key={`${offline}-${queued}`} className={cn("demo-rise text-[12px] font-extrabold", offline ? "text-amber-600" : "text-emerald-600")}>
                {offline ? `${queued} queued` : "Up to date"}
              </p>
            </div>
            <div className="rounded-xl bg-brand-surface px-3 py-2">
              <p className="text-[10px] font-semibold text-brand-muted">Approvals</p>
              <p key={notif} className="demo-rise text-[12px] font-extrabold text-brand-text">{notif === "shown" ? "1 pending" : notif === "approved" ? "All done" : "None waiting"}</p>
            </div>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
