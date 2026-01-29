"use client";

import { ShieldCheck, Plug, Globe2, MapPinned } from "lucide-react";

export const Whychoose = () => {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-20 sm:px-8">
      {/* Background abstract glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-pink-400/20 blur-[120px]" />
        <div className="absolute right-10 bottom-10 h-72 w-72 rounded-full bg-purple-400/20 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <h2 className="mb-10 text-center text-3xl font-extrabold text-pink-500 sm:text-4xl md:mb-16 md:text-4xl">
          Why Choose Our Solution?
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* Card 1 */}
          <div className="group relative rounded-3xl border border-pink-500/30 bg-white/70 p-8 shadow-md backdrop-blur-xl transition hover:shadow-2xl">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-black px-6 py-3 text-sm font-semibold text-green-400">
              <ShieldCheck size={22} />
              Telecom-Grade Reliability
            </div>
            <p className="leading-relaxed text-gray-700">
              Enterprise infrastructure with{" "}
              <span className="font-semibold text-gray-900">99.9% uptime</span>{" "}
              guarantee, processing millions of calls daily across diverse
              network conditions.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group relative rounded-3xl border border-pink-500/30 bg-white/70 p-8 shadow-md backdrop-blur-xl transition hover:shadow-2xl">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-black px-6 py-3 text-sm font-semibold text-green-400">
              <Plug size={22} />
              Seamless Integration
            </div>
            <p className="leading-relaxed text-gray-700">
              Deploy in days with{" "}
              <span className="font-semibold text-gray-900">RESTful APIs</span>{" "}
              and comprehensive SDKs that integrate effortlessly with existing
              CRM and call center platforms.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group relative rounded-3xl border border-pink-500/30 bg-white/70 p-8 shadow-md backdrop-blur-xl transition hover:shadow-2xl">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-black px-6 py-3 text-sm font-semibold text-green-400">
              <Globe2 size={22} />
              Regional Compliance Leadership
            </div>
            <p className="leading-relaxed text-gray-700">
              Full compliance with international telecom standards and{" "}
              <span className="font-semibold text-gray-900">
                STIR/SHAKEN protocols
              </span>{" "}
              backed by advanced security and governance controls.
            </p>
          </div>

          {/* Card 4 */}
          <div className="group relative rounded-3xl border border-pink-500/30 bg-white/70 p-8 shadow-md backdrop-blur-xl transition hover:shadow-2xl">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-black px-6 py-3 text-sm font-semibold text-green-400">
              <MapPinned size={22} />
              Local Expertise
            </div>
            <p className="leading-relaxed text-gray-700">
              Deep market understanding with regional support teams providing
              seamless implementation, optimization, and ongoing performance
              tuning.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
