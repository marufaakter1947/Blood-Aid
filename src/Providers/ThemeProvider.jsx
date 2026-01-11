import { useEffect, useState } from "react";
import ThemeContext from "./ThemeContext";


const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggleTheme = () => {
    // const checked = e.currentTarget.checked;
    setTheme(theme==="light" ? "dark" : "light");
    // console.log(e.currentTarget)
  };
console.log({theme})

  return (
    <>
      <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>
    </>
  );
};

export default ThemeProvider;