import Image from "next/image";
import React from "react";

interface BannerProps {
  title: string;
  companyName: string;
  companyLogo: string;
}

export const Banner: React.FC<BannerProps> = ({
  title,
  companyName,
  companyLogo,
}) => {
  return (
    <div className="bg-primary flex h-screen w-full flex-col items-center justify-center">
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
  );
};
