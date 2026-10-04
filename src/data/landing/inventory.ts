import { ArrowLeftRight, BellRing, Boxes, Calculator, ChartLine, Package, PackageX, ScanBarcode, ShoppingCart, Warehouse } from "lucide-react";
import type { ModuleLandingData } from "@/types/moduleLanding";

/** Content for /inventory. Layout lives in components/module-landing/. Figures are illustrative. */

export const inventoryLanding: ModuleLandingData = {
  slug: "inventory",
  name: "Inventory",
  hero: {
    eyebrow: "SortBoxs Inventory",
    title: "Track stock and",
    highlight: "manage warehouses.",
    description: "Track products, warehouses and stock transfers with real-time visibility.",
    points: ["Live stock across every warehouse", "Reorder alerts before you run out", "Batch and serial numbers tracked"],
  },
  lifecycle: {
    eyebrow: "How it works",
    title: "From a product to every movement",
    intro: "Every receipt, transfer and dispatch updates the same stock count, so what you see is what's on the shelf.",
    steps: [
      { icon: Package, title: "Product", body: "Set up products with SKUs, variants, units and pricing once, and use them everywhere." },
      { icon: Boxes, title: "Stock", body: "See quantity on hand, reserved and incoming for each product, updated as things happen." },
      { icon: Warehouse, title: "Warehouse", body: "Organise locations, bins and zones, and know exactly where each item sits." },
      { icon: ArrowLeftRight, title: "Movement", body: "Record receipts, transfers and dispatches, with a full history for every unit." },
    ],
  },
  explorer: {
    eyebrow: "Stock control",
    title: "See what needs attention in your stock",
    intro: "Pick a view to see the items in it, with where they are and how many are left.",
    label: "Stock views",
    metricLabel: "Units",
    itemLabel: "items",
    tabs: [
      {
        key: "low",
        label: "Low stock",
        summary: "Below the reorder level.",
        total: "264",
        tone: "bg-red-500",
        items: [
          { title: "SKU-204 · Steel bracket", meta: "Pune warehouse", value: "42 left", note: "Runs out in about 6 days" },
          { title: "SKU-118 · Packing tape", meta: "Mumbai warehouse", value: "180 left", note: "Reorder level is 300" },
          { title: "SKU-331 · Safety gloves", meta: "Delhi warehouse", value: "42 left", note: "Supplier lead time 7 days" },
        ],
      },
      {
        key: "transit",
        label: "In transit",
        summary: "Moving between locations.",
        total: "1,140",
        tone: "bg-sky-500",
        items: [
          { title: "TR-0912 · Pune to Mumbai", meta: "Dispatched yesterday", value: "400 units", note: "Arrives tomorrow" },
          { title: "TR-0910 · Delhi to Pune", meta: "Dispatched Monday", value: "250 units", note: "Delayed by a day" },
          { title: "TR-0908 · Mumbai to Delhi", meta: "Dispatched Sunday", value: "490 units", note: "Arriving today" },
        ],
      },
      {
        key: "receipts",
        label: "Receipts",
        summary: "Goods received from vendors.",
        total: "2,380",
        tone: "bg-emerald-500",
        items: [
          { title: "PO-4398 · Godrej Interio", meta: "Mumbai warehouse", value: "120 units", note: "Received in full" },
          { title: "PO-4395 · HP", meta: "Pune warehouse", value: "18 units", note: "2 short, vendor notified" },
          { title: "PO-4391 · Staples", meta: "Delhi warehouse", value: "2,240 units", note: "Batches recorded" },
        ],
      },
      {
        key: "dispatched",
        label: "Dispatched",
        summary: "Sent out to customers.",
        total: "1,860",
        tone: "bg-brand-purple",
        items: [
          { title: "SO-7781 · Aurora Textiles", meta: "Mumbai warehouse", value: "320 units", note: "Packed and shipped" },
          { title: "SO-7778 · Helix Motors", meta: "Pune warehouse", value: "140 units", note: "Awaiting pickup" },
          { title: "SO-7774 · Orbit Retail", meta: "Delhi warehouse", value: "1,400 units", note: "Delivered" },
        ],
      },
    ],
  },
  capabilities: {
    eyebrow: "Inventory you can trust",
    title: "Know what you have, where it is and what it's worth",
    intro: "One stock count across every location, updated by the people who move the goods.",
    items: [
      { icon: Boxes, title: "Stock Tracking", body: "Quantity on hand, reserved and incoming for every product, with a complete movement history." },
      { icon: Warehouse, title: "Warehouse Management", body: "Multiple warehouses with zones and bins, so pickers find items fast." },
      { icon: ArrowLeftRight, title: "Stock Transfers", body: "Move stock between locations with in-transit visibility and receipt confirmation." },
      { icon: BellRing, title: "Reorder Alerts", body: "Set minimum levels and get alerted, or raise a purchase request automatically, before stock-outs." },
      { icon: ScanBarcode, title: "Batch & Serial Tracking", body: "Trace any unit by batch or serial number, including expiry dates and warranty." },
      { icon: Calculator, title: "Inventory Valuation", body: "Value stock using FIFO or weighted average and see it by warehouse and category." },
    ],
  },
  ai: {
    eyebrow: "AI for stock",
    title: "Stock the right amount, at the right place",
    description: "SortBoxs AI reads sales, lead times and seasonality so you reorder when it matters and not before.",
    points: [
      "Forecasts demand by product and location",
      "Suggests reorder quantities with lead time in mind",
      "Flags slow-moving and dead stock",
      "Recommends transfers between warehouses",
    ],
    cards: [
      { icon: ChartLine, tone: "bg-brand-purple-light text-brand-purple", title: "Demand forecast", body: "Steel brackets will sell about 30% more next month. Reorder 600 units." },
      { icon: ShoppingCart, tone: "bg-emerald-100 text-emerald-700", title: "Reorder suggestion", body: "SKU-204 runs out in 6 days and the vendor takes 7. Order today." },
      { icon: PackageX, tone: "bg-amber-100 text-amber-700", title: "Slow-moving stock", body: "14 SKUs in Delhi haven't moved in 90 days. Consider a transfer or discount." },
    ],
  },
  connected: {
    eyebrow: "Part of one platform",
    title: "Inventory in step with buying and selling",
    intro: "Purchases add stock, sales take it away and the numbers stay right in every module.",
    slugs: ["procurement", "commerce", "finance", "analytics", "sales"],
    links: {
      procurement: "Low stock raises purchase requests",
      commerce: "Orders reserve and release stock live",
      finance: "Stock value flows to the balance sheet",
      analytics: "Turnover and stock-out reporting",
      sales: "Reps see availability before they promise",
    },
  },
};
