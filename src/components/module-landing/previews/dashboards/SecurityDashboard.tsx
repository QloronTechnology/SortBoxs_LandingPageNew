"use client";

import { useEffect, useState } from "react";
import { Check, Minus, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { PreviewFrame } from "../../PreviewFrame";
import { Chips, SectionLabel } from "./parts";

type Tab = "controls" | "access" | "activity";
const tabs: { key: Tab; label: string }[] = [
  { key: "controls", label: "Controls" },
  { key: "access", label: "Access" },
  { key: "activity", label: "Activity" },
];

/* ---- Controls ---- */
const BASE = 25;
const controls = [
  {
    key: "sso",
    label: "Single sign-on",
    points: 15,
    why: "everyone signs in through your identity provider, so access ends the moment someone leaves.",
  },
  { key: "mfa", label: "Require MFA for everyone", points: 20, why: "a stolen password alone is no longer enough to get in." },
  { key: "byok", label: "Bring your own keys", points: 12, why: "you hold the encryption keys, and you can revoke them at any time." },
  { key: "ip", label: "IP allow-list", points: 10, why: "sign-ins are accepted only from your offices and VPN." },
  { key: "session", label: "15-minute idle timeout", points: 8, why: "unattended screens sign themselves out." },
  {
    key: "siem",
    label: "Stream audit logs to your SIEM",
    points: 10,
    why: "your security team sees SortBoxs events alongside everything else.",
  },
];
const levelFor = (score: number) =>
  score >= 90
    ? { label: "Excellent", tone: "text-emerald-600", ring: "#10b981" }
    : score >= 75
      ? { label: "Strong", tone: "text-sky-600", ring: "#0ea5e9" }
      : score >= 60
        ? { label: "Good", tone: "text-amber-600", ring: "#f59e0b" }
        : { label: "At risk", tone: "text-red-600", ring: "#ef4444" };

/* ---- Access ---- */
const roles = ["Admin", "Manager", "Agent", "Auditor"] as const;
type Role = (typeof roles)[number];
const modules = ["CRM", "Finance", "HR", "Settings"];
const actions = ["View", "Edit", "Export", "Delete"];
const initialAccess: Record<Role, boolean[][]> = {
  Admin: [
    [true, true, true, true],
    [true, true, true, true],
    [true, true, true, true],
    [true, true, true, true],
  ],
  Manager: [
    [true, true, true, false],
    [true, true, false, false],
    [true, false, false, false],
    [false, false, false, false],
  ],
  Agent: [
    [true, true, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
  ],
  Auditor: [
    [true, false, false, false],
    [true, false, false, false],
    [true, false, false, false],
    [true, false, true, false],
  ],
};

/* ---- Activity ---- */
type Kind = "signin" | "data" | "admin" | "alert";
const pool: { kind: Kind; text: string; detail: string }[] = [
  { kind: "signin", text: "Priya S. signed in with MFA", detail: "Mumbai · Chrome" },
  { kind: "data", text: "Rohan M. exported 240 contacts", detail: "CRM · logged and approved" },
  { kind: "admin", text: "Role “Finance Lead” changed", detail: "Export added on Invoices" },
  { kind: "alert", text: "Sign-in blocked from a new country", detail: "Unknown device · MFA failed" },
  { kind: "signin", text: "SSO sign-in by Aisha K.", detail: "Delhi · Okta" },
  { kind: "data", text: "Karan R. opened the payroll report", detail: "HR · allowed by role" },
  { kind: "admin", text: "API key rotated by Anita R.", detail: "Integrations · old key revoked" },
  { kind: "alert", text: "Mass download detected and paused", detail: "Held for admin review" },
];
const kindStyle: Record<Kind, { dot: string; label: string }> = {
  signin: { dot: "bg-sky-500", label: "Sign-in" },
  data: { dot: "bg-violet-500", label: "Data" },
  admin: { dot: "bg-amber-500", label: "Admin" },
  alert: { dot: "bg-red-500", label: "Alert" },
};
type Filter = "all" | Kind;
const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "signin", label: "Sign-ins" },
  { key: "data", label: "Data" },
  { key: "admin", label: "Admin" },
];
type EventItem = { id: number; kind: Kind; text: string; detail: string };
const seed: EventItem[] = [pool[3], pool[2], pool[1], pool[0]].map((item, index) => ({ id: index, ...item }));

