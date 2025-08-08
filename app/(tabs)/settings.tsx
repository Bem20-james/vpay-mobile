import { useColorScheme } from "@/hooks/useColorScheme.web";
import Navigator from "@/components/Navigator";
import { ThemedText } from "@/components/ThemedText";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SettingItem } from "@/components/SettingItem";
import { useRouter } from "expo-router";
import { useLogout } from "@/hooks/useAuthentication";
import { useUser } from "@/contexts/UserContexts";
import { getData, storeData, removeData } from "@/utils/store";
import * as LocalAuthentication from "expo-local-authentication";
import { Colors } from "@/constants/Colors";

const SettingsScreen: React.FC = () => {
  const [hideBalance, setHideBalance] = useState(false);
  const [securityLock, setSecurityLock] = useState(false);
  const [fingerprint, setFingerprint] = useState(false);
  const colorScheme = useColorScheme();
  const boxBackgroundColor =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;
  const router = useRouter();
  const logout = useLogout();
  const { clearUser } = useUser();

  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    (async () => {
      const enabled = await getData("useBiometrics");
      setIsEnabled(Boolean(enabled));
    })();
  }, []);

  const toggleBiometrics = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !isEnrolled) {
      Alert.alert(
        "Biometric not supported",
        "Your device does not support biometrics."
      );
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: isEnabled
        ? "Confirm to disable biometric login"
        : "Authenticate to enable biometric login",
      cancelLabel: "Cancel",
      fallbackLabel: "Use PIN"
    });

    if (result.success) {
      const newValue = !isEnabled;
      setIsEnabled(newValue);

      if (newValue) {
        await storeData("useBiometrics", true);
        Alert.alert("Enabled", "Biometric login is now enabled.");
      } else {
        await removeData("useBiometrics");
        Alert.alert("Disabled", "Biometric login is now disabled.");
      }
    } else {
      Alert.alert(
        "Authentication failed",
        "Unable to change biometric settings."
      );
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Navigator title="Settings" showBackIcon={false} />

          <View style={styles.section}>
            <ThemedText
              lightColor="#000000"
              darkColor="#FFFFFF"
              style={styles.sectionTitle}
            >
              Privacy & Settings
            </ThemedText>
            <View style={{ marginVertical: 10 }}>
              <SettingItem
                title="Manage Devices"
                label="Control which devices you are logged in to"
                hasChevron
                onPress={() => router.push("/(user)/devices")}
                iconColor="#218DC9"
              />

              <SettingItem
                title="Profile"
                hasChevron
                onPress={() => router.push("/(user)/profile")}
                iconColor="#218DC9"
              />

              <SettingItem
                title="Account Verification"
                hasChevron
                onPress={() => router.push("/verification")}
                iconColor="#218DC9"
              />

              <SettingItem
                title="Hide Balance"
                label="Hide your balance on the app"
                hasSwitch
                switchValue={hideBalance}
                onSwitchChange={setHideBalance}
              />

              <SettingItem
                title="Enable Security Lock"
                label="will require PIN when you leave the app"
                hasSwitch
                switchValue={securityLock}
                onSwitchChange={setSecurityLock}
              />
              <SettingItem
                title="Enable Biometrics"
                label="use your fingerprint/faceID to unlock the app"
                hasSwitch
                switchValue={isEnabled}
                onSwitchChange={toggleBiometrics}
              />

              <SettingItem
                title="Enable 2FA"
                hasSwitch
                switchValue={fingerprint}
                onSwitchChange={setFingerprint}
              />

              <SettingItem
                title="Change VPay PIN"
                hasChevron
                onPress={() => router.push("/(auth)/change-pin")}
              />

              <SettingItem
                title="Change VPay Password"
                hasChevron
                onPress={() => router.push("/(auth)/change-password")}
              />

              <SettingItem
                title="Transaction Limit"
                hasChevron
                onPress={() => router.push("/transaction-limit")}
              />
            </View>
          </View>

          <View style={styles.bottomSection}>
            <SettingItem
              title="Feedback"
              hasChevron
              icon="chatbubble-ellipses"
              iconColor="#5AB4E6"
              onPress={() => console.log("Feedback pressed")}
              bgColor="#218DC947"
            />

            <SettingItem
              title="Logout"
              icon="power"
              iconColor="#D92D20"
              onPress={handleLogout}
              bgColor="#D92D2014"
              background={
                colorScheme === "dark"
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
    flex: 1
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 5
  },

  section: {
    paddingTop: 20
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    paddingHorizontal: 16,
    marginBottom: 12
  },
  bottomSection: {
    marginTop: 40,
    paddingBottom: 32
  }
});

export default SettingsScreen;
