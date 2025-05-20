//Users/uzayrsonday/Documents/Projects/basetypecursor/src/app/api/onboarding/submit/route.ts
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseServer'
import type { OnboardingOption } from '@/modules/onboarding/utils/questions'

export async function POST(request: Request) {
  try {
    const { userId, answers } = (await request.json()) as {
      userId: string
      answers: (OnboardingOption | null)[]
    }

    if (!userId || !Array.isArray(answers)) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    const payload = {
      user_id: userId,
      goal: answers[0]?.text || '',
      typing_level: answers[1]?.text || '',
      frustration: answers[2]?.text || '',
      progress_metric: answers[3]?.text || '',
      coach_style: answers[4]?.text || '',
    }

    const { error } = await supabase.from('onboarding_response').insert([payload])

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Unexpected server error' }, { status: 500 })
  }
}
