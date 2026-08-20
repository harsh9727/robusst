"use client";

import React from "react";
import Image from "next/image";
import type { SanityStsDmsSection } from "~/types/sanity/stsDms";

type Props = {
  data: SanityStsDmsSection<"banner">;
};

export const Banner: React.FC<Props> = ({ data }) => {
  if (!data) return null;

  return (
    <div className="bg-primary flex h-screen w-full flex-col items-center justify-center lg:flex-row">
      <div className="bg-primary relative order-2 flex h-full w-full flex-col justify-center gap-2 overflow-hidden px-8 sm:px-12 lg:order-1 lg:min-w-[50%] lg:pl-25">
        <div className="bg-brand-one absolute top-full -right-40 h-20 w-50 -translate-y-1/2 rotate-6 animate-pulse blur-[150px] sm:h-120 lg:top-1/2 lg:-left-40" />
        <div className="bg-brand-one absolute -bottom-5 -left-12 h-20 w-120 animate-pulse blur-[100px]" />

        <h1 className="text-primary-foreground text-3xl font-medium lg:text-4xl xl:text-6xl">
          {data.title}
        </h1>
        <p className="text-primary-foreground mt-2 text-lg">
          {data.description}
        </p>
      </div>

      <div className="relative order-1 h-full w-full items-center justify-center overflow-hidden lg:order-2 lg:min-w-[50%]">
        <div className="bg-primary absolute -bottom-15 -left-4 z-10 h-20 w-[120vw] rotate-6 sm:h-30 lg:-top-9 lg:-left-28 lg:h-[120vh] lg:w-50 lg:rotate-12" />
        <div className="relative h-full w-full bg-gray-500">
          <Image
            src={data.image ?? ""}
            alt={data.imageAlt ?? data.title ?? ""}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
            className="object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
};
