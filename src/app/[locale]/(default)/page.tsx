import React from "react";
import {
  Hero,
  TrustedBy,
  About,
  Solutions,
  Results,
  HowWeHelp,
  SuccessStories,
  EventsCoverage,
  OurPresence,
  Contact,
  WhyChooseUs,
} from "~/components/sections/home";
import { FadeIn } from "~/components/ui/FadeIn";

const Home: React.FC = () => {
  return (
    <>
      <FadeIn backgroundColor="bg-primary">
        <Hero />
      </FadeIn>
      <FadeIn delay={0.1} backgroundColor="bg-primary-foreground">
        <TrustedBy />
      </FadeIn>
      <FadeIn delay={0.2} backgroundColor="bg-primary-foreground">
        <About />
      </FadeIn>
      <FadeIn delay={0.1} backgroundColor="bg-primary">
        <Solutions />
      </FadeIn>
      <FadeIn delay={0.2} backgroundColor="bg-primary-foreground">
        <Results />
      </FadeIn>
      <FadeIn delay={0.1} backgroundColor="bg-primary">
        <SuccessStories />
      </FadeIn>
      <FadeIn delay={0.2} backgroundColor="bg-primary-foreground">
        <HowWeHelp />
      </FadeIn>
      <FadeIn delay={0.1} backgroundColor="bg-primary">
        <EventsCoverage />
      </FadeIn>
      <FadeIn delay={0.2} backgroundColor="bg-primary-foreground">
        <WhyChooseUs />
      </FadeIn>
      <FadeIn delay={0.1} backgroundColor="bg-primary-foreground">
        <OurPresence />
      </FadeIn>
      <FadeIn delay={0.2} backgroundColor="bg-primary-foreground">
        <Contact />
      </FadeIn>
    </>
  );
};

export default Home;