export function SecurityDashboard() {
  const [tab, setTab] = useState<Tab>("controls");
  const [on, setOn] = useState<boolean[]>(controls.map((control) => ["sso", "mfa", "session"].includes(control.key)));
  const [role, setRole] = useState<Role>("Agent");
  const [access, setAccess] = useState(initialAccess);
  const [feed, setFeed] = useState({ items: seed, next: 4 });
  const [filter, setFilter] = useState<Filter>("all");
  const [reviewed, setReviewed] = useState<number[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setFeed((current) => {
        const item = pool[current.next % pool.length];
        return { items: [{ id: current.next, ...item }, ...current.items].slice(0, 8), next: current.next + 1 };
      });
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const score = BASE + controls.reduce((sum, control, index) => sum + (on[index] ? control.points : 0), 0);
  const level = levelFor(score);
  const nextBest = controls
    .map((control, index) => ({ control, index }))
    .filter(({ index }) => !on[index])
    .sort((a, b) => b.control.points - a.control.points)[0];
  const granted = access[role].flat().filter(Boolean).length;
  const shown = feed.items.filter((item) => filter === "all" || item.kind === filter).slice(0, 4);
  const openAlerts = feed.items.filter((item) => item.kind === "alert" && !reviewed.includes(item.id)).length;

  const toggleControl = (index: number) => {
    const next = on.map((value, i) => (i === index ? !value : value));
    setOn(next);
    const control = controls[index];
    setMessage(
      next[index]
        ? `${control.label} is on, adding ${control.points} points: ${control.why}`
        : `${control.label} is off, so your score drops by ${control.points}.`,
    );
  };
  const toggleAccess = (m: number, a: number) => {
    const value = !access[role][m][a];
    setAccess((current) => ({
      ...current,
      [role]: current[role].map((row, i) => (i === m ? row.map((cell, j) => (j === a ? value : cell)) : row)),
    }));
    setMessage(
      `${role} ${value ? "can now" : "can no longer"} ${actions[a].toLowerCase()} in ${modules[m]}. It applies instantly and is written to the audit log.${value && actions[a] === "Delete" ? " Grant Delete sparingly." : ""}`,
    );
  };

  const insight =
    message ??
    (tab === "controls"
      ? `Your security score is ${score}. ${nextBest ? `Turning on “${nextBest.control.label}” adds ${nextBest.control.points} points.` : "Every control is on."}`
      : tab === "access"
        ? `${role} has ${granted} of 16 permissions. Click a cell to grant or remove one, and keep access as narrow as the job allows.`
        : openAlerts > 0
          ? `${openAlerts} alert${openAlerts > 1 ? "s need" : " needs"} review. Blocked actions were stopped automatically, and each one is logged.`
          : "Everything has been reviewed. New events appear here as they happen.");

  return (
    <PreviewFrame
      title="Security Center"
      period={tab === "controls" ? "Posture" : tab === "access" ? "Permissions" : "Live audit log"}
      insight={insight}
      badge="SOC 2 · ISO 27001"
    >
      <div className="mt-4">
        <Chips
          label="Security view"
          options={tabs}
          value={tab}
          onChange={(next) => {
            setTab(next);
            setMessage(null);
          }}
        />
      </div>

      {tab === "controls" && (
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-[132px_1fr]">
          <div className="flex flex-col items-center justify-center rounded-xl bg-brand-surface p-3 text-center">
            <div
              className="relative size-24 rounded-full transition-all duration-500"
              style={{ background: `conic-gradient(${level.ring} 0 ${score}%, #e6e4f7 0)` }}
            >
              <div className="absolute inset-2.5 flex flex-col items-center justify-center rounded-full bg-white">
                <span key={score} className="demo-rise text-2xl font-extrabold text-brand-text">
                  {score}
                </span>
                <span className="text-[9px] font-semibold text-brand-muted">of 100</span>
              </div>
            </div>
            <p className={cn("mt-2 text-[12px] font-extrabold", level.tone)}>{level.label}</p>
            <p className="text-[10px] text-brand-muted">Security score</p>
          </div>
          <ul className="flex flex-col gap-1.5" aria-label="Security controls">
            {controls.map((control, index) => (
              <li key={control.key}>
                <button
                  type="button"
                  role="switch"
                  aria-checked={on[index]}
                  onClick={() => toggleControl(index)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-xl px-3 py-1.5 text-left outline-none ring-1 transition-all focus-visible:ring-2 focus-visible:ring-brand-purple/60",
                    on[index] ? "bg-emerald-50 ring-emerald-200" : "bg-brand-surface ring-transparent hover:ring-brand-purple/30",
                  )}
                >
                  <span className="min-w-0 flex-1 truncate text-[12px] font-semibold text-brand-text">{control.label}</span>
                  <span className={cn("text-[10px] font-bold", on[index] ? "text-emerald-700" : "text-brand-muted")}>
                    +{control.points}
                  </span>
                  <span
                    className={cn(
                      "relative h-4 w-7 shrink-0 rounded-full transition-colors",
                      on[index] ? "bg-emerald-500" : "bg-brand-border",
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-0.5 size-3 rounded-full bg-white shadow transition-all",
                        on[index] ? "left-[14px]" : "left-0.5",
                      )}
                    />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {tab === "access" && (
        <div className="mt-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Chips
              label="Role"
              options={roles.map((item) => ({ key: item, label: item }))}
              value={role}
              onChange={(next) => {
                setRole(next);
                setMessage(null);
              }}
            />
            <span className="text-[11px] font-semibold text-brand-muted">{granted} of 16 granted</span>
          </div>
          <div className="mt-3 rounded-xl bg-brand-surface p-2.5">
            <div className="grid grid-cols-[70px_repeat(4,1fr)] gap-1.5 text-center text-[10px] font-semibold text-brand-muted">
              <span />
              {actions.map((action) => (
                <span key={action}>{action}</span>
              ))}
            </div>
            <div role="group" aria-label={`${role} permissions`} className="mt-1 flex flex-col gap-1.5">
              {modules.map((module, m) => (
                <div key={module} className="grid grid-cols-[70px_repeat(4,1fr)] items-center gap-1.5">
                  <span className="text-[11px] font-semibold text-brand-text">{module}</span>
                  {actions.map((action, a) => {
                    const allowed = access[role][m][a];
                    return (
                      <button
                        key={action}
                        type="button"
                        aria-pressed={allowed}
                        aria-label={`${role}: ${action} ${module}`}
                        onClick={() => toggleAccess(m, a)}
                        className={cn(
                          "flex h-7 items-center justify-center rounded-lg outline-none ring-1 transition-all focus-visible:ring-2 focus-visible:ring-brand-purple/60",
                          allowed
                            ? action === "Delete"
                              ? "bg-red-100 text-red-700 ring-red-200"
                              : "bg-emerald-100 text-emerald-700 ring-emerald-200"
                            : "bg-white text-brand-border ring-brand-border hover:ring-brand-purple/40",
                        )}
                      >
                        {allowed ? <Check className="size-3.5" aria-hidden /> : <Minus className="size-3.5" aria-hidden />}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "activity" && (
        <div className="mt-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Chips label="Event type" options={filters} value={filter} onChange={setFilter} />
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px] font-bold",
                openAlerts ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700",
              )}
            >
              {openAlerts ? `${openAlerts} to review` : "All clear"}
            </span>
          </div>
          <SectionLabel className="mt-3">Audit log</SectionLabel>
          <ul className="mt-1.5 flex min-h-[204px] flex-col gap-1.5" aria-live="polite">
            {shown.map((item, index) => {
              const style = kindStyle[item.kind];
              const done = reviewed.includes(item.id);
              return (
                <li
                  key={item.id}
                  className={cn(
                    "demo-rise flex items-center gap-3 rounded-xl px-3 py-2",
                    item.kind === "alert" && !done ? "bg-red-50 ring-1 ring-red-200" : "bg-brand-surface",
                  )}
                >
                  {item.kind === "alert" ? (
                    <ShieldAlert className={cn("size-4 shrink-0", done ? "text-emerald-600" : "text-red-600")} aria-hidden />
                  ) : (
                    <span className={cn("size-2 shrink-0 rounded-full", style.dot)} aria-hidden />
                  )}
                  <span className="min-w-0 flex-1 leading-tight">
                    <span className="block truncate text-[12px] font-semibold text-brand-text">{item.text}</span>
                    <span className="block truncate text-[10px] text-brand-muted">
                      {item.detail} · {index === 0 ? "just now" : `${index * 2} min ago`}
                    </span>
                  </span>
                  {item.kind === "alert" ? (
                    done ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                        <Check className="size-3" aria-hidden /> Reviewed
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setReviewed((current) => [...current, item.id]);
                          setMessage(
                            "Alert reviewed and closed. The blocked action stays in the audit log, and the user was notified to reset their password.",
                          );
                        }}
                        className="rounded-lg bg-red-600 px-2.5 py-1 text-[10px] font-bold text-white outline-none hover:bg-red-700 focus-visible:ring-2 focus-visible:ring-red-300"
                      >
                        Review
                      </button>
                    )
                  ) : (
                    <span className="text-[10px] font-bold text-brand-muted">{style.label}</span>
                  )}
                </li>
              );
            })}
            {shown.length === 0 && (
              <li className="rounded-xl bg-brand-surface px-3 py-6 text-center text-[11px] text-brand-muted">
                No events of this type yet.
              </li>
            )}
          </ul>
        </div>
      )}
    </PreviewFrame>
  );
}
