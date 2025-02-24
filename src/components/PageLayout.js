import { useContext } from "react";
import LanguageContext from "../contexts/LanguageContext.js";

function PageLayout({ titleFr, titleEn, children }) {
  const { lang } = useContext(LanguageContext);
  return (
    <div>
      <h1 className="page-title">{lang === "fr" ? titleFr : titleEn}</h1>;
      <div className="page-wrapper">
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
}

export default PageLayout;
