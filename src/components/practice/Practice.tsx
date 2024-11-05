import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useWordLists } from '../../hooks/useWordLists';
import { useAuthStore } from '../../stores/authStore';
import { PracticeCard } from './PracticeCard';
import { ProgressBar } from '../ProgressBar';
import { PracticeComplete } from './PracticeComplete';

export function Practice() {
  const { listId, type } = useParams();
  const navigate = useNavigate();
  const { lists, saveTestResult } = useWordLists();
  const { user } = useAuthStore();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [showComplete, setShowComplete] = useState(false);
  const [startTime] = useState(new Date());

  const list = lists.find(l => l.id === listId);
  const words = list?.words || [];
  const currentWord = words[currentWordIndex];

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    if (!list) {
      navigate('/');
    }
  }, [list, navigate, user]);

  const handleResult = (correct: boolean) => {
    setResults([...results, correct]);
    
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      const endTime = new Date();
      const duration = (endTime.getTime() - startTime.getTime()) / 1000; // in seconds
      
      // Save test result
      if (list) {
        saveTestResult({
          wordListId: list.id,
          userId: user?.id || 'guest',
          date: new Date(),
          correctCount: results.filter(r => r).length + (correct ? 1 : 0),
          totalCount: words.length,
          duration,
          complexWords: words.filter((_, index) => !results[index]).map(word => ({
            wordId: word.id,
            value: word.value,
            correctTranslations: word.translations.map(t => t.value),
            userTranslation: '',
            matchScore: 0,
            attempts: 1
          }))
        });
      }
      
      setShowComplete(true);
    }
  };

  if (!list || !user) {
    return null;
  }

  if (showComplete) {
    return (
      <PracticeComplete
        correctCount={results.filter(r => r).length}
        totalCount={words.length}
        onFinish={() => navigate('/')}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <ProgressBar 
          current={currentWordIndex + 1} 
          total={words.length}
          correct={results.filter(r => r).length}
        />
      </div>

      <div className="flex justify-center">
        {currentWord && (
          <PracticeCard
            word={currentWord}
            type={type || 'flashcards'}
            onResult={handleResult}
          />
        )}
      </div>
    </div>
  );
}