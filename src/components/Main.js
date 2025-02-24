import { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext.js";
import { useTheme } from "../contexts/ThemeContextHook.js";

const Main = ({ children }) => {
  // const { theme } = useContext(ThemeContext);
  const { theme } = useTheme();
  return <main className={`main theme-${theme}`}>{children}</main>;
};

export default Main;
