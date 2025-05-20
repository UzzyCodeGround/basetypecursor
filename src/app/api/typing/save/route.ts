import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseServer'
import type { TypingSession } from '@/types/db'

export async function POST(request: Request) {
    try {
        const result = await request.json() as Omit<TypingSession, 'id' | 'started_at' | 'completed_at'> & {
            started_at: string
            completed_at?: string
        }

        // Validate required fields
        if (!result.user_id ||
            typeof result.wpm !== 'number' ||
            typeof result.accuracy !== 'number' ||
            typeof result.duration_seconds !== 'number') {
            console.error('Invalid typing session data:', result)
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        // Ensure the user exists to satisfy FK constraint
        await supabase
            .from('users')
            .upsert(
                [
                    {
                        id: result.user_id,
                        email: 'dev@example.com',
                        // If your users table has timestamp columns mark them here, otherwise they will be ignored
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString(),
                    },
                ],
                { onConflict: 'id' }
            )

        // Ensure integer values for Supabase
        const payload = {
            ...result,
            wpm: Math.round(result.wpm),
            accuracy: Math.round(result.accuracy),
            duration_seconds: Math.round(result.duration_seconds),
            completed_at: result.completed_at ?? new Date().toISOString(),
            error_map: result.error_map ?? {},
        }

        const { data, error } = await supabase
            .from('typing_session')
            .insert([payload])
            .select('id')
            .single()

        if (error) {
            console.error('Supabase error saving typing session:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        if (!data) {
            return NextResponse.json({ ok: false })
        }

        console.log('✅ Typing session saved successfully:', { user_id: result.user_id, wpm: result.wpm })
        return NextResponse.json({ ok: true, id: data.id })
    } catch (err) {
        console.error('Unexpected error saving typing session:', err)
        return NextResponse.json({ error: 'Failed to save typing session' }, { status: 500 })
    }
} 