import React from 'react';
import { Star } from 'lucide-react';

interface ProgressBarProps {
  current: number;
  total: number;
  correct: number;
}

export function ProgressBar({ current, total, correct }: ProgressBarProps) {
  const progress = (current / total) * 100;
  const accuracy = total > 0 ? (correct / current) * 100 : 0;

  return (
    <div className="bg-white/90 backdrop-blur rounded-2xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <Star className="text-yellow-400" size={24} />
          <span className="text-lg font-medium text-gray-700">Progress</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-600">
            {current} of {total} words
          </span>
          <span className="text-xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 text-transparent bg-clip-text">
            {accuracy.toFixed(1)}% correct
          </span>
        </div>
      </div>
      <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}