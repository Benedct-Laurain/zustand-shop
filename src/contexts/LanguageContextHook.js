import { createContext, useState, useContext } from "react";

const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [lang, setLanguage] = useState("fr");

  return (
    <LanguageContext.Provider value={{ lang, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

const useLanguage = () => {
  return useContext(LanguageContext);
};

export { LanguageProvider, useLanguage };
