const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://robusst.com";

// ─── Organization JSON-LD ─────────────────────────────────────────────────────
// Helps search engines and LLMs understand Robusst as a business entity.
// Inject this in the root layout <head> via a <script type="application/ld+json">.

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Robusst",
  alternateName: "Robusst Technologies",
  url: baseUrl,
  logo: {
    "@type": "ImageObject",
    url: `${baseUrl}/logo.webp`,
    width: 200,
    height: 80,
  },
  description:
    "Robusst helps telecom & banking enterprises monetize AI, optimize networks, reduce revenue leakage, and accelerate digital transformation with intelligent, scalable solutions. Delivering 3× higher campaign conversions, 78% less network downtime, and 85% less revenue leakage.",
  foundingDate: "2010",
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    minValue: 50,
    maxValue: 200,
  },
  areaServed: [
    { "@type": "Place", name: "Africa" },
    { "@type": "Place", name: "Middle East" },
    { "@type": "Place", name: "South Asia" },
    { "@type": "Place", name: "Southeast Asia" },
    { "@type": "Place", name: "Europe" },
    { "@type": "Place", name: "Australia" },
    { "@type": "Place", name: "United Kingdom" },
  ],
  sameAs: [
    "https://www.linkedin.com/company/robusst",
    "https://twitter.com/robusst",
    "https://www.youtube.com/channel/UCReJgLXmPU9g3cm47msi-Ng",
    "https://www.instagram.com/robusst",
    "https://www.facebook.com/robusst",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    url: `${baseUrl}/en/contact`,
    email: "contact@robusst.com",
    availableLanguage: [
      "English",
      "French",
      "Arabic",
      "Portuguese",
      "Spanish",
      "Russian",
    ],
  },
  knowsAbout: [
    "Telecom AI Solutions",
    "Digital Transformation for Communication Service Providers",
    "Network Monetization and Optimization",
    "Branded Calling and Anti-SPAM Solutions",
    "Customer Data Platform for Telecom",
    "Cyber Security for Telecom and Banking",
    "VoiceSync Enterprise – AI Call Center Automation",
    "Sales Tracking and Distributor Management",
    "Intelligent Network Operations Center (NOC)",
    "Revenue Assurance and Leak Prevention",
    "5G-Ready and Cloud-Native Platform Architecture",
    "Dynamic SIM Allocation and Subscriber Management",
    "Predictive Analytics and NLP for Enterprise",
    "GDPR, SOC2, and ISO 27001 Compliance",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Robusst AI-Powered Solutions",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "SoftwareApplication",
          name: "Branded Calling & Anti-SPAM",
          url: `${baseUrl}/en/solutions/branded-calling`,
          description:
            "Display brand name and logo on every outbound call. Increases pick-up rates, builds customer trust, and reduces spam tagging.",
          applicationCategory: "BusinessApplication",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "SoftwareApplication",
          name: "Customer Data Platform (CDP)",
          url: `${baseUrl}/en/solutions/customer-data-platform`,
          description:
            "Centralize customer data from multiple touchpoints for real-time insights, precise segmentation, and personalized experiences.",
          applicationCategory: "BusinessApplication",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "SoftwareApplication",
          name: "Cyber Security",
          url: `${baseUrl}/en/solutions/cybersecurity`,
          description:
            "Proactive endpoint, network, and application protection with real-time threat monitoring and compliance management.",
          applicationCategory: "SecurityApplication",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "SoftwareApplication",
          name: "Network Monetization",
          url: `${baseUrl}/en/solutions/network-monetization`,
          description:
            "Automate complex network testing and optimization to improve coverage, reduce rollout time, and enhance voice and data quality.",
          applicationCategory: "BusinessApplication",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "SoftwareApplication",
          name: "VoiceSync Enterprise — AI Call Center",
          url: `${baseUrl}/en/solutions/ai-call-center`,
          description:
            "Automate customer interactions 24/7 with AI-driven voice flows, CRM integration, and voice analytics insights.",
          applicationCategory: "BusinessApplication",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "SoftwareApplication",
          name: "Intelligent NOC",
          url: `${baseUrl}/en/solutions/intelligent-noc`,
          description:
            "AI-powered network monitoring and incident management to reduce downtime by 78% for telecom operators.",
          applicationCategory: "BusinessApplication",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "SoftwareApplication",
          name: "Sales Tracking & Distributor Management",
          url: `${baseUrl}/en/solutions/sts-dms`,
          description:
            "Track sales performance and manage distributors, dealers, inventory, and loyalty programs from a single platform.",
          applicationCategory: "BusinessApplication",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "SoftwareApplication",
          name: "Customized Solutions",
          url: `${baseUrl}/en/solutions/customized-solutions`,
          description:
            "Tailored AI solutions aligned with unique business goals, integrating with existing platforms with long-term support.",
          applicationCategory: "BusinessApplication",
        },
      },
    ],
  },
};

// ─── WebSite JSON-LD ──────────────────────────────────────────────────────────
// Enables Google's sitelinks search box and helps LLMs map the site structure.

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Robusst",
  url: baseUrl,
  description:
    "AI-powered solutions provider helping telecom & banking enterprises monetize networks, optimize operations, and accelerate digital transformation across 23+ countries.",
  inLanguage: ["en", "fr", "ar", "pt", "es", "ru"],
  publisher: {
    "@type": "Organization",
    name: "Robusst",
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/logo.webp`,
      width: 200,
      height: 80,
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
