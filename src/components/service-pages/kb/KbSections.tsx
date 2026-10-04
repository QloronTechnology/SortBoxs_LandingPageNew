"use client";

import { useState } from "react";
import { ArrowRight, Check, CircleCheck, FileEdit, Link2, Search, Send, ThumbsDown, ThumbsUp, User, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { SampleTag, SectionHead } from "@/components/sales-solution/shared";
import { articles, categories } from "./kbData";

/* ---------------------------------------------------------------- Search and read */

export function KbSearch() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [openId, setOpenId] = useState<string | null>("a2");
  const [vote, setVote] = useState<Record<string, "up" | "down">>({});

  const q = query.trim().toLowerCase();
  const results = articles.filter((article) => (category === "All" || article.category === category) && (!q || `${article.title} ${article.excerpt}`.toLowerCase().includes(q)));
  const open = articles.find((article) => article.id === openId);

  return (
    <section className="bg-brand-surface py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow="Try the help centre" title="Search it like a customer would" intro="Type a question, pick a category and open an article. The results update as you type." />
        <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-3xl bg-white shadow-[0_30px_70px_-44px_rgba(23,22,92,0.5)] ring-1 ring-brand-border">
          <div className="border-b border-brand-border bg-brand-surface p-4 sm:p-5">
            <label className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 ring-1 ring-brand-border focus-within:ring-2 focus-within:ring-brand-purple">
              <Search className="size-5 text-brand-purple" aria-hidden />
              <span className="sr-only">Search articles</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search articles, for example “invoice” or “password”" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-brand-muted/70" />
            </label>
            <div role="group" aria-label="Category" className="mt-3 flex flex-wrap items-center gap-1.5">
              {["All", ...categories].map((item) => (
                <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)} className={cn("rounded-full px-3 py-1.5 text-xs font-semibold outline-none ring-1 transition-colors focus-visible:ring-2 focus-visible:ring-brand-purple", category === item ? "bg-brand-purple text-white ring-brand-purple" : "bg-white text-brand-muted ring-brand-border hover:text-brand-text")}>
                  {item}
                </button>
              ))}
              <SampleTag className="ml-auto" />
            </div>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <ul className="max-h-[420px] divide-y divide-brand-border overflow-y-auto border-b border-brand-border lg:border-r lg:border-b-0" aria-live="polite">
              {results.length === 0 && <li className="px-5 py-10 text-center text-sm text-brand-muted">No articles match. Try fewer words.</li>}
              {results.map((article) => (
                <li key={article.id}>
                  <button type="button" aria-pressed={article.id === openId} onClick={() => setOpenId(article.id)} className={cn("flex w-full flex-col px-5 py-3.5 text-left outline-none transition-colors focus-visible:bg-brand-purple-light", article.id === openId ? "bg-brand-purple-light/70" : "hover:bg-brand-surface")}>
                    <span className="text-sm font-bold text-brand-text">{article.title}</span>
                    <span className="mt-0.5 text-xs text-brand-muted">{article.category} · {article.excerpt}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="min-h-[300px] p-5 sm:p-7">
              {open ? (
                <article key={open.id} className="demo-rise">
                  <p className="text-[11px] font-bold tracking-wide text-brand-purple uppercase">{open.category}</p>
                  <h3 className="mt-1 text-xl font-extrabold text-brand-text">{open.title}</h3>
                  <ol className="mt-4 space-y-2.5">
                    {open.body.map((step, index) => (
                      <li key={step} className="flex gap-3 text-sm leading-relaxed text-brand-text">
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-purple-light text-xs font-bold text-brand-purple">{index + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                  <div className="mt-6 flex items-center gap-3 border-t border-brand-border pt-4">
                    {vote[open.id] ? (
                      <p className="flex items-center gap-2 text-sm font-semibold text-emerald-700"><CircleCheck className="size-4" aria-hidden /> Thanks for the feedback.</p>
                    ) : (
                      <>
                        <span className="text-sm text-brand-muted">Was this helpful?</span>
                        <button type="button" onClick={() => setVote((current) => ({ ...current, [open.id]: "up" }))} className="flex items-center gap-1.5 rounded-lg bg-brand-surface px-3 py-1.5 text-xs font-semibold text-brand-text ring-1 ring-brand-border outline-none hover:bg-emerald-50 focus-visible:ring-2 focus-visible:ring-brand-purple"><ThumbsUp className="size-3.5" aria-hidden /> Yes</button>
                        <button type="button" onClick={() => setVote((current) => ({ ...current, [open.id]: "down" }))} className="flex items-center gap-1.5 rounded-lg bg-brand-surface px-3 py-1.5 text-xs font-semibold text-brand-text ring-1 ring-brand-border outline-none hover:bg-rose-50 focus-visible:ring-2 focus-visible:ring-brand-purple"><ThumbsDown className="size-3.5" aria-hidden /> No</button>
                      </>
                    )}
                  </div>
                </article>
              ) : (
                <p className="py-16 text-center text-sm text-brand-muted">Select an article to read it.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- With and without a help centre */

const paths: Record<"without" | "with", { title: string; ticket: string; steps: { icon: LucideIcon; label: string }[] }> = {
  without: { title: "Without a help centre", ticket: "A ticket for an agent to answer", steps: [{ icon: User, label: "Customer has a question" }, { icon: Send, label: "Writes to support" }, { icon: FileEdit, label: "Ticket is created" }, { icon: Check, label: "An agent replies" }] },
  with: { title: "With a help centre", ticket: "No ticket needed", steps: [{ icon: User, label: "Customer has a question" }, { icon: Search, label: "Searches the help centre" }, { icon: Check, label: "Finds the article" }, { icon: CircleCheck, label: "Solves it themselves" }] },
};

export function Deflection() {
  const [mode, setMode] = useState<"without" | "with">("with");
  const path = paths[mode];
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow="Self-service" title="Some questions never need a ticket" intro="When the answer is easy to find, customers get it faster and your agents keep their time for the harder problems." />
        <div className="mx-auto mt-10 max-w-4xl">
          <div role="group" aria-label="Compare" className="mx-auto flex w-fit gap-1 rounded-full bg-brand-surface p-1 ring-1 ring-brand-border">
            {(["without", "with"] as const).map((key) => (
              <button key={key} type="button" aria-pressed={mode === key} onClick={() => setMode(key)} className={cn("rounded-full px-5 py-2 text-sm font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand-purple", mode === key ? "bg-brand-purple text-white shadow-sm" : "text-brand-muted hover:text-brand-text")}>
                {paths[key].title}
              </button>
            ))}
          </div>
          <ol key={mode} className="mt-8 grid gap-3 sm:grid-cols-4">
            {path.steps.map(({ icon: Icon, label }, index) => (
              <li key={label} className="demo-rise relative flex flex-col items-center rounded-2xl bg-brand-surface p-5 text-center ring-1 ring-brand-border" style={{ "--d": `${index * 110}ms` } as React.CSSProperties}>
                <span className={cn("flex size-12 items-center justify-center rounded-2xl text-white", mode === "with" && index > 1 ? "bg-emerald-500" : "bg-brand-purple")}>
                  <Icon className="size-6" aria-hidden />
                </span>
                <p className="mt-3 text-sm font-bold text-brand-text">{label}</p>
                {index < path.steps.length - 1 && <ArrowRight aria-hidden className="absolute top-1/2 -right-3.5 z-10 hidden size-5 -translate-y-1/2 rounded-full bg-white p-0.5 text-brand-purple sm:block" />}
              </li>
            ))}
          </ol>
          <p className={cn("mx-auto mt-6 w-fit rounded-full px-5 py-2 text-sm font-bold", mode === "with" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800")}>{path.ticket}</p>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Article workflow */

const stages = ["Draft", "In review", "Published"] as const;
type Stage = (typeof stages)[number];

export function ArticleWorkflow() {
  const [placed, setPlaced] = useState<Record<string, Stage>>({ a8: "Draft", a7: "Draft", a6: "In review", a4: "Published", a2: "Published" });
  const advance = (id: string) => setPlaced((current) => ({ ...current, [id]: stages[Math.min(stages.indexOf(current[id]) + 1, 2)] }));

  return (
    <section className="bg-brand-surface py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow="Keeping it accurate" title="Write, review, publish" intro="Articles go through a simple review before customers see them. Move an article forward to see it publish." />
        <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-3">
          {stages.map((stage) => {
            const items = articles.filter((article) => placed[article.id] === stage);
            return (
              <section key={stage} aria-label={stage} className="rounded-3xl bg-white p-4 ring-1 ring-brand-border">
                <h3 className="flex items-center justify-between px-1 pb-3 text-sm font-bold text-brand-text">
                  {stage}
                  <span className="rounded-full bg-brand-surface px-2 py-0.5 text-xs text-brand-muted">{items.length}</span>
                </h3>
                <ul className="min-h-[120px] space-y-2.5">
                  {items.map((article) => (
                    <li key={`${article.id}-${stage}`} className="demo-rise rounded-xl bg-brand-surface p-3 ring-1 ring-brand-border">
                      <p className="text-[13px] font-bold text-brand-text">{article.title}</p>
                      <p className="text-[11px] text-brand-muted">{article.category}</p>
                      {stage !== "Published" ? (
                        <button type="button" onClick={() => advance(article.id)} className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-brand-purple outline-none hover:underline focus-visible:underline">
                          Move to {stages[stages.indexOf(stage) + 1]} <ArrowRight className="size-3" aria-hidden />
                        </button>
                      ) : (
                        <p className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-emerald-700"><CircleCheck className="size-3" aria-hidden /> Live for customers</p>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Agent view: insert an article */

export function AgentSuggestions() {
  const [reply, setReply] = useState("Hi Priya, thanks for getting in touch. ");
  const suggestions = [articles[1], articles[2], articles[5]];
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div>
          <SectionHead eyebrow="For your agents too" title="Suggest the right article while you reply" intro="Agents see articles that match the ticket and can drop a link straight into their reply. The same answers, every time." />
        </div>
        <div className="rounded-3xl bg-brand-surface p-5 shadow-[0_30px_70px_-44px_rgba(23,22,92,0.5)] ring-1 ring-brand-border sm:p-6">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-bold text-brand-text">Reply to T-2041</p>
            <SampleTag />
          </div>
          <label className="sr-only" htmlFor="kb-reply">Reply</label>
          <textarea id="kb-reply" value={reply} onChange={(event) => setReply(event.target.value)} rows={5} className="w-full resize-none rounded-xl bg-white p-3.5 text-sm leading-relaxed text-brand-text ring-1 ring-brand-border outline-none focus-visible:ring-2 focus-visible:ring-brand-purple" />
          <p className="mt-4 text-[11px] font-bold tracking-wide text-brand-muted uppercase">Suggested articles</p>
          <ul className="mt-2 space-y-2">
            {suggestions.map((article) => (
              <li key={article.id}>
                <button type="button" onClick={() => setReply((current) => `${current.trimEnd()}\n\nThis may help: ${article.title} (help.sortboxs.com/${article.id})`)} className="group flex w-full items-center gap-3 rounded-xl bg-white p-3 text-left ring-1 ring-brand-border outline-none transition-colors hover:bg-brand-purple-light focus-visible:ring-2 focus-visible:ring-brand-purple">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-purple-light text-brand-purple"><Link2 className="size-4" aria-hidden /></span>
                  <span className="flex-1 text-[13px] font-bold text-brand-text">{article.title}</span>
                  <span className="text-[11px] font-semibold text-brand-purple opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">Insert link</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
