"use client";

import React from "react";
import type { PlatformsSection } from "~/i18n/types/platforms";
import { useTranslations } from "next-intl";
import type { Platforms_JsonType } from "~/types/api/platforms_json.types";
import { motion } from "framer-motion";

interface WhychooseProps {
  data?: Platforms_JsonType["platforms"];
}

export const Whychoose: React.FC<WhychooseProps> = ({ data }) => {
  const t = useTranslations("platforms");
  const whyChooseSection =
    data?.whychoose ?? (t.raw("whychoose") as PlatformsSection["whychoose"]);

  return (
    <section className="bg-primary-foreground px-6 py-15 sm:px-12 md:py-20 xl:px-25">
      <div className="mx-auto w-full max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10 max-w-3xl"
        >
          <h3 className="text-2xl font-bold text-black sm:text-3xl md:text-4xl">
            {whyChooseSection.heading}
          </h3>
        </motion.div>

        {/* Cards */}
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {whyChooseSection.benefits.map((benefit, index) => (
            <motion.li
              key={index}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
              className="border-brand-one/20 bg-brand-one/5 flex flex-col justify-between rounded-xl border p-5 shadow-sm transition hover:shadow-md"
            >
              <h4 className="text-brand-one mb-2 text-lg font-bold sm:text-xl">
                {benefit.title}
              </h4>
              <p className="text-sm leading-relaxed text-black">
                {benefit.description}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};
