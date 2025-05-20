'use client';

import { useEffect, useState } from 'react';
import { KeyboardHeatmap } from '@/components/KeyboardHeatmap';
import type { TypingSession } from '@/types/db';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

function SinglePointWPMChart({ data }: { data: { started_at: string; wpm: number }[] }) {
  return (
    <div className="w-full h-64 flex flex-col items-center">
      <div className="text-xs text-gray-500 mb-2">WPM</div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="started_at" tick={{ fontSize: 12 }} />
          <YAxis domain={[0, Math.max(60, data[0]?.wpm ? data[0].wpm + 10 : 60)]} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Line type="monotone" dataKey="wpm" stroke="#2563eb" strokeWidth={2} dot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function SinglePointAccuracyChart({ data }: { data: { started_at: string; accuracy: number }[] }) {
  return (
    <div className="w-full h-64 flex flex-col items-center">
      <div className="text-xs text-gray-500 mb-2">Accuracy</div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="started_at" tick={{ fontSize: 12 }} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Line type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={2} dot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function ResultsPage() {
  const [session, setSession] = useState<TypingSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSession() {
      setLoading(true);
      try {
        const res = await fetch('/api/typing/latest');
        if (res.ok) {
          const { session: latest } = await res.json();
          if (latest) {
            setSession(latest);
          } else {
            // Fallback to localStorage if no session found in DB
            const raw = localStorage.getItem('latest_stats');
            if (raw) {
              const tmp = JSON.parse(raw);
              setSession({
                id: 'local',
                user_id: 'local',
                type: 'ai_drill',
                wpm: tmp.wpm,
                accuracy: tmp.accuracy,
                error_map: tmp.mistakes,
                duration_seconds: tmp.totalTime,
                started_at: new Date().toISOString(),
              } as any);
            }
          }
        }
      } catch (err) {
        console.error('Error fetching latest session:', err);
      }
      setLoading(false);
    }
    fetchSession();
  }, []);

  // Convert error_map to typedHistory array for KeyboardHeatmap
  const typedHistory = session?.error_map
    ? Object.entries(session.error_map).flatMap(([key, count]) => Array(count).fill({ key, correct: false }))
    : [];

  // Prepare single-point data for graphs
  const wpmData = session
    ? [{ started_at: new Date(session.started_at).toLocaleDateString(), wpm: session.wpm ?? 0 }]
    : [];
  const accuracyData = session
    ? [{ started_at: new Date(session.started_at).toLocaleDateString(), accuracy: session.accuracy ?? 0 }]
    : [];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-white relative">
      {/* Top right profile placeholder */}
      <div className="absolute top-6 right-8">
        <Link href="/profile" aria-label="Go to profile">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-xl cursor-pointer hover:bg-gray-300 transition">
            <span>👤</span>
          </div>
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Your Typing Test Result</h1>
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl gap-8">
        {/* Left: WPM graph */}
        <div className="w-full md:w-1/4 flex justify-center">
          {loading || !session ? (
            <div className="text-gray-400 text-lg py-12">No data</div>
          ) : (
            <SinglePointWPMChart data={wpmData} />
          )}
        </div>
        {/* Center: KeyboardHeatmap and session info */}
        <div className="w-full md:w-2/4 flex flex-col items-center">
          {loading ? (
            <div className="text-gray-400 text-lg py-12">Loading...</div>
          ) : session ? (
            <>
              <KeyboardHeatmap typedHistory={typedHistory} />
              <div className="mt-6 flex flex-col items-center space-y-2">
                <div className="text-lg font-semibold text-gray-800">{session.type === 'initial_test' ? 'Initial Test' : 'AI Drill'}</div>
                <div className="flex gap-8 text-base text-gray-700">
                  <span><span className="font-bold">WPM:</span> {session.wpm}</span>
                  <span><span className="font-bold">Accuracy:</span> {session.accuracy}%</span>
                  <span><span className="font-bold">Duration:</span> {Math.round((session.duration_seconds || 0) / 60 * 100) / 100} min</span>
                </div>
              </div>
            </>
          ) : (
            <div className="text-gray-400 text-lg py-12">No session found yet.</div>
          )}
          <div className="mt-8 flex justify-center">
            <Link href="/playground">
              <button className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 text-base font-medium shadow">
                New Lesson
              </button>
            </Link>
          </div>
        </div>
        {/* Right: Accuracy graph */}
        <div className="w-full md:w-1/4 flex justify-center">
          {loading || !session ? (
            <div className="text-gray-400 text-lg py-12">No data</div>
          ) : (
            <SinglePointAccuracyChart data={accuracyData} />
          )}
        </div>
      </div>
    </main>
  );
}



