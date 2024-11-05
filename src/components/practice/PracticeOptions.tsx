import React from 'react';
import { BookOpen, Pencil, List, Headphones } from 'lucide-react';

const practiceTypes = [
  {
    id: 'flashcard',
    icon: BookOpen,
    title: 'Flashcards',
    description: 'Classic flashcard practice',
  },
  {
    id: 'writing',
    icon: Pencil,
    title: 'Writing',
    description: 'Practice writing translations',
  },
  {
    id: 'multiplechoice',
    icon: List,
    title: 'Multiple Choice',
    description: 'Choose the correct translation',
  },
  {
    id: 'listening',
    icon: Headphones,
    title: 'Listening',
    description: 'Practice pronunciation and listening',
  },
];

interface PracticeOptionsProps {
  onSelect: (type: string) => void;
}

export function PracticeOptions({ onSelect }: PracticeOptionsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {practiceTypes.map(({ id, icon: Icon, title, description }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          className="bg-white/90 backdrop-blur p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-102"
        >
          <Icon className="text-primary-500 mb-3" size={32} />
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </button>
      ))}
    </div>
  );
}