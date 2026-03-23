import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { SuccessStoriesDataType } from "~/i18n/types/successStory";

interface StoryCardProps {
  storyData: SuccessStoriesDataType;
}

export const StoryCard: React.FC<StoryCardProps> = ({ storyData }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="group flex h-full w-full flex-col overflow-hidden rounded-xl border bg-white shadow-sm hover:shadow-lg transition"
    >
      {/* Image Section */}
      <div className="bg-primary-foreground flex w-full items-center justify-center border-b p-8 overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={storyData.companyLogo}
            alt="image"
            width={400}
            height={200}
            className="h-32 w-fit object-contain"
          />
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <h3 className="text-xl font-semibold mb-1">
            {storyData.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {storyData.description}
          </p>
        </div>

        {/* CTA */}
        <div className="mt-5">
          <Link
            href="#"
            className="group flex w-fit items-center gap-2"
          >
            <span className="relative text-sm font-medium">
              Read More
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};