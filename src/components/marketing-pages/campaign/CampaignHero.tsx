"use client";

import type { CSSProperties } from "react";
import { Megaphone } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion, useTicker } from "@/components/sales-solution/hooks";
import { Avatar, avatarTones } from "@/components/sales-solution/shared";
import { channelTone, HeroShell, MockWindow, type Channel } from "../shared";
import { WEEKS, campaigns } from "./campaignData";

const channels: Channel[] = ["Email", "Social", "Ads", "Events"];

function Planner() {
  const reduced = useReducedMotion();
  const [tick] = useTicker(WEEKS, 900, reduced, 2);
  const today = reduced ? 4 : Math.min(tick, WEEKS - 1);
  const featured = campaigns[1];
  const pct = Math.round((featured.spent / featured.budget) * 100);

  return (
    <MockWindow title="Campaign calendar">
      <div className="p-4 sm:p-5">
        <div className="grid grid-cols-[64px_1fr] gap-x-3 text-[10px] font-semibold text-brand-muted">
          <span />
          <div className="grid grid-cols-8">
            {Array.from({ length: WEEKS }, (_, i) => (
              <span key={i} className={cn("text-center", i === today && "font-extrabold text-brand-purple")}>
                W{i + 1}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mt-2 space-y-2.5">
          {channels.map((channel) => {
            const rows = campaigns.filter((campaign) => campaign.channel === channel);
            return (
              <div key={channel} className="grid grid-cols-[64px_1fr] items-center gap-x-3">
                <span className="flex items-center gap-1.5 text-[11px] font-bold text-brand-text">
                  <span className={cn("size-2 rounded-full", channelTone[channel].dot)} aria-hidden /> {channel}
                </span>
                <div className="relative h-8 rounded-lg bg-brand-surface">
                  {rows.map((campaign, index) => (
                    <span
                      key={campaign.name}
                      className={cn("demo-grow-x absolute top-1 flex h-6 items-center overflow-hidden rounded-md px-2 text-[10px] font-bold whitespace-nowrap text-white shadow-sm", channelTone[channel].bar)}
                      style={{ left: `${(campaign.start / WEEKS) * 100}%`, width: `calc(${(campaign.len / WEEKS) * 100}% - 3px)`, "--d": `${index * 160 + channels.indexOf(channel) * 90}ms` } as CSSProperties}
                    >
                      {campaign.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
          <span aria-hidden className="pointer-events-none absolute top-0 bottom-0 w-px bg-brand-purple/60 transition-all duration-700" style={{ left: `calc(76px + (100% - 76px) * ${(today + 0.5) / WEEKS})` }} />
        </div>

        <div className="mt-5 rounded-2xl bg-brand-surface p-4 ring-1 ring-brand-border">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold text-brand-muted">Live campaign</p>
              <p className="text-base font-extrabold text-brand-text">{featured.name}</p>
            </div>
            <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-bold text-emerald-700">Live</span>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <Avatar name={featured.owner} tone={avatarTones[0]} className="size-7 text-[10px]" />
            <div className="flex-1">
              <div className="flex justify-between text-[11px] text-brand-muted">
                <span>Budget used</span>
                <b className="text-brand-text tabular-nums">₹{featured.spent}L of ₹{featured.budget}L</b>
              </div>
              <span className="mt-1 block h-2 rounded-full bg-white">
                <span className="demo-grow-x block h-full rounded-full bg-gradient-to-r from-violet-400 to-brand-purple" style={{ width: `${pct}%` }} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </MockWindow>
  );
}

export function CampaignHero() {
  return (
    <HeroShell
      current="Campaign Management"
      icon={Megaphone}
      iconTone="bg-emerald-100 text-emerald-700"
      title="Plan Every Campaign."
      highlight="Launch With Confidence."
      description="Bring every campaign, channel, budget and deadline onto one calendar, so your team always knows what is live, what is next and what it costs."
      visual={<Planner />}
    />
  );
}
