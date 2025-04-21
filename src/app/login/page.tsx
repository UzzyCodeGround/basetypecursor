//for login page
'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setError('')

    const result = await signIn('email', {
      email,
      callbackUrl: '/onboarding',
      redirect: false,
    })

    if (result?.error) {
      setError('Something went wrong. Please try again.')
      setSubmitted(false)
    } else {
      // Give time for redirect or feedback
      setTimeout(() => {
        setSubmitted(false)
      }, 1000)
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-xl font-semibold mb-6">Sign in to BaseType</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button
          type="submit"
          disabled={submitted}
          className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 disabled:opacity-50"
        >
          {submitted ? 'Sending Magic Link...' : 'Send Magic Link'}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </main>
  )
}