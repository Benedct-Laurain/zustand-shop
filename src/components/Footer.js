import LanguageContext from "../contexts/LanguageContext.js";
import ThemeContext from "../contexts/ThemeContext.js";
import { useContext } from "react";

function Footer() {
  const { theme, setTheme } = useContext(ThemeContext);
  const { lang, setLang } = useContext(LanguageContext);

  const handleChangeLanguage = () => {
    setLang(lang === "en" ? "fr" : "en");
  };
  const handleToggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <footer>
      <div className="footer-lang-switcher">
        <span
          className={`footer-lang-switcher fr ${lang === "fr" && "active"}`}
          onClick={handleChangeLanguage}
        >
          FR
        </span>
        <span
          className={`footer-lang-switcher en ${lang === "en" && "active"}`}
          onClick={handleChangeLanguage}
        >
          EN
        </span>
      </div>
      <div className="footer-theme-switcher" onClick={handleToggleTheme}>
        Changer le thème
      </div>
    </footer>
  );
}

export default Footer;
