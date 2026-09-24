"use client";

import Image from "next/image";
import { Mail } from "lucide-react";
import { assets } from "@/config/assets";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Newsletter({ dark = false }: { dark?: boolean }) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <h3 className={cn("font-semibold", dark ? "text-white" : "text-brand-text")}>Subscribe to our newsletter</h3>
        <Image
          src={assets.illustrations.newsletterMail}
          alt=""
          width={28}
          height={28}
          aria-hidden
        />
      </div>
      <p className={cn("mb-4 text-sm", dark ? "text-white/70" : "text-brand-muted")}>
        Get the latest updates, product news and insights.
      </p>
      <form className="flex gap-2" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          placeholder="Enter your email address"
          className={cn(
            "w-full min-w-0 rounded-xl border px-4 py-3 text-sm focus:border-brand-purple focus:ring-1 focus:ring-brand-purple focus:outline-none",
            dark
              ? "border-white/15 bg-white/5 text-white placeholder:text-white/45"
              : "border-brand-border text-brand-text placeholder:text-brand-muted"
          )}
        />
        <Button type="submit" icon={Mail} iconPosition="right" className="shrink-0">
          Subscribe
        </Button>
      </form>
    </div>
  );
}
