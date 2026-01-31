import React from "react";
import { Banner } from "~/components/sections/brand";
import { TelecomIntelligence } from "~/components/sections/stsanddms/TelecomIntelligence/TelecomIntelligence";
import SalesDistribution from "~/components/sections/stsanddms/SalesDistribution/SalesDistribution";
import WhyRobusst from "~/components/sections/stsanddms/WhyRobusst/WhyRobusst";
import RobusstPlatform from "~/components/sections/stsanddms/RobusstPlatform/RobusstPlatform";
import BusinessAutomation from "~/components/sections/stsanddms/BusinessAutomation/BusinessAutomation";
import SuccessStories from "~/components/sections/stsanddms/SuccessStories/SuccessStories";
import DMS from "~/components/sections/stsanddms/DMS/DMS";
import PaymentGateway from "~/components/sections/stsanddms/PaymentGateway/PaymentGateway";
import STS from "~/components/sections/stsanddms/STS/STS";
import AdvancedAIAnalytics from "~/components/sections/stsanddms/AdvancedAIAnalytics/AdvancedAIAnalytics";
import OperationalEfficiency from "~/components/sections/stsanddms/OperationalEfficiency/OperationalEfficiency";
import Reporting from "~/components/sections/stsanddms/Reporting/Reporting";
import DriveSales from "~/components/sections/stsanddms/DriveSales/DriveSales";
import ErpHrisIntegration from "~/components/sections/stsanddms/ErpHrisIntegration/ErpHrisIntegration";
import IndustryAgnostic from "~/components/sections/stsanddms/IndustryAgnostic/IndustryAgnostic";
import PartnerWithRobusst from "~/components/sections/stsanddms/PartnerWithRobusst/PartnerWithRobusst";
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
            <DMS />
            <PaymentGateway />
            <STS />
            <AdvancedAIAnalytics />
            <OperationalEfficiency />
            <Reporting />
            <DriveSales />
            <ErpHrisIntegration />
            <IndustryAgnostic />
            <PartnerWithRobusst />
        </>
    );
};

export default StsAndDms;
