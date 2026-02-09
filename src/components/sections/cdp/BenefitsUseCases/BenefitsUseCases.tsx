"use client";

import Image from "next/image";
import {
  Layers,
  Zap,
  Database,
  ShieldCheck,
  BellRing,
} from "lucide-react";
import { platform } from "public";

export const BenefitsUseCases = () => {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-24">

      <div className="relative mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div className="group overflow-hidden rounded-2xl w-full h-[600px]">
          <Image
            src={platform.cmp}
            alt="AI Powered Customer Data Platform"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
        </div>



        {/* RIGHT IMAGE */}
        <div>
          <p className="text-pink-500 text-sm font-semibold py-3 px-5 rounded-lg bg-pink-50 w-fit border border-pink-500 mb-4">
            Benefits & Use Cases
          </p>

          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-6">
            Robust CVM enriched with CDP helps unify, manage, and activate customer data efficiently
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10">

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
                className="group rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:border-pink-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 min-w-11 items-center justify-center rounded-lg bg-pink-50 group-hover:bg-pink-100 transition">
                    <item.icon className="h-5 w-5 text-pink-600" />
                  </div>

                  <div>
                    <h4 className="text-black font-semibold mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-600">
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
