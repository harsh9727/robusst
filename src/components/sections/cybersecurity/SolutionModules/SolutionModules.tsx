"use client";

import { ChevronRight, Shield } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
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
import type { Cybersecurity_JsonType } from "~/types/api/cybersecurity_json.types";

// Module content component extracted outside to avoid creating components during render
const ModuleContent = ({
  module,
}: {
  module:
    | Cybersecurity_JsonType["cybersecurity_page"]["solutionModules"]["modules"][number]
    | null
    | undefined;
}) => {
  if (!module) return null;

  return (
    <div className="space-y-6">
      {/* Hero Image */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl">
        <Image
          src={module.imageSrc}
          alt={module.acronym}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
          className="object-cover brightness-90"
        />
      </div>

      {/* Main Description */}
      <div className="space-y-2">
        <p className="text-muted-foreground text-lg leading-relaxed">
          {module.detailedContent.description}
        </p>
      </div>

      {/* Features List (for SIEM) */}
      {module.detailedContent.features && (
        <div className="bg-muted/50 space-y-4 rounded-xl p-6">
          <h3 className="text-foreground text-lg font-semibold">
            Key Features
          </h3>
          <div className="space-y-3">
            {module.detailedContent.features.map((feature, idx) => (
              <div key={idx} className="flex gap-3">
                <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-pink-500" />
                <p className="text-foreground text-base leading-relaxed">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sections (for other modules) */}
      {module.detailedContent.sections && (
        <div className="space-y-5">
          {module.detailedContent.sections.map((section, idx) => (
            <div
              key={idx}
              className="border-border bg-card hover:bg-muted/30 rounded-xl border p-5 transition-colors"
            >
              <h3 className="text-foreground mb-2 text-lg font-semibold">
                {section.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {section.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Why It Matters */}
      {module.detailedContent.whyItMatters && (
        <div className="rounded-xl border border-pink-500/20 bg-linear-to-br from-pink-500/10 to-purple-500/10 p-6">
          <h3 className="text-foreground mb-3 flex items-center gap-2 text-lg font-semibold">
            <Shield className="h-5 w-5 text-pink-500" />
            Why it matters
          </h3>
          <p className="text-foreground/90 leading-relaxed">
            {module.detailedContent.whyItMatters}
          </p>
        </div>
      )}
    </div>
  );
};

interface SolutionModulesProps {
  data?: Cybersecurity_JsonType["cybersecurity_page"];
}

export default function SolutionModules({ data }: SolutionModulesProps) {
  const section = data?.solutionModules;

  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [translateDistance, setTranslateDistance] = useState(290);

  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      // Slightly larger radius on desktop to give 9 items more breathing room
      setTranslateDistance(width < 640 ? 135 : 305);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!section) return null;

  const gridData = section.modules;
  const modules = gridData.map((m) => m.acronym);

  const handleClick = (acronym: string) => {
    const element = document.getElementById(`solution-${acronym}`);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleViewDetails = (index: number) => {
    setSelectedModule(index);
    setIsOpen(true);
  };

  const currentModule =
    selectedModule !== null ? gridData[selectedModule] : null;

  const totalModules = modules.length; // 9

  if (!section) return null;

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

      <section className="relative bg-black pt-20 sm:py-10">
        <div className="mx-auto grid max-w-7xl items-center gap-0 px-6 sm:gap-20 lg:grid-cols-2">
          {/* LEFT CONTENT */}
          <div>
            <h2 className="text-3xl leading-tight font-medium text-white lg:text-4xl xl:text-6xl">
              {section.title}
            </h2>

            <p className="text-muted-foreground mt-8 max-w-lg text-lg">
              {section.description}
            </p>
          </div>

          {/* RIGHT – ENHANCED ECOSYSTEM */}
          <div className="relative flex h-115 items-center justify-center sm:h-170">
            {/* Soft Gradient Base */}
            <div className="blur-12.5 absolute h-62.5 w-62.5 rounded-full bg-linear-to-br from-cyan-900 via-cyan-700 to-cyan-900 sm:h-145 sm:w-145 sm:blur-[80px]" />

            {/* Outer Ring — slightly enlarged for 9 items */}
            <div className="absolute h-67.5 w-67.5 rounded-full border border-cyan-500 sm:h-152.5 sm:w-152.5" />
            <div className="absolute h-[215px] w-[215px] rounded-full border border-dashed border-cyan-500 sm:h-125 sm:w-125" />
            <div className="absolute h-40 w-40 rounded-full border border-cyan-500 sm:h-95 sm:w-95" />

            {/* Center Core */}
            <div className="absolute z-5 flex h-32 w-32 flex-col items-center justify-center rounded-full border border-gray-200 bg-white shadow-2xl sm:h-44 sm:w-44">
              <Shield className="mb-2 text-pink-500" size={34} />
              <p className="font-semibold text-gray-900">MDR Core</p>
              <span className="px-4 text-center text-xs text-gray-500">
                Central Detection & Response Engine
              </span>
            </div>

            {/* 9 Modules — evenly distributed using dynamic angle */}
            {modules.map((item, i) => {
              const angle = (360 / totalModules) * i; // 40° apart for 9 items
              return (
                <div
                  key={item}
                  style={{
                    transform: `rotate(${angle}deg) translate(${translateDistance}px) rotate(-${angle}deg)`,
                  }}
                  onClick={() => handleClick(item)}
                  className="absolute z-10"
                >
                  <div className="hover:border-brand-two hover:text-brand-two flex h-9 w-fit items-center justify-center rounded-xl border border-gray-700 bg-[#171717] px-4 text-sm font-semibold text-white shadow-md transition hover:shadow-lg sm:h-14 sm:px-5 sm:text-base">
                    {item}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="container mx-auto mt-5 grid grid-cols-1 gap-8 px-6 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {gridData.map((data, index) => {
          return (
            <div
              key={index}
              id={`solution-${data.acronym}`}
              className={`group hover:border-brand-one/50 flex w-full flex-col justify-between gap-3 rounded-xl border border-white/20 bg-white p-3 shadow-[0px_0px_10px] transition-all duration-300 group-hover:shadow-[10px_10px_40px] hover:shadow-[0px_0px_50px] ${data.color === "one" ? "shadow-brand-one" : data.color === "two" ? "shadow-brand-two" : "shadow-brand-three"}`}
            >
              <div>
                <div className="relative flex h-60 w-full justify-center overflow-hidden rounded-lg bg-black transition-transform duration-300">
                  <Image
                    src={data.imageSrc}
                    alt={data.acronym}
                    width={500}
                    height={300}
                    className="h-full w-[70%] object-cover object-center brightness-80"
                  />
                </div>
                <p className="mt-3 px-1 text-lg font-medium text-black">
                  {data.title}
                </p>
                <p className="text-muted-foreground mt-1 px-1 leading-snug">
                  {data.description}
                </p>
              </div>
              <Button
                variant="default"
                className={`mt-5 w-full bg-[#252525] font-bold text-white transition-all group-hover:text-black hover:text-black ${data.color === "one" ? "group-hover:bg-brand-one hover:bg-brand-one" : data.color === "two" ? "group-hover:bg-brand-two hover:bg-brand-two" : "group-hover:bg-brand-three hover:bg-brand-three"}`}
                size="extra-lg"
                onClick={() => handleViewDetails(index)}
              >
                {section.viewDetailsText}{" "}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          );
        })}
      </div>

      <div className="w-full overflow-hidden bg-white">
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

      {/* Desktop Dialog */}
      {!isMobile && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader className="space-y-3">
              <DialogTitle className="text-3xl font-bold">
                {currentModule?.acronym} MODULE
              </DialogTitle>
              <DialogDescription className="text-foreground text-xl font-semibold">
                {currentModule?.detailedContent.subtitle}
              </DialogDescription>
            </DialogHeader>
            <ModuleContent module={currentModule} />
          </DialogContent>
        </Dialog>
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerContent className="flex max-h-[85vh] flex-col">
            <div className="mx-auto flex w-full max-w-4xl flex-col overflow-hidden">
              <DrawerHeader className="shrink-0 space-y-3 pb-4">
                <DrawerTitle className="text-2xl font-bold">
                  {currentModule?.acronym} MODULE
                </DrawerTitle>
                <DrawerDescription className="text-foreground text-lg font-semibold">
                  {currentModule?.detailedContent.subtitle}
                </DrawerDescription>
              </DrawerHeader>

              <div className="flex-1 overflow-y-auto px-6 pb-6">
                <ModuleContent module={currentModule} />
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}
