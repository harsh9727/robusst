import Link from "next/link";
import { getLocale } from "next-intl/server";
import { getSiteSettings } from "~/sanity/queries/siteSettings";

export default async function NotFound() {
  const locale = await getLocale();
  const settings = await getSiteSettings(locale);
  if (!settings?.notFoundAction)
    throw new Error(`Missing published Sanity site settings for ${locale}`);
  const href =
    settings.notFoundAction.link.href === "/"
      ? `/${locale}`
      : `/${locale}${settings.notFoundAction.link.href}`;
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-1 bg-black">
      <p className="text-xl font-bold text-white">{settings.notFoundTitle}</p>
      <p className="text-white/80">{settings.notFoundDescription}</p>
      <Link
        href={href}
        aria-label={settings.notFoundAction.link.ariaLabel ?? undefined}
        className="bg-brand-three hover:bg-brand-three/90 mt-5 inline-flex h-13 items-center justify-center rounded-full px-8 text-lg font-medium text-white transition-colors"
      >
        {settings.notFoundAction.link.label}
      </Link>
    </div>
  );
}
