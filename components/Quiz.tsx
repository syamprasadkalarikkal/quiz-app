'use client';

import { useState, useEffect } from 'react';
import { questions } from '../data/questions';
import { saveHistory } from '@/lib/history';


export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(Array(questions.length).fill(''));
  const [timer, setTimer] = useState(300); 
  const [quizEnded, setQuizEnded] = useState(false);
  const [score, setScore] = useState(0);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');


  const formatTime = (time:number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);

    if (timer <= 0) {
      clearInterval(countdown);
      handleSubmit();
    }

    return () => clearInterval(countdown);
  }, [timer]);

  const handleOptionSelect = (option: string) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[currentQuestionIndex] = option;
    setSelectedOptions(updatedOptions);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    const storedAnswers = questions.map((q, index) => ({
      question: q.question,
      selectedOption: selectedOptions[index],
      correctAnswer: q.correctAnswer,
      isCorrect: selectedOptions[index] === q.correctAnswer,
    }));
  
    localStorage.setItem('quizAnswers', JSON.stringify(storedAnswers));
  
    const correctAnswers = storedAnswers.filter(ans => ans.isCorrect).length;
    setScore(correctAnswers);
    setQuizEnded(true);
  
    const userData = JSON.parse(localStorage.getItem('ContactForm') || '{}');
  
    if (userData.name && userData.email && userData.phone) {
      const historyEntry = {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        date: new Date().toLocaleString(),
        score: correctAnswers,
        totalQuestions: questions.length,
        percentage: (correctAnswers / questions.length) * 100,
      };
  
      const existingHistory = JSON.parse(localStorage.getItem('quizHistory') || '[]');
      existingHistory.push(historyEntry);
      localStorage.setItem('quizHistory', JSON.stringify(existingHistory));
    }
  
    setScore(correctAnswers);
    setQuizEnded(true);
  };
  
  
   
  

  if (quizEnded) {
    const totalQuestions = questions.length;
    const percentage = (score / totalQuestions) * 100;
  
    return (
      <div className="max-w-md mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Quiz Completed!</h2>
  
        
        <div className="flex justify-center gap-4 mb-8">
          <div className="border rounded-lg p-4 w-1/2 text-center shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Score</h3>
            <p className="text-lg">{score} / {totalQuestions}</p>
          </div>
          <div className="border rounded-lg p-4 w-1/2 text-center shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Percentage</h3>
            <p className="text-lg">{percentage.toFixed(2)}%</p>
          </div>
        </div>
  
       
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-4 text-center">Correct Answers</h3>
          {questions.map((q, index) => (
            <div key={index} className="mb-4 p-4 border rounded-lg shadow-sm">
              <p className="font-semibold mb-2">{q.question}</p>
              <p className={`text-sm mb-1 ${selectedOptions[index] === q.correctAnswer ? 'text-green-600' : 'text-red-600'}`}>
                Your answer: {selectedOptions[index] || 'Not answered'}
              </p>
              <p className="text-sm text-green-600">
                Correct answer: {q.correctAnswer}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="mb-4 text-right">
        <p className={`text-lg ${timer <= 30 ? 'text-red-500' : 'text-green-600'}`}>
          Time Remaining: {formatTime(timer)}
        </p>
      </div>

      <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>

      <ul className="mb-6">
        {currentQuestion.options.map(option => (
          <li key={option} className="mb-2">
            <button
              onClick={() => handleOptionSelect(option)}
              className={`w-full p-2 border rounded ${
                selectedOptions[currentQuestionIndex] === option ? 'bg-blue-500 text-white' : 'bg-white'
              }`}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>

      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>

        {currentQuestionIndex === questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={!selectedOptions[currentQuestionIndex]}
            className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
