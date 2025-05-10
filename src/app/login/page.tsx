//for login page
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useSearchParams } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    let mounted = true

    // Handle the auth callback
    const handleAuthCallback = async () => {
      const code = searchParams.get('code')
      if (code) {
        try {
          // Exchange the code for a session
          const { error: signInError } = await supabase.auth.exchangeCodeForSession(code)
          if (signInError) {
            console.error('Sign in error:', signInError)
            setError(signInError.message)
            return
          }

          // Get the current user
          const { data: { user }, error: userError } = await supabase.auth.getUser()
          if (userError) {
            console.error('Get user error:', userError)
            setError(userError.message)
            return
          }

          if (user && mounted) {
            // Check if user exists in the database
            const { data: existingUser, error: dbError } = await supabase
              .from('users')
              .select('id')
              .eq('id', user.id)
              .single()

            if (dbError && dbError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
              console.error('Database error:', dbError)
              setError('Error checking user status')
              return
            }

            // If user doesn't exist, create them
            if (!existingUser) {
              const { error: insertError } = await supabase
                .from('users')
                .insert([
                  {
                    id: user.id,
                    email: user.email,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                  },
                ])

              if (insertError) {
                console.error('Create user error:', insertError)
                setError('Error creating user account')
                return
              }
            }

            // Use router for navigation
            router.push('/onboarding')
          }
        } catch (err) {
          console.error('Auth callback error:', err)
          setError('Failed to authenticate')
        }
      }
    }

    handleAuthCallback()

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session && mounted) {
        router.push('/onboarding')
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session && mounted) {
        router.push('/onboarding')
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [router, searchParams])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSent(false)
    
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          // Remove the emailRedirectTo option since we're using the Supabase dashboard configuration
        },
      })

      if (error) {
        console.error('Sign in error:', error)
        setError(error.message)
      } else {
        setSent(true)
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Failed to send magic link')
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Send Magic Link
            </button>
          </div>

          {sent && (
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    Check your inbox for the magic link
                  </p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

// Summary
// The page is robust for a basic flow.
// Consider adding email format validation, improved error messages, 
// and manual redirect handling for a more polished and robust experience.
// Backend protections (rate limiting, CAPTCHA) are also important but outside this component.
// Would you like to see a full code example with these improvements, or move on to the next page?