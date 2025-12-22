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
  {
    title: "Compliance & Security",
    description:
      "Stay compliant with GDPR, ensure robust data protection, and maintain enterprise-grade security.",
  },
];

export const HowWeHelp: React.FC = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 px-6 py-12 sm:gap-8 sm:px-12 sm:py-16 lg:px-25 lg:py-25">
      <section className="flex flex-col justify-center gap-1 px-4 text-center">
        <p className="text-2xl font-medium sm:text-3xl lg:text-4xl">
          How our Solutions Help
        </p>
        <p className="text-muted-foreground text-base font-medium sm:text-lg">
          Transforming Telecom Challenges into Growth Opportunities
        </p>
      </section>

      <section className="container grid w-full grid-cols-1 gap-4 px-6 sm:grid-cols-2 sm:gap-5 sm:px-12 lg:grid-cols-3 lg:px-25">
        {HowWeHelpData.map((data, index) => (
          <div
            key={index}
            className="w-full rounded-lg border p-4 sm:p-5 lg:p-3"
          >
            <div className="bg-primary/50 h-10 w-10 rounded-sm" />
            <p className="mt-4 text-lg font-medium sm:mt-5 sm:text-xl">
              {data.title}
            </p>
            <p className="text-muted-foreground mt-1 text-sm leading-tight">
              {data.description}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};
