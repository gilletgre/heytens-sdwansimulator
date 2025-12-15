import React from 'react';
import { ExternalLink, CheckCircle, AlertTriangle, Layers, Globe } from 'lucide-react';
import { TechAvailability, Language } from '../types';
import { PROXIMUS_CHECK_URL } from '../constants';
import { TRANSLATIONS } from '../translations';

interface AvailabilityCheckProps {
  availability: TechAvailability;
  setAvailability: (status: TechAvailability) => void;
  onNext: () => void;
  onBack: () => void;
  onSelectSpecialProfiles: () => void;
  country: string;
  language: Language;
}

export const AvailabilityCheck: React.FC<AvailabilityCheckProps> = ({ 
  availability, 
  setAvailability, 
  onNext, 
  onBack,
  onSelectSpecialProfiles,
  country,
  language
}) => {
  const t = TRANSLATIONS[language];

  // Logic for Non-Belgium countries
  const isBelgium = country === 'BE';
  
  if (!isBelgium) {
      return (
        <div className="space-y-8 animate-fade-in">
             <div className="text-center mb-4">
                <h2 className="text-2xl font-bold mb-2">{t.check_title}</h2>
                <p className="text-gray-500">
                {t.check_not_required_desc}
                </p>
            </div>

            <div className="bg-white border border-gray-200 p-8 rounded-lg flex flex-col items-center justify-center text-center">
                <Globe className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-bold mb-2">{t.check_not_required}</h3>
                <p className="text-gray-500 mb-6">{country === 'LU' ? 'Luxembourg' : country === 'FR' ? 'France' : 'Suisse'}</p>
                <button
                    onClick={() => {
                        setAvailability(TechAvailability.NOT_REQUIRED);
                        onNext();
                    }}
                    className="px-8 py-3 heytens-black text-white rounded font-medium hover:bg-gray-800 transition-colors"
                >
                    {t.see_offers}
                </button>
            </div>

            <div className="flex justify-start pt-4">
                <button
                onClick={onBack}
                className="px-6 py-3 text-gray-600 font-medium hover:text-black transition-colors"
                >
                {t.back}
                </button>
            </div>
        </div>
      );
  }

  // Standard Belgium Logic
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold mb-2">{t.check_title}</h2>
        <p className="text-gray-500">
          {t.check_subtitle}
        </p>
      </div>

      {/* Step 1: External Link */}
      <div className="bg-blue-50 border border-blue-100 p-6 rounded-lg">
        <h3 className="font-semibold text-lg text-blue-900 mb-2 flex items-center">
          <span className="bg-blue-200 text-blue-800 w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2">1</span>
          {t.test_step_1}
        </h3>
        <p className="text-sm text-blue-800 mb-4">
          {t.test_desc}
        </p>
        <a 
          href={PROXIMUS_CHECK_URL} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          {t.open_test} <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      </div>

      {/* Step 2: Declaration */}
      <div className="bg-white border border-gray-200 p-6 rounded-lg">
         <h3 className="font-semibold text-lg text-gray-900 mb-4 flex items-center">
          <span className="bg-gray-200 text-gray-800 w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2">2</span>
          {t.test_step_2}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setAvailability(TechAvailability.FIBER)}
            className={`p-4 border-2 rounded-lg flex flex-col items-center justify-center text-center transition-all ${
              availability === TechAvailability.FIBER 
                ? 'border-green-500 bg-green-50 ring-1 ring-green-500' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <CheckCircle className={`h-8 w-8 mb-2 ${availability === TechAvailability.FIBER ? 'text-green-600' : 'text-gray-400'}`} />
            <span className="font-bold block">{t.fiber_avail}</span>
            <span className="text-xs text-gray-500 mt-1">{t.fiber_avail_desc}</span>
          </button>

          <button
            onClick={() => setAvailability(TechAvailability.COPPER_ONLY)}
            className={`p-4 border-2 rounded-lg flex flex-col items-center justify-center text-center transition-all ${
              availability === TechAvailability.COPPER_ONLY
                ? 'border-orange-500 bg-orange-50 ring-1 ring-orange-500' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
             <AlertTriangle className={`h-8 w-8 mb-2 ${availability === TechAvailability.COPPER_ONLY ? 'text-orange-600' : 'text-gray-400'}`} />
            <span className="font-bold block">{t.copper_avail}</span>
            <span className="text-xs text-gray-500 mt-1">{t.copper_avail_desc}</span>
          </button>
        </div>

        <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">{t.or_text}</span>
            <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <div className="mt-4">
             <button
                onClick={onSelectSpecialProfiles}
                className="w-full p-4 border-2 border-gray-200 rounded-lg flex items-center justify-center text-center hover:border-black hover:bg-gray-50 transition-all group"
            >
                <div className="flex flex-col items-center">
                    <Layers className="h-6 w-6 mb-2 text-gray-600 group-hover:text-black" />
                    <span className="font-bold text-gray-800">{t.other_offers}</span>
                    <span className="text-xs text-gray-500 mt-1">{t.other_offers_desc}</span>
                </div>
            </button>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <button
          onClick={onBack}
          className="px-6 py-3 text-gray-600 font-medium hover:text-black transition-colors"
        >
          {t.back}
        </button>
        <button
          onClick={onNext}
          disabled={availability === TechAvailability.UNKNOWN}
          className={`px-6 py-3 rounded text-white font-medium transition-colors ${
            availability !== TechAvailability.UNKNOWN ? 'heytens-black hover:bg-gray-800' : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          {t.see_offers}
        </button>
      </div>
    </div>
  );
};