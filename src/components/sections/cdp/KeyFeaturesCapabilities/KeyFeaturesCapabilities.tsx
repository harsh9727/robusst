"use client";

import Image from "next/image";
import {
  Link2,
  Cpu,
  Database,
  ShieldCheck,
} from "lucide-react";
import { platform } from "public";

export const KeyFeaturesCapabilities = () => {
  return (
    <section className="relative bg-gradient-to-b from-white to-slate-50 px-6 py-24">

      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT – CONTENT */}

<div className="group overflow-hidden rounded-2xl w-full h-[550px]">
  <Image
    src={platform.cmp}
    alt="AI Powered Customer Data Platform"
    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
  />
</div>




        {/* RIGHT – IMAGE */}

        <div>

          <p className="text-pink-500 text-sm font-semibold py-3 px-5 rounded-lg bg-pink-50 w-fit border border-pink-500 mb-4">
            Key Features & Capabilities
          </p>

          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-6">
            Simplifies data integration, processing, and activation across channels
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10">

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
                className="group rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:border-pink-300"

              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 min-w-11 items-center justify-center rounded-md bg-pink-50">
                    <item.icon className="h-6 w-6 text-pink-500" />
                  </div>

                  <div>
                    <h4 className="text-slate-900 font-semibold mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-slate-600">
                      {item.desc}
                    </p>
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
