import { Inter } from 'next/font/google'
import {ThemeProvider} from "../components/theme-provider"
import { Toaster } from "../components/ui/toaster"

import "../styles/css/all.css"
import "../styles/custom.css"
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "timelineβίος",
  description: "A powerful online Digital Audio Workstation",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider >
        <Toaster />
      </body>
    </html>
  )
}
