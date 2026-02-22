"use client";

import { motion } from "framer-motion";

export default function FrameworkADAA() {
  const features = [
    {
      title: "Analyze",
      description:
        "AI-powered data ingestion and correlation across all network layers",
    },
    {
      title: "Decide",
      description:
        "Intelligent decisioning engine determines optimal response path",
    },
    {
      title: "Act",
      description:
        "Automated remediation executes fixes without human intervention",
    },
    {
      title: "Assure",
      description:
        "Continuous validation ensures resolution and prevents recurrence",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="relative py-16 sm:py-20 lg:py-28 bg-[#050816] overflow-hidden">
      {/* Background Glow */}
      <div className="hidden sm:block absolute -top-40 -left-40 w-[400px] lg:w-[500px] h-[400px] lg:h-[500px] bg-pink-600/20 blur-[120px] rounded-full animate-pulse" />
      <div className="hidden sm:block absolute bottom-0 right-0 w-[400px] lg:w-[500px] h-[400px] lg:h-[500px] bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-5 text-center">
          <span className="bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent">
            ADAA Framework: The Path to Dark NOC
          </span>
        </h2>

        <p className="mb-12 text-lg text-center text-gray-300 font-light">
          <span className="font-bold text-pink-500">Dark NOC :</span> Autonomous network operations requiring minimal human oversight
        </p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-10"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -6 }}
              className="group relative p-6 rounded-xl border border-purple-500/40 
              bg-white/5 backdrop-blur-md
              transition-all duration-300
              hover:border-pink-500
              hover:shadow-[0_0_30px_rgba(236,72,153,0.25)]"
            >
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition duration-500">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-[pulse_3s_linear_infinite]" />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-pink-500 mb-3 relative z-10">
                {feature.title}
              </h3>
              <p className="text-gray-300 relative z-10">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}