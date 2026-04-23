import React from "react";
import { setRequestLocale } from "next-intl/server";
import {
  Hero,
  TrustedBy,
  About,
  Solutions,
  Results,
  HowWeHelp,
  SuccessStories,
  EventsCoverage,
  OurPresence,
  Contact,
  WhyChooseUs,
  BlogsGrid,
} from "~/components/sections/home";
import { FadeIn } from "~/components/ui/FadeIn";
import { locales } from "~/i18n/config";
import { getCmsContent } from "~/lib/cms/client";
import type { Home_JsonType } from "~/types/api/home_json.types";
import type { Common_JsonType } from "~/types/api/common_json.types";

// ── ISR configuration ──────────────────────────────────────────────────────────
// force-static: throws a build error if anything accidentally forces SSR
// revalidate:   5-minute safety net if the CMS webhook fails
export const dynamic = "force-static";
export const revalidate = 300;

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// ── Page ───────────────────────────────────────────────────────────────────────
const Home = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  setRequestLocale(locale);

  // This fetch IS inside a Server Component.
  // ISR cache, revalidateTag, and revalidatePath all work correctly here.
  // At BUILD TIME: throws loudly if CMS is unreachable (fast-fail deploy).
  // At RUNTIME:    returns null on failure; each component handles null gracefully.
  const cmsHome = await getCmsContent<Home_JsonType>("home", locale);
  const cmsCommon = await getCmsContent<Common_JsonType>("common", locale);

  return (
    <>
      <FadeIn backgroundColor="bg-primary">
        <Hero data={cmsHome?.hero} />
      </FadeIn>

      <FadeIn delay={0.1} backgroundColor="bg-primary-foreground">
        <TrustedBy data={cmsHome?.trustedBy} />
      </FadeIn>

      <FadeIn delay={0.2} backgroundColor="bg-primary-foreground">
        <About data={cmsHome?.about} />
      </FadeIn>

      <div className="w-full overflow-hidden bg-white sm:-mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 150">
          <path
            d="M0,80 C300,50 400,50 600,80 C800,110 900,110 1200,80 L1200,200 L0,200 Z"
            fill="#000000"
          />
        </svg>
      </div>

      <FadeIn delay={0.1} backgroundColor="bg-primary">
        <Solutions data={cmsHome?.solutions} />
      </FadeIn>

      <div className="w-full overflow-hidden bg-white sm:-mt-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 150"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 C300,150 400,150 600,120 C800,90 900,90 1200,120 L1200,0 L0,0 Z"
            fill="#000000"
            stroke="none"
          />
        </svg>
      </div>

      <FadeIn delay={0.2} backgroundColor="bg-primary-foreground">
        <Results data={cmsHome?.results} />
      </FadeIn>

      <div className="w-full overflow-hidden bg-white sm:-mb-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 150"
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 C300,50 400,50 600,80 C800,110 900,110 1200,80 L1200,200 L0,200 Z"
            fill="#000000"
            stroke="none"
          />
        </svg>
      </div>

      <FadeIn delay={0.1} backgroundColor="bg-primary">
        <SuccessStories
          data={cmsHome?.successStories}
          techStack={cmsHome?.techStack}
          commonData={cmsCommon?.common}
          industriesWeServe={cmsHome?.industriesWeServe}
        />
      </FadeIn>

      <div className="w-full overflow-hidden bg-white sm:-mt-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 150"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 C300,150 400,150 600,120 C800,90 900,90 1200,120 L1200,0 L0,0 Z"
            fill="#000000"
            stroke="none"
          />
        </svg>
      </div>

      <FadeIn delay={0.2} backgroundColor="bg-primary-foreground">
        <HowWeHelp data={cmsHome?.howWeHelp} />
      </FadeIn>

      <div className="w-full overflow-hidden bg-white sm:-mb-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 150"
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 C300,50 400,50 600,80 C800,110 900,110 1200,80 L1200,200 L0,200 Z"
            fill="#000000"
            stroke="none"
          />
        </svg>
      </div>

      <FadeIn delay={0.1} backgroundColor="bg-primary">
        <EventsCoverage data={cmsHome?.eventsCoverage} />
      </FadeIn>

      <div className="w-full overflow-hidden bg-white sm:-mt-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 150"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 C300,150 400,150 600,120 C800,90 900,90 1200,120 L1200,0 L0,0 Z"
            fill="#000000"
            stroke="none"
          />
        </svg>
      </div>

      <FadeIn delay={0.2} backgroundColor="bg-primary-foreground">
        <WhyChooseUs data={cmsHome?.whyChooseUs} />
      </FadeIn>

      <div className="w-full overflow-hidden bg-white sm:-mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 150">
          <path
            d="M0,80 C300,50 400,50 600,80 C800,110 900,110 1200,80 L1200,200 L0,200 Z"
            fill="#000000"
          />
        </svg>
      </div>

      <FadeIn delay={0.1} backgroundColor="bg-primary">
        <BlogsGrid locale={locale} />
      </FadeIn>

      <div className="w-full overflow-hidden bg-white sm:-mt-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 150"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 C300,150 400,150 600,120 C800,90 900,90 1200,120 L1200,0 L0,0 Z"
            fill="#000000"
            stroke="none"
          />
        </svg>
      </div>

      <FadeIn delay={0.1} backgroundColor="bg-primary-foreground">
        <OurPresence data={cmsHome?.ourPresence} />
      </FadeIn>

      <FadeIn delay={0.2} backgroundColor="bg-primary-foreground">
        <Contact data={cmsHome?.contact} />
      </FadeIn>
    </>
  );
};

export default Home;
