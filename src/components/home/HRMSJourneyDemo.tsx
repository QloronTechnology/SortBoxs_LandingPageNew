"use client";

import { useEffect, useRef, useState } from "react";
import {
  UserPlus,
  FileCheck2,
  ShieldCheck,
  KeyRound,
  CheckCircle2,
  Clock,
  LogIn,
  LogOut,
  CalendarDays,
  Wallet,
  Receipt,
  AlertTriangle,
  Gauge,
  GraduationCap,
  Target,
  BookOpen,
  Users2,
  ClipboardList,
  IdCard,
  MapPin,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { IconBox } from "@/components/ui/IconBox";
import { Button } from "@/components/ui/Button";
import { MouseCursor } from "@/components/dashboard/MouseCursor";
import type { ModulePageData } from "@/types/module";

type Screen = 1 | 2 | 3 | 4 | 5 | 6;

const STEP_META = [
  { label: "Recruitment & Onboarding", icon: UserPlus },
  { label: "Employee Management", icon: Users2 },
  { label: "Attendance & Leave", icon: CalendarDays },
  { label: "Payroll & Compliance", icon: Wallet },
  { label: "Performance Management", icon: Gauge },
  { label: "Learning & Development", icon: GraduationCap },
] as const;

function ScreenFrame({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <div className={cn("transition-opacity duration-400", active ? "opacity-100" : "pointer-events-none absolute inset-0 opacity-0")}>
      {children}
    </div>
  );
}

function Reveal({ show, children, className }: { show: boolean; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("transition-all duration-500", show ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0", className)}>
      {children}
    </div>
  );
}

export function HRMSJourneyDemo({ data }: { data: ModulePageData }) {
  const [screen, setScreen] = useState<Screen>(1);
  const [step, setStep] = useState(0);
  const [cursor, setCursor] = useState({ x: 50, y: 50, visible: false, clicking: false });
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const schedule = (fn: () => void, delay: number) => {
      timers.current.push(setTimeout(fn, delay));
    };
    const moveCursor = (x: number, y: number) => setCursor((c) => ({ ...c, x, y, visible: true, clicking: false }));
    const click = () => setCursor((c) => ({ ...c, clicking: true }));
    const release = () => setCursor((c) => ({ ...c, clicking: false }));
    const hideCursor = () => setCursor((c) => ({ ...c, visible: false }));

    function runCycle() {
      let t = 0;
      const at = (fn: () => void, delay: number) => {
        t += delay;
        schedule(fn, t);
      };

      // ---------- SCREEN 1: Recruitment & Onboarding ----------
      setScreen(1);
      setStep(0);
      at(() => moveCursor(86, 16), 700);
      at(() => click(), 900);
      at(() => {
        release();
        setStep(1);
      }, 300);
      at(() => setStep(2), 900); // form filled
      at(() => setStep(3), 1000); // check1
      at(() => setStep(4), 700); // check2
      at(() => setStep(5), 700); // check3
      at(() => setStep(6), 700); // success
      at(() => hideCursor(), 1400);

      // ---------- SCREEN 2: Employee Management ----------
      at(() => {
        setScreen(2);
        setStep(0);
      }, 700);
      at(() => setStep(1), 900); // profile card
      at(() => setStep(2), 900); // details
      at(() => setStep(3), 900); // team list
      at(() => setStep(4), 1000); // verified

      // ---------- SCREEN 3: Attendance & Leave ----------
      at(() => {
        setScreen(3);
        setStep(0);
      }, 1600);
      at(() => moveCursor(89, 16), 800);
      at(() => click(), 800);
      at(() => {
        release();
        setStep(1);
      }, 300); // clocked in
      at(() => moveCursor(89, 16), 1800); // "later" - clock out same button spot
      at(() => click(), 900);
      at(() => {
        release();
        setStep(2);
      }, 300); // clocked out + calendar
      at(() => moveCursor(86, 62), 1200);
      at(() => click(), 900);
      at(() => {
        release();
        setStep(3);
      }, 300); // leave form open
      at(() => setStep(4), 900); // leave form filled
      at(() => moveCursor(90, 70), 900);
      at(() => click(), 800);
      at(() => {
        release();
        setStep(5);
      }, 300); // pending
      at(() => setStep(6), 1300); // approved
      at(() => hideCursor(), 1200);

      // ---------- SCREEN 4: Payroll & Compliance ----------
      at(() => {
        setScreen(4);
        setStep(0);
      }, 700);
      at(() => setStep(1), 1100); // data pulled
      at(() => setStep(2), 700); // basic
      at(() => setStep(3), 500); // allowances
      at(() => setStep(4), 500); // deductions
      at(() => setStep(5), 500); // tax
      at(() => setStep(6), 600); // net pay
      at(() => moveCursor(87, 67), 900);
      at(() => click(), 900);
      at(() => {
        release();
        setStep(7);
      }, 300); // payslip generated
      at(() => hideCursor(), 1500);

      // ---------- SCREEN 5: Performance Management ----------
      at(() => {
        setScreen(5);
        setStep(0);
      }, 700);
      at(() => setStep(1), 900); // attendance stats
      at(() => setStep(2), 800); // project stats
      at(() => setStep(3), 900); // score gauge
      at(() => setStep(4), 1000); // warning banner

      // ---------- SCREEN 6: Learning & Development ----------
      at(() => {
        setScreen(6);
        setStep(0);
      }, 2200);
      at(() => setStep(1), 900); // PIP card
      at(() => setStep(2), 800); // course 1
      at(() => setStep(3), 600); // course 2
      at(() => setStep(4), 600); // course 3
      at(() => setStep(5), 900); // confirmation

      at(() => runCycle(), 2600);
    }

    runCycle();
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, []);

  return (
    <section className="bg-white py-14 lg:py-16">
      <div className="container-page grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="mb-5 flex items-center gap-3">
            <IconBox image={data.icon} size="md" />
            <Badge>{data.badge}</Badge>
          </div>
          <h2 className="text-3xl font-bold text-brand-text sm:text-4xl">{data.heading}</h2>
          <p className="mt-4 text-base text-brand-muted">{data.description}</p>
          <Button href="/hrms" className="mt-7">
            {data.cta}
          </Button>
        </div>

        <div className="lg:col-span-3">
          <ul className="flex flex-col gap-4">
            {data.features.map((feature, index) => {
              const active = screen === index + 1;
              return (
                <li
                  key={feature}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors duration-300",
                    active && "bg-brand-purple-light"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-6 shrink-0 items-center justify-center rounded-full text-white transition-colors duration-300",
                      active ? "bg-brand-purple" : "bg-brand-purple/70"
                    )}
                  >
                    <Check className="size-3.5" aria-hidden />
                  </span>
                  <span className={cn("text-[15px] font-medium transition-colors duration-300", active ? "text-brand-purple" : "text-brand-text")}>
                    {feature}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="lg:col-span-5">
          <div className="relative min-h-[440px] overflow-hidden rounded-2xl border border-brand-border bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Users2 className="size-5 text-brand-purple" aria-hidden />
                <h4 className="text-base font-bold text-brand-text">{STEP_META[screen - 1].label}</h4>
              </div>
              <div className="flex items-center gap-1.5">
                {STEP_META.map((s, i) => (
                  <span
                    key={s.label}
                    className={cn(
                      "rounded-full transition-all duration-300",
                      screen === i + 1 ? "h-1.5 w-4 bg-brand-purple" : "size-1.5 bg-slate-200"
                    )}
                  />
                ))}
              </div>
            </div>

            <div className="relative min-h-[370px]">
              <ScreenFrame active={screen === 1}>
                <RecruitmentScreen step={step} />
              </ScreenFrame>
              <ScreenFrame active={screen === 2}>
                <EmployeeManagementScreen step={step} />
              </ScreenFrame>
              <ScreenFrame active={screen === 3}>
                <AttendanceScreen step={step} />
              </ScreenFrame>
              <ScreenFrame active={screen === 4}>
                <PayrollScreen step={step} />
              </ScreenFrame>
              <ScreenFrame active={screen === 5}>
                <PerformanceScreen step={step} />
              </ScreenFrame>
              <ScreenFrame active={screen === 6}>
                <LearningScreen step={step} />
              </ScreenFrame>
            </div>

            <MouseCursor x={cursor.x} y={cursor.y} visible={cursor.visible} clicking={cursor.clicking} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- Screen 1: Recruitment & Onboarding ---------------------------- */

function RecruitmentScreen({ step }: { step: number }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">HR Console</p>
        <span className="flex items-center gap-1.5 rounded-lg bg-brand-purple px-3 py-1.5 text-xs font-semibold text-white">
          <UserPlus className="size-3.5" aria-hidden />
          Add Employee
        </span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2.5 rounded-xl border border-slate-100 bg-slate-50/60 p-3">
        <MiniField label="Full Name" value="Ananya Kapoor" show={step >= 2} />
        <MiniField label="Role" value="Product Designer" show={step >= 2} />
        <MiniField label="Department" value="Design" show={step >= 2} />
        <MiniField label="Joining Date" value="03 Oct 2026" show={step >= 2} />
        <MiniField label="Salary" value="₹65,000 / mo" show={step >= 2} className="col-span-2" />
      </div>

      <div className="mt-3 flex flex-col gap-2 rounded-xl border border-slate-100 p-3">
        <p className="mb-0.5 text-[11px] font-semibold text-slate-500">Onboarding Checklist</p>
        <ChecklistRow label="Offer letter sent" done={step >= 3} />
        <ChecklistRow label="Documents verified" done={step >= 4} />
        <ChecklistRow label="System access created" done={step >= 5} />
      </div>

      <Reveal show={step >= 6} className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2.5">
        <CheckCircle2 className="size-4 text-emerald-600" aria-hidden />
        <span className="text-xs font-semibold text-emerald-700">Employee Onboarded — Ananya Kapoor is ready to start</span>
      </Reveal>
    </div>
  );
}

function MiniField({ label, value, show, className }: { label: string; value: string; show: boolean; className?: string }) {
  return (
    <div className={className}>
      <p className="text-[9px] text-slate-400">{label}</p>
      <p className={cn("text-xs font-semibold transition-opacity duration-500", show ? "text-brand-text opacity-100" : "text-slate-300 opacity-50")}>
        {show ? value : "..."}
      </p>
    </div>
  );
}

function ChecklistRow({ label, done }: { label: string; done: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          "flex size-5 items-center justify-center rounded-full border transition-colors duration-300",
          done ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-300 text-transparent"
        )}
      >
        <CheckCircle2 className="size-3.5" aria-hidden />
      </span>
      <span className={cn("text-xs transition-colors duration-300", done ? "text-brand-text" : "text-slate-400")}>{label}</span>
      {done && (label.includes("Offer") ? <FileCheck2 className="ml-auto size-3.5 text-emerald-500" aria-hidden /> : label.includes("Documents") ? <ShieldCheck className="ml-auto size-3.5 text-emerald-500" aria-hidden /> : <KeyRound className="ml-auto size-3.5 text-emerald-500" aria-hidden />)}
    </div>
  );
}

/* ---------------------------- Screen 2: Employee Management ---------------------------- */

const TEAMMATES = ["Karan Shah", "Isha Rao", "Devika Singh"];

function EmployeeManagementScreen({ step }: { step: number }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold text-brand-text">Employee Directory</p>

      <Reveal show={step >= 1} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-purple-light text-brand-purple">
          <Users2 className="size-5" aria-hidden />
        </span>
        <div>
          <p className="text-xs font-bold text-brand-text">Ananya Kapoor</p>
          <p className="text-[10px] text-slate-500">Product Designer · Design Team</p>
        </div>
        <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-semibold text-emerald-700">Active</span>
      </Reveal>

      <Reveal show={step >= 2} className="mt-3 grid grid-cols-2 gap-2.5 rounded-xl border border-slate-100 p-3">
        <MiniStat icon={IdCard} label="Employee ID" value="SB-2041" />
        <MiniStat icon={Users2} label="Reporting Manager" value="Rohit Sharma" />
        <MiniStat icon={MapPin} label="Location" value="Bengaluru, IN" />
        <MiniStat icon={CheckCircle2} label="Employment Type" value="Full-time" />
      </Reveal>

      <Reveal show={step >= 3} className="mt-3">
        <p className="mb-1.5 text-[10px] font-semibold text-slate-500">Design Team</p>
        <div className="flex flex-col gap-1.5">
          {TEAMMATES.map((name) => (
            <div key={name} className="flex items-center gap-2 rounded-lg bg-slate-50 px-2.5 py-1.5">
              <span className="flex size-5 items-center justify-center rounded-full bg-white text-slate-400">
                <Users2 className="size-3" aria-hidden />
              </span>
              <span className="text-[11px] text-slate-600">{name}</span>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal show={step >= 4} className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2.5">
        <CheckCircle2 className="size-4 text-emerald-600" aria-hidden />
        <span className="text-xs font-semibold text-emerald-700">Employee profile verified &amp; up to date</span>
      </Reveal>
    </div>
  );
}

function MiniStat({ icon: Icon, label, value }: { icon: typeof Users2; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-brand-purple-light text-brand-purple">
        <Icon className="size-3.5" aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="text-[9px] text-slate-400">{label}</p>
        <p className="truncate text-[11px] font-semibold text-brand-text">{value}</p>
      </div>
    </div>
  );
}

/* ---------------------------- Screen 3: Attendance & Leave ---------------------------- */

function AttendanceScreen({ step }: { step: number }) {
  const clockedIn = step >= 1;
  const clockedOut = step >= 2;
  const leaveFormOpen = step >= 3;
  const leaveFilled = step >= 4;
  const pending = step >= 5;
  const approved = step >= 6;

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-full bg-brand-purple-light text-brand-purple">
            <Users2 className="size-3.5" aria-hidden />
          </span>
          <div>
            <p className="text-xs font-semibold text-brand-text">Ananya Kapoor</p>
            <p className="text-[10px] text-slate-400">Product Designer · Design</p>
          </div>
        </div>
        <span
          className={cn(
            "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors duration-300",
            clockedOut ? "bg-slate-100 text-slate-400" : clockedIn ? "bg-rose-50 text-rose-600" : "bg-brand-purple text-white"
          )}
        >
          {clockedOut ? <Clock className="size-3.5" aria-hidden /> : clockedIn ? <LogOut className="size-3.5" aria-hidden /> : <LogIn className="size-3.5" aria-hidden />}
          {clockedOut ? "Shift Ended" : clockedIn ? "Clock Out" : "Clock In"}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        <StatBox label="Clock In" value={clockedIn ? "09:15 AM" : "--:--"} highlight={clockedIn && !clockedOut} />
        <StatBox label="Clock Out" value={clockedOut ? "06:30 PM" : "--:--"} highlight={clockedOut} />
        <StatBox label="Total Hours" value={clockedOut ? "9h 15m" : "--"} highlight={clockedOut} accent="emerald" />
      </div>

      <Reveal show={clockedOut} className="mt-3">
        <p className="mb-1.5 text-[10px] font-semibold text-slate-500">This Week</p>
        <div className="flex gap-1.5">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <div
              key={i}
              className={cn(
                "flex h-9 flex-1 flex-col items-center justify-center rounded-lg text-[9px] font-semibold",
                i === 2 ? "bg-amber-100 text-amber-700" : i > 4 ? "bg-slate-50 text-slate-300" : "bg-emerald-50 text-emerald-600"
              )}
            >
              {d}
            </div>
          ))}
        </div>
        <p className="mt-1 text-[9px] text-amber-600">● Wed — late arrival (09:52 AM)</p>
      </Reveal>

      <div className="mt-3 rounded-xl border border-slate-100 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarDays className="size-4 text-brand-purple" aria-hidden />
            <p className="text-xs font-semibold text-brand-text">Leave Request</p>
          </div>
          {!leaveFormOpen && (
            <span id="apply-leave-btn" className="rounded-lg bg-brand-purple-light px-2.5 py-1 text-[11px] font-semibold text-brand-purple">
              Apply for Leave
            </span>
          )}
          {pending && (
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px] font-semibold transition-colors duration-300",
                approved ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
              )}
            >
              {approved ? "Approved" : "Pending"}
            </span>
          )}
        </div>

        {leaveFormOpen && !pending && (
          <div className="mt-2.5 flex items-center justify-between border-t border-slate-100 pt-2.5">
            <span className={cn("text-[11px] transition-opacity duration-500", leaveFilled ? "font-semibold text-brand-text opacity-100" : "text-slate-300 opacity-60")}>
              {leaveFilled ? "Oct 20 – Oct 21 · Casual Leave" : "..."}
            </span>
            {leaveFilled && (
              <span id="submit-leave-btn" className="rounded-lg bg-brand-purple px-2.5 py-1 text-[10px] font-semibold text-white">
                Submit
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function StatBox({ label, value, highlight, accent = "purple" }: { label: string; value: string; highlight: boolean; accent?: "purple" | "emerald" }) {
  return (
    <div
      className={cn(
        "rounded-xl border p-2.5 text-center transition-colors duration-500",
        highlight ? (accent === "emerald" ? "border-emerald-200 bg-emerald-50" : "border-brand-purple/30 bg-brand-purple-light/40") : "border-slate-100 bg-slate-50/60"
      )}
    >
      <p className="text-[9px] text-slate-400">{label}</p>
      <p className="text-sm font-bold text-brand-text">{value}</p>
    </div>
  );
}

/* ---------------------------- Screen 4: Payroll & Compliance ---------------------------- */

const PAYROLL_ROWS = [
  { label: "Basic", value: "₹40,000", positive: true },
  { label: "Allowances", value: "+ ₹8,000", positive: true },
  { label: "Deductions", value: "− ₹2,000", positive: false },
  { label: "Tax", value: "− ₹3,500", positive: false },
];

function PayrollScreen({ step }: { step: number }) {
  const dataPulled = step >= 1;
  const rowsShown = Math.max(0, Math.min(4, step - 1));
  const netPayShown = step >= 6;
  const payslip = step >= 7;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-brand-text">Run Payroll — October 2026</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-[10px] text-slate-400">
            <CheckCircle2 className={cn("size-3", dataPulled ? "text-emerald-500" : "text-slate-300")} aria-hidden />
            {dataPulled ? "Attendance & leave data synced for Ananya Kapoor" : "Pulling attendance & leave data..."}
          </p>
        </div>
        <Wallet className="size-5 text-brand-purple" aria-hidden />
      </div>

      <div className="mt-3 flex flex-col divide-y divide-slate-100 rounded-xl border border-slate-100">
        {PAYROLL_ROWS.map((row, i) => (
          <Reveal key={row.label} show={rowsShown > i} className="flex items-center justify-between px-3 py-2">
            <span className="text-xs text-slate-500">{row.label}</span>
            <span className={cn("text-xs font-semibold", row.positive ? "text-brand-text" : "text-rose-500")}>{row.value}</span>
          </Reveal>
        ))}
        <Reveal show={netPayShown} className="flex items-center justify-between bg-brand-purple-light px-3 py-2.5">
          <span className="text-xs font-bold text-brand-purple">Net Pay</span>
          <span className="text-sm font-bold text-brand-purple">₹42,500</span>
        </Reveal>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <Reveal show={payslip} className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
          <Receipt className="size-3.5" aria-hidden />
          Payslip generated ✅
        </Reveal>
        <span className="ml-auto flex items-center gap-1.5 rounded-lg bg-brand-purple px-3 py-1.5 text-xs font-semibold text-white">
          <Wallet className="size-3.5" aria-hidden />
          Run Payroll
        </span>
      </div>
    </div>
  );
}

/* ---------------------------- Screen 5: Performance Management ---------------------------- */

function PerformanceScreen({ step }: { step: number }) {
  const score = 58;
  return (
    <div>
      <p className="mb-3 text-xs font-semibold text-brand-text">Performance Scorecard — Ananya Kapoor</p>

      <Reveal show={step >= 1} className="grid grid-cols-3 gap-2">
        <MetricTile label="Attendance" value="92%" />
        <MetricTile label="Late Arrivals" value="3" />
        <MetricTile label="Leaves Taken" value="4" />
      </Reveal>

      <Reveal show={step >= 2} className="mt-2 grid grid-cols-3 gap-2">
        <MetricTile label="Total Projects" value="6" />
        <MetricTile label="Delivered" value="4" />
        <MetricTile label="On-Time %" value="67%" />
      </Reveal>

      <Reveal show={step >= 3} className="mt-3 flex items-center gap-4 rounded-xl border border-slate-100 p-3">
        <div className="relative flex size-16 shrink-0 items-center justify-center">
          <svg viewBox="0 0 40 40" className="size-16 -rotate-90">
            <circle cx="20" cy="20" r="16" fill="none" stroke="#f1f0fb" strokeWidth="5" />
            <circle
              cx="20"
              cy="20"
              r="16"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={`${(score / 100) * 100.5} 100.5`}
            />
          </svg>
          <span className="absolute text-sm font-bold text-brand-text">{score}</span>
        </div>
        <div>
          <p className="text-xs font-semibold text-brand-text">Overall Performance Score</p>
          <p className="text-[11px] text-slate-400">{score}/100 this quarter</p>
        </div>
      </Reveal>

      <Reveal show={step >= 4} className="mt-3 flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2.5">
        <AlertTriangle className="size-4 shrink-0 text-amber-600" aria-hidden />
        <span className="text-xs font-semibold text-amber-700">
          Below expectations — recommended for skill development / PIP
        </span>
      </Reveal>
    </div>
  );
}

function MetricTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-2.5 text-center">
      <p className="text-sm font-bold text-brand-text">{value}</p>
      <p className="text-[9px] text-slate-400">{label}</p>
    </div>
  );
}

/* ---------------------------- Screen 6: Learning & Development ---------------------------- */

const PIP_COURSES = [
  { label: "Advanced Excel & Reporting", progress: 40 },
  { label: "Time Management Essentials", progress: 25 },
  { label: "Client Communication Skills", progress: 15 },
];

function LearningScreen({ step }: { step: number }) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <GraduationCap className="size-5 text-brand-purple" aria-hidden />
        <p className="text-xs font-semibold text-brand-text">Ananya Kapoor moved to Learning &amp; Development</p>
      </div>

      <Reveal show={step >= 1} className="mt-3 flex items-center gap-3 rounded-xl border border-slate-100 bg-brand-surface p-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-purple-light text-brand-purple">
          <Target className="size-4.5" aria-hidden />
        </span>
        <div>
          <p className="text-xs font-bold text-brand-text">Performance Improvement Plan</p>
          <p className="text-[10px] text-slate-500">Mentor assigned: Rohit Sharma · 30-day plan</p>
        </div>
      </Reveal>

      <div className="mt-3 flex flex-col gap-2.5">
        {PIP_COURSES.map((course, i) => (
          <Reveal key={course.label} show={step >= 2 + i} className="rounded-xl border border-slate-100 p-2.5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold text-brand-text">
                <BookOpen className="size-3.5 text-brand-purple" aria-hidden />
                {course.label}
              </span>
              <span className="text-[10px] text-slate-400">{course.progress}%</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-brand-purple transition-[width] duration-700 ease-out"
                style={{ width: step >= 2 + i ? `${course.progress}%` : "0%" }}
              />
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal show={step >= 5} className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2.5">
        <ClipboardList className="size-4 text-emerald-600" aria-hidden />
        <span className="text-xs font-semibold text-emerald-700">🎯 PIP Plan Created — check-in scheduled in 30 days</span>
      </Reveal>
    </div>
  );
}
