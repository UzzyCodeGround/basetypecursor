// src/app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { SessionWrapper } from '@/components/sessionwrapper'

export const metadata: Metadata = {
  title: 'BaseType - AI-Powered Typing Coach',
  description: 'Learn to type faster with personalized feedback and adaptive drills',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <SessionWrapper>
          {children}
        </SessionWrapper>
      </body>
    </html>
  )
}
