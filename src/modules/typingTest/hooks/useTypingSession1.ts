import { useState, useCallback, useEffect, useRef } from 'react';
import { ChangeEvent } from 'react';
import { TypingTestEngine, TypingStats } from '../utils/engine';

export interface UseTypingSessionReturn {
  input: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isComplete: boolean;
  stats: TypingStats | null;
  typedHistory: { key: string; correct: boolean }[];
  reset: () => void;
}

export function useTypingSession1(targetText: string): UseTypingSessionReturn {
  const [input, setInput] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [stats, setStats] = useState<TypingStats | null>(null);
  const [typedHistory, setTypedHistory] = useState<{ key: string; correct: boolean }[]>([]);
  
  // Store engine in ref to persist between renders
  const engineRef = useRef<TypingTestEngine | null>(null);
  
  // Initialize engine
  useEffect(() => {
    engineRef.current = new TypingTestEngine(targetText);
    engineRef.current.start();
    
    // Cleanup
    return () => {
      engineRef.current = null;
    };
  }, [targetText]);

  // Reset function to start over
  const reset = useCallback(() => {
    if (!engineRef.current) return;
    
    setInput('');
    setIsComplete(false);
    setStats(null);
    setTypedHistory([]);
    engineRef.current.start();
  }, []);

  // Handle input changes
  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!engineRef.current) return;
    
    const newInput = e.target.value;
    setInput(newInput);
    
    // Process input through engine
    const completed = engineRef.current.processInput(newInput);
    
    // Update completion state
    if (completed) {
      setIsComplete(true);
      setStats(engineRef.current.getStats());
    }
    
    // Update typed history
    setTypedHistory(engineRef.current.getTypedHistory());
  }, []);

  return {
    input,
    handleInputChange,
    isComplete,
    stats,
    typedHistory,
    reset
  };
} 