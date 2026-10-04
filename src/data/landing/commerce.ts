import { ChartLine, ClipboardList, CreditCard, Contact, Package, Plug, ShoppingCart, Store, Tag, Truck } from "lucide-react";
import type { ModuleLandingData } from "@/types/moduleLanding";

/** Content for /commerce. Layout lives in components/module-landing/. Figures are illustrative. */

export const commerceLanding: ModuleLandingData = {
  slug: "commerce",
  name: "Commerce",
  hero: {
    eyebrow: "SortBoxs Commerce",
    title: "Manage products, orders and",
    highlight: "transactions.",
    description: "Manage products, orders and transactions across every sales channel.",
    points: ["One catalog for every channel", "Orders, payments and shipping in one view", "Stock and customers always in sync"],
  },
  lifecycle: {
    eyebrow: "How it works",
    title: "From a product to a happy customer",
    intro: "Every sale flows from catalog to cart to order, with stock, payment and customer records updated along the way.",
    steps: [
      { icon: Package, title: "Product", body: "Manage your catalog once, with variants, pricing and images, and publish it to every channel." },
      { icon: ShoppingCart, title: "Cart", body: "Shoppers check out with the payment methods they prefer, with discounts and taxes applied." },
      { icon: ClipboardList, title: "Order", body: "Orders from every channel land in one queue, with stock reserved and fulfilment started." },
      { icon: Contact, title: "Customer", body: "Every purchase builds the customer's profile, ready for support, marketing and repeat sales." },
    ],
  },
  explorer: {
    eyebrow: "Order pipeline",
    title: "Follow every order to the doorstep",
    intro: "Pick a status to see the orders in it, from any channel.",
    label: "Order statuses",
    metricLabel: "Order value",
    itemLabel: "orders",
    tabs: [
      {
        key: "new",
        label: "New",
        summary: "Paid and waiting to be picked.",
        total: "₹2.4L",
        tone: "bg-brand-purple",
        items: [
          { title: "Order #5524", meta: "Orbit Retail · Online store", value: "₹42.1K", note: "Paid by card" },
          { title: "Order #5523", meta: "Lotus Clinics · Marketplace", value: "₹12.6K", note: "Express shipping" },
          { title: "Order #5522", meta: "Summit Constructions · Online store", value: "₹68.0K", note: "Pay on delivery" },
        ],
      },
      {
        key: "packed",
        label: "Packed",
        summary: "Ready for the courier.",
        total: "₹1.8L",
        tone: "bg-sky-500",
        items: [
          { title: "Order #5521", meta: "Aurora Textiles · Online store", value: "₹18.4K", note: "Pickup at 4 PM" },
          { title: "Order #5519", meta: "Zenith Pharma · Marketplace", value: "₹9.2K", note: "Label printed" },
          { title: "Order #5517", meta: "Greenfield Realty · Online store", value: "₹31.0K", note: "Fragile, double boxed" },
        ],
      },
      {
        key: "shipped",
        label: "Shipped",
        summary: "On the way to the customer.",
        total: "₹3.1L",
        tone: "bg-amber-500",
        items: [
          { title: "Order #5520", meta: "Helix Motors · Marketplace", value: "₹7.9K", note: "Arrives tomorrow" },
          { title: "Order #5514", meta: "Coral Hospitality · Online store", value: "₹54.3K", note: "Out for delivery" },
          { title: "Order #5511", meta: "Pioneer Edu · Online store", value: "₹22.7K", note: "In transit, day 2" },
        ],
      },
      {
        key: "delivered",
        label: "Delivered",
        summary: "Completed orders.",
        total: "₹9.6L",
        tone: "bg-emerald-500",
        items: [
          { title: "Order #5503", meta: "Northwind Logistics · Online store", value: "₹36.8K", note: "Delivered yesterday" },
          { title: "Order #5498", meta: "Skyline Infra · Marketplace", value: "₹14.5K", note: "Rated 5 of 5" },
          { title: "Order #5492", meta: "Vertex Labs · Online store", value: "₹61.2K", note: "Invoice sent" },
        ],
      },
    ],
  },
  capabilities: {
    eyebrow: "Everything you need to sell",
    title: "Run your whole selling operation from one place",
    intro: "Whatever channels you sell on, your catalog, orders and customers stay in one system.",
    items: [
      { icon: Package, title: "Product Catalog", body: "One catalog with variants, bundles, pricing tiers and rich product pages." },
      { icon: ClipboardList, title: "Order Management", body: "Every order from every channel in one queue, with status, notes and history." },
      { icon: Store, title: "Multi-Channel Selling", body: "Sell on your store, marketplaces and in person, with inventory shared across all of them." },
      { icon: CreditCard, title: "Payment Processing", body: "Accept cards, UPI, net banking and cash on delivery, with payments matched automatically." },
      { icon: Truck, title: "Shipping & Fulfillment", body: "Print labels, book couriers and give customers tracking, all from the order." },
      { icon: Plug, title: "Storefront Integrations", body: "Connect your existing storefront or marketplace so orders and stock stay in sync." },
    ],
  },
  ai: {
    eyebrow: "AI for sellers",
    title: "Sell more, with less guesswork",
    description: "SortBoxs AI studies your orders, carts and stock to help you price, promote and plan.",
    points: [
      "Recovers abandoned carts with timely offers",
      "Suggests prices based on demand and competition",
      "Forecasts demand so you stock the right products",
      "Spots fraud and failed-payment patterns",
    ],
    cards: [
      { icon: ShoppingCart, tone: "bg-amber-100 text-amber-700", title: "Cart recovery", body: "46 mobile carts were abandoned at payment. A 5% offer could recover about 12 of them." },
      { icon: Tag, tone: "bg-brand-purple-light text-brand-purple", title: "Pricing suggestion", body: "Product 118 sells out fast at this price. Testing ₹50 higher could add margin." },
      { icon: ChartLine, tone: "bg-emerald-100 text-emerald-700", title: "Demand forecast", body: "Festive orders should peak in 9 days. Reorder the top 10 products now." },
    ],
  },
  connected: {
    eyebrow: "Part of one platform",
    title: "Commerce wired into your whole business",
    intro: "Orders update stock, create invoices and build customer records without anyone keying them in.",
    slugs: ["inventory", "finance", "crm", "marketing", "analytics"],
    links: {
      inventory: "Orders reserve and release stock in real time",
      finance: "Every order becomes an invoice and a payment",
      crm: "Customers and order history on one profile",
      marketing: "Campaigns aimed at real purchase behaviour",
      analytics: "Sales, margin and channel reporting",
    },
  },
};