"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";
import type { Cdp_JsonType } from "~/types/api/cdp_json.types";

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

type Module = Cdp_JsonType["cdp_page"]["solutionGrid"]["modules"][number];

interface Props {
  data?: Cdp_JsonType["cdp_page"]["solutionGrid"];
}

/* ================= ANIMATION ================= */
const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 70,
      damping: 14,
    },
  },
};
/* =========================================== */

const ModuleContent = ({ module }: { module?: Module }) => {
  if (!module) return null;

  return (
    <div className="space-y-6">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl">
        <Image
          src={module.imageSrc}
          alt={module.acronym}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      <p className="text-muted-foreground text-lg leading-relaxed">
        {module.detailedContent.description}
      </p>
    </div>
  );
};

export const CDP_Solution_Grid = ({ data }: Props) => {
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

  const gridData = data.modules;
  const currentModule =
    selectedIndex !== null ? gridData[selectedIndex] : undefined;

  return (
    <>
      {/* Heading Animation */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="container mx-auto mt-10"
      >
        <p className="text-brand-two text-center text-xl font-semibold sm:text-5xl">
          {data.heading}
        </p>
      </motion.div>

      {/* GRID */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto mt-16 grid grid-cols-1 gap-8 pb-20 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10"
      >
        {/* FIRST CARD */}
        {gridData.slice(0, 1).map((data, index) => (
          <motion.div
            key={index}
            variants={fadeUp}
            whileHover={{ scale: 1.03 }}
            className="group flex flex-col justify-between gap-3 rounded-xl border bg-white p-3 shadow-md transition"
          >
            <div>
              <div className="relative h-60 overflow-hidden rounded-lg">
                <Image
                  src={data.imageSrc}
                  alt={data.acronym}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover brightness-80"
                />
              </div>

              <p className="mt-3 text-lg font-medium text-black">
                {data.title}
              </p>

              <p className="text-muted-foreground mt-1">{data.description}</p>
            </div>

            <Button onClick={() => openModule(index)}>
              View Details <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </motion.div>
        ))}

        {/* CENTER IMAGE */}
        <motion.div
          variants={fadeUp}
          className="relative h-full w-full overflow-hidden bg-black"
        >
          <Image
            src="/solutions/cdp/10.webp"
            alt="CDP solution overview"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover brightness-80"
          />
        </motion.div>

        {/* OTHER CARDS */}
        {gridData.slice(1).map((data, index) => (
          <motion.div
            key={index}
            variants={fadeUp}
            whileHover={{ scale: 1.03 }}
            className="group flex flex-col justify-between gap-3 rounded-xl border bg-white p-3 shadow-md transition"
          >
            <div>
              <div className="relative h-60 overflow-hidden rounded-lg">
                <Image
                  src={data.imageSrc}
                  alt={data.acronym}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover brightness-80"
                />
              </div>

              <p className="mt-3 text-lg font-medium text-black">
                {data.title}
              </p>

              <p className="text-muted-foreground mt-1">{data.description}</p>
            </div>

            <Button onClick={() => openModule(index)}>
              View Details <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </motion.div>
        ))}
      </motion.div>

      {/* MODALS */}
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
