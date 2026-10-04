"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { PreviewFrame } from "../../PreviewFrame";
import { SectionLabel } from "./parts";

const weeks = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"];
const today = 3.4;
const projects = [
  { name: "Website revamp", start: 1, span: 5, bar: "bg-violet-500", track: "bg-violet-100" },
  { name: "Mobile app", start: 2, span: 6, bar: "bg-sky-500", track: "bg-sky-100" },
  { name: "ERP rollout", start: 4, span: 5, bar: "bg-amber-500", track: "bg-amber-100" },
  { name: "Brand refresh", start: 1, span: 3, bar: "bg-emerald-500", track: "bg-emerald-100" },
];
type Task = { project: number; title: string; status: 0 | 1 | 2 };
const initialTasks: Task[] = [
  { project: 0, title: "Homepage design", status: 2 },
  { project: 0, title: "Search results page", status: 1 },
  { project: 0, title: "Checkout copy", status: 0 },
  { project: 0, title: "Launch checklist", status: 0 },
  { project: 1, title: "User research", status: 2 },
  { project: 1, title: "API contract", status: 1 },
  { project: 1, title: "Checkout screens", status: 1 },
  { project: 1, title: "Payment gateway", status: 0 },
  { project: 2, title: "Data audit", status: 1 },
  { project: 2, title: "Vendor shortlist", status: 2 },
  { project: 2, title: "Migration plan", status: 0 },
  { project: 2, title: "Training plan", status: 0 },
  { project: 3, title: "Brand guidelines", status: 2 },
  { project: 3, title: "Logo variants", status: 2 },
  { project: 3, title: "Social templates", status: 1 },
  { project: 3, title: "Press kit", status: 0 },
];
const columns = ["To do", "Doing", "Done"];

export function ProjectsDashboard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [selected, setSelected] = useState(1);
  const [message, setMessage] = useState<string | null>(null);

  const progress = (index: number) => {
    const own = tasks.filter((task) => task.project === index);
    return own.length ? Math.round((own.filter((task) => task.status === 2).length / own.length) * 100) : 0;
  };
  const project = projects[selected];
  const pct = progress(selected);
  const insight = message ?? `${project.name} is ${pct}% complete. ${pct < 50 ? "Move a task forward to update the plan." : "Nearly there."}`;

  const advance = (taskIndex: number) => {
    const task = tasks[taskIndex];
    const status = ((task.status + 1) % 3) as 0 | 1 | 2;
    setTasks((current) => current.map((item, index) => (index === taskIndex ? { ...item, status } : item)));
    setMessage(`“${task.title}” moved to ${columns[status]}. ${projects[task.project].name} is now ${progressAfter(taskIndex, status)}% complete.`);
  };
  const progressAfter = (taskIndex: number, status: number) => {
    const own = tasks.map((item, index) => (index === taskIndex ? { ...item, status } : item)).filter((item) => item.project === tasks[taskIndex].project);
    return Math.round((own.filter((item) => item.status === 2).length / own.length) * 100);
  };

  return (
    <PreviewFrame title="Delivery Board" period="This quarter" insight={insight} badge="3 projects on track">
      <div className="mt-4">
        <div className="grid grid-cols-[84px_1fr] gap-2">
          <span />
          <div className="grid grid-cols-8 text-center text-[9px] font-semibold text-brand-muted">
            {weeks.map((week) => (
              <span key={week}>{week}</span>
            ))}
          </div>
        </div>
        <div className="relative mt-1 flex flex-col gap-1.5">
          {projects.map((item, index) => {
            const active = index === selected;
            return (
              <button
                key={item.name}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setSelected(index);
                  setMessage(null);
                }}
                className={cn(
                  "grid grid-cols-[84px_1fr] items-center gap-2 rounded-lg px-1 py-0.5 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand-purple/60",
                  active ? "bg-brand-purple-light" : "hover:bg-brand-surface"
                )}
              >
                <span className="truncate text-[11px] font-semibold text-brand-text">{item.name}</span>
                <span className="relative grid h-5 grid-cols-8">
                  <span
                    className={cn("relative overflow-hidden rounded-md", item.track)}
                    style={{ gridColumn: `${item.start} / span ${item.span}` }}
                  >
                    <span className={cn("block h-full rounded-md transition-all duration-500", item.bar)} style={{ width: `${progress(index)}%` }} />
                    <span className="absolute inset-0 flex items-center px-1.5 text-[10px] font-bold text-brand-text/80">{progress(index)}%</span>
                  </span>
                </span>
              </button>
            );
          })}
          <span
            aria-hidden
            className="pointer-events-none absolute top-0 bottom-0 w-px bg-red-400"
            style={{ left: `calc(84px + 0.5rem + (100% - 84px - 0.5rem) * ${today / 8})` }}
          />
        </div>
      </div>

      <div className="mt-4 border-t border-brand-border pt-3">
        <div className="flex items-center justify-between">
          <SectionLabel>{project.name} tasks</SectionLabel>
          <span className="hidden text-[10px] text-brand-muted sm:block">Click a task to move it forward</span>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {columns.map((column, status) => (
            <div key={column} className="rounded-xl bg-brand-surface p-1.5">
              <p className="px-1 pb-1.5 text-[11px] font-bold text-brand-text">
                {column}
                <span className="ml-1 font-semibold text-brand-muted">{tasks.filter((task) => task.project === selected && task.status === status).length}</span>
              </p>
              <ul className="flex min-h-[72px] flex-col gap-1.5">
                {tasks.map((task, index) =>
                  task.project === selected && task.status === status ? (
                    <li key={task.title}>
                      <button
                        type="button"
                        onClick={() => advance(index)}
                        className={cn(
                          "demo-rise w-full rounded-lg bg-white px-2 py-1.5 text-left text-[11px] leading-tight font-semibold text-brand-text ring-1 ring-brand-border outline-none transition-all hover:-translate-y-0.5 hover:ring-brand-purple/50 focus-visible:ring-2 focus-visible:ring-brand-purple/60",
                          status === 2 && "text-brand-muted line-through decoration-brand-muted/40"
                        )}
                      >
                        {task.title}
                      </button>
                    </li>
                  ) : null
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </PreviewFrame>
  );
}
