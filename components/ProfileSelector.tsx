import React, { useState } from 'react';
import { DB, HIDDEN_ITEM_TYPES } from '../constants';
import { TechAvailability, Profile, Language } from '../types';
import { ChevronDown, ChevronUp, Check, Info, Wifi, Layers, AlertTriangle } from 'lucide-react';
import { TRANSLATIONS } from '../translations';

interface ProfileSelectorProps {
  availability: TechAvailability;
  selectedProfileId: string | null;
  onSelect: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
  isSpecialProfileMode: boolean;
  country: string;
  language: Language;
}

export const ProfileSelector: React.FC<ProfileSelectorProps> = ({ 
  availability, 
  selectedProfileId, 
  onSelect, 
  onNext, 
  onBack,
  isSpecialProfileMode,
  country,
  language
}) => {
  const t = TRANSLATIONS[language];
  const [expandedProfile, setExpandedProfile] = useState<string | null>(null);

  // --- Filtering Logic ---
  let visibleProfiles: Profile[] = [];
  let categoryTitle = "";
  let categoryIcon = null;
  const isBelgium = country === 'BE';

  if (!isBelgium) {
      // Non-Belgium Logic
      categoryIcon = <Wifi className="w-5 h-5 mr-2" />;
      categoryTitle = t.std_offers;

      if (country === 'LU') {
          // Luxembourg: External + LU specific profiles
          visibleProfiles = DB.profiles.filter(p => 
              ['external_connectivity', 'lu_ic_100', 'lu_ic_500'].includes(p.profile_id)
          );
      } else {
          // FR, CH: External Only
          visibleProfiles = DB.profiles.filter(p => p.profile_id === 'external_connectivity');
      }
  } else {
    // Belgium Logic
    const specialProfileIds = ['dc', 'hq', 'tempo_mobile'];

    if (isSpecialProfileMode) {
        // Mode: Special Profiles Only
        visibleProfiles = DB.profiles.filter(p => specialProfileIds.includes(p.profile_id));
        categoryTitle = t.other_offers;
        categoryIcon = <Layers className="w-5 h-5 mr-2" />;
    } else {
        // Mode: Standard Profiles (Based on Fiber/Copper availability)
        visibleProfiles = DB.profiles.filter(p => {
        // Exclude special profiles
        if (specialProfileIds.includes(p.profile_id)) return false;

        // Exclude LU profiles from BE
        if (p.profile_id.startsWith('lu_')) return false;

        // Always include Single and External in standard flow
        if (['single_connectivity_vdsl_gpon', 'external_connectivity'].includes(p.profile_id)) return true;

        if (availability === TechAvailability.COPPER_ONLY) {
            // Show Copper specifics
            if (['dual_copper', 'dual_connectivity_main_plus_mobile'].includes(p.profile_id)) return true;
            return false;
        }

        if (availability === TechAvailability.FIBER) {
            // Show Fiber specifics
            if (p.profile_id.includes('gpon')) return true;
            return false;
        }
        
        return false;
        });
        categoryTitle = t.std_offers;
        categoryIcon = <Wifi className="w-5 h-5 mr-2" />;
    }
  }

  const toggleDetails = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedProfile(expandedProfile === id ? null : id);
  };

  const getTranslatedProfileName = (profile: Profile) => {
      // Check if translation exists, otherwise fallback to DB name
      return t.profiles[profile.profile_id] || profile.profile_name;
  };

  const renderProfileCard = (profile: Profile) => {
    const isSelected = selectedProfileId === profile.profile_id;
    const isExpanded = expandedProfile === profile.profile_id;
    
    // Get lines for this profile
    const lines = DB.profile_lines.filter(l => l.profile_id === profile.profile_id);
    
    // Filter lines for visibility (Hide CPE, Licenses)
    const visibleLines = lines.filter(l => !HIDDEN_ITEM_TYPES.includes(l.item_type));

    // Calculate "Public Price" (Connectivity Only) based on visible lines
    const displayedMonthly = visibleLines.reduce((sum, line) => sum + line.monthly, 0);
    const displayedOneTime = visibleLines.reduce((sum, line) => sum + line.one_time, 0);
    
    // Get SLA info
    const sla = DB.profile_sla.find(s => s.profile_id === profile.profile_id);

    return (
      <div 
        key={profile.profile_id}
        onClick={() => onSelect(profile.profile_id)}
        className={`border rounded-lg transition-all cursor-pointer bg-white overflow-hidden mb-4 ${
          isSelected ? 'border-black ring-1 ring-black shadow-md' : 'border-gray-200 hover:border-gray-400'
        }`}
      >
        {/* Card Header */}
        <div className="p-5 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${
              isSelected ? 'bg-black border-black' : 'border-gray-300'
            }`}>
              {isSelected && <Check className="w-4 h-4 text-white" />}
            </div>
            <div>
              <h3 className="font-bold text-lg">{getTranslatedProfileName(profile)}</h3>
              {sla && (
                <div className="text-xs text-gray-500 flex items-center mt-1">
                  <span className="bg-gray-100 px-2 py-0.5 rounded">SLA: {sla.coverage}</span>
                  <span className="ml-2 text-gray-400">Réparation: {sla.repair_time_hours}h</span>
                </div>
              )}
            </div>
          </div>

          <div className="text-right">
            <div className="text-xl font-bold">{displayedMonthly.toFixed(2)} € <span className="text-sm font-normal text-gray-500">{t.month}</span></div>
            <div className="text-xs text-gray-400">
            One-time: {displayedOneTime.toFixed(2)} €
            </div>
          </div>
        </div>

        {/* Details Toggle */}
        <div className="px-5 pb-2">
           <button 
            onClick={(e) => toggleDetails(profile.profile_id, e)}
            className="text-xs text-gray-500 hover:text-black flex items-center font-medium"
           >
             {isExpanded ? t.hide_details : t.see_details}
             {isExpanded ? <ChevronUp className="w-3 h-3 ml-1" /> : <ChevronDown className="w-3 h-3 ml-1" />}
           </button>
        </div>

        {/* Details Content */}
        {isExpanded && (
          <div className="bg-gray-50 px-5 py-4 border-t border-gray-100 text-sm">
            <div className="space-y-2">
              {visibleLines.length > 0 ? (
                visibleLines.map((line) => (
                  <div key={line.line_id} className="flex justify-between items-start">
                    <span className="text-gray-600 flex-1">{line.description}</span>
                    <span className="font-medium ml-4 w-20 text-right">
                      {line.monthly > 0 ? `${line.monthly.toFixed(2)} €` : '-'}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-gray-400 italic">Aucun détail supplémentaire visible.</div>
              )}
              
              <div className="mt-4 p-3 bg-blue-50 text-blue-800 rounded text-xs flex items-start">
                <Info className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                <p>{t.price_disclaimer}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">{t.select_profile}</h2>
        <p className="text-gray-500">
          {isSpecialProfileMode 
             ? "Affichage des profils Fibre Dédiée et Mobile."
             : (isBelgium ? t.profile_subtitle_be : t.profile_subtitle_other)
          }
        </p>
      </div>

      <div>
        <div className="flex items-center mb-4 text-gray-800">
            {categoryIcon}
            <h3 className="font-bold text-lg">{categoryTitle}</h3>
        </div>

        {isSpecialProfileMode && (
             <div className="mb-6 bg-orange-50 border border-orange-100 p-4 rounded-lg flex items-start text-sm text-orange-800">
             <AlertTriangle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
             <span>
               <strong>{t.warning_special}</strong>
             </span>
          </div>
        )}

        <div>
            {visibleProfiles.map(renderProfileCard)}
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
          disabled={!selectedProfileId}
          className={`px-6 py-3 rounded text-white font-medium transition-colors ${
            selectedProfileId ? 'heytens-black hover:bg-gray-800' : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          {t.next}
        </button>
      </div>
    </div>
  );
};