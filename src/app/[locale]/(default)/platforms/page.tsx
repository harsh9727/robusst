import React from "react";
import Banner from "~/components/platform/Banner/Banner";
import Cdp from "~/components/platform/Cdp/Cdp";
import Cpm from "~/components/platform/Cpm/Cpm";
import Noc from "~/components/platform/Noc/Noc";
import Kyc from "~/components/platform/Kyc/Kyc";
import Whychoose from "~/components/platform/Whychoose/Whychoose";

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
