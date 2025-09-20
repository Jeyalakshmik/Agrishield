'use client';
import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import en from '@/locales/en.json';
import ta from '@/locales/ta.json';
import fr from '@/locales/fr.json';
import ja from '@/locales/ja.json';

type Translations = typeof en;
type Language = 'en' | 'ta' | 'fr' | 'ja';

const translationsData: { [key in Language]: Translations } = { en, ta, fr, ja };

interface LanguageContextType {
  language: Language;
  translations: Translations;
  setLanguage: (language: Language) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  translations: en,
  setLanguage: () => {},
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['en', 'ta', 'fr', 'ja'].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  }, []);

  const contextValue = {
    language,
    translations: translationsData[language],
    setLanguage,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};
