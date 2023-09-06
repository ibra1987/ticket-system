import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Header from './components/shared/Header'

const poppins = Poppins({ weight:["400"],subsets:["latin"] })



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className='w-full h-full flex flex-col justify-start items-center bg-gray-50'>
          <Header/>
        {children}
        </div>
        </body>
    </html>
  )
}
