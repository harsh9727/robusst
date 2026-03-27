const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.robusst.com";

// ─── Organization JSON-LD ─────────────────────────────────────────────────────

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
  // Named clients — improves entity recognition in LLMs and Google's Knowledge Graph
  // and surfaces Robusst in "who does X use for telecom AI" type queries
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
  // Named client list — anchors Robusst to real-world deployments in LLM training data
  // mirrors what is publicly shown on the site (success story logos)
  member: [
    { "@type": "Organization", name: "Airtel" },
    { "@type": "Organization", name: "Mobily" },
    { "@type": "Organization", name: "Digicel" },
    { "@type": "Organization", name: "Movistar" },
    { "@type": "Organization", name: "Claro" },
    { "@type": "Organization", name: "Smart" },
    { "@type": "Organization", name: "Neotel" },
    { "@type": "Organization", name: "M2M" },
    { "@type": "Organization", name: "MNT" },
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
          operatingSystem: "Web, Cloud, On-Premise",
          offers: {
            "@type": "Offer",
            url: `${baseUrl}/en/contact`,
            availability: "https://schema.org/InStock",
            price: "0",
            priceCurrency: "USD",
            description: "Contact us for enterprise pricing",
          },
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
          operatingSystem: "Web, Cloud, On-Premise",
          offers: {
            "@type": "Offer",
            url: `${baseUrl}/en/contact`,
            availability: "https://schema.org/InStock",
            price: "0",
            priceCurrency: "USD",
            description: "Contact us for enterprise pricing",
          },
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
          operatingSystem: "Web, Cloud, On-Premise",
          offers: {
            "@type": "Offer",
            url: `${baseUrl}/en/contact`,
            availability: "https://schema.org/InStock",
            price: "0",
            priceCurrency: "USD",
            description: "Contact us for enterprise pricing",
          },
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
          operatingSystem: "Web, Cloud, On-Premise",
          offers: {
            "@type": "Offer",
            url: `${baseUrl}/en/contact`,
            availability: "https://schema.org/InStock",
            price: "0",
            priceCurrency: "USD",
            description: "Contact us for enterprise pricing",
          },
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
          operatingSystem: "Web, Cloud, On-Premise",
          offers: {
            "@type": "Offer",
            url: `${baseUrl}/en/contact`,
            availability: "https://schema.org/InStock",
            price: "0",
            priceCurrency: "USD",
            description: "Contact us for enterprise pricing",
          },
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
          operatingSystem: "Web, Cloud, On-Premise",
          offers: {
            "@type": "Offer",
            url: `${baseUrl}/en/contact`,
            availability: "https://schema.org/InStock",
            price: "0",
            priceCurrency: "USD",
            description: "Contact us for enterprise pricing",
          },
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
          operatingSystem: "Web, Cloud, On-Premise",
          offers: {
            "@type": "Offer",
            url: `${baseUrl}/en/contact`,
            availability: "https://schema.org/InStock",
            price: "0",
            priceCurrency: "USD",
            description: "Contact us for enterprise pricing",
          },
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
          operatingSystem: "Web, Cloud, On-Premise",
          offers: {
            "@type": "Offer",
            url: `${baseUrl}/en/contact`,
            availability: "https://schema.org/InStock",
            price: "0",
            priceCurrency: "USD",
            description: "Contact us for enterprise pricing",
          },
        },
      },
    ],
  },
};

// ─── WebSite JSON-LD ──────────────────────────────────────────────────────────

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

// ─── FAQ JSON-LD blocks (one per solution page) ───────────────────────────────
// Usage: import the relevant export and inject it as a <script type="application/ld+json">
// inside the <head> of each solution's page.tsx via generateMetadata or a local layout.
// Google uses FAQPage schema to display rich result accordions in SERPs.
// Perplexity, ChatGPT, and other LLM-based search engines extract these Q&A pairs
// when constructing answers about your solutions.

