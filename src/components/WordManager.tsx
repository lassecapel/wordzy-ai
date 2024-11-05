import React, { useState } from 'react';
import { Plus, X, Sparkles } from 'lucide-react';
import type { Word } from '../types';

interface WordManagerProps {
  onWordsAdd: (words: Word[]) => void;
}

export function WordManager({ onWordsAdd }: WordManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [words, setWords] = useState<Partial<Word>[]>([{ 
    foreign: '', 
    native: '', 
    pronunciation: '', 
    category: '' 
  }]);

  const handleAddWord = () => {
    setWords([...words, { foreign: '', native: '', pronunciation: '', category: '' }]);
  };

  const handleRemoveWord = (index: number) => {
    setWords(words.filter((_, i) => i !== index));
  };

  const handleWordChange = (index: number, field: keyof Word, value: string) => {
    setWords(words.map((word, i) => 
      i === index ? { ...word, [field]: value } : word
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newWords = words
      .filter(word => word.foreign && word.native)
      .map((word, index) => ({
        id: Date.now().toString() + index,
        foreign: word.foreign!,
        native: word.native!,
        pronunciation: word.pronunciation || '',
        category: word.category || 'uncategorized',
        confidence: 0
      }));
    
    onWordsAdd(newWords);
    setIsOpen(false);
    setWords([{ foreign: '', native: '', pronunciation: '', category: '' }]);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transform transition-all hover:scale-105 group"
      >
        <Plus size={32} className="group-hover:rotate-180 transition-transform duration-300" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <Sparkles className="text-primary-500" size={28} />
                  <h2 className="text-2xl font-bold text-gray-900">Add New Words</h2>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-primary-500 transition-colors"
                >
                  <X size={28} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {words.map((word, index) => (
                  <div key={index} className="relative bg-gray-50 p-6 rounded-2xl border-2 border-gray-100">
                    {words.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveWord(index)}
                        className="absolute -top-2 -right-2 bg-white text-gray-400 hover:text-primary-500 rounded-full p-1 shadow-md transition-colors"
                      >
                        <X size={20} />
                      </button>
                    )}
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Foreign Word*
                        </label>
                        <input
                          type="text"
                          value={word.foreign}
                          onChange={(e) => handleWordChange(index, 'foreign', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Native Translation*
                        </label>
                        <input
                          type="text"
                          value={word.native}
                          onChange={(e) => handleWordChange(index, 'native', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pronunciation
                        </label>
                        <input
                          type="text"
                          value={word.pronunciation}
                          onChange={(e) => handleWordChange(index, 'pronunciation', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Category
                        </label>
                        <input
                          type="text"
                          value={word.category}
                          onChange={(e) => handleWordChange(index, 'category', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 transition-colors"
                          placeholder="e.g., animals, colors..."
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handleAddWord}
                    className="flex-1 py-3 px-4 border-2 border-primary-500 text-primary-600 rounded-xl hover:bg-primary-50 font-medium transition-colors"
                  >
                    Add Another Word
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl hover:from-primary-600 hover:to-secondary-600 font-medium transition-colors"
                  >
                    Save Words
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}