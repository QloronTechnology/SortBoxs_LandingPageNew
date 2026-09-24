"use client";

import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  /** Index of the item open on first render; all items start collapsed by default. */
  defaultOpenIndex?: number | null;
  className?: string;
}

export function Accordion({ items, defaultOpenIndex = null, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  return (
    <div className={cn("flex flex-col gap-3 3xl:gap-3.5", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;

        return (
          <div
            key={item.question}
            className="rounded-lg border border-brand-border bg-white"
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center gap-3 px-3.5 py-2.5 text-left 3xl:gap-4 3xl:py-2"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-purple-light text-brand-purple 3xl:size-10">
                  <Search className="size-4 3xl:size-5" aria-hidden />
                </span>
                <span className="flex-1 text-sm text-brand-text 3xl:text-lg">{item.question}</span>
                <ChevronDown
                  className={cn(
                    "size-5 shrink-0 text-brand-muted transition-transform",
                    isOpen && "rotate-180"
                  )}
                  aria-hidden
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-3.5 pb-3.5 pl-[3.75rem] text-sm leading-relaxed text-brand-muted 3xl:pl-[4.5rem] 3xl:text-base"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
