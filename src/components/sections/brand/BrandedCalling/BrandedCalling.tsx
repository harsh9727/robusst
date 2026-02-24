"use client";

import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import { platform } from "public";

export const BrandedCalling = () => {
  return (
    <>
      <div className="w-full overflow-hidden bg-white sm:-mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 150">
          <path
            d="M0,80 C300,50 400,50 600,80 C800,110 900,110 1200,80 L1200,200 L0,200 Z"
            fill="#000000"
          />
        </svg>
      </div>

      <section className="bg-primary relative flex w-full items-center justify-center overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-16 lg:py-25">
        <div className="relative z-10 grid w-full max-w-7xl grid-cols-1 items-center gap-30 lg:grid-cols-2">
          {/* LEFT – PHONE VISUALS */}

          {/* Main Phone */}
          <div className="relative h-full scale-125">
            <Image
              src="/solutions/brand/2.webp"
              fill
              alt="Branded Calling Screen"
              className="animate-float h-full w-full object-cover"
            />
          </div>

          {/* RIGHT – CONTENT */}
          <div>
            <h2 className="mb-6 text-4xl leading-tight font-extrabold text-white md:text-4xl">
              Branded Calling:
              <br />
              <span className="text-brand-two">Make Every Call Count</span>
            </h2>

            <h3 className="mb-4 text-xl font-semibold text-white md:text-2xl">
              Transform Anonymous Calls Into Trusted Communications
            </h3>

            <p className="mb-6 text-base leading-relaxed text-white/80 md:text-lg">
              Display your company name, logo, and call purpose directly on
              recipient smartphones. Unlike traditional caller ID that only
              shows numbers,{" "}
              <span className="text-brand-two font-semibold">
                Branded Calling delivers verified business identity
              </span>{" "}
              customers instantly recognize and trust.
            </p>

            {/* Benefits */}
            <ul className="mb-8 space-y-3">
              <li className="flex items-center gap-3 text-white">
                <CheckCircle size={20} className="text-brand-two" />
                Verified business identity on every call
              </li>
              <li className="flex items-center gap-3 text-white">
                <CheckCircle size={20} className="text-brand-two" />
                Higher answer rates & customer confidence
              </li>
              <li className="flex items-center gap-3 text-white">
                <CheckCircle size={20} className="text-brand-two" />
                Clear call purpose before answering
              </li>
            </ul>

            <Button
              variant="outline"
              className="border-brand-two hover:bg-brand-two/90 bg-brand-two px-6 pt-4 pb-5 text-sm font-medium text-black capitalize sm:text-base"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
      <div className="w-full overflow-hidden bg-white sm:-mt-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 150"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 C300,150 400,150 600,120 C800,90 900,90 1200,120 L1200,0 L0,0 Z"
            fill="#000000"
            stroke="none"
          />
        </svg>
      </div>
    </>
  );
};
