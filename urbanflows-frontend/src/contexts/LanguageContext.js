'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext(undefined); // Đặt giá trị mặc định là undefined

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('vi');

  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}