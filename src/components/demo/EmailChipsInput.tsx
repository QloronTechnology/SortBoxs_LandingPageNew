"use client";

import { useRef, useState, type ClipboardEvent, type KeyboardEvent } from "react";
import { CircleAlert, X } from "lucide-react";
import { cn } from "@/lib/utils";

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_EMAILS = 10;

/**
 * Several email addresses in one field, each shown as a removable chip. Enter, comma or leaving the
 * field adds what's typed; a pasted list is split; Backspace on an empty field removes the last chip.
 * Invalid and duplicate addresses are refused with a message instead of being added.
 */
export function EmailChipsInput({
  id,
  emails,
  onChange,
  exclude,
  describedBy,
}: {
  id: string;
  emails: string[];
  onChange: (emails: string[]) => void;
  /** Also refused as a duplicate (the attendee's own work email). */
  exclude?: string;
  describedBy?: string;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);

  /** Adds each address in `text`; returns whatever couldn't be added so it stays in the field. */
  const add = (text: string) => {
    const candidates = text.split(/[\s,;]+/).map((s) => s.trim().toLowerCase()).filter(Boolean);
    if (!candidates.length) return "";
    const next = [...emails];
    const rejected: string[] = [];
    let message: string | null = null;
    for (const email of candidates) {
      if (!EMAIL_PATTERN.test(email)) {
        rejected.push(email);
        message = `“${email}” isn't a valid email address.`;
      } else if (next.includes(email) || email === exclude?.trim().toLowerCase()) {
        message = `${email} is already added.`;
      } else if (next.length >= MAX_EMAILS) {
        rejected.push(email);
        message = `You can invite up to ${MAX_EMAILS} people.`;
      } else {
        next.push(email);
      }
    }
    if (next.length !== emails.length) onChange(next);
    setError(message);
    return rejected.join(", ");
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === "," || event.key === ";") {
      event.preventDefault(); // Enter must not submit the form
      if (draft.trim()) setDraft(add(draft));
    } else if (event.key === "Backspace" && !draft && emails.length) {
      onChange(emails.slice(0, -1));
      setError(null);
    }
  };

  const onPaste = (event: ClipboardEvent<HTMLInputElement>) => {
    const text = event.clipboardData.getData("text");
    if (!/[\s,;]/.test(text.trim())) return; // a single address: let it paste normally
    event.preventDefault();
    setDraft(add(`${draft} ${text}`));
  };

  const remove = (email: string) => {
    onChange(emails.filter((e) => e !== email));
    setError(null);
    input.current?.focus();
  };

  const errorId = `${id}-error`;

  return (
    <div>
      <div
        onClick={(e) => e.target === e.currentTarget && input.current?.focus()}
        className={cn(
          "flex min-h-11 lg:min-h-10 short:min-h-9 short:py-1 w-full cursor-text flex-wrap items-center gap-2 rounded-lg border bg-white px-2.5 py-1.5 transition-colors focus-within:border-brand-purple focus-within:ring-2 focus-within:ring-brand-purple/30",
          error ? "border-red-400" : "border-brand-border"
        )}
      >
        {emails.map((email) => (
          <span
            key={email}
            className="inline-flex max-w-full items-center gap-1.5 rounded-lg bg-brand-purple-light py-1 pr-1 pl-3 text-sm font-medium text-brand-text"
          >
            <span className="truncate">{email}</span>
            <button
              type="button"
              onClick={() => remove(email)}
              aria-label={`Remove ${email}`}
              className="flex size-6 shrink-0 items-center justify-center rounded-md text-brand-text/80 outline-none hover:bg-brand-purple/15 hover:text-brand-text focus-visible:ring-2 focus-visible:ring-brand-purple/50"
            >
              <X className="size-3.5" aria-hidden />
            </button>
          </span>
        ))}
        <input
          ref={input}
          id={id}
          type="text"
          inputMode="email"
          spellCheck={false}
          autoComplete="off"
          value={draft}
          onChange={(e) => {
            setDraft(e.target.value);
            if (error) setError(null);
          }}
          onKeyDown={onKeyDown}
          onPaste={onPaste}
          onBlur={() => draft.trim() && setDraft(add(draft))}
          placeholder={emails.length ? "Add another email" : "Enter email and press Enter"}
          aria-invalid={!!error || undefined}
          aria-describedby={[describedBy, error ? errorId : null].filter(Boolean).join(" ") || undefined}
          className="h-8 min-w-[12rem] lg:h-7 flex-1 bg-transparent px-1.5 text-[15px] text-brand-text outline-none placeholder:text-brand-muted/70"
        />
      </div>
      <p id={errorId} role="alert" className={cn("flex items-center gap-1 text-xs text-red-600", error && "mt-1.5")}>
        {error && (
          <>
            <CircleAlert className="size-3.5 shrink-0" aria-hidden /> {error}
          </>
        )}
      </p>
    </div>
  );
}
