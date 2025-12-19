import React from "react";
import {
  Hero,
  TrustedBy,
  About,
  Solutions,
  Results,
  HowWeHelp,
  IndustriesWeServe,
  TechStack,
  SuccessStories,
  EventsCoverage,
  BlogsGrid,
} from "~/components/sections";

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <TrustedBy />
      <About />
      <Solutions />
      <Results />
      <HowWeHelp />
      <IndustriesWeServe />
      <TechStack />
      <SuccessStories />
      <EventsCoverage />
      <BlogsGrid />
    </>
  );
};

export default Home;
