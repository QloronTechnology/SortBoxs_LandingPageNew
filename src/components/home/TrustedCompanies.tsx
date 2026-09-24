import { LogoCloud } from "@/components/common/LogoCloud";
import { StatsSection } from "@/components/common/StatsSection";
import { Section } from "@/components/ui/Section";
import { assets } from "@/config/assets";
import { STATS } from "@/lib/constants";
import type { CompanyLogo } from "@/types/common";

const companies: CompanyLogo[] = [
  { name: "Tech Mahindra", recreated: true },
  { name: "Infosys", logo: assets.companies.infosys },
  { name: "TCS", logo: assets.companies.tcs },
  { name: "Accenture", logo: assets.companies.accenture },
  { name: "Capgemini", logo: assets.companies.capgemini },
];

export function TrustedCompanies() {
  return (
    <Section className="py-12 lg:py-14">
      <p className="mb-3 text-sm font-bold tracking-wider text-brand-purple uppercase">
        Trusted by innovative companies worldwide
      </p>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <LogoCloud logos={companies} marquee className="min-w-0 flex-1" />
        <StatsSection stats={STATS} className="shrink-0" />
      </div>
    </Section>
  );
}
