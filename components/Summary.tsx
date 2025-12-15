import React, { useState } from 'react';
import { ContactInfo, TechAvailability, Language } from '../types';
import { DB, HIDDEN_ITEM_TYPES } from '../constants';
import { Mail, Printer, CheckCircle, AlertCircle, Loader2, RefreshCcw } from 'lucide-react';
import { TRANSLATIONS } from '../translations';

interface SummaryProps {
  contact: ContactInfo;
  profileId: string | null;
  availability: TechAvailability;
  onBack: () => void;
  onReset: () => void;
  country: string;
  language: Language;
}

// Helper to encode data for Netlify
const encode = (data: any) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export const Summary: React.FC<SummaryProps> = ({ contact, profileId, availability, onBack, onReset, country, language }) => {
  const t = TRANSLATIONS[language];
  const profile = DB.profiles.find(p => p.profile_id === profileId);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  if (!profile) return null;

  // Calculate Display Price (Connectivity Only)
  const lines = DB.profile_lines.filter(l => l.profile_id === profile.profile_id);
  const visibleLines = lines.filter(l => !HIDDEN_ITEM_TYPES.includes(l.item_type));
  const displayedMonthly = visibleLines.reduce((sum, line) => sum + line.monthly, 0);
  const displayedOneTime = visibleLines.reduce((sum, line) => sum + line.one_time, 0);

  const profileNameTranslated = t.profiles[profile.profile_id] || profile.profile_name;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus('submitting');

    const formData = {
        "form-name": "sdwan-request",
        ...contact,
        country: country,
        selectedProfile: profileNameTranslated,
        availability: availability,
        // Include raw price data just in case
        monthlyPrice: displayedMonthly.toFixed(2),
        oneTimePrice: displayedOneTime.toFixed(2)
    };

    try {
        await fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode(formData)
        });
        
        setSubmissionStatus('success');
        
        // Also open mail client as a backup/record for the user
        setTimeout(() => {
            generateEmail();
        }, 1500);

    } catch (error) {
        console.error("Form submission error:", error);
        setSubmissionStatus('error');
    }
  };

  const generateEmail = () => {
    const subject = `Demande SD-WAN Heytens - ${contact.companyName} (${country})`;
    
    // Prepare Full Breakdown for Email (Always show prices in email for Head Office)
    const linesBreakdown = lines.map(l => ` - [${l.item_type}] ${l.description}: ${l.monthly.toFixed(2)}€/mois`).join('\n');
    const sla = DB.profile_sla.find(s => s.profile_id === profile.profile_id);

    const body = `
Bonjour,

Voici une nouvelle demande de configuration SD-WAN pour un franchisé Heytens.

PAYS: ${country}

INFORMATIONS CLIENT
-------------------
Société: ${contact.companyName}
ID Proximus: ${contact.proximusId}
TVA: ${contact.vatNumber}
Adresse: ${contact.siteAddress}
Contact Admin: ${contact.adminContact}
Mobile: ${contact.mobile}
Email: ${contact.email}
Contact Tech: ${contact.techContact}

ELIGIBILITÉ
-----------
Statut Fibre: ${availability === TechAvailability.FIBER ? 'Disponible' : availability === TechAvailability.NOT_REQUIRED ? 'Non Requis (Hors BE)' : 'Non disponible (Cuivre uniquement)'}

OFFRE SÉLECTIONNÉE (VUE FRANCHISÉ)
----------------------------------
Profil: ${profileNameTranslated}
Mensuel Connectivité: ${displayedMonthly.toFixed(2)} €
One-off Connectivité: ${displayedOneTime.toFixed(2)} €

DÉTAILS TECHNIQUES COMPLETS (INTERNE)
-------------------------------------
Total Mensuel Réel: ${profile.subtotal_monthly.toFixed(2)} €
Total One-off Réel: ${profile.subtotal_one_time.toFixed(2)} €

Détail des lignes:
${linesBreakdown}

SLA: ${sla ? sla.sla_name + ' (' + sla.coverage + ')' : 'N/A'}

Merci de procéder à la validation et à l'encodage.
    `.trim();

    window.location.href = `mailto:support@heytens-it.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  if (submissionStatus === 'success') {
      return (
        <div className="bg-green-50 border border-green-200 rounded-lg p-10 text-center animate-fade-in">
            <div className="flex justify-center mb-4">
                <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">{t.success_title}</h2>
            <p className="text-green-700 mb-6">{t.success_desc}</p>
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                <button 
                    onClick={() => window.print()}
                    className="px-6 py-2 bg-white border border-green-300 text-green-700 rounded hover:bg-green-50 flex items-center justify-center"
                >
                    <Printer className="w-4 h-4 mr-2" />
                    {t.print}
                </button>
                <button 
                    onClick={onReset}
                    className="px-6 py-2 heytens-black text-white rounded hover:bg-gray-800 flex items-center justify-center"
                >
                    <RefreshCcw className="w-4 h-4 mr-2" />
                    {t.new_request}
                </button>
            </div>
        </div>
      );
  }

  return (
    <div className="space-y-8">
       <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">{t.summary_title}</h2>
        <p className="text-gray-500">{t.summary_subtitle}</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
           <h3 className="font-bold text-gray-800">{t.details_offer}</h3>
        </div>
        <div className="p-6">
           <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium">{profileNameTranslated}</span>
              <span className="text-xl font-bold">
                 {displayedMonthly.toFixed(2)} €<span className="text-sm font-normal text-gray-500">{t.month}</span>
              </span>
           </div>
           <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-4">
                <span>{t.install_fees}</span>
                <span>{displayedOneTime.toFixed(2)} €</span>
           </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
         <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
           <h3 className="font-bold text-gray-800">{t.details_contact}</h3>
        </div>
        <div className="p-6 grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="block text-gray-500">{t.summary_company}</span>
              <span className="font-medium">{contact.companyName}</span>
            </div>
            <div>
              <span className="block text-gray-500">{t.summary_prox_id}</span>
              <span className="font-medium">{contact.proximusId}</span>
            </div>
            <div>
              <span className="block text-gray-500">{t.summary_contact}</span>
              <span className="font-medium">{contact.adminContact}</span>
            </div>
            <div>
               <span className="block text-gray-500">{t.summary_mobile}</span>
               <span className="font-medium">{contact.mobile}</span>
             </div>
             <div>
              <span className="block text-gray-500">{t.summary_email}</span>
              <span className="font-medium">{contact.email}</span>
            </div>
             <div className="col-span-2">
              <span className="block text-gray-500">{t.summary_address}</span>
              <span className="font-medium">{contact.siteAddress}</span>
            </div>
        </div>
      </div>
      
      {submissionStatus === 'error' && (
          <div className="bg-red-50 border border-red-200 p-4 rounded text-red-700 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              {t.error_desc}
          </div>
      )}

      <div className="flex justify-between items-center pt-4">
        <button
          onClick={onBack}
          disabled={submissionStatus === 'submitting'}
          className="text-gray-600 font-medium hover:text-black transition-colors disabled:opacity-50"
        >
          {t.edit}
        </button>
        
        <div className="flex space-x-4">
            <button 
                onClick={() => window.print()}
                disabled={submissionStatus === 'submitting'}
                className="px-4 py-3 border border-gray-300 rounded text-gray-700 font-medium hover:bg-gray-50 flex items-center disabled:opacity-50"
            >
                <Printer className="w-4 h-4 mr-2" /> {t.print}
            </button>
            <button
                onClick={handleSubmit}
                disabled={submissionStatus === 'submitting'}
                className="px-6 py-3 rounded text-white font-medium heytens-black hover:bg-gray-800 flex items-center shadow-lg disabled:bg-gray-400 min-w-[200px] justify-center"
            >
                {submissionStatus === 'submitting' ? (
                    <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {t.sending}
                    </>
                ) : (
                    <>
                        <Mail className="w-4 h-4 mr-2" /> {t.send}
                    </>
                )}
            </button>
        </div>
      </div>
    </div>
  );
};