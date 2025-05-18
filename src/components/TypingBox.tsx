import React, { useRef, useEffect } from 'react';
import { useTypingSession1 } from '@/modules/typingTest/hooks/useTypingSession1';
import styles from './TypingBox.module.css';

interface TypingBoxProps {
  targetText: string;
  onComplete: (stats: any) => Promise<void>;
}

export const TypingBox: React.FC<TypingBoxProps> = ({ targetText, onComplete }) => {
  const {
    input,
    handleInputChange,
    isComplete,
    stats,
    typedHistory,
    reset
  } = useTypingSession1(targetText);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Focus the hidden textarea on mount for ghost typing
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  // Call onComplete when test is finished
  React.useEffect(() => {
    if (isComplete && stats) {
      onComplete(stats);
    }
  }, [isComplete, stats, onComplete]);

  return (
    <div className={styles.typingBox}>
      <div className={styles.targetText} onClick={() => textareaRef.current?.focus()} tabIndex={0}>
        {targetText.split('').map((char, index) => {
          const isCurrentChar = index === input.length;
          const isTyped = index < input.length;
          const isCorrect = isTyped && input[index] === char;

          return (
            <span
              key={index}
              className={[
                isCurrentChar ? styles.current : '',
                isTyped ? (isCorrect ? styles.correct : styles.incorrect) : ''
              ].join(' ').trim()}
            >
              {char}
            </span>
          );
        })}
      </div>

      {/* Visually hidden textarea for ghost typing */}
      <textarea
        ref={textareaRef}
        value={input}
        onChange={handleInputChange}
        disabled={isComplete}
        placeholder="Start typing..."
        className={styles.ghostInput}
        aria-label="Typing input"
        autoFocus
      />

      {isComplete && stats && (
        <div className={styles.stats}>
          <p>WPM: {stats.wpm}</p>
          <p>Accuracy: {stats.accuracy}%</p>
          <button onClick={reset}>Try Again</button>
        </div>
      )}
    </div>
  );
}; 