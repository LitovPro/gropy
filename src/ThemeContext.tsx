import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { themes, ThemeName, Theme } from './styles/themes';
import { safeLocalStorage } from './utils/security';

interface ThemeContextType {
  currentTheme: Theme;
  themeName: ThemeName;
  setTheme: (themeName: ThemeName) => void;
  availableThemes: ThemeName[];
}

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: themes.light,
  themeName: 'light',
  setTheme: () => {},
  availableThemes: Object.keys(themes) as ThemeName[],
});

const STORAGE_KEY = 'gropy-theme';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeName, setThemeName] = useState<ThemeName>(() => {
    const saved = safeLocalStorage.get(STORAGE_KEY);
    return (saved && saved in themes) ? saved : 'light';
  });

  // Автосохранение темы
  useEffect(() => {
    safeLocalStorage.set(STORAGE_KEY, themeName);
  }, [themeName]);

  const setTheme = (newThemeName: ThemeName) => {
    if (newThemeName in themes) {
      setThemeName(newThemeName);
    }
  };

  const contextValue: ThemeContextType = {
    currentTheme: themes[themeName],
    themeName,
    setTheme,
    availableThemes: Object.keys(themes) as ThemeName[],
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <StyledThemeProvider theme={themes[themeName]}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};