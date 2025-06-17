import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Clipboard from "expo-clipboard";
import Toast from "react-native-toast-message";
import QRCode from "react-native-qrcode-svg";

const DepositCrypto = () => {
  const walletAddress = "1BnDcUQDwgaLbgxzNZYEquinUU1Psr...";

  const handleCopy = () => {
    Clipboard.setString(walletAddress);
    Toast.show({ type: "success", text1: "Copied to clipboard" });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bar} />

      <Text style={styles.title}>Fund with USDT</Text>
      <Text style={styles.subtitle}>
        Use the wallet address below to fund your vPay wallet.
      </Text>

      <Image
        source={require("@/assets/images/qr-placeholder.png")}
        style={styles.qr}
      />
      <QRCode
        value={"aondoakura bem james"}
        size={200}
        color="#000000"
        backgroundColor="#ffffff"
      />
      <Text style={styles.qrNote}>Scan QR code with your app</Text>

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.divider} />
      </View>

      <View style={styles.walletBox}>
        <Text numberOfLines={1} style={styles.walletAddress}>
          {walletAddress}
        </Text>
        <TouchableOpacity onPress={handleCopy}>
          <Ionicons name="copy-outline" size={22} color="#1A73E8" />
        </TouchableOpacity>
      </View>

      <View style={styles.warningBox}>
        <Ionicons name="alert-circle" size={18} color="#DC2626" />
        <Text style={styles.warningText}>
          Please make sure you confirm the exact wallet address to avoid
          complications.
        </Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Got it</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DepositCrypto;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  bar: {
    width: 40,
    height: 4,
    backgroundColor: "#D9D9D9",
    borderRadius: 2,
    marginVertical: 10
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
    color: "#000"
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 20
  },
  qr: {
    width: 160,
    height: 160,
    marginBottom: 10
  },
  qrNote: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 20
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    gap: 8
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB"
  },
  orText: {
    fontSize: 12,
    color: "#9CA3AF"
  },
  walletBox: {
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 10
  },
  walletAddress: {
    color: "#111827",
    flex: 1,
    marginRight: 10
  },
  warningBox: {
    backgroundColor: "#FEF2F2",
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 15,
    width: "100%",
    gap: 8
  },
  warningText: {
    color: "#DC2626",
    fontSize: 13,
    flex: 1
  },
  button: {
    backgroundColor: "#1A73E8",
    borderRadius: 12,
    marginTop: 30,
    paddingVertical: 14,
    width: "100%",
    alignItems: "center"
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16
  }
});
