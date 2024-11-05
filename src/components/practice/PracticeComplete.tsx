import React from 'react';
import { Trophy, ArrowRight } from 'lucide-react';

interface PracticeCompleteProps {
  correctCount: number;
  totalCount: number;
  onFinish: () => void;
}

export function PracticeComplete({ correctCount, totalCount, onFinish }: PracticeCompleteProps) {
  const percentage = Math.round((correctCount / totalCount) * 100);
  const grade = 
    percentage >= 90 ? 'A' :
    percentage >= 80 ? 'B' :
    percentage >= 70 ? 'C' :
    percentage >= 60 ? 'D' : 'F';

  return (
    <div className="max-w-lg mx-auto text-center">
      <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Trophy className="text-yellow-400" size={64} />
            <div className="absolute -top-2 -right-2 bg-primary-500 text-white text-xl font-bold w-8 h-8 rounded-full flex items-center justify-center">
              {grade}
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Practice Complete!
        </h2>

        <div className="text-6xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 text-transparent bg-clip-text mb-6">
          {percentage}%
        </div>

        <p className="text-gray-600 text-lg mb-8">
          You got {correctCount} out of {totalCount} words correct
        </p>

        <button
          onClick={onFinish}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-medium hover:from-primary-600 hover:to-secondary-600 transition-colors"
        >
          Back to Dashboard
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}