// src/contexts/ThemeContext.jsx
import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    colorPrimary: '#ff6347',
    colorSecondary: '#ffa500',
    colorText: '#555555',
    colorBgContainer: '#fafafa',
    colorLink: '#1890ff',
    borderColor: '#e8e8e8',
  });

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
