import { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext.js";

const Main = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  return <main className={`main theme-${theme}`}>{children}</main>;
};

export default Main;
