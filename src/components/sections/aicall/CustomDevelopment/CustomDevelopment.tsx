"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Wrench, Sparkles, GitBranch } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Aicall_JsonType } from "~/types/api/aicall_json.types";
import { Button } from "~/components/ui/button";
import Link from "next/link";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Wrench,
  Sparkles,
  GitBranch,
};

type Props = {
  data?: Aicall_JsonType["ai_call_page"]["customDevelopment"];
};

export default function CustomDevelopment({ data }: Props) {
  if (!data) return null;

  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2">
        {/* LEFT CONTENT */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative h-75 w-full overflow-hidden rounded-3xl shadow-2xl sm:h-100 md:h-125 lg:h-150">
            <Image
              src="/solutions/aicall/14.webp"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
              alt="Custom Development"
              className="h-full w-full object-cover"
            />
          </div>

          {/* glow */}
          <div className="absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-blue-200 opacity-40 blur-3xl"></div>
        </motion.div>
        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-10 text-4xl leading-tight font-extrabold md:text-5xl">
            <span className="text-pink-500">{data.title}</span>
          </h2>

          <p className="mb-8 text-lg text-gray-600">{data.subtitle}</p>

          <div className="space-y-6">
            {data.features.map((item, index) => {
              const Icon = iconMap[item.icon];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                  className="flex items-start gap-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-md transition duration-300 hover:shadow-xl"
                >
                  {Icon && (
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.iconStyle}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                  )}

                  <div>
                    <h4 className={`text-lg font-semibold ${item.titleColor}`}>
                      {item.title}
                    </h4>
                    <p className="mt-1 text-gray-600">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <Button
            asChild
            size="extra-lg"
            className="bg-brand-three hover:bg-brand-three/90 mt-8"
          >
            <Link href="/poc_waitlist">{data.cta}</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
