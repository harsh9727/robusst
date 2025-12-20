import React from "react";
import Link from "next/link";

// data
import { navLinks } from "./data";

// components
import { Button } from "~/components/ui/button";

export const Header: React.FC = () => {
  return (
    <div className="bg-primary fixed top-0 z-20 flex w-full items-center justify-between px-50 py-4">
      <p className="text-primary-foreground text-lg font-medium">Robusst</p>

      <nav className="text-primary-foreground flex items-center gap-7">
        {navLinks.map((navLink, index) => (
          <Link
            key={index}
            href={navLink.href}
            className="group flex w-fit items-center gap-2 text-sm"
          >
            <span className="text-primary-foreground relative">
              {navLink.label}
              <div className="bg-primary-foreground absolute bottom-0 h-px w-0 duration-150 group-hover:w-full" />
            </span>
          </Link>
        ))}

        <Button
          asChild
          className="bg-primary-foreground hover:bg-primary-foreground/90 text-primary"
        >
          <Link href="/contact">Contact Us</Link>
        </Button>
      </nav>
    </div>
  );
};
