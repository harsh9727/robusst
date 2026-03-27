"use client";

import Image from "next/image";
import { Button } from "~/components/ui/button";
import { platform } from "public";

export const IdentityResolution = () => {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-24">
      {/* Subtle background accents */}
      <div className="absolute -top-32 -left-32 h-105 w-105 bg-sky-100 blur-[100px]" />
      <div className="absolute right-0 bottom-0 h-105 w-105 bg-indigo-100 blur-[100px]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-15 lg:grid-cols-12">
        {/* LEFT – Media Card */}
        <div className="lg:col-span-5">
          <div className="group relative h-137.5 w-full overflow-hidden rounded-lg">
            <Image
              src={platform.cmp}
              alt="Robusst Identity Resolution Engine"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />

            {/* Floating badge (no zoom) */}
            <div className="absolute right-0 bottom-6 left-0 mx-auto w-fit rounded-xl border border-pink-50 bg-pink-50 px-6 py-3 shadow-md backdrop-blur">
              <p className="mb-1 text-center text-sm font-semibold text-pink-600">
                Identity Resolution Engine
              </p>
              <p className="text-center text-xs text-black">
                Deterministic + Probabilistic Matching
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT – Content */}
        <div className="lg:col-span-7">
          <h2 className="mb-6 text-4xl leading-tight font-extrabold text-gray-900 md:text-5xl">
            Robusst <br />
            <span className="text-pink-500">Identity Resolution Engine</span>
          </h2>

          <p className="text-md mb-5 w-fit border-b border-pink-500 pb-2 font-bold text-pink-500">
            Problem Solved :
          </p>

          <p className="mb-4 max-w-2xl leading-relaxed text-black">
            Multiple customer identifiers across systems result in duplicate
            records, fragmented identities, and wasted engagement efforts.
          </p>

          <p className="max-w-2xl leading-relaxed text-black">
            Our engine deterministically and probabilistically matches and
            merges customer identities across all touchpoints—delivering
            consolidated, privacy-compliant unified profiles built for scale and
            trust.
          </p>

          {/* Feature highlights */}
          <div className="mt-5 grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              "Deterministic Identity Matching",
              "Probabilistic Intelligence Models",
              "Single Unified Customer Profile",
              "Privacy & Compliance Ready",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition hover:shadow-md"
              >
                <span className="h-2 w-2 rounded-full bg-pink-500" />
                <span className="text-sm font-medium text-gray-800">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <Button className="mt-7 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-10 py-6 text-white transition hover:from-cyan-600 hover:to-purple-700">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};
