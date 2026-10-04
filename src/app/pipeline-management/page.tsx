import type { Metadata } from "next";
import { Clock, Eye, LineChart, Target, UserCheck, Users } from "lucide-react";
import { PipelineHero } from "@/components/sales-pages/pipeline/PipelineHero";
import { DealDetail, DragBoard, StageJourney } from "@/components/sales-pages/pipeline/PipelineSections";
import { Compare, Outcomes, SolutionCTA } from "@/components/sales-pages/parts";

export const metadata: Metadata = {
  title: "Pipeline Management",
  description: "Manage leads, opportunities and deals on one visual sales pipeline with drag-and-drop stages, deal tracking, ownership and forecasting.",
};

/** Solutions → Sales → Pipeline Management. Kanban-oriented layout. Header and footer come from the root layout. */
export default function PipelineManagementPage() {
  return (
    <>
      <PipelineHero />
      <Compare
        eyebrow="The challenge"
        title="Deals are everywhere except in one place"
        intro="When the pipeline lives in spreadsheets, inboxes and memory, nobody can say what is really going to close."
        without={[
          { title: "Status lives in people's heads", body: "To know where a deal stands, you have to ask the rep." },
          { title: "Spreadsheets drift out of date", body: "Copies multiply, and the forecast depends on whichever one is newest." },
          { title: "Stuck deals go unnoticed", body: "Without a shared view, quiet opportunities are only spotted after they are lost." },
        ]}
        withTitle="With Pipeline Management"
        withItems={[
          { title: "One board for every deal", body: "Each opportunity sits in a stage, with an owner, a value and a close date." },
          { title: "Updates happen where the work happens", body: "Drag a deal forward and the stage, totals and forecast update together." },
          { title: "Problems show up early", body: "Quiet or overdue deals stand out, so the next step is clear." },
        ]}
      />
      <StageJourney />
      <DragBoard />
      <DealDetail />
      <Outcomes
        title="A pipeline everyone can trust"
        intro="Clear stages and one source of truth change how sales teams plan, coach and forecast."
        items={[
          { icon: Eye, title: "Improve visibility", body: "See every opportunity and its stage without asking for an update." },
          { icon: Clock, title: "Save time", body: "Update a deal in one move instead of editing a sheet and sending a message." },
          { icon: Target, title: "Improve follow-ups", body: "Each deal shows its next step, so fewer opportunities go quiet." },
          { icon: LineChart, title: "Make better decisions", body: "A weighted forecast built from live deals supports realistic planning." },
          { icon: UserCheck, title: "Clear ownership", body: "Every deal has an owner and a history of who did what." },
          { icon: Users, title: "Better coaching", body: "Managers can review a rep's pipeline together, deal by deal." },
        ]}
      />
      <SolutionCTA current="Pipeline Management" />
    </>
  );
}
