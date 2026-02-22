"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import { platform } from "public";
import { is } from "zod/v4/locales";

const faqs = [
  {
    q: "What is Robusst Branded Calling?",
    a: "Robusst Branded Calling is a cloud-based solution that enables businesses to display their name, logo, and call purpose on the recipient’s phone screen — even if the number isn’t saved. It improves pickup rates, reduces spam mislabeling, and creates a trusted, professional caller experience.",
  },
  {
    q: "How is Robusst different from traditional caller ID?",
    a: "Traditional caller ID shows only a number or basic name. Robusst goes further by displaying your logo, business name, verified badge, and call reason — ensuring you appear professional and verified on every call.",
  },
  {
    q: "Will Robusst work across all devices?",
    a: "Yes. Robusst supports cross-device compatibility including smartphones, smartwatches, and future-ready communication platforms. Android and iOS users receive a consistent branded experience.",
  },
  {
    q: "What industries can benefit from Robusst?",
    a: "Any business that relies on phone communication can benefit — including banks, healthcare providers, e-commerce, logistics, edtech, travel, and more. If you’re calling customers, Robusst helps you connect faster and better.",
  },
  {
    q: "How does Robusst ensure call security and compliance?",
    a: "Robusst complies with global telecom standards and privacy regulations. All calls are encrypted, and businesses can control call routing, branding, and verification to ensure secure, compliant communication.",
  },

  {
    q: "Can I customize what my customers see during a call?",
    a: "Absolutely. You can personalize the caller name, logo, and call reason for specific campaigns or teams. This makes it easier for customers to recognize the intent of the call and respond promptly.",
  },
  {
    q: "How does Robusst reduce spam flags and call blocking?",
    a: "By verifying your identity and displaying branded visuals, Robusst helps prevent your calls from being misidentified as spam. Verified branding builds trust and increases answer rates by up to 80% compared to unidentified or generic calls.",
  },
  {
    q: "Is customer data safe with Robusst?",
    a: "Yes. Robusst is built with enterprise-grade security and compliance protocols. We never access or store customer call content or sensitive data. All data is encrypted and handled according to global privacy standards.",
  },
  {
    q: "How do I get started with Robusst?",
    a: "Getting started is simple. Just reach out through our contact or demo request form, and a Robusst representative will guide you through onboarding, integration, and launch — often in less than a week.",
  },
  {
    q: "Does Robusst integrate with existing CRM or dialer tools?",
    a: "Yes. Robusst is built for seamless integration with leading CRMs, dialers, and call center solutions. Whether you're using Salesforce, Zoho, Freshdesk, or a custom platform — we’ve got you covered.",
  },
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <div className="w-full overflow-hidden bg-white sm:-mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 150">
          <path
            d="M0,80 C300,50 400,50 600,80 C800,110 900,110 1200,80 L1200,200 L0,200 Z"
            fill="#000000"
          />
        </svg>
      </div>

      <section className="bg-primary relative flex w-full items-center justify-center overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-16 lg:py-25">
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-2">
          {/* LEFT CONTENT */}
          <div>
            <h2 className="text-brand-two mb-10 text-3xl font-extrabold tracking-wide uppercase md:text-4xl">
              Frequently Asked <br /> Questions
            </h2>

            <div className="relative h-[300px] overflow-hidden rounded-3xl shadow-xl sm:h-[370px] md:h-[400px] lg:h-[500px]">
              <Image
                src="/solutions/brand/3.webp"
                fill
                alt="FAQ Support Team"
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>

          {/* RIGHT FAQ LIST */}
          <div className="flex h-[630px] flex-col gap-6 overflow-y-auto">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className="rounded-2xl border border-white/20 bg-black/60 p-6"
                >
                  {/* QUESTION */}
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between text-left"
                  >
                    <h4
                      className={`text-lg font-semibold ${isOpen ? "text-brand-two" : "text-white"}`}
                    >
                      {index + 1}. {faq.q}
                    </h4>

                    {isOpen ? (
                      <Minus className="text-brand-two h-5 w-5" />
                    ) : (
                      <Plus className="text-brand-two h-5 w-5" />
                    )}
                  </button>

                  {/* ANSWER */}
                  {isOpen && (
                    <p className="mt-4 text-sm leading-relaxed text-white/80">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
