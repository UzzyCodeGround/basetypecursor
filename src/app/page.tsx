// src/app/page.tsx
'use client'

import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-2xl font-semibold mb-4">Welcome to BaseType</h1>
      <p className="text-gray-600 mb-6">
        Your AI typing coach is ready to help you type faster and more accurately.
      </p>
      <button
        onClick={() => router.push('/login')}
        className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800"
      >
        Get Started
      </button>
    </main>
  )
}