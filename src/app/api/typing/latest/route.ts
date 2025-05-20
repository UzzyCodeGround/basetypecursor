import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseServer'
import type { TypingSession } from '@/types/db'
import { DEV_USER_ID } from '@/lib/constants'

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('typing_session')
            .select('*')
            .eq('user_id', DEV_USER_ID)
            .not('wpm', 'is', null)
            .not('accuracy', 'is', null)
            .order('started_at', { ascending: false })
            .limit(1)

        if (error) {
            console.error('Supabase error fetching latest session:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        if (!data || data.length === 0) {
            console.log('No typing sessions found for user:', DEV_USER_ID)
            return NextResponse.json({ session: null })
        }

        console.log('✅ Latest typing session fetched:', { user_id: DEV_USER_ID, session_id: data[0].id })
        return NextResponse.json({ session: data[0] })
    } catch (err) {
        console.error('Unexpected error fetching latest session:', err)
        return NextResponse.json({ error: 'Failed to fetch latest session' }, { status: 500 })
    }
} 