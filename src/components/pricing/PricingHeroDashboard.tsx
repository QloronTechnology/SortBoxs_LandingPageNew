"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import Image from "next/image";
import {
  Activity,
  ArrowRight,
  ArrowUpDown,
  Banknote,
  Bell,
  Briefcase,
  BriefcaseBusiness,
  Building2,
  Cake,
  CalendarCheck,
  CalendarClock,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDashed,
  CircleUser,
  CircleX,
  Clock,
  Coffee,
  Droplet,
  EllipsisVertical,
  FileText,
  Flag,
  FolderOpen,
  Gift,
  Globe,
  HandCoins,
  Heart,
  House,
  IdCard,
  Inbox,
  Laptop,
  LayoutGrid,
  Mail,
  MapPin,
  Mars,
  Megaphone,
  Monitor,
  MonitorSmartphone,
  Moon,
  Network,
  Phone,
  Quote,
  Receipt,
  ReceiptText,
  Search,
  Settings,
  SquareArrowOutUpRight,
  Thermometer,
  Timer,
  UserRound,
  Users,
  UsersRound,
  X,
  type LucideIcon,
} from "lucide-react";
import { MouseCursor } from "@/components/dashboard/MouseCursor";
import { assets } from "@/config/assets";
import { cn } from "@/lib/utils";

/**
 * Animated hero mockup for the pricing page, recreated from the "Home - Dashboard", "Global Search"
 * and "Profile - About" designs. The cursor opens global search, types a name, the employee list
 * drops in, it picks one and their profile opens — then it loops. Sample data only.
 *
 * The app is laid out on a fixed virtual canvas (1000px wide, or 600px on narrow screens) and scaled
 * to fit, so it keeps the design's proportions at every size.
 */

const QUERY = "John";
const IMG = "/images/pricing-hero";

type View = "dashboard" | "profile";

interface CursorState {
  x: number;
  y: number;
  visible: boolean;
  clicking: boolean;
}

const REST = { x: 78, y: 70 };

/** Centre of `target`, as % of `container` — so the cursor lands correctly at any size. */
function pointAt(container: RefObject<HTMLElement | null>, target: RefObject<HTMLElement | null>, xBias = 0.5) {
  const c = container.current?.getBoundingClientRect();
  const t = target.current?.getBoundingClientRect();
  if (!c || !t || c.width === 0) return REST;
  return {
    x: ((t.left + t.width * xBias - c.left) / c.width) * 100,
    y: ((t.top + t.height / 2 - c.top) / c.height) * 100,
  };
}

