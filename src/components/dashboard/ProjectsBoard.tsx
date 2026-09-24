"use client";

import { Briefcase, Calendar, ArrowRight, ListChecks, Users2 } from "lucide-react";

interface Project {
  name: string;
  description: string;
  progress: number;
  due: string;
  status: "On Track" | "At Risk" | "Ahead";
  statusColor: string;
  color: string;
  members: number;
}

const projects: Project[] = [
  {
    name: "Website Redesign",
    description: "New marketing site & design system",
    progress: 72,
    due: "Oct 12",
    status: "On Track",
    statusColor: "text-emerald-600 bg-emerald-50",
    color: "#6c35f5",
    members: 4,
  },
  {
    name: "Mobile App Launch",
    description: "iOS & Android release for Q4",
    progress: 45,
    due: "Nov 3",
    status: "At Risk",
    statusColor: "text-amber-600 bg-amber-50",
    color: "#f59e0b",
    members: 6,
  },
  {
    name: "CRM Integration",
    description: "Sync leads across sales tools",
    progress: 90,
    due: "Sep 28",
    status: "Ahead",
    statusColor: "text-sky-600 bg-sky-50",
    color: "#0ea5e9",
    members: 3,
  },
  {
    name: "Q4 Marketing Rollout",
    description: "Campaign assets & landing pages",
    progress: 30,
    due: "Dec 15",
    status: "On Track",
    statusColor: "text-emerald-600 bg-emerald-50",
    color: "#10b981",
    members: 5,
  },
  {
    name: "Vendor Portal",
    description: "Self-serve procurement workflows",
    progress: 58,
    due: "Oct 30",
    status: "On Track",
    statusColor: "text-emerald-600 bg-emerald-50",
    color: "#ec4899",
    members: 3,
  },
  {
    name: "Warehouse Automation",
    description: "Barcode scanning & stock alerts",
    progress: 20,
    due: "Jan 8",
    status: "At Risk",
    statusColor: "text-amber-600 bg-amber-50",
    color: "#8b5cf6",
    members: 4,
  },
];

interface ProjectsBoardProps {
  animate: boolean;
}

export function ProjectsBoard({ animate }: ProjectsBoardProps) {
  const avgProgress = Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Briefcase className="size-4 text-brand-purple" aria-hidden />
          <h4 className="text-[13px] font-bold text-brand-text">Active Projects</h4>
        </div>
        <span className="text-[10px] font-medium text-brand-purple">View Board →</span>
      </div>

      <div className="mb-2.5 flex items-center gap-4 rounded-lg bg-slate-50 px-2.5 py-1.5">
        <div className="flex items-center gap-1.5 text-[10px] text-slate-600">
          <ListChecks className="size-3 text-brand-purple" aria-hidden />
          <span className="font-semibold text-brand-text">{projects.length}</span> Projects
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-slate-600">
          <Users2 className="size-3 text-sky-600" aria-hidden />
          <span className="font-semibold text-brand-text">21</span> Team Members
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-slate-600">
          Avg. Progress <span className="font-semibold text-brand-text">{avgProgress}%</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {projects.map((project, index) => (
          <div
            key={project.name}
            className="rounded-lg border border-slate-100 bg-white p-2 transition-all duration-500"
            style={{
              transitionDelay: `${index * 90}ms`,
              opacity: animate ? 1 : 0,
              transform: animate ? "translateY(0)" : "translateY(6px)",
            }}
          >
            <div className="flex items-start justify-between gap-1.5">
              <p className="text-[10.5px] font-semibold text-brand-text">{project.name}</p>
              <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[8px] font-semibold ${project.statusColor}`}>
                {project.status}
              </span>
            </div>
            <p className="mt-0.5 truncate text-[9px] text-slate-400">{project.description}</p>

            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full transition-[width] duration-700 ease-out"
                style={{
                  width: animate ? `${project.progress}%` : "0%",
                  transitionDelay: `${200 + index * 90}ms`,
                  background: project.color,
                }}
              />
            </div>

            <div className="mt-1.5 flex items-center justify-between">
              <div className="flex -space-x-1.5">
                {Array.from({ length: Math.min(project.members, 3) }).map((_, i) => (
                  <span
                    key={i}
                    className="flex size-4 items-center justify-center rounded-full border border-white bg-brand-purple-light text-[7px] font-bold text-brand-purple"
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-1 text-[9px] text-slate-400">
                <Calendar className="size-2.5" aria-hidden />
                {project.due}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-end gap-1 text-[9px] font-semibold text-brand-purple">
        View All Projects <ArrowRight className="size-2.5" aria-hidden />
      </div>
    </div>
  );
}
