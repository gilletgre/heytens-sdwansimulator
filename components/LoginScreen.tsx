import React, { useState } from 'react';
import { Layers, Lock, ArrowRight } from 'lucide-react';
import { TRANSLATIONS } from '../translations';
import { Language } from '../types';

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  // Default language for login screen is French, simpler for now
  const t = TRANSLATIONS['fr'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // HARDCODED PASSWORD - SIMPLE PROTECTION
    if (password === 'Heytens2025') {
      onLogin();
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="bg-black p-8 text-center">
          <div className="inline-flex items-center justify-center p-3 border-2 border-white rounded mb-4">
            <Layers className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-widest uppercase">Heytens</h1>
          <p className="text-gray-400 text-sm mt-2">SD-WAN Configurator</p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe franchisé
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-black focus:border-black transition-colors ${
                    error ? 'border-red-300 bg-red-50 text-red-900 placeholder-red-300' : 'border-gray-300'
                  }`}
                  placeholder="••••••••"
                  autoFocus
                />
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  Mot de passe incorrect.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all"
            >
              Accéder au configurateur
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-400">
              Outil réservé à usage interne. 
              <br />Veuillez contacter le support IT pour obtenir vos accès.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};