"use client";

import { ChevronRight, Shield } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState, useCallback } from "react";
import { Button } from "~/components/ui/button";
import type {
  SanityStsDmsSection,
  SanityStsDmsSolution,
} from "~/types/sanity/stsDms";

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
/*                              TYPE                                           */
/* -------------------------------------------------------------------------- */

type Solution = SanityStsDmsSolution;

/* -------------------------------------------------------------------------- */
/*                              MODULE CONTENT UI                             */
/* -------------------------------------------------------------------------- */

const ModuleContent = ({
  module,
  whyItMattersLabel,
}: {
  module?: Solution;
  whyItMattersLabel: string;
}) => {
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
            <h3 className="font-semibold">{whyItMattersLabel}</h3>
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

type Props = {
  data: SanityStsDmsSection<"solutionGrid">;
};

export const STS_Solution_Grid = ({ data }: Props) => {
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

  if (!data) return null;

  const solutions = data.solutions ?? [];
  const currentModule =
    selectedIndex !== null ? solutions[selectedIndex] : undefined;

  return (
    <>
      {/* HEADING */}
      <div className="container mx-auto mt-10">
        <p className="text-brand-two text-center text-xl font-semibold sm:text-5xl">
          {data.title}
        </p>
      </div>

      {/* GRID */}
      <div className="container mx-auto mt-16 grid grid-cols-1 gap-8 p-5 pb-20 sm:grid-cols-2 lg:grid-cols-3">
        {solutions.slice(0, 1).map((item, index) => (
          <div
            key={item.acronym}
            className="group flex flex-col justify-between rounded-xl border bg-white p-3 shadow transition-all hover:shadow-xl"
          >
            <div>
              <div className="relative h-60 overflow-hidden rounded-lg">
                <Image
                  src={item.imageSrc}
                  alt={item.title}
                  width={500}
                  height={300}
                  className="h-full w-full object-cover brightness-90"
                />
              </div>

              <p className="mt-3 text-lg font-medium">{item.title}</p>

              <p className="text-muted-foreground mt-1">{item.description}</p>
            </div>

            <Button className="mt-5 w-full" onClick={() => openModule(index)}>
              {data.viewDetailsText}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        ))}

        <div className="relative h-full w-full overflow-hidden rounded-full p-16 lg:p-8">
          <Image
            src={data.decorativeImage ?? ""}
            alt={data.decorativeImageAlt ?? data.title ?? ""}
            width={500}
            height={300}
            className="shadow-brand-one h-full w-full rounded-full object-cover shadow-[0px_0px_20px] brightness-90 duration-200 hover:shadow-[0px_0px_40px]"
          />
        </div>

        {solutions.slice(1).map((item, index) => (
          <div
            key={item.acronym}
            className="group flex flex-col justify-between rounded-xl border bg-white p-3 shadow transition-all hover:shadow-xl"
          >
            <div>
              <div className="relative h-60 overflow-hidden rounded-lg">
                <Image
                  src={item.imageSrc}
                  alt={item.title}
                  width={500}
                  height={300}
                  className="h-full w-full object-cover brightness-90"
                />
              </div>

              <p className="mt-3 text-lg font-medium">{item.title}</p>

              <p className="text-muted-foreground mt-1">{item.description}</p>
            </div>

            <Button
              className="mt-5 w-full"
              onClick={() => openModule(index + 1)}
            >
              {data.viewDetailsText}
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

            <ModuleContent
              module={currentModule}
              whyItMattersLabel={data.whyItMattersLabel ?? ""}
            />
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
              <ModuleContent
                module={currentModule}
                whyItMattersLabel={data.whyItMattersLabel ?? ""}
              />
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};
