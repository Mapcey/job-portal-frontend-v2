export const JOB_CAT = [
  "Accounting & Finance",
  "Administration & Office Support",
  "Advertising & Marketing",
  "Agriculture, Forestry & Fishing",
  "Architecture & Design",
  "Arts, Media & Entertainment",
  "Automotive",
  "Banking & Financial Services",
  "Biotechnology & Life Sciences",
  "Call Centre & Customer Service",
  "Construction & Property",
  "Consulting & Strategy",
  "Community Services & Development",
  "Defence & Emergency Services",
  "Design & Creative",
  "Education & Training",
  "Engineering",
  "Environmental Services",
  "Executive & C-Level",
  "Government & Public Sector",
  "Healthcare & Medical",
  "Hospitality & Tourism",
  "Human Resources & Recruitment",
  "Information & Communication Technology (ICT)",
  "Insurance",
  "Legal",
  "Logistics, Transport & Supply Chain",
  "Manufacturing, Production & Operations",
  "Mining, Resources & Energy",
  "Non-Profit & NGOs",
  "Personal Services & Care",
  "Project Management",
  "Real Estate & Property",
  "Retail & Consumer Products",
  "Sales",
  "Science & Technology",
  "Security & Surveillance",
  "Social Work & Counselling",
  "Sports & Recreation",
  "Telecommunications",
  "Trades & Services",
  "Translation & Languages",
  "Utilities & Energy",
  "Veterinary & Animal Care",
  "Writing, Editing & Publishing",
  "Other",
] as const;

export const JOB_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
] as const;

export const WORK_TYPE = ["On-Site", "Remote", "Hybrid"] as const;

export const EDU_LEVELS = [
  "O/L",
  "A/L",
  "Certificate",
  "High School",
  "Diploma",
  "Bachelors",
  "Masters",
  "MPhi",
  "PhD",
] as const;

export const LANG = ["Sinhala", "English", "Tamil"];

export const SAL_RANGES = ["0 - 60k", "60k - 100k", "100k - 150k", "150k +"];

export interface JobCategoryGroup {
  name: string;
  subcategories: string[];
}

// for landing page
export const JOB_CATEGORY_GROUPS: JobCategoryGroup[] = [
  {
    name: "Business, Finance & Administration",
    subcategories: [
      "Accounting & Finance",
      "Administration & Office Support",
      "Banking & Financial Services",
      "Consulting & Strategy",
      "Executive & C-Level",
      "Human Resources & Recruitment",
      "Insurance",
      "Project Management",
    ],
  },

  {
    name: "Technology, Science & Engineering",
    subcategories: [
      "Engineering",
      "Information & Communication Technology (ICT)",
      "Science & Technology",
      "Biotechnology & Life Sciences",
      "Telecommunications",
    ],
  },

  {
    name: "Construction, Property & Trades",
    subcategories: [
      "Architecture & Design",
      "Construction & Property",
      "Real Estate & Property",
      "Trades & Services",
      "Automotive",
      "Manufacturing, Production & Operations",
    ],
  },

  {
    name: "Sales, Marketing & Customer Services",
    subcategories: [
      "Advertising & Marketing",
      "Sales",
      "Call Centre & Customer Service",
      "Retail & Consumer Products",
    ],
  },

  {
    name: "Healthcare, Care & Community Services",
    subcategories: [
      "Healthcare & Medical",
      "Community Services & Development",
      "Social Work & Counselling",
      "Personal Services & Care",
      "Veterinary & Animal Care",
    ],
  },

  {
    name: "Public Sector, Security & Environment",
    subcategories: [
      "Government & Public Sector",
      "Defence & Emergency Services",
      "Security & Surveillance",
      "Environmental Services",
      "Utilities & Energy",
      "Mining, Resources & Energy",
      "Agriculture, Forestry & Fishing",
    ],
  },

  {
    name: "Education, Creative & Media",
    subcategories: [
      "Education & Training",
      "Arts, Media & Entertainment",
      "Design & Creative",
      "Writing, Editing & Publishing",
      "Translation & Languages",
    ],
  },

  {
    name: "Hospitality, Transport & Recreation",
    subcategories: [
      "Hospitality & Tourism",
      "Logistics, Transport & Supply Chain",
      "Sports & Recreation",
      "Non-Profit & NGOs",
      "Legal",
    ],
  },
];
