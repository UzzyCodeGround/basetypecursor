"use client";



import { KeyboardHeatmap } from '@/components/KeyboardHeatmap';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import type { TypingSession } from '@/types/db';
import { FaRobot, FaPlayCircle } from 'react-icons/fa';

// Mock typing session data
const mockSessions: TypingSession[] = [
  {
    id: '1',
    user_id: 'user1',
    type: 'initial_test',
    text_id: 't1',
    wpm: 45,
    accuracy: 92,
    error_map: { e: 3, r: 2 },
    duration_seconds: 60,
    started_at: '2024-06-01T10:00:00Z',
    completed_at: '2024-06-01T10:01:00Z',
  },
  {
    id: '2',
    user_id: 'user1',
    type: 'ai_drill',
    text_id: 't2',
    wpm: 50,
    accuracy: 95,
    error_map: { e: 1, t: 2 },
    duration_seconds: 75,
    started_at: '2024-06-02T11:00:00Z',
    completed_at: '2024-06-02T11:01:15Z',
  },
  {
    id: '3',
    user_id: 'user1',
    type: 'ai_drill',
    text_id: 't3',
    wpm: 52,
    accuracy: 96,
    error_map: { r: 1, s: 1 },
    duration_seconds: 80,
    started_at: '2024-06-03T12:00:00Z',
    completed_at: '2024-06-03T12:01:20Z',
  },
  {
    id: '4',
    user_id: 'user1',
    type: 'ai_drill',
    text_id: 't4',
    wpm: 54,
    accuracy: 97,
    error_map: { e: 1 },
    duration_seconds: 90,
    started_at: '2024-06-04T13:00:00Z',
    completed_at: '2024-06-04T13:01:30Z',
  },
];

// Summary calculations
const avgWPM = Math.round(mockSessions.reduce((sum, s) => sum + (s.wpm || 0), 0) / mockSessions.length);
const avgAccuracy = Math.round(mockSessions.reduce((sum, s) => sum + (s.accuracy || 0), 0) / mockSessions.length);
const totalTime = Math.round(mockSessions.reduce((sum, s) => sum + (s.duration_seconds || 0), 0) / 60); // minutes
const sessionCount = mockSessions.length;

// Cumulative error map
const cumulativeErrorMap: { [key: string]: number } = {};
mockSessions.forEach((s) => {
  if (s.error_map) {
    Object.entries(s.error_map).forEach(([k, v]) => {
      cumulativeErrorMap[k] = (cumulativeErrorMap[k] || 0) + v;
    });
  }
});
const cumulativeTypedHistory = Object.entries(cumulativeErrorMap).flatMap(([key, count]) =>
  Array(count).fill({ key, correct: false })
);

// Progress graph data
const progressData = mockSessions.map((s) => ({
  started_at: new Date(s.started_at).toLocaleDateString(),
  wpm: s.wpm,
  accuracy: s.accuracy,
}));

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-white p-4 md:p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-8 text-gray-900">Your Profile</h1>
      {/* Summary Section */}
      <section className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center shadow">
          <div className="text-xs text-gray-500 mb-1">Avg WPM</div>
          <div className="text-2xl font-semibold text-blue-600">{avgWPM}</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center shadow">
          <div className="text-xs text-gray-500 mb-1">Avg Accuracy</div>
          <div className="text-2xl font-semibold text-green-600">{avgAccuracy}%</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center shadow">
          <div className="text-xs text-gray-500 mb-1">Total Time</div>
          <div className="text-2xl font-semibold text-gray-800">{totalTime} min</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center shadow">
          <div className="text-xs text-gray-500 mb-1">Sessions</div>
          <div className="text-2xl font-semibold text-purple-600">{sessionCount}</div>
        </div>
      </section>
      {/* Main Grid: Heatmap + Progress Graph */}
      <section className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Cumulative Heatmap */}
        <div className="flex flex-col items-center">
          <div className="text-xs text-gray-500 mb-2">Cumulative Heatmap</div>
          <KeyboardHeatmap typedHistory={cumulativeTypedHistory} />
        </div>
        {/* Progress Graph */}
        <div className="flex flex-col items-center">
          <div className="text-xs text-gray-500 mb-2">Progress Over Time</div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={progressData} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="started_at" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" domain={[40, 60]} tick={{ fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" domain={[90, 100]} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="wpm" stroke="#2563eb" strokeWidth={2} dot={{ r: 4 }} name="WPM" />
              <Line yAxisId="right" type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} name="Accuracy" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
      {/* Session History */}
      <section className="w-full max-w-4xl">
        <div className="text-xs text-gray-500 mb-2">Session History</div>
        <div className="bg-gray-50 rounded-lg shadow divide-y divide-gray-200 max-h-72 overflow-y-auto">
          {mockSessions.map((s) => (
            <div key={s.id} className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2">
                {s.type === 'initial_test' ? (
                  <FaRobot className="text-blue-400" title="Initial Test" />
                ) : (
                  <FaPlayCircle className="text-green-400" title="AI Drill" />
                )}
                <span className="text-sm text-gray-700">{new Date(s.started_at).toLocaleDateString()}</span>
              </div>
              <div className="flex gap-6">
                <span className="text-sm text-blue-600 font-mono">{s.wpm} WPM</span>
                <span className="text-sm text-green-600 font-mono">{s.accuracy}%</span>
                <span className="text-sm text-gray-500">{Math.round((s.duration_seconds || 0) / 60 * 100) / 100} min</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
} 