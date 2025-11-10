import { View, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles as homeStyles } from "@/styles/home";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, router } from "expo-router";
import Toast from "react-native-toast-message";
import CustomButton from "@/components/CustomButton";
import { styles } from "@/styles/trnxstatus";
import Navigator from "@/components/Navigator";

interface Asset {
  country_code: string;
  token_symbol: string;
  token_name: string;
  image?: string;
  name: string;
  type: string;
  balance: number;
}

interface Props {
  onConfirm: () => void;
  onBack: () => void;
  amount: string;
  network?: string;
  title?: string;
  address?: string;
  selectedAsset: Asset;
}

const SendCryptoReview = ({
  onConfirm,
  onBack,
  amount,
  network,
  address,
  selectedAsset,
  title = "Review Details"
}: Props) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const cardBackground = isDark ? "#1C1C1E" : "#FFFFFF";
  const borderColor = isDark ? "#2C2C2E" : "#E5E5EA";
  const textPrimary = isDark ? "#FFFFFF" : "#000000";
  const textSecondary = isDark ? "#8E8E93" : "#6C6C70";

  const DetailRow = ({ label, value }: { label: string; value?: string }) =>
    value ? (
      <View style={styles.detailRow}>
        <ThemedText style={[styles.detailLabel, { color: textSecondary }]}>
          {label}
        </ThemedText>
        <ThemedText style={[styles.detailValue, { color: textPrimary }]}>
          {value}
        </ThemedText>
      </View>
    ) : null;

  return (
    <>
      <Navigator title={title} onBack={onBack} />
      <ScrollView
        contentContainerStyle={homeStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View
            style={{ flexDirection: "row", gap: 3, alignItems: "baseline" }}
          >
            <ThemedText style={[styles.amount, { color: textPrimary }]}>
              {amount || "0.00"}
            </ThemedText>
            <ThemedText
              style={{
                fontFamily: "Questrial",
                fontSize: 20,
                fontWeight: "700",
                color: "#208bc9"
              }}
            >
              {selectedAsset?.token_symbol.toUpperCase()}
            </ThemedText>
          </View>

          <View
            style={[
              styles.detailsCard,
              {
                backgroundColor: cardBackground,
                borderColor: borderColor,
                marginTop: 20
              }
            ]}
          >
            <ThemedText style={[styles.cardTitle, { color: textPrimary }]}>
              Transaction Details
            </ThemedText>
            <View style={styles.divider} />

            <DetailRow label="Wallet Addrss" value={address} />
            <DetailRow label={"Network"} value={network} />
            <DetailRow label="Token" value={selectedAsset?.token_name.toUpperCase()} />
            <DetailRow label="Amount" value={amount} />
          </View>

          <CustomButton
            title="Confirm"
            handlePress={onConfirm}
            btnStyles={{ width: "100%" }}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default SendCryptoReview;
