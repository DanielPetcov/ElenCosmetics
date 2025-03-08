import React from 'react'
import './globals.css'
import './style.css'
import { poppins } from './ui/fonts'
import { Toaster } from "@/components/ui/sonner"

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export const metadata = {
  description: 'ElenCosmetics',
  title: 'ElenCosmetics',
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {

  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${poppins.className} antialiased bg-gray-100 text-gray-50`}>
        <NextIntlClientProvider messages={messages} >
          <main className='flex-1 flex flex-col'>{children}</main>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
