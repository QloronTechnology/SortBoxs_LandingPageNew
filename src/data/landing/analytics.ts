import { BrainCircuit, Database, Download, FileBarChart, LayoutDashboard, Layers, Lightbulb, MessageSquareText, PencilRuler, TrendingUp, TriangleAlert } from "lucide-react";
import type { ModuleLandingData } from "@/types/moduleLanding";

/** Content for /analytics. Layout lives in components/module-landing/. Figures are illustrative. */

export const analyticsLanding: ModuleLandingData = {
  slug: "analytics",
  name: "Analytics",
  hero: {
    eyebrow: "SortBoxs Analytics",
    title: "Turn data into",
    highlight: "actionable insights.",
    description: "Make data-driven decisions with real-time dashboards and reports.",
    points: ["Live dashboards from every module", "Reports built without a data team", "Forecasts and alerts powered by AI"],
  },
  lifecycle: {
    eyebrow: "How it works",
    title: "From scattered data to a clear decision",
    intro: "Your data already lives in SortBoxs. Analytics turns it into answers without exports or spreadsheets.",
    steps: [
      { icon: Database, title: "Business Data", body: "Sales, people, money and customers flow in from every module, with no pipelines to build." },
      { icon: FileBarChart, title: "Reports", body: "Start from ready-made dashboards or build your own reports with filters, groups and charts." },
      { icon: Lightbulb, title: "Insights", body: "See trends, outliers and forecasts, with AI explaining what changed and why." },
    ],
  },
  explorer: {
    eyebrow: "Dashboards",
    title: "A dashboard for every part of the business",
    intro: "Pick an area to see the numbers its team looks at every day.",
    label: "Dashboards",
    metricLabel: "Dashboards",
    itemLabel: "key metrics",
    tabs: [
      {
        key: "sales",
        label: "Sales",
        summary: "Pipeline, win rate and quota.",
        total: "3 reports",
        tone: "bg-brand-purple",
        items: [
          { title: "Pipeline value", meta: "Sales dashboard", value: "₹69.8L", note: "Up 12% on last quarter" },
          { title: "Win rate", meta: "Sales dashboard", value: "31%", note: "Best in Enterprise deals" },
          { title: "Quota attainment", meta: "Team report", value: "86%", note: "4 of 6 reps on target" },
        ],
      },
      {
        key: "people",
        label: "People",
        summary: "Headcount, attendance and attrition.",
        total: "3 reports",
        tone: "bg-rose-500",
        items: [
          { title: "Headcount", meta: "HR dashboard", value: "248", note: "6 joiners this month" },
          { title: "Attendance", meta: "HR dashboard", value: "92%", note: "Highest on Tuesdays" },
          { title: "Attrition", meta: "HR report", value: "8.4%", note: "Trailing 12 months" },
        ],
      },
      {
        key: "finance",
        label: "Finance",
        summary: "Revenue, cash and costs.",
        total: "4 reports",
        tone: "bg-emerald-500",
        items: [
          { title: "Net revenue", meta: "Finance dashboard", value: "₹1.4Cr", note: "Up 11% quarter on quarter" },
          { title: "Cash runway", meta: "Cash-flow report", value: "14 months", note: "At current burn" },
          { title: "Days sales outstanding", meta: "Receivables", value: "38 days", note: "Down from 44" },
        ],
      },
      {
        key: "customers",
        label: "Customers",
        summary: "Growth, satisfaction and churn.",
        total: "3 reports",
        tone: "bg-sky-500",
        items: [
          { title: "Active customers", meta: "Customer dashboard", value: "3,204", note: "128 added this month" },
          { title: "Satisfaction", meta: "Service report", value: "4.8", note: "Average rating out of 5" },
          { title: "Churn", meta: "Retention report", value: "2.1%", note: "Lowest in 6 quarters" },
        ],
      },
    ],
  },
  capabilities: {
    eyebrow: "Everything you need to see clearly",
    title: "Analytics your whole team can use",
    intro: "No data team, no exports. Anyone can open a dashboard, ask a question and trust the answer.",
    items: [
      { icon: LayoutDashboard, title: "Real-Time Dashboards", body: "Live charts and KPIs for every team, updated the moment the underlying data changes." },
      { icon: PencilRuler, title: "Custom Reports", body: "Build reports with drag-and-drop fields, filters and groupings, then schedule them by email." },
      { icon: TrendingUp, title: "Business Growth Metrics", body: "Track revenue, retention, productivity and cost against the goals you set." },
      { icon: Layers, title: "Cross-Module Insights", body: "Combine sales, support, finance and people data in a single view, with no joins to write." },
      { icon: Download, title: "Data Export", body: "Export any report to CSV or Excel, or share a live link with the people who need it." },
      { icon: BrainCircuit, title: "AI-Powered Forecasts", body: "Projections for revenue, cash and demand that update as your numbers do." },
    ],
  },
  ai: {
    eyebrow: "AI for decisions",
    title: "Ask your data a question and get an answer",
    description: "SortBoxs AI explains what moved, why it moved and what to look at next, in plain language.",
    points: [
      "Explains why a metric went up or down",
      "Alerts you to unusual changes as they happen",
      "Forecasts revenue, cash and demand",
      "Answers questions typed in plain language",
    ],
    cards: [
      { icon: TriangleAlert, tone: "bg-amber-100 text-amber-700", title: "Unusual change", body: "Refunds rose 40% this week, mostly on one product. Open the breakdown?" },
      { icon: TrendingUp, tone: "bg-emerald-100 text-emerald-700", title: "Forecast", body: "On the current pipeline, next quarter's revenue is projected at ₹1.6Cr." },
      { icon: MessageSquareText, tone: "bg-brand-purple-light text-brand-purple", title: "Ask anything", body: "“Which region grew fastest this year?” Answered with a chart in seconds." },
    ],
  },
  connected: {
    eyebrow: "Part of one platform",
    title: "Analytics that sees across every module",
    intro: "Because the data lives in one platform, every report is already joined up.",
    slugs: ["crm", "sales", "finance", "hrms", "ai"],
    links: {
      crm: "Customer growth and retention reporting",
      sales: "Pipeline, forecast and win-rate dashboards",
      finance: "Revenue, cash and cost reporting",
      hrms: "Headcount, attendance and attrition",
      ai: "Ask questions of your data in plain language",
    },
  },
};
