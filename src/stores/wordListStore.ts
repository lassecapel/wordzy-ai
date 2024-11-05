import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { WordList, Word, TestResult } from '../types';

interface WordListState {
  lists: WordList[];
  currentList: WordList | null;
  loading: boolean;
  error: string | null;
  fetchUserLists: () => Promise<void>;
  createList: (list: Partial<WordList>) => Promise<WordList>;
  updateList: (id: string, updates: Partial<WordList>) => Promise<void>;
  deleteList: (id: string) => Promise<void>;
  setCurrentList: (list: WordList | null) => void;
  addWords: (listId: string, words: Word[]) => Promise<void>;
  saveTestResult: (result: Omit<TestResult, 'id'>) => Promise<void>;
  forkList: (listId: string) => Promise<void>;
}

export const useWordListStore = create<WordListState>((set, get) => ({
  lists: [],
  currentList: null,
  loading: false,
  error: null,

  fetchUserLists: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('word_lists')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ lists: data || [] });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch lists';
      set({ error: message });
      throw new Error(message);
    } finally {
      set({ loading: false });
    }
  },

  createList: async (list) => {
    set({ loading: true, error: null });
    try {
      if (!list.title) {
        throw new Error('List title is required');
      }

      const { data, error } = await supabase
        .from('word_lists')
        .insert([{
          title: list.title,
          description: list.description || '',
          from_language: list.fromLanguage,
          to_language: list.toLanguage,
          words: list.words || [],
          user_id: (await supabase.auth.getUser()).data.user?.id
        }])
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error('Failed to create list');

      const newList: WordList = {
        id: data.id,
        title: data.title,
        description: data.description,
        fromLanguage: data.from_language,
        toLanguage: data.to_language,
        words: data.words || [],
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
        userId: data.user_id,
        forks: 0,
        rating: 0
      };

      set(state => ({ lists: [newList, ...state.lists] }));
      return newList;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create list';
      set({ error: message });
      throw new Error(message);
    } finally {
      set({ loading: false });
    }
  },

  updateList: async (id, updates) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('word_lists')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      
      set(state => ({
        lists: state.lists.map(list => 
          list.id === id ? { ...list, ...updates } : list
        ),
        currentList: state.currentList?.id === id 
          ? { ...state.currentList, ...updates }
          : state.currentList
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update list';
      set({ error: message });
      throw new Error(message);
    } finally {
      set({ loading: false });
    }
  },

  deleteList: async (id) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('word_lists')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      set(state => ({
        lists: state.lists.filter(list => list.id !== id),
        currentList: state.currentList?.id === id ? null : state.currentList
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete list';
      set({ error: message });
      throw new Error(message);
    } finally {
      set({ loading: false });
    }
  },

  setCurrentList: (list) => {
    set({ currentList: list });
  },

  addWords: async (listId, words) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('words')
        .insert(words.map(word => ({
          ...word,
          list_id: listId
        })));

      if (error) throw error;

      set(state => ({
        lists: state.lists.map(list => 
          list.id === listId 
            ? { ...list, words: [...list.words, ...words] }
            : list
        )
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to add words';
      set({ error: message });
      throw new Error(message);
    } finally {
      set({ loading: false });
    }
  },

  saveTestResult: async (result) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('test_results')
        .insert([result]);

      if (error) throw error;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to save test result';
      set({ error: message });
      throw new Error(message);
    } finally {
      set({ loading: false });
    }
  },

  forkList: async (listId) => {
    set({ loading: true, error: null });
    try {
      const originalList = get().lists.find(l => l.id === listId);
      if (!originalList) throw new Error('List not found');

      const { data: newList, error } = await supabase
        .from('word_lists')
        .insert([{
          title: `${originalList.title} (Fork)`,
          description: `Forked from ${originalList.title}`,
          from_language: originalList.fromLanguage,
          to_language: originalList.toLanguage,
          words: originalList.words,
          user_id: (await supabase.auth.getUser()).data.user?.id
        }])
        .select()
        .single();

      if (error) throw error;
      if (!newList) throw new Error('Failed to fork list');

      await supabase.rpc('increment_fork_count', { list_id: listId });

      set(state => ({
        lists: [{
          ...newList,
          fromLanguage: originalList.fromLanguage,
          toLanguage: originalList.toLanguage,
          words: originalList.words,
          createdAt: new Date(newList.created_at),
          updatedAt: new Date(newList.updated_at),
          forks: 0,
          rating: 0
        }, ...state.lists]
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fork list';
      set({ error: message });
      throw new Error(message);
    } finally {
      set({ loading: false });
    }
  }
}));