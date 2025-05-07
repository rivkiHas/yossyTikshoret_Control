
import { ThemeProvider } from '@/components/theme-provider'
import { Heebo } from 'next/font/google'
import './globals.css'

const heebo = Heebo({
  variable: '--font-heebo-sans',
  subsets: ['hebrew'],
})

export const metadata = {
  title: 'יוסי תקשורת',
  description: 'ספק תקשורת נטפרי',
}

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <body className={`${heebo.variable} antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
      </body>
    </html>
  )
}
