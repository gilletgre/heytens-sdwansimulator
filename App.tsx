import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { CountrySelector } from './components/CountrySelector';
import { ContactForm } from './components/ContactForm';
import { AvailabilityCheck } from './components/AvailabilityCheck';
import { ProfileSelector } from './components/ProfileSelector';
import { Summary } from './components/Summary';
import { ContactInfo, TechAvailability, Language } from './types';

function App() {
  const [step, setStep] = useState(0);
  
  // State for Language
  const [language, setLanguage] = useState<Language>('fr');

  // State for Step 0 (Country)
  const [country, setCountry] = useState<string>('');

  // State for Step 1 (Contact)
  const [contactData, setContactData] = useState<ContactInfo>({
    companyName: '',
    proximusId: '',
    vatNumber: '',
    adminContact: '',
    techContact: '',
    mobile: '',
    email: '',
    siteAddress: ''
  });

  // State for Step 2 (Availability)
  const [availability, setAvailability] = useState<TechAvailability>(TechAvailability.UNKNOWN);
  const [isSpecialProfileMode, setIsSpecialProfileMode] = useState<boolean>(false);

  // State for Step 3 (Profile)
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  // Specific handler for Country Selection
  const handleCountrySelect = (code: string) => {
    setCountry(code);
    nextStep();
  };

  // Specific handler for Availability
  const handleStandardAvailability = (status: TechAvailability) => {
    setAvailability(status);
    setIsSpecialProfileMode(false);
    // Don't auto-advance for user UX confirmation, user clicks "Next"
  };

  const handleSpecialProfileSelection = () => {
    setIsSpecialProfileMode(true);
    // Logic: If choosing special profiles, we might treat availability as unknown or irrelevant for display
    // But we advance to the next step
    nextStep();
  };

  return (
    <Layout currentStep={step} language={language}>
      {step === 0 && (
        <CountrySelector 
          onSelect={handleCountrySelect} 
          language={language}
          setLanguage={setLanguage}
        />
      )}

      {step === 1 && (
        <ContactForm 
          data={contactData} 
          onChange={setContactData} 
          onNext={nextStep} 
          language={language}
          country={country}
        />
      )}
      
      {step === 2 && (
        <AvailabilityCheck 
          availability={availability}
          setAvailability={handleStandardAvailability}
          onNext={nextStep}
          onBack={prevStep}
          onSelectSpecialProfiles={handleSpecialProfileSelection}
          country={country}
          language={language}
        />
      )}

      {step === 3 && (
        <ProfileSelector 
          availability={availability}
          selectedProfileId={selectedProfileId}
          onSelect={setSelectedProfileId}
          onNext={nextStep}
          onBack={prevStep}
          isSpecialProfileMode={isSpecialProfileMode}
          country={country}
          language={language}
        />
      )}

      {step === 4 && (
        <Summary 
          contact={contactData}
          profileId={selectedProfileId}
          availability={availability}
          onBack={prevStep}
          country={country}
          language={language}
        />
      )}
    </Layout>
  );
}

export default App;