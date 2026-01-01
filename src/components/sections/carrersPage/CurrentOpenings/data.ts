export type role = {
  id: string;
  positionTitle: string;
  department: string;
  roleType: string;
  localtion: string;
  shortDesc: string;
  roleOverView: string[];
  responsibilities: string[];
  requirements: string[];
};

export const currentOpenings: role[] = [
  {
    id: "1",
    positionTitle: "Sales Executive - Telecom Solutions",
    department: "Sales & Business Development",
    roleType: "full-time",
    localtion: "offsite",
    shortDesc:
      "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem",
    roleOverView: [
      "Drive new business opportunities with telecom operators, MVNOs, and digital service providers. Expand Robusst's market presence and help clients transform with our innovative digital solutions",
    ],
    responsibilities: [
      "Identify and pursue new business opportunities with telecom/CSP clients Present Robusst's solution portfolio (BSS, CDP, Sales Tracking, Analytics) Build relationships with C-level decision-makers",
      "Develop custom proposals and lead negotiations to closure Collaborate with technical and delivery teams for client success. Represent Robusst at industry conferences and events",
    ],
    requirements: [
      "Bachelor's degree in Business, Engineering, Telecommunications, or related field",
      "Proven B2B sales experience in telecom software, BSS/OSS, or SaaS",
      "Strong understanding of telecom industry and digital transformation",
      "Excellent communication, presentation, and negotiation skills",
      "Consultative selling approach focused on solving customer problems",
      "Self-motivated with entrepreneurial mindset",
    ],
  },
];
