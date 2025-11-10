import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { PortalProvider } from "@gorhom/portal";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import toastConfig from "@/config/toastConfig";
import UserContextProvider from "@/contexts/UserContexts";
import { LoaderProvider } from "@/contexts/LoaderContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    Questrial: require("../assets/fonts/Questrial-Regular.ttf"),
    "Inter-Black": require("../assets/fonts/Inter-Black.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
    "Inter-ExtraBold": require("../assets/fonts/Inter-ExtraBold.ttf"),
    "Inter-ExtraLight": require("../assets/fonts/Inter-ExtraLight.ttf"),
    "Inter-Italic": require("../assets/fonts/Inter-Italic.ttf"),
    "Inter-Light": require("../assets/fonts/Inter-Light.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
    "Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Thin": require("../assets/fonts/Inter-Thin.ttf")
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  const queryClient = new QueryClient();

  return (
    <UserContextProvider>
      <GestureHandlerRootView>
        <QueryClientProvider client={queryClient}>
          <LoaderProvider>
            <BottomSheetModalProvider>
              <PortalProvider>
                <ThemeProvider
                  value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
                >
                  <Stack>
                    <Stack.Screen
                      name="index"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="onboarding"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="(tabs)"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="(auth)"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="(actions)"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="(user)"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="(transfers)"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="(cards)"
                      options={{ headerShown: false }}
                    />

                    <Stack.Screen
                      name="notifications"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="transactions"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="verification"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="transaction-limit"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen name="+not-found" />
                    <Stack.Screen
                      name="transaction-failed"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="transaction-success"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="setup-2FA"
                      options={{ headerShown: false }}
                    />
                  </Stack>

                  <Toast
                    position="bottom"
                    bottomOffset={50}
                    visibilityTime={6000}
                    autoHide
                    topOffset={50}
                    config={toastConfig}
                  />

                  <StatusBar style="auto" backgroundColor="#fff" />
                </ThemeProvider>
              </PortalProvider>
            </BottomSheetModalProvider>
          </LoaderProvider>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </UserContextProvider>
  );
}