export const faqCdpJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a Customer Data Platform (CDP)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Customer Data Platform (CDP) is a software system that collects and unifies customer data from multiple sources such as CRM systems, websites, mobile apps, and marketing platforms to create a single customer profile. This unified data helps businesses analyze customer behavior and deliver personalized experiences across channels.",
      },
    },
    {
      "@type": "Question",
      name: "Why do telecom operators need a Customer Data Platform?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Telecom operators generate massive amounts of customer data from billing systems, usage records, apps, and support channels. A CDP helps telecom companies unify this data, understand customer behavior, and deliver personalized offers, which can improve customer engagement, reduce churn, and increase revenue.",
      },
    },
    {
      "@type": "Question",
      name: "How does a CDP create a unified customer profile?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Customer Data Platform integrates data from different systems like CRM, marketing tools, customer support, and digital channels. It cleans, organizes, and combines this information into a 360-degree view of each customer, enabling better segmentation and targeted campaigns.",
      },
    },
    {
      "@type": "Question",
      name: "What are the key benefits of implementing a CDP?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Implementing a CDP provides several advantages, including centralized customer data, better personalization, improved customer experience, and enhanced marketing performance. It also helps businesses reduce data silos and make more data-driven decisions across departments.",
      },
    },
    {
      "@type": "Question",
      name: "How does a CDP improve customer engagement?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A CDP enables businesses to analyze real-time customer behavior and deliver relevant offers or messages at the right moment. With better insights and segmentation, companies can create personalized campaigns that improve engagement, loyalty, and conversion rates.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a CDP and a CRM?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A CRM system mainly stores customer interaction data used by sales and service teams, while a CDP collects data from multiple systems and automatically builds a comprehensive customer profile. CDPs provide deeper insights and help businesses activate data for personalized marketing and customer experience strategies.",
      },
    },
  ],
};

export const faqCybersecurityJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is telecom cybersecurity and why is it important?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Telecom cybersecurity refers to the technologies and practices used to protect telecommunications networks, infrastructure, and customer data from cyber threats such as hacking, malware, and unauthorized access. It ensures the confidentiality, integrity, and availability of communication systems, which are critical for businesses, governments, and consumers.",
      },
    },
    {
      "@type": "Question",
      name: "What types of cyber threats do telecom operators face?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Telecom operators face a wide range of threats including data breaches, distributed denial-of-service (DDoS) attacks, network intrusions, signaling attacks, fraud, and malware. As telecom networks become more complex with 5G, cloud, and IoT technologies, the attack surface grows significantly.",
      },
    },
    {
      "@type": "Question",
      name: "How does a cybersecurity platform protect telecom networks?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A telecom cybersecurity platform monitors network activity in real time, detects suspicious behavior, and automatically responds to threats. It provides advanced threat detection, incident response, and compliance management, helping telecom operators maintain secure and reliable services.",
      },
    },
    {
      "@type": "Question",
      name: "What are the key benefits of implementing cybersecurity solutions in telecom?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Implementing cybersecurity solutions helps telecom providers protect sensitive customer data, maintain network reliability, ensure regulatory compliance, and reduce the risk of service disruptions. It also improves operational efficiency by automating security monitoring and threat detection.",
      },
    },
    {
      "@type": "Question",
      name: "How does cybersecurity help ensure business continuity for telecom companies?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cybersecurity systems continuously monitor infrastructure, detect threats early, and prevent attacks before they disrupt services. This ensures uninterrupted connectivity, reduced downtime, and secure digital services, which are essential for telecom operations and customer trust.",
      },
    },
    {
      "@type": "Question",
      name: "How can telecom operators strengthen their cybersecurity strategy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Telecom operators can strengthen their cybersecurity strategy by implementing real-time threat monitoring, vulnerability assessments, secure authentication systems, network segmentation, and continuous compliance monitoring. These measures help protect complex telecom infrastructures and respond quickly to evolving cyber threats.",
      },
    },
  ],
};

export const faqStsAndDmsJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are STS and DMS systems in telecom networks?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "STS (Sales Tracking System) and DMS (Distributor Management System) are platforms that help telecom operators manage their sales force and distribution network from a single interface. They track sales rep activity, distributor performance, inventory levels, order fulfillment, and dealer loyalty programs.",
      },
    },
    {
      "@type": "Question",
      name: "Why do telecom operators still maintain STS and DMS platforms?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Many telecom operators continue to operate STS and DMS platforms because they support critical sales operations and distribution management. Maintaining and optimizing these systems ensures service continuity, reliable dealer management, and stable revenue tracking while operators expand their digital capabilities.",
      },
    },
    {
      "@type": "Question",
      name: "What challenges do telecom companies face with legacy STS and DMS systems?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Legacy telecom systems often face challenges such as limited vendor support, aging infrastructure, integration difficulties with modern digital platforms, and operational complexity. These challenges make it difficult for operators to maintain performance while adopting new technologies like cloud, 5G, and IP networks.",
      },
    },
    {
      "@type": "Question",
      name: "How can STS and DMS solutions help telecom operators modernize their networks?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Advanced STS and DMS solutions help telecom providers integrate legacy systems with modern digital platforms, automate monitoring and maintenance, and ensure compatibility with new network technologies. This allows operators to extend operational efficiency while improving sales management.",
      },
    },
    {
      "@type": "Question",
      name: "What are the benefits of upgrading or optimizing STS and DMS systems?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Optimizing STS and DMS infrastructure helps telecom operators reduce operational risks, improve network reliability, and maintain uninterrupted sales and distribution services. It also enables better network management and supports smoother migration to modern telecom architectures.",
      },
    },
    {
      "@type": "Question",
      name: "How do STS and DMS systems support large telecom networks?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "STS and DMS platforms are capable of handling large volumes of sales and distribution data, managing thousands of dealer and distributor relationships within a network. They enable large-scale telecom operators to maintain visibility across their entire commercial ecosystem.",
      },
    },
  ],
};

