import { supabase } from '@/lib/supabaseServer';
import type { TypingSession } from '@/types/db';

/**
 * Fetch all typing sessions for the currently signed-in user.
 * Only returns sessions where wpm and accuracy are not null.
 * Ordered by started_at DESC.
 *
 * @param userId - The Supabase user ID
 * @returns Array of TypingSession records
 */
export async function getUserTypingSessions(userId: string): Promise<TypingSession[]> {
  const { data, error } = await supabase
    .from('typing_session')
    .select('*')
    .eq('user_id', userId)
    .not('wpm', 'is', null)
    .not('accuracy', 'is', null)
    .order('started_at', { ascending: false });

  if (error) {
    console.error('Error fetching typing sessions:', error.message);
    return [];
  }
  return (data as TypingSession[]) || [];
} 