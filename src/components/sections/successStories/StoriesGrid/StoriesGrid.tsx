"use client";

import React from "react";
import { StoryCard } from "../StoryCard";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import type { SuccessStoriesDataType } from "~/i18n/types/successStory";

export const StoriesGrid: React.FC = () => {
  const t = useTranslations();
  const SuccessStoriesSection = t.raw("story") as SuccessStoriesDataType[];

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 bg-white py-15 sm:py-20 md:py-25">
      <motion.div
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
        className="container grid w-full gap-5 px-5 md:grid-cols-2 xl:grid-cols-3"
      >
        {SuccessStoriesSection.map((story, index) => (
          <StoryCard key={index} storyData={story} />
        ))}
      </motion.div>
    </div>
  );
};
