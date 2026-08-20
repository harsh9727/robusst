"use client";
import { usePathname, useRouter } from "~/i18n/routing";
import type { Locale } from "~/i18n/config";
import type { LanguageSettingsQueryResult } from "~/sanity/types";
import { useParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

interface LanguageSwitcherProps {
  options: NonNullable<LanguageSettingsQueryResult>;
}

export function LanguageSwitcher({ options }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.locale as Locale;

  const handleLocaleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  const currentLocaleData = options[currentLocale];
  const availableOptions = Object.entries(options).filter(
    (entry): entry is [string, NonNullable<(typeof entry)[1]>] =>
      Boolean(entry[1]?.flag.url),
  );

  if (!currentLocaleData?.flag.url) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="hover:text-primary-foreground! text-primary-foreground gap-2 bg-transparent!"
          aria-label={currentLocaleData.switchLabel}
        >
          <Image
            src={currentLocaleData.flag.url}
            alt={currentLocaleData.flag.alt}
            width={24}
            height={24}
            className="h-4 w-4"
          />
          <span>{currentLocaleData.nativeName}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableOptions.map(([locale, option]) => {
          if (!option.flag.url) return null;
          return (
            <DropdownMenuItem
              key={locale}
              onClick={() => handleLocaleChange(locale as Locale)}
              className="cursor-pointer gap-2"
            >
              <Image
                src={option.flag.url}
                alt={option.flag.alt}
                width={24}
                height={24}
                className="h-4 w-4"
              />
              <span>{option.nativeName}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
