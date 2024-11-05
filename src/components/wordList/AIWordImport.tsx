import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { generateWordsFromText } from '../../services/aiService';
import type { Word } from '../../types';

interface AIWordImportProps {
  onWordsGenerated: (words: Word[]) => void;
}

export function AIWordImport({ onWordsGenerated }: AIWordImportProps) {
  const [text, setText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('French');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const words = await generateWordsFromText(text, targetLanguage);
      onWordsGenerated(words);
    } catch (error) {
      console.error('Error generating words:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur rounded-2xl p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="text-primary-500" size={24} />
        <h2 className="text-xl font-bold text-gray-900">AI Word Generation</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Language
          </label>
          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
          >
            <option>French</option>
            <option>Spanish</option>
            <option>German</option>
            <option>Italian</option>
            <option>Japanese</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Paste text to extract vocabulary
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 h-32"
            placeholder="Paste any text in your target language..."
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !text}
          className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 rounded-xl font-medium hover:from-primary-600 hover:to-secondary-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Generating...' : 'Generate Words'}
        </button>
      </div>
    </div>
  );
}