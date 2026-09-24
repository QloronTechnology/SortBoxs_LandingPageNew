import type { MenuTone } from "@/data/menus/types";

/** Pastel icon tile per tone (background + glyph colour), shared by all mega menus. */
export const toneClasses: Record<MenuTone, string> = {
  green: "bg-emerald-50 text-emerald-600",
  orange: "bg-orange-50 text-orange-500",
  teal: "bg-teal-50 text-teal-600",
  pink: "bg-pink-50 text-pink-600",
  purple: "bg-violet-50 text-violet-600",
  blue: "bg-sky-50 text-sky-600",
  sky: "bg-sky-50 text-sky-500",
  red: "bg-red-50 text-red-500",
  amber: "bg-amber-50 text-amber-600",
  indigo: "bg-indigo-50 text-indigo-600",
  lavender: "bg-purple-50 text-purple-500",
};

export const menuFocusRing = "outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/60";
export const menuEyebrow = "text-[13px] font-semibold tracking-wide text-brand-purple uppercase";
/** Lavender background of the intro / featured cards. */
export const menuCardBg = "bg-[#f6f4ff]";
