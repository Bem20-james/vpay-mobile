import React from "react";
import { View, ScrollView, Pressable, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "@/styles/trnxlimit";
import { tierData } from "@/assets/data";

export interface TierData {
  tier: string;
  dailyLimit: string;
  accountBalance: string;
  isCurrent: boolean;
}

export default function AccountLimitsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const backgroundColor = isDark
    ? Colors.dark.background
    : Colors.light.background;
  const router = useRouter();

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: backgroundColor }]}
    >
      <StatusBar
        style={isDark ? "light" : "dark"}
        backgroundColor={backgroundColor}
      />

      {/* Header */}
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.backButton,
            { opacity: pressed ? 0.7 : 1 }
          ]}
        >
          <Ionicons
            name="chevron-back"
            size={24}
            color={isDark ? "#F8F8F8" : "#252525"}
          />
        </Pressable>
        <ThemedText
          lightColor="#252525"
          darkColor="#F8F8F8"
          style={styles.headerTitle}
        >
          Account Limits
        </ThemedText>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Account Info Card */}
        <LinearGradient
          colors={["#F4D58D", "#E8C468"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.accountCard}
        >
          <View style={styles.cardHeader}>
            <ThemedText
              lightColor="#8B6914"
              darkColor="#8B6914"
              style={styles.cardLabel}
            >
              Account Info
            </ThemedText>
            <View style={styles.coinBadge}>
              <MaterialIcons
                name="account-balance-wallet"
                size={24}
                color="#F4D58D"
              />
            </View>
          </View>

          <View style={styles.accountNumberRow}>
            <ThemedText
              lightColor="#252525"
              darkColor="#252525"
              style={styles.accountNumber}
            >
              901 187 9815
            </ThemedText>
            <TouchableOpacity style={styles.copyButton}>
              <MaterialIcons name="content-copy" size={16} color="#8B6914" />
            </TouchableOpacity>
          </View>

          <ThemedText
            lightColor="#8B6914"
            darkColor="#8B6914"
            style={styles.accountName}
          >
            - JAMES IREM ADIKWONUKWU
          </ThemedText>
        </LinearGradient>

        {/* Linked ID Section */}
        <ThemedView
          lightColor="#FFFFFF"
          darkColor={Colors.dark.accentBg}
          style={styles.linkedIdCard}
        >
          <View style={styles.linkedIdRow}>
            <ThemedText
              lightColor="#666666"
              darkColor="#A0A0A0"
              style={styles.linkedIdLabel}
            >
              Linked ID
            </ThemedText>
            <View style={styles.linkedIdRight}>
              <ThemedText
                lightColor="#252525"
                darkColor="#F8F8F8"
                style={styles.linkedIdValue}
              >
                BVN & NIN
              </ThemedText>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={isDark ? "#A0A0A0" : "#666666"}
              />
            </View>
          </View>
        </ThemedView>

        {/* Limit Info */}
        <ThemedView
          lightColor="#FFFFFF"
          darkColor={Colors.dark.accentBg}
          style={styles.limitInfoCard}
        >
          <ThemedText
            lightColor="#666666"
            darkColor="#A0A0A0"
            style={styles.limitInfoLabel}
          >
            Limit Info
          </ThemedText>
          <ThemedText
            lightColor="#888888"
            darkColor="#B0B0B0"
            style={styles.limitInfoText}
          >
            The higher your account tier, the higher your transaction limit.
          </ThemedText>
        </ThemedView>

        {/* Level Benefits */}
        <ThemedView
          lightColor="#FFFFFF"
          darkColor={Colors.dark.accentBg}
          style={styles.benefitsCard}
        >
          <ThemedText
            lightColor="#252525"
            darkColor="#F8F8F8"
            style={styles.benefitsTitle}
          >
            Level Benefit
          </ThemedText>

          {/* Table Header */}
          <View style={styles.tableHeader}>
            <ThemedText
              lightColor="#666666"
              darkColor="#A0A0A0"
              style={[styles.tableHeaderText, { flex: 1.2 }]}
            >
              Tier
            </ThemedText>
            <ThemedText
              lightColor="#666666"
              darkColor="#A0A0A0"
              style={[
                styles.tableHeaderText,
                { flex: 1.5, textAlign: "center" }
              ]}
            >
              Daily{"\n"}transaction limit
            </ThemedText>
            <ThemedText
              lightColor="#666666"
              darkColor="#A0A0A0"
              style={[
                styles.tableHeaderText,
                { flex: 1.3, textAlign: "right" }
              ]}
            >
              Maximum{"\n"}account balance
            </ThemedText>
          </View>

          {/* Table Rows */}
          {tierData.map((item, index) => (
            <View
              key={index}
              style={[
                styles.tableRow,
                item.isCurrent && styles.tableRowCurrent
              ]}
            >
              <View style={[styles.tierCell, { flex: 1.2 }]}>
                <ThemedText
                  lightColor={item.isCurrent ? "#FFFFFF" : "#252525"}
                  darkColor="#F8F8F8"
                  style={styles.tierText}
                >
                  {item.tier}
                </ThemedText>
                {item.isCurrent && (
                  <View style={styles.currentBadge}>
                    <ThemedText
                      lightColor="#00D084"
                      darkColor="#00D084"
                      style={styles.currentBadgeText}
                    >
                      Current
                    </ThemedText>
                  </View>
                )}
              </View>
              <ThemedText
                lightColor={item.isCurrent ? "#FFFFFF" : "#252525"}
                darkColor="#F8F8F8"
                style={[
                  styles.tableCellText,
                  { flex: 1.5, textAlign: "center" }
                ]}
              >
                {item.dailyLimit}
              </ThemedText>
              <ThemedText
                lightColor={item.isCurrent ? "#FFFFFF" : "#252525"}
                darkColor="#F8F8F8"
                style={[
                  styles.tableCellText,
                  { flex: 1.3, textAlign: "right" }
                ]}
              >
                {item.accountBalance}
              </ThemedText>
            </View>
          ))}
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}
