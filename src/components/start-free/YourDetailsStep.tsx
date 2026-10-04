"use client";

import { useImperativeHandle, useState, type ReactNode, type Ref } from "react";
import Link from "next/link";
import { ChevronDown, CircleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { routes } from "@/config/routes";
import { companySizeOptions } from "@/data/startFree";
import { findPhoneCountry, phoneCountries, phoneError, sanitizePhoneNumber } from "@/data/phone";
import { Combobox, Flag } from "@/components/checkout/Combobox";
import { useStartFree } from "./StartFreeProvider";
import { EmailTagInput } from "./EmailTagInput";
import { PlanSummaryPanel } from "./PlanSummaryPanel";

/** Lets the drawer's sticky footer validate this step (and reveal its errors) before submitting. */
export interface YourDetailsStepHandle {
  validate: () => boolean;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface Errors {
  [id: string]: string | undefined;
}

function validate(state: ReturnType<typeof useStartFree>["state"]): Errors {
  const errors: Errors = {};
  if (!state.fullName.trim()) errors["sf-name"] = "Enter your full name.";
  if (!state.workEmail.trim()) errors["sf-email"] = "Enter your work email.";
  else if (!emailPattern.test(state.workEmail.trim())) errors["sf-email"] = "Enter a valid email address.";
  const phone = phoneError(state.phone, findPhoneCountry(state.phoneCountry));
  if (phone) errors["sf-phone"] = phone;
  if (!state.jobTitle.trim()) errors["sf-title"] = "Enter your job title.";
  if (!state.companyName.trim()) errors["sf-company"] = "Enter your company name.";
  if (!state.companySize) errors["sf-size"] = "Select your company size.";
  if (!state.termsAccepted) errors["sf-terms"] = "You must accept the Terms of Service and Privacy Policy.";
  return errors;
}

const fieldOrder = ["sf-name", "sf-email", "sf-phone", "sf-title", "sf-company", "sf-size", "sf-terms"];

export function YourDetailsStep({
  onChangeModules,
  ref,
}: {
  onChangeModules: () => void;
  ref?: Ref<YourDetailsStepHandle>;
}) {
  const { state, dispatch } = useStartFree();
  const [touched, setTouched] = useState<Set<string>>(() => new Set());
  const [showAll, setShowAll] = useState(false);

  const errors = validate(state);
  const errorFor = (id: string) => ((showAll || touched.has(id)) && errors[id]) || undefined;
  const touch = (id: string) => setTouched((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
  const setDetails = (patch: Partial<typeof state>) => dispatch({ type: "updateDetails", patch });

  useImperativeHandle(ref, () => ({
    validate: () => {
      const current = validate(state);
      const first = fieldOrder.find((id) => current[id]);
      setShowAll(true);
      if (first) {
        document.getElementById(first)?.scrollIntoView({ behavior: "smooth", block: "center" });
        document.getElementById(first)?.focus({ preventScroll: true });
        return false;
      }
      return true;
    },
  }));

  const country = findPhoneCountry(state.phoneCountry);

  return (
    <div className="flex flex-col gap-6">
        <Section title="Your Information" subtitle="Tell us a little about yourself.">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field id="sf-name" label="Full Name" required error={errorFor("sf-name")}>
              <input
                id="sf-name"
                autoComplete="name"
                value={state.fullName}
                onChange={(e) => setDetails({ fullName: e.target.value })}
                onBlur={() => touch("sf-name")}
                placeholder="Your full name"
                className={inputClass(errorFor("sf-name"))}
              />
            </Field>
            <Field id="sf-email" label="Work Email" required error={errorFor("sf-email")}>
              <input
                id="sf-email"
                type="email"
                autoComplete="email"
                value={state.workEmail}
                onChange={(e) => setDetails({ workEmail: e.target.value })}
                onBlur={() => touch("sf-email")}
                placeholder="you@company.com"
                className={inputClass(errorFor("sf-email"))}
              />
            </Field>
            <Field id="sf-phone" label="Phone Number" required error={errorFor("sf-phone")}>
              <div
                className={cn(
                  "flex h-11 w-full rounded-lg border bg-white focus-within:border-brand-purple focus-within:ring-2 focus-within:ring-brand-purple/30",
                  errorFor("sf-phone") ? "border-red-400" : "border-brand-border"
                )}
              >
                <Combobox
                  ariaLabel="Country code"
                  value={country.code}
                  options={phoneCountries.map((c) => ({ value: c.code, label: c.name, flag: c.code, meta: `+${c.dial}` }))}
                  onChange={(code) => {
                    const next = findPhoneCountry(code);
                    setDetails({ phoneCountry: next.code, phone: sanitizePhoneNumber(state.phone, next) });
                  }}
                  searchPlaceholder="Search country or code"
                  className="h-full shrink-0"
                  popoverClassName="w-72"
                  triggerClassName="h-full gap-1.5 rounded-l-lg border-r border-brand-border bg-[#f7f6fe] pr-2 pl-3 hover:bg-brand-purple-light/60"
                  trigger={(_, open) => (
                    <>
                      <Flag code={country.code} />
                      <span className="text-[15px] font-medium text-brand-text tabular-nums">+{country.dial}</span>
                      <ChevronDown className={cn("size-3.5 text-brand-muted transition-transform", open && "rotate-180")} aria-hidden />
                    </>
                  )}
                />
                <input
                  id="sf-phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  maxLength={country.max}
                  value={state.phone}
                  onChange={(e) => setDetails({ phone: sanitizePhoneNumber(e.target.value, country) })}
                  onBlur={() => touch("sf-phone")}
                  placeholder={country.min === country.max ? `${country.max}-digit number` : "Phone number"}
                  className="min-w-0 flex-1 bg-transparent px-3 text-[15px] tracking-wide text-brand-text outline-none placeholder:tracking-normal placeholder:text-brand-muted/70"
                />
              </div>
            </Field>
            <Field id="sf-title" label="Job Title / Role" required error={errorFor("sf-title")}>
              <input
                id="sf-title"
                autoComplete="organization-title"
                value={state.jobTitle}
                onChange={(e) => setDetails({ jobTitle: e.target.value })}
                onBlur={() => touch("sf-title")}
                placeholder="e.g. Operations Manager"
                className={inputClass(errorFor("sf-title"))}
              />
            </Field>
            <Field id="sf-company" label="Company Name" required error={errorFor("sf-company")}>
              <input
                id="sf-company"
                autoComplete="organization"
                value={state.companyName}
                onChange={(e) => setDetails({ companyName: e.target.value })}
                onBlur={() => touch("sf-company")}
                placeholder="Your company"
                className={inputClass(errorFor("sf-company"))}
              />
            </Field>
            <Field id="sf-size" label="Company Size" required error={errorFor("sf-size")}>
              <div className="relative">
                <select
                  id="sf-size"
                  value={state.companySize}
                  onChange={(e) => setDetails({ companySize: e.target.value })}
                  onBlur={() => touch("sf-size")}
                  className={cn(inputClass(errorFor("sf-size")), "appearance-none pr-9", !state.companySize && "text-brand-muted/70")}
                >
                  <option value="" disabled>
                    Select company size
                  </option>
                  {companySizeOptions.map((option) => (
                    <option key={option} value={option} className="text-brand-text">
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-brand-muted" aria-hidden />
              </div>
            </Field>
          </div>
        </Section>

        <Section title="Invite Team Members" subtitle="Add email addresses of team members you want to invite. They will receive an invitation to join your SortBoxs workspace." optional>
          <EmailTagInput
            emails={state.inviteEmails}
            onAdd={(email) => dispatch({ type: "addInviteEmail", email })}
            onRemove={(email) => dispatch({ type: "removeInviteEmail", email })}
          />
        </Section>

        {/* The right panel here is a visual-only progress trail, so plan details and "Change Modules" live
            on the left at every width instead of only on narrow drawers. */}
        <PlanSummaryPanel onChangeModules={onChangeModules} />

        <label
          htmlFor="sf-terms"
          className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-brand-border bg-white p-4 text-sm text-brand-text"
        >
          <input
            id="sf-terms"
            type="checkbox"
            checked={state.termsAccepted}
            onChange={(e) => {
              dispatch({ type: "setTermsAccepted", accepted: e.target.checked });
              touch("sf-terms");
            }}
            className="mt-0.5 size-4 shrink-0 accent-brand-purple"
          />
          <span>
            I agree to the{" "}
            <Link href={routes.legal.terms} target="_blank" className="font-medium text-brand-purple hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href={routes.legal.privacy} target="_blank" className="font-medium text-brand-purple hover:underline">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        {errorFor("sf-terms") && (
          <p className="-mt-4 flex items-center gap-1 text-xs text-red-600">
            <CircleAlert className="size-3.5 shrink-0" aria-hidden /> {errorFor("sf-terms")}
          </p>
        )}
    </div>
  );
}

function Section({
  title,
  subtitle,
  optional,
  children,
}: {
  title: string;
  subtitle: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-brand-border bg-white p-5 sm:p-6">
      <h2 className="text-lg font-bold text-brand-text">
        {title}
        {optional && <span className="ml-2 text-sm font-normal text-brand-muted">(Optional)</span>}
      </h2>
      <p className="mt-1 text-sm text-brand-muted">{subtitle}</p>
      <div className="mt-4">{children}</div>
    </section>
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
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-brand-text">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
          <CircleAlert className="size-3.5 shrink-0" aria-hidden /> {error}
        </p>
      )}
    </div>
  );
}

const inputClass = (error?: string) =>
  cn(
    "h-11 w-full rounded-lg border bg-white px-3 text-[15px] text-brand-text outline-none placeholder:text-brand-muted/70 focus-visible:border-brand-purple focus-visible:ring-2 focus-visible:ring-brand-purple/30",
    error ? "border-red-400" : "border-brand-border"
  );
