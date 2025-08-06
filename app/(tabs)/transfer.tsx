import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import RecentTransfers from "@/components/RecentTransfers";
import Navigator from "@/components/Navigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ThemedText";
import { beneficiaries, recentActions } from "@/assets/data";
import { Colors } from "@/constants/Colors";
import { transferOptions } from "@/assets/data";
import QuickActionsSection from "@/components/QuickAction";

const TransferScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const backgroundColor = isDark
    ? Colors.dark.background
    : Colors.light.background;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Navigator title="Send Money" showBackIcon={false} />

          <ThemedText style={styles.infoText}>
            Free monthly transfers to other banks:
            <ThemedText
              style={styles.highlightText}
              lightColor="#000000"
              darkColor="#FFFFFF"
            >
              10
            </ThemedText>
          </ThemedText>

          <View style={{ flex: 1 }}>
            <QuickActionsSection
              actions={transferOptions.map((action) => {
                return action;
              })}
            />
          </View>

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
    flex: 1
  },
  container: {
    marginHorizontal: 10
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
  }
});

export default TransferScreen;
