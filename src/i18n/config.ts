
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import English translations
import { generalTranslations as enGeneral } from './en/general';
import { productTranslations as enProduct } from './en/product';
import { shippingTranslations as enShipping } from './en/shipping';
import { analysisTranslations as enAnalysis } from './en/analysis';
import { routeTranslations as enRoutes } from './en/routes';
import { marketTranslations as enMarkets } from './en/markets';
import { tariffTranslations as enTariffs } from './en/tariffs';
import { regulationTranslations as enRegulations } from './en/regulations';

// Import Spanish translations
import { generalTranslations as esGeneral } from './es/general';
import { productTranslations as esProduct } from './es/product';
import { shippingTranslations as esShipping } from './es/shipping';
import { analysisTranslations as esAnalysis } from './es/analysis';
import { routeTranslations as esRoutes } from './es/routes';
import { marketTranslations as esMarkets } from './es/markets';
import { tariffTranslations as esTariffs } from './es/tariffs';
import { regulationTranslations as esRegulations } from './es/regulations';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          ...enGeneral,
          ...enProduct,
          ...enShipping,
          ...enAnalysis,
          ...enRoutes,
          ...enMarkets,
          ...enTariffs,
          ...enRegulations,
        },
      },
      es: {
        translation: {
          ...esGeneral,
          ...esProduct,
          ...esShipping,
          ...esAnalysis,
          ...esRoutes,
          ...esMarkets,
          ...esTariffs,
          ...esRegulations,
        },
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    defaultNS: 'translation',
  });

export default i18n;
