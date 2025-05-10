'use client';

import { useSession } from '@/components/SessionWrapper';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type TypingResult = {
  wpm: number;
  accuracy: number;
  mistakes: Record<string, number>;
  totalTime: number;
  totalCharacters: number;
  correctCharacters: number;
  sentence: string;
  created_at: string;
};

export default function ResultsPage() {
  const { session } = useSession();
  const userId = session?.user?.email;
  const [result, setResult] = useState<TypingResult | null>(null);

  useEffect(() => {
    if (!userId) return;
    // Fetch the latest result for this user
    supabase
      .from('typing_results')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .then(({ data }) => {
        if (data && data.length > 0) setResult(data[0]);
      });
  }, [userId]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-white">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Your Typing Test Result</h1>
      {result ? (
        <div className="bg-gray-50 rounded-lg shadow p-8 w-full max-w-md text-center space-y-4">
          <div className="text-gray-700 text-lg mb-2">"{result.sentence}"</div>
          <div className="flex justify-around text-gray-800 text-xl font-mono mb-4">
            <div>
              <div className="text-sm text-gray-500">WPM</div>
              <div>{result.wpm}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Accuracy</div>
              <div>{result.accuracy}%</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Mistakes</div>
              <div>{Object.values(result.mistakes).reduce((a, b) => a + b, 0)}</div>
            </div>
          </div>
          <div className="text-sm text-gray-400">Completed at: {new Date(result.created_at).toLocaleString()}</div>
        </div>
      ) : (
        <div className="text-gray-400">No results found.</div>
      )}
    </main>
  );
}



