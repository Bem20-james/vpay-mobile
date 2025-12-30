import React from "react";
import { View, TouchableOpacity, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import CustomButton from "@/components/CustomButton";
import { useRouter, useLocalSearchParams } from "expo-router";
import images from "@/constants/Images";
import { trnxHistory as styles } from "@/styles/trnxstatus";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeContexts";
import Navigator from "@/components/Navigator";
import { formatDateTime } from "@/utils/formatDateTime";
import getSymbolFromCurrency from "currency-symbol-map";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const TransactionReceipt = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const isDark = theme === "dark";
  const backgroundColor = isDark
    ? Colors.dark.background
    : Colors.light.background;

  const { data } = useLocalSearchParams<{ data: string }>();
  const transaction = JSON.parse(data);

  console.log("Transaction Receipt Data:", transaction);

  const isServiceType = [
    "airtime",
    "data",
    "electricity",
    "bet_funding",
    "cable-tv"
  ].includes(transaction?.transactionType?.toLowerCase());

  const getTransactionLabel = (type: string) => {
    switch (type?.toLowerCase()) {
      case "airtime":
        return "Airtime Purchase";
      case "data":
        return "Data Purchase";
      case "electricity":
        return "Electricity Bill";
      case "bet_funding":
        return "Betting Funding";
      case "cable-tv":
        return "Cable TV Subscription";
      case "transfer":
        return "Transfer";
      default:
        return type;
    }
  };

  const getNetworkIcon = (provider?: string) => {
    if (!provider) return null;
    const p = provider.toLowerCase();

    if (p.includes("airtel")) return images.airtel;
    if (p.includes("mtn")) return images.mtn;
    if (p.includes("glo")) return images.glo;
    if (p.includes("9mobile")) return images.ninemobile;

    return null;
  };

  const networkIcon = getNetworkIcon(transaction?.provider);

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: backgroundColor }]}
    >
      <Navigator title="Transaction Receipt" onBack={router.back} />

      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <ThemedText style={styles.amount}>
              {getSymbolFromCurrency(transaction?.currency_sent)}
              {Number(transaction?.amount).toFixed(2)}
            </ThemedText>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="approximately-equal"
                size={18}
                color="#999"
              />
              <ThemedText
                style={{
                  fontSize: 14,
                  fontFamily: "Inter-SemiBold"
                }}
              >
                {getSymbolFromCurrency(transaction?.currency_recieved)}
                {transaction?.convertedAmount}
              </ThemedText>
            </View>
          </View>
          <View
            style={[
              styles.detailsContainer,
              {
                backgroundColor: isDark
                  ? Colors.dark.accentBg
                  : Colors.light.accentBg
              }
            ]}
          >
            <View style={styles.detailRow}>
              <ThemedText style={styles.detailLabel}>
                Transaction Type
              </ThemedText>
              <ThemedText style={styles.detailValue}>
                {getTransactionLabel(transaction?.transactionType)}
              </ThemedText>
            </View>
            {isServiceType && (
              <View style={styles.detailRow}>
                <ThemedText style={styles.detailLabel}>Provider</ThemedText>

                <View style={styles.networkContainer}>
                  {networkIcon && (
                    <Image source={networkIcon} style={styles.image} />
                  )}
                  <ThemedText style={styles.detailValue}>
                    {transaction?.provider || "N/A"}
                  </ThemedText>
                </View>
              </View>
            )}
            {transaction?.recipient && (
              <View style={styles.detailRow}>
                <ThemedText style={styles.detailLabel}>Recipient</ThemedText>
                <ThemedText style={styles.detailValue}>
                  {transaction?.recipient}
                </ThemedText>
              </View>
            )}
            <View style={styles.detailRow}>
              <ThemedText style={styles.detailLabel}>
                Transaction Fee
              </ThemedText>
              <ThemedText style={styles.detailValue}>
                {transaction?.fee
                  ? `${
                      getSymbolFromCurrency(transaction?.currency_sent) +
                      transaction?.fee
                    }`
                  : "₦0.00"}
              </ThemedText>
            </View>
            <View style={styles.detailRow}>
              <ThemedText style={styles.detailLabel}>Status</ThemedText>
              <ThemedText
                style={[
                  styles.detailValue,
                  transaction?.status === "success"
                    ? styles.statusSuccess
                    : styles.statusFailed
                ]}
              >
                {transaction?.status}
              </ThemedText>
            </View>

            <View style={styles.detailRow}>
              <ThemedText style={styles.detailLabel}>Reference</ThemedText>
              <ThemedText style={styles.detailValue}>
                {transaction?.reference}
              </ThemedText>
            </View>

            <View style={styles.detailRow}>
              <ThemedText style={styles.detailLabel}>Total</ThemedText>
              <ThemedText style={styles.detailValue}>
                {getSymbolFromCurrency(transaction?.currency_sent)}
                {Number(
                  transaction?.totalDebited || transaction?.totalDebited
                ).toFixed(2)}
              </ThemedText>
            </View>

            <View style={styles.detailRow}>
              <ThemedText style={styles.detailLabel}>Date & Time</ThemedText>
              <ThemedText style={styles.detailValue}>
                {formatDateTime(transaction?.date)}
              </ThemedText>
            </View>
          </View>

          <TouchableOpacity
            style={styles.actionBox}
            onPress={() => {}}
            activeOpacity={0.7}
          >
            <View style={styles.colBox}>
              <View style={styles.row}>
                <View style={styles.iconWrapper}>
                  <MaterialIcons
                    name="report-problem"
                    size={20}
                    color="#D22C1F"
                  />
                </View>

                <ThemedText
                  lightColor="#252525"
                  darkColor="#FFFFFF"
                  style={styles.label}
                >
                  Report Transaction
                </ThemedText>
              </View>

              <MaterialIcons name="chevron-right" size={20} color="#208BCD" />
            </View>
          </TouchableOpacity>

          <View style={{ marginTop: 100, width: "100%" }}>
            <CustomButton
              title="Share"
              handlePress={() => {}}
              btnStyles={{ width: "100%" }}
              icon={
                <MaterialIcons name="ios-share" size={20} color="#FFFFFF" />
              }
            />

            <CustomButton
              title="Download Receipt"
              handlePress={() => {}}
              btnStyles={{ width: "100%", marginTop: 10 }}
              variant="secondary"
              icon={<MaterialIcons name="download" size={20} color="#208BC9" />}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TransactionReceipt;
