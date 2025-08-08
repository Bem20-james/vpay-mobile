import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from "@react-navigation/native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import toastConfig from "@/config/toastConfig";

const ActionsLayout = () => {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="airtime" options={{ headerShown: false }} />
        <Stack.Screen name="betting" options={{ headerShown: false }} />
        <Stack.Screen name="mobile-data" options={{ headerShown: false }} />
        <Stack.Screen name="cable-tv" options={{ headerShown: false }} />
        <Stack.Screen name="electricity" options={{ headerShown: false }} />
      </Stack>

      <Toast
        position="bottom"
        bottomOffset={50}
        visibilityTime={6000}
        autoHide
        topOffset={50}
        config={toastConfig}
      />

      <StatusBar
        style={colorScheme === "dark" ? "light" : "dark"}
        backgroundColor={colorScheme === "dark" ? "#000000" : "#ffffff"}
      />
    </ThemeProvider>
  );
};

export default ActionsLayout;
