import { BadgeCheck, Barcode, CopyCheck, FileSearch, Image as ImageIcon, ListChecks, ScanEye, ShieldCheck, Table2, Upload } from "lucide-react";
import type { ModuleLandingData } from "@/types/moduleLanding";

/** Content for /computer-vision. Layout lives in components/module-landing/. Figures are illustrative. */

export const computerVisionLanding: ModuleLandingData = {
  slug: "computer-vision",
  name: "Computer Vision",
  icon: ScanEye,
  iconTone: "bg-purple-100 text-purple-700",
  hero: {
    eyebrow: "SortBoxs Vision",
    title: "Turn documents and images into",
    highlight: "structured data.",
    description:
      "Read invoices, receipts, IDs and photos automatically, check the results and send them straight to the right record.",
    points: ["Read documents in seconds, not minutes", "Confidence shown on every field", "Low-confidence items go to a person"],
  },
  lifecycle: {
    eyebrow: "How it works",
    title: "From a photo or a PDF to a clean record",
    intro: "The same four steps work for invoices, receipts, IDs and product photos.",
    steps: [
      { icon: Upload, title: "Upload", body: "Drop in a file, snap a photo on mobile or forward an email. PDFs, scans and images all work." },
      { icon: ScanEye, title: "Detect", body: "Vision finds the document type and the regions that matter, like totals, dates and line items." },
      { icon: FileSearch, title: "Extract", body: "It reads each field and gives you a confidence score, so you know what to trust." },
      { icon: BadgeCheck, title: "Verify", body: "Anything uncertain goes to a review queue. Confirmed data is saved to the record." },
    ],
  },
  explorer: {
    eyebrow: "What it reads",
    title: "Documents and images across the business",
    intro: "Pick a type to see examples of what gets extracted and where it goes.",
    label: "Document types",
    metricLabel: "Processed this week",
    itemLabel: "examples",
    tabs: [
      {
        key: "invoices",
        label: "Invoices",
        summary: "Vendor bills turned into payable entries.",
        total: "412",
        tone: "bg-brand-purple",
        items: [
          { title: "Dell India invoice", meta: "Finance", value: "98%", note: "Total ₹14.8L, GST matched" },
          { title: "Godrej Interio invoice", meta: "Finance", value: "96%", note: "Matched to PO-4398" },
          { title: "Handwritten bill", meta: "Finance", value: "71%", note: "Sent to review: amount unclear" },
        ],
      },
      {
        key: "receipts",
        label: "Receipts",
        summary: "Expense claims captured from a photo.",
        total: "1,186",
        tone: "bg-emerald-500",
        items: [
          { title: "Taxi receipt", meta: "Expenses", value: "97%", note: "₹480, category Travel" },
          { title: "Restaurant receipt", meta: "Expenses", value: "94%", note: "₹2,340, tax split found" },
          { title: "Fuel receipt", meta: "Expenses", value: "92%", note: "Possible duplicate flagged" },
        ],
      },
      {
        key: "ids",
        label: "IDs & forms",
        summary: "Onboarding and verification paperwork.",
        total: "238",
        tone: "bg-sky-500",
        items: [
          { title: "Employee ID proof", meta: "HRMS", value: "99%", note: "Name and number captured" },
          { title: "Bank details form", meta: "HRMS", value: "95%", note: "IFSC checked automatically" },
          { title: "Vendor registration", meta: "Procurement", value: "93%", note: "GSTIN validated" },
        ],
      },
      {
        key: "photos",
        label: "Photos",
        summary: "Product, stock and site images.",
        total: "654",
        tone: "bg-amber-500",
        items: [
          { title: "Damaged goods photo", meta: "Inventory", value: "91%", note: "Marked as damaged" },
          { title: "Shelf photo", meta: "Inventory", value: "89%", note: "42 units counted" },
          { title: "Delivery proof", meta: "Commerce", value: "96%", note: "Signature detected" },
        ],
      },
    ],
  },
  capabilities: {
    eyebrow: "Vision built into your workflow",
    title: "Stop typing out what's already on the page",
    intro: "Data entry from paper and PDFs is slow, error-prone and easy to automate.",
    items: [
      { icon: FileSearch, title: "Document Reading", body: "Read invoices, receipts, forms and contracts, in scans, PDFs and phone photos." },
      { icon: Table2, title: "Table & Line-Item Extraction", body: "Pull out rows, quantities and prices, not just the totals at the bottom." },
      { icon: ImageIcon, title: "Image Inspection", body: "Classify product and site photos, and count or flag what's in them." },
      { icon: Barcode, title: "Barcode & QR Reading", body: "Scan codes from labels and packages to look up products and orders." },
      { icon: ShieldCheck, title: "Validation Rules", body: "Check totals, tax numbers and dates against your own rules before saving." },
      { icon: ListChecks, title: "Review Queue", body: "Uncertain fields wait for a person, who corrects them in a click." },
    ],
  },
  ai: {
    eyebrow: "Accuracy you can check",
    title: "Fast, and honest about what it's unsure of",
    description: "Vision shows you how confident it is in every field, and hands the hard cases to your team instead of guessing.",
    points: [
      "Shows a confidence score for every field it reads",
      "Sends low-confidence fields to a review queue",
      "Learns from the corrections your team makes",
      "Keeps the original file next to the extracted data",
    ],
    cards: [
      { icon: BadgeCheck, tone: "bg-emerald-100 text-emerald-700", title: "Field confidence", body: "Invoice total read at 98%, date at 99%, and vendor name at 94%." },
      { icon: ListChecks, tone: "bg-amber-100 text-amber-700", title: "Needs review", body: "The amount on this handwritten bill is unclear. Please confirm ₹4,200 or ₹4,700." },
      { icon: CopyCheck, tone: "bg-brand-purple-light text-brand-purple", title: "Duplicate found", body: "This fuel receipt matches one submitted on Monday. Keep one?" },
    ],
  },
  connected: {
    eyebrow: "Part of one platform",
    title: "Documents that land in the right place",
    intro: "Extracted data goes straight to the record it belongs to, with the original attached.",
    slugs: ["finance", "procurement", "inventory", "hrms", "automation"],
    links: {
      finance: "Invoices and receipts become bills and expenses",
      procurement: "Match delivery notes to purchase orders",
      inventory: "Count and check stock from photos",
      hrms: "Capture ID and onboarding documents",
      automation: "Trigger workflows when a document arrives",
    },
  },
};