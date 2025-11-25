import React from "react";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import toastConfig from "@/config/toastConfig";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContexts";
import { Colors } from "@/constants/Colors";

const AuthLayout = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <ThemeProvider>
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
        style={isDark ? "light" : "dark"}
        backgroundColor={isDark ? Colors.dark.background : Colors.light.background}
      />
    </ThemeProvider>
  );
};

export default AuthLayout;
