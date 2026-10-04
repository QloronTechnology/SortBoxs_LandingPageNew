"use client";

import { MessagesSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion, useTicker } from "@/components/sales-solution/hooks";
import { Avatar, avatarTones } from "@/components/sales-solution/shared";
import { HeroShell, MockWindow } from "@/components/marketing-pages/shared";
import { ServiceCrumbs } from "../shared";
import { channelMeta, type ChannelName } from "./omniData";

const thread: { channel: ChannelName; from: "customer" | "agent"; text: string }[] = [
  { channel: "Email", from: "customer", text: "I could not download my March invoice." },
  { channel: "Live chat", from: "customer", text: "Following up on my email. Is anyone there?" },
  { channel: "Live chat", from: "agent", text: "Hi Priya, I can see your email. I am on it now." },
  { channel: "Phone", from: "agent", text: "Call, 4 min. Walked her through the download." },
  { channel: "Email", from: "agent", text: "Summary sent, with the invoice attached." },
];

/** One customer, three channels, one thread. */
function Thread() {
  const reduced = useReducedMotion();
  const [tick] = useTicker(thread.length, 1300, reduced, 3);
  const shown = reduced ? thread.length : tick + 1;

  return (
    <MockWindow title="Conversation with Priya Nair">
      <div className="grid sm:grid-cols-[minmax(0,1fr)_150px]">
        <ul className="space-y-2.5 p-4 sm:p-5" aria-label="Conversation">
          {thread.slice(0, shown).map((message, index) => {
            const meta = channelMeta[message.channel];
            const mine = message.from === "agent";
            return (
              <li key={index} className={cn("demo-rise flex flex-col", mine ? "items-end" : "items-start")}>
                <span className={cn("mb-1 flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold", meta.soft)}>
                  <meta.icon className="size-2.5" aria-hidden /> {message.channel}
                </span>
                <p className={cn("max-w-[90%] rounded-2xl px-3 py-2 text-[11px] leading-relaxed", mine ? "rounded-tr-sm bg-brand-purple text-white" : "rounded-tl-sm bg-brand-surface text-brand-text")}>{message.text}</p>
              </li>
            );
          })}
        </ul>
        <aside className="border-t border-brand-border bg-brand-surface p-4 sm:border-t-0 sm:border-l">
          <Avatar name="Priya Nair" tone={avatarTones[0]} className="size-9 text-xs" />
          <p className="mt-2 text-xs font-extrabold text-brand-text">Priya Nair</p>
          <p className="text-[10px] text-brand-muted">Zenith Pharma</p>
          <dl className="mt-3 space-y-2 text-[10px]">
            {[["Plan", "Business"], ["Open tickets", "1"], ["Last contact", "Today"]].map(([label, value]) => (
              <div key={label}><dt className="text-brand-muted">{label}</dt><dd className="font-bold text-brand-text">{value}</dd></div>
            ))}
          </dl>
        </aside>
      </div>
    </MockWindow>
  );
}

export function OmniHero() {
  return (
    <HeroShell
      current="Omnichannel Support"
      crumbs={<ServiceCrumbs current="Omnichannel Support" />}
      icon={MessagesSquare}
      iconTone="bg-emerald-100 text-emerald-700"
      title="One Conversation,"
      highlight="Every Channel."
      description="Bring email, chat, phone, social and web forms into one inbox, so customers never repeat themselves and agents always have the full story."
      visual={<Thread />}
    />
  );
}
