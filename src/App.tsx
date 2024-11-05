import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Practice } from './components/practice/Practice';
import { AuthModal } from './components/auth/AuthModal';
import { useAuthStore } from './stores/authStore';

export default function App() {
  const { user, loading, initialized, initialize } = useAuthStore();
  const [showAuth, setShowAuth] = React.useState(false);

  React.useEffect(() => {
    if (!initialized) {
      initialize();
    }
  }, [initialize, initialized]);

  // Show loading spinner while initializing auth
  if (!initialized || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Header onAuthClick={() => setShowAuth(true)} />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/practice/:listId/:type" element={<Practice />} />
          </Routes>
        </main>

        {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      </div>
    </BrowserRouter>
  );
}