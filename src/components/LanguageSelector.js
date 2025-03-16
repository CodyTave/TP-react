import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";

const LanguageSelector = () => {
  const { language, toggleLanguage } = useContext(LanguageContext);

  return (
    <button onClick={toggleLanguage} className="btn btn-primary">
      {language === "fr" ? "Switch to English" : "Passer en Français"}
    </button>
  );
};

export default LanguageSelector;
