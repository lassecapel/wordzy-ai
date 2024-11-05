import { useState, useEffect, useCallback } from 'react';
import { Word } from '../types';

export function useSpacedRepetition() {
  const [words, setWords] = useState<Word[]>(() => {
    const stored = localStorage.getItem('wordsList');
    return stored ? JSON.parse(stored) : [];
  });

  const [currentWord, setCurrentWord] = useState<Word | null>(null);

  useEffect(() => {
    localStorage.setItem('wordsList', JSON.stringify(words));
  }, [words]);

  const selectNextWord = useCallback(() => {
    if (words.length === 0) {
      setCurrentWord(null);
      return;
    }
    
    // Prioritize words with lower confidence
    const sortedWords = [...words].sort((a, b) => {
      // Prioritize words that haven't been practiced
      if (!a.lastPracticed && b.lastPracticed) return -1;
      if (a.lastPracticed && !b.lastPracticed) return 1;
      
      return a.confidence - b.confidence;
    });
    
    const randomFactor = Math.random() * 0.3; // Add some randomness
    const index = Math.floor(randomFactor * sortedWords.length);
    setCurrentWord(sortedWords[index]);
  }, [words]);

  const updateWordConfidence = useCallback((wordId: string, correct: boolean) => {
    setWords(prevWords => 
      prevWords.map(word => {
        if (word.id === wordId) {
          const confidenceChange = correct ? 10 : -20;
          const newConfidence = Math.max(0, Math.min(100, word.confidence + confidenceChange));
          return {
            ...word,
            confidence: newConfidence,
            lastPracticed: new Date()
          };
        }
        return word;
      })
    );
  }, []);

  const addWords = useCallback((newWords: Word[]) => {
    setWords(prevWords => [...prevWords, ...newWords]);
  }, []);

  return {
    currentWord,
    selectNextWord,
    updateWordConfidence,
    addWords,
    words
  };
}