'use client';

import Quiz from '@/components/Quiz';

export default function QuizPage() {
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Quiz</h2>
      <Quiz />
    </div>
  );
}
