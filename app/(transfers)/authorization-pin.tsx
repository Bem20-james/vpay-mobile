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
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import Toast from "react-native-toast-message";
import { useLoader } from "@/contexts/LoaderContext";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useSendLocal } from "@/hooks/useTransfers";
import Navigator from "@/components/Navigator";

interface NumberButtonProps {
  number: string;
  onPress: (number: string) => void;
}

const AuthorizationPin: React.FC = () => {
  const colorScheme = useColorScheme();
  const bgColor =
    colorScheme === "dark" ? Colors.dark.accentBg : Colors.light.accentBg;

  const [pin, setPin] = useState<string>("");
  const maxPinLength: number = 4;
  const { showLoader, hideLoader } = useLoader();
  const { sendFunds } = useSendLocal();
  const navigation = useNavigation();

  const {
    account_number,
    currency,
    amount,
    description,
    account_password
  } = useLocalSearchParams<{
    account_number: string;
    currency: string;
    amount: string;
    description?: string;
    account_password: string;
  }>();

  const handleNumberPress = (number: string): void => {
    if (pin.length < maxPinLength) {
      const newPin = pin + number;
      setPin(newPin);

      if (newPin.length === maxPinLength) {
        handleTransfer(newPin);
      }
    }
  };

  const handleDelete = (): void => {
    setPin(pin.slice(0, -1));
  };

  const renderPinDots = (): JSX.Element[] => {
    return Array.from({ length: maxPinLength }, (_, index) =>
      <View
        key={index}
        style={[
          styles.pinDot,
          { backgroundColor: index < pin.length ? "#3B82F6" : "#BFDBFE" }
        ]}
      />
    );
  };

  const NumberButton: React.FC<NumberButtonProps> = ({ number, onPress }) =>
    <TouchableOpacity
      style={styles.numberButton}
      onPress={() => onPress(number)}
      activeOpacity={0.7}
    >
      <ThemedText style={styles.numberText}>
        {number}
      </ThemedText>
    </TouchableOpacity>;

  console.log("Current PIN:", pin);

  const handleTransfer = async (finalPin: string) => {
    showLoader();
    try {
      const success = await sendFunds({
        account_number,
        currency,
        amount,
        description,
        account_password: finalPin // send the entered pin
      });
      if (success) {
        setPin(""); // clear pin after success
        Toast.show({
          type: "success",
          text1: "Transaction completed successfully"
        });
        navigation.goBack();
      }
    } catch (error) {
      setPin(""); // reset pin on failure
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

            <View style={styles.pinDotsContainer}>
              {renderPinDots()}
            </View>

            {/* Keypad */}
            <View style={styles.keypad}>
              {/* Row 1 */}
              <NumberButton number="1" onPress={handleNumberPress} />
              <NumberButton number="2" onPress={handleNumberPress} />
              <NumberButton number="3" onPress={handleNumberPress} />
              {/* Row 2 */}
              <NumberButton number="4" onPress={handleNumberPress} />
              <NumberButton number="5" onPress={handleNumberPress} />
              <NumberButton number="6" onPress={handleNumberPress} />
              {/* Row 3 */}
              <NumberButton number="7" onPress={handleNumberPress} />
              <NumberButton number="8" onPress={handleNumberPress} />
              <NumberButton number="9" onPress={handleNumberPress} />
              {/* Row 4 */}
              <View style={styles.dumNumberButton} />
              <NumberButton number="0" onPress={handleNumberPress} />
              <TouchableOpacity
                style={[
                  styles.deleteButton,
                  { opacity: pin.length === 0 ? 0.5 : 1 }
                ]}
                onPress={handleDelete}
                disabled={pin.length === 0}
                activeOpacity={0.7}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
  content: {
    alignItems: "center",
    marginTop: 40
  },
  title: {
    fontSize: 15,
    fontFamily: "Questrial"
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Questrial",
    marginBottom: 50
  },
  pinDotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginBottom: 64
  },
  pinDot: {
    width: 12,
    height: 12,
    borderRadius: 6
  },
  keypad: {
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
  dumNumberButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  numberText: {
    fontSize: 24,
    fontWeight: "500"
  },
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
