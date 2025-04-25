
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { enTranslations } from '../i18n/en';
import { esTranslations } from '../i18n/es';
import { Language, LanguageContextType } from '../i18n/types';

const translations = {
  en: enTranslations,
  es: esTranslations,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Updated t function to handle nested objects with dot notation
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    // Navigate through nested objects based on dot notation
    for (const k of keys) {
      if (!value || typeof value !== 'object') {
        return key; // Return the key if the path doesn't exist
      }
      value = value[k];
    }

    // Return the value if it's a string, otherwise return the key
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
