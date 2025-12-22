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
  {
    title: "Pharma & Professional Services",
  },
];

export const IndustriesWeServe: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 sm:gap-9">
      <p className="text-primary-foreground text-2xl font-medium sm:text-3xl lg:text-4xl">
        Industries We Serve
      </p>

      <section className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
        {IndustriesWeServeData.map((data, index) => (
          <div key={index}>
            <div className="bg-primary-foreground/20 h-60 w-full rounded-xl sm:h-80 lg:h-100" />
          </div>
        ))}
      </section>
    </div>
  );
};
