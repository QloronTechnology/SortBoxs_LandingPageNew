import Image from "next/image";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { IconBox } from "@/components/ui/IconBox";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SortboxAIChatDemo } from "@/components/home/SortboxAIChatDemo";
import { assets } from "@/config/assets";
import { routes } from "@/config/routes";

const aiFeatures = [
  { title: "AI Assistant", description: "Get answers from your business data", icon: assets.aiIcons.assistant },
  { title: "AI Agents", description: "automate complex workflows", icon: assets.aiIcons.agents },
  { title: "AI Analytics", description: "Find patterns and trends", icon: assets.aiIcons.analytics },
  { title: "AI Automation", description: "Trigger actions automatically", icon: assets.aiIcons.automation },
  { title: "AI Insights", description: "Get proactive recommendations", icon: assets.aiIcons.insights },
  { title: "Natural Language", description: "Work with your data using plain English", icon: assets.aiIcons.naturalLanguage },
];

export function HomeAISection() {
  return (
    <Section>
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <div className="mb-5 flex items-center gap-3">
            <IconBox icon={Sparkles} size="md" />
            <Badge>SORTBOXS AI</Badge>
          </div>
          <h2 className="text-3xl font-bold text-brand-text sm:text-4xl">
            Your AI Assistant for real business impact.
          </h2>
          <p className="mt-4 text-base text-brand-muted">
            Get insights, automate tasks, generate reports and make better decisions - all with
            the power of AI.
          </p>
          <Button href={routes.platform.ai} className="mt-7">
            Explore AI
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-5">
          {aiFeatures.map((feature) => (
            <div key={feature.title} className="flex items-center gap-2.5 rounded-2xl border border-brand-border bg-white px-3.5 py-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-purple-light">
                <Image src={feature.icon} alt="" width={20} height={20} aria-hidden />
              </div>
              <div className="min-w-0">
                <h3 className="text-[15px] font-semibold text-brand-text">{feature.title}</h3>
                <p className="mt-0.5 text-[13px] text-brand-muted">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-4">
          <SortboxAIChatDemo />
        </div>
      </div>
    </Section>
  );
}
