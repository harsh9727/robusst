import Image from "next/image";
import React from "react";

interface BannerProps {
  title: string;
  companyName: string;
  companyLogo: string;
  banner: string;
}

export const Banner: React.FC<BannerProps> = ({
  title,
  companyName,
  companyLogo,
  banner,
}) => {
  return (
    <div className="bg-primary flex h-screen w-full flex-col items-center justify-center lg:flex-row">
      <div className="bg-primary relative order-2 flex h-full w-full flex-col justify-center gap-2 overflow-hidden px-8 sm:px-12 lg:order-1 lg:min-w-[50%] lg:pl-25">
        <div className="bg-brand-one absolute top-full -right-40 h-20 w-50 -translate-y-1/2 rotate-6 animate-pulse blur-[250px] sm:h-120 lg:top-1/2 lg:-left-40" />
        <div className="bg-brand-one absolute -bottom-5 -left-12 h-20 w-120 animate-pulse blur-[120px]" />

        <div className="bg-primary-foreground relative flex h-16 w-30 justify-center overflow-hidden rounded-sm sm:h-20 sm:w-40 md:h-25 md:w-50 md:rounded-lg">
          <Image
            src={companyLogo}
            alt="companyLogo"
            width={200}
            height={200}
            className="h-full w-fit"
          />
        </div>
        <h1 className="text-primary-foreground mt-5 text-3xl font-medium lg:text-4xl xl:text-6xl">
          {title}
        </h1>
        <p className="text-primary-foreground mt-2 text-lg">{companyName}</p>
      </div>

      <div className="relative order-1 h-full w-full items-center justify-center overflow-hidden lg:order-2 lg:min-w-[50%]">
        <div className="bg-primary absolute -bottom-15 -left-4 z-10 h-20 w-[120vw] rotate-6 sm:h-30 lg:-top-9 lg:-left-28 lg:h-[120vh] lg:w-50 lg:rotate-12" />
        <div className="relative h-full w-full bg-black">
          <Image
            src={banner}
            alt="hero image"
            fill
            className="object-cover object-top"
          />
          {/*<div className="bg-primary/50 h-full w-full"></div>*/}
        </div>
      </div>
    </div>
  );
};
