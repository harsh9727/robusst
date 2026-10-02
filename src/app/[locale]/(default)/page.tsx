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
  HomeReveal,
} from "~/components/sections/home";
import { locales } from "~/i18n/config";
import { getHomePage } from "~/sanity/queries/homePage";

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

  const homePage = await getHomePage(locale);
  if (!homePage) {
    throw new Error(`Missing published Sanity home page for ${locale}`);
  }

  return (
    <>
      <HomeReveal backgroundColor="bg-primary" effect="fade">
        <Hero data={homePage.hero} />
      </HomeReveal>

      <HomeReveal delay={0.05} backgroundColor="bg-primary-foreground">
        <TrustedBy data={homePage.trustedBy} />
      </HomeReveal>

      <HomeReveal
        delay={0.05}
        effect="fade"
        backgroundColor="bg-primary-foreground"
      >
        <About data={homePage.about} />
      </HomeReveal>

      <div className="w-full overflow-hidden bg-white sm:-mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 150">
          <path
            d="M0,80 C300,50 400,50 600,80 C800,110 900,110 1200,80 L1200,200 L0,200 Z"
            fill="#000000"
          />
        </svg>
      </div>

      <HomeReveal delay={0.05} effect="right" backgroundColor="bg-primary">
        <Solutions data={homePage.solutions} />
      </HomeReveal>

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

      <HomeReveal
        delay={0.05}
        effect="left"
        backgroundColor="bg-primary-foreground"
      >
        <Results data={homePage.results} />
      </HomeReveal>

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

      <HomeReveal delay={0.05} effect="right" backgroundColor="bg-primary">
        <SuccessStories
          data={homePage.successStories}
          techStack={homePage.techStack}
          industriesWeServe={homePage.industriesWeServe}
        />
      </HomeReveal>

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

      <HomeReveal
        delay={0.05}
        effect="left"
        backgroundColor="bg-primary-foreground"
      >
        <HowWeHelp data={homePage.howWeHelp} />
      </HomeReveal>

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

      <HomeReveal delay={0.05} effect="right" backgroundColor="bg-primary">
        <EventsCoverage data={homePage.eventsCoverage} />
      </HomeReveal>

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

      <HomeReveal delay={0.05} backgroundColor="bg-primary-foreground">
        <WhyChooseUs data={homePage.whyChooseUs} />
      </HomeReveal>

      <div className="w-full overflow-hidden bg-white sm:-mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 150">
          <path
            d="M0,80 C300,50 400,50 600,80 C800,110 900,110 1200,80 L1200,200 L0,200 Z"
            fill="#000000"
          />
        </svg>
      </div>

      <HomeReveal delay={0.05} effect="left" backgroundColor="bg-primary">
        <BlogsGrid locale={locale} data={homePage.blogs} />
      </HomeReveal>

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

      <HomeReveal
        delay={0.05}
        effect="fade"
        backgroundColor="bg-primary-foreground"
      >
        <OurPresence data={homePage.ourPresence} />
      </HomeReveal>

      <HomeReveal delay={0.05} backgroundColor="bg-primary-foreground">
        <Contact data={homePage.contact} />
      </HomeReveal>
    </>
  );
};

export default Home;
