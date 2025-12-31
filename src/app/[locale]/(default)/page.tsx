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

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <TrustedBy />
      <About />
      <Solutions />
      <Results />
      <SuccessStories />
      <HowWeHelp />
      <EventsCoverage />
      <WhyChooseUs />
      <OurPresence />
      <Contact />
    </>
  );
};

export default Home;
