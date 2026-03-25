"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";
import type { PartnershipSection } from "~/i18n/types/partnership";

interface FormData {
  name: string;
  job: string;
  email: string;
  phone: string;
  companyName: string;
  companyWebsite: string;
  partnerType: "sales" | "tech" | "";
}

interface FormErrors {
  name?: string;
  email?: string;
  partnerType?: string;
}

const INITIAL_FORM: FormData = {
  name: "",
  job: "",
  email: "",
  phone: "",
  companyName: "",
  companyWebsite: "",
  partnerType: "",
};

const FormSection: React.FC = () => {
  const t = useTranslations("partnership");
  const formSection = t.raw("formSection") as PartnershipSection["formSection"];

  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // ── Validation ──────────────────────────────────────────────────────────────

  const validateField = (
    field: keyof FormErrors,
    value: string,
  ): string | undefined => {
    switch (field) {
      case "name":
        if (!value.trim()) return "Name is required.";
        if (value.trim().length < 2)
          return "Name must be at least 2 characters.";
        break;
      case "email":
        if (!value.trim()) return "Email is required.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Please enter a valid email address.";
        break;
      case "partnerType":
        if (!value) return "Please select a partner type.";
        break;
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      partnerType: validateField("partnerType", formData.partnerType),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name as keyof FormErrors, value),
      }));
    }
  };

  const handleBlur = (field: keyof FormErrors) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(
        field,
        field === "partnerType" ? formData.partnerType : formData[field],
      ),
    }));
  };

  const handlePartnerTypeSelect = (value: "sales" | "tech") => {
    setFormData((prev) => ({ ...prev, partnerType: value }));
    setDropdownOpen(false);
    if (touched.partnerType) {
      setErrors((prev) => ({
        ...prev,
        partnerType: validateField("partnerType", value),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({ name: true, email: true, partnerType: true });

    if (!validateForm()) {
      toast.error("Please fix the errors in the form before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/gsheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reason: "PARTNER",
          name: formData.name.trim(),
          job: formData.job.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim(),
          companyName: formData.companyName.trim(),
          companyWebsite: formData.companyWebsite.trim(),
          partnerType: formData.partnerType,
        }),
      });

      const data = (await response.json()) as {
        success: boolean;
        message: string;
      };

      if (response.ok && data.success) {
        toast.success(
          "Your partner request has been submitted! We will get back to you soon.",
        );
        setFormData(INITIAL_FORM);
        setErrors({});
        setTouched({});
      } else {
        toast.error(
          data.message ?? "Failed to submit form. Please try again later.",
        );
      }
    } catch (err) {
      console.error("Error submitting partner form:", err);
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Shared input class helper ───────────────────────────────────────────────

  const inputClass = (hasError: boolean) =>
    `w-full rounded-lg border px-4 py-3 focus:ring-2 focus:ring-black focus:outline-none ${
      hasError ? "border-red-500 focus:ring-red-500" : "border-gray-300"
    }`;

  const partnerTypeOptions: { value: "sales" | "tech"; label: string }[] = [
    { value: "sales", label: "Sales" },
    { value: "tech", label: "Tech" },
  ];

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
          <form className="space-y-8" onSubmit={handleSubmit} noValidate>
            {/* Row 1 — Name & Job Title */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  {formSection.form.nameLabel}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={() => handleBlur("name")}
                  className={inputClass(!!errors.name && !!touched.name)}
                />
                {touched.name && errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  {formSection.form.jobTitleLabel}
                </label>
                <input
                  type="text"
                  name="job"
                  value={formData.job}
                  onChange={handleChange}
                  className={inputClass(false)}
                />
              </div>
            </div>

            {/* Row 2 — Email & Phone */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  {formSection.form.emailLabel}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur("email")}
                  className={inputClass(!!errors.email && !!touched.email)}
                />
                {touched.email && errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  {formSection.form.phoneLabel}
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputClass(false)}
                />
              </div>
            </div>

            {/* Row 3 — Company Name & Company Website */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  {formSection.form.companyNameLabel}
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className={inputClass(false)}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  {formSection.form.websiteLabel}
                </label>
                <input
                  type="url"
                  name="companyWebsite"
                  value={formData.companyWebsite}
                  onChange={handleChange}
                  className={inputClass(false)}
                />
              </div>
            </div>

            {/* Row 4 — Partner Type dropdown (full width) */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">
                {formSection.form.partnerTypeLabel}
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  onBlur={() => {
                    // delay close so click on option registers first
                    setTimeout(() => {
                      setDropdownOpen(false);
                      handleBlur("partnerType");
                    }, 150);
                  }}
                  className={`flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left focus:ring-2 focus:ring-black focus:outline-none ${
                    touched.partnerType && errors.partnerType
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300"
                  } ${!formData.partnerType ? "text-gray-400" : "text-gray-900"}`}
                >
                  <span>
                    {formData.partnerType
                      ? partnerTypeOptions.find(
                          (o) => o.value === formData.partnerType,
                        )?.label
                      : "Select partner type"}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {dropdownOpen && (
                  <ul className="absolute z-10 mt-1 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
                    {partnerTypeOptions.map((option) => (
                      <li key={option.value}>
                        <button
                          type="button"
                          onMouseDown={() =>
                            handlePartnerTypeSelect(option.value)
                          }
                          className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-50 ${
                            formData.partnerType === option.value
                              ? "font-semibold text-black"
                              : "text-gray-700"
                          }`}
                        >
                          {option.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {touched.partnerType && errors.partnerType && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.partnerType}
                </p>
              )}
            </div>

            {/* Privacy */}
            <p className="text-sm leading-relaxed text-gray-500">
              {formSection.form.privacyText}
            </p>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`mt-6 rounded-full px-10 py-4 font-semibold transition-colors duration-200 ${
                isSubmitting
                  ? "cursor-not-allowed bg-gray-200 text-gray-400"
                  : "cursor-pointer bg-black text-white hover:bg-gray-800"
              }`}
            >
              {isSubmitting ? "Submitting…" : formSection.form.submitButton}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FormSection;
