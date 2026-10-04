"use client";

import { useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, SampleTag, SectionHead, avatarTones } from "@/components/sales-solution/shared";
import { priorityTone, type Priority } from "../shared";
import { channelMeta, channelOrder, samples, type ChannelName } from "./omniData";

/* ---------------------------------------------------------------- Unified thread */

export function ChannelThread() {
  const [messages, setMessages] = useState<{ channel: ChannelName; text: string }[]>([{ channel: "Email", text: samples.Email }]);
  const channelsUsed = new Set(messages.map((message) => message.channel)).size;

  return (
    <section className="bg-brand-surface py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow="Try it" title="The customer switches channels. The conversation does not." intro="Choose a channel the customer writes from. Every message lands in the same thread, labelled with where it came from." />
        <div className="mx-auto mt-12 grid max-w-5xl gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div className="rounded-3xl bg-white p-5 ring-1 ring-brand-border sm:p-6">
            <p className="text-sm font-bold text-brand-text">Customer writes by</p>
            <ul className="mt-3 grid gap-2">
              {channelOrder.map((name) => {
                const meta = channelMeta[name];
                return (
                  <li key={name}>
                    <button type="button" onClick={() => setMessages((current) => [...current, { channel: name, text: samples[name] }])} className="flex w-full items-center gap-3 rounded-xl bg-brand-surface p-3 text-left outline-none ring-1 ring-brand-border transition-colors hover:bg-brand-purple-light focus-visible:ring-2 focus-visible:ring-brand-purple">
                      <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-lg text-white", meta.tone)}>
                        <meta.icon className="size-4.5" aria-hidden />
                      </span>
                      <span className="flex-1 text-sm font-bold text-brand-text">{name}</span>
                      <ArrowRight className="size-4 text-brand-purple" aria-hidden />
                    </button>
                  </li>
                );
              })}
            </ul>
            <button type="button" onClick={() => setMessages([{ channel: "Email", text: samples.Email }])} className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-brand-muted outline-none hover:text-brand-purple focus-visible:underline">
              <RotateCcw className="size-3.5" aria-hidden /> Start again
            </button>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-[0_30px_70px_-44px_rgba(23,22,92,0.5)] ring-1 ring-brand-border sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-border pb-4">
              <div className="flex items-center gap-3">
                <Avatar name="Priya Nair" tone={avatarTones[0]} className="size-10 text-xs" />
                <div>
                  <p className="text-sm font-extrabold text-brand-text">Priya Nair</p>
                  <p className="text-xs text-brand-muted">Invoice problem · Ticket T-2041</p>
                </div>
              </div>
              <p className="text-xs font-semibold text-brand-muted"><b className="text-brand-purple">{messages.length}</b> messages · <b className="text-brand-purple">{channelsUsed}</b> {channelsUsed === 1 ? "channel" : "channels"} · <b className="text-brand-purple">1</b> conversation</p>
            </div>
            <ul className="mt-4 max-h-[340px] space-y-3 overflow-y-auto pr-1" aria-live="polite">
              {messages.map((message, index) => {
                const meta = channelMeta[message.channel];
                return (
                  <li key={`${message.channel}-${index}`} className="demo-rise flex flex-col items-start">
                    <span className={cn("mb-1 flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold", meta.soft)}>
                      <meta.icon className="size-3" aria-hidden /> {message.channel}
                    </span>
                    <p className="max-w-[92%] rounded-2xl rounded-tl-sm bg-brand-surface px-3.5 py-2.5 text-sm leading-relaxed text-brand-text">{message.text}</p>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 flex justify-end"><SampleTag /></p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Routing */

const topics: { name: string; team: string; priority: Priority; sla: string; why: string }[] = [
  { name: "Billing question", team: "Billing team", priority: "Normal", sla: "Reply in 4 h", why: "Matched on the words 'invoice' and 'payment'." },
  { name: "Cannot sign in", team: "Technical support", priority: "Urgent", sla: "Reply in 15 min", why: "Matched on 'locked out', and it affects a whole team." },
  { name: "Pricing for more users", team: "Sales", priority: "Normal", sla: "Reply in 4 h", why: "A buying question goes to sales, not support." },
  { name: "Complaint about a delay", team: "Senior support", priority: "High", sla: "Reply in 1 h", why: "Unhappy tone is escalated to experienced agents." },
];

export function RoutingRules() {
  const [active, setActive] = useState(1);
  const topic = topics[active];
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow="Smart routing" title="Every conversation lands with the right team" intro="Pick a kind of message to see where it goes, how urgent it is, and why." />
        <div className="mx-auto mt-12 grid max-w-5xl items-stretch gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div role="tablist" aria-label="Incoming message" className="grid gap-2.5">
            {topics.map((item, index) => (
              <button key={item.name} type="button" role="tab" aria-selected={index === active} onClick={() => setActive(index)} className={cn("rounded-2xl p-4 text-left outline-none ring-1 transition-all focus-visible:ring-2 focus-visible:ring-brand-purple", index === active ? "bg-brand-purple-light ring-2 ring-brand-purple" : "bg-white ring-brand-border hover:bg-brand-surface")}>
                <span className="text-[11px] font-bold tracking-wide text-brand-muted uppercase">Incoming</span>
                <span className="block text-sm font-bold text-brand-text">{item.name}</span>
              </button>
            ))}
          </div>
          <div key={topic.name} className="demo-rise flex flex-col justify-center rounded-3xl bg-brand-navy p-6 text-white sm:p-8">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold tracking-wide text-violet-300 uppercase">Routed to</p>
              <SampleTag dark />
            </div>
            <p className="mt-1 text-3xl font-extrabold">{topic.team}</p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className={cn("rounded-full px-3 py-1 text-xs font-bold", priorityTone[topic.priority])}>{topic.priority}</span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold">{topic.sla}</span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-white/80">{topic.why}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Channel grid */

export function ChannelGrid() {
  return (
    <section className="bg-brand-surface py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow="Channels" title="Bring in the places customers already use" intro="Each channel arrives in the same inbox, in the form that suits it." />
        <ul className="mx-auto mt-12 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {channelOrder.map((name) => {
            const meta = channelMeta[name];
            return (
              <li key={name} className="rounded-3xl bg-white p-5 ring-1 ring-brand-border">
                <span className={cn("flex size-11 items-center justify-center rounded-2xl text-white", meta.tone)}>
                  <meta.icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-base font-extrabold text-brand-text">{name}</h3>
                <p className="mt-2 text-xs leading-relaxed text-brand-muted">{meta.arrives}</p>
                <p className="mt-3 border-t border-brand-border pt-3 text-xs leading-relaxed text-brand-text"><b>Agent sees:</b> {meta.sees}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
