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

const gridData = [
  {
    title: "Robusst Data Hub",
    acronym: "RDH",
    imageSrc: "/solutions/cdp/5.webp",
    desc: "Unifies fragmented customer data into a single source of truth for real-time intelligence.",
    detailedContent: {
      subtitle: "Robusst Data Hub",
      description:
        "Robusst Data Hub ingests, cleanses, and unifies customer data from CRM, billing, network, digital channels, and offline sources — delivering a single source of truth for real-time, accurate customer intelligence.",
      sections: [
        {
          title: "Unified Data Ingestion",
          description:
            "Connects CRM, billing, network systems, digital channels, and offline sources into a centralized platform.",
        },
        {
          title: "Data Cleansing & Standardization",
          description:
            "Ensures high-quality, structured, and reliable data across all systems.",
        },
        {
          title: "Single Source of Truth",
          description:
            "Creates a consistent and accurate customer intelligence layer for better decision-making.",
        },
      ],
      whyItMatters:
        "Eliminates siloed data, reduces inconsistencies, and enables seamless customer experiences powered by accurate real-time insights.",
    },
  },

  {
    title: "Identity Resolution Engine",
    acronym: "IRE",
    imageSrc: "/solutions/cdp/6.webp",
    desc: "Unifies fragmented identities into privacy-compliant, consolidated customer profiles.",
    detailedContent: {
      subtitle: "Robusst Identity Resolution Engine",
      description:
        "Deterministically and probabilistically matches and merges customer identities across all touchpoints — delivering consolidated, privacy-compliant unified profiles built for scale and trust.",
      features: [
        "Deterministic Identity Matching across verified identifiers.",
        "Probabilistic Intelligence Models for advanced identity linking.",
        "Single Unified Customer Profile across systems.",
        "Privacy & Compliance Ready architecture.",
      ],
    },
  },

  {
    title: "AI Insight Suite",
    acronym: "AIS",
    imageSrc: "/solutions/cdp/7.webp",
    desc: "Predict churn, calculate CLV, and recommend next-best actions with built-in AI models.",
    detailedContent: {
      subtitle: "Robusst AI Insight Suite",
      description:
        "Built-in AI models predict churn, calculate customer lifetime value, and recommend next-best actions — enabling proactive, data-driven marketing and smarter customer service.",
      sections: [
        {
          title: "Churn Prediction",
          description:
            "Identifies at-risk customers before they disengage using predictive intelligence.",
        },
        {
          title: "Customer Lifetime Value Modeling",
          description:
            "Calculates long-term revenue potential to prioritize high-value segments.",
        },
        {
          title: "Next-Best Action Recommendations",
          description:
            "Delivers actionable insights to guide marketing and customer engagement strategies.",
        },
      ],
      whyItMatters:
        "Shifts teams from reactive decision-making to proactive, AI-driven engagement that maximizes revenue and retention.",
    },
  },

  {
    title: "Omnichannel Journey Orchestration",
    acronym: "OJO",
    imageSrc: "/solutions/cdp/8.webp",
    desc: "Design and activate personalized journeys across all customer touchpoints.",
    detailedContent: {
      subtitle: "Customer Journey Orchestration",
      description:
        "Provides drag-and-drop tools to design and activate personalized, consistent journeys over email, SMS, app, web, voice, and contact centers with real-time customer context.",
      features: [
        "Drag & Drop Journey Builder",
        "Omnichannel Activation",
        "Real-Time Customer Context",
        "Consistent Experiences",
      ],
    },
  },

  {
    title: "Deployment Flex",
    acronym: "DFX",
    imageSrc: "/solutions/cdp/9.webp",
    desc: "Flexible deployment across cloud, hybrid, and on-premise environments.",
    detailedContent: {
      subtitle: "Flexible Deployment Models",
      description:
        "Flexible deployment models across cloud, hybrid, and on-premise environments with seamless integration into data warehouses.",
      features: [
        "Multi-cloud support",
        "On-premise deployment",
        "Modern data stack integration",
      ],
    },
  },
] as const;

type Module = (typeof gridData)[number];

