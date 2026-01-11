import { useContext } from "react";
import ThemeContext from "../Providers/ThemeContext";

const useTheme = () => {
  return useContext(ThemeContext);
};

export default useTheme;