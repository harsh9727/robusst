"use client";

import { ChevronRight, Shield } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState, useCallback } from "react";
import { Button } from "~/components/ui/button";
import { useTranslations } from "next-intl";
import type {
  SolutionGridSection,
  SolutionGridItem,
} from "~/i18n/types/aiCall";

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
/*                              MODULE CONTENT UI                             */
/* -------------------------------------------------------------------------- */

const ModuleContent = ({ module }: { module?: SolutionGridItem }) => {
  if (!module) return null;

  return (
    <div className="space-y-6">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl">
        <Image
          src={module.imageSrc}
          alt={module.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
          className="object-cover"
        />
      </div>

      <p className="text-muted-foreground text-lg leading-relaxed">
        {module.detailedContent.description}
      </p>

      {module.detailedContent.sections && (
        <div className="space-y-4">
          {module.detailedContent.sections.map((section, idx) => (
            <div key={idx} className="rounded-xl border p-5">
              <h3 className="mb-2 font-semibold">{section.title}</h3>
              <p className="text-muted-foreground">{section.description}</p>
            </div>
          ))}
        </div>
      )}

      {module.detailedContent.whyItMatters && (
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

export const AICALL_Solution_Grid = () => {
  const t = useTranslations();
  const solutionGrid = t.raw(
    "ai_call_page.solutionGrid",
  ) as SolutionGridSection;

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
    selectedIndex !== null ? solutionGrid.solutions[selectedIndex] : undefined;

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
      {/* HEADING */}
      <div className="container mx-auto mt-10">
        <p className="text-brand-two text-center text-xl font-semibold sm:text-5xl">
          {solutionGrid.title}
        </p>
      </div>

      {/* GRID */}
      <div className="container mx-auto mt-16 grid grid-cols-1 gap-8 p-5 pb-20 sm:grid-cols-2 lg:grid-cols-3">
        {solutionGrid.solutions.map((data, index) => (
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

              <p className="text-muted-foreground mt-1">{data.description}</p>
            </div>

            <Button className="mt-5 w-full" onClick={() => openModule(index)}>
              {solutionGrid.viewDetailsText}
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
