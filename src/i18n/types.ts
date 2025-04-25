
export type Language = 'en' | 'es';

// Define a more flexible return type for the translation function
export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}
