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
        <Stack.Screen name="vpay-tag" options={{ headerShown: false }} />
        <Stack.Screen name="local-bank" options={{ headerShown: false }} />
        <Stack.Screen name="mobile-money" options={{ headerShown: false }} />
        <Stack.Screen
          name="international"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="crypto" options={{ headerShown: false }} />
      </Stack>

      <StatusBar
        style={colorScheme === "dark" ? "light" : "dark"}
        backgroundColor={colorScheme === "dark" ? "#000000" : "#ffffff"}
      />
    </ThemeProvider>
  );
};

export default ActionsLayout;
