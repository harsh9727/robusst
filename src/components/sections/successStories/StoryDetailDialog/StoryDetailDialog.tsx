"use client";
import React from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import type { Successstories_JsonType } from "~/types/api/successstories_json.types";

interface StoryDetailDialogProps {
  story: Successstories_JsonType["story"][number] | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  challengesTitle?: string;
  solutionTitle?: string;
}

export const StoryDetailDialog: React.FC<StoryDetailDialogProps> = ({
  story,
  open,
  onOpenChange,
  challengesTitle = "Customer Challenges",
  solutionTitle = "Our Solutions",
}) => {
  if (!story) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] min-w-[90%] overflow-y-auto sm:min-w-2xl md:min-w-3xl lg:min-w-5xl">
        <DialogHeader>
          <div className="bg-primary-foreground flex w-full items-center justify-center rounded-lg border p-6">
            <Image
              src={story.companyLogo}
              alt={story.companyName}
              width={300}
              height={120}
              className="h-20 w-fit object-contain"
            />
          </div>
          <DialogTitle className="pt-2 text-2xl font-semibold">
            {story.title}
          </DialogTitle>
          <p className="text-muted-foreground text-sm">{story.description}</p>
        </DialogHeader>

        <div className="flex flex-col gap-8 pt-2">
          {/* Challenges */}
          <section>
            <h2 className="mb-3 text-xl font-semibold">{challengesTitle}</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {story.cusomterChallenges.map((challenge, index) => (
                <div key={index} className="rounded-lg border bg-white p-5">
                  <h3 className="text-lg font-semibold">{challenge.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {challenge.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Solutions */}
          <section>
            <h2 className="mb-3 text-xl font-semibold">{solutionTitle}</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {story.solutions.map((solution, index) => (
                <div key={index} className="rounded-lg border bg-white p-5">
                  <h3 className="text-lg font-semibold">{solution.title}</h3>
                  <p className="text-muted-foreground text-sm leading-tight">
                    {solution.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};
