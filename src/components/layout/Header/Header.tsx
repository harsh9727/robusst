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
import Image from "next/image";
import { logo } from "public";

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-primary fixed top-0 z-20 flex w-full items-center justify-between px-6 py-4 sm:px-12 lg:px-25">
      <div>
        <Link href="/">
          <Image
            src={logo}
            alt="logo"
            width={200}
            height={80}
            className="h-10 w-full sm:h-15"
          />
        </Link>
      </div>

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
          className="bg-primary border-brand-three rounded-full border font-semibold uppercase"
        >
          <Link href="/contact">Join POC WaitList</Link>
        </Button>

        <Button
          asChild
          className="bg-brand-three hover:bg-brand-three/90 text-primary-foreground rounded-full font-semibold uppercase"
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

            <Button
              asChild
              className="bg-primary-foreground text-primary border-brand-three rounded-full border font-semibold uppercase"
            >
              <Link href="/contact">Join POC WaitList</Link>
            </Button>

            <Button
              asChild
              className="bg-brand-three hover:bg-brand-three/90 text-primary-foreground rounded-full font-semibold uppercase"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
