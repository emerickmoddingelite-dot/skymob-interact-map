'use client';

import { useState } from 'react';

interface AdminAuthProps {
  onLogin: () => void;
  onLogout: () => void;
  isLoggedIn: boolean;
}

export default function AdminAuth({ onLogin, onLogout, isLoggedIn }: AdminAuthProps) {
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mot de passe admin simple (à changer pour la production)
    if (password === '9=2BFd29[nd{rZ') {
      onLogin();
      setShowLogin(false);
      setPassword('');
      setError('');
    } else {
      setError('Mot de passe incorrect');
    }
  };

  if (isLoggedIn) {
    return (
      <button
        onClick={onLogout}
        className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors font-medium"
      >
        🚪 Déconnexion Admin
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowLogin(!showLogin)}
        className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors font-medium"
      >
        🔐 Admin
      </button>

      {showLogin && (
        <div className="absolute top-full right-0 mt-2 bg-white/95 backdrop-blur rounded-lg p-4 shadow-xl z-50 w-64">
          <h3 className="text-lg font-bold text-gray-800 mb-3">Connexion Admin</h3>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
            />
            {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors font-medium"
              >
                Connexion
              </button>
              <button
                type="button"
                onClick={() => setShowLogin(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg transition-colors font-medium"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
