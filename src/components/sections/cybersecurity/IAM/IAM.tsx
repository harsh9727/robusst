"use client";

import Image from "next/image";
import { Fingerprint, ShieldCheck, Lock, ArrowRight } from "lucide-react";
import { platform } from "public";

export default function MDM() {
  return (
    <section className="relative overflow-hidden bg-white py-32">
      <div className="relative mx-auto max-w-7xl px-6">
        {/* MAIN GRID */}
        <div className="grid items-center gap-14 lg:grid-cols-12">
          {/* LEFT IMAGE */}

          <div className="lg:col-span-6">
            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-pink-500 px-4 py-2 text-sm font-semibold text-pink-50 text-pink-500">
              <Fingerprint size={16} />
              IAM Module
            </div>

            {/* Title */}
            <h2 className="mb-5 text-4xl font-extrabold text-gray-900 md:text-5xl">
              Identity & Access Management
            </h2>

            {/* Subtitle */}
            <p className="mt-5 mb-10 text-lg font-medium text-pink-500">
              Zero-trust identity controls: MFA, SSO, adaptive access, identity
              threat detection (ITDR)
            </p>

            {/* Feature Cards */}
            {[
              {
                icon: Lock,
                title: "Access Enforcement & Monitoring",
                text: "Enforces who can access what, when and how, while continuously monitoring identity threats.",
              },
              {
                icon: ShieldCheck,
                title: "Zero-Trust Identity Model",
                text: "Shifts security from 'trusted network' to 'trusted identity' supporting modern zero-trust architecture.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group mb-5 flex items-start gap-5 rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-pink-500 hover:shadow-lg"
              >
                {/* Icon */}
                <div className="flex h-12 min-w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-400 to-pink-500 text-white transition-transform duration-300 group-hover:scale-110">
                  <item.icon size={20} />
                </div>

                {/* Text */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-pink-500">
                    {item.title}
                  </h4>
                  <p className="mt-2 leading-relaxed text-gray-600">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* RIGHT CONTENT */}
          <div className="lg:col-span-6">
            <div className="relative h-[600px] w-full overflow-hidden rounded-3xl border border-gray-200 shadow-xl transition-transform duration-500 hover:-translate-y-2">
              <Image
                src={platform.cmp}
                alt="MDM Mobile Device Management"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* WHY IT MATTERS */}
        <div className="mt-20 flex items-start gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-5">
          <ArrowRight className="mt-1 text-pink-500" size={28} />
          <p className="text-lg leading-relaxed text-gray-700">
            <span className="font-bold text-gray-900 uppercase">
              Why it matters :
            </span>{" "}
            Identity is the new perimeter—controlling access is as critical as
            controlling devices.
          </p>
        </div>
      </div>
    </section>
  );
}
