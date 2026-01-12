import React from "react";
import {
  Banner,
  CurrentOpenings,
  ReadyToJoinUs,
  RiseWithUs,
  Values,
  WeMakeDifference,
  WhatWeOffer,
  OurHiringProcess,
  Contact,
} from "~/components/sections/carrersPage";
import { FadeIn } from "~/components/ui/FadeIn";

const CarrerPage: React.FC = () => {
  return (
    <>
      <FadeIn backgroundColor="bg-primary">
        <Banner />
      </FadeIn>
      <FadeIn delay={0.1} backgroundColor="bg-primary-foreground">
        <RiseWithUs />
      </FadeIn>
      <FadeIn delay={0.2} backgroundColor="bg-primary">
        <CurrentOpenings />
      </FadeIn>
      <FadeIn delay={0.1} backgroundColor="bg-primary-foreground">
        <WeMakeDifference />
      </FadeIn>
      <FadeIn delay={0.2} backgroundColor="bg-primary">
        <WhatWeOffer />
      </FadeIn>
      <FadeIn delay={0.1} backgroundColor="bg-primary-foreground">
        <Values />
      </FadeIn>
      <FadeIn delay={0.2} backgroundColor="bg-primary">
        <ReadyToJoinUs />
      </FadeIn>
      <FadeIn delay={0.1} backgroundColor="bg-primary-foreground">
        <OurHiringProcess />
      </FadeIn>
      <FadeIn delay={0.2} backgroundColor="bg-primary-foreground">
        <Contact />
      </FadeIn>
    </>
  );
};

export default CarrerPage;
