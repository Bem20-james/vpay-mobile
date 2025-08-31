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

const AuthLayout = () => {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen
          name="otp-verification"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
        <Stack.Screen name="reset-password" options={{ headerShown: false }} />
        <Stack.Screen name="login-index" options={{ headerShown: false }} />

        <Stack.Screen name="change-password" options={{ headerShown: false }} />
        <Stack.Screen name="change-pin" options={{ headerShown: false }} />

        <Stack.Screen name="transaction-pin" options={{ headerShown: false }} />
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
        backgroundColor={colorScheme === "dark" ? "#161622" : "#ffffff"}
      />
    </ThemeProvider>
  );
};

export default AuthLayout;
