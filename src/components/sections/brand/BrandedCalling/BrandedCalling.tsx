"use client";

import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Brand } from "public";

export const BrandedCalling = () => {
  return (
    <section className="bg-primary relative flex w-full items-center justify-center overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-16 lg:py-25">
      {/* Decorative Blurs */}
      <div className="bg-brand-three absolute -top-40 -right-20 h-40 w-72 rotate-6 blur-[160px]" />
      <div className="bg-brand-three absolute -bottom-20 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full blur-[120px]" />

      <div className="relative z-10 grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* LEFT – PHONE VISUALS */}

        {/* Main Phone */}
        <div className="h-[300px] w-full overflow-hidden rounded-3xl shadow-xl sm:h-[350px] md:h-[500px]">
          <Image
            src={Brand.BrandedCalling}
            alt="Branded Calling Screen"
            className="h-full w-full object-cover"
          />
        </div>

        {/* RIGHT – CONTENT */}
        <div>
          <h2 className="mb-6 text-4xl leading-tight font-extrabold text-white md:text-4xl">
            Branded Calling:
            <br />
            <span className="text-pink-500">Make Every Call Count</span>
          </h2>

          <h3 className="mb-4 text-xl font-semibold text-white md:text-2xl">
            Transform Anonymous Calls Into Trusted Communications
          </h3>

          <p className="mb-6 text-base leading-relaxed text-white/80 md:text-lg">
            Display your company name, logo, and call purpose directly on
            recipient smartphones. Unlike traditional caller ID that only shows
            numbers,{" "}
            <span className="font-semibold text-pink-500">
              Branded Calling delivers verified business identity
            </span>{" "}
            customers instantly recognize and trust.
          </p>

          {/* Benefits */}
          <ul className="mb-8 space-y-3">
            <li className="flex items-center gap-3 text-white">
              <CheckCircle size={20} className="text-pink-500" />
              Verified business identity on every call
            </li>
            <li className="flex items-center gap-3 text-white">
              <CheckCircle size={20} className="text-pink-500" />
              Higher answer rates & customer confidence
            </li>
            <li className="flex items-center gap-3 text-white">
              <CheckCircle size={20} className="text-pink-500" />
              Clear call purpose before answering
            </li>
          </ul>

          <Button
            variant="outline"
            className="border-pink-500 px-6 pt-4 pb-5 text-sm font-medium text-pink-500 capitalize hover:bg-pink-50 hover:text-pink-700 sm:text-base"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};
