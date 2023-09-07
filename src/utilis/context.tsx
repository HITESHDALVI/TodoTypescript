import {createContext, useContext, useState} from "react";
import {childrenType} from "./context-type";
export type Theme = boolean;
export type ThemeContextType = {
  theme: Theme;
  changeTheme: () => void;
};
export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({children}: childrenType) => {
  const [themeMode, setThemeMode] = useState<Theme>(true);
  const toggleTheme = () => {
    setThemeMode(!themeMode);
  };
  return (
    <ThemeContext.Provider value={{theme: themeMode, changeTheme: toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
