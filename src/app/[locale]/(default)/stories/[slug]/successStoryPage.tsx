"use client ";

import { notFound } from "next/navigation";
import React from "react";
import { Banner } from "~/components/sections/storyPage";
import { FadeIn } from "~/components/ui/FadeIn";
import { AnimatedText } from "~/components/ui/TextAnimation/AnimatedText";

import type { Storypage_JsonType } from "~/types/api/storypage_json.types";
import type { Successstories_JsonType } from "~/types/api/successstories_json.types";

interface Props {
  slug: string;
  storyPageData?: Storypage_JsonType["storyPage"];
  storiesData?: Successstories_JsonType["story"];
}

export const SuccessStoriesPage: React.FC<Props> = ({
  slug,
  storyPageData,
  storiesData,
}) => {
  const successStoriesSection = storiesData;
  const successStoryPageSection = storyPageData;

  if (!successStoriesSection || !successStoryPageSection) {
    return null;
  }

  const story = successStoriesSection.find((story) => story.id === slug);

  if (!story) {
    return notFound();
  }

  return (
    <>
      <FadeIn backgroundColor="bg-primary">
        <Banner
          companyName={story.companyName}
          title={story.title}
          companyLogo={story.companyLogo}
        />
      </FadeIn>

      <FadeIn delay={0.1} backgroundColor="bg-white">
        <div className="flex min-h-screen w-full justify-center bg-white px-5 py-15 sm:py-20 md:py-25">
          <section className="flex w-full max-w-5xl flex-col gap-12">
            <FadeIn delay={0.2}>
              <section>
                <AnimatedText
                  text={successStoryPageSection.challengesTitle}
                  as="h1"
                  className="text-xl font-semibold sm:text-2xl"
                  delay={0.3}
                />
                <FadeIn delay={0.4}>
                  <section className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {story.cusomterChallenges.map((challenge, index) => (
                      <FadeIn key={index} delay={0.1 * index}>
                        <div className="rounded-lg border bg-white p-5">
                          <AnimatedText
                            text={challenge.title}
                            as="h2"
                            className="text-lg font-semibold"
                            delay={0.5 + 0.1 * index}
                          />
                          <p className="">{challenge.description}</p>
                        </div>
                      </FadeIn>
                    ))}
                  </section>
                </FadeIn>
              </section>
            </FadeIn>

            <FadeIn delay={0.6}>
              <section>
                <AnimatedText
                  text={successStoryPageSection.solutionTitle}
                  as="h1"
                  className="text-xl font-semibold sm:text-2xl"
                  delay={0.7}
                />
                <FadeIn delay={0.8}>
                  <section className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {story.solutions.map((solution, index) => (
                      <FadeIn key={index} delay={0.1 * index}>
                        <div className="rounded-lg border bg-white p-5">
                          <AnimatedText
                            text={solution.title}
                            as="h2"
                            className="text-lg font-semibold"
                            delay={0.9 + 0.1 * index}
                          />
                          <p className="text-muted-foreground leading-tight">
                            {solution.description}
                          </p>
                        </div>
                      </FadeIn>
                    ))}
                  </section>
                </FadeIn>
              </section>
            </FadeIn>
          </section>
        </div>
      </FadeIn>
    </>
  );
};
