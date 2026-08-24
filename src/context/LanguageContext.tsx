'use client';

import React, { createContext, useContext, useState } from 'react';
import fr from '@/locales/fr.json';
import en from '@/locales/en.json';

type Language = 'FR' | 'EN';

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, any> = { FR: fr, EN: en };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('FR');

  const toggleLang = () => {
    setLang((prev) => (prev === 'FR' ? 'EN' : 'FR'));
  };

  const t = (path: string): string => {
    const keys = path.split('.');
    let current = translations[lang];

    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        return path; // Retourne la clé par défaut si non trouvé
      }
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage doit être utilisé dans LanguageProvider');
  }
  return context;
}