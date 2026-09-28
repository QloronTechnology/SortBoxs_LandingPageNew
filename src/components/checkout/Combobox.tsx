"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Check, ChevronDown, Globe, Search } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Flag image for an ISO country code. Emoji flags (🇮🇳) don't render on Windows — Chrome and Edge show
 * the letters "IN" instead — so flags are SVGs from flagcdn.com. Unknown codes (e.g. "XX" = other
 * country) get a globe.
 */
export function Flag({ code, className }: { code: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (!/^[A-Z]{2}$/.test(code) || code === "XX" || failed) {
    return <Globe className={cn("h-3.5 w-5 shrink-0 text-brand-muted", className)} aria-hidden />;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export, tiny external SVG
    <img
      src={`https://flagcdn.com/${code.toLowerCase()}.svg`}
      alt=""
      width={20}
      height={15}
      loading="lazy"
      onError={() => setFailed(true)}
      className={cn("h-[15px] w-5 shrink-0 rounded-[2px] object-cover ring-1 ring-black/10", className)}
    />
  );
}

export interface ComboOption {
  value: string;
  label: string;
  /** Country code: shows its flag before the label. */
  flag?: string;
  /** Right-aligned extra, e.g. "+91". Also searchable. */
  meta?: string;
}

/**
 * Searchable dropdown that looks the same on every device (a native <select> can't show flag images and
 * renders differently per OS). Keyboard: ↑/↓ to move, Enter to pick, Esc to close, type to filter.
 */
export function Combobox({
  id,
  value,
  options,
  onChange,
  onClose,
  placeholder = "Select",
  searchPlaceholder = "Search",
  ariaLabel,
  invalid,
  describedBy,
  trigger,
  className,
  triggerClassName,
  popoverClassName,
}: {
  id?: string;
  value: string;
  options: ComboOption[];
  onChange: (value: string) => void;
  /** Called whenever the list closes (use it to mark the field touched). */
  onClose?: () => void;
  placeholder?: string;
  searchPlaceholder?: string;
  ariaLabel?: string;
  invalid?: boolean;
  describedBy?: string;
  /** Custom trigger content; defaults to the selected option's flag + label. */
  trigger?: (selected: ComboOption | undefined, open: boolean) => ReactNode;
  className?: string;
  triggerClassName?: string;
  popoverClassName?: string;
}) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [dropUp, setDropUp] = useState(false);

  const selected = options.find((o) => o.value === value);
  const q = query.trim().toLowerCase().replace(/^\+/, "");
  const filtered = q
    ? options.filter((o) => o.label.toLowerCase().includes(q) || o.meta?.replace(/^\+/, "").startsWith(q))
    : options;

  const openList = () => {
    // Open upwards when there isn't room for the list below the trigger.
    const rect = buttonRef.current?.getBoundingClientRect();
    const below = rect ? window.innerHeight - rect.bottom : Infinity;
    setDropUp(!!rect && below < 320 && rect.top > below);
    setQuery("");
    setActive(Math.max(0, options.findIndex((o) => o.value === value)));
    setOpen(true);
  };

  const close = (refocus = true) => {
    setOpen(false);
    if (refocus) buttonRef.current?.focus();
    onClose?.();
  };

  const pick = (option: ComboOption | undefined) => {
    if (option) onChange(option.value);
    close();
  };

  useEffect(() => {
    if (!open) return;
    searchRef.current?.focus({ preventScroll: true });
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close(false);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Keep the highlighted option in view.
  useEffect(() => {
    if (open) listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  const onSearchKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(filtered.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      pick(filtered[active]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation(); // close just the list, not the drawer
      close();
    } else if (e.key === "Tab") {
      close(false);
    }
  };

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        ref={buttonRef}
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-label={ariaLabel}
        aria-describedby={describedBy}
        onClick={() => (open ? close() : openList())}
        onKeyDown={(e) => {
          if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
            e.preventDefault();
            openList();
          }
        }}
        className={cn(
          trigger
            ? "flex items-center outline-none"
            : "flex h-11 w-full items-center gap-2.5 rounded-lg border bg-white px-3 text-left text-[15px] text-brand-text outline-none focus-visible:border-brand-purple focus-visible:ring-2 focus-visible:ring-brand-purple/30",
          !trigger && (invalid ? "border-red-400" : open ? "border-brand-purple ring-2 ring-brand-purple/30" : "border-brand-border"),
          triggerClassName
        )}
      >
        {trigger ? (
          trigger(selected, open)
        ) : (
          <>
            {selected?.flag && <Flag code={selected.flag} />}
            <span className={cn("min-w-0 flex-1 truncate", !selected && "text-brand-muted/70")}>{selected?.label ?? placeholder}</span>
            <ChevronDown className={cn("size-4 shrink-0 text-brand-muted transition-transform", open && "rotate-180")} aria-hidden />
          </>
        )}
      </button>

      {open && (
        <div
          className={cn(
            "absolute left-0 z-50 w-full min-w-[16rem] overflow-hidden rounded-xl border border-brand-border bg-white shadow-[0_12px_32px_-8px_rgba(24,20,70,0.25)]",
            dropUp ? "bottom-full mb-1.5" : "top-full mt-1.5",
            popoverClassName
          )}
        >
          <div className="flex items-center gap-2 border-b border-brand-border px-3">
            <Search className="size-4 shrink-0 text-brand-muted" aria-hidden />
            <input
              ref={searchRef}
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
          <ul ref={listRef} id={listId} role="listbox" aria-label={ariaLabel} className="max-h-64 overflow-y-auto overscroll-contain p-1">
            {filtered.length === 0 && <li className="px-3 py-2.5 text-sm text-brand-muted">No matches</li>}
            {filtered.map((option, index) => {
              const isSelected = option.value === value;
              return (
                <li
                  key={option.value}
                  id={`${listId}-${option.value}`}
                  data-index={index}
                  role="option"
                  aria-selected={isSelected}
                  onPointerMove={() => setActive(index)}
                  onClick={() => pick(option)}
                  className={cn(
                    "flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-brand-text",
                    index === active && "bg-brand-purple-light/70",
                    isSelected && "font-medium text-brand-purple"
                  )}
                >
                  {option.flag && <Flag code={option.flag} />}
                  <span className="min-w-0 flex-1 truncate">{option.label}</span>
                  {option.meta && <span className="shrink-0 text-brand-muted tabular-nums">{option.meta}</span>}
                  <Check className={cn("size-4 shrink-0 text-brand-purple", !isSelected && "invisible")} aria-hidden />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
