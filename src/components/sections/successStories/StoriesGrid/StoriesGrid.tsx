"use client";
import React, { useState } from "react";
import { StoryCard } from "../StoryCard";
import { StoryDetailDialog } from "../StoryDetailDialog";
import { motion } from "framer-motion";
import type { Successstories_JsonType } from "~/types/api/successstories_json.types";
import type { Storypage_JsonType } from "~/types/api/storypage_json.types";

interface StoriesGridProps {
  data?: Successstories_JsonType["story"];
  storyPageData?: Storypage_JsonType["storyPage"];
}

export const StoriesGrid: React.FC<StoriesGridProps> = ({
  data,
  storyPageData,
}) => {
  const [selectedStory, setSelectedStory] = useState<
    Successstories_JsonType["story"][number] | null
  >(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const SuccessStoriesSection = data;
  if (!SuccessStoriesSection) return null;

  const handleCardClick = (story: Successstories_JsonType["story"][number]) => {
    setSelectedStory(story);
    setDialogOpen(true);
  };

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
          <StoryCard
            key={index}
            storyData={story}
            onClick={() => handleCardClick(story)}
          />
        ))}
      </motion.div>

      <StoryDetailDialog
        story={selectedStory}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        challengesTitle={storyPageData?.challengesTitle}
        solutionTitle={storyPageData?.solutionTitle}
      />
    </div>
  );
};
