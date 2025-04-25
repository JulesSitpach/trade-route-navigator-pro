
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Language, LanguageContextType } from '../i18n/types';

// Create the context with undefined as the initial value
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  const { i18n } = useTranslation();
  
  // Function to change language
  const changeLanguage = (lang: Language) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
  };

  // Enhanced translation function with proper namespace handling
  const t = useCallback((key: string): string => {
    // Check if the key contains a namespace prefix (e.g., 'shipping:quantity')
    if (key.includes(':')) {
      const [namespace, actualKey] = key.split(':');
      return i18n.t(actualKey, { ns: namespace });
    }
    // Otherwise use the default namespace
    return i18n.t(key);
  }, [i18n]);

  // Create the context value object
  const contextValue: LanguageContextType = {
    language,
    setLanguage: changeLanguage,
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
