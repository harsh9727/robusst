"use client";

import React from "react";
import { useTranslations } from "next-intl";
import type { PartnershipSection } from "~/i18n/types/partnership";

const FormSection: React.FC = () => {
  const t = useTranslations("partnership");
  const formSection = t.raw("formSection") as PartnershipSection["formSection"];

  return (
    <section className="bg-gray-50 py-20" id="partner-form">
      <div className="mx-auto max-w-5xl px-4">
        <div className="shadow-brand-one rounded-3xl border bg-white p-10 shadow-[0_0_0px] duration-300 hover:shadow-[0_0_30px] md:p-16">
          {/* Heading */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-extrabold text-gray-900">
              {formSection.heading}
            </h2>
            <p className="text-lg leading-relaxed text-gray-600">
              {formSection.subtitle.split("\n").map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i === 0 && <br />}
                </React.Fragment>
              ))}
            </p>
          </div>

          {/* Form */}
          <form className="space-y-8">
            {/* Row 1 */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  {formSection.form.nameLabel}
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-black focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  {formSection.form.jobTitleLabel}
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-black focus:outline-none"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  {formSection.form.emailLabel}
                </label>
                <input
                  type="email"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-black focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  {formSection.form.phoneLabel}
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-black focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Company Website */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  {formSection.form.companyNameLabel}
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-black focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  {formSection.form.websiteLabel}
                </label>
                <input
                  type="url"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-black focus:outline-none"
                />
              </div>
            </div>

            {/* Privacy */}
            <p className="text-sm leading-relaxed text-gray-500">
              {formSection.form.privacyText}
            </p>

            {/* Submit */}
            <button
              type="submit"
              disabled
              className="mt-6 cursor-not-allowed rounded-full bg-gray-200 px-10 py-4 font-semibold text-gray-400"
            >
              {formSection.form.submitButton}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FormSection;
