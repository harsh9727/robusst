import React from "react";

const HowWeHelpData = [
  {
    title: "Revenue Growth",
    description:
      "Boost ARPU, monetize data, and launch new digital services faster.",
  },
  {
    title: "Operational Excellence",
    description:
      "Automate workflows, cut costs, and gain real-time business visibility.",
  },
  {
    title: "Customer Experience",
    description:
      "Deliver personalized journeys, reduce churn, and enable self-service engagement.",
  },
  {
    title: "Digital Transformation",
    description:
      "Modernize systems with cloud-native, AI-driven, and 5G-ready solutions.",
  },
  {
    title: "Compliance & Security",
    description:
      "Stay compliant with GDPR, ensure robust data protection, and maintain enterprise-grade security.",
  },
];

export const HowWeHelp: React.FC = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 px-50 py-25">
      <section className="flex flex-col justify-center gap-1 text-center">
        <p className="text-4xl font-medium">How our Solutions Help</p>
        <p className="text-muted-foreground text-lg font-medium">
          Transforming Telecom Challenges into Growth Opportunities
        </p>
      </section>

      <section className="flex flex-wrap items-center justify-center gap-5">
        {HowWeHelpData.map((data, index) => (
          <div key={index} className="max-w-100 rounded-lg border p-3">
            <div className="bg-primary/50 h-10 w-10 rounded-sm" />
            <p className="mt-5 text-lg font-medium">{data.title}</p>
            <p className="text-muted-foreground mt-1 text-sm leading-tight">
              {data.description}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};
