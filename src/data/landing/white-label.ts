import { Building2, Globe, Handshake, Mail, Palette, Rocket, Settings, SlidersHorizontal, Tag, LayoutTemplate, ShieldCheck, FileText } from "lucide-react";
import type { ModuleLandingData } from "@/types/moduleLanding";

/** Content for /white-label (Platform → White-Label Options). Layout lives in components/module-landing/. Figures are illustrative. */

export const whiteLabelLanding: ModuleLandingData = {
  slug: "white-label",
  name: "White-Label Options",
  icon: Palette,
  iconTone: "bg-pink-100 text-pink-700",
  hero: {
    eyebrow: "SortBoxs White-Label",
    title: "Your brand, on our",
    highlight: "platform.",
    description:
      "Offer SortBoxs to your own customers under your name, logo, colours and domain, with the engine running quietly underneath.",
    points: ["Your logo, colours and domain", "Your own sign-in page and emails", "Resell or embed, your choice"],
  },
  lifecycle: {
    eyebrow: "How it works",
    title: "From our platform to your product",
    intro: "White-labelling is a configuration job, not a development project.",
    steps: [
      { icon: Palette, title: "Brand it", body: "Upload your logo, choose your colours and set your product name across the whole app." },
      { icon: SlidersHorizontal, title: "Configure it", body: "Choose which modules to include, set your own plans and decide what your customers can customise." },
      { icon: Rocket, title: "Launch it", body: "Go live on your own domain, with branded sign-in, emails, invoices and documents." },
      { icon: Settings, title: "Run it", body: "Manage every customer from one admin console, while we handle updates and uptime." },
    ],
  },
  explorer: {
    eyebrow: "What you can brand",
    title: "From a logo to the whole experience",
    intro: "Pick an area to see what can be changed to make the product look and feel like yours.",
    label: "Branding areas",
    metricLabel: "Customisable",
    itemLabel: "options",
    tabs: [
      {
        key: "branding",
        label: "Look & feel",
        summary: "How it looks.",
        total: "Fully",
        tone: "bg-pink-500",
        items: [
          { title: "Logo and favicon", meta: "Everywhere", value: "Yours", note: "In the app, emails and documents" },
          { title: "Colours and theme", meta: "Light and dark", value: "Yours", note: "Brand colour drives buttons and accents" },
          { title: "Product name", meta: "Throughout", value: "Yours", note: "No SortBoxs mentions unless you want them" },
        ],
      },
      {
        key: "domain",
        label: "Domain & email",
        summary: "Where it lives and how it writes.",
        total: "Your own",
        tone: "bg-sky-500",
        items: [
          { title: "Custom domain", meta: "app.yourcompany.com", value: "Included", note: "With managed certificates" },
          { title: "Branded sign-in", meta: "Login and SSO pages", value: "Yours", note: "Your logo and welcome text" },
          { title: "Emails and invoices", meta: "From your address", value: "Yours", note: "Templates in your voice" },
        ],
      },
      {
        key: "packaging",
        label: "Packaging",
        summary: "What you sell and for how much.",
        total: "Flexible",
        tone: "bg-emerald-500",
        items: [
          { title: "Module bundles", meta: "Pick what's included", value: "Yours", note: "Create editions like Starter and Pro" },
          { title: "Plans and pricing", meta: "Set your own", value: "Yours", note: "Free, trial and paid tiers" },
          { title: "Billing", meta: "Your customers pay you", value: "Yours", note: "We bill you for platform usage" },
        ],
      },
      {
        key: "operations",
        label: "Operations",
        summary: "Running it for many customers.",
        total: "One console",
        tone: "bg-brand-purple",
        items: [
          { title: "Multi-tenant admin", meta: "All customers", value: "One view", note: "Create, suspend and support tenants" },
          { title: "Isolated data", meta: "Per customer", value: "Strict", note: "No customer sees another's data" },
          { title: "Updates", meta: "Handled by us", value: "Automatic", note: "New features reach everyone together" },
        ],
      },
    ],
  },
  capabilities: {
    eyebrow: "White-label, done properly",
    title: "A product your customers think is yours",
    intro: "Not a logo swap. A full rebrand of the experience, with the infrastructure and roadmap still handled for you.",
    items: [
      { icon: Palette, title: "Custom Branding", body: "Your logo, colours and product name in every screen, email and PDF." },
      { icon: Globe, title: "Custom Domain", body: "Serve the app from your own domain, with certificates handled automatically." },
      { icon: Mail, title: "Branded Emails & Documents", body: "Invoices, notifications and reports that come from you and look like you." },
      { icon: Tag, title: "Your Own Plans & Pricing", body: "Build editions from the modules you choose, and charge what you want." },
      { icon: Building2, title: "Multi-Tenant Admin", body: "One console to manage every customer's workspace, users and limits." },
      { icon: Handshake, title: "Partner Support", body: "Onboarding and technical support for you, so you can look after your own customers." },
    ],
  },
  ai: {
    eyebrow: "Under the hood",
    title: "Your brand on top, our engineering underneath",
    description:
      "White-labelling means your customers get a polished product, and you don't have to build or run one.",
    points: [
      "Every customer's data is isolated from the rest",
      "Security, backups and uptime are handled for you",
      "New features and fixes reach your customers automatically",
      "You choose how much of SortBoxs to reveal",
    ],
    cards: [
      { icon: ShieldCheck, tone: "bg-emerald-100 text-emerald-700", title: "Tenant isolation", body: "Each of your customers gets a separate workspace, with its own users, data and permissions." },
      { icon: LayoutTemplate, tone: "bg-pink-100 text-pink-700", title: "Consistent experience", body: "Your branding applies the same way in the web app, mobile apps and emails." },
      { icon: FileText, tone: "bg-sky-100 text-sky-700", title: "Your terms", body: "Your customers sign your terms and privacy policy, not ours." },
    ],
  },
  connected: {
    eyebrow: "Part of one platform",
    title: "Every module can carry your brand",
    intro: "You choose which modules to offer, and they all look and behave as part of your product.",
    slugs: ["crm", "finance", "hrms", "commerce", "ai"],
    links: {
      crm: "Offer a CRM under your own name",
      finance: "Branded invoices and reports",
      hrms: "A people platform with your logo",
      commerce: "A store back office in your colours",
      ai: "AI features presented as yours",
    },
  },
};
