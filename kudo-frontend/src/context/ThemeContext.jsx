import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false; // Default to light mode
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: {
      primary: isDarkMode ? '#3b82f6' : '#3b82f6', // Blue
      secondary: isDarkMode ? '#64748b' : '#64748b', // Gray
      background: isDarkMode ? '#0f172a' : '#ffffff', // Dark blue / White
      surface: isDarkMode ? '#1e293b' : '#f8fafc', // Lighter dark / Light gray
      card: isDarkMode ? '#334155' : '#ffffff', // Card color
      text: isDarkMode ? '#f1f5f9' : '#1e293b', // Text color
      textSecondary: isDarkMode ? '#94a3b8' : '#64748b', // Secondary text
      border: isDarkMode ? '#475569' : '#e2e8f0', // Border color
      success: isDarkMode ? '#10b981' : '#059669', // Green
      error: isDarkMode ? '#ef4444' : '#dc2626', // Red
      warning: isDarkMode ? '#f59e0b' : '#d97706', // Orange
      info: isDarkMode ? '#06b6d4' : '#0891b2', // Cyan
    },
    shadows: {
      small: isDarkMode 
        ? '0 1px 3px rgba(0, 0, 0, 0.3)'
        : '0 1px 3px rgba(0, 0, 0, 0.1)',
      medium: isDarkMode
        ? '0 4px 6px rgba(0, 0, 0, 0.3)'
        : '0 4px 6px rgba(0, 0, 0, 0.1)',
      large: isDarkMode
        ? '0 10px 15px rgba(0, 0, 0, 0.3)'
        : '0 10px 15px rgba(0, 0, 0, 0.1)',
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}; 