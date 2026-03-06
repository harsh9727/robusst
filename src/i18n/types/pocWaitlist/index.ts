// Type definitions for POC Waitlist page translations

export interface BannerSection {
  heading: string;
  subtitle: string;
  ctaText: string;
  image: string;
  imageAlt: string;
}

export interface FormField {
  label: string;
  required: boolean;
  placeholder?: string;
  wordLimit?: string;
}

export interface FormFields {
  name: FormField;
  companyName: FormField;
  email: FormField;
  phone: FormField;
  country: FormField & { placeholder: string };
  message: FormField & { wordLimit: string };
}

export interface ValidationMessages {
  nameRequired: string;
  nameMinLength: string;
  emailRequired: string;
  emailInvalid: string;
  phoneRequired: string;
  phoneInvalid: string;
  countryRequired: string;
  messageRequired: string;
  messageMinWords: string;
  messageMaxWords: string;
}

export interface SubmitSection {
  button: string;
  submitting: string;
}

export interface MessageSection {
  title: string;
  message: string;
}

export interface FormSection {
  heading: string;
  fields: FormFields;
  validation: ValidationMessages;
  submit: SubmitSection;
  success: MessageSection;
  error: MessageSection;
}

export interface PocWaitlistPageTranslations {
  banner: BannerSection;
  form: FormSection;
}
