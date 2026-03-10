import React from "react";
import { Banner } from "~/components/sections/stsanddms/Banner";
import { TelecomIntelligence } from "~/components/sections/stsanddms/TelecomIntelligence/TelecomIntelligence";
import SalesDistribution from "~/components/sections/stsanddms/SalesDistribution/SalesDistribution";
import WhyRobusst from "~/components/sections/stsanddms/WhyRobusst/WhyRobusst";
import RobusstPlatform from "~/components/sections/stsanddms/RobusstPlatform/RobusstPlatform";
import BusinessAutomation from "~/components/sections/stsanddms/BusinessAutomation/BusinessAutomation";
import SuccessStories from "~/components/sections/stsanddms/SuccessStories/SuccessStories";
import DriveSales from "~/components/sections/stsanddms/DriveSales/DriveSales";
import ErpHrisIntegration from "~/components/sections/stsanddms/ErpHrisIntegration/ErpHrisIntegration";
import IndustryAgnostic from "~/components/sections/stsanddms/IndustryAgnostic/IndustryAgnostic";
import { STS_Solution_Grid } from "~/components/sections/stsanddms/SolutionGrid";
const StsAndDms: React.FC = () => {
  return (
    <>
      <Banner />
      <TelecomIntelligence />
      <SalesDistribution />
      <WhyRobusst />
      <RobusstPlatform />
      <BusinessAutomation />
      <SuccessStories />
      <STS_Solution_Grid />
      <DriveSales />
      <ErpHrisIntegration />
      <IndustryAgnostic />
      {/*<PartnerWithRobusst />*/}
    </>
  );
};

export default StsAndDms;
