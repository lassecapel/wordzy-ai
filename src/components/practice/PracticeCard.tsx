import React, { useState, useMemo } from 'react';
import { Volume2, Star, Check, X as XIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Word } from '../../types';
import { getMatchScore } from '../../utils/matching';

interface PracticeCardProps {
  word: Word;
  type: string;
  onResult: (correct: boolean) => void;
}

export function PracticeCard({ word, type, onResult }: PracticeCardProps) {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Generate multiple choice options
  const options = useMemo(() => {
    if (type !== 'quiz') return [];

    const correctAnswer = word.translations[0].value;
    const generateSimilarOption = (answer: string): string => {
      const modifications = [
        () => {
          const pos = Math.floor(Math.random() * (answer.length - 1));
          const chars = answer.split('');
          [chars[pos], chars[pos + 1]] = [chars[pos + 1], chars[pos]];
          return chars.join('');
        },
        () => {
          const vowels = 'aeiou';
          const pos = answer.split('').findIndex(c => vowels.includes(c));
          if (pos === -1) return answer + 's';
          const chars = answer.split('');
          chars[pos] = vowels[Math.floor(Math.random() * vowels.length)];
          return chars.join('');
        },
        () => {
          return Math.random() < 0.5 
            ? answer.slice(0, -1) 
            : answer + answer[Math.floor(Math.random() * answer.length)];
        }
      ];

      const modification = modifications[Math.floor(Math.random() * modifications.length)];
      return modification();
    };

    const incorrectOptions = Array.from({ length: 3 }, () => generateSimilarOption(correctAnswer));
    const allOptions = [correctAnswer, ...incorrectOptions];
    return allOptions.sort(() => Math.random() - 0.5);
  }, [word, type]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let isCorrect = false;
    
    if (type === 'quiz') {
      isCorrect = selectedOption === word.translations[0].value;
    } else if (type === 'flashcards') {
      isCorrect = true; // User self-evaluates
    } else if (type === 'listening') {
      isCorrect = word.translations.some(t => 
        getMatchScore(input.toLowerCase().trim(), t.value.toLowerCase().trim()) >= 85
      );
    } else {
      // Writing mode
      isCorrect = word.translations.some(t => 
        getMatchScore(input.toLowerCase().trim(), t.value.toLowerCase().trim()) >= 85
      );
    }

    setResult(isCorrect ? 'correct' : 'incorrect');
    setShowAnswer(true);

    setTimeout(() => {
      onResult(isCorrect);
      setInput('');
      setShowAnswer(false);
      setResult(null);
      setSelectedOption(null);
    }, 1500);
  };

  const handlePlayAudio = () => {
    if ('speechSynthesis' in window) {
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(word.value);
      utterance.lang = word.translations[0].language || 'en-US';
      utterance.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const renderContent = () => {
    switch (type) {
      case 'quiz':
        return (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-4xl font-bold text-gray-900 mb-2">{word.value}</h3>
              {word.category && (
                <span className="inline-block px-4 py-1 bg-primary-50 text-primary-600 rounded-full text-sm">
                  {word.category}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 gap-3">
              {options.map((option, index) => (
                <button
                  key={index}
                  type="button"
                  disabled={showAnswer}
                  onClick={() => setSelectedOption(option)}
                  className={`p-4 rounded-xl text-left transition-all ${
                    showAnswer
                      ? option === word.translations[0].value
                        ? 'bg-green-100 border-2 border-green-200'
                        : option === selectedOption
                        ? 'bg-red-100 border-2 border-red-200'
                        : 'bg-gray-50 border-2 border-gray-100'
                      : option === selectedOption
                      ? 'bg-primary-50 border-2 border-primary-200'
                      : 'bg-gray-50 border-2 border-gray-100 hover:bg-gray-100'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {!showAnswer && selectedOption && (
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-4 rounded-xl text-lg font-medium hover:from-primary-600 hover:to-secondary-600 transition-colors"
              >
                {t('practice.checkAnswer')}
              </button>
            )}
          </form>
        );

      case 'listening':
        return (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-6">
              <button
                type="button"
                onClick={handlePlayAudio}
                disabled={isPlaying}
                className="mx-auto p-6 rounded-full bg-primary-50 text-primary-500 hover:bg-primary-100 transition-colors disabled:opacity-50"
              >
                <Volume2 size={32} />
              </button>
              <p className="mt-4 text-gray-600">{t('practice.listening.instruction')}</p>
            </div>

            <div>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('practice.listening.placeholder')}
                className="w-full px-6 py-4 text-lg rounded-xl border-2 border-gray-200 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 transition-colors"
                autoFocus
                disabled={showAnswer}
              />
            </div>

            {!showAnswer && input.trim() && (
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-4 rounded-xl text-lg font-medium hover:from-primary-600 hover:to-secondary-600 transition-colors"
              >
                {t('practice.checkAnswer')}
              </button>
            )}
          </form>
        );

      case 'flashcards':
        return (
          <div className="text-center">
            <div className="mb-8">
              <h3 className="text-4xl font-bold text-gray-900 mb-4">{word.value}</h3>
              {showAnswer ? (
                <div className="text-2xl text-primary-600">
                  {word.translations.map(t => t.value).join(', ')}
                </div>
              ) : (
                <button
                  onClick={() => setShowAnswer(true)}
                  className="px-6 py-3 text-lg font-medium text-primary-600 border-2 border-primary-500 rounded-xl hover:bg-primary-50 transition-colors"
                >
                  {t('practice.flashcards.showAnswer')}
                </button>
              )}
            </div>
            {showAnswer && (
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => onResult(false)}
                  className="flex items-center gap-2 px-6 py-3 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-colors"
                >
                  <XIcon size={20} />
                  {t('practice.incorrect')}
                </button>
                <button
                  onClick={() => onResult(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition-colors"
                >
                  <Check size={20} />
                  {t('practice.correct')}
                </button>
              </div>
            )}
          </div>
        );

      case 'writing':
      default:
        return (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-4xl font-bold text-gray-900 mb-2">{word.value}</h3>
              {word.category && (
                <span className="inline-block px-4 py-1 bg-primary-50 text-primary-600 rounded-full text-sm">
                  {word.category}
                </span>
              )}
            </div>

            <div>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('practice.writing.placeholder')}
                className="w-full px-6 py-4 text-lg rounded-xl border-2 border-gray-200 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 transition-colors"
                autoFocus
                disabled={showAnswer}
              />
            </div>

            {!showAnswer && input.trim() && (
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-4 rounded-xl text-lg font-medium hover:from-primary-600 hover:to-secondary-600 transition-colors"
              >
                {t('practice.checkAnswer')}
              </button>
            )}
          </form>
        );
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-8">
          {type !== 'listening' && (
            <button 
              onClick={handlePlayAudio}
              disabled={isPlaying}
              className="text-gray-400 hover:text-primary-500 transition-colors disabled:opacity-50"
            >
              <Volume2 size={24} />
            </button>
          )}
          <div className="flex items-center gap-2">
            <Star className="text-yellow-400" size={20} />
            <span className="text-sm font-medium text-gray-600">
              {word.complexity || 1}
            </span>
          </div>
        </div>

        {renderContent()}

        {showAnswer && (
          <div className={`mt-6 p-6 rounded-xl text-center ${
            result === 'correct' 
              ? 'bg-green-50 border-2 border-green-100' 
              : 'bg-red-50 border-2 border-red-100'
          }`}>
            <p className="text-xl font-bold mb-2">
              {result === 'correct' ? t('practice.feedback.correct') : t('practice.feedback.incorrect')}
            </p>
            <p className="text-lg">
              {result === 'correct' 
                ? t('practice.feedback.greatJob')
                : t('practice.feedback.correctAnswer', { answer: word.translations.map(t => t.value).join(', ') })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}