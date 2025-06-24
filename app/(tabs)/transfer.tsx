import React from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import RecentTransfers from "@/components/RecentTransfers";
import Navigator from "@/components/Navigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { MaterialIcons } from "@expo/vector-icons";
import { beneficiaries, recentActions } from "@/assets/data";

const TransferScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const backgroundColor = isDark ? "#000000" : "#EEF3FB";
  const bgColor = isDark ? "#161619" : "#FFFFFF";

  const router = useRouter();

  const TransferOption = ({
    label,
    icon,
    iconColor = "#218DC9",
    iconBg = "#F1FAFF",
    route
  }: {
    label: string;
    icon: keyof typeof MaterialIcons.glyphMap;
    iconColor?: string;
    iconBg?: string;
    route: string;
  }) => {
    return (
      <TouchableOpacity
        style={[styles.optionContainer, {backgroundColor: bgColor}]}
        onPress={() => router.push(route as any)}
        activeOpacity={0.7}
      >
        <View style={[styles.iconContainer, { backgroundColor: iconBg }]}>
          <MaterialIcons name={icon} size={20} color={iconColor} />
        </View>
        <View style={styles.textContainer}>
          <ThemedText style={styles.optionText}>{label}</ThemedText>
        </View>
        <MaterialIcons name="chevron-right" size={20} color="#218DC9" />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Navigator title="Send Money" showBackIcon={false} />

          <View style={styles.infoSection}>
            <ThemedText style={styles.infoText}>
              Free monthly transfers to other banks:
              <ThemedText
                style={styles.highlightText}
                lightColor="#000000"
                darkColor="#FFFFFF"
              >
                15
              </ThemedText>
            </ThemedText>
          </View>

          <View style={styles.options}>
            <TransferOption
              label="Vpay Tag"
              icon="call-made"
              route="/international-transfer"
            />
            <TransferOption
              label="Local Bank Transfer"
              icon="account-balance"
              route="/schedule-transfer"
            />
            <TransferOption
              label="Mobile money"
              icon="send-to-mobile"
              route="/schedule-transfer"
            />
            <TransferOption
              label="International Transfer"
              icon="public"
              route="/schedule-transfer"
            />
            <TransferOption
              label="Cryptocurrency"
              icon="currency-bitcoin"
              route="/schedule-transfer"
            />
          </View>

          {/* Recent Transfers */}
          <RecentTransfers
            title="Recent Transfers"
            recents={recentActions}
            beneficiaries={beneficiaries}
          />
        </View>
      </ScrollView>
      <StatusBar
        style={isDark ? "light" : "dark"}
        backgroundColor={backgroundColor}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginHorizontal: 10
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20
  },
  container: {
    flex: 1
  },
  infoSection: {
    paddingHorizontal: 4,
    paddingVertical: 10
  },
  infoText: {
    fontSize: 13,
    fontFamily: "Questrial",
    textAlign: "left",
    color: "#a0a0a0"
  },
  highlightText: {
    fontSize: 12,
    fontFamily: "Inter-Medium"
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 9,
    paddingHorizontal: 7,
    marginBottom: 7,
    borderRadius: 6
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  optionText: {
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "Inter-Medium"
  },
  options: {
    paddingHorizontal: 4,
    marginTop: 8
  }
});

export default TransferScreen;
