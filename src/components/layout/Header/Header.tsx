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
import { LanguageSwitcher } from "~/components/feature";
import { LinkedinFollowButton, TransitionLink } from "~/components/common";
import type {
  LanguageSettingsQueryResult,
  SiteSettingsQueryResult,
} from "~/sanity/types";

interface HeaderProps {
  data: NonNullable<SiteSettingsQueryResult>;
  languageSettings: NonNullable<LanguageSettingsQueryResult>;
  locale: string;
}

function localizedHref(href: string | null, locale: string) {
  if (!href?.startsWith("/")) return href ?? "/";
  if (href === "/") return `/${locale}`;
  return `/${locale}${href}`;
}

export const Header: React.FC<HeaderProps> = ({
  data,
  languageSettings,
  locale,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // CMS data takes priority; cast ensures full NavigationLink type (incl. subMenu) is preserved
  const headerSection = data;
  if (
    !headerSection.announcement ||
    !headerSection.logo.url ||
    !headerSection.mobileMenuTitle ||
    !headerSection.mobileMenuOpenLabel ||
    !headerSection.mobileMenuCloseLabel
  ) {
    return null;
  }
  const navigationLinks = [
    ...headerSection.primaryNavigation.slice(0, 1),
    {
      label: headerSection.solutionsNavigationLabel,
      subMenu: headerSection.solutionsNavigation,
    },
    ...headerSection.primaryNavigation.slice(1),
    {
      label: headerSection.resourcesNavigationLabel,
      subMenu: headerSection.resourcesNavigation,
    },
  ];

  return (
    <div className="bg-primary fixed top-0 z-50 flex w-full flex-col items-center justify-between">
      <div className="border-border/40 text-primary bg-brand-two hidden w-full items-center justify-center border-b px-5 py-1 font-semibold sm:flex">
        <div className="flex w-full items-center justify-center sm:px-12 2xl:px-25">
          <TransitionLink
            href={localizedHref(headerSection.announcement.href, locale)}
            className="flex items-center gap-1 text-center text-sm underline underline-offset-4 sm:text-base"
          >
            {headerSection.announcementText}{" "}
            <span className="text-brand-two bg-black px-2">
              {headerSection.announcement.label}
            </span>
          </TransitionLink>
        </div>
      </div>

      <div className="flex w-full items-center justify-between px-6 py-4 sm:px-12 2xl:px-25">
        <div>
          <TransitionLink href={`/${locale}`}>
            <Image
              src={headerSection.logo.url}
              alt={headerSection.logo.alt}
              width={200}
              height={80}
              priority
              className="h-11 w-auto sm:h-17"
            />
          </TransitionLink>
        </div>

        {/* Desktop Navigation */}
        <nav className="text-primary-foreground hidden items-center gap-4 xl:flex 2xl:gap-7">
          {navigationLinks.map((navLink, index) => {
            // Check if the link has a submenu
            if ("subMenu" in navLink) {
              return (
                <DropdownMenu key={index}>
                  <DropdownMenuTrigger className="group flex w-fit items-center gap-1 outline-none">
                    <span className="group-hover:text-brand-two text-primary-foreground relative text-lg font-semibold whitespace-nowrap">
                      {navLink.label}
                      <div className="bg-brand-two absolute bottom-0 h-px w-0 duration-150 group-hover:w-full" />
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
                          href={localizedHref(subLink.href, locale)}
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
                href={localizedHref(navLink.href ?? "/", locale)}
                className="group flex w-fit items-center gap-2 text-lg font-semibold whitespace-nowrap"
              >
                <span className="text-primary-foreground group-hover:text-brand-two relative">
                  {navLink.label}
                  <div className="bg-brand-two absolute bottom-0 h-px w-0 duration-150 group-hover:w-full" />
                </span>
              </Link>
            );
          })}

          {/* LinkedIn Follow Button */}
          <LinkedinFollowButton
            companyId={data.linkedinCompanyId}
            showCounter={data.linkedinFollowCounter}
          />

          {/* Join POC Waitlist Button */}

          {/* Contact Us Button */}
          <Button
            asChild
            size="lg"
            className="bg-brand-one hover:bg-brand-one/90 text-primary-foreground rounded-full text-base font-bold uppercase"
          >
            <TransitionLink
              href={localizedHref(
                headerSection.headerSecondaryCta.link.href,
                locale,
              )}
            >
              {headerSection.headerSecondaryCta.link.label}
            </TransitionLink>
          </Button>

          <LanguageSwitcher options={languageSettings} />
        </nav>

        {/* Mobile Navigation - Only Language Switcher and Hamburger */}
        <div className="flex items-center gap-3 xl:hidden">
          <LanguageSwitcher options={languageSettings} />

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="2xl:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary-foreground/10"
                aria-label={headerSection.mobileMenuOpenLabel}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-75 sm:w-100"
              closeLabel={headerSection.mobileMenuCloseLabel}
            >
              <VisuallyHidden>
                <SheetTitle>{headerSection.mobileMenuTitle}</SheetTitle>
              </VisuallyHidden>

              <div className="mt-8 flex flex-col gap-6 p-8">
                {navigationLinks.map((navLink, index) => {
                  // Check if the link has a submenu
                  if ("subMenu" in navLink) {
                    return (
                      <div key={index} className="flex flex-col gap-3">
                        <p className="text-lg font-semibold text-gray-900">
                          {navLink.label}
                        </p>
                        <div className="ml-4 flex flex-col gap-3">
                          {navLink.subMenu.map((subLink, subIndex) => (
                            <SheetClose asChild key={subIndex}>
                              <Link
                                href={localizedHref(subLink.href, locale)}
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
                        href={localizedHref(navLink.href ?? "", locale)}
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
                  <LinkedinFollowButton
                    companyId={data.linkedinCompanyId}
                    showCounter={data.linkedinFollowCounter}
                  />
                </div>

                {/* Join POC Waitlist Button */}
                <Button
                  asChild
                  className="bg-primary-foreground text-primary border-brand-one rounded-full border font-semibold uppercase"
                >
                  <TransitionLink
                    href={localizedHref(
                      headerSection.headerPrimaryCta.link.href,
                      locale,
                    )}
                  >
                    {headerSection.headerPrimaryCta.link.label}
                  </TransitionLink>
                </Button>

                {/* Contact Us Button */}
                <Button
                  asChild
                  className="bg-brand-three hover:bg-brand-three/90 text-primary-foreground rounded-full font-semibold uppercase"
                >
                  <TransitionLink
                    href={localizedHref(
                      headerSection.headerSecondaryCta.link.href,
                      locale,
                    )}
                  >
                    {headerSection.headerSecondaryCta.link.label}
                  </TransitionLink>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};
