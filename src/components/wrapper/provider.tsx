"use client";

// tRPC
import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "sonner";


export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <TRPCReactProvider>
      
      <Toaster richColors />
      {children}
    </TRPCReactProvider>
  );
};
