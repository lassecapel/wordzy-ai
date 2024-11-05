import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { useGuestStore } from './guestStore';
import type { User } from '@supabase/supabase-js';

interface GuestUser {
  id: string;
  email: string;
  isGuest: true;
}

interface AuthState {
  user: (User | GuestUser) | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  initialize: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  continueAsGuest: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null,
  initialized: false,

  initialize: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      set({ user, initialized: true, loading: false });

      supabase.auth.onAuthStateChange((_event, session) => {
        set({ user: session?.user ?? null, loading: false });
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Authentication failed',
        loading: false,
        initialized: true
      });
    }
  },

  signIn: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      set({ user: data.user, loading: false });
      useGuestStore.getState().clearAll(); // Clear guest data on sign in
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Sign in failed',
        loading: false 
      });
      throw error;
    }
  },

  signUp: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      set({ user: data.user, loading: false });
      useGuestStore.getState().clearAll(); // Clear guest data on sign up
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Sign up failed',
        loading: false 
      });
      throw error;
    }
  },

  signOut: async () => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ user: null, loading: false });
      useGuestStore.getState().clearAll(); // Clear guest data on sign out
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Sign out failed',
        loading: false 
      });
      throw error;
    }
  },

  continueAsGuest: () => {
    const guestUser: GuestUser = {
      id: `guest-${Date.now()}`,
      email: 'guest@wordwizard.app',
      isGuest: true
    };
    set({ user: guestUser, loading: false });
  }
}));