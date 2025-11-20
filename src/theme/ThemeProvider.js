import React, { createContext, useContext, useState, useEffect } from "react";
import { getThemePreference, saveThemePreference } from "../utils/persistence";

const lightTheme = {
  primary: "#6200EE",
  background: "#F5F5F5",
  card: "#FFFFFF",
  text: "#000000",
  textSecondary: "#666666",
  border: "#E0E0E0",
  error: "#FF4444",
  success: "#4CAF50",
};

const darkTheme = {
  primary: "#BB86FC",
  background: "#121212",
  card: "#1E1E1E",
  text: "#FFFFFF",
  textSecondary: "#AAAAAA",
  border: "#2C2C2C",
  error: "#CF6679",
  success: "#66BB6A",
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    const savedTheme = await getThemePreference();
    if (savedTheme !== null) {
      setIsDark(savedTheme);
    }
  };

  const toggleTheme = async () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    await saveThemePreference(newTheme);
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
