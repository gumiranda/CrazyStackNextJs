/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import "@/application/i18n.config";

import { useTranslation } from "react-i18next";
import { createContext, useContext, useState } from "react";
const I18nContext = createContext({} as any);

export const isBrowser = typeof window !== "undefined";

export const I18nProvider = ({ children }: any) => {
  const { i18n } = useTranslation() || {};
  const [currentLanguage, setCurrentLanguage] = useState(
    formatLanguageFromi18N(i18n?.language as "pt-br" | "en"),
  );
  const changeLanguage = (language: any) => {
    setCurrentLanguage(language);
    i18n?.changeLanguage?.(formatLanguageFromSelect(language));
    localStorage.setItem("language", formatLanguageFromSelect(language));
  };

  return (
    <I18nContext.Provider
      value={{ currentLanguage, setCurrentLanguage, changeLanguage }}
    >
      {children}
    </I18nContext.Provider>
  );
};
export const useI18n = () => {
  if (!isBrowser) {
    return {
      currentLanguage: "pt-br",
      setCurrentLanguage: () => {},
      changeLanguage: () => {},
    };
  }
  return useContext(I18nContext);
};
const countryToLanguage = {
  BR: "pt-br",
  US: "en",
};
const languageToCountry = {
  "pt-br": "BR",
  en: "US",
};
export const formatLanguageFromi18N = (
  language: keyof typeof languageToCountry,
) => languageToCountry[language];
export const formatLanguageFromSelect = (
  language: keyof typeof countryToLanguage,
) => countryToLanguage[language];
