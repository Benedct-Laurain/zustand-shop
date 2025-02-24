import { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext.js";
import LanguageContext from "../contexts/LanguageContext.js";
import { useTheme } from "../contexts/ThemeContextHook.js";

function Footer() {
  // const {theme, setTheme} = useContext(ThemeContext);
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang } = useContext(LanguageContext);

  const handleChangeLanguage = (language) => () => {
    setLang(language);
  };
  const handleToggleTheme = () => {
    // setTheme(theme === "light" ? "dark" : "light");
    toggleTheme();
  };
  return (
    <footer>
      <div className="footer-lang-switcher">
        <span
          className={`footer-lang-switcher fr ${lang === "fr" && "active"}`}
          onClick={handleChangeLanguage("fr")}
        >
          FR
        </span>
        <span
          className={`footer-lang-switcher en ${lang === "en" && "active"}`}
          onClick={handleChangeLanguage("en")}
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
