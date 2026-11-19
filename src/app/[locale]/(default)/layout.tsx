import "~/styles/globals.css";

// components
import { Footer, Header } from "~/components/layout";
import { Provider } from "~/components/wrapper";
import GoToTop from "~/components/common/GoToTop/GoToTop";
import { CmsUiProvider } from "~/components/wrapper/CmsUiProvider";
import {
  getLanguageSettings,
  getSiteSettings,
} from "~/sanity/queries/siteSettings";
import { PAGE_ROUTES, type LocalizedPageType } from "~/sanity/pageRoutes";
import { isHiddenHref, previewPageTypes } from "~/sanity/pageRelease";
import { getPreviewNavigation } from "~/sanity/queries/previewNavigation";

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

  const [siteSettings, languageSettings, previewNavigation] = await Promise.all(
    [
      getSiteSettings(locale),
      getLanguageSettings(),
      previewPageTypes.length
        ? getPreviewNavigation(locale, previewPageTypes)
        : Promise.resolve([]),
    ],
  );

  if (
    !siteSettings ||
    !languageSettings ||
    !siteSettings.closeDialogLabel ||
    !siteSettings.calendlyLoadingLabel ||
    !siteSettings.previousSlideLabel ||
    !siteSettings.nextSlideLabel
  ) {
    throw new Error(`Missing published Sanity site settings for ${locale}`);
  }

  // Hide unreleased pages on production and show them on staging and locally.
  // See src/sanity/pageRelease.ts.
  const cmsResources = siteSettings.resourcesNavigation.filter(
    (link) => !isHiddenHref(link.href),
  );
  const previewResources = previewNavigation.flatMap((page) => {
    const href = PAGE_ROUTES[page._type as LocalizedPageType].path;
    return page.label && !cmsResources.some((link) => link.href === href)
      ? [
          {
            label: page.label,
            kind: "internal" as const,
            href,
            ariaLabel: null,
            iconKey: null,
            openInNewTab: false,
          },
        ]
      : [];
  });
  const navigationSettings = {
    ...siteSettings,
    resourcesNavigation: [...cmsResources, ...previewResources],
  };

  return (
    <>
      <Provider>
        <CmsUiProvider
          copy={{
            closeDialogLabel: siteSettings.closeDialogLabel,
            calendlyLoadingLabel: siteSettings.calendlyLoadingLabel,
            previousSlideLabel: siteSettings.previousSlideLabel,
            nextSlideLabel: siteSettings.nextSlideLabel,
          }}
        >
          <GoToTop label={siteSettings.goToTopLabel ?? ""} />
          <Header
            data={navigationSettings}
            languageSettings={languageSettings}
            locale={locale}
          />
          <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <Footer data={siteSettings} locale={locale} />
        </CmsUiProvider>
      </Provider>
    </>
  );
}
