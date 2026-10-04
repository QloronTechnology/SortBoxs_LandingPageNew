import { Cpu, Database, FlaskConical, GitCompare, History, Lock, Rocket, ScrollText, ShieldCheck, Tags, Gauge, Upload } from "lucide-react";
import type { ModuleLandingData } from "@/types/moduleLanding";

/** Content for /custom-ai-models. Layout lives in components/module-landing/. Figures are illustrative. */

export const customModelsLanding: ModuleLandingData = {
  slug: "custom-ai-models",
  name: "Custom AI Models",
  icon: Cpu,
  iconTone: "bg-blue-100 text-blue-700",
  hero: {
    eyebrow: "SortBoxs AI Studio",
    title: "Train and deploy your own",
    highlight: "AI models.",
    description:
      "Build models for the questions only your business has, on your own data, and put them to work inside SortBoxs without writing infrastructure code.",
    points: ["Train on your own SortBoxs data", "Test accuracy before you deploy", "Your data stays yours"],
  },
  lifecycle: {
    eyebrow: "How it works",
    title: "From your data to a live model",
    intro: "A guided path takes you from a question to a model your team can use every day.",
    steps: [
      { icon: Database, title: "Data", body: "Pick the records and fields to learn from, with sensitive columns excluded by default." },
      { icon: FlaskConical, title: "Train", body: "Choose a goal, like predicting churn or classifying tickets, and train a model with one click." },
      { icon: Gauge, title: "Evaluate", body: "See accuracy, errors and which factors matter most, and compare versions side by side." },
      { icon: Rocket, title: "Deploy", body: "Publish the model to a secure endpoint and use it in workflows, reports and the assistant." },
    ],
  },
  explorer: {
    eyebrow: "Model templates",
    title: "Start from a model that fits your goal",
    intro: "Pick a template to see what it predicts and how well it performs on sample data.",
    label: "Model types",
    metricLabel: "Typical accuracy",
    itemLabel: "templates",
    tabs: [
      {
        key: "classify",
        label: "Classify",
        summary: "Put things in the right bucket.",
        total: "93%",
        tone: "bg-brand-purple",
        items: [
          { title: "Ticket category", meta: "Customer Service", value: "94%", note: "Billing, technical, general" },
          { title: "Lead quality", meta: "Sales", value: "89%", note: "Hot, warm or cold" },
          { title: "Expense type", meta: "Finance", value: "96%", note: "Travel, meals, software" },
        ],
      },
      {
        key: "predict",
        label: "Predict",
        summary: "Estimate what will happen.",
        total: "86%",
        tone: "bg-emerald-500",
        items: [
          { title: "Customer churn", meta: "CRM", value: "87%", note: "Likelihood of leaving in 90 days" },
          { title: "Late payment", meta: "Finance", value: "84%", note: "Likelihood an invoice is paid late" },
          { title: "Employee attrition", meta: "HRMS", value: "81%", note: "Risk of leaving in 6 months" },
        ],
      },
      {
        key: "extract",
        label: "Extract",
        summary: "Pull facts from text and files.",
        total: "91%",
        tone: "bg-sky-500",
        items: [
          { title: "Contract terms", meta: "Procurement", value: "90%", note: "Dates, amounts and renewal clauses" },
          { title: "Resume details", meta: "Hiring", value: "93%", note: "Skills, roles and experience" },
          { title: "Email intent", meta: "Sales", value: "88%", note: "Asking for price, demo or support" },
        ],
      },
      {
        key: "rank",
        label: "Rank",
        summary: "Put the best options first.",
        total: "82%",
        tone: "bg-amber-500",
        items: [
          { title: "Next best action", meta: "Sales", value: "83%", note: "Rank deals to work today" },
          { title: "Candidate fit", meta: "Hiring", value: "85%", note: "Order applicants for a role" },
          { title: "Vendor match", meta: "Procurement", value: "80%", note: "Suggest the best supplier" },
        ],
      },
    ],
  },
  capabilities: {
    eyebrow: "A studio for your own AI",
    title: "Everything between your data and a working model",
    intro: "No separate platform to run, and no pipeline to build.",
    items: [
      { icon: Upload, title: "Bring Your Data", body: "Use records already in SortBoxs, or upload files, with fields mapped for you." },
      { icon: Tags, title: "Labelling Tools", body: "Label examples quickly, and let the model suggest labels for you to confirm." },
      { icon: FlaskConical, title: "One-Click Training", body: "Pick a goal and train. Tuning and validation are handled behind the scenes." },
      { icon: GitCompare, title: "Compare Versions", body: "Put two model versions side by side before deciding which one goes live." },
      { icon: Rocket, title: "Secure Deployment", body: "Publish to a private endpoint and use the model across workflows and reports." },
      { icon: History, title: "Monitoring & Retraining", body: "Watch accuracy over time and retrain when the data changes." },
    ],
  },
  ai: {
    eyebrow: "Data ownership",
    title: "Your models, trained on your data, for your eyes only",
    description:
      "Models you build are private to your organisation. Your data isn't mixed with anyone else's, and you control who can use each model.",
    points: [
      "Models and training data stay inside your organisation",
      "Choose which fields a model is allowed to see",
      "Control who can train, review and deploy",
      "Every model has a version history and an audit trail",
    ],
    cards: [
      { icon: Lock, tone: "bg-brand-purple-light text-brand-purple", title: "Private by default", body: "This model was trained only on your tickets. It isn't shared or used to train anyone else's." },
      { icon: ShieldCheck, tone: "bg-emerald-100 text-emerald-700", title: "Field controls", body: "Salary and national ID columns are excluded. Add one only with an admin's approval." },
      { icon: ScrollText, tone: "bg-sky-100 text-sky-700", title: "Audit trail", body: "Version 3 was trained on 8 May by Aisha and deployed after review by Karan." },
    ],
  },
  connected: {
    eyebrow: "Part of one platform",
    title: "Models that work where your team works",
    intro: "A deployed model can be used in workflows, reports, agents and the assistant straight away.",
    slugs: ["crm", "service", "finance", "hrms", "automation"],
    links: {
      crm: "Churn and lead models on every account",
      service: "Ticket classification and routing",
      finance: "Late-payment and expense models",
      hrms: "Attrition and resume models",
      automation: "Use a model's output inside any workflow",
    },
  },
};
