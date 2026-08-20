import "~/styles/globals.css";

// components
import { Footer, Header } from "~/components/layout";
import { Provider } from "~/components/wrapper";
import GoToTop from "~/components/common/GoToTop/GoToTop";
import {
  getLanguageSettings,
  getSiteSettings,
} from "~/sanity/queries/siteSettings";

// ISR: lock to static rendering; safety net for CMS-driven pages
export const dynamic = "force-static";
export const revalidate = 300; // 5-minute baseline (webhook is primary)

export default async function DefaultLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const [siteSettings, languageSettings] = await Promise.all([
    getSiteSettings(locale),
    getLanguageSettings(),
  ]);

  if (!siteSettings || !languageSettings) {
    throw new Error(`Missing published Sanity site settings for ${locale}`);
  }

  return (
    <>
      <Provider>
        <GoToTop label={siteSettings.goToTopLabel ?? ""} />
        <Header
          data={siteSettings}
          languageSettings={languageSettings}
          locale={locale}
        />
        <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer data={siteSettings} locale={locale} />
      </Provider>
    </>
  );
}
