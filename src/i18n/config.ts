
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import all translations
import enShipping from './en/shipping.json';
import enCommon from './en/common.json';
import enAnalysis from './en/analysis.json';
import esShipping from './es/shipping.json';
import esCommon from './es/common.json';
import esAnalysis from './es/analysis.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        shipping: enShipping,
        common: enCommon,
        analysis: enAnalysis,
      },
      es: {
        shipping: esShipping,
        common: esCommon,
        analysis: esAnalysis,
      },
    },
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    defaultNS: 'common',
  });

export default i18n;
