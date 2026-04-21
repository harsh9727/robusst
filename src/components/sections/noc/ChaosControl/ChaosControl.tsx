"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Cpu,
  BrainCircuit,
  ShieldCheck,
  Network,
  type LucideIcon,
} from "lucide-react";
import type { Noc_JsonType } from "~/types/api/noc_json.types";

const iconMap: Record<string, LucideIcon> = {
  Cpu,
  BrainCircuit,
  ShieldCheck,
  Network,
};

interface Props {
  data?: Noc_JsonType["noc_page"]["chaosControl"];
}

export default function ChaosControl({ data }: Props) {
  if (!data) return null;

  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="container mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="mx-auto mb-10 w-fit text-2xl leading-tight font-extrabold sm:text-3xl md:text-4xl lg:text-[2.65rem]">
          <span className="text-brand-one">{data.title}</span>
        </h2>
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* LEFT CONTENT */}

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="shadow-brand-one relative h-95 w-full overflow-hidden rounded-xl shadow-[0px_0px_0px] duration-200 hover:shadow-[0px_0px_30px]">
              <Image
                src={data.image}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
                alt={data.imageAlt}
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="rounded-2xl bg-white p-5">
              <ul className="space-y-5">
                {data.items.map((item, index) => {
                  const Icon = iconMap[item.icon] ?? Cpu;
                  const colorClasses = [
                    {
                      bg: "bg-pink-50",
                      hoverBg: "hover:bg-pink-50/60",
                      groupBg: "group-hover:bg-pink-100",
                      text: "text-pink-600",
                      groupText: "group-hover:text-pink-600",
                    },
                    {
                      bg: "bg-purple-50",
                      hoverBg: "hover:bg-purple-50/60",
                      groupBg: "group-hover:bg-purple-100",
                      text: "text-purple-600",
                      groupText: "group-hover:text-purple-600",
                    },
                    {
                      bg: "bg-blue-50",
                      hoverBg: "hover:bg-blue-50/60",
                      groupBg: "group-hover:bg-blue-100",
                      text: "text-blue-600",
                      groupText: "group-hover:text-blue-600",
                    },
                    {
                      bg: "bg-indigo-50",
                      hoverBg: "hover:bg-indigo-50/60",
                      groupBg: "group-hover:bg-indigo-100",
                      text: "text-indigo-600",
                      groupText: "group-hover:text-indigo-600",
                    },
                  ];
                  const colors = colorClasses[index % 4]!;

                  return (
                    <li
                      key={index}
                      className={`group flex items-start gap-4 rounded-xl p-4 transition-all duration-300 ${colors.hoverBg}`}
                    >
                      <div
                        className={`rounded-lg ${colors.bg} p-2 transition-colors duration-300 ${colors.groupBg}`}
                      >
                        <Icon
                          className={`h-5 w-5 ${colors.text} transition-colors duration-300`}
                        />
                      </div>

                      <div>
                        <span
                          className={`text-md block font-semibold text-gray-900 transition-colors duration-300 ${colors.groupText}`}
                        >
                          {item.title}
                        </span>
                        <span className="mt-1 block text-sm text-gray-600">
                          {item.description}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
