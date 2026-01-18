"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { platform } from "public";

export const RegionalExcellence = () => {
  return (
   <section className="relative flex w-full items-center justify-center overflow-hidden bg-primary px-4 py-12 sm:px-6 sm:py-16 lg:px-16 lg:py-25">

      {/* Decorative Blurs */}
      <div className="absolute -top-40 -right-20 h-40 w-72 rotate-6 bg-brand-three blur-[160px]" />
      <div className="absolute -bottom-20 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-brand-three blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-14 lg:grid-cols-2 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h2 className="mb-6 text-3xl font-extrabold leading-tight text-white md:text-4xl">
            <span className="text-pink-500">
              Regional Excellence
            </span>{" "}
            for
            <br />
            Emerging Markets
          </h2>

          <p className="mb-8 max-w-xl text-base leading-relaxed text-white/80">
            Navigate unique regional challenges including diverse regulatory
            environments, varying infrastructure, and evolving spam threats.
            Our localized approach delivers:
          </p>

          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-white/90">
              <CheckCircle2 className="mt-1 h-6 w-6 text-pink-500" />
              <span>
                <strong className="text-white">
                  Regulatory Compliance :
                </strong>{" "}
                International standards alignment with local telecom requirements
              </span>
            </li>

            <li className="flex items-start gap-3 text-white/90">
              <CheckCircle2 className="mt-1 h-6 w-6 text-pink-500" />
              <span>
                <strong className="text-white">
                  Cultural Sensitivity :
                </strong>{" "}
                Multi-language support and respect for local business customs
              </span>
            </li>

            <li className="flex items-start gap-3 text-white/90">
              <CheckCircle2 className="mt-1 h-6 w-6 text-pink-500" />
              <span>
                <strong className="text-white">
                  Infrastructure Optimization :
                </strong>{" "}
                Consistent performance across varying network qualities
              </span>
            </li>

            <li className="flex items-start gap-3 text-white/90">
              <CheckCircle2 className="mt-1 h-6 w-6 text-pink-500" />
              <span>
                <strong className="text-white">
                  Economic Value :
                </strong>{" "}
                Cost-effective solutions with strong ROI
              </span>
            </li>
          </ul>
        </div>

        {/* RIGHT IMAGE */}
        <div className=" overflow-hidden h-[300px] sm:h-[370px] md:h-[400px] lg:h-[500px] rounded-3xl shadow-2xl">
          <Image
            src={platform.cmp}
            alt="Regional Business Communication"
            className="object-cover h-full w-full"
          />
        </div>

      </div>
    </section>
  );
};
