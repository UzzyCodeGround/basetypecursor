'use server';

import { supabase } from '@/lib/supabase';  // make sure you have this client set up
import { TypingStats } from '@/modules/typingTest/engine'; // Assuming you export TypingStats interface from your engine

export async function saveTypingResult(stats: TypingStats, userId: string) {
  const { data, error } = await supabase.from('typing_results').insert([  //typing_results is the table name in the database in supabase
    {
      user_id: userId,
      wpm: stats.wpm,
      accuracy: stats.accuracy,
      mistakes: JSON.stringify(stats.mistakes), // Supabase stores JSON fields as strings if needed
      total_time: stats.totalTime, 
      total_characters: stats.totalCharacters,
      correct_characters: stats.correctCharacters,
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}