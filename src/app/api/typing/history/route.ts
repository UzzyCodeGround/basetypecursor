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
            .order('started_at', { ascending: false })

        if (error) {
            console.error('Supabase error fetching typing history:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        console.log('✅ Typing history fetched:', { user_id: DEV_USER_ID, session_count: data?.length ?? 0 })
        return NextResponse.json({ sessions: data || [] })
    } catch (err) {
        console.error('Unexpected error fetching typing history:', err)
        return NextResponse.json({ error: 'Failed to fetch typing history' }, { status: 500 })
    }
} 