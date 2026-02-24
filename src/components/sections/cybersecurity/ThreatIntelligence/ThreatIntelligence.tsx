"use client";

import Image from "next/image";
import { Radar, Database, ShieldCheck, ArrowRight } from "lucide-react";
import { platform } from "public";

export default function ThreatIntelligence() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="relative mx-auto max-w-7xl px-6">
        {/* MAIN GRID */}
        <div className="grid items-center gap-14 lg:grid-cols-12">
          {/* LEFT IMAGE */}

          <div className="lg:col-span-6">
            {/* Title */}
            <h2 className="mb-5 text-4xl font-extrabold text-gray-900 md:text-5xl">
              Threat Intelligence
            </h2>

            {/* Subtitle */}
            <p className="text-muted-foreground mt-5 mb-10 text-lg font-medium">
              Real-time adversary insights, dark-web monitoring and threat feeds
              powering SIEM / XDR / SOAR
            </p>

            {/* Feature Cards */}
            {[
              {
                icon: Database,
                title: "Comprehensive Threat Collection",
                text: "Collects threat data across surface, deep and dark web and feeds detection and response tools.",
              },
              {
                icon: ShieldCheck,
                title: "Faster & Smarter Response",
                text: "Provides context so alerts are meaningful, response is faster and smarter.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group mb-5 flex flex-col items-start gap-5 rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-pink-500 hover:shadow-lg sm:flex-row"
              >
                {/* Icon */}
                <div className="flex h-12 min-w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-400 to-pink-500 text-white transition-transform duration-300 group-hover:scale-110">
                  <item.icon size={20} />
                </div>

                {/* Text */}
                <div>
                  <h4 className="text-lg leading-tight font-semibold text-gray-900 transition-colors group-hover:text-pink-500">
                    {item.title}
                  </h4>
                  <p className="mt-2 leading-tight text-gray-600">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* RIGHT CONTENT */}
          <div className="hidden sm:block lg:col-span-6">
            <div className="relative h-[300px] w-full overflow-hidden rounded-xl sm:h-[450px] lg:h-[550px]">
              <Image
                src="/solutions/cybersecurity/threat.webp"
                fill
                alt="MDM Mobile Device Management"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* WHY IT MATTERS */}
        {/* <div className="mt-20 flex items-start gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-5">
          <ArrowRight className="mt-1 text-pink-500" size={28} />
          <p className="text-lg leading-relaxed text-gray-700">
            <span className="font-bold text-gray-900 uppercase">
              Why it matters :
            </span>{" "}
            Knowing what threats are already targeting your organization or
            industry gives you the proactive edge.
          </p>
        </div> */}
      </div>
    </section>
  );
}
