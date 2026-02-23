"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Card, CardContent } from "~/components/ui/card";

interface Outcome {
  value: number;
  suffix?: string;
  label: string;
  gradient: string;
}

const outcomes: Outcome[] = [
  {
    value: 40,
    suffix: "%",
    label: "OPEX Reduction",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    value: 70,
    suffix: "%",
    label: "Productivity Increase",
    gradient: "from-blue-400 to-cyan-400",
  },
  {
    value: 3,
    suffix: "x",
    label: "Engineer Productivity",
    gradient: "from-fuchsia-500 to-pink-500",
  },
  {
    value: 85,
    suffix: "%",
    label: "Faster MTTR",
    gradient: "from-pink-500 to-purple-500",
  },
  {
    value: 50,
    suffix: "%",
    label: "Operational Efficiency",
    gradient: "from-indigo-400 to-blue-500",
  },
  {
    value: 18,
    suffix: " Mo",
    label: "Average ROI",
    gradient: "from-rose-500 to-orange-400",
  },
];

export default function BusinessOutcomesSection() {
  return (
    <>
      <section className="relative overflow-hidden bg-black py-16 sm:py-20 lg:py-28">
        <div className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16 lg:mb-20">
            <h2 className="text-2xl leading-tight font-extrabold sm:text-3xl md:text-4xl lg:text-5xl">
              <span className="text-white">Measurable Business Outcomes</span>
            </h2>

            <p className="mt-4 px-2 text-sm text-gray-400 sm:mt-6 sm:text-base lg:text-lg">
              Delivering quantifiable results that drive operational excellence,
              engineering efficiency, and sustainable growth.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-10">
            {outcomes.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group relative h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:scale-[1.03] hover:border-transparent sm:rounded-3xl">
                  {/* Hover Gradient Glow */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-r sm:rounded-3xl ${item.gradient} opacity-0 blur-xl transition duration-500 group-hover:opacity-20`}
                  />

                  <CardContent className="relative flex h-full flex-col justify-center p-6 text-center sm:p-8 lg:p-10">
                    {/* Animated Number */}
                    <h3
                      className={`mb-4 bg-gradient-to-r text-3xl font-extrabold sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl ${item.gradient} bg-clip-text text-transparent`}
                    >
                      <CountUp
                        end={item.value}
                        duration={2}
                        enableScrollSpy
                        scrollSpyOnce
                      />
                      {item.suffix}
                    </h3>

                    {/* Label */}
                    <p className="text-sm font-medium tracking-wide text-gray-300 sm:text-base lg:text-lg">
                      {item.label}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <div className="w-full overflow-hidden bg-white sm:-mt-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 150"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 C300,150 400,150 600,120 C800,90 900,90 1200,120 L1200,0 L0,0 Z"
            fill="#000000"
            stroke="none"
          />
        </svg>
      </div>
    </>
  );
}
