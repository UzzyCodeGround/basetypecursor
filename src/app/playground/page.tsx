'use client';

import TypingBox from '@/components/TypingBox';
import { getRandomSentence } from '@/modules/typingTest/sentenceBank';

export default function PlaygroundPage() {
  const sentence = getRandomSentence();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-6">Typing Playground</h1>
      <TypingBox targetText={sentence} />
    </main>
  );
}
