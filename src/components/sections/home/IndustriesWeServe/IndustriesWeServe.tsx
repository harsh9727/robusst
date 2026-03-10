"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { industriesWeServe } from "public";
import type { IndustriesWeServeSection } from "~/i18n/types/home";
import Marquee from "react-fast-marquee";

const IndustriesWeServeImages = [
  industriesWeServe.telecom.src,
  industriesWeServe.banking.src,
  industriesWeServe.fmcg.src,
  industriesWeServe.retails.src,
  industriesWeServe.IT.src,
  industriesWeServe.food.src,
  industriesWeServe.travel.src,
  industriesWeServe.pharma.src,
];

export const IndustriesWeServe: React.FC = () => {
  const t = useTranslations();
  const industriesWeServeSection = t.raw(
    "industriesWeServe",
  ) as IndustriesWeServeSection;
  const [, setCurrentPage] = useState(0);
  const [isHovered] = useState(false);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(
    industriesWeServeSection.items.length / itemsPerPage,
  );

  useEffect(() => {
    if (isHovered) return; // Don't run timer when hovered

    const timer = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 7000); // Change every 7 seconds

    return () => clearInterval(timer);
  }, [totalPages, isHovered]);

  // const currentItems = industriesWeServeSection.items.slice(
  //   currentPage * itemsPerPage,
  //   (currentPage + 1) * itemsPerPage,
  // );

  return (
    <div
      className="relative z-10 flex flex-col gap-6 py-25 sm:gap-9"
      // onMouseEnter={() => setIsHovered(true)}
      // onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-brand-one blur-75 absolute top-0 right-0 h-30 w-130 -translate-x-1/2 -translate-y-1/2 opacity-50" />
      <p className="text-primary-foreground z-10 text-2xl font-black sm:text-3xl lg:text-5xl">
        {industriesWeServeSection.heading}
      </p>
      <Marquee>
        {industriesWeServeSection.items.map((data, index) => {
          return (
            <div key={index} className="group mx-5 flex flex-col gap-3">
              <div className="relative h-60 w-80 overflow-hidden rounded-xl transition-transform duration-300 hover:scale-105 sm:w-100">
                <Image
                  src={IndustriesWeServeImages[index] as string}
                  alt="image"
                  fill
                  className="object-cover object-top brightness-75"
                />
              </div>
              <p className="text-primary-foreground px-1 text-center text-lg font-medium">
                {data.title}
              </p>
            </div>
          );
        })}
      </Marquee>
    </div>
  );
};
