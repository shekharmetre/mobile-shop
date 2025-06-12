"use client";
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import QueryProvider from "@/hooks/providers/query-provider";
import Popup from '@/hooks/popup';
import { ModalProvider } from '@/hooks/universal-popup';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>

      <Popup />
      <ThemeProvider attribute="class" defaultTheme="light">
        <ModalProvider>
          {children}
        </ModalProvider>
        <Toaster position='bottom-right' />
      </ThemeProvider>

    </QueryProvider>
  );
}