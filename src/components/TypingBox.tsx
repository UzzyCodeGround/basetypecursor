'use client';

import { useState, useEffect } from 'react';
import { useTypingTest } from '@/modules/typingTest/useTypingTest';

type TypingBoxProps = {
  targetText: string;
  onComplete: (stats: any) => void;
};

export default function TypingBox({ targetText, onComplete }: TypingBoxProps) {
  const { input, stats, isComplete, handleInput, reset } = useTypingTest(targetText);
  const [focused, setFocused] = useState(false);

  // ✨ NEW: Call onComplete when test is complete
  useEffect(() => {
    if (isComplete && stats) {
      onComplete(stats);
    }
  }, [isComplete, stats, onComplete]);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="text-gray-700 text-xl font-medium">
        {targetText}
      </div>

      <textarea
        value={input}
        onChange={(e) => handleInput(e.target.value)}
        onFocus={() => setFocused(true)}
        placeholder="Start typing here..."
        rows={4}
        className="w-full border rounded-md p-4 font-mono text-lg tracking-wide focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isComplete}
      />

      {stats && (
        <div className="space-y-1 text-gray-600">
          <p><strong>WPM:</strong> {stats.wpm}</p>
          <p><strong>Accuracy:</strong> {stats.accuracy}%</p>
          <p><strong>Mistakes:</strong> {Object.keys(stats.mistakes).length}</p>
        </div>
      )}

      {isComplete && (
        <button
          onClick={reset}
          className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

// Section
// What it does
// targetText
// Passed in from parent (e.g. a sentence from sentenceBank)
// useTypingTest(targetText)
// Initializes the hook
// textarea
// Captures user input
// handleInput()
// Updates input + runs engine logic
// stats
// Live typing stats â€” shown once available
// isComplete
// Locks the textarea + shows retry button
// reset()
// Resets everything for a new round
