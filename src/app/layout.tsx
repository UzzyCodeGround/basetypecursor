import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BaseType - AI-Powered Typing Coach',
  description: 'Learn to type faster with personalized feedback and adaptive drills',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
} 