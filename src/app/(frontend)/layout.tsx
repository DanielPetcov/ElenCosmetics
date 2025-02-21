import React from 'react'
import './globals.css'
import { poppins } from './ui/fonts'
import Subheader from './components/Subheader'
import Footer from './components/Footer'

export const metadata = {
  description: 'ElenCosmetics',
  title: 'ElenCosmetics',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="ro">
      <body className={`${poppins.className} antialiased bg-gray-50 text-gray-50`}>
        <div className='min-h-screen w-full flex flex-col justify-between'>
          <div>
            <Subheader>Livrare  în raza orasului Cimislia gratuit de la 500 lei</Subheader>
            <main>{children}</main>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  )
}
