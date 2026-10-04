"use client";

import { useEffect, useState } from "react";
import { Loader2, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { PreviewFrame } from "../../PreviewFrame";
import { Chips, SectionLabel } from "./parts";

const endpoints = [
  {
    key: "customers",
    label: "List customers",
    method: "GET",
    path: "/v1/customers?limit=2",
    body: "",
    status: "200 OK",
    ms: 118,
    response: `{\n  "data": [\n    { "id": "cus_1042", "name": "Aurora Textiles" },\n    { "id": "cus_1041", "name": "Zenith Pharma" }\n  ],\n  "has_more": true\n}`,
  },
  {
    key: "deal",
    label: "Create a deal",
    method: "POST",
    path: "/v1/deals",
    body: `{ "name": "Renewal", "value": 340000, "stage": "proposal" }`,
    status: "201 Created",
    ms: 164,
    response: `{\n  "id": "deal_2093",\n  "name": "Renewal",\n  "stage": "proposal",\n  "created": true\n}`,
  },
  {
    key: "invoices",
    label: "Overdue invoices",
    method: "GET",
    path: "/v1/invoices?status=overdue",
    body: "",
    status: "200 OK",
    ms: 97,
    response: `{\n  "data": [\n    { "id": "inv_1041", "amount": 210000,\n      "status": "overdue" }\n  ],\n  "has_more": false\n}`,
  },
];
const events = [
  { key: "deal.won", label: "deal.won" },
  { key: "invoice.paid", label: "invoice.paid" },
  { key: "ticket.created", label: "ticket.created" },
];

export function ApiWebhooksDashboard() {
  const [endpointKey, setEndpointKey] = useState("customers");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [enabled, setEnabled] = useState<string[]>(["deal.won", "invoice.paid"]);
  const [serverDown, setServerDown] = useState(false);
  const [pending, setPending] = useState(0);
  const [log, setLog] = useState<string[]>([]);
  const endpoint = endpoints.find((item) => item.key === endpointKey)!;

  useEffect(() => {
    if (!loading) return;
    const timer = setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 700);
    return () => clearTimeout(timer);
  }, [loading]);

  const sendTest = () => {
    if (enabled.length === 0) return;
    const lines: string[] = [];
    if (serverDown) {
      enabled.forEach((event) => lines.push(`${event} → 503 · retry in 30 s (1 of 3)`));
      setPending((current) => current + enabled.length);
    } else {
      if (pending > 0) lines.push(`↻ ${pending} retried event${pending > 1 ? "s" : ""} delivered in order`);
      enabled.forEach((event) => lines.push(`${event} → 200 · 84 ms · signature ✓`));
      setPending(0);
    }
    setLog((current) => [...lines, ...current].slice(0, 4));
  };

  const insight = loading
    ? "Calling the API with your test key…"
    : serverDown && pending > 0
      ? `${pending} event${pending > 1 ? "s are" : " is"} waiting to be retried. Switch your server back on and send again to see them delivered.`
      : sent
        ? `${endpoint.method} ${endpoint.path.split("?")[0]} returned ${endpoint.status} in ${endpoint.ms} ms. The same pattern works for every module.`
        : "Pick an endpoint and press Send, then fire a test webhook. Everything here is a safe sandbox.";

  return (
    <PreviewFrame title="Developer Console" period="Sandbox" insight={insight} badge="REST + webhooks">
      <div className="mt-4 flex items-center justify-between gap-2">
        <Chips
          label="Endpoint"
          options={endpoints.map((item) => ({ key: item.key, label: item.label }))}
          value={endpointKey}
          onChange={(key) => {
            setEndpointKey(key);
            setSent(false);
            setLoading(false);
          }}
        />
        <button
          type="button"
          disabled={loading}
          onClick={() => {
            setSent(false);
            setLoading(true);
          }}
          className="flex items-center gap-1.5 rounded-lg bg-brand-purple px-3 py-1.5 text-[11px] font-semibold text-white outline-none hover:bg-brand-purple-dark focus-visible:ring-2 focus-visible:ring-brand-purple/60 disabled:opacity-40"
        >
          <Send className="size-3" aria-hidden /> {loading ? "Sending…" : "Send"}
        </button>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div className="rounded-xl bg-brand-navy p-3">
          <SectionLabel className="text-white/50">Request</SectionLabel>
          <pre className="mt-1.5 min-h-[88px] overflow-x-auto font-mono text-[10px] leading-relaxed whitespace-pre-wrap text-emerald-300">
            {`curl https://api.sortboxs.com${endpoint.path} \\\n  -X ${endpoint.method} \\\n  -H "Authorization: Bearer sk_test_••••"${endpoint.body ? ` \\\n  -d '${endpoint.body}'` : ""}`}
          </pre>
        </div>
        <div className="rounded-xl bg-brand-surface p-3">
          <div className="flex items-center justify-between">
            <SectionLabel>Response</SectionLabel>
            {sent && (
              <span className="demo-rise flex items-center gap-1.5 text-[10px] font-bold text-emerald-700">
                <span className="rounded-full bg-emerald-100 px-1.5 py-0.5">{endpoint.status}</span>
                {endpoint.ms} ms
              </span>
            )}
          </div>
          {loading ? (
            <p className="mt-6 flex items-center justify-center gap-2 text-[11px] text-brand-muted">
              <Loader2 className="size-4 animate-spin text-brand-purple" aria-hidden /> Waiting…
            </p>
          ) : sent ? (
            <pre className="demo-rise mt-1.5 min-h-[88px] overflow-x-auto font-mono text-[10px] leading-relaxed whitespace-pre-wrap text-brand-text">{endpoint.response}</pre>
          ) : (
            <p className="mt-6 text-center text-[11px] text-brand-muted">Press Send to see the response.</p>
          )}
        </div>
      </div>

      <div className="mt-3 rounded-xl bg-white p-3 ring-1 ring-brand-border">
        <div className="flex items-center justify-between gap-2">
          <SectionLabel>Webhook events</SectionLabel>
          <button
            type="button"
            role="switch"
            aria-checked={serverDown}
            onClick={() => setServerDown((current) => !current)}
            className="flex items-center gap-1.5 text-[10px] font-semibold text-brand-muted outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/60"
          >
            <span className={cn("relative h-4 w-7 rounded-full transition-colors", serverDown ? "bg-red-500" : "bg-brand-border")}>
              <span className={cn("absolute top-0.5 size-3 rounded-full bg-white shadow transition-all", serverDown ? "left-[14px]" : "left-0.5")} />
            </span>
            My server is down
          </button>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {events.map((event) => {
            const on = enabled.includes(event.key);
            return (
              <button
                key={event.key}
                type="button"
                aria-pressed={on}
                onClick={() => setEnabled((current) => (on ? current.filter((key) => key !== event.key) : [...current, event.key]))}
                className={cn(
                  "rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold outline-none ring-1 transition-colors focus-visible:ring-2 focus-visible:ring-brand-purple/60",
                  on ? "bg-brand-purple-light text-brand-purple ring-brand-purple/40" : "bg-white text-brand-muted ring-brand-border"
                )}
              >
                {event.label}
              </button>
            );
          })}
          <button
            type="button"
            disabled={enabled.length === 0}
            onClick={sendTest}
            className="ml-auto rounded-lg bg-emerald-500 px-3 py-1 text-[11px] font-semibold text-white outline-none hover:bg-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-300 disabled:opacity-40"
          >
            Send test event
          </button>
        </div>
        <ul className="mt-2 min-h-[56px] space-y-1 font-mono text-[10px]" aria-live="polite">
          {log.length === 0 && <li className="text-brand-muted">Delivery log will appear here.</li>}
          {log.map((line, index) => (
            <li key={`${line}-${index}`} className={cn("demo-rise truncate", line.includes("503") ? "text-red-600" : line.startsWith("↻") ? "text-brand-purple" : "text-emerald-700")}>
              {line}
            </li>
          ))}
        </ul>
      </div>
    </PreviewFrame>
  );
}
