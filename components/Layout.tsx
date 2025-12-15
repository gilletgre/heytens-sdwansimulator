import React from 'react';
import { Layers } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface LayoutProps {
  children: React.ReactNode;
  currentStep: number;
  language: Language;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentStep, language }) => {
  const t = TRANSLATIONS[language];
  const STEPS = t.steps;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="heytens-black text-white py-4 px-6 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Simple logo representation matching Heytens minimal style */}
            <div className="border-2 border-white p-1">
               <Layers className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold tracking-widest uppercase">Heytens</span>
          </div>
          <div className="text-sm text-gray-400">
             SD-WAN Configurator
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-300 -z-0"></div>
            <div 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-black transition-all duration-300 -z-0"
              style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
            ></div>
            {STEPS.map((step: string, index: number) => {
                const isActive = index <= currentStep;
                const isCurrent = index === currentStep;
                return (
                  <div key={step} className="flex flex-col items-center z-10 bg-gray-100 px-2">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-300 ${
                        isActive ? 'bg-black text-white' : 'bg-gray-300 text-gray-500'
                      } ${isCurrent ? 'ring-4 ring-gray-200' : ''}`}
                    >
                      {index + 1}
                    </div>
                    <span className={`text-xs mt-2 font-medium ${isActive ? 'text-black' : 'text-gray-400'}`}>
                      {step}
                    </span>
                  </div>
                );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow max-w-4xl mx-auto w-full px-6 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-6 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} Heytens. Configuration tool for internal use.</p>
      </footer>
    </div>
  );
};