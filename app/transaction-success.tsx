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
import * as Print from "expo-print";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

export type TransactionType =
  | "transfer"
  | "airtime"
  | "data"
  | "bill_payment"
  | "purchase"
  | "payment"
  | "withdrawal"
  | "deposit"
  | "refund";

const TransactionSuccess = () => {
  const params = useLocalSearchParams<any>();

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

  const {
    transactionType,
    amount,
    currency = "₦",
    recipient,
    recipientAccount,
    reference,
    date,
    fee,
    description,
    recieved,
    sent,
    bank,
    currency_sent,
    currency_recieved,
    status,
    totalDebited
  } = params;

  // ✅ Dynamic titles
  const titles: Record<string, string> = {
    transfer: "Transfer Successful",
    airtime: "Airtime Purchase Successful",
    data: "Data Purchase Successful",
    bill_payment: "Bill Payment Successful",
    purchase: "Purchase Successful",
    payment: "Payment Successful",
    withdrawal: "Withdrawal Successful",
    deposit: "Deposit Successful",
    refund: "Refund Successful"
  };

  const getTransactionTitle = () =>
    titles[transactionType] || "Transaction Successful";

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

  // ✅ HTML template for receipt
  const generateReceiptHTML = () => `
    <html>
      <body style="font-family: Arial; padding: 24px;">
        <h2 style="color: #208BC9;">${getTransactionTitle()}</h2>
        <p><strong>Amount:</strong> ${currency}${totalDebited || amount}</p>
        <p><strong>Recipient:</strong> ${recipient || "-"}</p>
        <p><strong>Account Number:</strong> ${recipientAccount || "-"}</p>
        <p><strong>Bank:</strong> ${bank || "-"}</p>
        <p><strong>Reference:</strong> ${reference}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Status:</strong> ${status}</p>
        <p><strong>Fee:</strong> ${fee ? `${currency}${fee}` : "0.00"}</p>
        <br />
        <p>Thank you for using our service!</p>
      </body>
    </html>
  `;

  // ✅ Download Receipt
  const onDownloadReceipt = async () => {
    try {
      Toast.show({ type: "info", text1: "Generating receipt..." });
      const html = generateReceiptHTML();

      const { uri } = await Print.printToFileAsync({ html });
      const fileName = `receipt-${reference || Date.now()}.pdf`;
      const newPath = `${FileSystem.documentDirectory}${fileName}`;

      await FileSystem.moveAsync({
        from: uri,
        to: newPath
      });

      Toast.show({
        type: "success",
        text1: "Receipt downloaded",
        text2: "Saved to app documents folder"
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed to download receipt"
      });
      console.error("Download error:", error);
    }
  };

  // ✅ Share Receipt
  const onShareReceipt = async () => {
    try {
      const html = generateReceiptHTML();
      const { uri } = await Print.printToFileAsync({ html });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          dialogTitle: "Share Receipt"
        });
      } else {
        Toast.show({
          type: "info",
          text1: "Sharing not available on this device"
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed to share receipt"
      });
      console.error("Share error:", error);
    }
  };

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
            {getTransactionTitle()}
          </ThemedText>

          <ThemedText style={[styles.amount, { color: textPrimary }]}>
            {currency}
            {totalDebited || "0.00"}
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

            <DetailRow label="Recipient" value={recipient} />
            <DetailRow label="Account Number" value={recipientAccount} />
            <DetailRow label="Bank" value={bank} />
            <DetailRow label="Transaction ID" value={reference} />
            <DetailRow label="Date & Time" value={date} />
            <DetailRow label="Currency Sent" value={currency_sent} />
            <DetailRow label="Currency Received" value={currency_recieved} />
            <DetailRow
              label="Transaction Fee"
              value={fee ? `${currency}${fee}` : ""}
            />
            <DetailRow label="Status" value={status} />
          </View>

          {/* ✅ Actions */}
          <View style={styles.actionButtons}>
            <Pressable
              style={[
                styles.secondaryButton,
                { borderColor: borderColor, backgroundColor: cardBackground }
              ]}
              onPress={onDownloadReceipt}
            >
              <Ionicons name="download-outline" size={20} color={"#208BC9"} />
              <ThemedText
                style={[styles.secondaryButtonText, { color: textPrimary }]}
              >
                Download Receipt
              </ThemedText>
            </Pressable>

            <Pressable
              style={[
                styles.secondaryButton,
                { borderColor: borderColor, backgroundColor: cardBackground }
              ]}
              onPress={onShareReceipt}
            >
              <Ionicons name="share-outline" size={20} color={"#208BC9"} />
              <ThemedText
                style={[styles.secondaryButtonText, { color: textPrimary }]}
              >
                Share Receipt
              </ThemedText>
            </Pressable>
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

export default TransactionSuccess;
