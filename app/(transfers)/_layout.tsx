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
        <Stack.Screen name="vpay-tag" options={{ headerShown: false }} />
        <Stack.Screen name="local-bank" options={{ headerShown: false }} />
        <Stack.Screen name="mobile-money" options={{ headerShown: false }} />
        <Stack.Screen name="international" options={{ headerShown: false }} />
        <Stack.Screen name="crypto" options={{ headerShown: false }} />
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
