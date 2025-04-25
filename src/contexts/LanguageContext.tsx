
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

  // Enhanced translation function with proper interpolation handling
  const t = useCallback((key: string, options?: Record<string, any>): string => {
    // Use as string to ensure we always return a string type
    // This is necessary because i18n.t can return different types
    const translation = i18n.t(key, options);
    
    // Force the return type to be string to match our interface
    return typeof translation === 'string' ? translation : String(translation);
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
