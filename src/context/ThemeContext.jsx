import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext(null);

const STORAGE_KEY = 'pmo-theme';
const DARK = 'dark';
const LIGHT = 'light';

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) || LIGHT; }
    catch { return LIGHT; }
  });

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, theme); } catch {}
    document.documentElement.classList.toggle('theme-dark', theme === DARK);
    document.documentElement.classList.toggle('theme-light', theme === LIGHT);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setThemeState(prev => prev === DARK ? LIGHT : DARK);
  }, []);

  const isDark = theme === DARK;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}