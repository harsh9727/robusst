"use client";

import { ChevronRight, Shield } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState, useCallback } from "react";
import { Button } from "~/components/ui/button";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "~/components/ui/drawer";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

/* -------------------------------------------------------------------------- */
/*                                DATA SOURCE                                 */
/* -------------------------------------------------------------------------- */

const distributionPlatformData = [
  {
    title: "Distributor Management Solution",
    acronym: "DMS",
    imageSrc: "/solutions/sts/3.webp",
    desc: "Digitally govern your partner ecosystem with intelligent workflows, real-time visibility, and seamless ERP integrations.",
    detailedContent: {
      subtitle: "Distributor Management Solution",
      description:
        "Digitally govern your distributor and partner ecosystem with automated workflows, compliance-ready onboarding, and real-time operational visibility.",
      sections: [
        {
          title: "Distributor Hierarchy & Territory Management",
          description:
            "Manage distributor networks with flexible hierarchy controls and structured sales territory mapping.",
        },
        {
          title: "Automated Onboarding & KYC",
          description:
            "Streamline partner onboarding with automated compliance workflows and built-in KYC integration.",
        },
        {
          title: "Real-Time Stock Tracking",
          description:
            "Track stock movement and maintain inventory accuracy with automated reconciliation.",
        },
        {
          title: "Smart Purchase Order Management",
          description:
            "Enable digital purchase orders with approval workflows, alerts, and status tracking.",
        },
        {
          title: "ERP Integration",
          description:
            "Integrate seamlessly with ERP systems for real-time financial visibility and operational alignment.",
        },
      ],
      whyItMatters:
        "Improves distributor governance, reduces operational inefficiencies, and provides full visibility across your partner ecosystem.",
    },
  },

  {
    title: "Integrated Payment Gateway",
    acronym: "IPG",
    imageSrc: "/solutions/sts/4.webp",
    desc: "Enable fast, compliant, and frictionless reward redemption without complex banking integrations.",
    detailedContent: {
      subtitle: "Integrated Payment Gateway",
      description:
        "Built for scale, compliance, and efficiency, the integrated payment gateway enables fast reward redemption and eliminates traditional banking integration complexities.",
      features: [
        "Swift Redemption — Channel partners can redeem rewards within 24 hours of setup.",
        "Cost-effective Integration — Save up to ₹1.5 lakh compared to traditional bank integrations.",
        "Simplified Documentation — Eliminates complex PAN collection and compliance overhead.",
        "Transparent Pricing — Simple 3% fee with no hidden or transaction charges.",
        "No Redemption Limits — Partners can redeem rewards starting from ₹100 with no upper limit.",
      ],
    },
  },

  {
    title: "Sales Tracking System",
    acronym: "STS",
    imageSrc: "/solutions/sts/5.webp",
    desc: "Achieve complete real-time visibility into sales, inventory, and field operations.",
    detailedContent: {
      subtitle: "Sales Tracking System",
      description:
        "Monitor and optimize your distribution sales performance with real-time tracking, AI-powered forecasting, and intelligent field force automation.",
      sections: [
        {
          title: "Serialized Inventory Tracking",
          description:
            "Track SIMs, vouchers, and devices individually throughout the distribution lifecycle.",
        },
        {
          title: "AI Demand Forecasting",
          description:
            "Predict demand and automate stock replenishment to minimize stockouts and excess inventory.",
        },
        {
          title: "Geo-tagged Field Force Automation",
          description:
            "Track field sales activities with geo-tagging, route optimization, and performance visibility.",
        },
        {
          title: "Digital Incentive Management",
          description:
            "Manage commissions, rewards, and incentives transparently through automated workflows.",
        },
        {
          title: "Mobile Field Enablement",
          description:
            "Empower field teams with mobile tools for real-time reporting and operational efficiency.",
        },
      ],
      whyItMatters:
        "Provides real-time operational visibility, improves field productivity, and enables smarter inventory and sales decisions.",
    },
  },

  {
    title: "Advanced AI & Analytics",
    acronym: "AIA",
    imageSrc: "/solutions/sts/6.webp",
    desc: "Leverage AI-driven insights to optimize inventory, sales, and partner performance.",
    detailedContent: {
      subtitle: "Advanced AI & Analytics",
      description:
        "Robusst’s embedded AI and analytics provide predictive intelligence and actionable insights to improve sales performance and operational efficiency.",
      sections: [
        {
          title: "Predictive Sales & Inventory Intelligence",
          description:
            "Forecast demand accurately to reduce stockouts and excess inventory.",
        },
        {
          title: "Personalized Partner Recommendations",
          description:
            "Deliver AI-powered upsell and cross-sell recommendations to channel partners.",
        },
        {
          title: "Retention & Win-back Analytics",
          description:
            "Identify churn risks and enable proactive retention strategies.",
        },
        {
          title: "Automated Incentive Disbursement",
          description:
            "Ensure accurate and timely payout of incentives through automated digital workflows.",
        },
      ],
      whyItMatters:
        "Transforms operational data into predictive intelligence that improves efficiency, partner engagement, and revenue growth.",
    },
  },

  {
    title: "Reporting & Dashboard",
    acronym: "RAD",
    imageSrc: "/solutions/sts/7.webp",
    desc: "Transform complex operational data into actionable business insights.",
    detailedContent: {
      subtitle: "Reporting & Dashboard",
      description:
        "Interactive dashboards and reporting tools provide complete visibility into KPIs, performance metrics, and operational trends.",
      sections: [
        {
          title: "Real-Time KPI Monitoring",
          description:
            "Track key performance indicators across distributors, inventory, and sales operations.",
        },
        {
          title: "Interactive Visual Dashboards",
          description:
            "Understand complex data easily with intuitive and interactive visualizations.",
        },
        {
          title: "Performance Tracking",
          description:
            "Monitor sales performance, partner productivity, and operational efficiency.",
        },
        {
          title: "Data-Driven Decision Support",
          description:
            "Empower teams with insights needed to make faster and smarter decisions.",
        },
      ],
      whyItMatters:
        "Provides complete operational visibility and empowers organizations with actionable intelligence for strategic decision-making.",
    },
  },
] as const;

