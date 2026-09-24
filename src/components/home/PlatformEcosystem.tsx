import { Layers, Zap, LineChart, TrendingUp } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { routes } from "@/config/routes";
import { EcosystemParallax, type EcosystemModule } from "@/components/home/EcosystemParallax";
import { crmPage } from "@/data/modules/crm";
import { salesPage } from "@/data/modules/sales";
import { servicePage } from "@/data/modules/service";
import { hrmsPage } from "@/data/modules/hrms";
import { financePage } from "@/data/modules/finance";
import { projectsPage } from "@/data/modules/projects";
import { marketingPage } from "@/data/modules/marketing";
import { commercePage } from "@/data/modules/commerce";
import { procurementPage } from "@/data/modules/procurement";
import { inventoryPage } from "@/data/modules/inventory";
import { automationPage } from "@/data/modules/automation";
import { aiPage } from "@/data/modules/ai";

const highlights = [
  { icon: Layers, title: "Unify Operations", description: "Connect teams, data and workflows" },
  { icon: Zap, title: "Boost Productivity", description: "Automate repetitive work" },
  { icon: LineChart, title: "Make Smarter Decisions", description: "Use real-time data and AI insights" },
  { icon: TrendingUp, title: "Scale with Confidence", description: "Built for growth and enterprise needs" },
];

// Clockwise from 12 o'clock. Feature bullets come from each module's own page data.
const ecosystemModules: EcosystemModule[] = [
  { page: crmPage, label: "CRM", href: routes.platform.crm },
  { page: salesPage, label: "Sales", href: routes.platform.sales },
  { page: servicePage, label: "Service", href: routes.platform.service },
  { page: hrmsPage, label: "HRMS", href: routes.platform.hrms },
  { page: financePage, label: "Finance", href: routes.platform.finance },
  { page: projectsPage, label: "Projects", href: routes.platform.projects },
  { page: marketingPage, label: "Marketing", href: routes.platform.marketing },
  { page: commercePage, label: "Commerce", href: routes.platform.commerce },
  { page: procurementPage, label: "Procurement", href: routes.platform.procurement },
  { page: inventoryPage, label: "Inventory", href: routes.platform.inventory },
  { page: automationPage, label: "Automation", href: routes.platform.automation },
  { page: aiPage, label: "AI", href: routes.platform.ai },
].map(({ page, label, href }) => ({
  slug: page.slug,
  label,
  href,
  features: page.features.slice(0, 4),
}));

export function PlatformEcosystem() {
  return (
    <Section className="bg-brand-surface">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-bold tracking-wider text-brand-purple uppercase">
            One Platform. Every Team.
          </p>
          <h2 className="text-3xl font-bold text-brand-text sm:text-4xl">
            Everything your business needs, connected.
          </h2>
          <p className="mt-4 max-w-md text-base text-brand-muted">
            Break down silos and bring every team, process and data together. Sortboxs helps you
            work smarter, faster and grow without limits.
          </p>
          <Button href={routes.platform.all} className="mt-8">
            Explore the Platform
          </Button>

          <dl className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {highlights.map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-purple-light text-brand-purple">
                  <item.icon className="size-4.5" aria-hidden />
                </span>
                <div>
                  <dt className="text-sm font-semibold text-brand-text">{item.title}</dt>
                  <dd className="text-sm text-brand-muted">{item.description}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        <EcosystemParallax modules={ecosystemModules} />
      </div>
    </Section>
  );
}
