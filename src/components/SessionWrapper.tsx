// src/components/SessionWrapper.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabaseClient'

type SessionContextType = {
  // undefined ⇒ still loading, null ⇒ no session, Session ⇒ authenticated user
  session: Session | null | undefined
  user: User | null
}

const SessionContext = createContext<SessionContextType>({
  session: undefined,
  user: null,
})

export function SessionWrapper({ children }: { children: React.ReactNode }) {
  // session === undefined ⇒ still loading
  const [session, setSession] = useState<Session | null | undefined>(undefined)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      // once Supabase responds we either get a real session or null
      setSession(session ?? null)
      setUser(session?.user ?? null)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <SessionContext.Provider value={{ session, user }}>
      {children}
    </SessionContext.Provider>
  )
}

export const useSession = () => {
  const context = useContext(SessionContext)
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionWrapper')
  }
  return context
}