"use client";
import { usePathname, useRouter } from "~/i18n/routing";
import { localeLabels, type Locale } from "~/i18n/config";
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

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.locale as Locale;

  const handleLocaleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  const currentLocaleData = localeLabels[currentLocale];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="hover:text-primary-foreground! text-primary-foreground gap-2 bg-transparent!"
        >
          <Image
            src={currentLocaleData.flag}
            alt="flag"
            width={24}
            height={24}
            className="h-4 w-4"
          />
          <span>{currentLocaleData.name}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(localeLabels).map(([locale, { name, flag }]) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => handleLocaleChange(locale as Locale)}
            className="cursor-pointer gap-2"
          >
            <Image
              src={flag}
              alt="flag"
              width={24}
              height={24}
              className="h-4 w-4"
            />
            <span>{name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
