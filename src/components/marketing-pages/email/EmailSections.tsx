"use client";

import { useState } from "react";
import { AlarmClock, BarChart3, Check, Gift, Heart, Image as ImageIcon, Link2, Mail, MousePointerClick, Send, Sparkles, Type, UserPlus, Users, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { InView } from "@/components/ui/InView";
import { Avatar, SampleTag, SectionHead, avatarTones } from "@/components/sales-solution/shared";

/* ---------------------------------------------------------------- Builder */

const blocks: { key: string; icon: LucideIcon; label: string }[] = [
  { key: "banner", icon: ImageIcon, label: "Header banner" },
  { key: "headline", icon: Type, label: "Headline" },
  { key: "text", icon: Mail, label: "Offer text" },
  { key: "products", icon: Gift, label: "Product row" },
  { key: "button", icon: MousePointerClick, label: "Button" },
  { key: "footer", icon: Link2, label: "Footer and unsubscribe" },
];

export function EmailBuilder() {
  const [on, setOn] = useState<Record<string, boolean>>({ banner: true, headline: true, text: true, products: false, button: true, footer: true });
  const [personal, setPersonal] = useState(true);

  return (
    <section className="bg-brand-surface py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow="Email builder" title="Build an email from blocks" intro="Switch blocks on and off and personalise the greeting. The preview updates as you go." />
        <div className="mx-auto mt-12 grid max-w-5xl items-start gap-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div className="rounded-3xl bg-white p-5 ring-1 ring-brand-border sm:p-6">
            <p className="mb-3 text-[11px] font-bold tracking-wide text-brand-muted uppercase">Blocks</p>
            <ul className="space-y-2">
              {blocks.map(({ key, icon: Icon, label }) => (
                <li key={key}>
                  <label className={cn("flex cursor-pointer items-center gap-3 rounded-xl p-3 ring-1 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-purple", on[key] ? "bg-brand-purple-light ring-brand-purple/40" : "bg-white ring-brand-border hover:bg-brand-surface")}>
                    <input type="checkbox" className="sr-only" checked={on[key]} onChange={() => setOn((current) => ({ ...current, [key]: !current[key] }))} />
                    <span className={cn("flex size-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors", on[key] ? "border-brand-purple bg-brand-purple text-white" : "border-brand-border bg-white")}>{on[key] && <Check className="size-3.5" strokeWidth={3} aria-hidden />}</span>
                    <Icon className="size-4 text-brand-purple" aria-hidden />
                    <span className="text-sm font-semibold text-brand-text">{label}</span>
                  </label>
                </li>
              ))}
            </ul>
            <label className="mt-5 flex cursor-pointer items-center gap-3 rounded-xl bg-brand-surface p-3 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-purple">
              <input type="checkbox" role="switch" className="sr-only" checked={personal} onChange={() => setPersonal((value) => !value)} />
              <span aria-hidden className={cn("relative h-6 w-10 shrink-0 rounded-full transition-colors", personal ? "bg-brand-purple" : "bg-brand-border")}>
                <span className={cn("absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform", personal && "translate-x-4")} />
              </span>
              <span className="text-sm font-semibold text-brand-text">Personalise with the contact&apos;s name</span>
            </label>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-[0_30px_70px_-44px_rgba(23,22,92,0.5)] ring-1 ring-brand-border sm:p-6">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-semibold text-brand-muted">Preview</p>
              <SampleTag />
            </div>
            <div className="mx-auto max-w-[400px] overflow-hidden rounded-2xl bg-brand-surface p-3 ring-1 ring-brand-border">
              <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-brand-border">
                {on.banner && <div className="demo-rise flex h-24 items-center justify-center bg-gradient-to-br from-brand-purple to-violet-400 text-sm font-extrabold text-white">Festive Offer</div>}
                <div className="space-y-3 p-4">
                  {on.headline && <p className="demo-rise text-base font-extrabold text-brand-text">{personal ? "Hi Priya, a little something for you" : "Hi there, a little something for you"}</p>}
                  {on.text && (
                    <p className="demo-rise text-xs leading-relaxed text-brand-muted">
                      Thank you for being with us. For a limited time, enjoy a special festive offer on your next order.
                    </p>
                  )}
                  {on.products && (
                    <div className="demo-rise grid grid-cols-3 gap-2" aria-hidden>
                      {[0, 1, 2].map((item) => (
                        <span key={item} className="flex aspect-square items-center justify-center rounded-lg bg-brand-purple-light text-brand-purple">
                          <Gift className="size-5" />
                        </span>
                      ))}
                    </div>
                  )}
                  {on.button && <span className="demo-rise inline-block rounded-lg bg-brand-purple px-4 py-2 text-xs font-bold text-white">See the offer</span>}
                  {on.footer && <p className="demo-rise border-t border-brand-border pt-3 text-[10px] text-brand-muted">You are receiving this because you signed up. Unsubscribe at any time.</p>}
                  {!Object.values(on).some(Boolean) && <p className="py-8 text-center text-xs text-brand-muted">Switch a block on to start.</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Audience */

const segments: { name: string; count: number; rule: string; idea: string }[] = [
  { name: "All contacts", count: 4800, rule: "Everyone who has agreed to hear from you.", idea: "Company news and big announcements." },
  { name: "New leads", count: 1240, rule: "Added in the last 30 days and not yet customers.", idea: "A welcome series that introduces the product." },
  { name: "Customers", count: 2150, rule: "Has at least one paid order.", idea: "Tips, renewals and new features." },
  { name: "Inactive 90 days", count: 610, rule: "No opens or clicks in the last 90 days.", idea: "A win-back offer, or a chance to say goodbye." },
];

export function AudienceSegments() {
  const [active, setActive] = useState(1);
  const current = segments[active];
  const max = Math.max(...segments.map((segment) => segment.count));

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow="Audience" title="Send to the right people, not everyone" intro="Build segments from what you know about each contact, then pick one when you send." />
        <div className="mx-auto mt-12 grid max-w-5xl items-stretch gap-5 lg:grid-cols-[1fr_1fr]">
          <div role="tablist" aria-label="Segments" className="grid gap-2.5">
            {segments.map((segment, index) => (
              <button key={segment.name} type="button" role="tab" aria-selected={index === active} onClick={() => setActive(index)} className={cn("flex items-center gap-4 rounded-2xl p-4 text-left outline-none ring-1 transition-all focus-visible:ring-2 focus-visible:ring-brand-purple", index === active ? "bg-brand-purple-light ring-2 ring-brand-purple" : "bg-white ring-brand-border hover:bg-brand-surface")}>
                <span className={cn("flex size-11 shrink-0 items-center justify-center rounded-xl", index === active ? "bg-brand-purple text-white" : "bg-brand-surface text-brand-purple")}>
                  <Users className="size-5" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-brand-text">{segment.name}</span>
                  <span className="mt-1.5 block h-1.5 rounded-full bg-white/80 ring-1 ring-brand-border">
                    <span className="block h-full rounded-full bg-brand-purple transition-all duration-500" style={{ width: `${(segment.count / max) * 100}%` }} />
                  </span>
                </span>
                <b className="text-sm text-brand-text tabular-nums">{segment.count.toLocaleString("en-IN")}</b>
              </button>
            ))}
          </div>
          <div key={current.name} className="demo-rise rounded-3xl bg-brand-navy p-6 text-white sm:p-8">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold tracking-wide text-violet-300 uppercase">Segment</p>
              <SampleTag dark />
            </div>
            <h3 className="mt-1 text-2xl font-extrabold">{current.name}</h3>
            <p className="mt-4 text-4xl font-extrabold tabular-nums">{current.count.toLocaleString("en-IN")}<span className="text-base font-semibold text-white/60"> recipients</span></p>
            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <dt className="text-[11px] font-bold tracking-wide text-violet-300 uppercase">Who is in it</dt>
                <dd className="mt-1 text-white/85">{current.rule}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-bold tracking-wide text-violet-300 uppercase">A good fit for</dt>
                <dd className="mt-1 text-white/85">{current.idea}</dd>
              </div>
            </dl>
            <span className="mt-6 flex -space-x-2">
              {["Priya Nair", "Rahul Verma", "Ananya Bose", "Karan Shah", "Sana Khan"].map((name, index) => (
                <Avatar key={name} name={name} tone={avatarTones[index % avatarTones.length]} className="size-8 text-[10px] ring-2 ring-brand-navy" />
              ))}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Drip sequence with a branch */

export function DripSequence() {
  const [opened, setOpened] = useState(true);
  const steps: { day: string; icon: LucideIcon; title: string; note: string; lit: boolean }[] = [
    { day: "Day 0", icon: UserPlus, title: "Welcome email", note: "Sent when a lead joins", lit: true },
    { day: "Day 2", icon: Sparkles, title: "Meet the product", note: "A short intro", lit: true },
    { day: "Day 5", icon: opened ? Heart : AlarmClock, title: opened ? "Customer story" : "Gentle reminder", note: opened ? "Because they opened the last email" : "Because they did not open the last email", lit: true },
    { day: "Day 9", icon: Gift, title: "Special offer", note: "Sent to everyone still in the sequence", lit: true },
  ];

  return (
    <section className="bg-brand-surface py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow="Sequences" title="Follow up automatically, based on what people do" intro="Set up a sequence once. Each person follows the path that matches how they respond." />
        <div className="mx-auto mt-10 max-w-5xl">
          <label className="mx-auto flex w-fit cursor-pointer items-center gap-3 rounded-full bg-white px-5 py-2.5 shadow-sm ring-1 ring-brand-border has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-purple">
            <input type="checkbox" role="switch" className="sr-only" checked={opened} onChange={() => setOpened((value) => !value)} />
            <span aria-hidden className={cn("relative h-6 w-10 shrink-0 rounded-full transition-colors", opened ? "bg-brand-purple" : "bg-brand-border")}>
              <span className={cn("absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform", opened && "translate-x-4")} />
            </span>
            <span className="text-sm font-semibold text-brand-text">The contact opened the Day 2 email</span>
          </label>

          <InView>
            <ol className="relative mt-10 grid gap-4 md:grid-cols-4 md:gap-0">
              <span aria-hidden className="absolute top-[34px] right-[12.5%] left-[12.5%] hidden border-t-2 border-dashed border-brand-purple/30 md:block" />
              {steps.map(({ day, icon: Icon, title, note }, index) => (
                <li key={`${index}-${title}`} className="about-rise relative flex items-center gap-4 md:flex-col md:gap-0 md:text-center" style={{ "--d": `${index * 100}ms` } as React.CSSProperties}>
                  <span className={cn("relative z-10 flex size-[68px] shrink-0 items-center justify-center rounded-2xl text-white shadow-lg ring-8 ring-brand-surface transition-colors duration-300", index === 2 ? (opened ? "bg-emerald-500" : "bg-amber-500") : "bg-brand-purple")}>
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <span className="md:mt-4">
                    <span className="block text-[11px] font-bold tracking-wide text-brand-purple uppercase">{day}</span>
                    <span className="block text-base font-bold text-brand-text">{title}</span>
                    <span className="mt-0.5 block max-w-[11rem] text-xs leading-relaxed text-brand-muted md:mx-auto">{note}</span>
                  </span>
                </li>
              ))}
            </ol>
          </InView>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Report */

const funnel: [string, number, string][] = [
  ["Sent", 1240, "from-violet-400 to-brand-purple"],
  ["Delivered", 1210, "from-violet-400 to-brand-purple"],
  ["Opened", 612, "from-sky-400 to-sky-600"],
  ["Clicked", 184, "from-amber-400 to-orange-500"],
  ["Converted", 41, "from-emerald-400 to-emerald-600"],
];

export function EmailReport() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div>
          <SectionHead eyebrow="Reporting" title="See what happened after you hit send" intro="Follow each email from send to sale: who opened it, who clicked and who went on to buy." />
          <ul className="mt-8 space-y-4">
            {[
              [Send, "Every send is tracked", "Opens, clicks and replies are logged on each contact."],
              [BarChart3, "Compare emails side by side", "See which subject lines and offers work better."],
              [MousePointerClick, "Link results to revenue", "Clicks connect to the leads and deals they led to."],
            ].map(([Icon, title, body]) => {
              const I = Icon as LucideIcon;
              return (
                <li key={title as string} className="flex gap-3.5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-purple-light text-brand-purple">
                    <I className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-[15px] font-bold text-brand-text">{title as string}</h3>
                    <p className="text-sm leading-relaxed text-brand-muted">{body as string}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <InView className="rounded-3xl bg-brand-surface p-5 ring-1 ring-brand-border sm:p-7">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-brand-muted">Campaign report</p>
              <p className="text-lg font-extrabold text-brand-text">A festive offer, just for you</p>
            </div>
            <SampleTag />
          </div>
          <ul className="space-y-4">
            {funnel.map(([label, value, tone], index) => (
              <li key={label}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="font-semibold text-brand-text">{label}</span>
                  <b className="text-brand-text tabular-nums">{value.toLocaleString("en-IN")} <span className="font-medium text-brand-muted">({Math.round((value / funnel[0][1]) * 100)}%)</span></b>
                </div>
                <span className="block h-3 rounded-full bg-white ring-1 ring-brand-border">
                  <span className={cn("view-grow block h-full rounded-full bg-gradient-to-r", tone)} style={{ width: `${(value / funnel[0][1]) * 100}%`, "--d": `${index * 90}ms` } as React.CSSProperties} />
                </span>
              </li>
            ))}
          </ul>
        </InView>
      </div>
    </section>
  );
}
