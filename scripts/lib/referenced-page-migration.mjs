export function splitReferencedPageDocuments(
  documents,
  { pageType, sectionKeys, pageTitle },
) {
  const pageDocuments = [];
  const sectionDocuments = [];
  const otherDocuments = [];
  for (const document of documents) {
    if (document._type !== pageType) {
      otherDocuments.push(document);
      continue;
    }
    const pageDocument = structuredClone(document);
    for (const sectionKey of sectionKeys) {
      const content = pageDocument[sectionKey];
      if (!content)
        throw new Error(`${pageDocument._id} is missing ${sectionKey}`);
      const sectionId = `fixedPageSection-${pageType}-${pageDocument.language}-${sectionKey}`;
      sectionDocuments.push({
        _id: sectionId,
        _type: "fixedPageSection",
        internalTitle: `${pageTitle} ${sectionKey} — ${pageDocument.language.toUpperCase()}`,
        pageType,
        sectionKey,
        language: pageDocument.language,
        content,
      });
      pageDocument[sectionKey] = { _type: "reference", _ref: sectionId };
    }
    pageDocuments.push(pageDocument);
  }
  return { pageDocuments, sectionDocuments, otherDocuments };
}

export async function commitReferencedPageDocuments(client, splitDocuments) {
  const { pageDocuments, sectionDocuments, otherDocuments } = splitDocuments;
  for (const document of sectionDocuments)
    await client.createOrReplace(document, { visibility: "sync" });
  let transaction = client.transaction();
  for (const document of [...pageDocuments, ...otherDocuments])
    transaction = transaction.createOrReplace(document);
  const result = await transaction.commit({ visibility: "sync" });
  return {
    documentIds: [
      ...sectionDocuments.map((document) => document._id),
      ...result.documentIds,
    ],
  };
}
