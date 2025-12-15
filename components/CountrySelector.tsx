import React from 'react';
import { MapPin, Globe } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface CountrySelectorProps {
  onSelect: (countryCode: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const CountrySelector: React.FC<CountrySelectorProps> = ({ onSelect, language, setLanguage }) => {
  const t = TRANSLATIONS[language];
  
  const countries = [
    { code: 'BE', name: 'Belgique', active: true },
    { code: 'FR', name: 'France', active: true },
    { code: 'LU', name: 'Luxembourg', active: true },
    { code: 'CH', name: 'Suisse', active: true },
  ];

  return (
    <div className="space-y-10 animate-fade-in relative">
      {/* Language Selector */}
      <div className="absolute top-0 right-0 flex space-x-2 z-10">
        {(['fr', 'nl', 'en'] as Language[]).map((lang) => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
              language === lang 
                ? 'bg-black text-white shadow-md transform scale-105' 
                : 'bg-white/80 text-gray-600 hover:bg-white hover:shadow-sm backdrop-blur-sm'
            }`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Video Banner "Wow Effect" */}
      <div className="pt-8">
        <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-2xl shadow-2xl group transition-all duration-500 hover:shadow-3xl">
           <video
             className="absolute inset-0 w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-[2000ms] ease-out"
             autoPlay 
             loop 
             muted 
             playsInline
             src="https://www.heytens.com/content/uploads/2025/11/MASTER_1920x1080_Thermique_15s-1.mp4"
           />
           {/* Dark Overlay for Text Readability */}
           <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/60 to-transparent flex flex-col items-center justify-center text-white text-center px-4">
              <div className="transform translate-y-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                 <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-3 drop-shadow-lg">{t.welcome}</h2>
                 <p className="text-lg md:text-xl opacity-95 font-light drop-shadow-md">{t.select_country}</p>
              </div>
           </div>
        </div>
      </div>

      {/* Country Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto transform translate-y-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
        {countries.map((country) => (
          <button
            key={country.code}
            onClick={() => onSelect(country.code)}
            disabled={!country.active}
            className={`
              relative p-6 rounded-xl border-2 transition-all duration-300 flex items-center justify-start text-left group
              ${country.active 
                ? 'border-gray-100 bg-white hover:border-black hover:shadow-xl hover:-translate-y-1' 
                : 'border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed'}
            `}
          >
            <div className={`
              w-12 h-12 rounded-full flex items-center justify-center mr-4 transition-all duration-300 shadow-sm
              ${country.active ? 'bg-gray-100 group-hover:bg-black group-hover:text-white group-hover:scale-110' : 'bg-gray-100 text-gray-400'}
            `}>
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-xl font-bold text-gray-900 group-hover:text-black">{country.name}</span>
              <span className={`text-sm transition-colors ${country.active ? 'text-gray-500 group-hover:text-gray-700' : 'text-gray-400'}`}>
                {country.active ? t.access_config : t.soon}
              </span>
            </div>
            
            {/* Subtle arrow indicator appearing on hover */}
            {country.active && (
                <div className="absolute right-6 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </div>
            )}
          </button>
        ))}
      </div>

      <div className="text-center mt-12 text-sm text-gray-400 animate-fade-in" style={{ animationDelay: '1s' }}>
        <p className="flex items-center justify-center">
          <MapPin className="w-4 h-4 mr-1" />
          Configuration régionale version 1.0
        </p>
      </div>
    </div>
  );
};