"use client";

import { useState, type KeyboardEvent } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function EmailTagInput({
  emails,
  onAdd,
  onRemove,
}: {
  emails: string[];
  onAdd: (email: string) => void;
  onRemove: (email: string) => void;
}) {
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);

  const commit = () => {
    const value = draft.trim().toLowerCase();
    if (!value) return;
    if (!emailPattern.test(value)) {
      setError("Enter a valid email address.");
      return;
    }
    if (emails.includes(value)) {
      setError("That email has already been added.");
      return;
    }
    onAdd(value);
    setDraft("");
    setError(null);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      commit();
    } else if (event.key === "Backspace" && !draft && emails.length > 0) {
      onRemove(emails[emails.length - 1]);
    }
  };

  return (
    <div>
      <div
        className={cn(
          "flex min-h-11 w-full flex-wrap items-center gap-2 rounded-lg border bg-white px-3 py-2 focus-within:border-brand-purple focus-within:ring-2 focus-within:ring-brand-purple/30",
          error ? "border-red-400" : "border-brand-border"
        )}
      >
        {emails.map((email) => (
          <span
            key={email}
            className="flex items-center gap-1.5 rounded-full bg-brand-purple-light px-2.5 py-1 text-[13px] font-medium text-brand-purple"
          >
            {email}
            <button
              type="button"
              onClick={() => onRemove(email)}
              aria-label={`Remove ${email}`}
              className="rounded-full p-0.5 hover:bg-brand-purple/15"
            >
              <X className="size-3" aria-hidden />
            </button>
          </span>
        ))}
        <input
          type="email"
          value={draft}
          onChange={(event) => {
            setDraft(event.target.value);
            if (error) setError(null);
          }}
          onKeyDown={onKeyDown}
          onBlur={commit}
          placeholder={emails.length === 0 ? "sai@company.com" : "Add another..."}
          className="h-7 min-w-[10rem] flex-1 bg-transparent text-[14px] text-brand-text outline-none placeholder:text-brand-muted/70"
        />
      </div>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}
