"use client";

import Image from "next/image";
import { ShieldCheck, Globe, Lock, ClipboardCheck } from "lucide-react";
import { platform } from "public";

export const SecurityCompliance = () => {
  return (
    <section className="w-full bg-white px-4 py-20 sm:px-6 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 flex flex-col items-center justify-center gap-6 sm:items-center sm:gap-5">
          {/*<div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl">
            <Image
              src={platform.cmp}
              alt="Security and Compliance"
              fill
              className="object-contain"
            />
          </div>*/}

          <h2 className="text-brand-one text-3xl font-extrabold tracking-tight md:text-4xl">
            SECURITY & COMPLIANCE
          </h2>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1 */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <ShieldCheck className="text-brand-one mb-4 h-10 w-10" />
            <h4 className="mb-3 text-xl font-bold text-black">
              International Standards
            </h4>
            <p className="text-sm leading-relaxed text-gray-600">
              Full STIR/SHAKEN compliance with cryptographic authentication
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <Globe className="text-brand-one mb-4 h-10 w-10" />
            <h4 className="mb-3 text-xl font-bold text-black">
              Regional Alignment
            </h4>
            <p className="text-sm leading-relaxed text-gray-600">
              Local telecom regulatory bodies and consumer protection compliance
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <Lock className="text-brand-one mb-4 h-10 w-10" />
            <h4 className="mb-3 text-xl font-bold text-black">
              Enterprise Security
            </h4>
            <p className="text-sm leading-relaxed text-gray-600">
              Military-grade encryption with regional data sovereignty
            </p>
          </div>

          {/* Card 4 */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <ClipboardCheck className="text-brand-one mb-4 h-10 w-10" />
            <h4 className="mb-3 text-xl font-bold text-black">Audit Ready</h4>
            <p className="text-sm leading-relaxed text-gray-600">
              Comprehensive logging for regulatory verification and business
              transparency
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