export const faqNocJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a Network Operations Center (NOC) in telecom?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Network Operations Center (NOC) is a centralized facility where telecom operators monitor, manage, and maintain their network infrastructure in real time. It ensures continuous network performance by detecting issues, analyzing alerts, and responding quickly to outages or disruptions. NOCs play a critical role in maintaining reliable telecom services.",
      },
    },
    {
      "@type": "Question",
      name: "Why is a NOC important for telecom operators?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A NOC is essential for telecom operators because it provides 24/7 monitoring of network performance, security, and service availability. By identifying problems early and resolving them quickly, NOCs help reduce downtime, improve service quality, and ensure uninterrupted communication services for customers.",
      },
    },
    {
      "@type": "Question",
      name: "What functions are typically handled by a NOC?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A telecom NOC handles multiple operational tasks such as network monitoring, fault detection, incident management, performance analysis, and service assurance. These functions allow telecom providers to maintain network stability and deliver high-quality voice and data services to their users.",
      },
    },
    {
      "@type": "Question",
      name: "How does a NOC help reduce network downtime?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A NOC continuously monitors network infrastructure using automated tools and analytics to detect anomalies and failures. By identifying issues in real time and initiating rapid response procedures, the NOC team can resolve problems quickly and minimize service disruptions for telecom networks.",
      },
    },
    {
      "@type": "Question",
      name: "How does AI improve modern NOC operations?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Modern NOC platforms increasingly use AI and predictive analytics to detect network anomalies, forecast potential failures, and automate troubleshooting. These capabilities enable telecom operators to shift from reactive network management to proactive and intelligent network operations.",
      },
    },
    {
      "@type": "Question",
      name: "What are the benefits of an advanced NOC solution for telecom companies?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An advanced NOC solution provides real-time visibility into network performance, faster incident response, improved service reliability, and reduced operational costs. It also helps telecom operators scale their infrastructure while maintaining high service quality and operational efficiency.",
      },
    },
  ],
};

export const faqAiCallJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is an AI Call solution?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An AI Call solution uses artificial intelligence to automate and enhance voice interactions between businesses and customers. It can handle inbound and outbound calls, analyze conversations, and provide automated responses using technologies like natural language processing and speech recognition. This helps businesses improve efficiency and customer experience.",
      },
    },
    {
      "@type": "Question",
      name: "How does AI calling technology work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI calling systems convert voice into digital data, analyze the conversation using AI models, and respond in real time. These systems use technologies such as natural language processing (NLP), machine learning, and voice analytics to understand customer queries and provide relevant responses automatically.",
      },
    },
    {
      "@type": "Question",
      name: "What are the benefits of AI Call solutions for telecom and enterprises?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI Call platforms help organizations automate customer interactions, reduce operational costs, increase call handling efficiency, and improve response times. They also provide valuable insights through call analytics and conversation data, helping businesses optimize their communication strategies.",
      },
    },
    {
      "@type": "Question",
      name: "Can AI voice agents handle customer calls without human agents?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, AI voice agents can handle many types of customer interactions independently. They can answer common questions, route calls to the right department, schedule appointments, and collect information before transferring the call to a human agent when necessary.",
      },
    },
    {
      "@type": "Question",
      name: "How does AI Call technology improve customer experience?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI-powered calling systems provide faster response times, personalized interactions, and 24/7 availability. By automatically understanding customer requests and routing calls efficiently, businesses can reduce waiting times and deliver a smoother communication experience.",
      },
    },
    {
      "@type": "Question",
      name: "Can AI Call solutions integrate with CRM and telecom systems?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, most AI Call platforms can integrate with CRM systems, contact center platforms, and telecom infrastructure. This integration enables businesses to access customer data during calls, automate workflows, and maintain a complete history of customer interactions across channels.",
      },
    },
  ],
};

