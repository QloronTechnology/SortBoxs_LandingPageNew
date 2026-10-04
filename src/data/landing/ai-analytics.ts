import { BrainCircuit, ChartLine, Database, MessageSquareText, ScanSearch, ShieldAlert, SlidersHorizontal, TrendingUp, TriangleAlert, Users, Zap } from "lucide-react";
import type { ModuleLandingData } from "@/types/moduleLanding";

/** Content for /ai-analytics. Layout lives in components/module-landing/. Figures are illustrative. */

export const aiAnalyticsLanding: ModuleLandingData = {
  slug: "ai-analytics",
  name: "AI Analytics",
  icon: BrainCircuit,
  iconTone: "bg-teal-100 text-teal-700",
  hero: {
    eyebrow: "SortBoxs AI Analytics",
    title: "Predict what's next, and",
    highlight: "act on it first.",
    description:
      "Forecasts, anomaly alerts and what-if scenarios built on the data you already keep in SortBoxs, with the reasons behind every prediction.",
    points: ["Forecasts that update as your data changes", "Alerts on unusual changes, with the reason", "What-if scenarios for planning"],
  },
  lifecycle: {
    eyebrow: "How it works",
    title: "From your history to a confident decision",
    intro: "Models learn from your own records and keep improving as new data arrives.",
    steps: [
      { icon: Database, title: "Collect", body: "Sales, finance, people and customer data flow in from every module, with nothing to export." },
      { icon: BrainCircuit, title: "Model", body: "Models learn the patterns in your history, like seasonality, growth and the things that drive results." },
      { icon: TrendingUp, title: "Predict", body: "Get forecasts and risk scores with a confidence range, so you know how sure the model is." },
      { icon: Zap, title: "Act", body: "Turn a prediction into a task, an alert or a workflow, right where the team already works." },
    ],
  },
  explorer: {
    eyebrow: "Predictions",
    title: "Four kinds of insight, one place",
    intro: "Pick a type to see examples of what AI Analytics surfaces for your team.",
    label: "Prediction types",
    metricLabel: "Models running",
    itemLabel: "insights",
    tabs: [
      {
        key: "forecasts",
        label: "Forecasts",
        summary: "What's likely to happen next.",
        total: "6",
        tone: "bg-brand-purple",
        items: [
          { title: "Next quarter revenue", meta: "Sales and finance", value: "₹1.6Cr", note: "Range ₹1.5Cr to ₹1.7Cr" },
          { title: "Cash position in 90 days", meta: "Finance", value: "₹52L", note: "Assumes current collections" },
          { title: "Headcount needed", meta: "People", value: "+14", note: "To support planned growth" },
        ],
      },
      {
        key: "anomalies",
        label: "Anomalies",
        summary: "Things that don't look normal.",
        total: "3",
        tone: "bg-red-500",
        items: [
          { title: "Refunds jumped 40%", meta: "Electronics", value: "High", note: "Mostly one product model" },
          { title: "Unusual expense pattern", meta: "Travel", value: "Medium", note: "Three claims just under the limit" },
          { title: "Login drop-off", meta: "Customer portal", value: "Low", note: "Started after Tuesday's release" },
        ],
      },
      {
        key: "risk",
        label: "Risk scores",
        summary: "Who or what needs attention.",
        total: "28",
        tone: "bg-amber-500",
        items: [
          { title: "Churn risk", meta: "12 customers", value: "High", note: "Usage down and a support complaint" },
          { title: "Late payment risk", meta: "9 invoices", value: "Medium", note: "Customers who paid late before" },
          { title: "Attrition risk", meta: "3 employees", value: "Medium", note: "Unplanned leave and missed check-ins" },
        ],
      },
      {
        key: "segments",
        label: "Segments",
        summary: "Groups that behave alike.",
        total: "5",
        tone: "bg-emerald-500",
        items: [
          { title: "High-value repeat buyers", meta: "412 customers", value: "38%", note: "Of revenue from 9% of customers" },
          { title: "Price-sensitive", meta: "960 customers", value: "21%", note: "Respond best to bundles" },
          { title: "At-risk loyalists", meta: "144 customers", value: "Watch", note: "Engagement falling for 3 months" },
        ],
      },
    ],
  },
  capabilities: {
    eyebrow: "Predictive analytics for everyone",
    title: "Know what's coming, without a data science team",
    intro: "Models are built for you from your own records, and explained in plain language.",
    items: [
      { icon: ChartLine, title: "Demand & Revenue Forecasting", body: "Projections for revenue, cash, demand and headcount, with a confidence range." },
      { icon: ScanSearch, title: "Anomaly Detection", body: "Spot unusual spikes and drops in any metric, and see what drove them." },
      { icon: ShieldAlert, title: "Churn & Risk Scoring", body: "Score customers, invoices and employees by risk so you can act on the ones that matter." },
      { icon: Users, title: "Customer Segmentation", body: "Find groups of customers that behave alike and tailor your offers to each." },
      { icon: SlidersHorizontal, title: "What-If Scenarios", body: "Change an assumption, like marketing spend or pricing, and see the projected impact." },
      { icon: MessageSquareText, title: "Plain-Language Explanations", body: "Every prediction comes with the factors behind it, written so anyone can follow." },
    ],
  },
  ai: {
    eyebrow: "Explainable by design",
    title: "Predictions you can question",
    description: "A forecast is only useful if you understand it. AI Analytics shows its reasoning and how sure it is.",
    points: [
      "Shows the main factors behind each prediction",
      "Gives a range, not just a single number",
      "Compares past predictions with what really happened",
      "Warns you when new data no longer fits the model",
    ],
    cards: [
      { icon: TrendingUp, tone: "bg-emerald-100 text-emerald-700", title: "Top drivers", body: "Repeat orders and the West region explain 62% of next quarter's projected growth." },
      { icon: SlidersHorizontal, tone: "bg-brand-purple-light text-brand-purple", title: "Confidence range", body: "Revenue is projected at ₹1.6Cr, with an 80% chance of landing between ₹1.5Cr and ₹1.7Cr." },
      { icon: TriangleAlert, tone: "bg-amber-100 text-amber-700", title: "Drift alert", body: "Order patterns changed last month. The model was refreshed and its accuracy rechecked." },
    ],
  },
  connected: {
    eyebrow: "Part of one platform",
    title: "Predictions across your whole business",
    intro: "Every module feeds the models, and every module can act on what they find.",
    slugs: ["crm", "sales", "finance", "inventory", "hrms"],
    links: {
      crm: "Churn risk and segments on every account",
      sales: "Win probability and revenue forecasts",
      finance: "Cash flow and late-payment forecasts",
      inventory: "Demand forecasts that drive reorders",
      hrms: "Attrition and headcount planning",
    },
  },
};
