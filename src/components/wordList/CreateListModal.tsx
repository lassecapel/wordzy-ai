import React, { useState } from 'react';
import { X } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../../utils/languages';
import type { Language } from '../../types';

interface CreateListModalProps {
  onClose: () => void;
  onSubmit: (list: { 
    title: string; 
    description: string; 
    fromLanguage: Language; 
    toLanguage: Language; 
  }) => Promise<void>;
}

export function CreateListModal({ onClose, onSubmit }: CreateListModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fromLanguage, setFromLanguage] = useState(SUPPORTED_LANGUAGES[0]);
  const [toLanguage, setToLanguage] = useState(SUPPORTED_LANGUAGES[1]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    try {
      setLoading(true);
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        fromLanguage,
        toLanguage
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create list');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Create New List</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-primary-500 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title*
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
              placeholder="e.g., Essential French Phrases"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 h-24"
              placeholder="Describe your word list..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From Language
              </label>
              <select
                value={fromLanguage.code}
                onChange={(e) => setFromLanguage(
                  SUPPORTED_LANGUAGES.find(l => l.code === e.target.value) || SUPPORTED_LANGUAGES[0]
                )}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
              >
                {SUPPORTED_LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To Language
              </label>
              <select
                value={toLanguage.code}
                onChange={(e) => setToLanguage(
                  SUPPORTED_LANGUAGES.find(l => l.code === e.target.value) || SUPPORTED_LANGUAGES[1]
                )}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
              >
                {SUPPORTED_LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 rounded-xl font-medium hover:from-primary-600 hover:to-secondary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create List'}
          </button>
        </form>
      </div>
    </div>
  );
}