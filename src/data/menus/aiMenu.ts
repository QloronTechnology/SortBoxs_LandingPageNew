import {
  AlignLeft,
  AudioLines,
  BadgeIndianRupee,
  BookOpen,
  Bot,
  Box,
  CalendarPlus,
  ChartColumn,
  ChartLine,
  Eye,
  FileText,
  Headset,
  Leaf,
  Lightbulb,
  ListChecks,
  Megaphone,
  MessageSquareText,
  Package,
  Search,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  UserSearch,
  Users,
  Volume2,
  Workflow,
  Zap,
} from "lucide-react";
import { routes } from "@/config/routes";
import type { MenuFeatureColumn, MenuIconLink } from "./types";

/**
 * Content for the "AI" mega menu (desktop panel + mobile accordion).
 * Links use the existing AI / AI Interview / module pages where they exist; everything else is a
 * "#" placeholder until its page is built.
 */

export const aiMenu = {
  intro: {
    eyebrow: "AI at SortBoxs",
    title: "Work Smarter with AI",
    description:
      "Embedded across every module, Sortboxs AI helps you automate, analyze and make smarter decisions.",
    cta: { label: "Explore AI Features", href: routes.platform.ai },
    highlights: [
      { title: "Built into every module", description: "AI where you work", icon: Zap },
      { title: "Enterprise-ready", description: "Secure & compliant", icon: ShieldCheck },
      { title: "Real business impact", description: "Save time, reduce costs, scale faster", icon: Users },
    ],
  },

  columns: [
    {
      heading: "AI Products",
      items: [
        { label: "Sortboxs AI Assistant", description: "Your intelligent assistant across all modules.", href: routes.platform.ai, icon: Bot, tone: "green" },
        { label: "AI Interview", description: "AI-powered candidate screening and interviews.", href: routes.platform.aiInterview, icon: UserSearch, tone: "orange" },
        { label: "AI Agents", description: "Automate repetitive tasks with intelligent agents.", href: "#", icon: Sparkles, tone: "sky" },
        { label: "AI Analytics", description: "Turn data into insights with AI.", href: "#", icon: ChartColumn, tone: "teal" },
        { label: "AI Search", description: "Find information across your business instantly.", href: "#", icon: Search, tone: "pink" },
        { label: "AI Workflows", description: "Build and automate workflows using AI.", href: "#", icon: Workflow, tone: "purple" },
        { label: "AI Studio (Beta)", description: "Create, customize and deploy your own AI models.", href: "#", icon: Box, tone: "red" },
      ],
    },
    {
      heading: "AI Capabilities",
      items: [
        { label: "Natural Lang. Processing", description: "Interact with your data in natural language.", href: "#", icon: MessageSquareText, tone: "green" },
        { label: "Predictive Analytics", description: "Forecast trends and make proactive decisions.", href: "#", icon: ChartLine, tone: "orange" },
        { label: "Intelligent Automation", description: "Automate processes and reduce manual work.", href: "#", icon: Settings, tone: "sky" },
        { label: "AI Recommendations", description: "Get personalized suggestions and next steps.", href: "#", icon: Lightbulb, tone: "teal" },
        { label: "Document Intelligence", description: "Extract and understand information from documents.", href: "#", icon: FileText, tone: "pink" },
        { label: "Computer Vision", description: "Analyze images and documents with AI.", href: "#", icon: Eye, tone: "purple" },
        { label: "Speech-to-Text", description: "Convert voice to text for faster input.", href: "#", icon: AudioLines, tone: "red" },
        { label: "Text-to-Speech", description: "Turn text into natural voice responses.", href: "#", icon: Volume2, tone: "green" },
      ],
    },
    {
      heading: "Use Cases by Function",
      items: [
        { label: "Sales & CRM", description: "Lead scoring, meeting summaries, next best actions.", href: routes.platform.sales, icon: TrendingUp, tone: "green" },
        { label: "Customer Service", description: "Auto ticket routing, response suggestions, sentiment analysis.", href: routes.platform.service, icon: Headset, tone: "orange" },
        { label: "HR & People", description: "AI interview, resume screening, employee insights.", href: routes.platform.hrms, icon: Users, tone: "sky" },
        { label: "Finance", description: "Expense analysis, fraud detection, financial forecasting.", href: routes.platform.finance, icon: BadgeIndianRupee, tone: "teal" },
        { label: "Marketing", description: "Content generation, campaign insights, audience analysis.", href: routes.platform.marketing, icon: Megaphone, tone: "pink" },
        { label: "Projects", description: "Smart task assignment, risk prediction, project insights.", href: routes.platform.projects, icon: AlignLeft, tone: "purple" },
        { label: "Procurement", description: "Spend analysis, vendor matching, contract review.", href: routes.platform.procurement, icon: ShoppingCart, tone: "red" },
        { label: "Inventory", description: "Demand forecasting, stock optimization, alerts.", href: routes.platform.inventory, icon: Package, tone: "green" },
      ],
    },
  ] satisfies MenuFeatureColumn[],

  featured: {
    image: {
      src: "/images/ai-meet-sortbox.png",
      alt: "Meet SortBox AI — your always-on AI assistant that answers questions, generates reports, automates tasks and finds insights.",
      width: 674,
      height: 796,
    },
    cta: { label: "Try Sortboxs AI", href: routes.platform.ai },
    quickLinks: [
      { label: "View All AI Features", href: routes.platform.ai, icon: Sparkles },
      { label: "AI Use Cases", href: "/use-cases", icon: ListChecks },
      { label: "AI Success Stories", href: "#", icon: Lightbulb },
      { label: "AI Documentation", href: "#", icon: BookOpen },
      { label: "Request a Demo", href: "#", icon: CalendarPlus },
    ] satisfies MenuIconLink[],
  },

  strip: {
    partner: { title: "Trusted AI Partner", description: "Built on leading AI models and enterprise security." },
    partnerLogos: {
      src: "/images/ai-partners.png",
      alt: "OpenAI, Microsoft Azure, AWS and Google Cloud",
      width: 940,
      height: 100,
    },
    points: [
      { title: "Your Data Stays Secure", description: "Enterprise-grade security and privacy.", icon: ShieldCheck },
      { title: "Responsible AI", description: "Ethical, transparent and human-centric.", icon: Leaf },
    ],
  },
};

/** Flattened sections for the mobile accordion. */
export const aiMobileSections = [
  ...aiMenu.columns.map((column) => ({
    heading: column.heading,
    items: column.items.map(({ label, href }) => ({ label, href })),
  })),
  { heading: "Quick Links", items: aiMenu.featured.quickLinks.map(({ label, href }) => ({ label, href })) },
];
