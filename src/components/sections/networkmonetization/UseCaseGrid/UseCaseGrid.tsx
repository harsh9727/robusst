"use client";
import { Shield } from "lucide-react";
import React, { useState, useEffect, useCallback } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "~/components/ui/drawer";

const networkSolutions = [
  {
    acronym: "OPEN RAN",
    title: "Open RAN Solutions",
    description:
      "Seamless orchestration and management for disaggregated RAN architecture",
    imageSrc: "/solutions/cdp/open-ran.webp",
    detailedContent: {
      subtitle: "Monetize the Future of Disaggregated Networks",
      description:
        "Advanced orchestration and automation platform enabling telecom operators to efficiently manage multi-vendor Open RAN environments with intelligent automation and real-time optimization.",
      features: [
        "SMO platform",
        "Multi-vendor integration",
        "Open API support",
        "50+ automation use cases",
        "rApps ecosystem enablement",
        "Intent-driven network management",
      ],
      whyItMatters:
        "Open RAN enables telecom operators to break vendor lock-in, increase innovation, and reduce operational costs while improving network flexibility and performance.",
    },
  },

  {
    acronym: "SMART ENERGY",
    title: "Smart Energy",
    description:
      "AI-driven Smart Energy Saving solution that reduces network energy consumption without impacting user experience",
    imageSrc: "/solutions/cdp/smart-energy.webp",
    detailedContent: {
      subtitle: "Bridging Innovation & Connection",
      description:
        "AI-powered energy optimization platform that intelligently manages energy consumption across telecom networks while maintaining optimal service quality.",
      features: [
        "Centralized multi-vendor, multi-technology platform",
        "AI-based traffic prediction",
        "Automated energy optimization",
        "Coverage gap and call drop prevention",
        "Reduced operational costs",
        "Lower carbon emissions",
        "Maintains high service quality",
      ],
      whyItMatters:
        "Energy optimization significantly reduces telecom operational expenses while supporting sustainability goals and maintaining superior customer experience.",
    },
  },

  {
    acronym: "SEM",
    title: "Special Event Management",
    description:
      "Ensures seamless connectivity in high-density venues using AI-driven network optimization",
    imageSrc: "/solutions/cdp/special-event.webp",
    detailedContent: {
      subtitle: "AI-powered Special Event Network Management",
      description:
        "Ensures superior network performance during concerts, stadium events, and high-density gatherings through real-time AI-driven automation.",
      features: [
        "Real-time network monitoring",
        "Intelligent traffic optimization",
        "Prevents congestion without temporary infrastructure",
        "Closed-loop automation",
        "AI-based load prediction",
        "Multi-vendor network optimization",
        "Premium user experience delivery",
      ],
      whyItMatters:
        "Maintains seamless connectivity during high-demand events, ensuring superior customer experience and avoiding revenue loss.",
    },
  },

  {
    acronym: "SOC",
    title: "Service Operations Center",
    description:
      "AI-powered SOC enabling proactive issue detection and service quality monitoring",
    imageSrc: "/solutions/cdp/soc.webp",
    detailedContent: {
      subtitle: "Shift: From KPI Monitoring to Revenue Impact Monitoring",
      description:
        "Modern AI-driven service operations platform focused on real customer experience and proactive network performance optimization.",
      features: [
        "Proactive issue detection",
        "Service Quality Score (SQS) monitoring",
        "End-to-end service visibility",
        "Intelligent automation workflows",
        "Customer experience insights",
        "Churn reduction capabilities",
        "Improved operational ROI",
      ],
      whyItMatters:
        "Ensures optimal service quality and customer satisfaction while reducing operational costs and improving business performance.",
    },
  },

  {
    acronym: "DRIVELESS",
    title: "DriverLess Optimization",
    description:
      "AI-powered driveless tuning solution eliminating costly drive tests",
    imageSrc: "/solutions/cdp/driveless.webp",
    detailedContent: {
      subtitle: "AI-powered Driveless Tuning for smarter network optimization",
      description:
        "Advanced network optimization solution that eliminates manual drive testing using AI-driven automation and real-world data insights.",
      features: [
        "Eliminates costly drive tests",
        "360° real user experience visibility",
        "Automated data collection",
        "Multi-source data correlation",
        "Intelligent site planning",
        "Faster network expansion",
        "AI-driven forecasting optimization",
      ],
      whyItMatters:
        "Reduces operational costs while improving network performance and accelerating deployment timelines.",
    },
  },

  {
    acronym: "VoLTE",
    title: "VoLTE Optimization",
    description:
      "Advanced optimization solution delivering flawless HD voice and video performance",
    imageSrc: "/solutions/cdp/volte.webp",
    detailedContent: {
      subtitle: "Advanced VoLTE Optimization",
      description:
        "End-to-end VoLTE performance optimization ensuring superior voice quality and reliable LTE-based communication.",
      features: [
        "Reduces call drops and delays",
        "Improves coverage reliability",
        "Supports LTE to all-IP migration",
        "Automated radio and IMS optimization",
        "Closed-loop performance management",
        "Faster call setup times",
        "Consistent service quality",
      ],
      whyItMatters:
        "Ensures premium communication experience and smooth migration to modern telecom infrastructure.",
    },
  },

  {
    acronym: "HETNET",
    title: "HetNet Planning and Optimization",
    description:
      "Intelligent heterogeneous network planning and performance optimization",
    imageSrc: "/solutions/cdp/hetnet.webp",
    detailedContent: {
      subtitle: "Intelligent HetNet Planning & Optimization",
      description:
        "Advanced planning solution optimizing macro and small cell deployment for maximum network performance.",
      features: [
        "Optimal macro and small cell placement",
        "Data-driven expansion planning",
        "Traffic forecasting",
        "Interference modeling",
        "Automated densification",
        "Coverage and capacity optimization",
        "Maximized network ROI",
      ],
      whyItMatters:
        "Ensures efficient network expansion while improving performance, coverage, and capacity.",
    },
  },

  {
    acronym: "SPECTRUM",
    title: "Spectrum Refarming",
    description:
      "AI-driven spectrum optimization enabling smooth transition to next-gen technologies",
    imageSrc: "/solutions/cdp/spectrum.webp",
    detailedContent: {
      subtitle: "AI-driven Spectrum Refarming",
      description:
        "Optimizes spectrum utilization and enables efficient migration to modern telecom technologies like 5G.",
      features: [
        "Identifies underutilized spectrum",
        "Automated frequency planning",
        "Supports 5G migration",
        "Minimizes service disruption",
        "Continuous performance optimization",
        "Improves spectral efficiency",
        "Future-ready network capability",
      ],
      whyItMatters:
        "Maximizes spectrum efficiency and accelerates next-generation network deployment.",
    },
  },

  {
    acronym: "IOT",
    title: "IoT Optimization",
    description:
      "Reliable and scalable IoT connectivity optimization for massive device ecosystems",
    imageSrc: "/solutions/cdp/iot.webp",
    detailedContent: {
      subtitle: "Intelligent IoT Network Optimization",
      description:
        "Ensures reliable connectivity, optimal battery performance, and scalable network support for massive IoT deployments.",
      features: [
        "Scalable IoT connectivity",
        "Battery life optimization",
        "Coverage and capacity assurance",
        "Service-aware network balancing",
        "Self-healing automation",
        "Supports massive device growth",
        "SLA-driven performance optimization",
      ],
      whyItMatters:
        "Ensures reliable, scalable, and efficient IoT network performance supporting future digital ecosystems.",
    },
  },
];

