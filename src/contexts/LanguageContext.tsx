
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { enTranslations } from '../i18n/en';
import { esTranslations } from '../i18n/es';
import { Language, LanguageContextType } from '../i18n/types';

const translations = {
  en: enTranslations,
  es: esTranslations,
};

// Create the context with undefined as the initial value
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Simple translation function that gets a value by key
  const t = (key: string): string => {
    const keys = key.split('.');
    let result: any = translations[language];
    
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        return key; // Return the key if translation not found
      }
    }
    
    return typeof result === 'string' ? result : key;
  };

  // Create the context value object
  const contextValue: LanguageContextType = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook that makes sure the context is being used within a provider
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
