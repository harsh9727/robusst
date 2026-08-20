import { blogPost, jobPosting, successStory } from "./documents/collections";
import { formSubmission } from "./documents/formSubmission";
import { languageOption, languageSettings } from "./documents/languageSettings";
import { fixedPageSection, localizedPageTypes } from "./documents/pages";
import { siteSettings } from "./documents/siteSettings";
import {
  callToAction,
  contentCard,
  contentFile,
  contentGroup,
  contentImage,
  contentLink,
  externalVideo,
  faqItem,
  logoItem,
  statistic,
} from "./objects/editorial";
import {
  fixedSection,
  formCopy,
  seo,
  translationWorkflow,
} from "./objects/page";
import { selectOption } from "./objects/form";
import { portableText } from "./objects/portableText";

export const schemaTypes = [
  contentImage,
  contentFile,
  contentGroup,
  selectOption,
  contentLink,
  callToAction,
  externalVideo,
  statistic,
  faqItem,
  contentCard,
  logoItem,
  portableText,
  seo,
  translationWorkflow,
  fixedSection,
  formCopy,
  languageOption,
  languageSettings,
  siteSettings,
  fixedPageSection,
  ...localizedPageTypes,
  blogPost,
  jobPosting,
  successStory,
  formSubmission,
];
