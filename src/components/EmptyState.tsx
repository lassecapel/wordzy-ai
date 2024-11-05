import React, { useState } from 'react';
import { Plus, BookOpen } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useWordLists } from '../hooks/useWordLists';
import { sampleWordLists } from '../data/sampleData';
import { CreateListModal } from './wordList/CreateListModal';

interface EmptyStateProps {
  onAuthRequired: () => void;
}

export function EmptyState({ onAuthRequired }: EmptyStateProps) {
  const { user } = useAuthStore();
  const { createList } = useWordLists();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAction = async (action: () => Promise<void>) => {
    if (!user) {
      onAuthRequired();
      return;
    }
    try {
      setLoading(true);
      await action();
    } catch (error) {
      console.error('Action failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadSampleData = async () => {
    await Promise.all(sampleWordLists.map(list => createList(list)));
  };

  return (
    <>
      <div className="text-center max-w-md mx-auto bg-white/90 backdrop-blur rounded-bubble p-8 shadow-xl">
        <BookOpen className="mx-auto text-primary-500 mb-4" size={48} />
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 text-transparent bg-clip-text mb-4">
          {user ? 'Create Your First List' : 'Start Your Learning Journey'}
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          {user 
            ? 'Create your first word list or use our sample data to begin practicing right away!'
            : 'Sign in or continue as guest to start learning new languages.'}
        </p>
        
        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleAction(async () => setShowCreateModal(true))}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-medium hover:from-primary-600 hover:to-secondary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus size={20} />
            {user ? 'Create Word List' : 'Get Started'}
          </button>
          
          {user && (
            <button
              onClick={() => handleAction(handleLoadSampleData)}
              disabled={loading}
              className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary-500 text-primary-600 rounded-xl font-medium hover:bg-primary-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <BookOpen size={20} />
              {loading ? 'Loading...' : 'Load Sample Data'}
            </button>
          )}
        </div>
      </div>

      {showCreateModal && (
        <CreateListModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={async (list) => {
            await createList(list);
            setShowCreateModal(false);
          }}
        />
      )}
    </>
  );
}