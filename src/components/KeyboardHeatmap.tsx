import React from 'react';

interface TypedHistoryEntry {
  key: string;
  correct: boolean;
}

interface KeyboardHeatmapProps {
  typedHistory: TypedHistoryEntry[];
}

// QWERTY keyboard rows
const KEYBOARD_ROWS = [
  ['q','w','e','r','t','y','u','i','o','p'],
  ['a','s','d','f','g','h','j','k','l'],
  ['z','x','c','v','b','n','m']
];

function getKeyStats(typedHistory: TypedHistoryEntry[]) {
  const stats: Record<string, { correct: number; incorrect: number }> = {};
  for (const { key, correct } of typedHistory) {
    const k = key.toLowerCase();
    if (!stats[k]) stats[k] = { correct: 0, incorrect: 0 };
    if (correct) stats[k].correct++;
    else stats[k].incorrect++;
  }
  return stats;
}

function getKeyColor(stats: { correct: number; incorrect: number } | undefined) {
  if (!stats) return '#eee'; // Not used
  const total = stats.correct + stats.incorrect;
  if (total === 0) return '#eee';
  if (stats.incorrect > 0) {
    // Red, more opacity for more mistakes
    const opacity = Math.min(0.2 + stats.incorrect / (total * 2), 1);
    return `rgba(220, 38, 38, ${opacity})`; // Tailwind red-600
  }
  // Green, more opacity for more correct
  const opacity = Math.min(0.2 + stats.correct / 10, 1);
  return `rgba(34, 197, 94, ${opacity})`; // Tailwind green-500
}

export const KeyboardHeatmap: React.FC<KeyboardHeatmapProps> = ({ typedHistory }) => {
  const keyStats = React.useMemo(() => getKeyStats(typedHistory), [typedHistory]);

  return (
    <div className="keyboard-heatmap" style={{ display: 'inline-block', padding: 16, background: '#fafbfc', borderRadius: 12 }}>
      {KEYBOARD_ROWS.map((row, rowIdx) => (
        <div key={rowIdx} style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}>
          {row.map((key) => {
            const stats = keyStats[key];
            const color = getKeyColor(stats);
            return (
              <div
                key={key}
                style={{
                  width: 36,
                  height: 36,
                  margin: 3,
                  background: color,
                  borderRadius: 6,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontFamily: 'monospace',
                  fontSize: 18,
                  border: '1px solid #ccc',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
                }}
                title={`Key: ${key}\nCorrect: ${stats?.correct || 0}\nIncorrect: ${stats?.incorrect || 0}`}
              >
                {key.toUpperCase()}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

// Example usage with mock data (for testing):
// <KeyboardHeatmap typedHistory={[
//   { key: 'a', correct: true },
//   { key: 'a', correct: false },
//   { key: 's', correct: true },
//   { key: 'd', correct: false },
//   { key: 'd', correct: false },
// ]} /> 