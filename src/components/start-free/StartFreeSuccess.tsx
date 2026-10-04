import { CircleCheck, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { site } from "@/config/site";

/**
 * Shown after "Create Free Account". There is no post-registration app/dashboard in this project yet
 * (no login page, no app subdomain) — see the final report for details — so this confirms the submission
 * and explains what happens next instead of redirecting somewhere that doesn't exist. "Done" just closes
 * the drawer, matching the checkout drawer's own confirmation screen.
 */
export function StartFreeSuccess({ domain, email, onClose }: { domain: string; email: string; onClose: () => void }) {
  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-brand-border bg-white p-6 text-center sm:p-10">
      <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
        <CircleCheck className="size-8" aria-hidden />
      </span>
      <h1 className="mt-5 text-2xl font-bold text-brand-text">Your workspace is being set up!</h1>
      <p className="mt-2 text-brand-muted">
        <span className="font-semibold text-brand-text">{domain}.sortboxs.com</span> will be ready shortly. We&apos;ve sent
        a confirmation to <span className="font-medium text-brand-text">{email}</span> with your next steps.
      </p>

      <div className="mt-6 flex items-start gap-3 rounded-xl bg-brand-purple-light/50 p-4 text-left text-sm text-brand-text">
        <Mail className="mt-0.5 size-4 shrink-0 text-brand-purple" aria-hidden />
        <p>
          Our onboarding team will reach out to help you get started. If you don&apos;t see an email within a few
          minutes, check your spam folder or reach us at{" "}
          <a href={`mailto:${site.supportEmail}`} className="font-medium text-brand-purple hover:underline">
            {site.supportEmail}
          </a>
          .
        </p>
      </div>

      <Button type="button" onClick={onClose} variant="outline" className="mt-6">
        Done
      </Button>
    </div>
  );
}
