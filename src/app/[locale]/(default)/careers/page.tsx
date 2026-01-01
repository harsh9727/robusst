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

const CarrerPage: React.FC = () => {
  return (
    <>
      <Banner />
      <RiseWithUs />
      <CurrentOpenings />
      <WeMakeDifference />
      <WhatWeOffer />
      <Values />
      <ReadyToJoinUs />
      <OurHiringProcess />
      <Contact />
    </>
  );
};

export default CarrerPage;
