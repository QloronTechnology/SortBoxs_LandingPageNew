import type { Channel } from "../shared";

export interface Campaign {
  name: string;
  channel: Channel;
  start: number; // week index, 0-based
  len: number; // weeks
  owner: string;
  status: "Planned" | "Live" | "Done";
  budget: number; // ₹ lakh
  spent: number;
}

/** Sample campaigns across eight weeks. Illustrative only. */
export const campaigns: Campaign[] = [
  { name: "Product launch teaser", channel: "Email", start: 0, len: 2, owner: "Meera Das", status: "Done", budget: 0.6, spent: 0.55 },
  { name: "Diwali offer", channel: "Email", start: 3, len: 3, owner: "Meera Das", status: "Live", budget: 1.2, spent: 0.7 },
  { name: "Brand story series", channel: "Social", start: 0, len: 4, owner: "Rohan Gupta", status: "Done", budget: 0.9, spent: 0.88 },
  { name: "Festive reels", channel: "Social", start: 4, len: 3, owner: "Rohan Gupta", status: "Live", budget: 1.0, spent: 0.4 },
  { name: "Search: book a demo", channel: "Ads", start: 1, len: 5, owner: "Ishita Rao", status: "Live", budget: 3.5, spent: 2.1 },
  { name: "Customer webinar", channel: "Events", start: 2, len: 1, owner: "Karan Bose", status: "Done", budget: 0.5, spent: 0.45 },
  { name: "City roadshow", channel: "Events", start: 5, len: 2, owner: "Karan Bose", status: "Planned", budget: 2.0, spent: 0 },
];

export const WEEKS = 8;
