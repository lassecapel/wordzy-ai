import React from 'react';
import { Sparkles, Star, Moon, LogIn, LogOut, User } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from './LanguageSelector';

interface HeaderProps {
  onAuthClick: () => void;
}

export function Header({ onAuthClick }: HeaderProps) {
  const { user, signOut } = useAuthStore();
  const { t } = useTranslation();

  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-lg rounded-b-3xl mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <div className="relative">
              <Star className="text-primary-400 animate-float" size={32} />
              <Moon className="absolute -top-1 -right-1 text-secondary-400" size={16} />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 text-transparent bg-clip-text">
              WordWizard
            </h1>
          </Link>
          
          <div className="flex items-center gap-4">
            <LanguageSelector />
            
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <User size={20} className="text-primary-500" />
                  <span className="text-sm font-medium text-gray-700">{user.email}</span>
                </div>
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  <LogOut size={16} />
                  {t('auth.signOut')}
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-colors"
              >
                <LogIn size={16} />
                {t('auth.signIn')}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}