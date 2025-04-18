'use client';

import { TypingBox } from '@/components/TypingBox';

const SAMPLE_TEXT = `The quick brown fox jumps over the lazy dog. This classic pangram contains every letter of the English alphabet at least once.`;

export default function TestPage() {
  const handleComplete = (stats: any) => {
    console.log('Test completed:', stats);
  };

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        BaseType Typing Test
      </h1>
      <TypingBox targetText={SAMPLE_TEXT} onComplete={handleComplete} />
    </main>
  );
} 