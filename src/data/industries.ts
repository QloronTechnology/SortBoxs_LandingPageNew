import {
  Cpu,
  HeartPulse,
  GraduationCap,
  Factory,
  ShoppingCart,
  Home,
  Landmark,
  Link2,
  Wrench,
  Users,
} from "lucide-react";
import { routes } from "@/config/routes";
import type { IndustryItem } from "@/types/common";

export const industries: IndustryItem[] = [
  { name: "IT & Technology", icon: Cpu, href: routes.industries.technology },
  { name: "Healthcare", icon: HeartPulse, href: routes.industries.healthcare },
  { name: "Education", icon: GraduationCap, href: routes.industries.education },
  { name: "Manufacturing", icon: Factory, href: routes.industries.manufacturing },
  { name: "Retail & eCommerce", icon: ShoppingCart, href: routes.industries.retail },
  { name: "Real Estate", icon: Home, href: routes.industries.realEstate },
  { name: "Financial Services", icon: Landmark, href: routes.industries.financialServices },
  { name: "Professional Services", icon: Link2, href: routes.industries.professionalServices },
  { name: "Non-Profit", icon: Wrench, href: routes.industries.nonProfit },
  { name: "Agencies", icon: Users, href: routes.industries.agencies },
];
