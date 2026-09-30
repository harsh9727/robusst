"use client";

import React, { useState, memo } from "react";
import type { SanityHomeSection } from "~/types/sanity/home";
import { Button } from "~/components/ui/button";
import Image from "next/image";

import { AnimatePresence, motion } from "framer-motion";

interface TechStackProps {
  data: SanityHomeSection<"techStack">;
}

const TechStackInner: React.FC<TechStackProps> = ({ data }) => {
  const sections = data?.items ?? [];
  const [activeTool, setActiveTool] = useState(sections[0]?.id ?? "");

  const heading = data?.heading ?? "";
  const activeSection = sections.find((section) => section.id === activeTool);

  if (!heading || !sections.length) return null;

  return (
    <div className="z-10 flex flex-col gap-8 sm:gap-10 lg:gap-14">
      <p className="text-primary-foreground text-center text-2xl font-black sm:text-3xl lg:text-5xl">
        {heading}
      </p>

      {/* Tabs */}
      <section className="flex flex-wrap items-center justify-center gap-3">
        {sections.map((section) => (
          <Button
            key={section.id}
            variant={activeTool === section.id ? "secondary" : "default"}
            className="flex items-center gap-2"
            onClick={() => setActiveTool(section.id)}
          >
            {section.title}
          </Button>
        ))}
      </section>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.section
          key={activeTool}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        >
          {activeSection?.tools.map((tool) => {
            if (!tool.icon) return null;
            return (
              <motion.div
                key={tool.title}
                layout
                // whileHover={{ scale: 1.05 }}
                // transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="shadow-brand-one flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-white/40 bg-black p-4 text-white shadow-[0_0_0] duration-150 hover:shadow-[0_0_30px]"
              >
                <Image
                  src={tool.icon}
                  alt={tool.iconAlt ?? tool.title}
                  width={80}
                  height={80}
                  className="rounded-lg object-contain"
                />
                <span className="text-sm">{tool.title}</span>
              </motion.div>
            );
          })}
        </motion.section>
      </AnimatePresence>
    </div>
  );
};

export const TechStack = memo(TechStackInner);
TechStack.displayName = "TechStack";
