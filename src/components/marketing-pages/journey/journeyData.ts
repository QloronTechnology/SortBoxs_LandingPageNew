export const stages = ["Awareness", "Consideration", "Decision", "Onboarding", "Loyalty"] as const;

export interface PersonaStage {
  does: string;
  touchpoints: string[];
  marketing: string;
  /** 0 (frustrated) to 100 (delighted). Illustrative. */
  mood: number;
}

export const personas: { key: string; name: string; label: string; stages: PersonaStage[] }[] = [
  {
    key: "priya",
    name: "Priya",
    label: "First-time buyer",
    stages: [
      { does: "Sees an ad and visits the website for the first time.", touchpoints: ["Social ad", "Blog post", "Website"], marketing: "Shows relevant content and captures her details if she wants more.", mood: 45 },
      { does: "Reads a guide and compares options.", touchpoints: ["Guide download", "Email series", "Webinar"], marketing: "Sends helpful emails and invites her to a webinar.", mood: 60 },
      { does: "Asks for a demo and a quote.", touchpoints: ["Demo request", "Sales call", "Quote"], marketing: "Hands her to sales with everything she has read and clicked.", mood: 78 },
      { does: "Signs up and sets up her workspace.", touchpoints: ["Welcome email", "Setup checklist", "Support chat"], marketing: "Sends setup tips and checks that she gets started.", mood: 68 },
      { does: "Uses the product and tells a colleague.", touchpoints: ["Newsletter", "Review request", "Referral"], marketing: "Keeps her informed and asks for a review or referral.", mood: 90 },
    ],
  },
  {
    key: "rahul",
    name: "Rahul",
    label: "Returning customer",
    stages: [
      { does: "Opens a product update email.", touchpoints: ["Newsletter", "Product update"], marketing: "Keeps him informed about what is new.", mood: 62 },
      { does: "Clicks through to a new feature page.", touchpoints: ["Feature page", "Email link"], marketing: "Shows the feature in the context of how he already uses the product.", mood: 66 },
      { does: "Decides to add more users.", touchpoints: ["Account manager", "Quote"], marketing: "Alerts his account owner and sends a tailored offer.", mood: 82 },
      { does: "Adds the new users and trains them.", touchpoints: ["Onboarding email", "Training invite"], marketing: "Sends training invitations and quick-start guides.", mood: 74 },
      { does: "Renews and recommends the product.", touchpoints: ["Renewal reminder", "Case study"], marketing: "Reminds the owner before renewal and invites him to share his story.", mood: 92 },
    ],
  },
];
