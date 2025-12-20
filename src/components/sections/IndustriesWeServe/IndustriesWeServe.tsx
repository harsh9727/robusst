import React from "react";

const IndustriesWeServeData = [
  {
    title: "Telecom",
  },
  {
    title: "Banking & Financial Services",
  },
  {
    title: "FMCG",
  },
  {
    title: "Retail & E-Commerce",
  },
  {
    title: "Food & Beverage",
  },
  {
    title: "Hospitality & Travel",
  },
  {
    title: "Pharma & Professional Services",
  },
];

export const IndustriesWeServe: React.FC = () => {
  return (
    <div className="flex flex-col gap-9">
      <p className="text-primary-foreground text-4xl font-medium">
        Industries We Serve
      </p>

      <section className="grid grid-cols-4 gap-5">
        {IndustriesWeServeData.map((data, index) => (
          <div key={index}>
            <div className="bg-primary-foreground/20 h-100 w-full rounded-xl" />
          </div>
        ))}
      </section>
    </div>
  );
};
