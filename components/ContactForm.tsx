import React from 'react';
import { ContactInfo, Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface ContactFormProps {
  data: ContactInfo;
  onChange: (data: ContactInfo) => void;
  onNext: () => void;
  language: Language;
  country: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ data, onChange, onNext, language, country }) => {
  const t = TRANSLATIONS[language];
  const isBelgium = country === 'BE';
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const isFormValid = data.companyName && data.proximusId && data.adminContact && data.email && data.mobile;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">{t.contact_title}</h2>
        <p className="text-gray-500">{t.contact_subtitle}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
           <label className="block text-sm font-medium text-gray-700 mb-1">{t.company_name}</label>
           <input
             type="text"
             name="companyName"
             value={data.companyName}
             onChange={handleChange}
             className="w-full border border-gray-300 rounded-md p-2 focus:ring-black focus:border-black"
             placeholder="Ex: Heytens Bruxelles"
           />
        </div>

        <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">
             {isBelgium ? t.proximus_id : t.proximus_id_na}
           </label>
           <input
             type="text"
             name="proximusId"
             value={data.proximusId}
             onChange={handleChange}
             className="w-full border border-gray-300 rounded-md p-2 focus:ring-black focus:border-black"
             placeholder={isBelgium ? "Ex: 12345678" : "NA"}
           />
        </div>

        <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">{t.vat}</label>
           <input
             type="text"
             name="vatNumber"
             value={data.vatNumber}
             onChange={handleChange}
             className="w-full border border-gray-300 rounded-md p-2 focus:ring-black focus:border-black"
             placeholder="BE 0..."
           />
        </div>

        <div className="md:col-span-2">
           <label className="block text-sm font-medium text-gray-700 mb-1">{t.address}</label>
           <input
             type="text"
             name="siteAddress"
             value={data.siteAddress}
             onChange={handleChange}
             className="w-full border border-gray-300 rounded-md p-2 focus:ring-black focus:border-black"
             placeholder="Rue de la Station 1, 1000 Bruxelles"
           />
        </div>

        <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">{t.contact_admin}</label>
           <input
             type="text"
             name="adminContact"
             value={data.adminContact}
             onChange={handleChange}
             className="w-full border border-gray-300 rounded-md p-2 focus:ring-black focus:border-black"
           />
        </div>

        <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">{t.email}</label>
           <input
             type="email"
             name="email"
             value={data.email}
             onChange={handleChange}
             className="w-full border border-gray-300 rounded-md p-2 focus:ring-black focus:border-black"
           />
        </div>

        <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">{t.mobile}</label>
           <input
             type="tel"
             name="mobile"
             value={data.mobile}
             onChange={handleChange}
             className="w-full border border-gray-300 rounded-md p-2 focus:ring-black focus:border-black"
             placeholder="+32 ..."
           />
        </div>

        <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">{t.contact_tech}</label>
           <input
             type="text"
             name="techContact"
             value={data.techContact}
             onChange={handleChange}
             className="w-full border border-gray-300 rounded-md p-2 focus:ring-black focus:border-black"
           />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={onNext}
          disabled={!isFormValid}
          className={`px-6 py-3 rounded text-white font-medium transition-colors ${
            isFormValid ? 'heytens-black hover:bg-gray-800' : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          {t.next}
        </button>
      </div>
    </div>
  );
};