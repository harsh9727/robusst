"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { TransitionLink } from "~/components/common";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import type { PocWaitlistPageTranslations } from "~/i18n/types/pocWaitlist";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { COUNTRIES } from "../contact";
import { cn } from "~/lib/utils";


interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  country?: string;
}

const PocWaitlist: React.FC = () => {
  const t = useTranslations();
  const pocPage = t.raw("poc_waitlist_page") as PocWaitlistPageTranslations;

  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    email: "",
    phone: "",
    country: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [openCountry, setOpenCountry] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex =
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
    return phoneRegex.test(phone);
  };

  const validateName = (name: string): boolean => {
    return name.trim().length >= 2;
  };

  const validateMessage = (message: string): boolean => {
    const wordCount = message
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    return message.trim().length > 0 && wordCount <= 1000;
  };

  const getWordCount = (text: string): number => {
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  };

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "name":
        if (!value.trim()) return pocPage.form.validation.nameRequired;
        if (!validateName(value)) return pocPage.form.validation.nameMinLength;
        break;
      case "email":
        if (!value.trim()) return pocPage.form.validation.emailRequired;
        if (!validateEmail(value)) return pocPage.form.validation.emailInvalid;
        break;
      case "phone":
        if (value.trim() && !validatePhone(value))
          return pocPage.form.validation.phoneInvalid;
        break;
      case "country":
        if (!value) return pocPage.form.validation.countryRequired;
        break;
      case "message":
        if (!value.trim()) return pocPage.form.validation.messageRequired;
        if (!validateMessage(value)) {
          const wordCount = getWordCount(value);
          if (wordCount > 1000) return pocPage.form.validation.messageMaxWords;
        }
        break;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    newErrors.name = validateField("name", formData.name);
    newErrors.email = validateField("email", formData.email);
    newErrors.phone = validateField("phone", formData.phone);
    newErrors.country = validateField("country", formData.country);
    newErrors.message = validateField("message", formData.message);

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== undefined);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      phone: true,
      country: true,
      message: true,
    });

    if (!validateForm()) {
      toast.error("Please fix the errors in the form before submitting");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/gsheet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reason: "POC",
          name: formData.name.trim(),
          companyName: formData.companyName.trim() || "",
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim() || "",
          country: formData.country,
          message: formData.message.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(pocPage.form.success.message);

        // Reset form
        setFormData({
          name: "",
          companyName: "",
          email: "",
          phone: "",
          country: "",
          message: "",
        });
        setErrors({});
        setTouched({});
      } else {
        toast.error(pocPage.form.error.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(pocPage.form.error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(
      field,
      formData[field as keyof typeof formData],
    );
    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  const handleCountryChange = (value: string) => {
    setFormData({
      ...formData,
      country: value,
    });
    setOpenCountry(false);

    setTouched((prev) => ({ ...prev, country: true }));
    const error = validateField("country", value);
    setErrors((prev) => ({
      ...prev,
      country: error,
    }));
  };

  const messageWordCount = getWordCount(formData.message);

  return (
    <div>
      <div className="bg-primary flex h-screen w-full flex-col items-center justify-center lg:flex-row">
        <div className="bg-primary relative order-2 flex h-full w-full flex-col justify-center gap-2 overflow-hidden px-8 sm:px-12 lg:order-1 lg:min-w-[40%] lg:pl-25">
          <div className="bg-brand-three absolute top-full -right-40 h-20 w-50 -translate-y-1/2 rotate-6 animate-pulse blur-[150px] sm:h-120 lg:top-1/2 lg:-left-40" />
          <div className="bg-brand-three absolute -bottom-5 -left-12 h-20 w-120 animate-pulse blur-[100px]" />
          <h1 className="text-primary-foreground text-3xl font-medium lg:text-4xl xl:text-6xl">
            {pocPage.banner.heading}
          </h1>
          <p className="text-primary-foreground mt-2 text-lg">
            {pocPage.banner.subtitle}
          </p>

          <Button
            variant="default"
            size="extra-lg"
            className="bg-brand-three text-primary-foreground hover:bg-brand-three/90 hover:text-primary-foreground mt-7 w-fit"
            asChild
          >
            <TransitionLink href="#poc-form">
              {pocPage.banner.ctaText}
            </TransitionLink>
          </Button>
        </div>

        <div className="relative order-1 h-full w-full items-center justify-center overflow-hidden lg:order-2 lg:min-w-[60%]">
          <div className="bg-primary absolute -bottom-15 -left-4 z-10 h-20 w-[120vw] rotate-6 sm:h-30 lg:-top-9 lg:-left-28 lg:h-[120vh] lg:w-50 lg:rotate-12" />
          <div className="relative h-full w-full bg-black">
            <Image
              src={pocPage.banner.image}
              alt={pocPage.banner.imageAlt}
              fill
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>

      <div id="poc-form" className="bg-background px-8 py-20 sm:px-12 lg:px-25">
        <div className="mx-auto max-w-2xl">
          <div className="relative">
            <h2 className="text-primary mb-12 text-center text-3xl font-semibold lg:text-4xl">
              <span className="text-brand-three">·</span> {pocPage.form.heading}{" "}
              <span className="text-brand-three">·</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name Field */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-muted-foreground text-base font-medium"
                >
                  {pocPage.form.fields.name.required && (
                    <span className="text-red-500">*</span>
                  )}{" "}
                  {pocPage.form.fields.name.label}
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={() => handleBlur("name")}
                  disabled={isSubmitting}
                  className={`border-brand-three focus-visible:border-brand-three mt-2 h-auto rounded-full border bg-transparent px-6 py-2 text-xl! focus-visible:ring-0 ${
                    touched.name && errors.name
                      ? "border-red-500 focus-visible:border-red-500"
                      : ""
                  }`}
                />
                {touched.name && errors.name && (
                  <p className="mt-1 px-2 text-sm text-red-500">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Company Name Field */}
              <div className="space-y-2">
                <label
                  htmlFor="companyName"
                  className="text-muted-foreground text-base font-medium"
                >
                  {pocPage.form.fields.companyName.label}
                </label>
                <Input
                  id="companyName"
                  name="companyName"
                  type="text"
                  value={formData.companyName}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="border-brand-three focus-visible:border-brand-three mt-2 h-auto rounded-full border bg-transparent px-6 py-2 text-xl! focus-visible:ring-0"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-muted-foreground text-base font-medium"
                >
                  {pocPage.form.fields.email.required && (
                    <span className="text-red-500">*</span>
                  )}{" "}
                  {pocPage.form.fields.email.label}
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur("email")}
                  disabled={isSubmitting}
                  className={`border-brand-three focus-visible:border-brand-three mt-2 h-auto rounded-full border bg-transparent px-6 py-2 text-xl! focus-visible:ring-0 ${
                    touched.email && errors.email
                      ? "border-red-500 focus-visible:border-red-500"
                      : ""
                  }`}
                />
                {touched.email && errors.email && (
                  <p className="mt-1 px-2 text-sm text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="text-muted-foreground text-base font-medium"
                >
                  {pocPage.form.fields.phone.required && (
                    <span className="text-red-500">*</span>
                  )}{" "}
                  {pocPage.form.fields.phone.label}
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={() => handleBlur("phone")}
                  disabled={isSubmitting}
                  className={`border-brand-three focus-visible:border-brand-three mt-2 h-auto rounded-full border bg-transparent px-6 py-2 text-xl! focus-visible:ring-0 ${
                    touched.phone && errors.phone
                      ? "border-red-500 focus-visible:border-red-500"
                      : ""
                  }`}
                />
                {touched.phone && errors.phone && (
                  <p className="mt-1 px-2 text-sm text-red-500">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Country Combobox */}
              <div className="space-y-2">
                <label
                  htmlFor="country"
                  className="text-muted-foreground text-base font-medium"
                >
                  {pocPage.form.fields.country.required && (
                    <span className="text-red-500">*</span>
                  )}{" "}
                  {pocPage.form.fields.country.label}
                </label>
                <Popover open={openCountry} onOpenChange={setOpenCountry}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openCountry}
                      type="button"
                      disabled={isSubmitting}
                      className={cn(
                        "border-brand-three focus-visible:border-brand-three mt-2 h-auto w-full justify-between rounded-full border bg-transparent px-6 py-2 text-xl! hover:bg-transparent focus-visible:ring-0",
                        !formData.country && "text-muted-foreground",
                        touched.country &&
                          errors.country &&
                          "border-red-500 focus-visible:border-red-500",
                      )}
                      onBlur={() => handleBlur("country")}
                    >
                      {formData.country ||
                        pocPage.form.fields.country.placeholder}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-full p-0"
                    style={{ width: "var(--radix-popover-trigger-width)" }}
                  >
                    <Command>
                      <CommandInput
                        placeholder="Search country..."
                        className="h-12 text-base"
                      />
                      <CommandEmpty>No country found.</CommandEmpty>
                      <CommandGroup className="max-h-125 overflow-y-auto">
                        {COUNTRIES.map((country) => (
                          <CommandItem
                            key={country}
                            value={country}
                            onSelect={() => {
                              handleCountryChange(country);
                            }}
                            className="py-3 text-base"
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                formData.country === country
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {country}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                {touched.country && errors.country && (
                  <p className="mt-1 px-2 text-sm text-red-500">
                    {errors.country}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-muted-foreground text-base font-medium"
                >
                  {pocPage.form.fields.message.required && (
                    <span className="text-red-500">*</span>
                  )}{" "}
                  {pocPage.form.fields.message.label}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={() => handleBlur("message")}
                  disabled={isSubmitting}
                  className={`border-brand-three focus-visible:border-brand-three mt-2 min-h-50 rounded-md border bg-transparent px-6 py-2 text-xl! focus-visible:ring-0 ${
                    touched.message && errors.message
                      ? "border-red-500 focus-visible:border-red-500"
                      : ""
                  }`}
                />
                <div className="flex items-center justify-between px-2">
                  <div>
                    {touched.message && errors.message && (
                      <p className="text-sm text-red-500">{errors.message}</p>
                    )}
                  </div>
                  <p
                    className={`text-sm ${
                      messageWordCount > 1000
                        ? "font-medium text-red-500"
                        : "text-muted-foreground"
                    }`}
                  >
                    {messageWordCount}/1000{" "}
                    {pocPage.form.fields.message.wordLimit}
                  </p>
                </div>
              </div>

              <div className="flex justify-center pt-6">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="bg-brand-three hover:bg-brand-three/90 px-16 py-6 text-lg font-medium text-white disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      {pocPage.form.submit.submitting}
                    </>
                  ) : (
                    pocPage.form.submit.button
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PocWaitlist;