export const faqNetworkMonetizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is network monetization in telecom?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Network monetization refers to the process of generating revenue from a telecom operator's network infrastructure, capabilities, and data beyond traditional connectivity services. It involves leveraging technologies such as 5G, network APIs, analytics, and cloud platforms to create new digital services and revenue streams for telecom providers.",
      },
    },
    {
      "@type": "Question",
      name: "Why is network monetization important for telecom operators?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Telecom companies invest billions in network infrastructure, especially with the rollout of 5G. Network monetization helps operators recover those investments and create new revenue opportunities by offering premium services, enterprise solutions, and digital platforms built on their network capabilities.",
      },
    },
    {
      "@type": "Question",
      name: "How does 5G enable new network monetization opportunities?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "5G introduces capabilities such as ultra-low latency, high bandwidth, and network slicing, which allow telecom operators to offer differentiated services to industries like manufacturing, healthcare, and entertainment. These capabilities enable telecom providers to create new business models and premium services for enterprises and consumers.",
      },
    },
    {
      "@type": "Question",
      name: "What are some examples of telecom network monetization use cases?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Telecom operators can monetize their networks through various services such as private 5G networks, IoT connectivity, cloud gaming, smart city solutions, and industry-specific connectivity services. These use cases allow operators to deliver high-value digital solutions to enterprises and vertical industries.",
      },
    },
    {
      "@type": "Question",
      name: "How do APIs and data help in network monetization?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "By exposing network capabilities through open APIs, telecom operators can allow developers and businesses to build new applications and services using network features like location, identity, and quality-of-service controls. This approach creates new revenue streams and expands the telecom ecosystem.",
      },
    },
    {
      "@type": "Question",
      name: "What are the benefits of implementing a network monetization platform?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A network monetization platform enables telecom operators to launch new services faster, optimize network resources, increase revenue, and deliver innovative digital experiences. It also helps operators transform their networks into platforms that support enterprise solutions and emerging technologies.",
      },
    },
  ],
};

export const faqCustomizedSolutionsJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are customized telecom solutions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Customized telecom solutions are technology platforms and software systems designed specifically to meet the unique operational and business requirements of telecom operators or enterprises. Unlike off-the-shelf products, these solutions are tailored to integrate with existing infrastructure and workflows to improve efficiency and performance.",
      },
    },
    {
      "@type": "Question",
      name: "Why do businesses choose customized telecom solutions instead of standard software?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Businesses often choose customized telecom solutions because standard platforms may not meet their specific operational needs. Custom solutions allow organizations to align technology with their business goals, optimize processes, and integrate seamlessly with existing systems and tools.",
      },
    },
    {
      "@type": "Question",
      name: "What are the key benefits of implementing a customized telecom solution?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Customized telecom solutions provide several benefits including improved operational efficiency, better system integration, scalability, and enhanced customer experience. They also help organizations adapt quickly to evolving business requirements and technological changes.",
      },
    },
    {
      "@type": "Question",
      name: "Can customized telecom solutions integrate with existing platforms and tools?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, customized telecom platforms are typically designed to integrate with existing enterprise systems such as CRM, OSS/BSS platforms, analytics tools, and telecom infrastructure. Seamless integration helps organizations streamline workflows and ensure consistent data flow across systems.",
      },
    },
    {
      "@type": "Question",
      name: "How do customized solutions help telecom companies scale their operations?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Customized solutions are built with flexible architectures that allow telecom operators to scale services, add new features, and support increasing network demand as their business grows. This scalability ensures long-term sustainability and faster deployment of new services.",
      },
    },
    {
      "@type": "Question",
      name: "What types of services can be included in customized telecom solutions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Customized telecom solutions may include services such as network management platforms, customer engagement systems, analytics tools, AI-powered communication platforms, and telecom software integrations. These solutions help operators optimize network performance and deliver advanced digital services.",
      },
    },
  ],
};

// ─── BreadcrumbList JSON-LD helper ────────────────────────────────────────────
// Call this in each solution/inner page's generateMetadata or local layout.
// Breadcrumb rich results appear as a path under the page title in Google SERPs
// and help LLMs understand site hierarchy.
//
// Usage:
//   generateBreadcrumbJsonLd([
//     { name: "Home", url: baseUrl + "/en" },
//     { name: "Solutions", url: baseUrl + "/en/solutions" },
//     { name: "Intelligent NOC", url: baseUrl + "/en/solutions/intelligent-noc" },
//   ])

export function generateBreadcrumbJsonLd(
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ─── Article JSON-LD helper ───────────────────────────────────────────────────
// Use this in each blog post's generateMetadata.
// Article schema surfaces datePublished, author, and headline in Google SERPs
// and is a strong signal for Google News and LLM content freshness scoring.
//
// Usage:
//   generateArticleJsonLd({
//     headline: "AI-Powered Customer Insights for Telecom Revenue Growth",
//     description: "...",
//     url: baseUrl + "/en/blogs/ai-powered-customer-insights...",
//     datePublished: "2025-03-01",
//     dateModified: "2025-03-15",
//     image: baseUrl + "/thumbnail/1.webp",
//   })

export function generateArticleJsonLd({
  headline,
  description,
  url,
  datePublished,
  dateModified,
  image,
}: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  image: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url,
    datePublished,
    dateModified,
    image: {
      "@type": "ImageObject",
      url: image,
    },
    author: {
      "@type": "Organization",
      name: "Robusst",
      url: baseUrl,
    },
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
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}
