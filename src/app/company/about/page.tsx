import type { Metadata } from "next";
import {
  AboutApproach,
  AboutBanner,
  AboutHero,
  AboutImpact,
  AboutPlatform,
  AboutSecurity,
  AboutStory,
  AboutValues,
} from "@/components/about/AboutSections";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "SortBoxs connects CRM, Sales, HRMS, Finance, Projects, AI and more in one intelligent business platform. Learn about our story, values and approach.",
};

/** About SortBoxs. The site header and footer (with its "Ready to Transform" CTA) come from the root layout. */
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutValues />
      <AboutStory />
      <AboutImpact />
      <AboutPlatform />
      {/* Above "How We Think About Business Software" (user's choice). */}
      <AboutBanner />
      <AboutApproach />
      <AboutSecurity />
    </>
  );
}
