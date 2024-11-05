import React, { useState } from 'react';
import { useWordLists } from '../hooks/useWordLists';
import { useAuthStore } from '../stores/authStore';
import { EmptyState } from './EmptyState';
import { WordListCard } from './wordList/WordListCard';
import { AuthModal } from './auth/AuthModal';
import { PracticeModal } from './practice/PracticeModal';
import { RecentPractices } from './RecentPractices';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const { lists = [], loading, error, forkList, testResults = [] } = useWordLists();
  const { user } = useAuthStore();
  const [showAuth, setShowAuth] = useState(false);
  const [selectedList, setSelectedList] = useState<string | null>(null);
  const navigate = useNavigate();

  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  // Show error state if there's an error
  if (error) {
    return (
      <div className="text-center text-red-600 bg-red-50 rounded-xl p-4">
        {error}
      </div>
    );
  }

  // If no user is logged in, show empty state with auth handling
  if (!user) {
    return (
      <>
        <EmptyState onAuthRequired={() => setShowAuth(true)} />
        {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      </>
    );
  }

  // If user is logged in but has no lists, show empty state
  if (!lists || lists.length === 0) {
    return <EmptyState onAuthRequired={() => {}} />;
  }

  const handleStartPractice = (type: string) => {
    if (selectedList) {
      navigate(`/practice/${selectedList}/${type}`);
      setSelectedList(null);
    }
  };

  // User is logged in and has lists - show the main dashboard
  return (
    <div className="space-y-8">
      {testResults && testResults.length > 0 && (
        <RecentPractices results={testResults} lists={lists} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lists.map(list => (
          <WordListCard
            key={list.id}
            list={list}
            onFork={() => forkList(list.id)}
            onPractice={() => setSelectedList(list.id)}
          />
        ))}
      </div>

      {selectedList && (
        <PracticeModal
          list={lists.find(l => l.id === selectedList)!}
          onClose={() => setSelectedList(null)}
          onStartPractice={handleStartPractice}
        />
      )}
    </div>
  );
}