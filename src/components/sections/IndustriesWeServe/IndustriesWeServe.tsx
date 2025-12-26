import Image from "next/image";
import { industriesWeServe } from "public";
import React from "react";

const IndustriesWeServeData = [
  {
    image: industriesWeServe.telecom.src,
    title: "Telecom",
  },
  {
    image: industriesWeServe.banking.src,
    title: "Banking & Financial Services",
  },
  {
    image: industriesWeServe.fmcg.src,
    title: "FMCG",
  },
  {
    image: industriesWeServe.retails.src,
    title: "Retail & E-Commerce",
  },
  {
    image: industriesWeServe.IT.src,
    title: "Technology & IT Support Services",
  },
  {
    image: industriesWeServe.travel.src,
    title: "Hospitality & Travel",
  },
  {
    image: industriesWeServe.pharma.src,
    title: "Pharma & Professional Services",
  },
];

export const IndustriesWeServe: React.FC = () => {
  return (
    <div className="relative z-10 flex flex-col gap-6 sm:gap-9">
      <div className="bg-brand-two absolute top-0 right-0 h-30 w-130 -translate-x-1/2 -translate-y-1/2 blur-[200px]" />

      <p className="text-primary-foreground z-10 text-2xl font-medium sm:text-3xl lg:text-4xl">
        Industries We Serve
      </p>

      <section className="z-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
        {IndustriesWeServeData.map((data, index) => (
          <div key={index} className="group flex flex-col gap-3">
            <div className="relative h-60 overflow-hidden rounded-xl">
              <Image
                src={data.image}
                alt="image"
                fill
                className="object-cover object-top brightness-75"
              />
            </div>
            <p className="text-primary-foreground px-1 text-lg font-medium">
              {data.title}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};
