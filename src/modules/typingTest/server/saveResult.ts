import { supabase } from '@/lib/supabase';

export interface TypingStats {
  wpm: number;
  accuracy: number;
  mistakes: { [key: string]: number };
  totalTime: number;
  totalCharacters: number;
  correctCharacters: number;
}

export async function saveTypingResult(result: TypingStats & { user_id?: string | null; sentence: string }) {
  const { error } = await supabase.from('typing_results').insert([result]);
  if (error) {
    console.error('Error saving typing result:', error.message);
  } else {
    console.log('✅ Typing result saved to Supabase');
  }
}