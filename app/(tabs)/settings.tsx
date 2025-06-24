import { useColorScheme } from "@/hooks/useColorScheme.web";
import Navigator from "@/components/Navigator";
import { ThemedText } from "@/components/ThemedText";
import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SettingItem } from "@/components/SettingItem";
import { useRouter } from "expo-router";
import { useLogout } from "@/hooks/useAuthentication";
import { useUser } from "@/contexts/UserContexts";

const SettingsScreen: React.FC = () => {
  const [hideBalance, setHideBalance] = useState(false);
  const [securityLock, setSecurityLock] = useState(false);
  const [transactionPin, setTransactionPin] = useState(false);
  const [fingerprint, setFingerprint] = useState(false);
  const colorScheme = useColorScheme();
  const boxBackgroundColor = colorScheme === "dark" ? "#000000" : "#EEF3FB";
  const router = useRouter();
  const logout = useLogout();
  const { clearUser } = useUser();

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
      <ScrollView>
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
                onPress={() => console.log("Manage Devices pressed")}
                iconColor="#218DC9"
              />

              <SettingItem
                title="Hide Balance"
                hasSwitch
                switchValue={hideBalance}
                onSwitchChange={setHideBalance}
              />

              <SettingItem
                title="Enable Security Lock"
                hasSwitch
                switchValue={securityLock}
                onSwitchChange={setSecurityLock}
              />

              <SettingItem
                title="Transaction PIN"
                hasSwitch
                switchValue={transactionPin}
                onSwitchChange={setTransactionPin}
              />

              <SettingItem
                title="Enable 2FA"
                hasSwitch
                switchValue={fingerprint}
                onSwitchChange={setFingerprint}
              />

              <SettingItem
                title="Change VPay Password"
                hasChevron
                onPress={() => console.log("Change VPay PIN pressed")}
              />

              <SettingItem
                title="Transaction Limit"
                hasChevron
                onPress={() => console.log("Change VPay PIN pressed")}
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
              background={colorScheme === "dark" ? "#161622" : "#FFFFFF"}
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
