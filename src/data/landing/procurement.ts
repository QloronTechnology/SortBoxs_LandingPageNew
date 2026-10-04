import { ChartPie, ClipboardList, Copy, FileSignature, FileText, GitBranch, Scale, Store, Truck, UserCheck } from "lucide-react";
import type { ModuleLandingData } from "@/types/moduleLanding";

/** Content for /procurement. Layout lives in components/module-landing/. Figures are illustrative. */

export const procurementLanding: ModuleLandingData = {
  slug: "procurement",
  name: "Procurement",
  hero: {
    eyebrow: "SortBoxs Procurement",
    title: "Manage purchasing and",
    highlight: "vendors with control.",
    description: "Manage vendors, purchase orders and approvals from one streamlined workflow.",
    points: ["Requests, approvals and orders in one flow", "One record for every vendor", "Spend visible before it's committed"],
  },
  lifecycle: {
    eyebrow: "How it works",
    title: "From a request to goods on the dock",
    intro: "Every purchase follows the same path, with the right approvals along the way and a clear trail afterwards.",
    steps: [
      { icon: ClipboardList, title: "Requisition", body: "Teams raise purchase requests with items, quantities and budget codes, from web or mobile." },
      { icon: FileText, title: "Purchase Order", body: "Approved requests become purchase orders with terms, taxes and delivery dates, sent to the vendor." },
      { icon: Store, title: "Vendor", body: "Keep vendor details, contracts, prices and performance in one place, and compare quotes side by side." },
      { icon: Truck, title: "Delivery", body: "Record goods received, match them to the order and the bill and flag any shortfall." },
    ],
  },
  explorer: {
    eyebrow: "Purchase workflow",
    title: "Follow every purchase from ask to arrival",
    intro: "Pick a step to see what's waiting there and who needs to act.",
    label: "Procurement steps",
    metricLabel: "Value",
    itemLabel: "items",
    tabs: [
      {
        key: "requisitions",
        label: "Requisitions",
        summary: "Requests raised by teams.",
        total: "₹9.6L",
        tone: "bg-slate-400",
        items: [
          { title: "Laptops (20 units)", meta: "PR-218 · IT team", value: "₹14.8L", note: "Submitted this morning" },
          { title: "Ergonomic chairs", meta: "PR-217 · Admin", value: "₹2.3L", note: "Budget code verified" },
          { title: "Software licences", meta: "PR-216 · Engineering", value: "₹3.1L", note: "Renewal, due in 10 days" },
        ],
      },
      {
        key: "approvals",
        label: "Approvals",
        summary: "Waiting on a manager or finance.",
        total: "₹19.4L",
        tone: "bg-amber-500",
        items: [
          { title: "Office renovation", meta: "PR-209 · Finance review", value: "₹8.2L", note: "Over team budget" },
          { title: "Cloud credits", meta: "PR-212 · CTO approval", value: "₹5.4L", note: "Approver is out until Monday" },
          { title: "Printer lease", meta: "PR-214 · Manager approval", value: "₹1.8L", note: "Reminder sent today" },
        ],
      },
      {
        key: "orders",
        label: "Purchase orders",
        summary: "Issued to vendors.",
        total: "₹31.2L",
        tone: "bg-brand-purple",
        items: [
          { title: "PO-4412 · Dell India", meta: "Delivery in 9 days", value: "₹12.6L", note: "Acknowledged by vendor" },
          { title: "PO-4410 · Staples", meta: "Delivery in 3 days", value: "₹1.4L", note: "Partially shipped" },
          { title: "PO-4407 · Zoho", meta: "Auto-renews 1st", value: "₹4.8L", note: "Contract attached" },
        ],
      },
      {
        key: "deliveries",
        label: "Deliveries",
        summary: "Goods received and matched.",
        total: "₹17.9L",
        tone: "bg-emerald-500",
        items: [
          { title: "PO-4398 · Godrej Interio", meta: "Received in full", value: "₹3.6L", note: "Matched to bill" },
          { title: "PO-4395 · HP", meta: "Received 18 of 20", value: "₹7.2L", note: "2 units short, vendor notified" },
          { title: "PO-4391 · Amazon Business", meta: "Received in full", value: "₹0.9L", note: "Closed" },
        ],
      },
    ],
  },
  capabilities: {
    eyebrow: "Procurement without the paperwork",
    title: "Control spend from request to payment",
    intro: "Buyers move faster, approvers see what they're signing, and finance knows what's coming.",
    items: [
      { icon: ClipboardList, title: "Purchase Requisitions", body: "A simple request form with budgets, attachments and an automatic route to the right approver." },
      { icon: Store, title: "Vendor Management", body: "Vendor profiles with contacts, documents, price lists, ratings and full order history." },
      { icon: FileText, title: "Purchase Orders", body: "Generate, send and track purchase orders, with amendments and partial deliveries handled." },
      { icon: GitBranch, title: "Approval Workflows", body: "Rules by amount, category or department decide who approves, with reminders and delegation." },
      { icon: FileSignature, title: "Contract Tracking", body: "Keep contracts next to the vendor, with renewal dates and alerts before they lapse." },
      { icon: ChartPie, title: "Spend Analysis", body: "See spend by vendor, category and team, and spot where consolidating could save money." },
    ],
  },
  ai: {
    eyebrow: "AI for buyers",
    title: "Buy smarter, with a second pair of eyes",
    description: "SortBoxs AI compares every request with your history so buyers and approvers decide with the facts.",
    points: [
      "Flags prices that differ from your past orders",
      "Suggests vendors based on price, delivery and rating",
      "Catches duplicate requests and orders",
      "Warns you before a contract auto-renews",
    ],
    cards: [
      { icon: Scale, tone: "bg-amber-100 text-amber-700", title: "Price check", body: "Dell India's quote is 8% above your last three orders. Ask for a revised quote?" },
      { icon: UserCheck, tone: "bg-brand-purple-light text-brand-purple", title: "Vendor suggestion", body: "Godrej Interio has delivered on time 12 of 12 orders for this category." },
      { icon: Copy, tone: "bg-red-100 text-red-700", title: "Possible duplicate", body: "PR-217 looks the same as PO-4402 raised last week. Link or cancel?" },
    ],
  },
  connected: {
    eyebrow: "Part of one platform",
    title: "Procurement that talks to stock and finance",
    intro: "What you buy updates inventory, and what you owe reaches the books, without re-keying.",
    slugs: ["inventory", "finance", "projects", "analytics", "automation"],
    links: {
      inventory: "Low stock triggers a purchase request",
      finance: "Purchase orders match to vendor bills",
      projects: "Charge purchases to the right project",
      analytics: "Spend and savings reporting",
      automation: "Route approvals and reminders by rule",
    },
  },
};
