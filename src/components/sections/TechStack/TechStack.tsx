import React from "react";

const HowWeHelpData = [
  {
    title: "Cloud-Native Platforms",
    description: "AWS | Azure | GCP | Kubernetes",
  },
  {
    title: "AI & Machine Learning",
    description: "Predictive analytics, NLP, automated insights.",
  },
  {
    title: "Enterprise Security",
    description: "SOC2, GDPR, ISO27001, Encrypted by default.",
  },
  {
    title: "Seamless Integration",
    description: "APIs, Webhooks, Real-time sync.",
  },
];

export const TechStack: React.FC = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 px-50 py-25">
      <section className="flex flex-col justify-center gap-1 text-center">
        <p className="text-4xl font-medium">
          Built on a Cutting-Edge Technology Stack
        </p>
        <p className="text-muted-foreground text-lg font-medium">
          Empowering Diverse Telecom Sectors Worldwide
        </p>
      </section>

      <section className="flex flex-wrap justify-center gap-5">
        {HowWeHelpData.map((data, index) => (
          <div key={index} className="max-w-100 rounded-lg border p-3">
            <p className="text-lg font-medium">{data.title}</p>
            <p className="text-muted-foreground mt-1 text-sm leading-tight">
              {data.description}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};
