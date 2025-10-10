import React, { createContext, useContext, useState, useEffect } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { lightTheme, darkTheme, oceanTheme, forestTheme, Theme } from './styles/themes'

type ThemeName = 'light' | 'dark' | 'ocean' | 'forest'

interface ThemeContextType {
  theme: Theme
  themeName: ThemeName
  setTheme: (name: ThemeName) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const themes = {
  light: lightTheme,
  dark: darkTheme,
  ocean: oceanTheme,
  forest: forestTheme,
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [themeName, setThemeName] = useState<ThemeName>(() => {
    // Initialize with light theme by default
    return 'light'
  })

  const theme = themes[themeName]

  const setTheme = (name: ThemeName) => {
    setThemeName(name)
    try {
      localStorage.setItem('gropy-theme', name)
    } catch {
      // Ignore localStorage errors
    }
  }

  useEffect(() => {
    // Load theme from localStorage after component mounts
    try {
      const saved = localStorage.getItem('gropy-theme')
      if (saved && themes[saved as ThemeName]) {
        setThemeName(saved as ThemeName)
      }
    } catch {
      // Ignore localStorage errors
    }
  }, [])

  useEffect(() => {
    // Apply theme to document for CSS custom properties
    document.documentElement.setAttribute('data-theme', themeName)
  }, [themeName])

  return (
    <ThemeContext.Provider value={{ theme, themeName, setTheme }}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
