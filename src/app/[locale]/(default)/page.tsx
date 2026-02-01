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
      <div className="w-full overflow-hidden bg-white sm:-mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 150">
          <path
            d="M0,80 C300,50 400,50 600,80 C800,110 900,110 1200,80 L1200,200 L0,200 Z"
            fill="#000000"
          />

          {/*<path
            d="M0,100 C300,70 400,70 600,100 C800,130 900,130 1200,100"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeDasharray="10 5"
          />*/}
        </svg>
      </div>

      <FadeIn delay={0.1} backgroundColor="bg-primary">
        <Solutions />
      </FadeIn>
      <div className="w-full overflow-hidden bg-white sm:-mt-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 150"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 C300,150 400,150 600,120 C800,90 900,90 1200,120 L1200,0 L0,0 Z"
            fill="#000000"
            stroke="none"
          />
          {/*
          <path
            d="M0,100 C300,130 400,130 600,100 C800,70 900,70 1200,100"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeDasharray="10 5"
          />*/}
        </svg>
      </div>
      <FadeIn delay={0.2} backgroundColor="bg-primary-foreground">
        <Results />
      </FadeIn>

      <div className="w-full overflow-hidden bg-white sm:-mb-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 150"
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 C300,50 400,50 600,80 C800,110 900,110 1200,80 L1200,200 L0,200 Z"
            fill="#000000"
            stroke="none"
          />
          {/*
          <path
            d="M0,100 C300,70 400,70 600,100 C800,130 900,130 1200,100"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeDasharray="10 5"
          />*/}
        </svg>
      </div>
      <FadeIn delay={0.1} backgroundColor="bg-primary">
        <SuccessStories />
      </FadeIn>
      <div className="w-full overflow-hidden bg-white sm:-mt-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 150"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 C300,150 400,150 600,120 C800,90 900,90 1200,120 L1200,0 L0,0 Z"
            fill="#000000"
            stroke="none"
          />

          {/*<path
            d="M0,100 C300,130 400,130 600,100 C800,70 900,70 1200,100"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeDasharray="10 5"
          />*/}
        </svg>
      </div>
      <FadeIn delay={0.2} backgroundColor="bg-primary-foreground">
        <HowWeHelp />
      </FadeIn>
      <div className="w-full overflow-hidden bg-white sm:-mb-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 150"
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 C300,50 400,50 600,80 C800,110 900,110 1200,80 L1200,200 L0,200 Z"
            fill="#000000"
            stroke="none"
          />

          {/*<path
            d="M0,100 C300,70 400,70 600,100 C800,130 900,130 1200,100"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeDasharray="10 5"
          />*/}
        </svg>
      </div>
      <FadeIn delay={0.1} backgroundColor="bg-primary">
        <EventsCoverage />
      </FadeIn>
      <div className="w-full overflow-hidden bg-white sm:-mt-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 150"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 C300,150 400,150 600,120 C800,90 900,90 1200,120 L1200,0 L0,0 Z"
            fill="#000000"
            stroke="none"
          />

          {/*<path
            d="M0,100 C300,130 400,130 600,100 C800,70 900,70 1200,100"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeDasharray="10 5"
          />*/}
        </svg>
      </div>
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
