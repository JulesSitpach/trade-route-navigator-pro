
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'title': 'Global Trade Strategy Navigator',
    'subtitle': 'Diversify your trade routes, strengthen your business future',
    'product.details': 'Product Details',
    'shipping.details': 'Shipping Details',
    'button.calculate': 'Calculate Trade Analysis',
    'analysis.title': 'Trade Analysis Results',
    'analysis.costs': 'Cost Breakdown',
    'analysis.routes': 'Alternative Routes',
    'analysis.tariffs': 'Tariff Analysis',
    'analysis.regulations': 'Regulations',
    'analysis.visualizations': 'Visualizations',
  },
  es: {
    'title': 'Navegador de Estrategia Comercial Global',
    'subtitle': 'Diversifica tus rutas comerciales, fortalece el futuro de tu negocio',
    'product.details': 'Detalles del Producto',
    'shipping.details': 'Detalles de Envío',
    'button.calculate': 'Calcular Análisis Comercial',
    'analysis.title': 'Resultados del Análisis Comercial',
    'analysis.costs': 'Desglose de Costos',
    'analysis.routes': 'Rutas Alternativas',
    'analysis.tariffs': 'Análisis de Aranceles',
    'analysis.regulations': 'Regulaciones',
    'analysis.visualizations': 'Visualizaciones',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
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
