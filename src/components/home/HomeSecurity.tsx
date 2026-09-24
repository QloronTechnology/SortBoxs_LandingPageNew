import Image from "next/image";
import { assets } from "@/config/assets";

// Artwork is cropped from the design; its dark edges blend into this exact band colour.
const BAND_BG = "bg-[#04053d]";

const badges = [
  { icon: assets.security.soc2, lines: ["SOC 2", "Certified"] },
  { icon: assets.security.iso27001, lines: ["ISO 27001", "Compliant"] },
  { icon: assets.security.encryption, lines: ["Data", "Encryption"] },
  { icon: assets.security.rbac, lines: ["Role-Based", "Access Control"] },
  { icon: assets.security.audit, lines: ["Audit Logs", "& Monitoring"] },
  { icon: assets.security.backups, lines: ["Regular Backups"] },
  { icon: assets.security.api, lines: ["API Security"] },
  { icon: assets.security.infrastructure, lines: ["Secure", "Infrastructure"] },
];

export function HomeSecurity() {
  return (
    <section className={`${BAND_BG} overflow-hidden`}>
      <div className="container-page flex flex-col items-center gap-5 py-8 lg:flex-row lg:items-center lg:gap-6 lg:py-0">
        <Image
          src={assets.security.shield}
          alt=""
          width={900}
          height={816}
          className="h-36 w-auto shrink-0 lg:-ml-6 lg:h-48 3xl:h-[280px]"
          aria-hidden
        />

        <div className="min-w-0 flex-1 lg:py-6">
          <h2 className="text-center text-2xl font-bold text-white lg:text-left xl:text-3xl 3xl:text-[40px]">
            Enterprise-Grade Security
          </h2>
          <p className="mt-1.5 text-center text-sm text-white/85 lg:text-left lg:text-base 3xl:text-xl">
            Your data is protected with industry-leading security practices.
          </p>

          <ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-3 sm:grid-cols-4 3xl:mt-7 3xl:flex 3xl:items-center 3xl:justify-between 3xl:gap-0">
            {badges.map((badge, index) => (
              <li
                key={badge.lines.join(" ")}
                className={`flex items-center gap-2 3xl:px-3 3xl:first:pl-0 3xl:last:pr-0 ${
                  index > 0 ? "3xl:border-l 3xl:border-white/15" : ""
                }`}
              >
                <Image
                  src={badge.icon}
                  alt=""
                  width={234}
                  height={264}
                  className="h-11 w-auto shrink-0 lg:h-12 3xl:h-14 4xl:h-16"
                  aria-hidden
                />
                <span className="text-[13px] leading-snug font-medium text-white/90 lg:text-sm 4xl:text-[15px]">
                  {badge.lines.map((line) => (
                    <span key={line} className="block sm:whitespace-nowrap">
                      {line}
                    </span>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
