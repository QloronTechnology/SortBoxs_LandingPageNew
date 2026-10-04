import type { Priority } from "../shared";

export type Status = "New" | "Open" | "Pending" | "Resolved";

export interface Ticket {
  id: string;
  subject: string;
  customer: string;
  company: string;
  priority: Priority;
  status: Status;
  assignee: string;
  channel: string;
  age: string;
  message: string;
}

/** Sample tickets. Illustrative only. */
export const tickets: Ticket[] = [
  { id: "T-2041", subject: "Cannot download my invoice", customer: "Priya Nair", company: "Zenith Pharma", priority: "High", status: "New", assignee: "Unassigned", channel: "Email", age: "12 min", message: "Hi, the download button on my March invoice does nothing. I need it for our audit tomorrow." },
  { id: "T-2040", subject: "Login keeps asking for a code", customer: "Rahul Verma", company: "Skyline Infra", priority: "Urgent", status: "Open", assignee: "Sana Khan", channel: "Chat", age: "25 min", message: "I enter the code and it asks again. My whole team is locked out right now." },
  { id: "T-2038", subject: "How do I add a new user?", customer: "Ananya Bose", company: "Greenfield Realty", priority: "Low", status: "Pending", assignee: "Dev Malhotra", channel: "Web form", age: "2 h", message: "We have a new joiner starting Monday. Where do I add her and give her access?" },
  { id: "T-2036", subject: "Report shows wrong totals", customer: "Karan Shah", company: "Bluepeak Foods", priority: "Normal", status: "Open", assignee: "Isha Kapoor", channel: "Email", age: "3 h", message: "The monthly total on the sales report does not match our own sheet. Can you check?" },
  { id: "T-2033", subject: "Change billing contact", customer: "Meera Das", company: "Helix Motors", priority: "Normal", status: "Resolved", assignee: "Sana Khan", channel: "Phone", age: "1 d", message: "Please update our billing contact to accounts@helixmotors.in." },
  { id: "T-2031", subject: "Request for a data export", customer: "Neha Iyer", company: "Meridian Steel", priority: "High", status: "New", assignee: "Unassigned", channel: "Email", age: "1 d", message: "We would like a full export of our customer records for an internal review." },
];

export const agents = ["Sana Khan", "Dev Malhotra", "Isha Kapoor", "You"];
