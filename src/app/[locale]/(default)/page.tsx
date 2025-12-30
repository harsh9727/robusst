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
  // BlogsGrid,
  OurPresence,
  Contact,
  WhyChooseUs,
} from "~/components/sections";

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
      {/* <BlogsGrid /> */}
      <WhyChooseUs />
      <OurPresence />
      <Contact />
    </>
  );
};

export default Home;
