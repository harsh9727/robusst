"use client";

import { createContext, useContext } from "react";

export type CmsUiCopy = {
  closeDialogLabel: string;
  calendlyLoadingLabel: string;
  previousSlideLabel: string;
  nextSlideLabel: string;
};

const CmsUiContext = createContext<CmsUiCopy | null>(null);

export function CmsUiProvider({
  copy,
  children,
}: {
  copy: CmsUiCopy;
  children: React.ReactNode;
}) {
  return <CmsUiContext.Provider value={copy}>{children}</CmsUiContext.Provider>;
}

export function useCmsUiCopy() {
  const copy = useContext(CmsUiContext);
  if (!copy) {
    throw new Error("CMS UI copy is unavailable outside CmsUiProvider");
  }
  return copy;
}
