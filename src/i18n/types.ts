
export type Language = 'en' | 'es';

export type TranslationKey = keyof typeof import('./en').enTranslations;

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}
