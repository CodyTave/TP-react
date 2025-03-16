import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useLocalStorage("appLanguage", "fr");

  const translations = {
    fr: { searchPlaceholder: "Rechercher un produit...", reload: "Recharger" },
    en: { searchPlaceholder: "Search for a product...", reload: "Reload" },
  };

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "fr" ? "en" : "fr"));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
