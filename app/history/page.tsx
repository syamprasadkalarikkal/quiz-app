'use client';

import { useEffect, useState } from 'react';

interface HistoryEntry {
  name: string;
  email: string;
  phone: string;
  date: string;
  score: number;
  totalQuestions: number;
  percentage: number;
}

function getHistory(): HistoryEntry[] {
  const history = localStorage.getItem('quizHistory');
  return history ? JSON.parse(history) : [];
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleDelete = (index: number) => {
    const updatedHistory = history.filter((_, i) => i !== index);
    localStorage.setItem('quizHistory', JSON.stringify(updatedHistory));
    setHistory(updatedHistory); 
  };

  const handleDeleteAll = () => {
    localStorage.removeItem('quizHistory');
    setHistory([]); 
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-4">
        <button
          onClick={handleDeleteAll}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
          Delete All History
        </button>
      </div>
      <h2 className="text-2xl font-bold mb-6 text-center">Quiz History</h2>

      {history.length === 0 ? (
        <p className="text-center">No history found.</p>
      ) : (
        <div className="space-y-6">
          {history.map((entry, index) => (
            <div key={index} className="border-2 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">User Attempt #{index + 1}</h3>
              <div className="space-y-2">
                <p><strong>Name:</strong> {entry.name}</p>
                <p><strong>Email:</strong> {entry.email}</p>
                <p><strong>Phone:</strong> {entry.phone}</p>
                <p><strong>Date:</strong> {entry.date}</p>
                <p><strong>Score:</strong> {entry.score} / {entry.totalQuestions}</p>
                <p><strong>Percentage:</strong> {entry.percentage.toFixed(2)}%</p>
              </div>

              <button
                onClick={() => handleDelete(index)}
                className="mt-4 bg-green-600 text-white py-1 px-4 rounded-md hover:bg-red-700 transition-colors">
                Delete Attempt
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