const ModuleContent = ({ module }: { module?: Module }) => {
  if (!module) return null;

  return (
    <div className="space-y-6">
      {/* Image */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl">
        <Image
          src={module.imageSrc}
          alt={module.acronym}
          fill
          className="object-cover"
        />
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-lg leading-relaxed">
        {module.detailedContent.description}
      </p>

      {/* Features */}
      {"features" in module.detailedContent &&
        module.detailedContent.features && (
          <div className="bg-muted/50 space-y-4 rounded-xl p-6">
            <h3 className="text-lg font-semibold">Key Features</h3>

            {module.detailedContent.features.map((feature, idx) => (
              <div key={idx} className="flex gap-3">
                <div className="mt-2 h-1.5 w-1.5 rounded-full bg-pink-500" />
                <p>{feature}</p>
              </div>
            ))}
          </div>
        )}

      {/* Sections */}
      {"sections" in module.detailedContent &&
        module.detailedContent.sections && (
          <div className="space-y-4">
            {module.detailedContent.sections.map((section, idx) => (
              <div key={idx} className="rounded-xl border p-5">
                <h3 className="mb-2 font-semibold">{section.title}</h3>

                <p className="text-muted-foreground">{section.description}</p>
              </div>
            ))}
          </div>
        )}

      {/* Why it matters */}
      {"whyItMatters" in module.detailedContent &&
        module.detailedContent.whyItMatters && (
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

export const CDP_Solution_Grid = () => {
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
    selectedIndex !== null ? gridData[selectedIndex] : undefined;

  return (
    <>
      <div className="w-full overflow-hidden bg-white sm:-mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 150">
          <path
            d="M0,80 C300,50 400,50 600,80 C800,110 900,110 1200,80 L1200,200 L0,200 Z"
            fill="#000000"
          />
        </svg>
      </div>

      <div className="container mx-auto mt-10">
        <p className="text-brand-two text-center text-xl font-semibold sm:text-5xl">
          CDP Solution Features
        </p>
      </div>
      <div className="container mx-auto mt-16 grid grid-cols-1 gap-8 pb-20 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {gridData.slice(0, 1).map((data, index) => {
          return (
            <div
              key={index}
              id={`solution-${data.acronym}`}
              className="group hover:border-brand-one/50 shadow-brand-two flex w-full flex-col justify-between gap-3 rounded-xl border border-white/20 bg-white p-3 shadow-[0px_0px_10px] transition-all duration-300 group-hover:shadow-[10px_10px_40px] hover:shadow-[0px_0px_50px]"
            >
              <div>
                <div className="relative flex h-60 w-full justify-center overflow-hidden rounded-lg bg-black transition-transform duration-300">
                  <Image
                    src={data.imageSrc}
                    alt={data.acronym}
                    width={500}
                    height={300}
                    className="h-full w-full object-cover object-center brightness-80"
                  />
                </div>
                <p className="mt-3 px-1 text-lg font-medium text-black">
                  {data.title}
                </p>
                <p className="text-muted-foreground mt-1 px-1 leading-snug">
                  {data.desc}
                </p>
              </div>
              <Button
                variant="default"
                className="group-hover:bg-brand-two hover:bg-brand-one mt-5 w-full bg-[#252525] font-bold text-white transition-all group-hover:text-black hover:text-black"
                size="extra-lg"
                onClick={() => openModule(index)}
              >
                View Details <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          );
        })}
        <div className="relative h-full w-full overflow-hidden border border-black bg-black">
          <Image
            src="/solutions/cdp/10.webp"
            alt="image"
            fill
            className="h-full w-full object-cover object-center brightness-80"
          />
        </div>
        {gridData.slice(1, gridData.length).map((data, index) => {
          return (
            <div
              key={index}
              id={`solution-${data.acronym}`}
              className="group hover:border-brand-one/50 shadow-brand-two flex w-full flex-col justify-between gap-3 rounded-xl border border-white/20 bg-white p-3 shadow-[0px_0px_10px] transition-all duration-300 group-hover:shadow-[10px_10px_40px] hover:shadow-[0px_0px_50px]"
            >
              <div>
                <div className="relative flex h-60 w-full justify-center overflow-hidden rounded-lg bg-black transition-transform duration-300">
                  <Image
                    src={data.imageSrc}
                    alt={data.acronym}
                    width={500}
                    height={300}
                    className="h-full w-full object-cover object-center brightness-80"
                  />
                </div>
                <p className="mt-3 px-1 text-lg font-medium text-black">
                  {data.title}
                </p>
                <p className="text-muted-foreground mt-1 px-1 leading-snug">
                  {data.desc}
                </p>
              </div>
              <Button
                variant="default"
                className="group-hover:bg-brand-two hover:bg-brand-one mt-5 w-full bg-[#252525] font-bold text-white transition-all group-hover:text-black hover:text-black"
                size="extra-lg"
                onClick={() => openModule(index)}
              >
                View Details <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          );
        })}
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

      {!isMobile && (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{currentModule?.acronym} MODULE</DialogTitle>

              <DialogDescription>
                {currentModule?.detailedContent.subtitle}
              </DialogDescription>
            </DialogHeader>

            <ModuleContent module={currentModule} />
          </DialogContent>
        </Dialog>
      )}

      {isMobile && (
        <Drawer open={isOpen} onOpenChange={handleOpenChange}>
          <DrawerContent className="max-h-[85vh]">
            <DrawerHeader>
              <DrawerTitle>{currentModule?.acronym} MODULE</DrawerTitle>

              <DrawerDescription>
                {currentModule?.detailedContent.subtitle}
              </DrawerDescription>
            </DrawerHeader>

            <div className="overflow-y-auto px-6 pb-6">
              <ModuleContent module={currentModule} />
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};
