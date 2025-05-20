'use client';

import { useSession } from '@/components/SessionWrapper';
import { TypingBox } from '../../components/TypingBox';
import { getRandomSentence } from '@/modules/typingTest/utils/sentenceBank';
import { DEV_USER_ID } from '@/lib/constants';
import { useRouter } from 'next/navigation'; // to the results page  
import { useEffect, useState } from 'react';
import type { TypingStats } from '@/modules/typingTest/utils/engine';

export default function PlaygroundPage() {
  const { session } = useSession();
  const userId = DEV_USER_ID;
  const [sentence, setSentence] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setSentence(getRandomSentence());
  }, []);

  if (!sentence) return null; // or a loading spinner

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-6">Typing Playground</h1>
      <TypingBox
        targetText={sentence}
        onComplete={async (stats: TypingStats) => {
          console.log('🔔 onComplete fired with stats', stats);

          // Persist latest stats in localStorage so /results can fall back to them
          try {
            localStorage.setItem('latest_stats', JSON.stringify(stats));
          } catch { }

          // Navigate immediately to results page for a smooth UX
          router.push('/results');

          // Attempt to save in the background (failure shouldn't block navigation)
          try {
            const res = await fetch('/api/typing/save', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                user_id: userId,
                type: 'ai_drill',
                wpm: Math.round(stats.wpm),
                accuracy: Math.round(stats.accuracy),
                error_map: stats.mistakes,
                duration_seconds: Math.round(stats.totalTime),
                started_at: new Date().toISOString(),
              })
            });
            if (res.ok) {
              const data = await res.json();
              console.log('Session saved with id:', data.id);
            } else {
              const err = await res.json().catch(() => ({}));
              console.error('Failed to save typing session', err);
            }
          } catch (err) {
            console.error('Error during save request:', err);
          }
        }}
      />
    </main>
  );
}
// 4. Current User Flow
// User lands on /playground.
// Sees a random sentence and types it in the TypingBox.
// When finished, the onComplete callback is
//  triggered (currently throws an error).
// User can click "Try Again" to reset and type the same sentence again.
// 5. What's Missing / Next Steps
// The onComplete function should be implemented to 
// handle the stats (e.g., display a summary, save results,
//    or move to another sentence).
// If you want to enhance the playground, you could:
// Show a summary modal or message on completion.
// Save results to a database.
// Allow the user to try a new random sentence.
// Ready to move to the next file or page?
// Let me know if you want to:
// Dive into how useTypingTest works,
// Implement the onComplete logic,
// Or move to another part of the user journey!