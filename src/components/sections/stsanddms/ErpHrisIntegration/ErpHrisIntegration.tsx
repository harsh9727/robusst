"use client";

import Image from "next/image";
import {
  Database,
  Smartphone,
  ShieldCheck,
  FileSearch,
  Settings,
  Plug,
} from "lucide-react";
import { platform } from "public";

const features = [
  {
    icon: Database,
    title: "Real-time Data Sync",
    desc: "Bi-directional sync ensures HR & ERP data stays accurate across systems.",
  },
  {
    icon: Smartphone,
    title: "One Device, One Login",
    desc: "Restrict access with device-bound authentication for stronger control.",
  },
  {
    icon: ShieldCheck,
    title: "OTP-Secured Access",
    desc: "Multi-factor authentication to prevent unauthorized logins.",
  },
  {
    icon: FileSearch,
    title: "Audit & Compliance Logs",
    desc: "Complete activity trails for audits, compliance, and investigations.",
  },
  {
    icon: Settings,
    title: "Modern REST APIs",
    desc: "Secure, scalable APIs built for modern ERP ecosystems.",
  },
  {
    icon: Plug,
    title: "Custom ERP Integration",
    desc: "Plug into legacy or custom ERP systems with ease.",
  },
];

const erpLogos = [
 platform.cdp1,
 platform.cdp1,
 platform.cdp1,
 platform.cdp1,
 platform.cdp1,
];

export default function ErpHrisIntegration() {
  return (
    <section className="relative overflow-hidden bg-[#0b0f1a] py-28">
      {/* Background effects */}
         {/* Background Effects */}
      <div className="absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute -bottom-40 -right-40 h-[420px] w-[420px] rounded-full bg-indigo-500/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-20 text-center">
          <span className="inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-md font-semibold text-emerald-400">
            ERP • HRIS • Security
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Seamless ERP & HRIS Integration
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-gray-400">
            Secure, scalable integrations that connect your HRIS with leading ERP
            platforms — in real time.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item, i) => (
            <div
              key={i}
              className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-emerald-400/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400/20 to-blue-500/20 text-emerald-400">
                <item.icon className="h-6 w-6" />
              </div>

              <h3 className="text-lg font-semibold text-white">
                {item.title}
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* ERP Logos */}
        <div className="mt-24 rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
          <p className="mb-8 text-center text-md font-medium text-gray-400">
            Compatible with industry-leading ERP platforms
          </p>

          <div className="flex flex-wrap items-center justify-center gap-12">
            {erpLogos.map((logo, i) => (
              <div
                key={i}
                className="flex h-24 w-42 items-center justify-center rounded-xl border border-white/10 bg-black/30 transition hover:border-emerald-400/40 overflow-hidden"
              >
                <Image
                  src={logo}
                  alt="ERP Logo"
                  className="opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}