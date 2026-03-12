import React from "react";
import {
  Banner,
  Cdp,
  Cpm,
  Noc,
  Kyc,
  Whychoose,
} from "~/components/sections/platform";

const Platforms: React.FC = () => {
  return (
    <>
      <Banner />
      <Cdp />
      <Cpm />
      <Noc />
      <Kyc />
      <Whychoose />
    </>
  );
};

export default Platforms;
