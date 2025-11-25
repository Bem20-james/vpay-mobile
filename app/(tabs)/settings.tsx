import Navigator from "@/components/Navigator";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SettingItem } from "@/components/SettingItem";
import { useRouter } from "expo-router";
import { useLogout } from "@/hooks/useAuthentication";
import { useUser } from "@/contexts/UserContexts";
import { getData, storeData } from "@/utils/store";
import * as LocalAuthentication from "expo-local-authentication";
import { Colors } from "@/constants/Colors";
import Toast from "react-native-toast-message";
import { useTheme } from "@/contexts/ThemeContexts";

const SettingsScreen: React.FC = () => {
  const [securityLock, setSecurityLock] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const boxBackgroundColor = isDark
    ? Colors.dark.background
    : Colors.light.background;
  const router = useRouter();
  const logout = useLogout();
  const { clearUser } = useUser();

  useEffect(() => {
    (async () => {
      const res = await getData<boolean>("useBiometrics");
      if (res.success && res.data !== null) {
        setIsEnabled(res.data);
      } else {
        setIsEnabled(false);
      }
    })();
  }, []);

  const toggleBiometrics = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !isEnrolled) {
      Toast.show({
        type: "error",
        text1: "Biometric not supported",
        text2: "Your device does not support biometrics."
      });
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: isEnabled
        ? "Confirm to disable biometric login"
        : "Authenticate to enable biometric login",
      cancelLabel: "Cancel",
      disableDeviceFallback: true
    });

    if (result.success) {
      const newValue = !isEnabled;
      setIsEnabled(newValue);

      await storeData("useBiometrics", newValue);

      Toast.show({
        type: "info",
        text1: `Biometric login is now ${newValue ? "enabled" : "disabled"}.`
      });
    } else {
      Toast.show({ type: "error", text1: "Biometric Authentication failed" });
    }
  };

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      clearUser();
      router.push("/(auth)/login-index");
    }
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: boxBackgroundColor }]}
    >
      <Navigator title="Settings & Privacy" showBackIcon={false} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <SettingItem
            title="Manage Devices"
            label="Control which devices you are logged in to"
            hasChevron
            onPress={() => router.push("/(user)/devices")}
            iconColor="#218DC9"
            icon={"devices"}
          />

          <SettingItem
            title="Profile"
            hasChevron
            onPress={() => router.push("/(user)/profile")}
            iconColor="#218DC9"
            icon={"account-circle"}
          />

          <SettingItem
            title="Account Verification"
            hasChevron
            onPress={() => router.push("/verification")}
            iconColor="#218DC9"
            icon={"verified-user"}
          />

          <SettingItem
            title="Enable Security Lock"
            label="will require PIN when you leave the app"
            hasSwitch
            iconColor="#218DC9"
            switchValue={securityLock}
            onSwitchChange={setSecurityLock}
            icon={"lock"}
          />
          <SettingItem
            title="Enable Biometrics"
            label="use your fingerprint/faceID to unlock the app"
            hasSwitch
            iconColor="#218DC9"
            switchValue={isEnabled}
            onSwitchChange={toggleBiometrics}
            icon={"fingerprint"}
          />

          <SettingItem
            title="Setup 2FA"
            label="Setup two-factor authentication"
            hasChevron
            iconColor="#218DC9"
            onPress={() => router.push("/setup-2FA")}
            icon={"security"}
          />

          <SettingItem
            title="Change PIN"
            hasChevron
            iconColor="#218DC9"
            icon={"password"}
            onPress={() => router.push("/(user)/change-transaction-pin")}
          />

          <SettingItem
            title="Change Password"
            hasChevron
            iconColor="#218DC9"
            onPress={() => router.push("/(user)/change-password")}
            icon={"shield"}
          />

          <SettingItem
            title="Transaction Limit"
            hasChevron
            iconColor="#218DC9"
            onPress={() => router.push("/transaction-limit")}
            icon={"error-outline"}
          />

          <View style={styles.bottomSection}>
            <SettingItem
              title="Feedback"
              hasChevron
              icon="feedback"
              iconColor="#406f88ff"
              onPress={() => console.log("Feedback pressed")}
              bgColor="#218DC947"
            />

            <SettingItem
              title="Logout"
              icon="logout"
              iconColor="#D92D20"
              onPress={handleLogout}
              bgColor="#D92D2014"
              background={
                isDark
                  ? Colors.dark.accentBg
                  : Colors.light.accentBg
              }
              itemStyles={{ marginHorizontal: 7, borderRadius: 6 }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5,
  },
  safeArea: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    paddingHorizontal: 16,
    marginBottom: 12
  },
  bottomSection: {
    marginTop: 30,
    paddingBottom: 32
  }
});

export default SettingsScreen;
