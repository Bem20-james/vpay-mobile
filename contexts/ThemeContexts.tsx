import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from "react";
import { useColorScheme as useDeviceColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ThemeType = "light" | "dark" | "auto";

interface ThemeContextType {
  theme: ThemeType;
  actualTheme: "light" | "dark";
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const deviceColorScheme = useDeviceColorScheme();
  const [theme, setThemeState] = useState<ThemeType>("auto");

  // Load saved theme preference on mount
  useEffect(() => {
    loadTheme();
  }, []);

  // Save theme preference whenever it changes
  useEffect(() => {
    saveTheme(theme);
  }, [theme]);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem("app_theme");
      if (savedTheme && ["light", "dark", "auto"].includes(savedTheme)) {
        setThemeState(savedTheme as ThemeType);
      }
    } catch (error) {
      console.error("Error loading theme:", error);
    }
  };

  const saveTheme = async (themeValue: ThemeType) => {
    try {
      await AsyncStorage.setItem("app_theme", themeValue);
    } catch (error) {
      console.error("Error saving theme:", error);
    }
  };

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState((currentTheme) => {
      if (currentTheme === "dark") return "light";
      if (currentTheme === "light") return "auto";
      return "dark";
    });
  };

  // Determine the actual theme to use
  const actualTheme: "light" | "dark" =
    theme === "auto" ? deviceColorScheme || "dark" : theme;

  return (
    <ThemeContext.Provider
      value={{ theme, actualTheme, setTheme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
