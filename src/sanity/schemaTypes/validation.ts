import type { Slug, ValidationContext } from "sanity";

async function isUnique(
  value: string | undefined,
  context: ValidationContext,
  documentType: string,
  fieldPath: string,
) {
  if (!value) return true;
  const document = context.document;
  const language =
    typeof document?.language === "string" ? document.language : null;
  if (!language)
    return "Language must be assigned before this field can be validated";
  const id = document?._id?.replace(/^drafts\./, "") ?? "";
  const count = await context
    .getClient({ apiVersion: "2026-08-15" })
    .fetch<number>(
      `count(*[_type == $type && language == $language && ${fieldPath} == $value && !(_id in [$id, $draftId])])`,
      { type: documentType, language, value, id, draftId: `drafts.${id}` },
    );
  return count === 0
    ? true
    : "This route value is already used in this language";
}

export const uniqueStringWithinLanguage =
  (documentType: string, fieldPath: string) =>
  (value: string | undefined, context: ValidationContext) =>
    isUnique(value, context, documentType, fieldPath);

export const uniqueSlugWithinLanguage =
  (documentType: string) =>
  (value: Slug | undefined, context: ValidationContext) =>
    isUnique(value?.current, context, documentType, "slug.current");
