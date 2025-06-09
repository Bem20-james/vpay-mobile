import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useRouter } from "expo-router";
import Navigator from "@/components/Navigator";
import { ThemedText } from "@/components/ThemedText";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  StatusBar
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const SettingsScreen: React.FC = () => {
  const [hideBalance, setHideBalance] = useState(false);
  const [securityLock, setSecurityLock] = useState(false);
  const [transactionPin, setTransactionPin] = useState(false);
  const [fingerprint, setFingerprint] = useState(false);

  const colorScheme = useColorScheme();
  const boxBackgroundColor = colorScheme === "dark" ? "#000000" : "#EEF3FB";
  const statusBarBg = colorScheme === "dark" ? "#000000" : "#EEF3FB";
  const router = useRouter();

  const SettingItem = ({
    title,
    hasSwitch,
    switchValue,
    onSwitchChange,
    hasChevron,
    onPress,
    icon,
    iconColor,
    bgColor = "#F2F2F7"
  }: {
    title: string;
    hasSwitch?: boolean;
    switchValue?: boolean;
    onSwitchChange?: (value: boolean) => void;
    hasChevron?: boolean;
    onPress?: () => void;
    icon?: any;
    iconColor?: string;
    bgColor?: string;
  }) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      disabled={hasSwitch}
    >
      <View style={styles.settingLeft}>
        {icon && (
          <View style={[styles.iconContainer, { backgroundColor: bgColor }]}>
            <Ionicons name={icon} size={20} color={iconColor} />
          </View>
        )}
        <ThemedText
          lightColor="#252525"
          darkColor="#FFFFFF"
          style={styles.settingText}
        >
          {title}
        </ThemedText>
      </View>

      {hasSwitch && (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: "#E5E5E5", true: "#34C759" }}
          thumbColor={switchValue ? "#FFFFFF" : "#FFFFFF"}
          ios_backgroundColor="#E5E5E5"
        />
      )}

      {hasChevron && (
        <Ionicons name="chevron-forward" size={18} color="#218DC9" />
      )}
    </TouchableOpacity>
  );

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
                title="Enable Fingerprint"
                hasSwitch
                switchValue={fingerprint}
                onSwitchChange={setFingerprint}
              />

              <SettingItem
                title="Change VPay PIN"
                hasChevron
                onPress={() => console.log("Change VPay PIN pressed")}
              />
            </View>
          </View>

          {/* Bottom Section */}
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
              onPress={() => console.log("Logout pressed")}
              bgColor="#D92D2014"
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
  section: {
    paddingTop: 20
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    paddingHorizontal: 16,
    marginBottom: 12
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 7,
    minHeight: 40,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },
  settingText: {
    fontFamily: "Inter",
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12
  },
  bottomSection: {
    marginTop: 50,
    paddingBottom: 32
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 5
  }
});

export default SettingsScreen;