// useLayoutEffect warns during static prerender; fall back to useEffect on the server.
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function PricingHeroDashboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState({ w: 0, h: 0 });
  const [view, setView] = useState<View>("dashboard");
  const [panelOpen, setPanelOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const [resultHover, setResultHover] = useState(false);
  const [loop, setLoop] = useState(0);
  const [cursor, setCursor] = useState<CursorState>({ ...REST, visible: false, clicking: false });

  // Track the container size to scale the virtual canvas.
  useIsoLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));

    function cycle() {
      setView("dashboard");
      setPanelOpen(false);
      setTyped("");
      setResultHover(false);
      setLoop((n) => n + 1);
      setCursor({ ...REST, visible: false, clicking: false });

      // 1. Move to the global search bar and click it.
      at(900, () => setCursor({ ...pointAt(containerRef, searchRef, 0.3), visible: true, clicking: false }));
      at(1800, () => setCursor((c) => ({ ...c, clicking: true })));
      at(2050, () => {
        setCursor((c) => ({ ...c, clicking: false }));
        setPanelOpen(true);
      });

      // 2. Type the name — the employee list drops in as it matches.
      const typeStart = 2400;
      const perChar = 170;
      for (let i = 1; i <= QUERY.length; i++) at(typeStart + i * perChar, () => setTyped(QUERY.slice(0, i)));
      const typeEnd = typeStart + QUERY.length * perChar;

      // 3. Move to the first employee and click.
      at(typeEnd + 800, () => setCursor({ ...pointAt(containerRef, resultRef, 0.3), visible: true, clicking: false }));
      at(typeEnd + 1600, () => setResultHover(true));
      at(typeEnd + 1950, () => setCursor((c) => ({ ...c, clicking: true })));

      // 4. Open their profile.
      at(typeEnd + 2200, () => {
        setCursor((c) => ({ ...c, clicking: false }));
        setPanelOpen(false);
        setView("profile");
      });
      at(typeEnd + 2900, () => setCursor((c) => ({ ...c, ...REST, visible: false })));

      // 5. Hold on the profile, then loop.
      at(typeEnd + 8000, cycle);
    }

    cycle();
    return () => timers.forEach(clearTimeout);
  }, []);

  const compact = size.w > 0 && size.w < 560;
  const W = compact ? 600 : 1000;
  const scale = size.w / W;
  const H = scale ? size.h / scale : 0;
  const showResults = panelOpen && typed.length >= 2;

  return (
    <div className="relative">
      {/* Soft lavender glow behind the mockup (as in the design). */}
      <div
        aria-hidden
        className="absolute -inset-x-6 -inset-y-8 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,#e7e2fc_0%,rgba(231,226,252,0)_70%)]"
      />

      <div
        ref={containerRef}
        role="img"
        aria-label="Animated preview: searching for an employee in SortBoxs global search and opening their profile"
        className="relative aspect-[1.3/1] overflow-hidden rounded-2xl bg-[#f4f4f6] text-left shadow-[0_24px_60px_-20px_rgba(23,22,92,0.35)] select-none sm:aspect-[1.9/1]"
      >
        {/* Virtual canvas */}
        <div
          aria-hidden
          className={cn("absolute top-0 left-0 flex origin-top-left text-[#2f2b3d]", !scale && "invisible")}
          style={{ width: W, height: H, transform: `scale(${scale || 1})` }}
        >
          {!compact && <Sidebar active={view === "dashboard" ? "Home" : null} />}

          <div className="flex min-w-0 flex-1 flex-col gap-2.5 px-2 pt-1.5">
            <TopBar compact={compact} searchRef={searchRef}>
              <SearchPanel open={panelOpen} typed={typed} showResults={showResults} hover={resultHover} resultRef={resultRef} loop={loop} />
            </TopBar>

            <div className="relative min-h-0 flex-1">
              <DashboardView active={view === "dashboard"} compact={compact} loop={loop} />
              <ProfileView active={view === "profile"} compact={compact} />
            </div>
          </div>
        </div>

        <MouseCursor x={cursor.x} y={cursor.y} visible={cursor.visible} clicking={cursor.clicking} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ chrome */

const sideNav: { label: string; icon: LucideIcon; more?: boolean }[] = [
  { label: "Home", icon: House },
  { label: "Leave & Attendance", icon: CalendarCheck },
  { label: "Inbox", icon: Inbox, more: true },
  { label: "My Team", icon: Users },
  { label: "My Finance", icon: HandCoins },
  { label: "Organization", icon: Network },
  { label: "Performance", icon: Activity },
  { label: "Project Management", icon: BriefcaseBusiness },
  { label: "Time & Attendance", icon: CalendarClock },
  { label: "Interviews", icon: Monitor },
  { label: "Payroll", icon: Banknote },
  { label: "User", icon: UsersRound },
  { label: "Account", icon: CircleUser, more: true },
  { label: "Apps", icon: LayoutGrid },
  { label: "Clients", icon: MonitorSmartphone, more: true },
];

function Sidebar({ active }: { active: string | null }) {
  return (
    <aside className="flex w-[168px] shrink-0 flex-col bg-white shadow-[2px_0_8px_rgba(47,43,61,0.06)]">
      <div className="px-4 pt-2.5 pb-4">
        <Image src={assets.brand.logo} alt="" width={246} height={55} className="h-[30px] w-auto" />
      </div>
      {sideNav.map(({ label, icon: Icon, more }) => (
        <div
          key={label}
          className={cn(
            "flex h-[34px] shrink-0 items-center gap-2.5 px-4 text-[10.5px] transition-colors duration-300",
            label === active ? "bg-[#7367f0] font-medium text-white" : "text-[#4b465c]"
          )}
        >
          <Icon className="size-[13px] shrink-0" strokeWidth={1.75} />
          {label}
          {more && <ChevronRight className="ml-auto size-3" />}
        </div>
      ))}
    </aside>
  );
}

function TopBar({ compact, searchRef, children }: { compact: boolean; searchRef: RefObject<HTMLDivElement | null>; children: ReactNode }) {
  return (
    <header className="relative z-20 flex h-10 shrink-0 items-center gap-4 rounded-lg bg-white px-4 shadow-[0_2px_6px_rgba(47,43,61,0.06)]">
      {!compact && (
        <p className="flex w-[170px] shrink-0 items-center gap-2 text-[12px] font-medium tracking-[0.06em] text-[#7367f0]">
          QLORON PVT LTD <Settings className="size-3" />
        </p>
      )}
      <div ref={searchRef} className="relative h-[30px] max-w-[414px] flex-1">
        <div className="flex h-full items-center gap-2 rounded-md border border-[#dbdade] bg-[#f3f3f4] px-2.5 text-[9.5px] text-[#a5a3ae]">
          <Search className="size-3.5 text-[#6f6b7d]" />
          Search (Ctrl+/)
        </div>
        {children}
      </div>
      <div className="ml-auto flex items-center gap-3.5 text-[#4b465c]">
        <Moon className="size-[15px]" strokeWidth={1.75} />
        <LayoutGrid className="size-[15px]" strokeWidth={1.75} />
        <span className="relative">
          <Bell className="size-[15px]" strokeWidth={1.75} />
          <span className="absolute -top-px right-0 size-1.5 rounded-full bg-[#ea5455]" />
        </span>
        <Avatar src="me" size={24} status />
      </div>
    </header>
  );
}

function Avatar({ src, size, status, className }: { src: string; size: number; status?: boolean; className?: string }) {
  return (
    <span className={cn("relative block shrink-0", className)} style={{ width: size, height: size }}>
      <Image src={`${IMG}/${src}.jpg`} alt="" width={size * 2} height={size * 2} className="size-full rounded-full object-cover" />
      {status && <span className="absolute right-0 bottom-0 size-[28%] rounded-full border border-white bg-[#28c76f]" />}
    </span>
  );
}

function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("overflow-hidden rounded-lg bg-white p-3.5 shadow-[0_2px_6px_rgba(47,43,61,0.05)]", className)}>{children}</div>;
}

