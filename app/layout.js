
import { ThemeProvider } from '@/components/theme-provider'

import './globals.css'


export const metadata = {
  title: 'יוסי תקשורת',
  description: 'ספק תקשורת נטפרי',
}

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning className="font-[SimplerPro]">
      <body className={`antialiased `}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
