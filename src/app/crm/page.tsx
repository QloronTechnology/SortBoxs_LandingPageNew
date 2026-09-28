import { redirect } from "next/navigation";
import { routes } from "@/config/routes";

/** Old CRM URL: the page moved to /crm-landing (next.config redirects don't run under `output: "export"`). */
export default function CrmRedirect() {
  redirect(routes.platform.crm);
}
