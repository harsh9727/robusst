"use client";

import Image from "next/image";
import { Layers, Zap, Database, ShieldCheck, BellRing } from "lucide-react";
import { platform } from "public";

export const BenefitsUseCases = () => {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-24">
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* LEFT CONTENT */}
        <div className="group h-[600px] w-full overflow-hidden rounded-2xl">
          <Image
            src={platform.cmp}
            alt="AI Powered Customer Data Platform"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
        </div>

        {/* RIGHT IMAGE */}
        <div>
          <p className="mb-4 w-fit rounded-lg border border-pink-500 bg-pink-50 px-5 py-3 text-sm font-semibold text-pink-500">
            Benefits & Use Cases
          </p>

          <h2 className="mb-6 text-3xl leading-tight font-extrabold text-gray-900 md:text-4xl">
            Robust CVM enriched with CDP helps unify, manage, and activate
            customer data efficiently
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {[
              {
                icon: Layers,
                title: "Precise Segmentation",
                desc: "Quickly enrich and segment customer profiles — no coding needed.",
              },
              {
                icon: Zap,
                title: "Instant Data Preparation",
                desc: "Convert weeks of data work into minutes using automated tools.",
              },
              {
                icon: Database,
                title: "Streamlined Data Operations",
                desc: "Efficiently utilize existing data lakes and warehouses.",
              },
              {
                icon: BellRing,
                title: "Proactive Data Quality",
                desc: "Built-in alerts detect and resolve data issues early.",
              },
              {
                icon: ShieldCheck,
                title: "Safe & Secure Data",
                desc: "Full encryption, governed access, and compliance-ready.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-all hover:-translate-y-1 hover:border-pink-300 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 min-w-11 items-center justify-center rounded-lg bg-pink-50 transition group-hover:bg-pink-100">
                    <item.icon className="h-5 w-5 text-pink-600" />
                  </div>

                  <div>
                    <h4 className="mb-1 font-semibold text-black">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
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
