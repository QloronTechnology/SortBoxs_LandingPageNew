import { HomeHero } from "@/components/home/HomeHero";
import { TrustedCompanies } from "@/components/home/TrustedCompanies";
import { PlatformEcosystem } from "@/components/home/PlatformEcosystem";
import { HomeModules } from "@/components/home/HomeModules";
import { FeatureSection } from "@/components/common/FeatureSection";
import { GoalsPipelineDemo } from "@/components/home/GoalsPipelineDemo";
import { HRMSJourneyDemo } from "@/components/home/HRMSJourneyDemo";
import { AIInterviewJourneyDemo } from "@/components/home/AIInterviewJourneyDemo";
import { HomeAISection } from "@/components/home/HomeAISection";
import { ModuleHighlights } from "@/components/home/ModuleHighlights";
import { IntegrationSection } from "@/components/common/IntegrationSection";
import { HomeSecurity } from "@/components/home/HomeSecurity";
import { IndustrySection } from "@/components/common/IndustrySection";
import { TestimonialSection } from "@/components/common/TestimonialSection";
import { ResourceSection } from "@/components/common/ResourceSection";
import { FAQSection } from "@/components/common/FAQSection";
import { Section } from "@/components/ui/Section";

import { crmPage } from "@/data/modules/crm";
import { hrmsPage } from "@/data/modules/hrms";
import { aiInterviewPage } from "@/data/modules/ai-interview";
import { integrations } from "@/data/integrations";
import { industries } from "@/data/industries";
import { testimonials } from "@/data/testimonials";
import { resources } from "@/data/resources";
import { faqs } from "@/data/faq";

export default function Home() {
  return (
    <>
      <HomeHero />
      <TrustedCompanies />
      <PlatformEcosystem />
      <HomeModules />

      <FeatureSection
        icon={crmPage.icon}
        badge={crmPage.badge}
        title={crmPage.heading}
        description={crmPage.description}
        features={crmPage.features}
        cta={{ label: crmPage.cta, href: "/crm" }}
        visualNode={<GoalsPipelineDemo />}
      />
      <HRMSJourneyDemo data={hrmsPage} />
      <AIInterviewJourneyDemo data={aiInterviewPage} />

      <HomeAISection />
      <ModuleHighlights />
      <IntegrationSection integrations={integrations} />
      <HomeSecurity />
      <IndustrySection industries={industries} />

      <Section className="bg-brand-surface py-12 lg:py-14">
        {/* Column proportions follow the design (507 : 532 : 677) from 3xl; narrower
            desktops give the FAQ column extra room so its heading + link stay on one line. */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-[470fr_490fr_740fr] xl:gap-12 3xl:grid-cols-[507fr_532fr_677fr]">
          <TestimonialSection testimonials={testimonials} />
          <ResourceSection resources={resources} />
          <div className="md:col-span-2 xl:col-span-1">
            <FAQSection faqs={faqs} />
          </div>
        </div>
      </Section>

    </>
  );
}
