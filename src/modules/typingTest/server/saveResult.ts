import { supabase } from '@/lib/supabaseServer';
import type { TypingSession } from '@/types/db';

export async function saveTypingSession(result: Omit<TypingSession, 'id' | 'started_at' | 'completed_at'> & { started_at: string; completed_at?: string }) {
  const { error } = await supabase.from('typing_session').insert([result]);
  if (error) {
    console.error('Error saving typing session:', error.message);
  } else {
    console.log('✅ Typing session saved to Supabase');
  }
}