"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { Check, ChevronDown, Search, X } from "lucide-react";
import { Popover } from "@/components/ui/Popover";
import { cn } from "@/lib/utils";

export interface MultiSelectOption {
  value: string;
  label: string;
  /** Icon image (e.g. a module icon), shown in a tinted tile like ModuleCard. */
  icon?: string;
  /** Tailwind background class for the icon tile. */
  iconBg?: string;
}

/**
 * Pick several options: the choices sit in the field as removable chips, and the list (searchable,
 * checkboxes) opens in a popover. Keyboard: ↑/↓ move, Enter or Space toggle, Esc closes. The list stays
 * open while picking, so several modules can be chosen in one go.
 */
export function MultiSelect({
  id,
  values,
  options,
  onChange,
  placeholder = "Select",
  searchPlaceholder = "Search",
  describedBy,
  labelledBy,
}: {
  id: string;
  values: string[];
  options: MultiSelectOption[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  describedBy?: string;
  labelledBy?: string;
}) {
  const listId = useId();
  const field = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const search = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const q = query.trim().toLowerCase();
  const filtered = q ? options.filter((o) => o.label.toLowerCase().includes(q)) : options;
  const chosen = values.map((v) => options.find((o) => o.value === v)).filter((o): o is MultiSelectOption => !!o);

  // Latest selection, so quick successive toggles (before a re-render) don't overwrite each other.
  const latest = useRef(values);
  useEffect(() => {
    latest.current = values;
  }, [values]);
  const toggle = (value: string) => {
    const current = latest.current;
    const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
    latest.current = next;
    onChange(next);
  };

  const show = () => {
    setQuery("");
    setActive(0);
    setOpen(true);
  };
  const close = (refocus = true) => {
    setOpen(false);
    if (refocus) button.current?.focus();
  };

  useEffect(() => {
    if (open) search.current?.focus({ preventScroll: true });
  }, [open]);

  useEffect(() => {
    if (open) list.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  const onSearchKey = (event: KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => Math.min(filtered.length - 1, i + 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => Math.max(0, i - 1));
    } else if (event.key === "Enter" || (event.key === " " && !query)) {
      event.preventDefault();
      if (filtered[active]) toggle(filtered[active].value);
    } else if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation(); // close the list, not the modal
      close();
    } else if (event.key === "Tab") {
      close();
    }
  };

  return (
    <>
      <div
        ref={field}
        onClick={(e) => e.target === e.currentTarget && (open ? close() : show())}
        className={cn(
          "flex min-h-11 lg:min-h-10 short:min-h-9 short:py-1 w-full cursor-pointer flex-wrap items-center gap-2 rounded-lg border bg-white py-1.5 pr-2 pl-2.5 transition-colors hover:border-brand-purple/50",
          open ? "border-brand-purple ring-2 ring-brand-purple/30" : "border-brand-border"
        )}
      >
        {chosen.map((option) => (
          <span
            key={option.value}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg bg-brand-purple-light py-1 pr-1 text-sm font-semibold text-brand-purple",
              option.icon ? "pl-1.5" : "pl-3"
            )}
          >
            {option.icon && (
              <span className={cn("flex size-5 shrink-0 items-center justify-center rounded-md", option.iconBg ?? "bg-white")}>
                <Image src={option.icon} alt="" width={12} height={12} aria-hidden />
              </span>
            )}
            {option.label}
            <button
              type="button"
              onClick={() => toggle(option.value)}
              aria-label={`Remove ${option.label}`}
              className="flex size-6 items-center justify-center rounded-md outline-none hover:bg-brand-purple/15 focus-visible:ring-2 focus-visible:ring-brand-purple/50"
            >
              <X className="size-3.5" aria-hidden />
            </button>
          </span>
        ))}
        <button
          ref={button}
          id={id}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={open ? listId : undefined}
          aria-labelledby={labelledBy ? `${labelledBy} ${id}` : undefined}
          aria-describedby={describedBy}
          onClick={() => (open ? close() : show())}
          onKeyDown={(e) => {
            if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
              e.preventDefault();
              show();
            }
          }}
          className="flex h-8 min-w-[9rem] lg:h-7 flex-1 items-center gap-2 rounded-md px-1.5 text-left text-[15px] text-brand-muted/80 outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/40"
        >
          <span className="flex-1 truncate">{placeholder}</span>
          <span className="sr-only">{chosen.length ? `, ${chosen.length} selected` : ""}</span>
          <ChevronDown className={cn("size-4 shrink-0 text-brand-text transition-transform", open && "rotate-180")} aria-hidden />
        </button>
      </div>

      {open && (
        <Popover anchorRef={field} onDismiss={() => close(false)}>
          <div className="flex items-center gap-2 border-b border-brand-border px-3">
            <Search className="size-4 shrink-0 text-brand-muted" aria-hidden />
            <input
              ref={search}
              role="combobox"
              aria-expanded
              aria-controls={listId}
              aria-activedescendant={filtered[active] ? `${listId}-${filtered[active].value}` : undefined}
              aria-autocomplete="list"
              aria-label={searchPlaceholder}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              onKeyDown={onSearchKey}
              placeholder={searchPlaceholder}
              className="h-10 min-w-0 flex-1 bg-transparent text-sm text-brand-text outline-none placeholder:text-brand-muted/70"
            />
          </div>
          <ul
            ref={list}
            id={listId}
            role="listbox"
            aria-multiselectable
            aria-label="Modules"
            className="max-h-64 min-h-0 overflow-y-auto overscroll-contain p-1"
          >
            {filtered.length === 0 && <li className="px-3 py-2.5 text-sm text-brand-muted">No matches</li>}
            {filtered.map((option, index) => {
              const selected = values.includes(option.value);
              return (
                <li
                  key={option.value}
                  id={`${listId}-${option.value}`}
                  data-index={index}
                  role="option"
                  aria-selected={selected}
                  onPointerMove={() => setActive(index)}
                  // Keep focus in the search box so typing and arrows keep working after a click.
                  onPointerDown={(e) => e.preventDefault()}
                  onClick={() => toggle(option.value)}
                  className={cn(
                    "flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-brand-text",
                    index === active && "bg-brand-purple-light/70"
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "flex size-4 shrink-0 items-center justify-center rounded border transition-colors",
                      selected ? "border-brand-purple bg-brand-purple text-white" : "border-brand-border bg-white"
                    )}
                  >
                    {selected && <Check className="size-3" strokeWidth={3} />}
                  </span>
                  {option.icon && (
                    <span className={cn("flex size-7 shrink-0 items-center justify-center rounded-lg", option.iconBg ?? "bg-brand-surface")}>
                      <Image src={option.icon} alt="" width={16} height={16} aria-hidden />
                    </span>
                  )}
                  <span className={cn("min-w-0 flex-1 truncate", selected && "font-medium")}>{option.label}</span>
                </li>
              );
            })}
          </ul>
          {values.length > 0 && (
            <div className="flex items-center justify-between border-t border-brand-border px-3 py-2 text-xs">
              <span className="text-brand-muted">{values.length} selected</span>
              <button
                type="button"
                onPointerDown={(e) => e.preventDefault()}
                onClick={() => onChange([])}
                className="rounded font-medium text-brand-purple outline-none hover:underline focus-visible:ring-2 focus-visible:ring-brand-purple/40"
              >
                Clear all
              </button>
            </div>
          )}
        </Popover>
      )}
    </>
  );
}
