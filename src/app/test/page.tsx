'use client';

import TypingBox from '@/components/TypingBox';
import { saveTypingResult } from '@/server/typing/saveTypingResult';

export default function TypingPage() {
  const targetText = 'The quick brown fox jumps over the lazy dog.'; // replace later dynamically
  const userId = 'some-fake-id'; // Placeholder, will fix with real auth later

  async function handleTypingComplete(stats: any) {
    try {
      await saveTypingResult(stats, userId);
      console.log('Typing result saved successfully!');
    } catch (error) {
      console.error('Failed to save typing result:', error);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <TypingBox targetText={targetText} onComplete={handleTypingComplete} />
    </div>
  );
}

