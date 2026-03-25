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
import { useTranslations } from "next-intl";
import type {
  UseCaseGridSection,
  UseCaseSolution,
} from "~/i18n/types/networkMonetization";
import { Button } from "~/components/ui/button";

type Solution = UseCaseSolution;

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
  const t = useTranslations();
  const section = t.raw(
    "network_monetization_page.useCaseGrid",
  ) as UseCaseGridSection;
  const networkSolutions = section.solutions;

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
          {section.title} <br />
          {section.subtitle}
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

                <Button size="sm" className="mt-2">
                  View More
                </Button>
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
