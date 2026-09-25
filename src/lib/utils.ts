import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** ₹1,75,999 — Indian digit grouping. */
export const formatINR = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;
