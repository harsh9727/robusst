"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, ChevronDown } from "lucide-react";

// components
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "~/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Image from "next/image";
import { logo } from "public";
import { LanguageSwitcher } from "~/components/feature";
import { LinkedinFollowButton, TransitionLink } from "~/components/common";
import { useTranslations } from "next-intl";
import type { HeaderSection } from "~/i18n/types/header";

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const t = useTranslations();
  const headerSection = t.raw("header") as HeaderSection;

  return (
    <div className="bg-primary fixed top-0 z-20 flex w-full items-center justify-between px-6 py-4 sm:px-12 2xl:px-25">
      <div>
        <TransitionLink href="/">
          <Image
            src={logo}
            alt="logo"
            width={200}
            height={80}
            className="h-11 w-full sm:h-15"
          />
        </TransitionLink>
      </div>

      {/* Desktop Navigation */}
      <nav className="text-primary-foreground hidden items-center gap-7 xl:flex">
        {headerSection.navigation.links.map((navLink, index) => {
          // Check if the link has a submenu
          if ("subMenu" in navLink && navLink.subMenu) {
            return (
              <DropdownMenu key={index}>
                <DropdownMenuTrigger className="group flex w-fit items-center gap-1 text-sm outline-none">
                  <span className="text-primary-foreground relative">
                    {navLink.label}
                    <div className="bg-primary-foreground absolute bottom-0 h-px w-0 duration-150 group-hover:w-full" />
                  </span>
                  <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="bg-primary border-primary-foreground/20 w-48"
                >
                  {navLink.subMenu.map((subLink, subIndex) => (
                    <DropdownMenuItem key={subIndex} asChild>
                      <Link
                        href={subLink.href}
                        className="text-primary-foreground hover:bg-primary-foreground/10 cursor-pointer px-4 py-2"
                      >
                        {subLink.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            );
          }

          // Regular link without submenu
          return (
            <Link
              key={index}
              href={navLink.href ?? "/"}
              className="group flex w-fit items-center gap-2 text-sm"
            >
              <span className="text-primary-foreground relative">
                {navLink.label}
                <div className="bg-primary-foreground absolute bottom-0 h-px w-0 duration-150 group-hover:w-full" />
              </span>
            </Link>
          );
        })}

        {/* LinkedIn Follow Button */}
        <LinkedinFollowButton />

        {/* Join POC Waitlist Button */}
        <Button
          asChild
          className="bg-primary border-brand-three rounded-full border font-semibold uppercase"
        >
          <TransitionLink href={headerSection.cta.primary.href}>
            {headerSection.cta.primary.label}
          </TransitionLink>
        </Button>

        {/* Contact Us Button */}
        <Button
          asChild
          className="bg-brand-three hover:bg-brand-three/90 text-primary-foreground rounded-full font-semibold uppercase"
        >
          <TransitionLink href={headerSection.cta.secondary.href}>
            {headerSection.cta.secondary.label}
          </TransitionLink>
        </Button>

        <LanguageSwitcher />
      </nav>

      {/* Mobile Navigation - Only Language Switcher and Hamburger */}
      <div className="flex items-center gap-3 xl:hidden">
        <LanguageSwitcher />

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="2xl:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/10"
              aria-label={headerSection.mobile.menuAriaLabel}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-75 sm:w-100">
            <VisuallyHidden>
              <SheetTitle>{headerSection.mobile.sheetTitle}</SheetTitle>
            </VisuallyHidden>

            <div className="mt-8 flex flex-col gap-6 p-8">
              {headerSection.navigation.links.map((navLink, index) => {
                // Check if the link has a submenu
                if ("subMenu" in navLink && navLink.subMenu) {
                  return (
                    <div key={index} className="flex flex-col gap-3">
                      <p className="text-lg font-semibold text-gray-900">
                        {navLink.label}
                      </p>
                      <div className="ml-4 flex flex-col gap-3">
                        {navLink.subMenu.map((subLink, subIndex) => (
                          <SheetClose asChild key={subIndex}>
                            <Link
                              href={subLink.href}
                              className="text-base font-medium text-gray-700 transition-colors hover:text-gray-900"
                              onClick={() => setIsOpen(false)}
                            >
                              {subLink.label}
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    </div>
                  );
                }

                // Regular link without submenu
                return (
                  <SheetClose asChild key={index}>
                    <Link
                      href={navLink.href ?? ""}
                      className="text-lg font-medium text-gray-900 transition-colors hover:text-gray-600"
                      onClick={() => setIsOpen(false)}
                    >
                      {navLink.label}
                    </Link>
                  </SheetClose>
                );
              })}

              {/* LinkedIn Follow Button in Mobile */}
              <div className="my-2">
                <LinkedinFollowButton />
              </div>

              {/* Join POC Waitlist Button */}
              <Button
                asChild
                className="bg-primary-foreground text-primary border-brand-three rounded-full border font-semibold uppercase"
              >
                <TransitionLink href={headerSection.cta.primary.href}>
                  {headerSection.cta.primary.label}
                </TransitionLink>
              </Button>

              {/* Contact Us Button */}
              <Button
                asChild
                className="bg-brand-three hover:bg-brand-three/90 text-primary-foreground rounded-full font-semibold uppercase"
              >
                <TransitionLink href={headerSection.cta.secondary.href}>
                  {headerSection.cta.secondary.label}
                </TransitionLink>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
