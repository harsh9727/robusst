import React from "react";
import { Banner } from "~/components/sections/networkmonetization/Banner";
import MonetizationFramework from "~/components/sections/networkmonetization/MonetizationFramework/MonetizationFramework";
import WhyNetworkMonetization from "~/components/sections/networkmonetization/WhyNetworkMonetization/WhyNetworkMonetization";
import UserExperienceManagement from "~/components/sections/networkmonetization/UserExperienceManagement/UserExperienceManagement";
import NetworkTestSystem from "~/components/sections/networkmonetization/NetworkTestSystem/NetworkTestSystem";
import NetworkCoverageSystem from "~/components/sections/networkmonetization/NetworkCoverageSystem/NetworkCoverageSystem";
import IntelligentNOC from "~/components/sections/networkmonetization/IntelligentNOC/IntelligentNOC";
import MobileUseCase from "~/components/sections/networkmonetization/MobileUseCase/MobileUseCase";
import OpenRANSolutions from "~/components/sections/networkmonetization/OpenRANSolutions/OpenRANSolutions";
import SmartEnergy from "~/components/sections/networkmonetization/SmartEnergy/SmartEnergy";
import SpecialEventManagement from "~/components/sections/networkmonetization/SpecialEventManagement/SpecialEventManagement";
import SpecialOperation from "~/components/sections/networkmonetization/SpecialOperation/SpecialOperation";
import DriverLess from "~/components/sections/networkmonetization/DriverLess/DriverLess";
import VoLTE from "~/components/sections/networkmonetization/VoLTE/VoLTE";
import HetNet from "~/components/sections/networkmonetization/HetNet/HetNet";
import Spectrum from "~/components/sections/networkmonetization/Spectrum/Spectrum";
import IoT from "~/components/sections/networkmonetization/IoT/IoT";
import Telcos from "~/components/sections/networkmonetization/Telcos/Telcos";

const NetworkMonetization: React.FC = () => {
  return (
    <>
      <Banner />
      <WhyNetworkMonetization />
      <MonetizationFramework />
      <UserExperienceManagement />
      <NetworkTestSystem />
      <NetworkCoverageSystem />
      <IntelligentNOC />
      <MobileUseCase />
      <OpenRANSolutions />
      <SmartEnergy />
      <SpecialEventManagement />
      <SpecialOperation />
      <DriverLess />
      <VoLTE />
      <HetNet />
      <Spectrum />
      <IoT />
      <Telcos />
    </>
  );
};

export default NetworkMonetization;
