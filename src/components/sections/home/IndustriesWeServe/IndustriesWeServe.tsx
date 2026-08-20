"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import type { SanityHomeSection } from "~/types/sanity/home";
import Marquee from "react-fast-marquee";

interface IndustriesWeServeProps {
  data: SanityHomeSection<"industriesWeServe">;
}

export const IndustriesWeServe: React.FC<IndustriesWeServeProps> = ({
  data,
}) => {
  const items = data.items ?? [];
  const [, setCurrentPage] = useState(0);
  const [isHovered] = useState(false);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  useEffect(() => {
    if (isHovered) return; // Don't run timer when hovered

    const timer = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 7000); // Change every 7 seconds

    return () => clearInterval(timer);
  }, [totalPages, isHovered]);

  if (!data) return null;

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
      <div className="bg-brand-one absolute top-0 right-0 h-30 w-130 -translate-x-1/2 -translate-y-1/2 opacity-50 blur-[150px]" />
      <p className="text-primary-foreground z-10 text-2xl font-black sm:text-3xl lg:text-5xl">
        {data.heading}
      </p>
      <Marquee>
        {items.map((item, index) => {
          return (
            <div key={index} className="group mx-5 flex flex-col gap-3">
              <div className="relative h-60 w-80 overflow-hidden rounded-xl transition-transform duration-300 hover:scale-105 sm:w-100">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.imageAlt ?? item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                    className="object-cover object-top brightness-75"
                  />
                )}
              </div>
              <p className="text-primary-foreground px-1 text-center text-lg font-medium">
                {item.title}
              </p>
            </div>
          );
        })}
      </Marquee>
    </div>
  );
};
