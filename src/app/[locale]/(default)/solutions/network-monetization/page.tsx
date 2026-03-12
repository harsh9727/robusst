import React from "react";
import { Banner } from "~/components/sections/networkmonetization/Banner";
import MonetizationFramework from "~/components/sections/networkmonetization/MonetizationFramework/MonetizationFramework";
import WhyNetworkMonetization from "~/components/sections/networkmonetization/WhyNetworkMonetization/WhyNetworkMonetization";
import UserExperienceManagement from "~/components/sections/networkmonetization/UserExperienceManagement/UserExperienceManagement";
import MobileUseCase from "~/components/sections/networkmonetization/MobileUseCase/MobileUseCase";
import Telcos from "~/components/sections/networkmonetization/Telcos/Telcos";
import { Network_Solution_Grid } from "~/components/sections/networkmonetization/SolutionGrid";
import { UseCaseGrid } from "~/components/sections/networkmonetization/UseCaseGrid";
import { FAQSection } from "~/components/sections/networkmonetization/FAQSection";

const NetworkMonetization: React.FC = () => {
  return (
    <>
      <Banner />
      <WhyNetworkMonetization />
      <MonetizationFramework />
      <UserExperienceManagement />
      <Network_Solution_Grid />
      {/*<NetworkTestSystem />
      <NetworkCoverageSystem />
      <IntelligentNOC />*/}
      <MobileUseCase />
      <UseCaseGrid />
      {/*<OpenRANSolutions />
      <SmartEnergy />
      <SpecialEventManagement />
      <SpecialOperation />
      <DriverLess />
      <VoLTE />
      <HetNet />
      <Spectrum />
      <IoT />*/}
      <Telcos />
      <FAQSection />
    </>
  );
};

export default NetworkMonetization;
