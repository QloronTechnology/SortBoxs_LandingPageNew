import { assets } from "@/config/assets";
import type { IntegrationItem } from "@/types/common";

export const integrations: IntegrationItem[] = [
  { name: "Google Workspace", logo: assets.integrations.googleWorkspace, width: 256, height: 33, wordmark: true },
  { name: "Microsoft 365", logo: assets.integrations.microsoft365, width: 118, height: 97 },
  { name: "Slack", logo: assets.integrations.slack, width: 64, height: 98 },
  { name: "Teams", logo: assets.integrations.teams, width: 64, height: 96 },
  { name: "Zoom", logo: assets.integrations.zoom, width: 64, height: 98 },
  { name: "WhatsApp", logo: assets.integrations.whatsapp, width: 92, height: 112 },
  { name: "Shopify", logo: assets.integrations.shopify, width: 68, height: 100 },
  { name: "WooCommerce", logo: assets.integrations.woocommerce, width: 128, height: 120 },
  { name: "AWS", logo: assets.integrations.aws, width: 84, height: 91 },
  { name: "Google Calendar", logo: assets.integrations.googleCalendar, width: 140, height: 98 },
];
