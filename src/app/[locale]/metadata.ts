const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://robusst.com";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Robusst",
  url: baseUrl,
  logo: `${baseUrl}/logo.webp`,
  description:
    "Robusst helps telecom & banking enterprises monetize AI, optimize networks, reduce revenue leakage, and accelerate digital transformation with intelligent, scalable solutions.",
  // TODO: confirm exact founding year
  foundingDate: "2010",
  sameAs: [
    // TODO: replace placeholders below with confirmed official profile URLs before deploying
    "https://www.linkedin.com/company/robusst",
    "https://twitter.com/robusst",
    "https://www.facebook.com/robusst",
    "https://www.instagram.com/robusst",
    "https://www.youtube.com/@robusst",
    // "https://www.crunchbase.com/organization/robusst",
    // "https://clutch.co/profile/robusst",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    url: `${baseUrl}/en/contact`,
    // TODO: replace with the official contact email
    email: "contact@robusst.com",
    // TODO: replace with official phone number
    telephone: "",
    availableLanguage: ["English"],
  },
  address: {
    "@type": "PostalAddress",
    // TODO: fill in the actual street address
    streetAddress: "",
    // TODO: fill in city
    addressLocality: "",
    // TODO: fill in state/region
    addressRegion: "",
    // TODO: fill in postal code
    postalCode: "",
    // TODO: replace with correct ISO country code, e.g. "IN" for India
    addressCountry: "IN",
  },
  areaServed: {
    "@type": "Place",
    name: "Worldwide",
  },
  knowsAbout: [
    "Telecom AI Solutions",
    "Digital Transformation",
    "Network Monetization",
    "Branded Calling & Anti-SPAM",
    "Customer Data Platform",
    "Cyber Security",
    "VoiceSync Enterprise",
    "Sales Tracking & Distributor Management",
    "AI-powered Business Intelligence",
    "Revenue Assurance",
  ],
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    // TODO: update with accurate employee count range
    minValue: 50,
    maxValue: 200,
  },
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Robusst",
  url: baseUrl,
  description:
    "AI solutions provider helping telecom & banking enterprises monetize data, optimize networks, and accelerate digital transformation.",
  publisher: {
    "@type": "Organization",
    name: "Robusst",
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/logo.webp`,
    },
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${baseUrl}/en/stories?search={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};
