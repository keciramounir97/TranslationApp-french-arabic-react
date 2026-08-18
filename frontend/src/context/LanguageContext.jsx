import React, { createContext, useState, useEffect, useContext } from "react";

const LanguageContext = createContext();

const translations = {
  fr: {
    appTitle: "Google Traduction",
    translate: "Traduire",
    history: "Historique",
    favorites: "Favoris",
    dictionary: "Dictionnaire",
    login: "Connexion",
    register: "Inscription",
    logout: "Déconnexion",
    settings: "Paramètres",
    sourcePlaceholder: "Saisissez votre texte à traduire...",
    translationPlaceholder: "La traduction s'affichera ici...",
    swapLanguages: "Inverser les langues",
    copy: "Copier",
    copied: "Copié !",
    listen: "Écouter",
    clear: "Effacer",
    saveFavorite: "Ajouter aux favoris",
    removeFavorite: "Retirer des favoris",
    searchHistory: "Rechercher dans l'historique...",
    clearHistory: "Vider l'historique",
    searchWord: "Rechercher un mot dans le dictionnaire...",
    lookup: "Rechercher",
    themeLight: "Mode Clair",
    themeDark: "Mode Sombre",
    langFR: "Français",
    langEN: "English",
    langAR: "العربية",
  },
  en: {
    appTitle: "Google Translate",
    translate: "Translate",
    history: "History",
    favorites: "Favorites",
    dictionary: "Dictionary",
    login: "Sign In",
    register: "Sign Up",
    logout: "Log Out",
    settings: "Settings",
    sourcePlaceholder: "Enter text to translate...",
    translationPlaceholder: "Translation will appear here...",
    swapLanguages: "Swap languages",
    copy: "Copy",
    copied: "Copied!",
    listen: "Listen",
    clear: "Clear",
    saveFavorite: "Save to favorites",
    removeFavorite: "Remove from favorites",
    searchHistory: "Search history...",
    clearHistory: "Clear history",
    searchWord: "Search word in dictionary...",
    lookup: "Lookup",
    themeLight: "Light Mode",
    themeDark: "Dark Mode",
    langFR: "Français",
    langEN: "English",
    langAR: "العربية",
  },
  ar: {
    appTitle: "تطبيق الترجمة",
    translate: "ترجمة",
    history: "السجل",
    favorites: "المفضلة",
    dictionary: "القاموس",
    login: "تسجيل الدخول",
    register: "إنشاء حساب",
    logout: "تسجيل الخروج",
    settings: "الإعدادات",
    sourcePlaceholder: "أدخل النص للترجمة...",
    translationPlaceholder: "ستظهر الترجمة هنا...",
    swapLanguages: "تبديل اللغات",
    copy: "نسخ",
    copied: "تم النسخ!",
    listen: "استماع",
    clear: "مسح",
    saveFavorite: "حفظ في المفضلة",
    removeFavorite: "إزالة من المفضلة",
    searchHistory: "البحث في السجل...",
    clearHistory: "مسح السجل",
    searchWord: "ابحث عن كلمة في القاموس...",
    lookup: "بحث",
    themeLight: "الوضع الفاتح",
    themeDark: "الوضع الداكن",
    langFR: "Français",
    langEN: "English",
    langAR: "العربية",
  },
};
export function LanguageProvider({ children }) {
  const [uiLanguage, setUiLanguage] = useState(() => {
    return localStorage.getItem("app_ui_lang") || "fr";
  });

  useEffect(() => {
    localStorage.setItem("app_ui_lang", uiLanguage);
    if (uiLanguage === "ar") {
      document.documentElement.setAttribute("dir", "rtl");
    } else {
      document.documentElement.setAttribute("dir", "ltr");
    }
  }, [uiLanguage]);

  const t = (key) => {
    return (
      (translations[uiLanguage] && translations[uiLanguage][key]) ||
      translations["fr"][key] ||
      key
    );
  };

  return (
    <LanguageContext.Provider value={{ uiLanguage, setUiLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
