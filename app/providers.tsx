"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import QueryProvider from "@/hooks/providers/query-provider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider attribute="class" defaultTheme="light">
        {children}
        <Toaster />
      </ThemeProvider>
    </QueryProvider>
  );
}