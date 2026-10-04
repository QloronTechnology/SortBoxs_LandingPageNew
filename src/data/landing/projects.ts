import { CalendarRange, Clock, Flag, FolderKanban, Gauge, ListChecks, MessagesSquare, Scale, Sparkles, TriangleAlert, Users } from "lucide-react";
import type { ModuleLandingData } from "@/types/moduleLanding";

/** Content for /projects. Layout lives in components/module-landing/. Figures are illustrative. */

export const projectsLanding: ModuleLandingData = {
  slug: "projects",
  name: "Projects",
  hero: {
    eyebrow: "SortBoxs Projects",
    title: "Plan, track and",
    highlight: "deliver on time.",
    description: "Keep every project, task and deadline visible in one collaborative workspace.",
    points: ["Plans, tasks and timesheets in one place", "Workload visible across every team", "Milestones that keep clients informed"],
  },
  lifecycle: {
    eyebrow: "How it works",
    title: "From a project plan to delivered work",
    intro: "Everyone sees the same plan, the same tasks and the same progress, so status meetings get short.",
    steps: [
      { icon: FolderKanban, title: "Project", body: "Set up a project with scope, milestones, budget and a timeline from a template or from scratch." },
      { icon: ListChecks, title: "Tasks", body: "Break work into tasks with owners, due dates and dependencies, on a board or a list." },
      { icon: Users, title: "Team", body: "Assign people by availability and skills, and log time as the work gets done." },
      { icon: Gauge, title: "Progress", body: "Watch milestones, burn-down and budget in real time, and share status with a link." },
    ],
  },
  explorer: {
    eyebrow: "Task board",
    title: "See the work move across the board",
    intro: "Pick a column to see its tasks, who owns them and when they're due.",
    label: "Task board columns",
    metricLabel: "Story points",
    itemLabel: "tasks",
    tabs: [
      {
        key: "todo",
        label: "To do",
        summary: "Planned and ready to start.",
        total: "21 pts",
        tone: "bg-slate-400",
        items: [
          { title: "Set up payment gateway", meta: "Mobile app · Rohit K.", value: "8 pts", note: "Starts Monday" },
          { title: "Write migration plan", meta: "ERP rollout · Aisha S.", value: "5 pts", note: "Depends on data audit" },
          { title: "Design onboarding flow", meta: "Website revamp · Meera N.", value: "8 pts", note: "Brief approved" },
        ],
      },
      {
        key: "progress",
        label: "In progress",
        summary: "Being worked on right now.",
        total: "26 pts",
        tone: "bg-brand-purple",
        items: [
          { title: "Finalise API contract", meta: "Mobile app · Rohit K.", value: "5 pts", note: "Due today" },
          { title: "Build checkout screens", meta: "Mobile app · Karan R.", value: "13 pts", note: "60% complete" },
          { title: "Data audit", meta: "ERP rollout · Aisha S.", value: "8 pts", note: "2 days left" },
        ],
      },
      {
        key: "review",
        label: "In review",
        summary: "Waiting on feedback or approval.",
        total: "13 pts",
        tone: "bg-amber-500",
        items: [
          { title: "Homepage design", meta: "Website revamp · Meera N.", value: "5 pts", note: "With client since Tuesday" },
          { title: "Search results page", meta: "Website revamp · Karan R.", value: "5 pts", note: "2 comments open" },
          { title: "Release notes", meta: "Mobile app · Rohit K.", value: "3 pts", note: "Needs product sign-off" },
        ],
      },
      {
        key: "done",
        label: "Done",
        summary: "Finished and accepted.",
        total: "47 pts",
        tone: "bg-emerald-500",
        items: [
          { title: "Brand guidelines", meta: "Website revamp · Meera N.", value: "8 pts", note: "Approved by client" },
          { title: "User research summary", meta: "Mobile app · Priya S.", value: "5 pts", note: "Shared with the team" },
          { title: "Vendor shortlist", meta: "ERP rollout · Aisha S.", value: "5 pts", note: "Closed last week" },
        ],
      },
    ],
  },
  capabilities: {
    eyebrow: "Everything projects need",
    title: "Plan the work, then watch it get done",
    intro: "From the first plan to the final milestone, your team works in one place instead of five tools.",
    items: [
      { icon: CalendarRange, title: "Project Planning", body: "Timelines, phases and dependencies, with templates for the projects you run again and again." },
      { icon: ListChecks, title: "Task Management", body: "Tasks with owners, priorities and due dates, on a board, a list or a calendar." },
      { icon: Clock, title: "Timesheets", body: "Log time against tasks and projects, then approve it and bill it with confidence." },
      { icon: Scale, title: "Resource Allocation", body: "See who is overloaded and who has room before you assign the next piece of work." },
      { icon: Flag, title: "Milestone Tracking", body: "Mark the moments that matter and share progress with clients and stakeholders." },
      { icon: MessagesSquare, title: "Team Collaboration", body: "Comments, files and mentions live on the task, so context never gets lost in chat." },
    ],
  },
  ai: {
    eyebrow: "AI for delivery",
    title: "Spot delays before the deadline does",
    description: "SortBoxs AI reads progress and workload across every project and warns you while there's still time to act.",
    points: [
      "Predicts which milestones are likely to slip",
      "Suggests how to rebalance work across the team",
      "Writes the weekly status update for you",
      "Turns meeting notes into tasks with owners",
    ],
    cards: [
      { icon: TriangleAlert, tone: "bg-amber-100 text-amber-700", title: "Delay risk", body: "Mobile app is tracking 3 days late because Rohit has 34 points assigned this sprint." },
      { icon: Scale, tone: "bg-brand-purple-light text-brand-purple", title: "Workload balance", body: "Karan has capacity this week. Move 2 tasks from Rohit to Karan?" },
      { icon: Sparkles, tone: "bg-emerald-100 text-emerald-700", title: "Status draft", body: "This week's update for Website revamp is ready to review and send to the client." },
    ],
  },
  connected: {
    eyebrow: "Part of one platform",
    title: "Projects connected to your people and your money",
    intro: "Staffing, time and budgets come from the teams that own them, with no copying between tools.",
    slugs: ["crm", "hrms", "finance", "analytics", "automation"],
    links: {
      crm: "Turn a won deal into a project in one click",
      hrms: "Availability and leave visible when you plan",
      finance: "Timesheets and expenses feed billing",
      analytics: "Utilisation, margin and delivery reports",
      automation: "Create tasks and send reminders by rule",
    },
  },
};
