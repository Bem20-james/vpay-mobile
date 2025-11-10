import { View, ScrollView, Pressable } from "react-native";
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

interface Currency {
  country_code: string;
  currency_code: string;
  image?: string;
  name: string;
  type: string;
  balance: number;
}

interface ConversionBody {
  base_currency: string;
  converted_amount: string;
  converted_fee: string;
  target_currency: string;
  total_converted: string;
  transaction_type?: string;
  warning?: string;
  total?: string;
}

interface Props {
  onPay: () => void;
  amount: string;
  selectedAsset: Currency;
  conversion: ConversionBody;
  snapPoints?: string[];
  title?: string;
  bank?: string;
  accountNumber?: string;
  name?: string;
  description?: string;
}

const InternationalReview = ({
  onPay,
  amount,
  bank,
  accountNumber,
  name,
  selectedAsset,
  conversion,
  description,
  title = "Review Details",
}: Props) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const backgroundColor = isDark
    ? Colors.dark.background
    : Colors.light.background;
  const cardBackground = isDark ? "#1C1C1E" : "#FFFFFF";
  const borderColor = isDark ? "#2C2C2E" : "#E5E5EA";
  const successColor = "#34C759";
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

  const onDone = () => router.push("/(tabs)/home");

  return (
    <SafeAreaView
      style={[homeStyles.safeArea, { backgroundColor: backgroundColor }]}
    >
      <ScrollView
        contentContainerStyle={homeStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: `${successColor}20` }
            ]}
          >
            <Ionicons name="checkmark-circle" size={80} color={successColor} />
          </View>

          <ThemedText style={[styles.title, { color: textPrimary }]}>
            {title}
          </ThemedText>

          <ThemedText style={[styles.amount, { color: textPrimary }]}>
            {selectedAsset?.currency_code}
            {conversion?.total_converted || "0.00"}
          </ThemedText>

          {description ? (
            <ThemedText style={[styles.description, { color: textSecondary }]}>
              {description}
            </ThemedText>
          ) : null}

          <View
            style={[
              styles.detailsCard,
              { backgroundColor: cardBackground, borderColor: borderColor }
            ]}
          >
            <ThemedText style={[styles.cardTitle, { color: textPrimary }]}>
              Transaction Details
            </ThemedText>
            <View style={styles.divider} />

            <DetailRow label="Account Number" value={accountNumber} />
            <DetailRow label={"Bank"} value={bank} />
            <DetailRow
              label="Currency Sent"
              value={selectedAsset?.currency_code}
            />
            <DetailRow
              label="Currency Received"
              value={conversion?.target_currency}
            />
            <DetailRow
              label="Transaction Fee"
              value={
                conversion?.converted_fee
                  ? `${conversion?.base_currency}${conversion?.converted_fee}`
                  : ""
              }
            />
          </View>

          <CustomButton
            title="Done"
            handlePress={onDone}
            btnStyles={{ width: "100%" }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InternationalReview;
