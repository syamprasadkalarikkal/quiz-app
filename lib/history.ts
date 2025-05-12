export type HistoryEntry = {
    name: string;
    email: string;
    phone: string;
    id: string;
    score: number;
    totalQuestions: number;
    percentage: number;
    date: string;
  };
  
  export function saveHistory(entry: HistoryEntry) {
    const existingHistory = JSON.parse(localStorage.getItem('quizHistory') || '[]');
    const updatedHistory = [...existingHistory, entry];
    localStorage.setItem('quizHistory', JSON.stringify(updatedHistory));
  }
  
  export function getHistory(): HistoryEntry[] {
    const history = localStorage.getItem('quizHistory');
    return history ? JSON.parse(history) : [];
  }
  