type Module = (typeof distributionPlatformData)[number];

/* -------------------------------------------------------------------------- */
/*                              MODULE CONTENT UI                             */
/* -------------------------------------------------------------------------- */

const ModuleContent = ({ module }: { module?: Module }) => {
  if (!module) return null;

  return (
    <div className="space-y-6">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl">
        <Image
          src={module.imageSrc}
          alt={module.title}
          fill
          className="object-cover"
        />
      </div>

      <p className="text-muted-foreground text-lg leading-relaxed">
        {module.detailedContent.description}
      </p>

      {"features" in module.detailedContent && (
        <div className="bg-muted/50 space-y-4 rounded-xl p-6">
          <h3 className="text-lg font-semibold">Key Features</h3>

          {module.detailedContent.features?.map((feature, idx) => (
            <div key={idx} className="flex gap-3">
              <div className="mt-2 h-1.5 w-1.5 rounded-full bg-pink-500" />
              <p>{feature}</p>
            </div>
          ))}
        </div>
      )}

      {"sections" in module.detailedContent && (
        <div className="space-y-4">
          {module.detailedContent.sections?.map((section, idx) => (
            <div key={idx} className="rounded-xl border p-5">
              <h3 className="mb-2 font-semibold">{section.title}</h3>
              <p className="text-muted-foreground">{section.description}</p>
            </div>
          ))}
        </div>
      )}

      {"whyItMatters" in module.detailedContent && (
        <div className="rounded-xl border border-pink-500/20 p-6">
          <div className="mb-2 flex items-center gap-2">
            <Shield className="h-5 w-5 text-pink-500" />
            <h3 className="font-semibold">Why it matters</h3>
          </div>

          <p>{module.detailedContent.whyItMatters}</p>
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                               */
/* -------------------------------------------------------------------------- */

export const STS_Solution_Grid = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const openModule = useCallback((index: number) => {
    setSelectedIndex(index);
    setIsOpen(true);
  }, []);

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
    if (!open) setSelectedIndex(null);
  }, []);

  const currentModule =
    selectedIndex !== null
      ? distributionPlatformData[selectedIndex]
      : undefined;

  return (
    <>
      {/* HEADING */}
      <div className="container mx-auto mt-10">
        <p className="text-brand-two text-center text-xl font-semibold sm:text-5xl">
          Distribution Platform Features
        </p>
      </div>

      {/* GRID */}
      <div className="container mx-auto mt-16 grid grid-cols-1 gap-8 p-5 pb-20 sm:grid-cols-2 lg:grid-cols-3">
        {distributionPlatformData.slice(0, 1).map((data, index) => (
          <div
            key={data.acronym}
            className="group flex flex-col justify-between rounded-xl border bg-white p-3 shadow transition-all hover:shadow-xl"
          >
            <div>
              <div className="relative h-60 overflow-hidden rounded-lg">
                <Image
                  src={data.imageSrc}
                  alt={data.title}
                  width={500}
                  height={300}
                  className="h-full w-full object-cover brightness-90"
                />
              </div>

              <p className="mt-3 text-lg font-medium">{data.title}</p>

              <p className="text-muted-foreground mt-1">{data.desc}</p>
            </div>

            <Button className="mt-5 w-full" onClick={() => openModule(index)}>
              View Details
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        ))}

        <div className="relative h-full w-full overflow-hidden rounded-full p-16 lg:p-8">
          <Image
            src="/solutions/sts/15.webp"
            alt="o,age"
            width={500}
            height={300}
            className="shadow-brand-one h-full w-full rounded-full object-cover shadow-[0px_0px_20px] brightness-90 duration-200 hover:shadow-[0px_0px_40px]"
          />
        </div>
        {distributionPlatformData
          .slice(1, distributionPlatformData.length)
          .map((data, index) => (
            <div
              key={data.acronym}
              className="group flex flex-col justify-between rounded-xl border bg-white p-3 shadow transition-all hover:shadow-xl"
            >
              <div>
                <div className="relative h-60 overflow-hidden rounded-lg">
                  <Image
                    src={data.imageSrc}
                    alt={data.title}
                    width={500}
                    height={300}
                    className="h-full w-full object-cover brightness-90"
                  />
                </div>

                <p className="mt-3 text-lg font-medium">{data.title}</p>

                <p className="text-muted-foreground mt-1">{data.desc}</p>
              </div>

              <Button className="mt-5 w-full" onClick={() => openModule(index)}>
                View Details
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ))}
      </div>
      <div className="w-full overflow-hidden bg-white sm:-mt-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 150"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 C300,150 400,150 600,120 C800,90 900,90 1200,120 L1200,0 L0,0 Z"
            fill="#000000"
            stroke="none"
          />
        </svg>
      </div>

      {/* DESKTOP DIALOG */}
      {!isMobile && (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{currentModule?.title}</DialogTitle>

              <DialogDescription>
                {currentModule?.detailedContent.subtitle}
              </DialogDescription>
            </DialogHeader>

            <ModuleContent module={currentModule} />
          </DialogContent>
        </Dialog>
      )}

      {/* MOBILE DRAWER */}
      {isMobile && (
        <Drawer open={isOpen} onOpenChange={handleOpenChange}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{currentModule?.title}</DrawerTitle>

              <DrawerDescription>
                {currentModule?.detailedContent.subtitle}
              </DrawerDescription>
            </DrawerHeader>

            <div className="px-6 pb-6">
              <ModuleContent module={currentModule} />
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};
