import React from 'react';
import { Star, GitFork, Users } from 'lucide-react';
import type { WordList } from '../../types';

interface WordListCardProps {
  list: WordList;
  onFork: () => void;
  onPractice: () => void;
}

export function WordListCard({ list, onFork, onPractice }: WordListCardProps) {
  return (
    <div className="bg-white/90 backdrop-blur rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{list.title}</h3>
          <p className="text-gray-600">{list.description}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <GitFork className="text-gray-400" size={20} />
            <span className="text-sm text-gray-600">{list.forkCount || 0}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="text-gray-400" size={20} />
            <span className="text-sm text-gray-600">{list.words?.length || 0} words</span>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={onFork}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
        >
          Fork List
        </button>
        <button
          onClick={onPractice}
          className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-colors"
        >
          Practice
        </button>
      </div>
    </div>
  );
}