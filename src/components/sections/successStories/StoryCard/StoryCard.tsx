"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { SanitySuccessStory } from "~/types/sanity/stories";

interface StoryCardProps {
  storyData: SanitySuccessStory;
  readMoreText: string;
  onClick: () => void;
}

export const StoryCard: React.FC<StoryCardProps> = ({
  storyData,
  readMoreText,
  onClick,
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="group flex h-full w-full flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-lg"
    >
      {/* Image Section */}
      <div className="bg-primary-foreground flex w-full items-center justify-center overflow-hidden border-b p-8">
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
          <Image
            src={storyData.companyLogo ?? ""}
            alt={storyData.companyLogoAlt ?? storyData.companyName ?? ""}
            width={400}
            height={200}
            className="h-32 w-fit object-contain"
          />
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <h3 className="mb-1 text-xl font-semibold">{storyData.title}</h3>
          <p className="text-muted-foreground text-sm">
            {storyData.description}
          </p>
        </div>

        {/* CTA */}
        <div className="mt-5">
          <button
            onClick={onClick}
            className="group flex w-fit items-center gap-2"
          >
            <span className="relative text-sm font-medium">
              {readMoreText}
              <span className="bg-primary absolute -bottom-1 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full" />
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
