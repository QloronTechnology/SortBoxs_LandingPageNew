import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { SocialIcon, type SocialNetwork } from "@/components/ui/SocialIcon";
import { cn } from "@/lib/utils";
import { site } from "@/config/site";
import { routes } from "@/config/routes";
import { FooterColumn } from "./FooterColumn";
import { Newsletter } from "./Newsletter";
import { FooterCTA } from "./FooterCTA";
import { CookieSettingsButton } from "@/components/layout/CookieSettingsButton";

const columns = [
  {
    heading: "Platform",
    links: [
      { label: "All Modules", href: routes.platform.all },
      { label: "Features", href: "/features" },
      { label: "Integrations", href: routes.integrations },
      { label: "Security", href: "/security" },
      { label: "Pricing", href: routes.pricing },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "By Industry", href: routes.industries.all },
      { label: "By Business Size", href: routes.solutions.all },
      { label: "Enterprise", href: routes.solutions.enterprise },
      { label: "Use Cases", href: "/use-cases" },
      { label: "Customer Stories", href: routes.resources.caseStudies },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Blog", href: routes.resources.blog },
      { label: "Guides", href: routes.resources.guides },
      { label: "Webinars", href: routes.resources.webinars },
      { label: "Help Center", href: routes.resources.helpCenter },
      { label: "API Documentation", href: routes.resources.apiDocumentation },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: routes.company.about },
      { label: "Careers", href: routes.company.careers },
      { label: "Partners", href: routes.company.partners },
      { label: "Contact Us", href: routes.company.contact },
      { label: "Newsroom", href: routes.company.newsroom },
    ],
  },
];

const socialLinks: { name: string; href: string; network: SocialNetwork }[] = [
  { name: "Facebook", href: site.social.facebook, network: "facebook" },
  { name: "Instagram", href: site.social.instagram, network: "instagram" },
  { name: "LinkedIn", href: site.social.linkedin, network: "linkedin" },
  { name: "X", href: site.social.x, network: "x" },
];

const legalLinks = [
  { label: "Privacy Policy", href: routes.legal.privacy },
  { label: "Terms of Service", href: routes.legal.terms },
  { label: "Cookie Policy", href: routes.legal.cookies },
];

// Footer colour scheme. Flip to "light" for the original white footer from the design.
const FOOTER_THEME: "light" | "dark" = "dark";

export function Footer() {
  const dark = FOOTER_THEME === "dark";

  return (
    <footer className={dark ? "bg-[#04053d]" : "bg-white"}>
      <FooterCTA />

      <div className="container-page grid grid-cols-2 gap-x-6 gap-y-10 py-16 lg:grid-cols-6 lg:gap-10">
        <div className="col-span-2">
          {/* The logo artwork is purple; render it white on the dark footer. */}
          <Logo width={150} height={46} className={cn(dark && "[&_img]:brightness-0 [&_img]:invert")} />
          <p className={cn("mt-4 max-w-xs text-sm", dark ? "text-white/70" : "text-brand-muted")}>
            Your entire business. One intelligent platform.
          </p>
          <div className="mt-5 flex items-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                aria-label={link.name}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "flex size-9 items-center justify-center rounded-full transition-colors",
                  dark
                    ? "bg-white text-brand-purple hover:bg-brand-purple hover:text-white"
                    : "bg-brand-purple-light text-brand-purple hover:bg-brand-purple hover:text-white"
                )}
              >
                <SocialIcon network={link.network} className="size-[18px]" />
              </a>
            ))}
          </div>
        </div>

        {columns.map((column) => (
          <FooterColumn key={column.heading} heading={column.heading} links={column.links} dark={dark} />
        ))}

        <div className="col-span-2 lg:col-span-6 xl:col-span-2 xl:col-start-5">
          <Newsletter dark={dark} />
        </div>
      </div>

      <div className={cn("border-t", dark ? "border-white/10" : "border-brand-border")}>
        <div
          className={cn(
            "container-page flex flex-col items-center justify-between gap-3 py-6 text-sm sm:flex-row",
            dark ? "text-white/60" : "text-brand-muted"
          )}
        >
          <p>© {new Date().getFullYear()} {site.name}. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            {legalLinks.map((link, index) => (
              <span key={link.href} className="flex items-center gap-4">
                {index > 0 && <span aria-hidden>|</span>}
                <Link href={link.href} className={dark ? "hover:text-white" : "hover:text-brand-purple"}>
                  {link.label}
                </Link>
              </span>
            ))}
            <span className="flex items-center gap-4">
              <span aria-hidden>|</span>
              <CookieSettingsButton className={dark ? "hover:text-white" : "hover:text-brand-purple"} />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
