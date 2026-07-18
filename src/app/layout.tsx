import type { Metadata } from 'next';
import React from 'react';
import dynamic from 'next/dynamic';

import StoreProvider from '@/app/StoreProvider';
import { Toaster } from 'react-hot-toast';
import { Inter, DM_Sans, Zen_Dots } from 'next/font/google';
import '@/styles/globals.css';
import { inter, dmSans, zenDots } from '@/styles/fonts';
import { LanguageProvider } from '@/context/LanguageContext';

export const metadata: Metadata = {
  title: 'Easybuy',
  description: 'marketplace',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${dmSans.variable} ${zenDots.variable}`}>
        <LanguageProvider>
          <StoreProvider>{children}</StoreProvider>
        </LanguageProvider>
        <Toaster />
      </body>
    </html>
  );
}
