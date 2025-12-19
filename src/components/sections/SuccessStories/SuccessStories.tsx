import React from "react";

const IndustriesWeServeData = [
  {
    title: "Airtel",
    description:
      "Network Monetization Tools deployed to enhance User Service Experience",
  },
  {
    title: "Chili",
    description: "E-KYC, Self Care, USSD Gateway",
  },
  {
    title: "VI",
    description: "Network Coverage Measurement System Deployed Successfully",
  },
  {
    title: "IU",
    description: "Provisioning & Mediation & RBT running successfully",
  },
];

export const SuccessStories: React.FC = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 px-50 py-25">
      <section className="flex flex-col justify-center gap-1 text-center">
        <p className="text-4xl font-medium">Telco Success Stories</p>
      </section>

      <section className="grid grid-cols-4 gap-5">
        {IndustriesWeServeData.map((data, index) => (
          <div key={index} className="w-full rounded-lg border p-3">
            <div className="bg-primary/20 h-40 w-full rounded-sm" />
            <section className="px-1">
              <p className="mt-2 text-lg font-medium">{data.title}</p>
              <p className="text-muted-foreground mt-1 text-sm leading-tight">
                {data.description}
              </p>
            </section>
          </div>
        ))}
      </section>
    </div>
  );
};
