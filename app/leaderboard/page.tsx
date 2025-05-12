'use client';

import { useEffect, useState } from 'react';

interface HistoryEntry {
  id: string;
  name: string;
  email: string;
  phone: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  date: string;
}

export default function Leaderboard() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('quizHistory') || '[]');
    
    
    const sortedHistory = [...storedHistory].sort((a: HistoryEntry, b: HistoryEntry) => b.score - a.score);
    setHistory(sortedHistory);
  }, []);

  const getMedal = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return '';  
  };

  
  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString(undefined, options);
    return formattedDate;
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Leaderboard</h1>

      {history.length === 0 ? (
        <p className="text-center text-gray-600">No history available.</p>
      ) : (
        <div className="space-y-4">
          {history.map((entry, index) => (
            
            <div key={`${entry.id}-${index}`} className="border rounded-lg p-4 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-lg font-semibold flex items-center gap-2">
                  {getMedal(index)} {entry.name}
                </p>
                <p className="text-sm text-gray-500">{entry.email} | {entry.phone}</p>
                <p className="text-xs text-gray-400">{formatDate(entry.date)}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">{entry.score} / {entry.totalQuestions}</p>
                <p className="text-green-600">{entry.percentage.toFixed(2)}%</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
