import { AudioLines, BrainCircuit, FilePen, ListChecks, Mic, SlidersHorizontal, Users, Volume2 } from "lucide-react";
import type { ModuleLandingData } from "@/types/moduleLanding";

/** Content for /speech-to-text. Layout lives in components/module-landing/. Figures are illustrative. */

export const speechLanding: ModuleLandingData = {
  slug: "speech-to-text",
  name: "Speech-to-Text & Text-to-Speech",
  icon: Mic,
  iconTone: "bg-red-100 text-red-700",
  hero: {
    eyebrow: "SortBoxs Voice",
    title: "Give your business a",
    highlight: "voice, and ears.",
    description:
      "Turn calls and meetings into searchable text and action items, and turn text into natural voice replies.",
    points: ["Transcribe calls and meetings automatically", "Speak a note and it lands on the right record", "Natural voice replies for customers and teams"],
  },
  lifecycle: {
    eyebrow: "How it works",
    title: "From a spoken word to the right action",
    intro: "Voice becomes text, text becomes understanding, and understanding becomes a reply or a task.",
    steps: [
      { icon: Mic, title: "Speak", body: "Record a call or meeting, dictate a note on mobile or take a customer's voice message." },
      { icon: AudioLines, title: "Transcribe", body: "Speech is turned into text with a label for each speaker and a timestamp on every line." },
      { icon: BrainCircuit, title: "Understand", body: "AI summarises the conversation and pulls out decisions, questions and action items." },
      { icon: Volume2, title: "Respond", body: "Send a spoken reply, read a message aloud or update the record, all in a natural voice." },
    ],
  },
  explorer: {
    eyebrow: "Where voice helps",
    title: "Voice across the work your team already does",
    intro: "Pick a use case to see what gets captured and where it goes.",
    label: "Voice use cases",
    metricLabel: "This week",
    itemLabel: "examples",
    tabs: [
      {
        key: "meetings",
        label: "Meetings",
        summary: "Notes written for you.",
        total: "62 meetings",
        tone: "bg-brand-purple",
        items: [
          { title: "Weekly pipeline review", meta: "Sales · 38 min", value: "Summary", note: "5 action items assigned" },
          { title: "Client kickoff", meta: "Projects · 52 min", value: "Summary", note: "Timeline and risks captured" },
          { title: "Hiring sync", meta: "HR · 24 min", value: "Summary", note: "3 candidates shortlisted" },
        ],
      },
      {
        key: "calls",
        label: "Calls",
        summary: "Customer calls turned into records.",
        total: "318 calls",
        tone: "bg-sky-500",
        items: [
          { title: "Support call with Acme Corp", meta: "Customer Service", value: "Resolved", note: "Ticket created and closed" },
          { title: "Discovery call with Zenith", meta: "Sales", value: "Logged", note: "Next step: send pricing" },
          { title: "Renewal call with Orbit Retail", meta: "CRM", value: "Logged", note: "Sentiment: positive" },
        ],
      },
      {
        key: "notes",
        label: "Voice notes",
        summary: "Speak it, and it's saved.",
        total: "204 notes",
        tone: "bg-emerald-500",
        items: [
          { title: "After a site visit", meta: "Field sales", value: "Saved", note: "Added to the account timeline" },
          { title: "Expense by voice", meta: "Finance", value: "Created", note: "₹480 taxi, category Travel" },
          { title: "Task by voice", meta: "Projects", value: "Created", note: "Due Friday, assigned to Karan" },
        ],
      },
      {
        key: "replies",
        label: "Voice replies",
        summary: "Text turned into natural speech.",
        total: "1,240 plays",
        tone: "bg-amber-500",
        items: [
          { title: "Order update", meta: "Commerce", value: "Played", note: "“Your order has shipped”" },
          { title: "Appointment reminder", meta: "Customer Service", value: "Played", note: "Sent the day before" },
          { title: "Daily briefing", meta: "Executives", value: "Played", note: "Headlines read aloud" },
        ],
      },
    ],
  },
  capabilities: {
    eyebrow: "Voice for the whole platform",
    title: "Listen, understand and speak back",
    intro: "Voice is just another way into SortBoxs, with the same records, permissions and search.",
    items: [
      { icon: AudioLines, title: "Live Transcription", body: "Accurate text for calls and meetings, ready within moments of finishing." },
      { icon: Users, title: "Speaker Labels", body: "Know who said what, with timestamps you can click to jump to the audio." },
      { icon: ListChecks, title: "Summaries & Action Items", body: "Get a short summary plus decisions and tasks, assigned to the right people." },
      { icon: FilePen, title: "Voice to Records", body: "Dictate notes, expenses and tasks and have them saved to the right place." },
      { icon: Volume2, title: "Natural Voice Replies", body: "Read messages and updates aloud in a clear, natural-sounding voice." },
      { icon: SlidersHorizontal, title: "Voices & Speed", body: "Choose a voice, set the speed and adjust how names and terms are pronounced." },
    ],
  },
  ai: {
    eyebrow: "Privacy and control",
    title: "Voice data you stay in charge of",
    description: "Recordings can contain sensitive things. You decide what is recorded, who can hear it and how long it's kept.",
    points: [
      "Tell people before recording begins",
      "Choose who can listen to or read each transcript",
      "Keep audio for as long as you decide, or only the text",
      "Search across transcripts the way you search records",
    ],
    cards: [
      { icon: ListChecks, tone: "bg-brand-purple-light text-brand-purple", title: "Action items found", body: "3 tasks were found in the pipeline review. Assign them to the people named?" },
      { icon: Users, tone: "bg-sky-100 text-sky-700", title: "Speakers identified", body: "Anita spoke for 14 minutes and Rohan for 9. Transcript labels are ready to review." },
      { icon: AudioLines, tone: "bg-emerald-100 text-emerald-700", title: "Searchable", body: "“Find the call where pricing was discussed” returns 4 matches with timestamps." },
    ],
  },
  connected: {
    eyebrow: "Part of one platform",
    title: "Voice that updates the right records",
    intro: "What's said in a call or note is saved where your team will look for it.",
    slugs: ["crm", "service", "hrms", "sales", "automation"],
    links: {
      crm: "Call notes on the customer timeline",
      service: "Voice messages turned into tickets",
      hrms: "Interview and meeting notes for people teams",
      sales: "Call summaries and follow-up tasks",
      automation: "Trigger workflows from what's said",
    },
  },
};
