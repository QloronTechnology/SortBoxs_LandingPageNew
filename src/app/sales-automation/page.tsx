import type { Metadata } from "next";
import { Clock, Eye, MailCheck, Rocket, ShieldCheck, Zap } from "lucide-react";
import { AutomationHero } from "@/components/sales-pages/automation/AutomationHero";
import { FollowUpTimeline, RuleBuilder, RulesLibrary, SalesProductivity } from "@/components/sales-pages/automation/AutomationSections";
import { Compare, Outcomes, SolutionCTA } from "@/components/sales-pages/parts";

export const metadata: Metadata = {
  title: "Sales Automation",
  description: "Automate follow-ups, email, tasks, lead assignment and reminders with SortBoxs Sales Automation, so your team can spend its time on conversations and revenue.",
};

/** Solutions → Sales → Sales Automation. Workflow-oriented layout. Header and footer come from the root layout. */
export default function SalesAutomationPage() {
  return (
    <>
      <AutomationHero />
      <Compare
        eyebrow="The challenge"
        title="Follow-ups slip when they depend on memory"
        intro="Most lost deals do not fail in the meeting. They fade in the gaps between meetings."
        without={[
          { title: "Leads wait for a first reply", body: "New leads sit in a shared inbox until someone has a free moment." },
          { title: "Follow-ups live in notebooks", body: "The next step depends on a rep remembering it, and a manager trusting that they did." },
          { title: "Admin eats the day", body: "Logging calls, creating tasks and updating stages takes time away from customers." },
        ]}
        withTitle="With Sales Automation"
        withItems={[
          { title: "Every lead is picked up straight away", body: "Assignment and the first email happen the moment a lead arrives." },
          { title: "Follow-ups are scheduled for you", body: "Tasks and reminders are created from the deal itself, with due dates attached." },
          { title: "The record keeps itself up to date", body: "Activity is logged and the pipeline moves as things happen." },
        ]}
      />
      <RuleBuilder />
      <RulesLibrary />
      <FollowUpTimeline />
      <SalesProductivity />
      <Outcomes
        title="What your team gets back"
        intro="Automation is only worth it if it changes how the week feels. These are the changes teams look for."
        items={[
          { icon: Clock, title: "Save time", body: "Routine steps run on their own, so reps stop retyping the same updates." },
          { icon: Zap, title: "Improve follow-ups", body: "Every lead and quiet deal gets a next step, on time, every time." },
          { icon: Rocket, title: "Increase productivity", body: "More of each day goes to conversations instead of admin." },
          { icon: Eye, title: "Improve visibility", body: "Managers see what happened and what is due without chasing updates." },
          { icon: MailCheck, title: "Reduce manual work", body: "Email, tasks and assignment follow your rules instead of someone's to-do list." },
          { icon: ShieldCheck, title: "Stay consistent", body: "Every lead follows the same process, whoever picks it up." },
        ]}
      />
      <SolutionCTA current="Sales Automation" />
    </>
  );
}
