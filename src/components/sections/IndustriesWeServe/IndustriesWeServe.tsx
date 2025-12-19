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
    <div className="flex w-full flex-col items-center justify-center gap-8 px-50 py-25">
      <section className="flex flex-col justify-center gap-1 text-center">
        <p className="text-4xl font-medium">Industries We Serve</p>
        <p className="text-muted-foreground text-lg font-medium">
          Empowering Diverse Telecom Sectors Worldwide
        </p>
      </section>

      <section className="flex flex-wrap justify-center gap-5">
        {IndustriesWeServeData.map((data, index) => (
          <div key={index} className="w-full max-w-80 rounded-lg border p-3">
            <div className="bg-primary/20 h-50 w-full rounded-sm" />
            <p className="mt-2 text-center text-lg font-medium">{data.title}</p>
          </div>
        ))}
      </section>
    </div>
  );
};
