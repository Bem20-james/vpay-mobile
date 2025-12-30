import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import Toast from "react-native-toast-message";
import { useLoader } from "@/contexts/LoaderContext";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import Navigator from "@/components/Navigator";
import { useTransactionDispatcher } from "@/hooks/useTransactionDispatcher";
import { buildSuccessParams } from "@/utils/buildSuccessParams";
import { useTheme } from "@/contexts/ThemeContexts";

const AuthorizationPin: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bgColor = isDark ? Colors.dark.accentBg : Colors.light.accentBg;

  const [pin, setPin] = useState<string>("");
  const maxPinLength: number = 4;
  const navigation = useNavigation();
  const router = useRouter();
  const { showLoader, hideLoader } = useLoader();

  const { transactionType, payload } = useLocalSearchParams<{
    transactionType: string;
    payload: string;
  }>();

  const parsedPayload = JSON.parse(payload);
  const { executeTransaction } = useTransactionDispatcher();

  const handleTransfer = async (finalPin: string) => {
    showLoader();
    try {
      const result = await executeTransaction(
        transactionType,
        parsedPayload,
        finalPin
      );

      if (result?.success && result?.data?.result) {
        const successParams = buildSuccessParams(
          transactionType,
          result.data.result
        );
        console.log("Success Params:", successParams);

        router.push({
          pathname: "/transaction-success",
          params: successParams
        });
      } else {
        setPin("");
        Toast.show({
          type: "error",
          text1: result?.message || "Transaction failed. Please try again."
        });
      }
    } catch (error) {
      setPin("");
      Toast.show({
        type: "error",
        text1:
          error && typeof error === "object" && "message" in error
            ? (error as { message: string }).message
            : "Failed to complete transaction"
      });
    } finally {
      hideLoader();
    }
  };

  const handleNumberPress = (number: string): void => {
    if (pin.length < maxPinLength) {
      const newPin = pin + number;
      setPin(newPin);
      if (newPin.length === maxPinLength) handleTransfer(newPin);
    }
  };

  const handleDelete = (): void => setPin(pin.slice(0, -1));

  const renderPinDots = () =>
    Array.from({ length: maxPinLength }, (_, index) => (
      <View
        key={index}
        style={[
          styles.pinDot,
          { backgroundColor: index < pin.length ? "#3B82F6" : "#BFDBFE" }
        ]}
      />
    ));

  return (
    <SafeAreaView style={{ backgroundColor: bgColor, height: "100%" }}>
      <ScrollView
        style={{ paddingHorizontal: 7 }}
        showsVerticalScrollIndicator={false}
      >
        <Navigator onBack={navigation.goBack} />
        <View style={styles.container}>
          <View style={styles.content}>
            <ThemedText
              lightColor="#252525"
              darkColor="#9B9B9B"
              style={styles.title}
            >
              Enter Transaction PIN
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              To complete this transaction, enter your 4-digit PIN
            </ThemedText>
            <View style={styles.pinDotsContainer}>{renderPinDots()}</View>

            {/* Keypad */}
            <View style={styles.keypad}>
              {[..."123456789"].map((num) => (
                <NumberButton
                  key={num}
                  number={num}
                  onPress={handleNumberPress}
                />
              ))}
              <View style={styles.dumNumberButton} />
              <NumberButton number="0" onPress={handleNumberPress} />
              <TouchableOpacity
                style={[
                  styles.deleteButton,
                  { opacity: pin.length === 0 ? 0.5 : 1 }
                ]}
                onPress={handleDelete}
                disabled={pin.length === 0}
              >
                <Ionicons name="backspace" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      </ScrollView>
    </SafeAreaView>
  );
};

// Reuse number button component
const NumberButton = ({
  number,
  onPress
}: {
  number: string;
  onPress: (n: string) => void;
}) => (
  <TouchableOpacity style={styles.numberButton} onPress={() => onPress(number)}>
    <ThemedText style={styles.numberText}>{number}</ThemedText>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  content: { alignItems: "center", marginTop: 20 },
  title: { fontSize: 15, fontFamily: "Questrial" },
  subtitle: { fontSize: 14, fontFamily: "Questrial", marginBottom: 50 },
  pinDotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginBottom: 64
  },
  pinDot: { width: 12, height: 12, borderRadius: 6 },
  keypad: {
    marginTop: 50,
    width: "100%",
    maxWidth: 300,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16
  },
  numberButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: "#c2c2c3ff",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  dumNumberButton: { width: 80, height: 80, borderRadius: 40 },
  numberText: { fontSize: 24, fontWeight: "500" },
  deleteButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#208BC9",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default AuthorizationPin;
