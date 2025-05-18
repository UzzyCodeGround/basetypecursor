'use client';

import { useSession } from '@/components/SessionWrapper';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { KeyboardHeatmap } from '@/components/KeyboardHeatmap';
import type { TypingSession } from '@/types/db';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// Mock data for charts
const mockSessions = [
  { session: 1, accuracy: 92, wpm: 45 },
  { session: 2, accuracy: 94, wpm: 48 },
  { session: 3, accuracy: 91, wpm: 50 },
  { session: 4, accuracy: 96, wpm: 52 },
  { session: 5, accuracy: 95, wpm: 54 },
];

function AccuracyOverTimeChart() {
  return (
    <div className="w-full h-64 flex flex-col items-center">
      <div className="text-xs text-gray-500 mb-2">Accuracy Over Time</div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={mockSessions} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="session" tick={{ fontSize: 12 }} />
          <YAxis domain={[80, 100]} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Line type="monotone" dataKey="accuracy" stroke="#2563eb" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function WPMOverTimeChart() {
  return (
    <div className="w-full h-64 flex flex-col items-center">
      <div className="text-xs text-gray-500 mb-2">Words Per Minute Over Time</div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={mockSessions} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="session" tick={{ fontSize: 12 }} />
          <YAxis domain={[40, 60]} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Line type="monotone" dataKey="wpm" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function ResultsPage() {
  const { session } = useSession();
  const userId = session?.user?.email;
  const [result, setResult] = useState<TypingSession | null>(null);

  useEffect(() => {
    if (!userId) return;
    // Fetch the latest result for this user
    supabase
      .from('typing_session')
      .select('*')
      .eq('user_id', userId)
      .order('completed_at', { ascending: false })
      .limit(1)
      .then(({ data }) => {
        if (data && data.length > 0) setResult(data[0]);
      });
  }, [userId]);

  // Use mock error_map for now
  const errorMap = result?.error_map || { e: 3, r: 2, t: 1 };
  // Convert errorMap to typedHistory array for KeyboardHeatmap
  const typedHistory = Object.entries(errorMap).flatMap(([key, count]) =>
    Array(count).fill({ key, correct: false })
  );

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
        {/* Left: Accuracy graph */}
        <div className="w-full md:w-1/4 flex justify-center">
          <AccuracyOverTimeChart />
        </div>
        {/* Center: KeyboardHeatmap */}
        <div className="w-full md:w-2/4 flex flex-col items-center">
          <KeyboardHeatmap typedHistory={typedHistory} />
          <div className="mt-8 flex justify-center">
            <Link href="/playground">
              <button className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 text-base font-medium shadow">
                New Lesson
              </button>
            </Link>
          </div>
        </div>
        {/* Right: WPM graph */}
        <div className="w-full md:w-1/4 flex justify-center">
          <WPMOverTimeChart />
        </div>
      </div>
    </main>
  );
}



