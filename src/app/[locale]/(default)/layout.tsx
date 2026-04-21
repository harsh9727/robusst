import "~/styles/globals.css";

// components
import { Footer, Header } from "~/components/layout";
import { Provider } from "~/components/wrapper";
import GoToTop from "~/components/common/GoToTop/GoToTop";
import { getCmsContent } from "~/lib/cms/client";
import type { Header_JsonType } from "~/types/api/header_json.types";
import type { Footer_JsonType } from "~/types/api/footer_json.types";

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

  // This fetch IS inside a Server Component — ISR cache and revalidateTag work correctly here.
  // At RUNTIME: returns null on failure; Header/Footer fall back to useTranslations.
  const cmsHeader = await getCmsContent<Header_JsonType>("header", locale);
  const cmsFooter = await getCmsContent<Footer_JsonType>("footer", locale);

  return (
    <>
      <Provider>
        <GoToTop />
        <Header data={cmsHeader?.header} />
        <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer data={cmsFooter?.footer} />
      </Provider>
    </>
  );
}
