import React from 'react';
import { X, BookOpen, Pencil, List, Headphones } from 'lucide-react';
import type { WordList } from '../../types';

interface PracticeModalProps {
  list: WordList;
  onClose: () => void;
  onStartPractice: (type: string) => void;
}

const practiceTypes = [
  {
    id: 'flashcards',
    icon: BookOpen,
    title: 'Flashcards',
    description: 'Classic flashcard practice'
  },
  {
    id: 'writing',
    icon: Pencil,
    title: 'Writing Practice',
    description: 'Write translations of words'
  },
  {
    id: 'quiz',
    icon: List,
    title: 'Multiple Choice',
    description: 'Choose the correct translation'
  },
  {
    id: 'listening',
    icon: Headphones,
    title: 'Listening Practice',
    description: 'Practice pronunciation and listening'
  }
];

export function PracticeModal({ list, onClose, onStartPractice }: PracticeModalProps) {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Practice "{list.title}"
            </h2>
            <p className="text-gray-600">
              Choose your practice mode to begin
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-primary-500 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {practiceTypes.map(({ id, icon: Icon, title, description }) => (
            <button
              key={id}
              onClick={() => onStartPractice(id)}
              className="bg-white p-6 rounded-2xl border-2 border-gray-100 hover:border-primary-500 transition-all hover:shadow-lg text-left group"
            >
              <Icon className="text-primary-500 mb-3 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">{description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}