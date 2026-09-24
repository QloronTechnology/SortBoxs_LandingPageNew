import { assets } from "@/config/assets";
import type { Testimonial } from "@/types/common";

// PLACEHOLDER COPY: every entry except the first (which comes from the design) was written
// as sample content. Replace them with real, approved customer testimonials (and their
// permission to use name/company/photo) before this site goes live.
export const testimonials: Testimonial[] = [
  {
    quote:
      "Sortboxs CRM has completely transformed how we manage our leads and customers. The AI insights help us make better decisions every day.",
    name: "Anita Sharma",
    role: "Sales Head, Wave Solutions",
    avatar: assets.illustrations.testimonialAvatar,
    rating: 5,
  },
  {
    quote:
      "Payroll, attendance and leave used to live in three different tools. With Sortboxs HRMS our whole people process runs in one place.",
    name: "Rahul Mehta",
    role: "HR Manager, Brightline Retail",
    rating: 5,
  },
  {
    quote:
      "Invoices, expenses and approvals finally talk to each other. Month-end closing now takes us two days instead of a full week.",
    name: "Priya Nair",
    role: "Finance Lead, Crestview Logistics",
    rating: 5,
  },
  {
    quote:
      "The project boards give every team a clear view of deadlines and workload. We deliver client work faster and with far fewer surprises.",
    name: "Daniel Fernandes",
    role: "Operations Director, Pixelcraft Studio",
    rating: 5,
  },
  {
    quote:
      "Stock levels across our three warehouses are always accurate now. Automatic reorder alerts have nearly eliminated our stock-outs.",
    name: "Sneha Kapoor",
    role: "Supply Chain Head, Urban Basket",
    rating: 5,
  },
  {
    quote:
      "Our support team resolves tickets much faster with every customer's history in one view. Customer satisfaction scores keep going up.",
    name: "Arjun Reddy",
    role: "Customer Success Manager, Nexa Telecom",
    rating: 5,
  },
  {
    quote:
      "AI Interview screens hundreds of candidates for us every week, so our recruiters spend their time only on the strongest applicants.",
    name: "Meera Iyer",
    role: "Talent Acquisition Lead, Quantix Labs",
    rating: 5,
  },
  {
    quote:
      "Vendor management and purchase approvals are now fully transparent. Procurement cycles are shorter and our spend is under control.",
    name: "Vikram Singh",
    role: "Procurement Manager, Apex Manufacturing",
    rating: 4,
  },
];
