import React from "react";
import { Hero, TrustedBy, About, Solutions } from "~/components/sections";

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <TrustedBy />
      <About />
      <Solutions />

      <div className="h-50 w-full" />
    </>
  );
};

export default Home;
