import React from "react";
import { View, ScrollView, TouchableOpacity, Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "@/styles/trnxlimit";
import { tierData } from "@/assets/data";
import Navigator from "@/components/Navigator";
import { useTheme } from "@/contexts/ThemeContexts";
import images from "@/constants/Images";

export interface TierData {
  tier: string;
  dailyLimit: string;
  accountBalance: string;
  isCurrent: boolean;
}

interface TierViewProps {
  dailyLimit: string;
  maxBal: string;
  limitValue: string;
  balValue: string;
  image: any;
  tier: string;
}

const TierView = ({
  dailyLimit = "Daily Limit",
  maxBal = "Maximum Balance",
  limitValue,
  balValue,
  image,
  tier
}: TierViewProps) => {
  return (
    <ThemedView
      lightColor="#FFFFFF"
      darkColor={Colors.dark.accentBg}
      style={styles.limitInfoCard}
    >
      <View style={styles.tableHeader}>
        <Image source={image} style={styles.tierImage} />
        <ThemedText
          lightColor="#208BC9"
          darkColor="#208BC9"
          style={styles.limitInfoLabel}
        >
          {tier}
        </ThemedText>
      </View>

      <View style={styles.tierView}>
        <ThemedText
          lightColor="#666666"
          darkColor="#A0A0A0"
          style={styles.label}
        >
          {dailyLimit}
        </ThemedText>
        <ThemedText
          lightColor="#888888"
          darkColor="#B0B0B0"
          style={styles.label}
        >
          {maxBal}
        </ThemedText>
      </View>
      <View style={[styles.tableRow]}>
        <ThemedText
          lightColor={"#252525"}
          darkColor="#F8F8F8"
          style={styles.tableCellText}
        >
          {limitValue}
        </ThemedText>
        <ThemedText
          lightColor={"#252525"}
          darkColor="#F8F8F8"
          style={styles.tableCellText}
        >
          {balValue}
        </ThemedText>
      </View>
    </ThemedView>
  );
};

export default function AccountLimitsScreen() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
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

      <Navigator title="Transaction Limits" onBack={router.back} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ThemedText
          lightColor="#9B9B9B"
          darkColor="#EEF3FB"
          style={styles.subtitle}
        >
          The higher your account tier, the higher your transaction limit.
        </ThemedText>
        <LinearGradient
          colors={["#a6c9daff", "#208BC9"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.accountCard}
        >
          <View style={styles.cardHeader}>
            <ThemedText style={styles.cardLabel}>Account Info</ThemedText>
            <View style={styles.coinBadge}>
              <MaterialIcons
                name="account-balance-wallet"
                size={24}
                color="#208BC9"
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
              <MaterialIcons name="content-copy" size={16} color="#14408bff" />
            </TouchableOpacity>
          </View>

          <ThemedText
            lightColor="#14408bff"
            darkColor="#14408bff"
            style={styles.accountName}
          >
            - JAMES BEM AONDOAKURA
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
              Verification
            </ThemedText>
            <Ionicons name="chevron-forward" size={20} color={"#208BC9"} />
          </View>
        </ThemedView>

        <TierView
          dailyLimit="Daily Limit"
          maxBal="Maximum Balance"
          limitValue="₦500,000"
          balValue="₦1,000,000"
          image={images.tier1}
          tier="Basic"
        />

        <TierView
          dailyLimit="Daily Limit"
          maxBal="Maximum Balance"
          limitValue="₦500,000"
          balValue="₦1,000,000"
          image={images.tier2}
          tier="Silver"
        />
        <TierView
          dailyLimit="Daily Limit"
          maxBal="Maximum Balance"
          limitValue="₦500,000"
          balValue="₦1,000,000"
          image={images.tier3}
          tier="Gold"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