function CardTitle({ title, action }: { title: string; action?: "open" | "view" | "calendar" }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-[12px] font-semibold text-[#2f2b3d]">{title}</p>
      {action === "open" && <SquareArrowOutUpRight className="size-3 text-[#7367f0]" />}
      {(action === "view" || action === "calendar") && (
        <span className="flex items-center gap-0.5 text-[8.5px] text-[#7367f0]">
          {action === "view" ? "View All" : "View Calendar"} <ChevronDown className="size-2.5" />
        </span>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ global search */

const employees = [
  {
    name: "John Smith",
    role: "Front-End Developer · Software Development",
    id: "QT00N001",
    email: "john.smith@qloron.com",
    phone: "9210439210",
    city: "Pune",
    img: "john-smith",
  },
  {
    name: "John Sharma",
    role: "React Native Developer · Software Development",
    id: "QT00N002",
    email: "john.sharma@qloron.com",
    phone: "7821092314",
    city: "Pune",
    img: "john-sharma",
  },
  {
    name: "John Sheikh",
    role: "Software Tester · Testing",
    id: "QT00N003",
    email: "john.sheikh@qloron.com",
    phone: "8804987543",
    city: "Bangalore",
    img: "john-sheikh",
  },
];

const quickActions: { title: string; text: string; icon: LucideIcon; tone: string }[] = [
  { title: "Web Clock-In", text: "Log work hours by clocking in.", icon: CalendarClock, tone: "bg-[#fff1e3] text-[#ff9f43]" },
  { title: "Web Clock-out", text: "Log work hours by clocking out.", icon: ArrowRight, tone: "bg-[#d9f8fc] text-[#00bad1]" },
  { title: "Attendance", text: "View & manage attendance.", icon: CalendarCheck, tone: "bg-[#dff7e9] text-[#28c76f]" },
  { title: "Apply Leave", text: "Request for time-off.", icon: FileText, tone: "bg-[#fbe3fb] text-[#d63bd6]" },
  { title: "Payslips", text: "View & download your payslips.", icon: ReceiptText, tone: "bg-[#e1efff] text-[#3b82f6]" },
  { title: "Leaves", text: "View leave summary.", icon: ArrowUpDown, tone: "bg-[#eae8fd] text-[#7367f0]" },
];

function SearchPanel({
  open,
  typed,
  showResults,
  hover,
  resultRef,
  loop,
}: {
  open: boolean;
  typed: string;
  showResults: boolean;
  hover: boolean;
  resultRef: RefObject<HTMLDivElement | null>;
  loop: number;
}) {
  return (
    <div
      className={cn(
        "absolute top-0 left-0 w-full min-w-[300px] origin-top overflow-hidden rounded-md border border-[#dbdade] bg-white shadow-[0_12px_32px_rgba(47,43,61,0.18)] transition-all duration-300",
        open ? "scale-100 opacity-100" : "pointer-events-none scale-[0.97] opacity-0"
      )}
    >
      <div className="flex h-[30px] items-center gap-2 border-b border-[#dbdade] bg-[#f3f3f4] px-2.5 text-[10px]">
        <Search className="size-3.5 text-[#6f6b7d]" />
        <span className="text-[#4b465c]">
          {typed}
          <span className="ml-px inline-block h-[1.1em] w-px animate-pulse bg-[#4b465c] align-middle" />
        </span>
        <X className="ml-auto size-3.5 text-[#4b465c]" />
      </div>

      {/* Employees — drops in once the query matches. */}
      <div className={cn("grid transition-[grid-template-rows] duration-500 ease-out", showResults ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
        <div className="min-h-0 overflow-hidden">
          <div className="px-3 pt-3 pb-2">
            <p className="text-[11px] font-semibold text-[#2f2b3d]">Employees</p>
            <div className="mt-2 flex flex-col gap-1">
              {employees.map((e, i) => (
                <div
                  key={`${e.id}-${loop}-${showResults}`}
                  ref={i === 0 ? resultRef : undefined}
                  className={cn(
                    "flex items-center gap-2.5 rounded-md px-2 py-1.5 transition-colors duration-200",
                    showResults && "animate-[hl-rise_450ms_ease-out_both]",
                    i === 0 && hover && "bg-[#ecebfd]"
                  )}
                  style={{ animationDelay: `${i * 110}ms` }}
                >
                  <Avatar src={e.img} size={28} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[10.5px] font-semibold text-[#4b465c]">
                      {e.name}{" "}
                      <span className="ml-1 text-[7.5px] font-medium text-[#6f6b7d]">
                        {e.role} | <span className="text-[#7367f0]">#{e.id}</span>
                      </span>
                    </p>
                    <p className="mt-0.5 flex items-center gap-2 truncate text-[7.5px] text-[#6f6b7d]">
                      <span className="flex items-center gap-0.5">
                        <Mail className="size-2.5" /> {e.email}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <Phone className="size-2.5" /> {e.phone}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <MapPin className="size-2.5" /> {e.city}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mx-3 border-t border-[#dbdade]" />
        </div>
      </div>

      <div className="px-3 pt-3 pb-3">
        <p className="text-[11px] font-semibold text-[#2f2b3d]">Quick Actions</p>
        <div className="mt-2 flex flex-col gap-2.5">
          {quickActions.map(({ title, text, icon: Icon, tone }) => (
            <div key={title} className="flex items-center gap-2.5">
              <span className={cn("flex size-[22px] shrink-0 items-center justify-center rounded-md", tone)}>
                <Icon className="size-3" />
              </span>
              <span>
                <span className="block text-[9.5px] font-semibold text-[#2f2b3d]">{title}</span>
                <span className="block text-[8.5px] text-[#6f6b7d]">{text}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ dashboard */

const attendanceStats: { label: string; value: string; icon: LucideIcon; tone: string }[] = [
  { label: "Present Days", value: "20", icon: House, tone: "bg-[#eae8fd] text-[#7367f0]" },
  { label: "Leaves Taken", value: "2", icon: House, tone: "bg-[#dff7e9] text-[#28c76f]" },
  { label: "Late Arrivals", value: "1", icon: Timer, tone: "bg-[#fff1e3] text-[#ff9f43]" },
  { label: "Absent Days", value: "0", icon: CircleX, tone: "bg-[#fce5e6] text-[#ea5455]" },
];

const trend = [
  { day: "Mon", v: 70 },
  { day: "Tues", v: 85 },
  { day: "Wed", v: 58 },
  { day: "Thu", v: 72 },
  { day: "Fri", v: 100, peak: true },
  { day: "Sat", v: 100, off: true },
  { day: "Sun", v: 100, off: true },
];

const leaves: { label: string; days: string; icon: LucideIcon; tone: string; text: string }[] = [
  { label: "Casual Leave", days: "12 Days", icon: Coffee, tone: "bg-[#eae8fd] text-[#7367f0]", text: "text-[#7367f0]" },
  { label: "Sick Leave", days: "6 Days", icon: Thermometer, tone: "bg-[#dff7e9] text-[#28c76f]", text: "text-[#28c76f]" },
  { label: "Earned Leave", days: "8 Days", icon: Gift, tone: "bg-[#fbe3fb] text-[#d63bd6]", text: "text-[#d63bd6]" },
  { label: "Comp Off", days: "2 Days", icon: BriefcaseBusiness, tone: "bg-[#fff1e3] text-[#ff9f43]", text: "text-[#ff9f43]" },
];

const managers = [
  { name: "Avinash Kumar", role: "Operations Manager", level: "Level 1", tone: "bg-[#fdc26b]", img: "avinash" },
  { name: "Shruti Rao", role: "Marketing & Sales Manager", level: "Level 2", tone: "bg-[#f7768c]", img: "shruti" },
  { name: "Mayank Agarwal", role: "Financial & Accounting Manager", level: "Level 3", tone: "bg-[#5aa7f5]", img: "mayank" },
];

function DashboardView({ active, compact, loop }: { active: boolean; compact: boolean; loop: number }) {
  return (
    <div
      className={cn(
        "absolute inset-0 grid auto-rows-min gap-2.5 transition-all duration-500",
        compact ? "grid-cols-2" : "grid-cols-3",
        active ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
      )}
    >
      {/* Attendance */}
      <Card className="col-span-2 h-[210px]">
        <CardTitle title="Attendance" action="open" />
        <div className="mt-3 flex gap-3">
          <div className="flex w-[118px] shrink-0 flex-col items-center">
            <div className="flex size-[84px] flex-col items-center justify-center rounded-full border-[9px] border-[#b7b0f7]">
              <span className="text-[11px] font-bold text-[#2f2b3d]">00:00:00</span>
              <span className="text-[7px] text-[#6f6b7d]">Hrs:Min:Sec</span>
            </div>
            <p className="mt-2.5 text-[10px] font-semibold text-[#2f2b3d]">Not Clocked In</p>
            <p className="text-[8px] text-[#6f6b7d]">Wed, 11th Mar 2024</p>
            <span className="mt-2 rounded-md bg-[#7367f0] px-4 py-1.5 text-[9.5px] font-medium text-white">Clock In</span>
          </div>

          <div className="flex w-[84px] shrink-0 flex-col gap-1.5">
            {attendanceStats.map(({ label, value, icon: Icon, tone }) => (
              <div key={label} className="flex h-[35px] items-center gap-1.5 rounded-md border border-[#e6e5ea] px-1.5">
                <span className={cn("flex size-[18px] shrink-0 items-center justify-center rounded", tone)}>
                  <Icon className="size-2.5" />
                </span>
                <span>
                  <span className="block text-[6.5px] text-[#6f6b7d]">{label}</span>
                  <span className="block text-[9px] font-bold text-[#2f2b3d]">{value}</span>
                </span>
              </div>
            ))}
          </div>

          <div className="w-px shrink-0 self-stretch bg-[#e6e5ea]" />

          <div className="flex min-w-0 flex-1 flex-col rounded-md border border-[#e6e5ea] px-3 pt-2 pb-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[8.5px] font-medium text-[#4b465c]">Daily Attendance Trend</span>
              <span className="flex items-center gap-0.5 rounded border border-[#7367f0] px-1 py-px text-[7px] text-[#7367f0]">
                This Month <ChevronDown className="size-2" />
              </span>
            </div>
            <div className="mt-2 flex min-h-0 flex-1 gap-1.5">
              <div className="flex flex-col justify-between pb-3.5 text-[6.5px] text-[#6f6b7d]">
                <span>100%</span>
                <span>50%</span>
                <span>0%</span>
              </div>
              <div key={loop} className="flex flex-1 items-end justify-around border-b border-l border-[#e6e5ea] pb-0">
                {trend.map(({ day, v, peak, off }, i) => (
                  <div key={day} className="relative flex h-full w-[14%] flex-col items-center justify-end">
                    <div
                      className={cn("w-[62%] origin-bottom animate-[hl-grow_700ms_ease-out_both]", off ? "bg-[#dcd8fb]" : "bg-[#7367f0]")}
                      style={{ height: `${v}%`, animationDelay: `${150 + i * 80}ms` }}
                    />
                    {peak && (
                      <span className="absolute -top-3.5 rounded bg-[#7367f0] px-1 text-[6.5px] font-medium text-white">100%</span>
                    )}
                    <span className="absolute -bottom-3 text-[6.5px] text-[#4b465c]">{day}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-3" />
          </div>
        </div>
      </Card>

      {/* User Profile */}
      <Card className="h-[210px] bg-[#ebe9f8]">
        <CardTitle title="User Profile" action="open" />
        <div className="mt-3.5 flex items-center gap-3">
          <span className="relative size-[60px] shrink-0">
            <svg viewBox="0 0 60 60" className="absolute inset-0 size-full -rotate-12">
              <circle cx="30" cy="30" r="28" fill="none" stroke="#7367f0" strokeWidth="2" strokeDasharray="60 36 60 20" strokeLinecap="round" />
            </svg>
            <Image src={`${IMG}/devil.jpg`} alt="" width={112} height={112} className="absolute inset-[5px] size-[50px] rounded-full object-cover" />
          </span>
          <span>
            <span className="block text-[14px] font-semibold text-[#2f2b3d]">Devil Singh</span>
            <span className="block text-[9.5px] text-[#6f6b7d]">Software Department</span>
          </span>
        </div>
        <div className="mt-4 grid grid-cols-[1.2fr_1fr] gap-x-2 gap-y-3.5">
          <Info icon={IdCard} label="Employee ID" value="QT00N001" tile="bg-[#dcd8f5]" />
          <Info icon={CalendarDays} label="Joining Date" value="29 Aug, 2026" tile="bg-[#dcd8f5]" />
          <Info icon={Mail} label="Email" value="john.smith@qloron.com" tile="bg-[#dcd8f5]" />
          <Info icon={Phone} label="Mobile No." value="+91 9210439210" tile="bg-[#dcd8f5]" />
        </div>
      </Card>

      {/* Leave Balance */}
      <Card className="h-[192px]">
        <CardTitle title="Leave Balance" action="open" />
        <div className="mt-2">
          {leaves.map(({ label, days, icon: Icon, tone, text }) => (
            <div key={label} className="flex h-[28px] items-center gap-2 border-b border-[#efeff1]">
              <span className={cn("flex size-4 items-center justify-center rounded", tone)}>
                <Icon className="size-2.5" />
              </span>
              <span className="text-[9px] font-semibold text-[#2f2b3d]">{label}</span>
              <span className={cn("ml-auto text-[8.5px] font-medium", text)}>{days}</span>
            </div>
          ))}
        </div>
        <div className="mt-2.5 flex h-[27px] items-center justify-center gap-1.5 rounded-md bg-[#7367f0] text-[9.5px] font-medium text-white">
          <CalendarDays className="size-3" /> Apply Leave
        </div>
      </Card>

      {/* Upcoming Holidays */}
      <Card className="h-[192px]">
        <CardTitle title="Upcoming Holidays" action="view" />
        <div className="mt-2.5 flex items-center gap-1.5">
          <ChevronLeft className="size-3 shrink-0 text-[#7367f0]" />
          <Image src={`${IMG}/diwali.jpg`} alt="" width={636} height={306} className="h-auto min-w-0 flex-1 rounded-md" />
          <ChevronRight className="size-3 shrink-0 text-[#7367f0]" />
        </div>
        <p className="mt-2 text-center text-[12px] font-semibold text-[#7367f0]">Diwali</p>
        <p className="text-center text-[8.5px] text-[#6f6b7d]">Friday 3 March, 2025</p>
      </Card>

      {/* Reporting Manager */}
      <Card className="h-[192px]">
        <CardTitle title="Reporting Manager" action="view" />
        <div className="mt-3 flex flex-col gap-3">
          {managers.map((m) => (
            <div key={m.name} className="flex items-center gap-2">
              <Avatar src={m.img} size={34} />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[10px] font-medium text-[#7367f0]">{m.name}</span>
                <span className="block truncate text-[7px] text-[#4b465c]">{m.role}</span>
              </span>
              <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[6.5px] font-medium text-white", m.tone)}>{m.level}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Row 3 — cropped by the canvas, as in a screenshot. */}
      <Card className="h-[192px]">
        <CardTitle title="Today's Schedule" action="calendar" />
        <ScheduleRow icon={Clock} tone="bg-[#eae8fd] text-[#7367f0]" title="Working Hours" time="09:30 AM - 06:30 PM" />
        <ScheduleRow icon={Users} tone="bg-[#dff7e9] text-[#28c76f]" title="Team Stand-up" time="10:00 AM - 10:30 AM" />
      </Card>
      <Card className="h-[192px]">
        <CardTitle title="Company Announcements" action="view" />
        <ScheduleRow icon={Megaphone} tone="bg-[#eae8fd] text-[#7367f0]" title="New Leave Policy Released" time="31 May, 2025" />
        <ScheduleRow icon={Megaphone} tone="bg-[#eae8fd] text-[#7367f0]" title="Monthly Townhall This Friday" time="16 Mar, 2025" />
      </Card>
      <Card className="h-[192px]">
        <CardTitle title="On Leave Today" action="view" />
        <div className="mt-3 flex items-center gap-2">
          <Avatar src="avinash" size={34} />
          <span className="flex-1">
            <span className="block text-[10px] font-medium text-[#7367f0]">Avinash Kumar</span>
            <span className="block text-[7px] text-[#4b465c]">QT00N01</span>
          </span>
          <span className="rounded bg-[#e1efff] px-1.5 py-0.5 text-[6.5px] text-[#3b82f6]">Casual Leave</span>
        </div>
      </Card>
    </div>
  );
}

function Info({ icon: Icon, label, value, tile }: { icon: LucideIcon; label: string; value: string; tile: string }) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <span className={cn("flex size-[22px] shrink-0 items-center justify-center rounded-full text-[#7367f0]", tile)}>
        <Icon className="size-3" strokeWidth={1.75} />
      </span>
      <span className="min-w-0">
        <span className="block text-[8px] text-[#6f6b7d]">{label}</span>
        <span className="block truncate text-[8.5px] font-semibold text-[#2f2b3d]">{value}</span>
      </span>
    </div>
  );
}

function ScheduleRow({ icon: Icon, tone, title, time }: { icon: LucideIcon; tone: string; title: string; time: string }) {
  return (
    <div className="mt-3 flex items-center gap-2.5">
      <span className={cn("flex size-[22px] items-center justify-center rounded-md", tone)}>
        <Icon className="size-3" />
      </span>
      <span>
        <span className="block text-[9px] font-semibold text-[#2f2b3d]">{title}</span>
        <span className="block text-[8px] text-[#6f6b7d]">{time}</span>
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ profile */

const profileInfo: { icon: LucideIcon; label: string; value: string }[] = [
  { icon: IdCard, label: "Employee ID", value: "QT00N001" },
  { icon: Mail, label: "Email", value: "john.smith@qloron.com" },
  { icon: Building2, label: "Business Unit", value: "Qloron Technology" },
  { icon: Phone, label: "Mobile No.", value: "+91 9210439210" },
  { icon: Network, label: "Department", value: "Software Development" },
  { icon: CalendarDays, label: "Joining Date", value: "29 Aug, 2026" },
];

const tabs: { label: string; icon: LucideIcon }[] = [
  { label: "About", icon: UserRound },
  { label: "Profile", icon: CircleUser },
  { label: "Job", icon: Briefcase },
  { label: "Claim", icon: Receipt },
  { label: "Documents", icon: FolderOpen },
  { label: "Assets", icon: Laptop },
  { label: "ID Card", icon: IdCard },
  { label: "Payment Slip", icon: ReceiptText },
];

const skills = ["Java", "React.js", "MySQL", "Next.js", "Python", "HTML", "CSS"];

const personal: { icon: LucideIcon; label: string; value: string }[] = [
  { icon: Cake, label: "Date of Birth", value: "14 Jan, 1998" },
  { icon: Mars, label: "Gender", value: "Male" },
  { icon: Droplet, label: "Blood Group", value: "O+" },
  { icon: Flag, label: "Nationality", value: "Indian" },
  { icon: Heart, label: "Marital Status", value: "Single" },
  { icon: Globe, label: "Languages Known", value: "English, Hindi, Marathi" },
  { icon: UserRound, label: "Father's Name", value: "Amey Smith" },
];

/** Staggered entrance for each profile section. */
function reveal(active: boolean, delay: number) {
  return {
    className: cn("transition-all duration-500 ease-out", active ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"),
    style: { transitionDelay: active ? `${delay}ms` : "0ms" },
  };
}

function ProfileView({ active, compact }: { active: boolean; compact: boolean }) {
  const banner = reveal(active, 0);
  const info = reveal(active, 120);
  const tabBar = reveal(active, 240);
  const body = reveal(active, 340);

  return (
    <div className={cn("absolute inset-0 flex flex-col", !active && "pointer-events-none")}>
      <div className={cn(banner.className, "rounded-t-lg")} style={banner.style}>
        {/* Banner */}
        <div className="relative flex h-[121px] items-center gap-5 overflow-hidden rounded-t-lg bg-[linear-gradient(90deg,#7065ef_0%,#877df3_55%,#a39af8_100%)] px-7">
          <span className="relative size-[96px] shrink-0 rounded-xl border-2 border-white">
            <Image src={`${IMG}/john-smith.jpg`} alt="" width={192} height={192} className="size-full rounded-[10px] object-cover" />
            <span className="absolute -right-1.5 -bottom-1.5 size-[18px] rounded-full border-[3px] border-white bg-[#28c76f]" />
          </span>
          <div className="relative z-10 text-white">
            <p className="text-[17px] font-semibold">John Smith</p>
            <p className="mt-1.5 text-[10px]">
              Front - End Developer <span className="ml-4">•&nbsp; Software Developer</span>
            </p>
            <div className="mt-2.5 flex gap-2">
              <Chip icon={CircleDashed} label="Status - On Client Project" />
              <Chip icon={House} label="WFH Today" />
              {!compact && <Chip icon={MapPin} label="Pune, Maharashtra, India" />}
            </div>
          </div>
          {!compact && (
            <Image
              src={`${IMG}/banner-art.jpg`}
              alt=""
              width={824}
              height={368}
              className="absolute top-0 right-0 h-full w-auto [mask-image:linear-gradient(90deg,transparent,black_18%)]"
            />
          )}
        </div>
      </div>

      {/* Key info + reporting manager */}
      <div className={cn(info.className, "flex h-[134px] items-center gap-4 rounded-b-lg bg-white px-4 shadow-[0_2px_6px_rgba(47,43,61,0.05)]")} style={info.style}>
        <div className="grid flex-1 grid-flow-col grid-cols-3 grid-rows-2 gap-x-3 gap-y-5">
          {profileInfo.map((p) => (
            <Info key={p.label} icon={p.icon} label={p.label} value={p.value} tile="bg-[#eceafd]" />
          ))}
        </div>
        {!compact && (
          <div className="w-[210px] shrink-0 rounded-2xl border border-[#e6e5ea] px-3.5 py-3">
            <p className="text-[8.5px] text-[#4b465c]">Reporting Manager</p>
            <div className="mt-2 flex items-center gap-2">
              <Avatar src="rohit" size={32} />
              <span className="flex-1">
                <span className="block text-[10.5px] font-semibold text-[#2f2b3d]">Rohit Sharma</span>
                <span className="block text-[7px] text-[#4b465c]">Design Manager</span>
              </span>
              <span className="rounded-full bg-[#fdc26b] px-2 py-0.5 text-[6.5px] font-medium text-white">Level 1</span>
            </div>
            <p className="mt-2.5 flex items-center gap-1 text-[9px] font-medium text-[#7367f0]">
              <Network className="size-3" /> View Reporting Structure
            </p>
          </div>
        )}
        <EllipsisVertical className="size-3.5 self-start mt-4 shrink-0 text-[#4b465c]" />
      </div>

      {/* Tabs */}
      <div
        className={cn(tabBar.className, "mt-3 flex h-9 shrink-0 items-stretch justify-between overflow-hidden rounded-lg bg-white px-3 shadow-[0_2px_6px_rgba(47,43,61,0.05)]")}
        style={tabBar.style}
      >
        {tabs.map(({ label, icon: Icon }, i) => (
          <span
            key={label}
            className={cn(
              "flex shrink-0 items-center gap-1 border-b-2 px-2 text-[9px]",
              i === 0 ? "border-[#7367f0] font-medium text-[#7367f0]" : "border-transparent text-[#4b465c]"
            )}
          >
            <Icon className="size-3" strokeWidth={1.75} /> {label}
          </span>
        ))}
      </div>

      {/* About + Personal information */}
      <div className={cn(body.className, "mt-3 grid min-h-0 flex-1 grid-cols-[1.65fr_1fr] gap-2.5")} style={body.style}>
        <Card className="rounded-b-none">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold text-[#2f2b3d]">
            <Quote className="size-3.5 fill-[#7367f0] text-[#7367f0]" /> About Me
          </p>
          <p className="mt-2 text-[8.5px] leading-[1.7] text-[#4b465c]">
            Creative and detail-oriented UI/UX Designer with a passion for designing intuitive and user friendly digital
            experiences. I love solving problems through design and collaborating with amazing teams. Always eager to learn
            new technologies and improve through challenges and feedback.
          </p>
          <p className="mt-3 text-[10.5px] font-semibold text-[#2f2b3d]">Skills</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s} className="rounded-full bg-[#eceafd] px-3 py-1 text-[8px] text-[#7367f0]">
                {s}
              </span>
            ))}
            <span className="rounded-full border border-[#dbdade] px-2 py-1 text-[8px] text-[#2f2b3d]">+4</span>
          </div>
        </Card>
        <Card className="rounded-b-none">
          <p className="text-[11px] font-semibold text-[#2f2b3d]">Personal Information</p>
          <div className="mt-2 flex flex-col">
            {personal.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex h-[27px] items-center gap-2 text-[8px]">
                <Icon className="size-3 shrink-0 text-[#7367f0]" strokeWidth={1.75} />
                <span className="w-[45%] shrink-0 text-[#4b465c]">{label}</span>
                <span className="truncate font-medium text-[#2f2b3d]">{value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function Chip({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <span className="flex h-[22px] items-center gap-1 rounded-full bg-white/20 px-2.5 text-[8.5px] whitespace-nowrap">
      <Icon className="size-3" /> {label}
    </span>
  );
}
