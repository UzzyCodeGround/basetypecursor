import { supabase } from '@/lib/supabaseServer';
import type { TypingSession } from '@/types/db';

const HARDCODED_USER_ID = '91f8a389-1256-4b3b-8430-1177e4cfcd56';

/**
 * Fetch the most recent typing session for the hardcoded user.
 * Only includes sessions where wpm and accuracy are not null.
 * Returns TypingSession or null if none found.
 */
export async function getLatestSession(): Promise<TypingSession | null> {
  const { data, error } = await supabase
    .from('typing_session')
    .select('*')
    .eq('user_id', HARDCODED_USER_ID)
    .not('wpm', 'is', null)
    .not('accuracy', 'is', null)
    .order('started_at', { ascending: false })
    .limit(1);

  if (error) {
    console.error('Error fetching latest session:', error.message);
    return null;
  }
  if (!data || data.length === 0) {
    return null;
  }
  return data[0] as TypingSession;
} 