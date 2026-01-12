"use client";

import React from "react";

export const PageLoader: React.FC = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-32 w-32 animate-spin rounded-full border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
};
