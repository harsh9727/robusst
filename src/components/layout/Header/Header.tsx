import React from "react";
import Link from "next/link";

// data
import { navLinks } from "./data";

// components
import { Button } from "~/components/ui/button";

export const Header: React.FC = () => {
  return (
    <div className="fixed top-0 z-20 flex w-full items-center justify-between px-50 py-8">
      <p className="text-lg font-medium">Robusst</p>

      <nav className="flex items-center gap-3">
        {navLinks.map((navLink, index) => (
          <Button key={index} variant="ghost" size="sm" asChild>
            <Link href={navLink.href}>{navLink.label}</Link>
          </Button>
        ))}
      </nav>
    </div>
  );
};
