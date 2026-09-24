import Image from "next/image";
import Link from "next/link";
import type { ModuleSummary } from "@/types/module";

export function ModuleCard({ module }: { module: ModuleSummary }) {
  return (
    <Link
      href={module.href}
      className="group flex flex-col gap-4 rounded-2xl border border-brand-border bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-brand-purple/30 hover:shadow-lg hover:shadow-brand-purple/5"
    >
      <div className={`flex size-11 items-center justify-center rounded-xl ${module.iconBg}`}>
        <Image src={module.icon} alt="" width={22} height={22} aria-hidden />
      </div>
      <div>
        <h3 className="font-semibold text-brand-text group-hover:text-brand-purple">
          {module.name}
        </h3>
        <p className="mt-1 text-sm text-brand-muted">{module.description}</p>
      </div>
    </Link>
  );
}
