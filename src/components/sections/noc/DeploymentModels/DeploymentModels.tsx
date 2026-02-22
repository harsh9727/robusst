"use client";

import { motion } from "framer-motion";
import { Cloud, Server, ShieldCheck } from "lucide-react";

const deploymentModels = [
  {
    title: "Public Cloud",
    icon: Cloud,
    description:
      "Fast deployment, zero infrastructure overhead, automatic scaling",
  },
  {
    title: "Private Cloud",
    icon: Server,
    description:
      "Dedicated infrastructure, enhanced security, complete control",
  },
  {
    title: "On-Premises",
    icon: ShieldCheck,
    description:
      "Full data sovereignty, air-gapped security, regulatory compliance",
  },
];

export default function DeploymentModels() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <h2 className="text-3xl md:text-4xl lg:text-[2.7rem] font-extrabold">
            <span className="bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent">
              Flexible Deployment Models
            </span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center text-gray-600 text-lg mb-16 max-w-3xl mx-auto"
        >
          Deploy where your business needs demand—no lock-in, full portability
        </motion.p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-10">
          {deploymentModels.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="
                  h-full
                  p-8
                  rounded-2xl
                  border border-gray-200
                  bg-white
                  transition-all duration-300
                  hover:-translate-y-2
                  hover:shadow-[0_15px_40px_rgba(59,130,246,0.15)]
                  hover:border-blue-300
                ">

                  {/* Icon */}
                  <div className="
  w-14 h-14
  flex items-center justify-center
  rounded-xl
  bg-blue-50
  mb-6
  transition-all duration-300
  group-hover:-translate-y-1
  group-hover:bg-pink-100
">
                    <Icon
                      size={26}
                      className="text-blue-500 transition group-hover:text-pink-500"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="
                    text-xl font-semibold mb-3
                    text-gray-900
                    transition
                    group-hover:text-blue-600
                  ">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}