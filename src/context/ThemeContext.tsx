import React, { createContext, useContext, useState, useEffect } from 'react';
import { theme } from '../styles/theme';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  currentTheme: typeof theme.light | typeof theme.dark;
}

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {},
  currentTheme: theme.light,
});

const readSavedDarkMode = () => {
  if (typeof window === 'undefined') return false;
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') return true;
  if (savedTheme === 'light') return false;
  return false;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(readSavedDarkMode);
  const currentTheme = isDarkMode ? theme.dark : theme.light;

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    document.documentElement.style.backgroundColor = currentTheme.bg.primary;
    document.body.style.backgroundColor = currentTheme.bg.primary;
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode, currentTheme.bg.primary]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// This hook intentionally shares the provider module's private context.
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);
