import Image from "next/image";
import type { IntegrationItem } from "@/types/common";

export function IntegrationCard({ integration }: { integration: IntegrationItem }) {
  return (
    <div className="flex min-h-36 flex-col items-center justify-center gap-3 rounded-2xl border border-brand-border bg-white px-5 py-6 text-center transition-shadow hover:shadow-md">
      {/* The label is part of the logo artwork, except for wordmarks. */}
      <Image
        src={integration.logo}
        alt={integration.name}
        width={integration.width}
        height={integration.height}
        style={{ height: integration.wordmark ? 24 : integration.height * 0.8, width: "auto" }}
        className="max-w-full object-contain"
      />
    </div>
  );
}
