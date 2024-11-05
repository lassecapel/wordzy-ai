import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import type { WordList, Word, TestResult } from '../types';

interface GuestState {
  lists: WordList[];
  currentList: WordList | null;
  testResults: TestResult[];
  addList: (list: WordList) => void;
  updateList: (id: string, updates: Partial<WordList>) => void;
  deleteList: (id: string) => void;
  addWords: (listId: string, words: Word[]) => void;
  saveTestResult: (result: TestResult) => void;
  clearAll: () => void;
}

export const useGuestStore = create<GuestState>((set, get) => ({
  lists: [],
  currentList: null,
  testResults: [],

  addList: (list) => {
    const listWithId = {
      ...list,
      id: `guest-list-${uuidv4()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    set(state => ({
      lists: [listWithId, ...state.lists]
    }));
  },

  updateList: (id, updates) => {
    set(state => ({
      lists: state.lists.map(list => 
        list.id === id ? { ...list, ...updates, updatedAt: new Date() } : list
      ),
      currentList: state.currentList?.id === id 
        ? { ...state.currentList, ...updates, updatedAt: new Date() }
        : state.currentList
    }));
  },

  deleteList: (id) => {
    set(state => ({
      lists: state.lists.filter(list => list.id !== id),
      currentList: state.currentList?.id === id ? null : state.currentList
    }));
  },

  addWords: (listId, words) => {
    const wordsWithIds = words.map(word => ({
      ...word,
      id: `guest-word-${uuidv4()}`
    }));

    set(state => ({
      lists: state.lists.map(list => 
        list.id === listId 
          ? { 
              ...list, 
              words: [...list.words, ...wordsWithIds],
              updatedAt: new Date()
            }
          : list
      )
    }));
  },

  saveTestResult: (result) => {
    const resultWithId = {
      ...result,
      id: `guest-result-${uuidv4()}`
    };
    set(state => ({
      testResults: [resultWithId, ...state.testResults]
    }));
  },

  clearAll: () => {
    set({ lists: [], currentList: null, testResults: [] });
  }
}));