"use client";

import { Check, Layers } from "lucide-react";

const features = [
  "Flexible distributor hierarchy and sales territory management",
  "Automated onboarding with compliance workflows and KYC integration",
  "Real-time stock movement tracking and automated reconciliations",
  "Purchase order management with digital approvals and alerts",
  "ERP integrations for seamless financial oversight",
];

export default function DMS() {
  return (
    <section className="relative bg-white py-24 overflow-hidden">

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-20 lg:grid-cols-2">

          {/* LEFT */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50 px-4 py-2 text-sm text-pink-500 font-semibold">
              <Layers size={16} />
              Distributor Platform
            </div>

            <h2 className="text-4xl font-extrabold leading-tight text-gray-900 lg:text-5xl">
              Distributor
              <span className="block text-pink-500">
                Management Solution
              </span>
              <span className="block text-gray-900">(DMS)</span>
            </h2>

            <p className="mt-6 max-w-xl text-lg text-gray-600">
              Digitally govern your partner ecosystem with intelligent workflows,
              real-time visibility, and enterprise-grade integrations.
            </p>

            {/* Floating highlights */}
            <div className="mt-10 grid grid-cols-2 gap-4 max-w-md">
              {["KYC Ready", "ERP Sync", "Real-Time Stock", "Smart Approvals"].map(
                (item, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-gray-500 bg-white px-4 py-3 text-sm font-semibold text-black hover:text-pink-500 hover:border-pink-500 transition"
                  >
                    {item}
                  </div>
                )
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative">
            <div className="relative rounded-[32px] bg-white/70 p-10 backdrop-blur-xl border border-gray-200 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.15)]">

              <h3 className="mb-8 text-xl font-bold text-black">
                Digitally govern your partner ecosystem with
              </h3>

              <div className="space-y-5">
                {features.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 rounded-xl bg-white px-5 py-4 transition border border-pink-500 hover:translate-x-1 hover:text-pink-500 hover:border-pink-500"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-pink-500/15">
                      <Check className="text-pink-500" size={18} />
                    </div>
                    <p className="text-black">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
