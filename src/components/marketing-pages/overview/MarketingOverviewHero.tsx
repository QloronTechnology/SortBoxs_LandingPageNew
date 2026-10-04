"use client";

import { Handshake, Magnet, Mail, Megaphone, MousePointerClick, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion, useTicker } from "@/components/sales-solution/hooks";
import { Crumbs } from "@/components/sales-pages/parts";
import { channelTone, HeroShell, MockWindow, type Channel } from "../shared";

const stages: { icon: LucideIcon; label: string; note: string; count: string; width: number; tone: string }[] = [
  { icon: Megaphone, label: "Reached", note: "People who saw a campaign", count: "48,000", width: 100, tone: "from-violet-400 to-brand-purple" },
  { icon: MousePointerClick, label: "Engaged", note: "Visited, clicked or opened", count: "6,200", width: 78, tone: "from-indigo-400 to-indigo-600" },
  { icon: Magnet, label: "Leads", note: "Shared their details", count: "1,480", width: 58, tone: "from-sky-400 to-sky-600" },
  { icon: Mail, label: "Nurtured", note: "Ready to talk to sales", count: "410", width: 40, tone: "from-amber-400 to-orange-500" },
  { icon: Handshake, label: "Customers", note: "Won with sales", count: "64", width: 26, tone: "from-emerald-400 to-emerald-600" },
];
const channels: Channel[] = ["Email", "Social", "Ads", "Events"];

/** From campaign to customer: a funnel that fills stage by stage. */
function Funnel() {
  const reduced = useReducedMotion();
  const [tick] = useTicker(stages.length, 1200, reduced, 2);
  const active = reduced ? stages.length : tick;

  return (
    <MockWindow title="Campaign to customer">
      <div className="p-4 sm:p-5">
        <ul className="flex flex-wrap gap-1.5" aria-label="Channels">
          {channels.map((channel) => (
            <li key={channel} className={cn("rounded-full px-3 py-1 text-[11px] font-bold", channelTone[channel].soft)}>
              {channel}
            </li>
          ))}
          <li className="px-1 py-1 text-[11px] text-brand-muted">feed one funnel</li>
        </ul>

        <ol className="mt-4 space-y-2.5" aria-label="Marketing funnel">
          {stages.map(({ icon: Icon, label, note, count, width, tone }, index) => {
            const on = index < active;
            return (
              <li key={label} className="flex items-center gap-3">
                <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-500", on ? "bg-brand-purple text-white" : "bg-brand-surface text-brand-muted")}>
                  <Icon className="size-4.5" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-xs font-bold text-brand-text">{label}</span>
                    <span className="text-xs font-extrabold text-brand-text tabular-nums">{count}</span>
                  </div>
                  <span className="mt-1 block h-3 rounded-full bg-brand-surface">
                    <span className={cn("block h-full rounded-full bg-gradient-to-r transition-all duration-700", tone)} style={{ width: on ? `${width}%` : "0%" }} />
                  </span>
                  <span className="mt-0.5 block text-[10px] text-brand-muted">{note}</span>
                </div>
              </li>
            );
          })}
        </ol>
        <p className="mt-4 rounded-xl bg-emerald-50 px-3.5 py-2.5 text-[11px] font-semibold text-emerald-800">One record follows each person, from the first ad to the first order.</p>
      </div>
    </MockWindow>
  );
}

export function MarketingOverviewHero() {
  return (
    <HeroShell
      current="Marketing"
      crumbs={<Crumbs current="Marketing" parent={null} />}
      icon={Megaphone}
      iconTone="bg-emerald-100 text-emerald-700"
      title="Attract, Engage and"
      highlight="Grow Your Brand."
      description="Plan campaigns, capture and score leads, send the right emails, follow the customer journey and see what pays back, all in one place."
      visual={<Funnel />}
    />
  );
}
