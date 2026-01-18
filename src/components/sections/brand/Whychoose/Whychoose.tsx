"use client";

import { ShieldCheck, Plug, Globe2, MapPinned } from "lucide-react";

export const Whychoose = () => {
  return (
    <section className="relative overflow-hidden bg-white py-20 px-4 sm:px-8">
      
      {/* Background abstract glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-pink-400/20 blur-[120px]" />
        <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-purple-400/20 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl">
        
        {/* Heading */}
        <h2 className="mb-10 md:mb-16 text-center text-3xl sm:text-4xl md:text-4xl font-extrabold text-pink-500">
          Why Choose Our Solution?
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Card 1 */}
          <div className="group relative rounded-3xl border border-pink-500/30 bg-white/70 backdrop-blur-xl p-8 shadow-md transition hover:shadow-2xl">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-black px-6 py-3 text-sm font-semibold text-green-400">
              <ShieldCheck size={22} />
              Telecom-Grade Reliability
            </div>
            <p className="text-gray-700 leading-relaxed">
              Enterprise infrastructure with{" "}
              <span className="font-semibold text-gray-900">99.9% uptime</span>{" "}
              guarantee, processing millions of calls daily across diverse
              network conditions.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group relative rounded-3xl border border-pink-500/30 bg-white/70 backdrop-blur-xl p-8 shadow-md transition hover:shadow-2xl">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-black px-6 py-3 text-sm font-semibold text-green-400">
              <Plug size={22} />
              Seamless Integration
            </div>
            <p className="text-gray-700 leading-relaxed">
              Deploy in days with{" "}
              <span className="font-semibold text-gray-900">RESTful APIs</span>{" "}
              and comprehensive SDKs that integrate effortlessly with existing
              CRM and call center platforms.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group relative rounded-3xl border border-pink-500/30 bg-white/70 backdrop-blur-xl p-8 shadow-md transition hover:shadow-2xl">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-black px-6 py-3 text-sm font-semibold text-green-400">
              <Globe2 size={22} />
              Regional Compliance Leadership
            </div>
            <p className="text-gray-700 leading-relaxed">
              Full compliance with international telecom standards and{" "}
              <span className="font-semibold text-gray-900">
                STIR/SHAKEN protocols
              </span>{" "}
              backed by advanced security and governance controls.
            </p>
          </div>

          {/* Card 4 */}
          <div className="group relative rounded-3xl border border-pink-500/30 bg-white/70 backdrop-blur-xl p-8 shadow-md transition hover:shadow-2xl">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-black px-6 py-3 text-sm font-semibold text-green-400">
              <MapPinned size={22} />
              Local Expertise
            </div>
            <p className="text-gray-700 leading-relaxed">
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
