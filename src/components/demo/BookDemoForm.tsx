"use client";

import { useMemo, useRef, useState, type ReactNode } from "react";
import { ArrowRight, ChevronDown, CircleAlert, Globe, Info, LoaderCircle, Mail, RotateCw, ShieldCheck } from "lucide-react";
import { Combobox, Flag } from "@/components/checkout/Combobox";
import { Button } from "@/components/ui/Button";
import { companySizes, demoBookingWindowDays, demoModuleOptions, demoSlotMinutes } from "@/data/bookDemo";
import { defaultPhoneCountry, findPhoneCountry, phoneCountries, phoneError, sanitizePhoneNumber, toE164 } from "@/data/phone";
import type { DemoBookingRequest } from "@/lib/api/demoBookingMappers";
import {
  addDays,
  allTimeZones,
  browserTimeZone,
  formatDay,
  formatSlotTime,
  gmtOffsetLabel,
  timeZoneCity,
  timeZoneLabel,
  todayIn,
  weekday,
} from "@/lib/timezone";
import { cn } from "@/lib/utils";
import { DatePicker } from "./DatePicker";
import { EMAIL_PATTERN, EmailChipsInput } from "./EmailChipsInput";
import { MultiSelect } from "./MultiSelect";
import { useDemoAvailability } from "./useDemoAvailability";
import type { BookDemoState } from "./useBookDemo";

type FieldId = "slot" | "fullName" | "workEmail" | "phone" | "companyName" | "jobTitle" | "companySize";

/** Order errors are checked in = the order the first invalid field gets focus. */
const fieldOrder: FieldId[] = ["slot", "fullName", "workEmail", "phone", "companyName", "jobTitle", "companySize"];

const inputClass =
  "h-11 w-full rounded-lg border bg-white px-4 lg:h-10 short:h-9 text-[15px] text-brand-text outline-none transition-colors placeholder:text-brand-muted/70 hover:border-brand-purple/50 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/30";

/** Tomorrow, or the Monday after if tomorrow is a weekend — the first day most teams can demo. */
function firstBookableDay(timeZone: string) {
  let day = addDays(todayIn(timeZone), 1);
  while (weekday(day) === 0 || weekday(day) === 6) day = addDays(day, 1);
  return day;
}

