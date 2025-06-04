import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from "@react-navigation/native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Stack } from "expo-router";

const ActionsLayout = () => {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="airtime" options={{ headerShown: false }} />
        <Stack.Screen name="betting" options={{ headerShown: false }} />
        <Stack.Screen name="pay-bills" options={{ headerShown: false }} />
        <Stack.Screen name="mobile-data" options={{ headerShown: false }} />
        <Stack.Screen name="cable-tv" options={{ headerShown: false }} />
        <Stack.Screen name="electricity" options={{ headerShown: false }} />
      </Stack>

      <StatusBar
        style={colorScheme === "dark" ? "light" : "dark"}
        backgroundColor={colorScheme === "dark" ? "#000000" : "#ffffff"}
      />
    </ThemeProvider>
  );
};

export default ActionsLayout;
