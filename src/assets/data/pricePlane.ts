
export interface PricingPlan {
  title: string;
  price: string;
  description: string;
  features: string[];
}

export const employerPricingPlans: PricingPlan[] = [
  {
    title: "Basic",
    price: "$20/month",
    description: "For small businesses and occasional hiring needs.",
    features: [
      "Up to 2 active job listings per month",
      "30-day visibility per job post",
      "Basic applicant tracking",
      "Standard job listing placement",
      "Employer dashboard access",
    ],
  },
  {
    title: "Standard",
    price: "$45/month",
    description: "For businesses with regular recruitment needs.",
    features: [
      "Up to 15 job posts per month",
      "Premium support",
      "60-day job visibility",
      "Highlighted listings",
      "Applicant management",
    ],
  },
  {
    title: "Premium",
    price: "$70/month",
    description: "For businesses with high-volume hiring needs.",
    features: [
      "Unlimited job postings",
      "Priority support",
      "90-day job visibility",
      "Top placement",
      "Dedicated account management",
    ],
  },
];

export const seekerPricingPlans: PricingPlan[] = [
  {
    title: "Free",
    price: "$0",
    description: "Everything you need to start your job search.",
    features: [
      "Create your job seeker profile",
      "Browse available job listings",
      "Apply for suitable jobs",
      "Manage your applications",
      "Receive application notifications",
    ],
  },
];
