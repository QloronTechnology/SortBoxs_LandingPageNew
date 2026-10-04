import { FileText, MessageCircle, Mail, Phone, Share2, type LucideIcon } from "lucide-react";

export type ChannelName = "Email" | "Live chat" | "Phone" | "Social" | "Web form";

export const channelMeta: Record<ChannelName, { icon: LucideIcon; tone: string; soft: string; arrives: string; sees: string }> = {
  Email: { icon: Mail, tone: "bg-violet-500", soft: "bg-violet-100 text-violet-700", arrives: "Customers write to your support address.", sees: "The full email thread, with attachments, on the ticket." },
  "Live chat": { icon: MessageCircle, tone: "bg-sky-500", soft: "bg-sky-100 text-sky-700", arrives: "A visitor starts a chat from your website.", sees: "A live conversation, with the page they were on." },
  Phone: { icon: Phone, tone: "bg-emerald-500", soft: "bg-emerald-100 text-emerald-700", arrives: "A call is logged against the customer.", sees: "Call length, notes and the agent who took it." },
  Social: { icon: Share2, tone: "bg-amber-500", soft: "bg-amber-100 text-amber-700", arrives: "Messages and mentions on social channels.", sees: "The message in context, ready to reply to." },
  "Web form": { icon: FileText, tone: "bg-rose-500", soft: "bg-rose-100 text-rose-700", arrives: "A customer submits your contact form.", sees: "Every field they filled in, on a new ticket." },
};

export const channelOrder = Object.keys(channelMeta) as ChannelName[];

export const samples: Record<ChannelName, string> = {
  Email: "Hi, I could not download my March invoice. Can you help?",
  "Live chat": "Following up on my email. Are you able to look at it now?",
  Phone: "Called in, 4 min. Customer asked for an update on the invoice.",
  Social: "Still waiting on my invoice from @SortBoxs. Any news?",
  "Web form": "Re: invoice. I filled this in because I could not reach anyone.",
};