export function BookDemoForm({
  booking,
  onSubmit,
}: {
  booking: BookDemoState;
  onSubmit: (request: DemoBookingRequest) => Promise<BookDemoState | null>;
}) {
  const [timezone, setTimezone] = useState(browserTimeZone);
  const today = todayIn(timezone);
  const [date, setDate] = useState(() => firstBookableDay(browserTimeZone()));
  const [slot, setSlot] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [phoneCountry, setPhoneCountry] = useState(defaultPhoneCountry);
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [additionalEmails, setAdditionalEmails] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState<Set<FieldId>>(new Set());
  const phoneField = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(false);

  const { state: availability, retry } = useDemoAvailability(date, timezone);
  const slots = useMemo(() => (availability.status === "ready" ? availability.slots : []), [availability]);
  const submitting = booking.phase === "submitting";

  // A slot only counts while it's still offered for the chosen day and zone.
  const selectedSlot = slot && slots.some((s) => s.start === slot) ? slot : null;

  const country = findPhoneCountry(phoneCountry);
  const errors: Partial<Record<FieldId, string>> = {};
  if (!selectedSlot) errors.slot = "Choose a time slot.";
  if (fullName.trim().length < 2) errors.fullName = "Enter your full name.";
  if (!workEmail.trim()) errors.workEmail = "Enter your work email.";
  else if (!EMAIL_PATTERN.test(workEmail.trim())) errors.workEmail = "Enter a valid email address, like you@company.com.";
  const phoneProblem = phoneError(phone, country);
  if (phoneProblem) errors.phone = phoneProblem;
  if (!companyName.trim()) errors.companyName = "Enter your company name.";
  if (!jobTitle.trim()) errors.jobTitle = "Enter your job title or role.";
  if (!companySize) errors.companySize = "Select your company size.";

  const errorFor = (id: FieldId) => (showAll || touched.has(id) ? errors[id] : undefined);
  const touch = (id: FieldId) => setTouched((t) => (t.has(id) ? t : new Set(t).add(id)));

  const timeZoneOptions = useMemo(() => {
    const zones = allTimeZones();
    if (!zones.includes(timezone)) zones.unshift(timezone);
    return zones.map((zone) => ({ value: zone, label: `${timeZoneCity(zone)} — ${timeZoneLabel(zone).replace(/ \(.*\)$/, "")}`, meta: gmtOffsetLabel(zone) }));
    // Computed once; the chosen zone is always in the list.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (submitting) return;
    setShowAll(true);
    const firstInvalid = fieldOrder.find((id) => errors[id]);
    if (firstInvalid) {
      const target = document.getElementById(firstInvalid === "slot" ? "demo-slots" : `demo-${firstInvalid}`);
      target?.focus();
      target?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }
    const outcome = await onSubmit({
      date,
      timezone,
      slotStart: selectedSlot!,
      fullName: fullName.trim(),
      workEmail: workEmail.trim().toLowerCase(),
      phoneNumber: toE164(phone, country),
      phoneCountry: country.code,
      companyName: companyName.trim(),
      jobTitle: jobTitle.trim(),
      companySize,
      additionalEmails,
      interestedModules: interests,
      message: message.trim(),
    });
    // Someone booked that slot first: reload the day's slots so the choice can be made again.
    if (outcome?.phase === "error" && outcome.slotTaken) {
      setSlot(null);
      retry();
    }
  };

  return (
    <form noValidate onSubmit={submit} className="flex flex-col lg:flex-1" aria-busy={submitting}>
      {/* Date + time zone */}
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:gap-5">
        <Field id="demo-date" label="Date" required>
          <DatePicker
            id="demo-date"
            value={date}
            min={today}
            max={addDays(today, demoBookingWindowDays)}
            onChange={(day) => {
              setDate(day);
              setSlot(null);
            }}
          />
        </Field>
        <Field id="demo-timezone" label="Timezone">
          <Combobox
            id="demo-timezone"
            portal
            value={timezone}
            options={timeZoneOptions}
            onChange={(zone) => {
              setTimezone(zone);
              setSlot(null);
            }}
            searchPlaceholder="Search city or time zone"
            className="w-full"
            popoverClassName="w-[24rem]"
            triggerClassName="h-11 w-full gap-3 lg:h-10 short:h-9 rounded-lg border border-brand-border bg-white px-3.5 text-left text-[15px] text-brand-text hover:border-brand-purple/50 focus-visible:border-brand-purple focus-visible:ring-2 focus-visible:ring-brand-purple/30 aria-expanded:border-brand-purple aria-expanded:ring-2 aria-expanded:ring-brand-purple/30"
            trigger={(_, open) => (
              <>
                <Globe className="size-5 shrink-0 text-brand-purple" aria-hidden />
                <span className="min-w-0 flex-1 truncate">{timeZoneLabel(timezone)}</span>
                <ChevronDown className={cn("size-4 shrink-0 text-brand-text transition-transform", open && "rotate-180")} aria-hidden />
              </>
            )}
          />
        </Field>
      </div>

      {/* Time slots */}
      <fieldset className="mt-5 min-w-0 lg:mt-3.5">
        <legend className="mb-2.5 text-[15px] font-medium text-brand-text lg:mb-1.5 lg:text-sm">
          Available time slots <span className="font-normal text-brand-muted">({demoSlotMinutes} minutes)</span>
        </legend>
        <SlotPicker
          state={availability}
          slots={slots}
          timezone={timezone}
          date={date}
          selected={selectedSlot}
          onSelect={(start) => {
            setSlot(start);
            touch("slot");
          }}
          onRetry={retry}
          onNextDay={() => {
            setDate((d) => addDays(d, 1));
            setSlot(null);
          }}
          canGoNext={date < addDays(today, demoBookingWindowDays)}
          error={errorFor("slot")}
        />
      </fieldset>

      <hr className="my-5 border-brand-border lg:my-3 short:my-2.5" />

      {/* Personal details */}
      <div className="grid gap-x-6 gap-y-3.5 sm:grid-cols-2 lg:gap-x-5 lg:gap-y-2.5 xl:grid-cols-3">
        <Field id="demo-fullName" label="Full Name" required error={errorFor("fullName")}>
          <input
            id="demo-fullName"
            autoComplete="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            onBlur={() => touch("fullName")}
            placeholder="John Doe"
            className={cn(inputClass, errorFor("fullName") ? "border-red-400" : "border-brand-border")}
            {...describe("demo-fullName", errorFor("fullName"))}
          />
        </Field>
        <Field id="demo-workEmail" label="Work Email" required error={errorFor("workEmail")}>
          <input
            id="demo-workEmail"
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            value={workEmail}
            onChange={(e) => setWorkEmail(e.target.value)}
            onBlur={() => touch("workEmail")}
            placeholder="you@company.com"
            className={cn(inputClass, errorFor("workEmail") ? "border-red-400" : "border-brand-border")}
            {...describe("demo-workEmail", errorFor("workEmail"))}
          />
        </Field>
        <Field id="demo-phone" label="Phone Number" required error={errorFor("phone")}>
          <div
            ref={phoneField}
            className={cn(
              "flex h-11 w-full rounded-lg border bg-white transition-colors lg:h-10 short:h-9 hover:border-brand-purple/50 focus-within:border-brand-purple focus-within:ring-2 focus-within:ring-brand-purple/30",
              errorFor("phone") ? "border-red-400" : "border-brand-border"
            )}
          >
            <Combobox
              portal
              positionAnchorRef={phoneField}
              ariaLabel="Country code"
              value={country.code}
              options={phoneCountries.map((c) => ({ value: c.code, label: c.name, flag: c.code, meta: `+${c.dial}` }))}
              onChange={(code) => {
                const next = findPhoneCountry(code);
                setPhoneCountry(next.code);
                setPhone((p) => sanitizePhoneNumber(p, next)); // re-fit the typed number to the new country
              }}
              searchPlaceholder="Search country or code"
              className="h-full shrink-0"
              triggerClassName="h-full gap-2 rounded-l-lg pr-2 pl-3.5 hover:bg-brand-purple-light/50 focus-visible:bg-brand-purple-light/60"
              trigger={(_, open) => (
                <>
                  <Flag code={country.code} />
                  <ChevronDown className={cn("size-3.5 text-brand-text transition-transform", open && "rotate-180")} aria-hidden />
                </>
              )}
            />
            <span className="flex items-center pr-3 pl-2 text-[15px] font-medium text-brand-text tabular-nums" aria-hidden>
              +{country.dial}
            </span>
            <input
              id="demo-phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              maxLength={country.max}
              value={phone}
              onChange={(e) => setPhone(sanitizePhoneNumber(e.target.value, country))}
              onPaste={(e) => {
                // "+91 70200 38436" or "07911 123456": strip the code / trunk 0 before the length cap.
                e.preventDefault();
                setPhone(sanitizePhoneNumber(e.clipboardData.getData("text"), country));
              }}
              onBlur={() => touch("phone")}
              placeholder={country.code === "IN" ? "98765 43210" : country.min === country.max ? `${country.max}-digit number` : "Phone number"}
              aria-label={`Phone number, ${country.name} +${country.dial}`}
              className="min-w-0 flex-1 rounded-r-lg bg-transparent pr-3 text-[15px] tracking-wide text-brand-text outline-none placeholder:tracking-normal placeholder:text-brand-muted/70"
              {...describe("demo-phone", errorFor("phone"))}
            />
          </div>
        </Field>
        <Field id="demo-companyName" label="Company Name" required error={errorFor("companyName")}>
          <input
            id="demo-companyName"
            autoComplete="organization"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            onBlur={() => touch("companyName")}
            placeholder="Your company name"
            className={cn(inputClass, errorFor("companyName") ? "border-red-400" : "border-brand-border")}
            {...describe("demo-companyName", errorFor("companyName"))}
          />
        </Field>
        <Field id="demo-jobTitle" label="Job Title / Role" required error={errorFor("jobTitle")}>
          <input
            id="demo-jobTitle"
            autoComplete="organization-title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            onBlur={() => touch("jobTitle")}
            placeholder="e.g. CEO, CTO, Manager"
            className={cn(inputClass, errorFor("jobTitle") ? "border-red-400" : "border-brand-border")}
            {...describe("demo-jobTitle", errorFor("jobTitle"))}
          />
        </Field>
        <Field id="demo-companySize" label="Company Size" required error={errorFor("companySize")}>
          <Combobox
            id="demo-companySize"
            portal
            value={companySize}
            options={companySizes.map((size) => ({ value: size, label: `${size} employees` }))}
            onChange={setCompanySize}
            onClose={() => touch("companySize")}
            placeholder="Select company size"
            searchPlaceholder="Search sizes"
            invalid={!!errorFor("companySize")}
            describedBy={errorFor("companySize") ? "demo-companySize-error" : undefined}
            triggerClassName="h-11 px-4 lg:h-10 short:h-9 hover:border-brand-purple/50 [&>svg]:text-brand-text"
          />
        </Field>
      </div>

      {/* Additional invitees + interests: side by side on desktop */}
      <div className="mt-4 grid gap-4 lg:mt-3 lg:grid-cols-2 lg:gap-5">
        <div className="min-w-0">
          <div className="mb-1.5 flex items-center gap-1.5 lg:mb-1">
            <label htmlFor="demo-additionalEmails" className="text-[15px] font-medium text-brand-text lg:text-sm">
              Additional Email(s) for Invitation <span className="font-normal text-brand-muted">(Optional)</span>
            </label>
            <InfoTip id="demo-additionalEmails-tip">
              Colleagues who should join the demo. Each gets the invitation too — add up to 10.
            </InfoTip>
          </div>
          <EmailChipsInput
            id="demo-additionalEmails"
            emails={additionalEmails}
            onChange={setAdditionalEmails}
            exclude={workEmail}
            describedBy="demo-additionalEmails-tip"
          />
        </div>

        {/* Interested in */}
        <div className="min-w-0">
          <p id="demo-interests-label" className="mb-1.5 text-[15px] font-medium text-brand-text lg:mb-1 lg:text-sm">
            Interested In <span className="font-normal text-brand-muted">(Select one or more)</span>
          </p>
          <MultiSelect
            id="demo-interests"
            labelledBy="demo-interests-label"
            values={interests}
            options={demoModuleOptions}
            onChange={setInterests}
            placeholder="Select modules"
            searchPlaceholder="Search modules"
          />
        </div>
      </div>

      {/* Message */}
      {/* On desktop the message box takes any spare height, so the form has no gap above its footer. */}
      <div className="mt-5 lg:mt-3 lg:flex lg:min-h-0 lg:flex-1 lg:flex-col">
        <label htmlFor="demo-message" className="mb-1.5 block text-[15px] font-medium text-brand-text lg:mb-1 lg:text-sm">
          Message / Requirements <span className="font-normal text-brand-muted">(Optional)</span>
        </label>
        <textarea
          id="demo-message"
          rows={2}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about your business goals or any specific requirements..."
          className="block min-h-[4.75rem] w-full resize-y rounded-lg lg:flex-1 lg:resize-none border border-brand-border bg-white px-4 py-3 lg:min-h-[3rem] lg:py-2 short:min-h-[2.5rem] text-[15px] text-brand-text outline-none transition-colors placeholder:text-brand-muted/70 hover:border-brand-purple/50 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/30"
        />
      </div>

      {booking.phase === "error" && (
        <p role="alert" className="mt-5 lg:mt-3 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
          {booking.message}
        </p>
      )}

      {/* Trust points + submit */}
      <div className="mt-6 flex flex-col-reverse gap-5 lg:mt-auto lg:gap-3 lg:pt-3 xl:flex-row xl:items-center xl:justify-between">
        <ul className="flex flex-wrap items-center gap-x-3 gap-y-2.5 text-[13px] whitespace-nowrap text-brand-muted sm:flex-nowrap">
          <li className="flex items-center gap-2">
            <TrustIcon>
              <ShieldCheck className="size-4" aria-hidden />
            </TrustIcon>
            No credit card required
          </li>
          <li className="flex items-center gap-2 sm:border-l sm:border-brand-border sm:pl-3">
            <TrustIcon>
              <Mail className="size-4" aria-hidden />
            </TrustIcon>
            We&apos;ll confirm your demo by email.
          </li>
        </ul>
        <Button
          type="submit"
          size="lg"
          disabled={submitting}
          aria-disabled={submitting}
          className="w-full shrink-0 rounded-xl lg:h-11 lg:py-0 bg-[linear-gradient(90deg,var(--color-brand-purple),#7c4dff)] px-8 text-[17px] shadow-lg shadow-brand-purple/25 hover:brightness-110 focus-visible:ring-2 focus-visible:ring-brand-purple/40 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-80 disabled:hover:brightness-100 sm:w-auto sm:self-end xl:self-auto"
        >
          {submitting ? (
            <>
              <LoaderCircle className="size-5 animate-spin" aria-hidden /> Booking Demo...
            </>
          ) : (
            <>
              Book My Demo <ArrowRight className="size-5" aria-hidden />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

function SlotPicker({
  state,
  slots,
  timezone,
  date,
  selected,
  onSelect,
  onRetry,
  onNextDay,
  canGoNext,
  error,
}: {
  state: ReturnType<typeof useDemoAvailability>["state"];
  slots: { start: string }[];
  timezone: string;
  date: string;
  selected: string | null;
  onSelect: (start: string) => void;
  onRetry: () => void;
  onNextDay: () => void;
  canGoNext: boolean;
  error?: string;
}) {
  if (state.status === "loading") {
    return (
      <div role="status" className="grid grid-cols-3 gap-2 lg:gap-1.5 sm:grid-cols-4 lg:grid-cols-5">
        <span className="sr-only">Loading available times…</span>
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} aria-hidden className="h-10 animate-pulse lg:h-9 rounded-lg bg-brand-purple-light/70" />
        ))}
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div role="alert" className="flex flex-wrap items-center gap-3 rounded-lg border border-brand-border bg-brand-surface px-4 py-3 text-sm text-brand-muted">
        <CircleAlert className="size-4 shrink-0 text-brand-purple" aria-hidden />
        <span className="min-w-0 flex-1">{state.message}</span>
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 rounded-lg font-semibold text-brand-purple outline-none hover:underline focus-visible:ring-2 focus-visible:ring-brand-purple/40"
        >
          <RotateCw className="size-3.5" aria-hidden /> Try again
        </button>
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <div id="demo-slots" tabIndex={-1} className="flex flex-wrap items-center gap-3 rounded-lg border border-dashed border-brand-border bg-brand-surface px-4 py-3.5 text-sm text-brand-muted outline-none">
        <span className="min-w-0 flex-1">No open slots on {formatDay(date, { weekday: "long", day: "numeric", month: "short" })}. Please pick another date.</span>
        {canGoNext && (
          <button
            type="button"
            onClick={onNextDay}
            className="rounded-lg font-semibold text-brand-purple outline-none hover:underline focus-visible:ring-2 focus-visible:ring-brand-purple/40"
          >
            Next day →
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      <div
        id="demo-slots"
        role="group"
        tabIndex={-1}
        aria-label={`Available times on ${formatDay(date)}`}
        aria-describedby={error ? "demo-slots-error" : undefined}
        className="grid grid-cols-3 gap-2 lg:gap-1.5 outline-none sm:grid-cols-4 lg:grid-cols-5"
      >
        {slots.map(({ start }) => {
          const active = start === selected;
          return (
            <button
              key={start}
              type="button"
              aria-pressed={active}
              onClick={() => onSelect(start)}
              className={cn(
                "h-10 rounded-lg border text-sm font-medium lg:h-9 short:h-8 tabular-nums outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand-purple/40 focus-visible:ring-offset-1",
                active
                  ? "border-brand-purple bg-brand-purple text-white shadow-md shadow-brand-purple/25"
                  : "border-brand-border bg-white text-brand-text hover:border-brand-purple/60 hover:bg-brand-purple-light/40",
                error && !active && "border-red-300"
              )}
            >
              {formatSlotTime(start, timezone)}
            </button>
          );
        })}
      </div>
      {error && <FieldError id="demo-slots-error">{error}</FieldError>}
    </>
  );
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-1.5 block text-[15px] font-medium text-brand-text lg:mb-1 lg:text-sm">
        {label}
        {required && (
          <span className="text-red-500" aria-hidden>
            {" "}
            *
          </span>
        )}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      {children}
      {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
    </div>
  );
}

function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
      <CircleAlert className="size-3.5 shrink-0" aria-hidden /> {children}
    </p>
  );
}

const describe = (id: string, error?: string) => ({
  "aria-invalid": !!error || undefined,
  "aria-describedby": error ? `${id}-error` : undefined,
});

function TrustIcon({ children }: { children: ReactNode }) {
  return (
    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-purple-light text-brand-purple">{children}</span>
  );
}

/** ⓘ with a tooltip on hover and keyboard focus; the text is also the field's description. */
function InfoTip({ id, children }: { id: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  return (
    <span ref={ref} className="relative inline-flex" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        aria-label="About additional emails"
        aria-describedby={id}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "Escape" && open) {
            e.stopPropagation();
            setOpen(false);
          }
        }}
        className="flex size-5 items-center justify-center rounded-full text-brand-text/80 outline-none hover:text-brand-purple focus-visible:ring-2 focus-visible:ring-brand-purple/40"
      >
        <Info className="size-4" aria-hidden />
      </button>
      <span
        id={id}
        role="tooltip"
        className={cn(
          "absolute right-0 bottom-full z-10 mb-2 w-60 rounded-lg sm:right-auto sm:left-1/2 sm:-translate-x-1/2 bg-brand-navy px-3 py-2 text-xs leading-relaxed text-white shadow-lg transition-opacity",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        {children}
      </span>
    </span>
  );
}
