"use client";

import { useEffect, useState } from "react";
import { Check, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import { PreviewFrame } from "../../PreviewFrame";
import { Chips, SectionLabel } from "./parts";

const steps = ["Workspace", "Modules", "Data", "Team"];
const moduleOptions = ["CRM", "Sales", "HRMS", "Finance", "Projects", "Inventory", "Marketing", "Service"];
const team = ["Priya", "Rohan", "Aisha", "Karan"];
const regions = [
  { key: "India", label: "India" },
  { key: "EU", label: "EU" },
  { key: "US", label: "US" },
];
const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "your-company";

export function SetupJourneyDashboard() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("Aurora Textiles");
  const [region, setRegion] = useState("India");
  const [chosen, setChosen] = useState<string[]>(["CRM", "Sales"]);
  const [progress, setProgress] = useState(0);
  const [importing, setImporting] = useState(false);
  const [invited, setInvited] = useState<string[]>(["Priya"]);
  const [live, setLive] = useState(false);
  const imported = progress >= 100;

  useEffect(() => {
    if (!importing) return;
    const timer = setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          setImporting(false);
          return 100;
        }
        return current + 5;
      });
    }, 90);
    return () => clearInterval(timer);
  }, [importing]);

  const toggle = (list: string[], value: string) => (list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  const canNext = step === 1 ? chosen.length > 0 : step === 2 ? imported : true;
  const insight = live
    ? `${name} is live at ${slugify(name)}.sortboxs.com with ${chosen.length} module${chosen.length > 1 ? "s" : ""} and ${invited.length} teammate${invited.length === 1 ? "" : "s"}. Total time: about 12 minutes.`
    : step === 0
      ? "Your workspace gets its own address, and your data stays in the region you choose."
      : step === 1
        ? chosen.length === 0
          ? "Pick at least one module to continue. You can add the others at any time."
          : `${chosen.join(", ")} will be switched on. Add more later with no migration.`
        : step === 2
          ? imported
            ? "1,240 contacts and 86 deals imported. 18 possible duplicates were held for you to review."
            : importing
              ? "Reading your file, matching fields and checking for duplicates…"
              : "Bring in a spreadsheet or connect another tool. Fields are matched for you."
          : `${invited.length} teammate${invited.length === 1 ? "" : "s"} will get an email invite with the right role already set.`;

  return (
    <PreviewFrame title="Setup Journey" period={live ? "Live" : `Step ${step + 1} of 4`} insight={insight} badge="Live in minutes">
      <ol className="mt-4 flex items-center" aria-label="Setup steps">
        {steps.map((label, index) => {
          const done = live || index < step;
          const current = !live && index === step;
          return (
            <li key={label} className="flex min-w-0 flex-1 items-center last:flex-none">
              <span className="flex flex-col items-center gap-1">
                <span className={cn("flex size-7 items-center justify-center rounded-full text-[11px] font-bold transition-all", done ? "bg-emerald-500 text-white" : current ? "bg-brand-purple text-white ring-4 ring-brand-purple/25" : "bg-brand-surface text-brand-muted ring-1 ring-brand-border")}>
                  {done ? <Check className="size-3.5" aria-hidden /> : index + 1}
                </span>
                <span className="text-[10px] font-bold text-brand-text">{label}</span>
              </span>
              {index < steps.length - 1 && <span className={cn("mx-1 mb-4 h-0.5 flex-1 rounded-full transition-colors", done ? "bg-emerald-400" : "bg-brand-border")} />}
            </li>
          );
        })}
      </ol>

      <div className="mt-3 min-h-[188px] rounded-xl bg-brand-surface p-3">
        {live ? (
          <div className="demo-rise flex h-full flex-col items-center justify-center gap-2 py-3 text-center">
            <span className="flex size-10 items-center justify-center rounded-full bg-emerald-500 text-white">
              <Rocket className="size-5" aria-hidden />
            </span>
            <p className="text-[14px] font-extrabold text-brand-text">You&apos;re live</p>
            <p className="text-[11px] font-semibold text-brand-purple">{slugify(name)}.sortboxs.com</p>
            <ul className="mt-1 grid w-full grid-cols-3 gap-2 text-center">
              {[
                ["Modules", String(chosen.length)],
                ["Records", "1,240"],
                ["Teammates", String(invited.length)],
              ].map(([label, value]) => (
                <li key={label} className="rounded-lg bg-white px-2 py-1.5 ring-1 ring-brand-border">
                  <p className="text-[10px] font-semibold text-brand-muted">{label}</p>
                  <p className="text-sm font-extrabold text-brand-text">{value}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div key={step} className="demo-rise">
            {step === 0 && (
              <>
                <label htmlFor="ws-name" className="text-[11px] font-bold text-brand-text">
                  Company name
                </label>
                <input
                  id="ws-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="mt-1 w-full rounded-lg bg-white px-3 py-2 text-[13px] font-semibold text-brand-text ring-1 ring-brand-border outline-none focus:ring-2 focus:ring-brand-purple/60"
                />
                <p className="mt-2 rounded-lg bg-white px-3 py-2 text-[12px] ring-1 ring-brand-border">
                  <span className="text-brand-muted">https://</span>
                  <span className="font-bold text-brand-purple">{slugify(name)}</span>
                  <span className="text-brand-muted">.sortboxs.com</span>
                </p>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <SectionLabel>Data region</SectionLabel>
                  <Chips label="Data region" options={regions} value={region} onChange={setRegion} />
                </div>
              </>
            )}
            {step === 1 && (
              <>
                <SectionLabel>Switch on what you need</SectionLabel>
                <div className="mt-2 grid grid-cols-2 gap-1.5 sm:grid-cols-4" role="group" aria-label="Modules">
                  {moduleOptions.map((module) => {
                    const on = chosen.includes(module);
                    return (
                      <button
                        key={module}
                        type="button"
                        aria-pressed={on}
                        onClick={() => setChosen((current) => toggle(current, module))}
                        className={cn(
                          "flex items-center justify-center gap-1 rounded-lg px-2 py-2 text-[12px] font-semibold outline-none ring-1 transition-all focus-visible:ring-2 focus-visible:ring-brand-purple/60",
                          on ? "bg-brand-purple text-white ring-brand-purple shadow-md shadow-brand-purple/25" : "bg-white text-brand-muted ring-brand-border hover:text-brand-text"
                        )}
                      >
                        {on && <Check className="size-3" aria-hidden />} {module}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-3 text-center text-[11px] text-brand-muted">
                  <span className="font-bold text-brand-text">{chosen.length}</span> of {moduleOptions.length} selected · free to start
                </p>
              </>
            )}
            {step === 2 && (
              <div className="flex flex-col gap-3">
                <SectionLabel>Import your data</SectionLabel>
                <div className="rounded-lg bg-white p-3 ring-1 ring-brand-border">
                  <p className="text-[12px] font-semibold text-brand-text">customers-export.xlsx</p>
                  <span className="mt-2 block h-2 overflow-hidden rounded-full bg-brand-surface">
                    <span className="block h-full rounded-full bg-brand-purple transition-all duration-100" style={{ width: `${progress}%` }} />
                  </span>
                  <p className="mt-1.5 text-[11px] text-brand-muted">{imported ? "1,240 contacts · 86 deals imported" : importing ? `Importing… ${progress}%` : "Ready to import"}</p>
                </div>
                <button
                  type="button"
                  disabled={importing || imported}
                  onClick={() => {
                    setProgress(0);
                    setImporting(true);
                  }}
                  className="self-start rounded-lg bg-brand-purple px-3 py-1.5 text-[11px] font-semibold text-white outline-none hover:bg-brand-purple-dark focus-visible:ring-2 focus-visible:ring-brand-purple/60 disabled:opacity-50"
                >
                  {imported ? "Imported" : importing ? "Importing…" : "Import sample data"}
                </button>
              </div>
            )}
            {step === 3 && (
              <>
                <SectionLabel>Invite your team</SectionLabel>
                <ul className="mt-2 grid grid-cols-2 gap-1.5">
                  {team.map((person) => {
                    const on = invited.includes(person);
                    return (
                      <li key={person}>
                        <button
                          type="button"
                          aria-pressed={on}
                          onClick={() => setInvited((current) => toggle(current, person))}
                          className={cn("flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[12px] font-semibold outline-none ring-1 transition-all focus-visible:ring-2 focus-visible:ring-brand-purple/60", on ? "bg-emerald-50 text-emerald-900 ring-emerald-200" : "bg-white text-brand-muted ring-brand-border")}
                        >
                          <span className={cn("flex size-6 items-center justify-center rounded-full text-[10px] font-bold", on ? "bg-emerald-500 text-white" : "bg-brand-surface text-brand-purple")}>{on ? <Check className="size-3" aria-hidden /> : person[0]}</span>
                          {person}
                          <span className="ml-auto text-[10px] font-bold">{on ? "Invited" : "Invite"}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <button
          type="button"
          disabled={step === 0 && !live}
          onClick={() => {
            if (live) {
              setLive(false);
              setStep(0);
              setProgress(0);
            } else setStep((current) => current - 1);
          }}
          className="rounded-lg px-3 py-1.5 text-[11px] font-semibold text-brand-muted outline-none hover:text-brand-text focus-visible:ring-2 focus-visible:ring-brand-purple/60 disabled:opacity-0"
        >
          {live ? "Start over" : "Back"}
        </button>
        {!live && (
          <button
            type="button"
            disabled={!canNext}
            onClick={() => (step === steps.length - 1 ? setLive(true) : setStep((current) => current + 1))}
            className="rounded-lg bg-brand-purple px-4 py-1.5 text-[11px] font-semibold text-white outline-none hover:bg-brand-purple-dark focus-visible:ring-2 focus-visible:ring-brand-purple/60 disabled:opacity-40"
          >
            {step === steps.length - 1 ? "Go live" : "Next"}
          </button>
        )}
      </div>
    </PreviewFrame>
  );
}
