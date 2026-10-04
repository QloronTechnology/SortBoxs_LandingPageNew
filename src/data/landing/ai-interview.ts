import { BadgeCheck, ClipboardCheck, Code, FileSearch, MessageSquareText, MonitorPlay, ScanSearch, ShieldAlert, Sparkles, UserRound, Users } from "lucide-react";
import type { ModuleLandingData } from "@/types/moduleLanding";

/** Content for /ai-interview. Layout lives in components/module-landing/. Figures are illustrative. */

export const aiInterviewLanding: ModuleLandingData = {
  slug: "ai-interview",
  name: "AI Interview",
  hero: {
    eyebrow: "SortBoxs AI Interview",
    title: "Transform recruitment with",
    highlight: "AI-powered interviews.",
    description:
      "Reduce hiring time, improve candidate quality and make data-driven hiring decisions with AI interviews.",
    points: ["Screen resumes in minutes", "Consistent interviews for every candidate", "Scores and feedback your team can compare"],
  },
  lifecycle: {
    eyebrow: "How it works",
    title: "From a candidate to a confident decision",
    intro: "Every candidate goes through the same structured process, and your team sees the results side by side.",
    steps: [
      { icon: UserRound, title: "Candidate", body: "Import applicants or invite them by link, and match each resume to the role automatically." },
      { icon: MonitorPlay, title: "Interview", body: "Candidates take an AI-led interview on their own time, with questions set for the role." },
      { icon: ScanSearch, title: "AI Evaluation", body: "Answers and coding tasks are scored against a clear rubric, with the reasoning shown." },
      { icon: BadgeCheck, title: "Result", body: "Review ranked results, compare candidates and move the best ones to the next round." },
    ],
  },
  explorer: {
    eyebrow: "Hiring pipeline",
    title: "See every candidate, stage by stage",
    intro: "Pick a stage to see the candidates in it and how they're doing.",
    label: "Hiring stages",
    metricLabel: "Candidates",
    itemLabel: "candidates",
    tabs: [
      {
        key: "screening",
        label: "Screening",
        summary: "Resumes matched to the role.",
        total: "312",
        tone: "bg-slate-400",
        items: [
          { title: "Rahul Verma", meta: "Backend Engineer", value: "88% match", note: "Strong in Java and system design" },
          { title: "Neha Kapoor", meta: "Product Designer", value: "81% match", note: "Portfolio reviewed" },
          { title: "Arjun Patel", meta: "Data Analyst", value: "74% match", note: "Missing SQL experience" },
        ],
      },
      {
        key: "interview",
        label: "Interview",
        summary: "AI interviews in progress or complete.",
        total: "86",
        tone: "bg-brand-purple",
        items: [
          { title: "Priya Sharma", meta: "Frontend Engineer", value: "Completed", note: "42-minute interview" },
          { title: "Karan Rao", meta: "DevOps Engineer", value: "In progress", note: "Question 6 of 10" },
          { title: "Meera Nair", meta: "Product Designer", value: "Invited", note: "Link sent yesterday" },
        ],
      },
      {
        key: "assessment",
        label: "Assessment",
        summary: "Technical and coding tasks.",
        total: "52",
        tone: "bg-sky-500",
        items: [
          { title: "Priya Sharma", meta: "Coding round", value: "94", note: "Top 10% of all candidates" },
          { title: "Rahul Verma", meta: "System design", value: "86", note: "Clear trade-off reasoning" },
          { title: "Karan Rao", meta: "Technical quiz", value: "71", note: "Strong on infrastructure" },
        ],
      },
      {
        key: "shortlist",
        label: "Shortlist",
        summary: "Ready for a human conversation.",
        total: "24",
        tone: "bg-emerald-500",
        items: [
          { title: "Priya Sharma", meta: "Frontend Engineer", value: "92", note: "Recommended" },
          { title: "Rahul Verma", meta: "Backend Engineer", value: "86", note: "Strong hire" },
          { title: "Aisha Khan", meta: "QA Engineer", value: "84", note: "Final round on Friday" },
        ],
      },
    ],
  },
  capabilities: {
    eyebrow: "Everything recruiters need",
    title: "Hire faster without lowering the bar",
    intro: "Your recruiters spend their time with the best candidates, not on first-round screening calls.",
    items: [
      { icon: FileSearch, title: "Resume Screening", body: "Rank applicants against the role in minutes, with the reasons behind each ranking." },
      { icon: MonitorPlay, title: "AI-Powered Interviews", body: "Structured, role-specific interviews that candidates take when it suits them." },
      { icon: ClipboardCheck, title: "Technical Assessment", body: "Role-based quizzes and scenarios, scored consistently for every candidate." },
      { icon: Code, title: "Coding Evaluation", body: "Live coding tasks assessed for correctness, approach and code quality." },
      { icon: MessageSquareText, title: "Instant AI Feedback", body: "Summaries of each interview with strengths, gaps and suggested follow-up questions." },
      { icon: Users, title: "Recruiter Collaboration", body: "Share candidates, add notes and make decisions together in one place." },
    ],
  },
  ai: {
    eyebrow: "Fair and consistent",
    title: "Every candidate gets the same structured process",
    description:
      "AI does the first pass and shows its reasoning. People make the decisions, with better information in front of them.",
    points: [
      "Scores every candidate against the same rubric",
      "Shows why each score was given",
      "Summarises interviews so nothing is missed",
      "Flags unusual behaviour during assessments for a human to review",
    ],
    cards: [
      { icon: Sparkles, tone: "bg-brand-purple-light text-brand-purple", title: "Resume match", body: "Rahul Verma matches 88% of the role's requirements, strongest in system design." },
      { icon: MessageSquareText, tone: "bg-sky-100 text-sky-700", title: "Interview summary", body: "Priya explained trade-offs clearly and gave two strong examples. Ask about team leadership next." },
      { icon: ShieldAlert, tone: "bg-amber-100 text-amber-700", title: "Integrity flag", body: "Candidate switched tabs 6 times during the coding task. Review the recording." },
    ],
  },
  connected: {
    eyebrow: "Part of one platform",
    title: "Hiring connected to the rest of your business",
    intro: "Candidates you hire flow straight into HR, with no copying between systems.",
    slugs: ["hrms", "ai", "analytics", "automation", "projects"],
    links: {
      hrms: "Hired candidates become employees, with onboarding started",
      ai: "The same assistant helps write job posts and offers",
      analytics: "Time to hire and source quality reporting",
      automation: "Schedule rounds and send updates by rule",
      projects: "See capacity before you open a role",
    },
  },
};
