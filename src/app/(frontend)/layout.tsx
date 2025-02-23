import React from 'react'
import './globals.css'
import './style.css'
import { poppins } from './ui/fonts'
import Subheader from './components/Subheader'
import Footer from './components/Footer'
import Header from './components/Header/Header'

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
          <div className='flex-1 flex flex-col'>
            <Subheader>Livrare  în raza orasului Cimislia gratuit de la 500 lei</Subheader>
            <Header />
            <main className='flex-1 flex flex-col'>{children}</main>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  )
}
