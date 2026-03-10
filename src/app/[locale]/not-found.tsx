"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import { Button } from "~/components/ui/button";
import type { CommonSection } from "~/i18n/types/common";

const NotFound: React.FC = () => {
  const t = useTranslations();
  const commonSection = t.raw("common") as CommonSection;

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-1 bg-black">
      <p className="text-xl font-bold text-white">{commonSection.notFound}</p>
      <p className="text-white/80">{commonSection.notFoundDescription}</p>
      <Button
        asChild
        className="bg-brand-three hover:bg-brand-three/90 mt-5"
        size="extra-lg"
      >
        <Link href="/">{commonSection.notFoundAction}</Link>
      </Button>
    </div>
  );
};

export default NotFound;
