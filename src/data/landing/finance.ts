import { ChartColumn, Clock, CreditCard, FileText, Landmark, PiggyBank, Receipt, ScanSearch, ShieldCheck, TrendingUp } from "lucide-react";
import type { ModuleLandingData } from "@/types/moduleLanding";

/** Content for /finance. Layout lives in components/module-landing/. Figures are illustrative. */

export const financeLanding: ModuleLandingData = {
  slug: "finance",
  name: "Finance",
  hero: {
    eyebrow: "SortBoxs Finance",
    title: "Track expenses, invoices and",
    highlight: "financial health.",
    description: "Invoices, payments, expenses and complete financial operations in one connected view.",
    points: ["Invoice to payment in one flow", "Expenses and payables under control", "Reports you can trust at month-end"],
  },
  lifecycle: {
    eyebrow: "How it works",
    title: "From an invoice to a clear financial picture",
    intro: "Money in, money out and the reports on top all come from the same records.",
    steps: [
      { icon: FileText, title: "Invoice", body: "Create invoices from won deals or orders, with taxes applied and sent in a click." },
      { icon: Receipt, title: "Expense", body: "Capture expenses and bills with receipts, route them for approval and code them correctly." },
      { icon: CreditCard, title: "Payment", body: "Record receipts and payouts, match them to invoices and bills and chase what's overdue." },
      { icon: ChartColumn, title: "Reports", body: "Get live P&L, cash flow and ageing reports straight from the transactions behind them." },
    ],
  },
  explorer: {
    eyebrow: "Invoice tracker",
    title: "Know where every invoice stands",
    intro: "Pick a status to see the invoices in it and what needs chasing.",
    label: "Invoice statuses",
    metricLabel: "Invoiced",
    itemLabel: "invoices",
    tabs: [
      {
        key: "draft",
        label: "Draft",
        summary: "Prepared but not yet sent.",
        total: "₹6.3L",
        tone: "bg-slate-400",
        items: [
          { title: "Helix Motors", meta: "INV-1046 · Net 30", value: "₹2.4L", note: "Awaiting approval" },
          { title: "Coral Hospitality", meta: "INV-1045 · Net 15", value: "₹1.3L", note: "Created from won deal" },
          { title: "Pioneer Edu", meta: "INV-1044 · Net 30", value: "₹2.6L", note: "Needs PO number" },
        ],
      },
      {
        key: "sent",
        label: "Sent",
        summary: "With the customer, not yet due.",
        total: "₹14.8L",
        tone: "bg-sky-500",
        items: [
          { title: "Skyline Infra", meta: "INV-1043 · Due in 12 days", value: "₹4.4L", note: "Viewed by customer" },
          { title: "Orbit Retail", meta: "INV-1040 · Due in 20 days", value: "₹5.1L", note: "Sent yesterday" },
          { title: "Lotus Clinics", meta: "INV-1038 · Due in 6 days", value: "₹5.3L", note: "Reminder scheduled" },
        ],
      },
      {
        key: "overdue",
        label: "Overdue",
        summary: "Past the due date.",
        total: "₹4.2L",
        tone: "bg-red-500",
        items: [
          { title: "Northwind Logistics", meta: "INV-1041 · 8 days late", value: "₹2.1L", note: "2 reminders sent" },
          { title: "Meridian Steel", meta: "INV-1035 · 15 days late", value: "₹1.4L", note: "Promise to pay on Friday" },
          { title: "Harbor Exports", meta: "INV-1033 · 21 days late", value: "₹0.7L", note: "Escalated to account owner" },
        ],
      },
      {
        key: "paid",
        label: "Paid",
        summary: "Settled and reconciled.",
        total: "₹22.8L",
        tone: "bg-emerald-500",
        items: [
          { title: "Aurora Textiles", meta: "INV-1042 · Bank transfer", value: "₹3.4L", note: "Matched automatically" },
          { title: "Vertex Labs", meta: "INV-1039 · Card", value: "₹3.1L", note: "Paid 3 days early" },
          { title: "Summit Constructions", meta: "INV-1037 · Bank transfer", value: "₹1.5L", note: "Reconciled" },
        ],
      },
    ],
  },
  capabilities: {
    eyebrow: "A finance suite that keeps up",
    title: "Everything from billing to compliance",
    intro: "Your finance team works from one set of books that sales, procurement and HR feed into directly.",
    items: [
      { icon: FileText, title: "Invoicing & Billing", body: "Create, send and track invoices, with recurring billing, credit notes and payment links." },
      { icon: Receipt, title: "Expense Management", body: "Collect receipts, enforce policies and approve claims without chasing email threads." },
      { icon: Landmark, title: "Accounts Payable", body: "Capture vendor bills, schedule payments and see exactly what you owe and when." },
      { icon: ChartColumn, title: "Financial Reporting", body: "Profit and loss, balance sheet, cash flow and ageing reports, live and drill-down." },
      { icon: PiggyBank, title: "Budgeting & Forecasting", body: "Set budgets by team or project and compare them with actuals as the month moves." },
      { icon: ShieldCheck, title: "Tax & Compliance", body: "Apply GST and other taxes on every document and keep a clean trail for audits." },
    ],
  },
  ai: {
    eyebrow: "AI for finance",
    title: "Catch problems before they reach the books",
    description: "SortBoxs AI watches transactions across the business and points your team at what deserves a second look.",
    points: [
      "Predicts which invoices are likely to be paid late",
      "Flags unusual expenses and duplicate bills",
      "Forecasts cash flow from open invoices and bills",
      "Answers finance questions in plain language",
    ],
    cards: [
      { icon: Clock, tone: "bg-amber-100 text-amber-700", title: "Late payment risk", body: "Northwind Logistics has paid late the last 3 times. Send an early reminder." },
      { icon: ScanSearch, tone: "bg-red-100 text-red-700", title: "Possible duplicate", body: "Two bills from the same vendor for ₹48,000 were entered on the same day. Review?" },
      { icon: TrendingUp, tone: "bg-emerald-100 text-emerald-700", title: "Cash-flow forecast", body: "You'll be ₹6L ahead by month-end if overdue invoices are collected." },
    ],
  },
  connected: {
    eyebrow: "Part of one platform",
    title: "Finance that closes the loop with every team",
    intro: "Deals become invoices, orders become revenue and payroll posts to the books, with no re-entry.",
    slugs: ["crm", "sales", "hrms", "procurement", "analytics"],
    links: {
      crm: "Customer balances and history on every account",
      sales: "Won deals turn into invoices automatically",
      hrms: "Payroll and reimbursements post to the ledger",
      procurement: "Purchase orders match to vendor bills",
      analytics: "Financial KPIs next to operational ones",
    },
  },
};