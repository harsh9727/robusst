"use client";

import Image from "next/image";
import { platformbanner } from "public";

const Banner = () => {
  return (
    <section className="relative h-full w-full overflow-hidden">
      <Image
        src={platformbanner.banner}
        alt="Platform Banner"
        className="h-auto w-full object-cover"
        priority
      />

      {/* Right side, vertically center */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2">
        <h1 className="text-6xl font-bold text-white">
          Our AI Platform
        </h1>
      </div>
    </section>
  );
};

export default Banner;
