"use client";
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import QueryProvider from "@/hooks/providers/query-provider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider attribute="class" defaultTheme="light">
        {children}
      <Toaster position='bottom-right' />
      </ThemeProvider>
    </QueryProvider>
  );
}