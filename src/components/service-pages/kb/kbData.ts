export interface Article {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  body: string[];
}

/** Sample help articles. Illustrative only. */
export const categories = ["Getting started", "Billing", "Account and security", "Reports"] as const;

export const articles: Article[] = [
  { id: "a1", title: "How to add a new user", category: "Getting started", excerpt: "Invite a teammate and choose what they can see.", body: ["Open Settings, then Users.", "Select Invite user and enter their work email.", "Pick a role. The role decides which modules they can open.", "They get an email with a link to set a password."] },
  { id: "a2", title: "Download an invoice", category: "Billing", excerpt: "Find a past invoice and save it as a PDF.", body: ["Open Billing, then Invoices.", "Find the invoice by month or number.", "Select Download to save it as a PDF.", "If the file does not open, try again after a minute, or contact support."] },
  { id: "a3", title: "Change your billing contact", category: "Billing", excerpt: "Send invoices to a different email address.", body: ["Open Billing, then Contacts.", "Edit the billing contact and save.", "New invoices will go to the new address."] },
  { id: "a4", title: "Set up two-step sign-in", category: "Account and security", excerpt: "Add a second check when you log in.", body: ["Open your profile, then Security.", "Turn on two-step sign-in.", "Scan the code with your authenticator app.", "Keep your backup codes somewhere safe."] },
  { id: "a5", title: "Reset a forgotten password", category: "Account and security", excerpt: "Get back into your account in a few steps.", body: ["On the sign-in page, choose Forgot password.", "Enter your work email.", "Follow the link in the email to choose a new password."] },
  { id: "a6", title: "Export a report to a spreadsheet", category: "Reports", excerpt: "Take report data into your own sheet.", body: ["Open the report you want.", "Choose Export, then pick a format.", "The file downloads to your computer."] },
  { id: "a7", title: "Schedule a report by email", category: "Reports", excerpt: "Send a report to your team every week.", body: ["Open the report and choose Schedule.", "Pick who gets it and how often.", "Save. The first email goes out at the next scheduled time."] },
  { id: "a8", title: "Take your first tour", category: "Getting started", excerpt: "A short walkthrough of the main screens.", body: ["Select Help, then Take a tour.", "Follow the highlights for each module.", "You can restart the tour at any time."] },
];
