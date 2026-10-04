import {
  Activity,
  BarChart3,
  Blocks,
  Bot,
  BrainCircuit,
  Cloud,
  CloudCog,
  CodeXml,
  Compass,
  Cpu,
  DatabaseBackup,
  FolderKanban,
  Gauge,
  GitBranch,
  Globe,
  Headphones,
  IndianRupee,
  Layers,
  LayoutGrid,
  Lightbulb,
  Lock,
  Megaphone,
  MessagesSquare,
  Mic,
  MonitorSmartphone,
  Network,
  Package,
  Palette,
  PlayCircle,
  Plug,
  RefreshCw,
  Rocket,
  ScanEye,
  SearchCode,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Store,
  TrendingUp,
  UserSearch,
  Users,
  UsersRound,
  WandSparkles,
  Webhook,
  Workflow,
  Zap,
} from "lucide-react";
import { routes } from "@/config/routes";
import type { MenuFeatureColumn, MenuIconLink, MenuLink } from "./types";

export type { MenuFeature, MenuFeatureColumn, MenuIconLink, MenuLink, MenuTone } from "./types";

/**
 * Content for the "Platform" mega menu (desktop panel + mobile accordion).
 * Links use a real route where the page already exists and "#" as a placeholder elsewhere.
 */

export const platformMenu = {
  intro: {
    eyebrow: "The SortBoxs Platform",
    title: "One Platform. Endless Possibilities.",
    description:
      "A complete, modular platform that connects your people, processes and data — powered by AI.",
    cta: { label: "Explore the Platform", href: routes.platform.all },
    links: [
      { label: "Platform Overview", href: routes.platform.all, icon: LayoutGrid },
      { label: "How It Works", href: routes.platform.howItWorks, icon: Workflow },
      { label: "Architecture & Security", href: "/security", icon: ShieldCheck },
      { label: "Integrations", href: routes.integrations, icon: Plug },
      { label: "Deployment Options", href: routes.platform.cloudOnPremise, icon: Rocket },
      { label: "Scalability & Performance", href: routes.platform.scalableArchitecture, icon: Gauge },
      { label: "Mobile Apps", href: routes.platform.mobileDesktopApps, icon: Smartphone },
      { label: "Developer Platform", href: routes.platform.apiWebhooks, icon: CodeXml },
      { label: "White-Label Options", href: routes.platform.whiteLabel, icon: Palette },
      { label: "Platform Tour", href: routes.platform.tour, icon: Compass },
    ] satisfies MenuIconLink[],
    video: { title: "Watch 2 Min Overview", subtitle: "See SortBox in action", href: routes.platform.tour },
  },

  columns: [
    {
      heading: "Core Modules",
      action: { label: "View All Modules", href: routes.platform.all },
      items: [
        { label: "CRM", description: "Manage customers & pipelines", href: routes.platform.crm, icon: Users, tone: "green" },
        { label: "Sales", description: "Drive revenue growth", href: routes.platform.sales, icon: TrendingUp, tone: "orange" },
        { label: "Customer Service", description: "Deliver exceptional support", href: routes.platform.service, icon: Headphones, tone: "teal" },
        { label: "HRMS", description: "Manage your people", href: routes.platform.hrms, icon: UsersRound, tone: "green" },
        { label: "Finance", description: "Track expenses & financials", href: routes.platform.finance, icon: IndianRupee, tone: "pink" },
        { label: "Projects", description: "Plan, execute & deliver", href: routes.platform.projects, icon: FolderKanban, tone: "purple" },
        { label: "Procurement", description: "Manage vendors & purchases", href: routes.platform.procurement, icon: ShoppingCart, tone: "red" },
        { label: "Inventory", description: "Track stock & warehouses", href: routes.platform.inventory, icon: Package, tone: "purple" },
        { label: "Marketing", description: "Run campaigns & grow", href: routes.platform.marketing, icon: Megaphone, tone: "teal" },
        { label: "Analytics", description: "Turn data into insights", href: routes.platform.analytics, icon: BarChart3, tone: "blue" },
        { label: "Automation", description: "Workflows & productivity", href: routes.platform.automation, icon: Workflow, tone: "pink" },
        { label: "Commerce", description: "Products, orders & customers", href: routes.platform.commerce, icon: Store, tone: "purple" },
      ],
    },
    {
      heading: "AI-Powered Capabilities",
      action: { label: "Explore All", href: routes.platform.ai },
      items: [
        { label: "SortBox AI Assistant", description: "Your intelligent assistant across all modules", href: routes.platform.ai, icon: Bot, tone: "green" },
        { label: "AI Interview", description: "AI-powered recruitment & candidate screening", href: routes.platform.aiInterview, icon: UserSearch, tone: "orange" },
        { label: "AI Agents", description: "Automate complex business tasks", href: routes.platform.aiAgents, icon: Sparkles, tone: "blue" },
        { label: "AI Analytics", description: "Predict, analyze and get actionable insights", href: routes.platform.aiAnalytics, icon: BrainCircuit, tone: "green" },
        { label: "Natural Language Processing", description: "Interact with your business data in natural language", href: routes.platform.nlp, icon: MessagesSquare, tone: "pink" },
        { label: "Computer Vision", description: "Analyze documents, images and files", href: routes.platform.computerVision, icon: ScanEye, tone: "purple" },
        { label: "Speech-to-Text & Text-to-Speech", description: "Convert voice to text and vice versa", href: routes.platform.speech, icon: Mic, tone: "red" },
        { label: "AI Recommendations", description: "Get personalized suggestions and next best actions", href: routes.platform.aiRecommendations, icon: Lightbulb, tone: "purple" },
        { label: "Intelligent Automation", description: "Automate processes and reduce manual work", href: routes.platform.intelligentAutomation, icon: Zap, tone: "teal" },
        { label: "Custom AI Models", description: "Train and deploy your own AI models", href: routes.platform.customModels, icon: Cpu, tone: "blue" },
        { label: "Generative AI", description: "Create content, summaries and reports", href: routes.platform.generativeAi, icon: WandSparkles, tone: "pink" },
        { label: "AI Search", description: "Find information across your organization", href: routes.platform.aiSearch, icon: SearchCode, tone: "purple" },
      ],
    },
    {
      heading: "Technology & Infrastructure",
      items: [
        { label: "Cloud & On-Premise", description: "Flexible deployment options", href: routes.platform.cloudOnPremise, icon: Cloud, tone: "green" },
        { label: "Multi-Cloud Support", description: "AWS, Azure, Google Cloud", href: routes.platform.multiCloud, icon: CloudCog, tone: "orange" },
        { label: "High Availability", description: "99.9% uptime SLA", href: routes.platform.highAvailability, icon: Activity, tone: "blue" },
        { label: "Scalable Architecture", description: "Grows with your business", href: routes.platform.scalableArchitecture, icon: Network, tone: "green" },
        { label: "Enterprise Security", description: "Data encryption & compliance", href: "/security", icon: Lock, tone: "pink" },
        { label: "Global Infrastructure", description: "US, Europe, Asia regions", href: routes.platform.globalInfrastructure, icon: Globe, tone: "purple" },
        { label: "Backup & Disaster Recovery", description: "Your data, always protected", href: routes.platform.backupRecovery, icon: DatabaseBackup, tone: "red" },
        { label: "Performance Monitoring", description: "Real-time system health", href: routes.platform.performanceMonitoring, icon: Gauge, tone: "purple" },
        { label: "API & Webhooks", description: "Integrate with anything", href: routes.platform.apiWebhooks, icon: Webhook, tone: "teal" },
        { label: "Mobile & Desktop Apps", description: "Work from anywhere", href: routes.platform.mobileDesktopApps, icon: MonitorSmartphone, tone: "blue" },
        { label: "Microservices Architecture", description: "Built for scale and reliability", href: routes.platform.microservices, icon: Blocks, tone: "pink" },
        { label: "DevOps & CI/CD", description: "Automated deployment pipeline", href: routes.platform.devops, icon: GitBranch, tone: "purple" },
      ],
    },
  ] satisfies MenuFeatureColumn[],

  promo: {
    eyebrow: "See SortBoxs in Action",
    title: "A Smarter Way to Run Your Business",
    description:
      "Watch a quick tour to see how SortBox brings all your business functions together in one powerful platform.",
    cta: { label: "Watch Platform Tour", href: "#" },
    image: { src: "/images/platform-dashboard.png", alt: "SortBoxs dashboard preview", width: 780, height: 628 },
    quickLinks: [
      { label: "View All Modules", href: routes.platform.all },
      { label: "Request a Demo", href: routes.demo },
      { label: "Explore Use Cases", href: "/use-cases" },
      { label: "Platform Documentation", href: "#" },
    ] satisfies MenuLink[],
    whyChoose: [
      "All-in-One Platform",
      "AI at the Core",
      "Enterprise-Grade Security",
      "Flexible Deployment",
      "Built for Scale",
    ],
  },

  highlights: [
    { title: "Built for Modern Business", description: "Flexible, secure and scalable", icon: Layers },
    { title: "Enterprise-Grade Security", description: "SOC 2, ISO 27001 ready", icon: ShieldCheck },
    { title: "Seamless Integrations", description: "Connections with 100+ tools", icon: Plug },
    { title: "Always Evolving", description: "Regular updates & new features", icon: RefreshCw },
  ],

  support: { title: "Need a custom solution?", subtitle: "Talk to our experts", href: routes.demo, icon: PlayCircle },
};

/** Flattened sections for the mobile accordion (hamburger menu). */
export const platformMobileSections = [
  { heading: platformMenu.intro.eyebrow, items: platformMenu.intro.links.map(({ label, href }) => ({ label, href })) },
  ...platformMenu.columns.map((column) => ({
    heading: column.heading,
    items: column.items.map(({ label, href }) => ({ label, href })),
  })),
  { heading: "Quick Links", items: platformMenu.promo.quickLinks },
];
