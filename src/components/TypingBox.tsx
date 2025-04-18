import React, { useRef, useEffect } from 'react';
import { useTypingTest } from '@/modules/typingTest/useTypingTest';

interface TypingBoxProps {
  targetText: string;
  onComplete?: (stats: any) => void;
}

export function TypingBox({ targetText, onComplete }: TypingBoxProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { input, stats, isComplete, handleInput, reset } = useTypingTest(targetText);

  useEffect(() => {
    if (isComplete && stats && onComplete) {
      onComplete(stats);
    }
  }, [isComplete, stats, onComplete]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-4">
      <div className="text-xl font-mono bg-gray-100 p-4 rounded-lg whitespace-pre-wrap">
        {targetText}
      </div>
      
      <textarea
        ref={inputRef}
        value={input}
        onChange={(e) => handleInput(e.target.value)}
        className="w-full h-32 p-4 text-xl font-mono border-2 rounded-lg focus:outline-none focus:border-primary"
        placeholder="Start typing here..."
      />

      {stats && (
        <div className="flex justify-between text-lg">
          <div>WPM: {stats.wpm}</div>
          <div>Accuracy: {stats.accuracy}%</div>
          <div>Time: {Math.round(stats.totalTime)}s</div>
        </div>
      )}

      {isComplete && (
        <button
          onClick={reset}
          className="w-full py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          Try Again
        </button>
      )}
    </div>
  );
} 