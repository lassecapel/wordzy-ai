import { useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { useWordListStore } from '../stores/wordListStore';
import { useGuestStore } from '../stores/guestStore';
import type { Word, WordList, TestResult } from '../types';

export function useWordLists() {
  const { user } = useAuthStore();
  const {
    lists: persistedLists,
    loading: persistedLoading,
    error: persistedError,
    fetchUserLists,
    createList: createPersistedList,
    updateList: updatePersistedList,
    deleteList: deletePersistedList,
    addWords: addPersistedWords,
    saveTestResult: savePersistedTestResult,
    forkList: forkPersistedList
  } = useWordListStore();

  const {
    lists: guestLists,
    addList: addGuestList,
    updateList: updateGuestList,
    deleteList: deleteGuestList,
    addWords: addGuestWords,
    saveTestResult: saveGuestTestResult
  } = useGuestStore();

  useEffect(() => {
    if (user && !user.isGuest) {
      fetchUserLists().catch(console.error);
    }
  }, [user, fetchUserLists]);

  const isGuest = user?.isGuest ?? false;
  const lists = isGuest ? guestLists : persistedLists;
  const loading = isGuest ? false : persistedLoading;
  const error = isGuest ? null : persistedError;

  const createList = async (list: Partial<WordList>): Promise<WordList> => {
    if (!list.title) {
      throw new Error('List title is required');
    }

    if (isGuest) {
      const guestList: WordList = {
        id: `guest-list-${Date.now()}`,
        title: list.title,
        description: list.description || '',
        fromLanguage: list.fromLanguage || { code: 'en', name: 'English' },
        toLanguage: list.toLanguage || { code: 'fr', name: 'French' },
        words: list.words || [],
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: user?.id || 'guest',
        forks: 0,
        rating: 0
      };
      addGuestList(guestList);
      return guestList;
    }

    try {
      const createdList = await createPersistedList(list);
      if (!createdList) {
        throw new Error('Failed to create list');
      }
      return createdList;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to create list');
    }
  };

  const updateList = async (id: string, updates: Partial<WordList>): Promise<void> => {
    if (isGuest) {
      updateGuestList(id, updates);
    } else {
      await updatePersistedList(id, updates);
    }
  };

  const deleteList = async (id: string): Promise<void> => {
    if (isGuest) {
      deleteGuestList(id);
    } else {
      await deletePersistedList(id);
    }
  };

  const addWords = async (listId: string, words: Word[]): Promise<void> => {
    if (isGuest) {
      addGuestWords(listId, words);
    } else {
      await addPersistedWords(listId, words);
    }
  };

  const saveTestResult = async (result: Omit<TestResult, 'id'>): Promise<void> => {
    if (isGuest) {
      saveGuestTestResult({
        ...result,
        id: `guest-result-${Date.now()}`
      });
    } else {
      await savePersistedTestResult(result);
    }
  };

  const forkList = async (listId: string): Promise<void> => {
    if (isGuest) {
      const originalList = lists.find(l => l.id === listId);
      if (originalList) {
        const forkedList: WordList = {
          ...originalList,
          id: `guest-list-${Date.now()}`,
          title: `${originalList.title} (Fork)`,
          description: `Forked from ${originalList.title}`,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: user?.id || 'guest',
          forks: 0,
          rating: 0
        };
        addGuestList(forkedList);
      }
    } else {
      await forkPersistedList(listId);
    }
  };

  return {
    lists,
    loading,
    error,
    createList,
    updateList,
    deleteList,
    addWords,
    saveTestResult,
    forkList
  };
}