"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

// data
import { navLinks } from "./data";

// components
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "~/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-primary fixed top-0 z-20 flex w-full items-center justify-between px-6 py-4 sm:px-12 lg:px-25">
      <Link
        href="/"
        className="text-primary-foreground text-lg font-medium sm:text-xl"
      >
        Robusst
      </Link>

      {/* Desktop Navigation */}
      <nav className="text-primary-foreground hidden items-center gap-7 lg:flex">
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

      {/* Mobile Navigation */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-75 sm:w-100">
          <VisuallyHidden>
            <SheetTitle>Navigation Menu</SheetTitle>
          </VisuallyHidden>

          <div className="mt-8 flex flex-col gap-6 p-8">
            {navLinks.map((navLink, index) => (
              <SheetClose asChild key={index}>
                <Link
                  href={navLink.href}
                  className="text-lg font-medium text-gray-900 transition-colors hover:text-gray-600"
                  onClick={() => setIsOpen(false)}
                >
                  {navLink.label}
                </Link>
              </SheetClose>
            ))}

            <SheetClose asChild>
              <Button
                asChild
                className="bg-primary hover:bg-primary/90 text-primary-foreground mt-4 w-full"
              >
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  Contact Us
                </Link>
              </Button>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
