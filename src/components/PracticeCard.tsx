import React, { useState } from 'react';
import { Volume2, Star } from 'lucide-react';
import type { Word } from '../types';
import { getMatchScore } from '../utils/matching';

interface PracticeCardProps {
  word: Word;
  onResult: (correct: boolean) => void;
}

export function PracticeCard({ word, onResult }: PracticeCardProps) {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<{
    score: number;
    correct: boolean;
    submitted: boolean;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const score = getMatchScore(input.trim(), word.native);
    const correct = score >= 85;
    
    setResult({
      score,
      correct,
      submitted: true
    });
    
    setTimeout(() => {
      onResult(correct);
      setInput('');
      setResult(null);
    }, 1500);
  };

  return (
    <div className="w-full max-w-lg">
      <div className="bg-white/90 backdrop-blur rounded-bubble shadow-xl p-8 transform transition-all hover:scale-102">
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm font-medium text-primary-600 bg-primary-50 px-4 py-2 rounded-full border-2 border-primary-100">
            {word.category}
          </span>
          <div className="flex items-center gap-3">
            <button className="text-secondary-400 hover:text-secondary-500 transition-colors">
              <Volume2 size={24} />
            </button>
            <div className="flex items-center gap-1">
              <Star className="text-yellow-400" size={20} />
              <span className="text-sm font-medium text-gray-600">
                {word.confidence}%
              </span>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-3">{word.foreign}</h2>
          {word.pronunciation && (
            <p className="text-primary-500 text-lg">[{word.pronunciation}]</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={result?.submitted}
              placeholder="Type your answer here..."
              className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-secondary-200 focus:border-secondary-400 focus:ring focus:ring-secondary-200 focus:ring-opacity-50 disabled:bg-gray-50 transition-colors"
              autoFocus
            />
          </div>

          {!result?.submitted ? (
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-4 rounded-2xl text-lg font-medium hover:from-primary-600 hover:to-secondary-600 transform transition-all active:scale-98 shadow-lg"
            >
              Check Answer
            </button>
          ) : (
            <div className={`p-6 rounded-2xl text-center ${
              result.correct 
                ? 'bg-green-50 border-2 border-green-100' 
                : 'bg-primary-50 border-2 border-primary-100'
            }`}>
              <p className="text-xl font-bold mb-2">
                {result.correct ? '🎉 Fantastic!' : '💪 Keep Going!'}
              </p>
              <p className="text-lg">
                {result.correct 
                  ? 'You got it right!' 
                  : `The correct answer was: ${word.native}`}
              </p>
              <p className="text-sm mt-2 text-gray-600">
                Match score: {Math.round(result.score)}%
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}