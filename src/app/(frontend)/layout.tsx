import React from 'react'
import './globals.css'
import './style.css'
import { poppins } from './ui/fonts'

export const metadata = {
  description: 'ElenCosmetics',
  title: 'ElenCosmetics',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="ro">
      <body className={`${poppins.className} antialiased bg-gray-100 text-gray-50`}>
        <main className='flex-1 flex flex-col'>{children}</main>
      </body>
    </html>
  )
}
