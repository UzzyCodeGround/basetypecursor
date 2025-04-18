import { useState, useEffect, useCallback } from 'react';
import { TypingTestEngine, TypingStats } from './engine';

export function useTypingTest(targetText: string) {
  const [input, setInput] = useState('');
  const [stats, setStats] = useState<TypingStats | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [engine] = useState(() => new TypingTestEngine(targetText));

  const handleInput = useCallback((value: string) => {
    setInput(value);
    const complete = engine.processInput(value);
    setStats(engine.getStats());
    setIsComplete(complete);
  }, [engine]);

  const reset = useCallback(() => {
    setInput('');
    setStats(null);
    setIsComplete(false);
    engine.start();
  }, [engine]);

  useEffect(() => {
    reset();
  }, [targetText, reset]);

  return {
    input,
    stats,
    isComplete,
    handleInput,
    reset,
  };
} 