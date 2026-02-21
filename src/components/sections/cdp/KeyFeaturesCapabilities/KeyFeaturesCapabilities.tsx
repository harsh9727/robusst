"use client";

import Image from "next/image";
import { Link2, Cpu, Database, ShieldCheck } from "lucide-react";
import { platform } from "public";

export const KeyFeaturesCapabilities = () => {
  return (
    <section className="relative bg-gradient-to-b from-white to-slate-50 px-6 py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* LEFT – CONTENT */}

        <div className="group relative h-[550px] w-full overflow-hidden rounded-2xl">
          <Image
            src="/solutions/cdp/5.webp"
            fill
            alt="AI Powered Customer Data Platform"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
        </div>

        {/* RIGHT – IMAGE */}

        <div>
          <p className="mb-4 w-fit rounded-lg border border-pink-500 bg-pink-50 px-5 py-3 text-sm font-semibold text-pink-500">
            Key Features & Capabilities
          </p>

          <h2 className="mb-6 text-3xl leading-tight font-extrabold text-slate-900 md:text-4xl">
            Simplifies data integration, processing, and activation across
            channels
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {[
              {
                icon: Link2,
                title: "Link Multiple Identities",
                desc: "Connects cookies, phone numbers, contracts, emails, and other identifiers into unified profiles.",
              },
              {
                icon: Cpu,
                title: "Direct Digital Data Processing",
                desc: "Collects data directly from websites and applications in real time.",
              },
              {
                icon: Database,
                title: "Integrate Any Data Source",
                desc: "Works seamlessly with data lakes, warehouses, and internal systems.",
              },
              {
                icon: ShieldCheck,
                title: "Secure Data Sharing",
                desc: "Enables governed and secure export of data to ML tools, CRM, and more.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-all hover:-translate-y-1 hover:border-pink-300 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 min-w-11 items-center justify-center rounded-md bg-pink-50">
                    <item.icon className="h-6 w-6 text-pink-500" />
                  </div>

                  <div>
                    <h4 className="mb-1 font-semibold text-slate-900">
                      {item.title}
                    </h4>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
