import { assets } from "@/config/assets";
import type { ModulePageData } from "@/types/module";

export const servicePage: ModulePageData = {
  slug: "service",
  name: "Customer Service",
  badge: "CUSTOMER SERVICE",
  icon: assets.modules.customerService,
  heading: "Deliver exceptional support experiences.",
  description:
    "Resolve tickets faster, track SLAs and keep customers happy with a unified service desk.",
  features: [
    "Ticket Management",
    "Omnichannel Support",
    "SLA Tracking",
    "Knowledge Base",
    "Customer Satisfaction",
    "AI Ticket Routing",
  ],
  cta: "Explore Customer Service",
};