type Solution = (typeof networkSolutions)[number];

const SolutionContent = ({ solution }: { solution?: Solution }) => {
  if (!solution) return null;

  return (
    <div className="space-y-6">
      {/* Description */}
      <p className="text-muted-foreground text-lg leading-relaxed">
        {solution.detailedContent.description}
      </p>

      {/* Features */}
      {solution.detailedContent.features && (
        <div className="bg-muted/50 space-y-4 rounded-xl p-6">
          <h3 className="text-lg font-semibold">Key Features</h3>

          {solution.detailedContent.features.map((feature, idx) => (
            <div key={idx} className="flex gap-3">
              <div className="mt-2 h-1.5 w-1.5 rounded-full bg-pink-500" />
              <p>{feature}</p>
            </div>
          ))}
        </div>
      )}

      {/* Why it matters */}
      {solution.detailedContent.whyItMatters && (
        <div className="rounded-xl border border-pink-500/20 p-6">
          <div className="mb-2 flex items-center gap-2">
            <Shield className="h-5 w-5 text-pink-500" />
            <h3 className="font-semibold">Why it matters</h3>
          </div>

          <p>{solution.detailedContent.whyItMatters}</p>
        </div>
      )}
    </div>
  );
};

export const UseCaseGrid = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const openSolution = useCallback((index: number) => {
    setSelectedIndex(index);
    setIsOpen(true);
  }, []);

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);

    if (!open) setSelectedIndex(null);
  }, []);

  const currentSolution =
    selectedIndex !== null ? networkSolutions[selectedIndex] : undefined;

  return (
    <>
      {/* Heading */}
      <div className="bg-white py-16">
        <p className="text-center text-3xl font-semibold text-black">
          Network Monetization <br />
          Other Possible Use Cases for Mobile Operators
        </p>

        {/* Grid */}
        <div className="container mx-auto mt-12 grid grid-cols-1 gap-8 px-5 sm:grid-cols-2 lg:grid-cols-3">
          {networkSolutions.map((solution, index) => (
            <div
              key={index}
              className="group flex cursor-pointer flex-col justify-between rounded-xl border bg-white p-3 shadow-md transition-all hover:shadow-xl"
              onClick={() => openSolution(index)}
            >
              {/* Content */}
              <div>
                <p className="text-brand-one text-xl font-bold">
                  {solution.title}
                </p>
                <p className="text-muted-foreground mt-1 text-sm">
                  {solution.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Dialog */}
      {!isMobile && (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{currentSolution?.acronym} MODULE</DialogTitle>

              <DialogDescription>
                {currentSolution?.detailedContent.subtitle}
              </DialogDescription>
            </DialogHeader>

            <SolutionContent solution={currentSolution} />
          </DialogContent>
        </Dialog>
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer open={isOpen} onOpenChange={handleOpenChange}>
          <DrawerContent className="max-h-[85vh]">
            <DrawerHeader>
              <DrawerTitle>{currentSolution?.acronym} MODULE</DrawerTitle>

              <DrawerDescription>
                {currentSolution?.detailedContent.subtitle}
              </DrawerDescription>
            </DrawerHeader>

            <div className="overflow-y-auto px-6 pb-6">
              <SolutionContent solution={currentSolution} />
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};
